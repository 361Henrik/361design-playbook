

# Smart Functionality Improvements — Prioritized Plan

Your list is excellent and thorough. Here's my recommendation organized into three tiers based on impact, feasibility, and how quickly they'd eliminate real pain points.

---

## Tier 1: High Impact, Build Now

These address the most likely friction points your team will hit immediately.

### 1. Batch Operations for Draft Entries (your #27)
The current Library page only allows one-at-a-time approve/reject. When extraction creates 50+ drafts, this is unusable.

**Changes:**
- Add "Select All" checkbox and multi-select to Library page
- Add bulk action bar: "Approve Selected", "Reject Selected", "Tag Selected", "Delete Selected"
- Add entry count summary at top ("42 drafts awaiting review")

### 2. Duplicate Source Detection (your #12 partial, #3)
Hash uploaded files (SHA-256) and check for duplicates before ingestion.

**Changes:**
- Add `file_hash` column to `sources` table
- Compute hash client-side before upload
- On duplicate: show warning dialog — "This file was already uploaded as [title] on [date]. Upload anyway?"
- Link duplicate sources together via a `duplicate_of` column

### 3. Extraction Failure Handling & Retry (your #1)
Currently if extraction fails, the source just shows "failed" with no recourse.

**Changes:**
- Add "Retry Extraction" button on failed sources
- Add `error_message` and `retry_count` columns to `sources`
- Show the actual error to the user (rate limit, bad format, timeout)
- In the edge function: add timeout handling (30s max), catch partial extractions, save what was extracted even if incomplete
- Add `partial` status alongside `completed`/`failed`

### 4. Controlled Tag Vocabulary (your #28)
Tags will drift immediately without governance.

**Changes:**
- Create a `tag_vocabulary` table (name, category, aliases)
- Pre-seed with standard tags from the design system (color, typography, spacing, etc.)
- Add tag autocomplete/suggestion in Library when editing entries
- Show "unrecognized tag" warning for tags not in vocabulary
- Add tag management section in Settings

### 5. Empty State & Onboarding (your #29)
A brand-new install is confusing. The Dashboard is just token category links.

**Changes:**
- Add a "Getting Started" checklist to Dashboard: Upload first source, Review drafts, Browse tokens, Check guardrails, Export code
- Track completion state in localStorage
- Show progress indicator (3/5 steps complete)
- Add contextual empty states on each page with actionable CTAs ("Upload your brand guidelines PDF to get started")

### 6. Authentication & Role-Based Access (your #24)
Currently everything is open. Viewers can delete entries, trigger extraction, etc.

**Changes:**
- Add `user_roles` table with `app_role` enum (admin, editor, viewer)
- Create login/signup pages with email auth
- Add `has_role()` security definer function
- Update all RLS policies: viewers = SELECT only, editors = SELECT + INSERT + UPDATE, admins = all
- Gate UI actions: hide delete/approve buttons for viewers, hide upload for viewers
- Add role management UI in Settings (admin only)

---

## Tier 2: Important, Build Soon

### 7. Conflicting Token Detection (your #2)
When two sources assert different hex values for "Bronze", surface the conflict.

**Changes:**
- After extraction, compare new entries against existing approved entries by title/tags
- If a conflict is found, mark the new entry with `conflict_with` reference and flag it in the review UI
- Show side-by-side comparison during review

### 8. Stale Embedding Refresh (your #10)
Currently embeddings are never set (the column exists but the edge function doesn't generate them).

**Changes:**
- Add embedding generation to the `extract-source` function after entry creation
- Add a trigger or scheduled job to re-embed when entries are updated
- Add "Re-index" button in Settings for admin to refresh all embeddings

### 9. Revert Impact Preview (your #17)
Currently revert is blind — no indication of what will change.

**Changes:**
- Before reverting, show a confirmation dialog with the diff (reuse existing DiffDialog)
- Query dependent entries that reference the reverted entry and warn about them

### 10. Guardrail Exception Workflow (your #13)
Sometimes rules need to be intentionally broken for campaigns.

**Changes:**
- Add `guardrail_exceptions` table (rule_id, reason, approved_by, expires_at)
- Show exception badge on the guardrails dashboard
- Auto-expire exceptions and notify

### 11. Large Source Chunking (your #5)
200-page PDFs will timeout the edge function.

**Changes:**
- In the edge function: limit to first 50 pages (8000 chars already partially handles this)
- Add `pages_processed` / `total_pages` columns to sources
- Show progress: "Processed 50 of 200 pages"
- Allow "Continue extraction" to process remaining chunks

### 12. Source Relevance Classification (your #6)
Reject non-design documents gracefully.

**Changes:**
- Add a classification step before full extraction: ask AI "Is this a design document? Rate confidence 0-1"
- If confidence < 0.3, mark as "not_relevant" and show warning
- Allow user to override and force extraction

---

## Tier 3: Nice to Have, Build Later

### 13. Deterministic Exports (your #20)
Sort all tokens alphabetically, strip timestamps from output.

### 14. Single Canonical Token Source (your #21)
Add a "token source of truth" flag — exports always pull from this canonical set rather than allowing drift between formats.

### 15. Confidence Scores on Extraction (your #4)
Add a `confidence` float column to `library_entries`. Display low-confidence entries differently in the review queue.

### 16. Compound Violation "Taste Score" (your #14)
Aggregate multiple soft warnings into a composite score. Show "3 minor warnings together suggest the UI may feel off" on the guardrails dashboard.

### 17. Accessibility Conflict Detection (your #15)
Cross-check brand colors against WCAG contrast ratios. Flag when brand-approved combinations fail for small text.

### 18. Audit Log with Reason Field (your #26)
Add a `reason` text field to the versions table. Prompt editors to explain changes when saving.

---

## Technical Details

### Database Migrations Needed (Tiers 1-2)

```text
sources table additions:
  + file_hash TEXT
  + duplicate_of UUID REFERENCES sources(id)
  + error_message TEXT
  + retry_count INTEGER DEFAULT 0
  + pages_processed INTEGER
  + total_pages INTEGER

New tables:
  + tag_vocabulary (id, name, category, aliases TEXT[], created_at)
  + user_roles (id, user_id UUID REFERENCES auth.users, role app_role, UNIQUE(user_id, role))
  + guardrail_exceptions (id, rule_id TEXT, reason TEXT, approved_by UUID, expires_at TIMESTAMPTZ, created_at)

library_entries additions:
  + confidence FLOAT
  + conflict_with UUID[]

New enum:
  + app_role AS ENUM ('admin', 'editor', 'viewer')

New function:
  + has_role(uuid, app_role) RETURNS boolean — SECURITY DEFINER
```

### Files to Create/Modify

| Area | Files |
|------|-------|
| Batch ops | `src/pages/Library.tsx` (add multi-select, bulk actions) |
| Dedup | `src/pages/Sources.tsx`, edge function, migration |
| Retry | `src/pages/Sources.tsx`, edge function |
| Tags | New `src/pages/TagManagement.tsx`, `src/pages/Library.tsx` |
| Onboarding | `src/pages/Dashboard.tsx` (getting started checklist) |
| Auth | New `src/pages/Auth.tsx`, `src/pages/Settings.tsx`, RLS policies, `App.tsx` routes |
| Conflicts | Edge function, `src/pages/Library.tsx` |
| Embeddings | Edge function update |
| Revert preview | `src/pages/Changelog.tsx` |
| Exceptions | `src/pages/Guardrails.tsx`, migration |

### Recommended Build Order

1. Authentication and roles (unlocks all permission gating)
2. Batch operations for drafts (immediate UX win)
3. Empty state and onboarding (first-run experience)
4. Duplicate detection and retry flow (ingestion reliability)
5. Controlled tag vocabulary (data quality)
6. Everything else from Tier 2

