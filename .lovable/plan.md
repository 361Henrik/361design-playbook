

# Design Copilot for Curated Lens

A constrained AI chat assistant that answers design questions **exclusively** from the workspace's own tokens, components, guidelines, and library entries -- citing sources in every answer.

---

## 1. UX: Where It Lives & How Sessions Work

- **Access point**: A new "Copilot" item in the sidebar under the System group (sparkle icon), navigating to `/copilot`.
- **Layout**: Full-page chat interface within the AppShell. Left column is a session list (past conversations), right column is the active chat with a message input at the bottom.
- **Sessions**: Each conversation is a "session" tied to the current workspace. Users can start a new session or resume an old one. Sessions auto-title based on the first user question.
- **Streaming**: AI responses stream token-by-token into the chat using SSE from the edge function.
- **Citations**: Every AI response includes inline citation markers (e.g., `[1]`, `[2]`) that map to a "References" section at the bottom of each message, linking to the source library entry or token page.

---

## 2. Data Model

Four new tables:

```text
chat_sessions
  id          UUID PK DEFAULT gen_random_uuid()
  workspace_id UUID FK -> workspaces.id
  user_id     UUID (auth.uid)
  title       TEXT DEFAULT 'New conversation'
  created_at  TIMESTAMPTZ DEFAULT now()
  updated_at  TIMESTAMPTZ DEFAULT now()

chat_messages
  id          UUID PK DEFAULT gen_random_uuid()
  session_id  UUID FK -> chat_sessions.id ON DELETE CASCADE
  role        TEXT ('user' | 'assistant')
  content     TEXT
  created_at  TIMESTAMPTZ DEFAULT now()

chat_citations
  id          UUID PK DEFAULT gen_random_uuid()
  message_id  UUID FK -> chat_messages.id ON DELETE CASCADE
  entry_id    UUID FK -> library_entries.id (nullable -- for component registry refs)
  entry_type  TEXT ('library_entry' | 'token_page' | 'component' | 'guardrail')
  entry_title TEXT
  citation_index INTEGER (the [1], [2] number)

decision_entries (optional -- for exporting copilot decisions back to the library)
  id          UUID PK DEFAULT gen_random_uuid()
  session_id  UUID FK -> chat_sessions.id
  message_id  UUID FK -> chat_messages.id
  title       TEXT
  content     TEXT
  entry_type  TEXT DEFAULT 'decision'
  status      TEXT DEFAULT 'draft'
  workspace_id UUID FK -> workspaces.id
  created_at  TIMESTAMPTZ DEFAULT now()
```

**RLS policies**:
- `chat_sessions`: SELECT/INSERT/UPDATE/DELETE where `user_id = auth.uid()` (users own their sessions)
- `chat_messages`: SELECT/INSERT where session belongs to user (via join on chat_sessions)
- `chat_citations`: SELECT where parent message's session belongs to user
- `decision_entries`: Same workspace-member scoping as library_entries

---

## 3. Retrieval Strategy

The edge function `supabase/functions/design-copilot/index.ts` performs retrieval before prompting the AI:

1. **Keyword search**: Query `library_entries` using `ilike` on title, summary, and content (same as existing `search-library` function).
2. **Embedding search**: Use the existing `match_library_entries` RPC to find semantically similar entries (vector similarity with threshold 0.5).
3. **Workspace scoping**: All queries filter by `workspace_id` to keep results within the active workspace.
4. **Canonical token bias**: Results where `is_canonical = true` are boosted -- placed first in the context window and explicitly marked as "canonical source of truth" in the system prompt.
5. **Component registry**: The edge function also receives a condensed index of the hardcoded component registry (name, category, dos/donts) so the copilot can reference registered components.
6. **Guardrail rules**: The full `guardrailRules` list is included in the system prompt so the copilot can cite applicable rules.

The retrieval results (up to 15 entries) are injected into the system prompt as structured context blocks.

---

## 4. Answer Contract

Every AI response must follow this structure (enforced via system prompt + tool calling):

```text
**Recommendation**
[Direct answer to the question, using only system-known tokens/components]

**Rules Applied**
- [Guardrail rule name]: [How it applies]
- [Guardrail rule name]: ...

**References**
[1] Token: "Deep Forest Green" (library entry)
[2] Component: "Primary Button" (component registry)
[3] Guideline: "Color Distribution" (library entry)

**Risks**
- [Any caveats, e.g., "This combination hasn't been tested at small sizes"]

**Code Snippet** (optional, only if user asked for implementation)
```css
/* example output */
```
```

The edge function uses **tool calling** to extract structured output with fields: `recommendation`, `rules_applied[]`, `references[]`, `risks[]`, `code_snippet?`. The frontend renders each section with appropriate styling.

---

## 5. Chat Guardrails

The system prompt enforces strict boundaries:

1. **No generic advice**: "You may ONLY recommend tokens, colors, components, patterns, and guidelines that exist in the provided context. If the answer is not in the context, say 'I don't have information about this in the current design system.'"
2. **No inventing tokens**: "NEVER invent new color values, font names, spacing values, or component names. Only reference what exists."
3. **Label outside-system content**: If the user asks about something not covered, the copilot must respond with a clearly labeled `[OUTSIDE SYSTEM]` prefix and suggest creating a new library entry or uploading a source document.
4. **Mandatory citations**: "Every factual claim must include a citation marker [N] referencing a specific library entry, component, or guardrail rule."
5. **Workspace isolation**: The copilot never references data from other workspaces.
6. **No destructive actions**: The copilot is read-only -- it cannot modify library entries, approve drafts, or change settings. The only write action is exporting a "decision entry" back to the library as a draft.

---

## 6. Implementation Steps

### Step 1: Database migration
- Create `chat_sessions`, `chat_messages`, `chat_citations`, `decision_entries` tables
- Add RLS policies scoped to user ownership
- Enable realtime on `chat_messages` for streaming UX (optional)

### Step 2: Edge function `design-copilot`
- Accept `{ session_id, message, workspace_id }` 
- Load conversation history from `chat_messages`
- Run retrieval (keyword + embedding + canonical bias)
- Build system prompt with context blocks + guardrail rules + component index
- Call Lovable AI gateway (`google/gemini-3-flash-preview`) with tool calling for structured output
- Stream response back via SSE
- Persist assistant message + citations to database after completion

### Step 3: Frontend page `/copilot`
- `src/pages/Copilot.tsx` -- session list + chat interface
- Message bubbles with markdown rendering (react-markdown not installed, use simple HTML rendering or add dependency)
- Citation rendering with clickable reference links
- "Export as Decision" button on assistant messages to create a `decision_entries` draft
- Session management (new, rename, delete)

### Step 4: Wire into app
- Add route to `App.tsx`
- Add "Copilot" nav item to `AppSidebar.tsx`
- Update `CommandSearch.tsx` pages list

---

## 7. Minimal MVP Scope

For the first iteration, **defer**:
- `decision_entries` table and export (add later)
- `chat_citations` table (extract citations client-side from structured response instead of persisting)
- Embedding-based retrieval (start with keyword-only, add embeddings when entries have them)
- Session rename/delete (just auto-title + list)

**MVP delivers**:
- `chat_sessions` and `chat_messages` tables with RLS
- Edge function with keyword retrieval + canonical bias + guardrail context
- Streaming chat UI at `/copilot`
- Structured answer format with inline citations
- System prompt guardrails (no generic advice, no invented tokens, outside-system labeling)
- Conversation history persistence and resumption

### Files to create/modify

| File | Action |
|------|--------|
| Migration SQL | Create `chat_sessions`, `chat_messages` tables + RLS |
| `supabase/functions/design-copilot/index.ts` | New edge function |
| `src/pages/Copilot.tsx` | New chat page |
| `src/App.tsx` | Add `/copilot` route |
| `src/components/AppSidebar.tsx` | Add Copilot nav item |
| `src/components/CommandSearch.tsx` | Add Copilot to pages list |

