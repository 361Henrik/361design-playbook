
-- Create onboarding_content table
CREATE TABLE public.onboarding_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  content_key TEXT NOT NULL,
  title TEXT,
  body TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  updated_by UUID,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(workspace_id, content_key)
);

ALTER TABLE public.onboarding_content ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Workspace members can view onboarding content"
  ON public.onboarding_content FOR SELECT TO authenticated
  USING (is_workspace_member(auth.uid(), workspace_id));

CREATE POLICY "Editors can insert onboarding content"
  ON public.onboarding_content FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

CREATE POLICY "Editors can update onboarding content"
  ON public.onboarding_content FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

CREATE POLICY "Admins can delete onboarding content"
  ON public.onboarding_content FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Service can insert onboarding content"
  ON public.onboarding_content FOR INSERT
  WITH CHECK (true);

-- Add onboarding_completed to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false;

-- Trigger for updated_at
CREATE TRIGGER update_onboarding_content_updated_at
  BEFORE UPDATE ON public.onboarding_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
