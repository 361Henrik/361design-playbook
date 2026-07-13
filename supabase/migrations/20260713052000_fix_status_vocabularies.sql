-- ============================================================
-- Align status CHECK constraints with the values the application
-- actually writes.
--
-- extract-source writes sources.status = 'partial' (multi-chunk
-- continuation) and 'not_relevant' (relevance gate), and
-- library_entries.status = 'conflict' (conflict detection). All three
-- violated the original CHECK constraints, and the unchecked UPDATEs
-- failed silently — chunked extraction could never continue (documents
-- over 8,000 chars were truncated) and any batch containing a conflict
-- entry failed wholesale. The frontend already handles all three values
-- (Sources.tsx, Copilot.tsx polling, Library.tsx conflict view).
-- ============================================================

ALTER TABLE public.sources
  DROP CONSTRAINT IF EXISTS sources_status_check;
ALTER TABLE public.sources
  ADD CONSTRAINT sources_status_check
  CHECK (status IN ('pending', 'processing', 'partial', 'completed', 'failed', 'not_relevant'));

ALTER TABLE public.library_entries
  DROP CONSTRAINT IF EXISTS library_entries_status_check;
ALTER TABLE public.library_entries
  ADD CONSTRAINT library_entries_status_check
  CHECK (status IN ('draft', 'approved', 'rejected', 'conflict'));
