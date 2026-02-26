

# Review Session for Attached Documents

A dedicated workflow where users upload a document (PDF/image/markdown), the system extracts structured entries, runs them against all 24 guardrail rules, then opens a focused chat session where the AI produces violations, fix plans with concrete token substitutions, and exportable code -- all grounded in the workspace's design system.

---

## How It Works (User Flow)

1. User navigates to `/copilot` and clicks **"Review Document"** (new button next to "New Chat")
2. A dialog appears for file upload (PDF, image, or markdown) with a title field
3. On submit:
   - File is uploaded to the existing `sources` storage bucket
   - A new `sources` row is created with status `pending`
   - The `extract-source` edge function runs (existing chunked extraction pipeline)
   - A new chat session is created with `session_type = 'review'` and linked to the source via a new `source_id` column on `chat_sessions`
4. Once extraction completes, the edge function `design-review` runs an automated guardrail audit on all extracted entries
5. The review chat opens with the AI's initial analysis pre-populated: violations list, fix plan, and optional code snippets
6. User can continue chatting to ask follow-up questions, request alternative fixes, or export decisions

---

## Failure States

- **Bad PDF / unreadable file**: The existing `extract-source` function already handles this -- sets `status = 'failed'` with an error message. The review chat shows a clear error state with a retry button.
- **Low relevance** (confidence < 0.3): The existing relevance classifier in `extract-source` already flags `status = 'not_relevant'`. The review chat shows a warning with an option to force extraction.
- **Low confidence entries** (confidence < 0.5): The review audit flags these separately as "uncertain entries" and recommends manual verification before acting on the fix plan.
- **Chunking continuation**: The existing `continue_from` mechanism in `extract-source` handles large files. The review session shows a progress indicator and auto-continues chunks until complete before running the audit.
- **AI rate limits (429) / credits (402)**: Surfaced as user-visible error toasts with retry guidance.

---

## Data Model Changes

### Modify `chat_sessions` table
Add two columns:
- `session_type` TEXT DEFAULT `'chat'` -- values: `'chat'` or `'review'`
- `source_id` UUID (nullable) -- FK linking review sessions to the uploaded source

### New table: `review_decisions`
Stores the outcome of a review session as a versioned "Decision" entry that can be promoted to the library.

```text
review_decisions
  id            UUID PK DEFAULT gen_random_uuid()
  session_id    UUID FK -> chat_sessions.id ON DELETE CASCADE
  workspace_id  UUID NOT NULL
  source_id     UUID FK -> sources.id
  title         TEXT NOT NULL
  violations    JSONB DEFAULT '[]'  -- [{rule_id, rule_name, severity, description, affected_entries}]
  fix_plan      JSONB DEFAULT '[]'  -- [{action, target, from_value, to_value, component_recommendation}]
  code_snippet  TEXT                -- optional exportable code
  status        TEXT DEFAULT 'draft' -- draft | approved | rejected
  created_by    UUID
  created_at    TIMESTAMPTZ DEFAULT now()
  updated_at    TIMESTAMPTZ DEFAULT now()
```

RLS policies:
- SELECT/INSERT/UPDATE/DELETE: `user_id = auth.uid()` via join on `chat_sessions`

---

## New Edge Function: `design-review`

**Endpoint**: `supabase/functions/design-review/index.ts`

**Input**: `{ source_id, session_id, workspace_id }`

**Process**:
1. Fetch all `library_entries` where `source_id` matches (the freshly extracted entries)
2. Fetch all canonical/approved entries for the workspace (context for fix recommendations)
3. Build a structured prompt containing:
   - The extracted entries (title, type, content, confidence)
   - The full 24 guardrail rules (from the same `GUARDRAIL_RULES` constant used in design-copilot)
   - The component registry index
   - The approved color palette and typography tokens
4. Call Lovable AI (`google/gemini-3-flash-preview`) with **tool calling** to extract structured output:
   - `violations[]`: Each mapped to a specific guardrail rule ID, with severity and affected entry titles
   - `fix_plan[]`: Concrete substitutions (e.g., "Replace #FF0000 with Deep Forest Green #1B3D2F", "Use Primary Button component instead of custom styled div")
   - `code_snippet`: Optional React/Tailwind code using components from the catalog
   - `risk_notes[]`: Caveats or manual-review items
5. Persist the AI response as the first assistant message in the review chat session
6. Create a `review_decisions` row with the structured violations/fix_plan/code_snippet
7. Stream the formatted response back via SSE

**Answer contract** (enforced via tool calling schema):
```text
**Violations Found**
- [RULE-ID] Rule Name (severity): Description of how it's violated, which entries affected

**Fix Plan**
1. [Action]: Replace [current value] with [token name + value] in [entry title]
2. [Action]: Use [Component Name] instead of [current approach]

**Recommended Code** (if applicable)
// React/Tailwind snippet using approved components

**Risks & Manual Review Items**
- Items requiring human judgment
```

---

## Frontend Changes

### `src/pages/Copilot.tsx` modifications:
- Add "Review Document" button in the session sidebar header (next to "New Chat")
- Upload dialog with file picker (reuse pattern from Sources page: title, file type, file input)
- New session type indicator: review sessions show a document icon and source title instead of chat icon
- Progress state while extraction runs (polling `sources` table for status changes)
- Once extraction + audit complete, auto-load the review chat with the initial analysis

### Review chat rendering:
- Violations rendered with severity badges (error = red, warning = amber) and rule ID links
- Fix plan items rendered as an ordered checklist
- Code snippet rendered in a `CodeBlock` component (already exists) with copy button
- "Export as Decision" button saves/updates the `review_decisions` entry
- "Promote to Library" button creates approved `library_entries` from the fix plan (future enhancement, deferred)

---

## MVP Scope

**Include in MVP**:
- `chat_sessions` schema update (add `session_type`, `source_id`)
- `review_decisions` table with RLS
- `design-review` edge function with guardrail audit + structured output
- Upload flow in Copilot page with progress indicator
- Review chat UI with violations, fix plan, and code snippet rendering
- Failure states: bad file, low relevance, low confidence flagging
- Chunking: auto-continue extraction before running audit

**Defer**:
- "Promote to Library" (creating approved entries from fix plan)
- Image-based document review (OCR via AI vision) -- start with text-based files only
- Diff view comparing extracted entries against existing canonical entries
- Batch review of multiple documents

---

## Technical Details

### Files to Create/Modify

| File | Action |
|------|--------|
| Migration SQL | Add `session_type`, `source_id` to `chat_sessions`; create `review_decisions` table + RLS |
| `supabase/functions/design-review/index.ts` | New edge function for guardrail audit |
| `src/pages/Copilot.tsx` | Add review upload flow, progress UI, review-specific message rendering |
| `supabase/config.toml` | Add `[functions.design-review]` with `verify_jwt = false` |

### Shared Constants
The `GUARDRAIL_RULES` and `COMPONENT_INDEX` arrays in the `design-copilot` edge function will be duplicated into `design-review` (edge functions can't share imports). Both arrays are small and static.

### Extraction + Review Pipeline Sequence
```text
User uploads file
  -> sources row created (status: pending)
  -> extract-source called (existing function)
    -> relevance check (low? show warning, offer force)
    -> chunk extraction loop (8KB chunks, auto-continue)
    -> entries saved as drafts in library_entries
  -> extraction complete (status: completed)
  -> design-review called automatically
    -> fetch extracted entries + workspace context
    -> AI audit against 24 guardrail rules
    -> structured output: violations, fix plan, code
    -> save review_decisions row
    -> stream initial analysis to chat
  -> user can continue chatting for follow-ups
```

