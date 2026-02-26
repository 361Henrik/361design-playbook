

# Tier 4: Platform Intelligence & Scale

Building on the completed Tiers 1-3 (auth, batch ops, onboarding, dedup, tags, conflicts, chunking, relevance, deterministic exports, confidence scores, taste score, contrast checks, audit logs), this tier adds platform-wide intelligence, real-time awareness, usage analytics, and team workspace support.

---

## 1. Global Command Search (Cmd+K)

A keyboard-shortcut-activated command palette that searches across all system entities -- tokens, components, library entries, guidelines, and pages.

**What it does:**
- Press Cmd+K (or Ctrl+K) anywhere to open a search overlay
- Searches library entries (via the existing `search-library` edge function), token pages, component pages, and navigation routes
- Shows categorized results: Tokens, Library Entries, Components, Pages
- Selecting a result navigates to the relevant page
- "Exact value" queries (e.g., "hex for Deep Forest Green") return instant answers via AI summary

**Changes:**
- New `src/components/CommandSearch.tsx` using the existing `cmdk` + `Command` UI components
- Wire into `AppShell.tsx` with global keyboard listener
- Add search hint badge in the sidebar footer ("Cmd+K to search")

---

## 2. Activity Notifications & Feed

An in-app notification center so team members know when sources are uploaded, drafts are ready for review, conflicts are detected, or guardrail exceptions expire.

**What it does:**
- Bell icon in sidebar footer shows unread notification count
- Clicking opens a slide-out panel with recent activity
- Notification types: new source uploaded, extraction complete/failed, draft entries awaiting review, conflict detected, guardrail exception expiring, role changed
- Notifications are per-user and dismissable
- Uses Realtime subscriptions on `sources`, `library_entries`, and `guardrail_exceptions` tables

**Changes:**
- New `notifications` database table (id, user_id, type, title, message, read, entity_id, entity_type, created_at)
- Database trigger functions on `sources` (status change) and `library_entries` (new draft/conflict) to auto-generate notifications for relevant users
- New `src/components/NotificationCenter.tsx` with slide-out panel
- Realtime subscription for live notification updates
- Add to `AppSidebar.tsx` footer

---

## 3. Analytics Dashboard

A visual overview of design system health, adoption metrics, and activity trends on the Dashboard page.

**What it does:**
- Replaces the simple token category grid with a richer dashboard when data exists
- Cards showing: total library entries (by status), sources uploaded (by status), guardrail health score, recent activity timeline
- Charts: entries added over time (line chart), entry type distribution (pie/bar), extraction success rate
- Uses `recharts` (already installed) for visualizations
- Still shows the token category grid and onboarding checklist

**Changes:**
- Rewrite `src/pages/Dashboard.tsx` to add analytics section above token categories
- Query aggregate data from `library_entries`, `sources`, and `versions` tables
- Add sparkline/mini-charts using recharts
- Show "last 7 days" activity summary

---

## 4. Workspace / Multi-Tenant Support

Allow multiple design systems (workspaces) within one installation, so a team managing multiple brands can switch between them.

**What it does:**
- New `workspaces` table with name, description, brand color, and owner
- All existing tables get a `workspace_id` column (sources, library_entries, versions, tag_vocabulary, guardrail_exceptions)
- Workspace switcher in sidebar header (dropdown replacing static "Curated Lens" title)
- RLS policies scoped to workspace membership
- Default workspace auto-created for existing data

**Changes:**
- New `workspaces` table (id, name, description, created_by, created_at)
- New `workspace_members` table (id, workspace_id, user_id, role, joined_at)
- Migration to add `workspace_id` to existing tables with a default workspace
- Update all queries to filter by active workspace
- New `src/hooks/useWorkspace.tsx` context for active workspace
- Workspace switcher UI in `AppSidebar.tsx`
- Workspace management page in Settings

---

## 5. Scheduled Reports & Digest Emails

Weekly digest email summarizing design system activity, sent to all team members.

**What it does:**
- Edge function triggered on a schedule (via pg_cron or external cron)
- Summarizes: new entries added, sources processed, conflicts pending, guardrail health score
- Sends via Resend or similar email service
- Users can opt in/out in Settings

**Changes:**
- New `supabase/functions/weekly-digest/index.ts` edge function
- Email preferences column on `profiles` table (`email_digest` boolean)
- Settings UI toggle for email digest
- Requires email service API key (Resend)

---

## Technical Details

### Database Migrations

```text
New tables:
  + notifications (id, user_id, type, title, message, read BOOLEAN DEFAULT false,
    entity_id UUID, entity_type TEXT, created_at TIMESTAMPTZ DEFAULT now())
  + workspaces (id, name TEXT, description TEXT, created_by UUID, created_at)
  + workspace_members (id, workspace_id UUID, user_id UUID, role TEXT DEFAULT 'editor',
    UNIQUE(workspace_id, user_id))

Existing table additions:
  + sources: workspace_id UUID
  + library_entries: workspace_id UUID
  + versions: workspace_id UUID
  + tag_vocabulary: workspace_id UUID
  + guardrail_exceptions: workspace_id UUID
  + profiles: email_digest BOOLEAN DEFAULT true

Enable realtime:
  + ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;

Triggers:
  + notify_on_source_status_change() -- inserts into notifications when source status changes
  + notify_on_new_draft() -- inserts into notifications when new draft/conflict entries created
```

### RLS Policies

```text
notifications:
  - SELECT: user_id = auth.uid()
  - UPDATE: user_id = auth.uid() (mark as read)
  - INSERT: via trigger only (SECURITY DEFINER)

workspaces:
  - SELECT: user is a member (via workspace_members)
  - INSERT: any authenticated user
  - UPDATE/DELETE: workspace creator or admin

workspace_members:
  - SELECT: members of the same workspace
  - INSERT/DELETE: workspace admin or owner

All existing tables:
  - Add workspace_id filter to existing policies
```

### Files to Create/Modify

| Area | Files |
|------|-------|
| Command Search | New `src/components/CommandSearch.tsx`, edit `src/components/AppShell.tsx` |
| Notifications | New `src/components/NotificationCenter.tsx`, edit `AppSidebar.tsx`, migration |
| Analytics | Edit `src/pages/Dashboard.tsx` (add charts + stats cards) |
| Workspaces | New `src/hooks/useWorkspace.tsx`, edit `AppSidebar.tsx`, edit all query files, migration |
| Digest | New `supabase/functions/weekly-digest/index.ts`, edit `Settings.tsx` |

### Recommended Build Order

1. **Global Command Search** -- No migration needed, immediate usability win, uses existing components
2. **Analytics Dashboard** -- No migration needed, read-only queries, big visual impact
3. **Activity Notifications** -- Requires migration + triggers + realtime, but high value for team awareness
4. **Workspace / Multi-Tenant** -- Largest change, touches all tables and queries, build last
5. **Scheduled Digest Emails** -- Depends on external email service, lowest priority

