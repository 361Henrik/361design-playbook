ALTER TABLE public.property_previews
  ADD COLUMN slug text UNIQUE,
  ADD COLUMN is_public boolean NOT NULL DEFAULT false;

CREATE INDEX idx_property_previews_slug ON public.property_previews(slug) WHERE slug IS NOT NULL;

GRANT SELECT ON public.property_previews TO anon;

CREATE POLICY "public previews are world-readable"
  ON public.property_previews FOR SELECT
  TO anon, authenticated
  USING (is_public = true);