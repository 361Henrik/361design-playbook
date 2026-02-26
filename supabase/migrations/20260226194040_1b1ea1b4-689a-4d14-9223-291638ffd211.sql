
-- Create voice_tokens table
CREATE TABLE public.voice_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  token_type TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  dos TEXT[] DEFAULT '{}',
  donts TEXT[] DEFAULT '{}',
  severity TEXT NOT NULL DEFAULT 'error',
  sort_order INTEGER DEFAULT 0,
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE public.voice_tokens ENABLE ROW LEVEL SECURITY;

-- SELECT: workspace members
CREATE POLICY "Workspace members can view voice tokens"
  ON public.voice_tokens FOR SELECT
  USING (is_workspace_member(auth.uid(), workspace_id));

-- INSERT: editors and admins
CREATE POLICY "Editors can insert voice tokens"
  ON public.voice_tokens FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'editor'));

-- UPDATE: editors and admins
CREATE POLICY "Editors can update voice tokens"
  ON public.voice_tokens FOR UPDATE
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'editor'));

-- DELETE: admins only
CREATE POLICY "Admins can delete voice tokens"
  ON public.voice_tokens FOR DELETE
  USING (has_role(auth.uid(), 'admin'));

-- Service role policies
CREATE POLICY "Service can insert voice tokens"
  ON public.voice_tokens FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service can update voice tokens"
  ON public.voice_tokens FOR UPDATE
  USING (true);

-- updated_at trigger
CREATE TRIGGER update_voice_tokens_updated_at
  BEFORE UPDATE ON public.voice_tokens
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Seed default voice tokens for the default workspace
INSERT INTO public.voice_tokens (workspace_id, token_type, name, description, dos, donts, severity, sort_order) VALUES
-- Pillars
('00000000-0000-0000-0000-000000000001', 'pillar', 'Confident, not aggressive', 'We state things directly. We don''t hedge with "maybe" or "just". We also don''t command or pressure.', ARRAY['Explore the collection', 'Start your project', 'Built for precision'], ARRAY['You MUST try this now!', 'Just a simple tool', 'Maybe you''ll like it'], 'error', 1),
('00000000-0000-0000-0000-000000000001', 'pillar', 'Precise, not cold', 'We use exact language and specific details. We avoid vague warmth that says nothing. But we never sound robotic or clinical.', ARRAY['48 components, 9 token categories', 'Optimized for 4.5:1 contrast ratio', 'Ships in 2–3 business days'], ARRAY['We have lots of great stuff!', 'ERROR_CODE: 4012', 'Your request has been processed'], 'error', 2),
('00000000-0000-0000-0000-000000000001', 'pillar', 'Curated, not exclusive', 'We guide with authority and taste, but never gatekeep. The tone is "here''s what we recommend" not "you wouldn''t understand."', ARRAY['We recommend starting with…', 'Selected for lasting quality', 'A refined approach to…'], ARRAY['Only for those who truly get it', 'Not for everyone', 'If you have to ask…'], 'error', 3),

-- Prohibited patterns
('00000000-0000-0000-0000-000000000001', 'prohibited_pattern', 'No urgency/scarcity language', 'Never manufacture urgency or artificial scarcity. Our brand is patient and confident — the work speaks for itself.', ARRAY['Available now', 'View the full collection', 'New additions this season'], ARRAY['Limited time only!', 'Don''t miss out!', 'Only 3 left in stock!', 'Act now before it''s gone!'], 'error', 1),
('00000000-0000-0000-0000-000000000001', 'prohibited_pattern', 'No filler words', 'Cut words that add length but not meaning. Every word should earn its place.', ARRAY['This tool validates contrast', 'Configure your workspace', 'The palette uses five colors'], ARRAY['This tool simply validates contrast', 'Just configure your workspace', 'The palette basically uses five colors', 'Actually, it''s really quite straightforward'], 'warning', 2),

-- CTA style
('00000000-0000-0000-0000-000000000001', 'cta_style', 'Verb-first, calm authority', 'CTAs start with a verb. 1–3 words. No exclamation marks. The action is clear and the tone is steady.', ARRAY['Explore', 'Get started', 'View details', 'Save changes'], ARRAY['Click here!!!', 'Submit', 'GO NOW', 'Yes, I want this!'], 'error', 1),
('00000000-0000-0000-0000-000000000001', 'cta_style', 'No exclamation marks in CTAs', 'Exclamation marks in buttons and links feel like shouting. Our brand doesn''t shout.', ARRAY['Learn more', 'Continue', 'Open project'], ARRAY['Learn more!', 'Let''s go!', 'Try it now!'], 'error', 2),

-- Grammar rules
('00000000-0000-0000-0000-000000000001', 'grammar_rule', 'Sentence case headlines', 'All headlines use sentence case. No Title Case. No ALL CAPS except in legal or regulatory contexts.', ARRAY['Design system overview', 'Getting started with tokens', 'Color palette guidelines'], ARRAY['Design System Overview', 'Getting Started With Tokens', 'COLOR PALETTE GUIDELINES'], 'warning', 1),
('00000000-0000-0000-0000-000000000001', 'grammar_rule', 'Oxford comma always', 'In lists of three or more, always use the Oxford comma before the final conjunction.', ARRAY['Colors, typography, and spacing', 'Red, green, and blue'], ARRAY['Colors, typography and spacing', 'Red, green and blue'], 'warning', 2);
