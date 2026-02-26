
-- Add confidence score and canonical flag to library_entries
ALTER TABLE public.library_entries ADD COLUMN IF NOT EXISTS confidence double precision;
ALTER TABLE public.library_entries ADD COLUMN IF NOT EXISTS is_canonical boolean NOT NULL DEFAULT false;

-- Add reason field to versions for audit log
ALTER TABLE public.versions ADD COLUMN IF NOT EXISTS reason text;
