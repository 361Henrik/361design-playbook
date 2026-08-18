-- ============================================================
-- Security hardening
--
-- 1. Drop every "Service can ..." policy. They were created without
--    TO service_role, so they defaulted to public and granted anon-key
--    clients unrestricted writes to core tables. The service role
--    bypasses RLS entirely, so these policies serve no legitimate
--    purpose even when scoped correctly.
-- 2. Workspace-scope the core content tables (library_entries, sources,
--    versions) instead of USING (true) for every authenticated user.
-- 3. Validate workspace membership on chat_sessions INSERT.
-- 4. Make the sources storage bucket private and require auth.
-- 5. Restrict tag_vocabulary / guardrail_exceptions reads to
--    authenticated users.
-- ============================================================

-- ── 1. Remove public "Service" policies ──
DROP POLICY IF EXISTS "Service can insert library entries" ON public.library_entries;
DROP POLICY IF EXISTS "Service can update library entries" ON public.library_entries;
DROP POLICY IF EXISTS "Service can insert sources" ON public.sources;
DROP POLICY IF EXISTS "Service can update sources" ON public.sources;
DROP POLICY IF EXISTS "Service can delete sources" ON public.sources;
DROP POLICY IF EXISTS "Service can insert versions" ON public.versions;
DROP POLICY IF EXISTS "Service can insert messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Service can update sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "Service can insert review decisions" ON public.review_decisions;
DROP POLICY IF EXISTS "Service can update review decisions" ON public.review_decisions;
DROP POLICY IF EXISTS "Service can insert voice tokens" ON public.voice_tokens;
DROP POLICY IF EXISTS "Service can update voice tokens" ON public.voice_tokens;
DROP POLICY IF EXISTS "Service can insert onboarding content" ON public.onboarding_content;
DROP POLICY IF EXISTS "Service can insert kits" ON public.kits;
DROP POLICY IF EXISTS "Service can update kits" ON public.kits;
DROP POLICY IF EXISTS "Service can insert kit_rules" ON public.kit_rules;
DROP POLICY IF EXISTS "Service can insert templates" ON public.templates;
DROP POLICY IF EXISTS "Service can update templates" ON public.templates;
DROP POLICY IF EXISTS "Service can insert variants" ON public.variants;
DROP POLICY IF EXISTS "Service can insert variant_tags" ON public.variant_tags;
DROP POLICY IF EXISTS "Service can insert variant_assets" ON public.variant_assets;

-- ── 2. Workspace-scope core content ──
-- Backfill legacy rows into the default workspace so they stay visible
-- and become reachable by workspace-scoped retrieval (Copilot, search).
UPDATE public.library_entries
SET workspace_id = '00000000-0000-0000-0000-000000000001'
WHERE workspace_id IS NULL;

UPDATE public.sources
SET workspace_id = '00000000-0000-0000-0000-000000000001'
WHERE workspace_id IS NULL;

UPDATE public.versions
SET workspace_id = '00000000-0000-0000-0000-000000000001'
WHERE workspace_id IS NULL;

DROP POLICY IF EXISTS "Authenticated can view library entries" ON public.library_entries;
CREATE POLICY "Members can view library entries" ON public.library_entries
  FOR SELECT TO authenticated
  USING (workspace_id IS NULL OR public.is_workspace_member(auth.uid(), workspace_id));

DROP POLICY IF EXISTS "Editors can insert library entries" ON public.library_entries;
CREATE POLICY "Editors can insert library entries" ON public.library_entries
  FOR INSERT TO authenticated
  WITH CHECK (
    (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'))
    AND (workspace_id IS NULL OR public.is_workspace_member(auth.uid(), workspace_id))
  );

DROP POLICY IF EXISTS "Editors can update library entries" ON public.library_entries;
CREATE POLICY "Editors can update library entries" ON public.library_entries
  FOR UPDATE TO authenticated
  USING (
    (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'))
    AND (workspace_id IS NULL OR public.is_workspace_member(auth.uid(), workspace_id))
  );

DROP POLICY IF EXISTS "Authenticated can view sources" ON public.sources;
CREATE POLICY "Members can view sources" ON public.sources
  FOR SELECT TO authenticated
  USING (workspace_id IS NULL OR public.is_workspace_member(auth.uid(), workspace_id));

DROP POLICY IF EXISTS "Editors can insert sources" ON public.sources;
CREATE POLICY "Editors can insert sources" ON public.sources
  FOR INSERT TO authenticated
  WITH CHECK (
    (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'))
    AND (workspace_id IS NULL OR public.is_workspace_member(auth.uid(), workspace_id))
  );

DROP POLICY IF EXISTS "Authenticated can view versions" ON public.versions;
CREATE POLICY "Members can view versions" ON public.versions
  FOR SELECT TO authenticated
  USING (workspace_id IS NULL OR public.is_workspace_member(auth.uid(), workspace_id));

-- Version snapshots inherit the entry's workspace so the scoped SELECT
-- policy applies to them (the SECURITY DEFINER triggers bypass RLS on
-- insert, so no INSERT policy is needed).
CREATE OR REPLACE FUNCTION public.track_library_entry_version()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF OLD.title IS DISTINCT FROM NEW.title
     OR OLD.content IS DISTINCT FROM NEW.content
     OR OLD.summary IS DISTINCT FROM NEW.summary
     OR OLD.rules IS DISTINCT FROM NEW.rules
     OR OLD.tags IS DISTINCT FROM NEW.tags
     OR OLD.status IS DISTINCT FROM NEW.status
  THEN
    INSERT INTO public.versions (
      entity_type, entity_id, version_number, title, snapshot, diff, change_summary, workspace_id
    ) VALUES (
      'library_entry',
      NEW.id,
      NEW.version,
      NEW.title,
      jsonb_build_object(
        'title', NEW.title,
        'entry_type', NEW.entry_type,
        'summary', NEW.summary,
        'content', NEW.content,
        'rules', to_jsonb(NEW.rules),
        'tags', to_jsonb(NEW.tags),
        'status', NEW.status
      ),
      jsonb_build_object(
        'before', jsonb_build_object(
          'title', OLD.title,
          'summary', OLD.summary,
          'content', OLD.content,
          'rules', to_jsonb(OLD.rules),
          'tags', to_jsonb(OLD.tags),
          'status', OLD.status
        ),
        'after', jsonb_build_object(
          'title', NEW.title,
          'summary', NEW.summary,
          'content', NEW.content,
          'rules', to_jsonb(NEW.rules),
          'tags', to_jsonb(NEW.tags),
          'status', NEW.status
        )
      ),
      CASE
        WHEN OLD.status IS DISTINCT FROM NEW.status THEN 'Status changed from ' || OLD.status || ' to ' || NEW.status
        WHEN OLD.title IS DISTINCT FROM NEW.title THEN 'Title updated'
        WHEN OLD.content IS DISTINCT FROM NEW.content THEN 'Content updated'
        ELSE 'Entry updated'
      END,
      NEW.workspace_id
    );

    NEW.version = OLD.version + 1;
  END IF;

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.track_library_entry_initial_version()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.versions (
    entity_type, entity_id, version_number, title, snapshot, change_summary, workspace_id
  ) VALUES (
    'library_entry',
    NEW.id,
    1,
    NEW.title,
    jsonb_build_object(
      'title', NEW.title,
      'entry_type', NEW.entry_type,
      'summary', NEW.summary,
      'content', NEW.content,
      'rules', to_jsonb(NEW.rules),
      'tags', to_jsonb(NEW.tags),
      'status', NEW.status
    ),
    'Initial version created',
    NEW.workspace_id
  );
  RETURN NEW;
END;
$$;

-- ── 3. chat_sessions INSERT must target a workspace the user belongs to ──
DROP POLICY IF EXISTS "Users can create sessions" ON public.chat_sessions;
CREATE POLICY "Users can create sessions" ON public.chat_sessions
  FOR INSERT TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    AND public.is_workspace_member(auth.uid(), workspace_id)
  );

-- ── 4. Private storage bucket ──
UPDATE storage.buckets SET public = false WHERE id = 'sources';

DROP POLICY IF EXISTS "Anyone can view source files" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload source files" ON storage.objects;

CREATE POLICY "Authenticated can view source files" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'sources');

CREATE POLICY "Authenticated can upload source files" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'sources');

-- ── 5. Authenticated-only reference reads ──
DROP POLICY IF EXISTS "Anyone can view tags" ON public.tag_vocabulary;
CREATE POLICY "Authenticated can view tags" ON public.tag_vocabulary
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Anyone can view exceptions" ON public.guardrail_exceptions;
CREATE POLICY "Authenticated can view exceptions" ON public.guardrail_exceptions
  FOR SELECT TO authenticated USING (true);
