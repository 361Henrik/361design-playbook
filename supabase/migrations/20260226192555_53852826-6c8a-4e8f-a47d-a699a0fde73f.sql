
-- Chat sessions
CREATE TABLE public.chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  title TEXT NOT NULL DEFAULT 'New conversation',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Chat messages
CREATE TABLE public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-update updated_at on chat_sessions
CREATE TRIGGER update_chat_sessions_updated_at
  BEFORE UPDATE ON public.chat_sessions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable RLS
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- RLS: chat_sessions - users own their sessions
CREATE POLICY "Users can view own sessions" ON public.chat_sessions
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create sessions" ON public.chat_sessions
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own sessions" ON public.chat_sessions
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete own sessions" ON public.chat_sessions
  FOR DELETE USING (user_id = auth.uid());

-- RLS: chat_messages - via session ownership
CREATE POLICY "Users can view messages in own sessions" ON public.chat_messages
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM public.chat_sessions WHERE id = chat_messages.session_id AND user_id = auth.uid()
  ));

CREATE POLICY "Users can insert messages in own sessions" ON public.chat_messages
  FOR INSERT WITH CHECK (EXISTS (
    SELECT 1 FROM public.chat_sessions WHERE id = chat_messages.session_id AND user_id = auth.uid()
  ));

-- Service role can insert messages (for edge function persisting assistant responses)
CREATE POLICY "Service can insert messages" ON public.chat_messages
  FOR INSERT WITH CHECK (true);

-- Service role can update sessions (for auto-titling)
CREATE POLICY "Service can update sessions" ON public.chat_sessions
  FOR UPDATE USING (true);
