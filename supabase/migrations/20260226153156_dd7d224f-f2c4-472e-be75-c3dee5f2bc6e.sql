
-- Notifications table
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT,
  read BOOLEAN NOT NULL DEFAULT false,
  entity_id UUID,
  entity_type TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS: users can only see their own notifications
CREATE POLICY "Users can view own notifications"
  ON public.notifications FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications"
  ON public.notifications FOR UPDATE
  USING (user_id = auth.uid());

-- Trigger function: notify all users when a source status changes
CREATE OR REPLACE FUNCTION public.notify_on_source_status_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO public.notifications (user_id, type, title, message, entity_id, entity_type)
    SELECT p.id, 'source_status',
      'Source "' || NEW.title || '" is now ' || NEW.status,
      CASE
        WHEN NEW.status = 'processed' THEN 'Extraction complete — review draft entries.'
        WHEN NEW.status = 'failed' THEN 'Extraction failed: ' || COALESCE(NEW.error_message, 'unknown error')
        ELSE 'Status changed to ' || NEW.status
      END,
      NEW.id, 'source'
    FROM public.profiles p
    WHERE p.id != COALESCE(NEW.uploaded_by, '00000000-0000-0000-0000-000000000000');
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_notify_source_status
  AFTER UPDATE ON public.sources
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_on_source_status_change();

-- Trigger function: notify all users when a new draft/conflict entry is created
CREATE OR REPLACE FUNCTION public.notify_on_new_draft()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.status IN ('draft', 'conflict') THEN
    INSERT INTO public.notifications (user_id, type, title, message, entity_id, entity_type)
    SELECT p.id,
      CASE WHEN NEW.status = 'conflict' THEN 'conflict_detected' ELSE 'new_draft' END,
      CASE WHEN NEW.status = 'conflict' THEN 'Conflict: "' || NEW.title || '"'
           ELSE 'New draft: "' || NEW.title || '"' END,
      CASE WHEN NEW.status = 'conflict' THEN 'A conflicting entry needs resolution.'
           ELSE 'A new draft entry is ready for review.' END,
      NEW.id, 'library_entry'
    FROM public.profiles p
    WHERE p.id != COALESCE(NEW.created_by, '00000000-0000-0000-0000-000000000000');
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_notify_new_draft
  AFTER INSERT ON public.library_entries
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_on_new_draft();

-- Enable realtime for notifications
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
