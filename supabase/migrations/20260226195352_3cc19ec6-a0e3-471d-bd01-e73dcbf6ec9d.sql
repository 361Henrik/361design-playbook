
-- ============================================
-- Applied Layer: kits, kit_rules, templates, variants, variant_tags, variant_assets
-- ============================================

-- 1. kits
CREATE TABLE public.kits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  channel TEXT NOT NULL DEFAULT 'custom',
  token_overrides JSONB DEFAULT '{}',
  layout_constraints JSONB DEFAULT '{}',
  component_subset TEXT[] DEFAULT '{}',
  guardrail_profile TEXT[] DEFAULT '{}',
  tone_modifiers TEXT[] DEFAULT '{}',
  sort_order INTEGER DEFAULT 0,
  is_default BOOLEAN DEFAULT false,
  created_by UUID,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.kits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Workspace members can view kits" ON public.kits
  FOR SELECT TO authenticated
  USING (is_workspace_member(auth.uid(), workspace_id));

CREATE POLICY "Editors can insert kits" ON public.kits
  FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'editor'));

CREATE POLICY "Editors can update kits" ON public.kits
  FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'editor'));

CREATE POLICY "Admins can delete kits" ON public.kits
  FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Service can insert kits" ON public.kits
  FOR INSERT TO service_role
  WITH CHECK (true);

CREATE POLICY "Service can update kits" ON public.kits
  FOR UPDATE TO service_role
  USING (true);

-- 2. kit_rules
CREATE TABLE public.kit_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kit_id UUID NOT NULL REFERENCES public.kits(id) ON DELETE CASCADE,
  rule_id TEXT NOT NULL,
  severity_override TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(kit_id, rule_id)
);

ALTER TABLE public.kit_rules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view kit_rules" ON public.kit_rules
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.kits WHERE kits.id = kit_rules.kit_id AND is_workspace_member(auth.uid(), kits.workspace_id)));

CREATE POLICY "Editors can insert kit_rules" ON public.kit_rules
  FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'editor'));

CREATE POLICY "Editors can update kit_rules" ON public.kit_rules
  FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'editor'));

CREATE POLICY "Admins can delete kit_rules" ON public.kit_rules
  FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Service can insert kit_rules" ON public.kit_rules
  FOR INSERT TO service_role
  WITH CHECK (true);

-- 3. templates
CREATE TABLE public.templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kit_id UUID NOT NULL REFERENCES public.kits(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  component_jsx TEXT NOT NULL,
  layout_spec TEXT,
  copy_spec TEXT,
  slot_schema JSONB DEFAULT '[]',
  sort_order INTEGER DEFAULT 0,
  is_default BOOLEAN DEFAULT false,
  created_by UUID,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Workspace members can view templates" ON public.templates
  FOR SELECT TO authenticated
  USING (is_workspace_member(auth.uid(), workspace_id));

CREATE POLICY "Editors can insert templates" ON public.templates
  FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'editor'));

CREATE POLICY "Editors can update templates" ON public.templates
  FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'editor'));

CREATE POLICY "Admins can delete templates" ON public.templates
  FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Service can insert templates" ON public.templates
  FOR INSERT TO service_role
  WITH CHECK (true);

CREATE POLICY "Service can update templates" ON public.templates
  FOR UPDATE TO service_role
  USING (true);

-- 4. variants
CREATE TABLE public.variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slot_type TEXT NOT NULL,
  content JSONB NOT NULL,
  component_ids TEXT[] DEFAULT '{}',
  voice_token_ids UUID[] DEFAULT '{}',
  sort_order INTEGER DEFAULT 0,
  created_by UUID,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.variants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Workspace members can view variants" ON public.variants
  FOR SELECT TO authenticated
  USING (is_workspace_member(auth.uid(), workspace_id));

CREATE POLICY "Editors can insert variants" ON public.variants
  FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'editor'));

CREATE POLICY "Editors can update variants" ON public.variants
  FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'editor'));

CREATE POLICY "Admins can delete variants" ON public.variants
  FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Service can insert variants" ON public.variants
  FOR INSERT TO service_role
  WITH CHECK (true);

-- 5. variant_tags
CREATE TABLE public.variant_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  variant_id UUID NOT NULL REFERENCES public.variants(id) ON DELETE CASCADE,
  tag_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(variant_id, tag_name)
);

ALTER TABLE public.variant_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view variant_tags" ON public.variant_tags
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.variants WHERE variants.id = variant_tags.variant_id AND is_workspace_member(auth.uid(), variants.workspace_id)));

CREATE POLICY "Editors can insert variant_tags" ON public.variant_tags
  FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'editor'));

CREATE POLICY "Admins can delete variant_tags" ON public.variant_tags
  FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Service can insert variant_tags" ON public.variant_tags
  FOR INSERT TO service_role
  WITH CHECK (true);

-- 6. variant_assets
CREATE TABLE public.variant_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  variant_id UUID NOT NULL REFERENCES public.variants(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  alt_text TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.variant_assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view variant_assets" ON public.variant_assets
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.variants WHERE variants.id = variant_assets.variant_id AND is_workspace_member(auth.uid(), variants.workspace_id)));

CREATE POLICY "Editors can insert variant_assets" ON public.variant_assets
  FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'editor'));

CREATE POLICY "Admins can delete variant_assets" ON public.variant_assets
  FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Service can insert variant_assets" ON public.variant_assets
  FOR INSERT TO service_role
  WITH CHECK (true);

-- updated_at triggers for tables that have it
CREATE TRIGGER set_kits_updated_at BEFORE UPDATE ON public.kits
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_templates_updated_at BEFORE UPDATE ON public.templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_variants_updated_at BEFORE UPDATE ON public.variants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
