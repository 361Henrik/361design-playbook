
-- Create versions table for tracking all changes
CREATE TABLE public.versions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('token', 'component', 'guideline', 'library_entry')),
  entity_id UUID NOT NULL,
  version_number INTEGER NOT NULL DEFAULT 1,
  title TEXT NOT NULL,
  snapshot JSONB NOT NULL DEFAULT '{}',
  diff JSONB,
  change_summary TEXT,
  changed_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.versions ENABLE ROW LEVEL SECURITY;

-- Public read, anyone can insert (small internal team)
CREATE POLICY "Anyone can view versions" ON public.versions FOR SELECT USING (true);
CREATE POLICY "Anyone can insert versions" ON public.versions FOR INSERT WITH CHECK (true);

-- Index for fast lookups by entity
CREATE INDEX idx_versions_entity ON public.versions (entity_type, entity_id, version_number DESC);
CREATE INDEX idx_versions_created ON public.versions (created_at DESC);

-- Trigger to auto-create version on library_entry update
CREATE OR REPLACE FUNCTION public.track_library_entry_version()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only track if meaningful fields changed
  IF OLD.title IS DISTINCT FROM NEW.title
     OR OLD.content IS DISTINCT FROM NEW.content
     OR OLD.summary IS DISTINCT FROM NEW.summary
     OR OLD.rules IS DISTINCT FROM NEW.rules
     OR OLD.tags IS DISTINCT FROM NEW.tags
     OR OLD.status IS DISTINCT FROM NEW.status
  THEN
    INSERT INTO public.versions (
      entity_type, entity_id, version_number, title, snapshot, diff, change_summary
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
      END
    );
    
    -- Increment version number
    NEW.version = OLD.version + 1;
  END IF;
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER track_library_entry_version_trigger
  BEFORE UPDATE ON public.library_entries
  FOR EACH ROW EXECUTE FUNCTION public.track_library_entry_version();

-- Also create initial version on insert
CREATE OR REPLACE FUNCTION public.track_library_entry_initial_version()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.versions (
    entity_type, entity_id, version_number, title, snapshot, change_summary
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
    'Initial version created'
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER track_library_entry_initial_version_trigger
  AFTER INSERT ON public.library_entries
  FOR EACH ROW EXECUTE FUNCTION public.track_library_entry_initial_version();
