CREATE TABLE public.property_previews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL,
  created_by uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  location text,
  style_tags text[] DEFAULT '{}',
  input jsonb NOT NULL DEFAULT '{}'::jsonb,
  output jsonb NOT NULL DEFAULT '{}'::jsonb,
  hero_image_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.property_previews TO authenticated;
GRANT ALL ON public.property_previews TO service_role;

ALTER TABLE public.property_previews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "workspace members read previews"
  ON public.property_previews FOR SELECT
  TO authenticated
  USING (public.is_workspace_member(auth.uid(), workspace_id));

CREATE POLICY "workspace members insert previews"
  ON public.property_previews FOR INSERT
  TO authenticated
  WITH CHECK (public.is_workspace_member(auth.uid(), workspace_id) AND created_by = auth.uid());

CREATE POLICY "creators update previews"
  ON public.property_previews FOR UPDATE
  TO authenticated
  USING (created_by = auth.uid());

CREATE POLICY "creators delete previews"
  ON public.property_previews FOR DELETE
  TO authenticated
  USING (created_by = auth.uid());

CREATE INDEX idx_property_previews_workspace ON public.property_previews(workspace_id, created_at DESC);