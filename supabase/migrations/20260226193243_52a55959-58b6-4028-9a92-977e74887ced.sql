
-- Add session_type and source_id to chat_sessions
ALTER TABLE public.chat_sessions
  ADD COLUMN IF NOT EXISTS session_type TEXT NOT NULL DEFAULT 'chat',
  ADD COLUMN IF NOT EXISTS source_id UUID REFERENCES public.sources(id);

-- Create review_decisions table
CREATE TABLE public.review_decisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL,
  source_id UUID REFERENCES public.sources(id),
  title TEXT NOT NULL,
  violations JSONB NOT NULL DEFAULT '[]',
  fix_plan JSONB NOT NULL DEFAULT '[]',
  code_snippet TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.review_decisions ENABLE ROW LEVEL SECURITY;

-- RLS: SELECT via join on chat_sessions
CREATE POLICY "Users can view own review decisions"
  ON public.review_decisions FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.chat_sessions
    WHERE chat_sessions.id = review_decisions.session_id
      AND chat_sessions.user_id = auth.uid()
  ));

-- RLS: INSERT
CREATE POLICY "Users can create review decisions"
  ON public.review_decisions FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.chat_sessions
    WHERE chat_sessions.id = review_decisions.session_id
      AND chat_sessions.user_id = auth.uid()
  ));

-- RLS: UPDATE
CREATE POLICY "Users can update own review decisions"
  ON public.review_decisions FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.chat_sessions
    WHERE chat_sessions.id = review_decisions.session_id
      AND chat_sessions.user_id = auth.uid()
  ));

-- RLS: DELETE
CREATE POLICY "Users can delete own review decisions"
  ON public.review_decisions FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.chat_sessions
    WHERE chat_sessions.id = review_decisions.session_id
      AND chat_sessions.user_id = auth.uid()
  ));

-- Service role policies for edge function
CREATE POLICY "Service can insert review decisions"
  ON public.review_decisions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service can update review decisions"
  ON public.review_decisions FOR UPDATE
  USING (true);

-- Updated_at trigger
CREATE TRIGGER update_review_decisions_updated_at
  BEFORE UPDATE ON public.review_decisions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
