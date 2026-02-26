
-- Add token_category column to variants
ALTER TABLE public.variants ADD COLUMN IF NOT EXISTS token_category TEXT;
CREATE INDEX IF NOT EXISTS idx_variants_token_category ON public.variants (token_category);

-- Seed controlled vocabulary tags for examples
INSERT INTO public.tag_vocabulary (name, category, workspace_id) VALUES
  -- channel
  ('web-app', 'channel', '00000000-0000-0000-0000-000000000001'),
  ('landing-page', 'channel', '00000000-0000-0000-0000-000000000001'),
  ('social', 'channel', '00000000-0000-0000-0000-000000000001'),
  ('email', 'channel', '00000000-0000-0000-0000-000000000001'),
  -- format
  ('headline', 'format', '00000000-0000-0000-0000-000000000001'),
  ('body', 'format', '00000000-0000-0000-0000-000000000001'),
  ('cta', 'format', '00000000-0000-0000-0000-000000000001'),
  ('stat', 'format', '00000000-0000-0000-0000-000000000001'),
  ('card', 'format', '00000000-0000-0000-0000-000000000001'),
  ('hero', 'format', '00000000-0000-0000-0000-000000000001'),
  ('table-row', 'format', '00000000-0000-0000-0000-000000000001'),
  -- intent
  ('inform', 'intent', '00000000-0000-0000-0000-000000000001'),
  ('persuade', 'intent', '00000000-0000-0000-0000-000000000001'),
  ('guide', 'intent', '00000000-0000-0000-0000-000000000001'),
  ('confirm', 'intent', '00000000-0000-0000-0000-000000000001'),
  ('warn', 'intent', '00000000-0000-0000-0000-000000000001'),
  -- context
  ('onboarding', 'context', '00000000-0000-0000-0000-000000000001'),
  ('dashboard', 'context', '00000000-0000-0000-0000-000000000001'),
  ('settings', 'context', '00000000-0000-0000-0000-000000000001'),
  ('marketing', 'context', '00000000-0000-0000-0000-000000000001'),
  ('transactional', 'context', '00000000-0000-0000-0000-000000000001')
ON CONFLICT DO NOTHING;
