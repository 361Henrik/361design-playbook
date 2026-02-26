

# Onboarding + Product Narrative for Curated Lens

Add a self-explanatory layer to the app: a collapsible Welcome panel in the sidebar, a first-run tour carousel, and a lightweight Help page -- all with calm, editorial copy stored in the database for admin editability.

---

## 1. Data Model

### New table: `onboarding_content`

Stores editable content blocks for the welcome panel, tour slides, and help sections. Admin/Editor can update via Settings or a future content editor.

```text
onboarding_content
  id              UUID PK DEFAULT gen_random_uuid()
  workspace_id    UUID NOT NULL
  content_key     TEXT NOT NULL          -- 'welcome_paragraph', 'how_it_works', 'method', 'start_here', 'tour_slide_1' ... 'tour_slide_5', 'help_quickstart', 'help_glossary', 'help_faq'
  title           TEXT
  body            TEXT NOT NULL          -- markdown or plain text
  metadata        JSONB DEFAULT '{}'     -- e.g. {cta_label, cta_href, sort_order, icon}
  updated_by      UUID
  created_at      TIMESTAMPTZ DEFAULT now()
  updated_at      TIMESTAMPTZ DEFAULT now()
  UNIQUE(workspace_id, content_key)
```

RLS:
- SELECT: `is_workspace_member(auth.uid(), workspace_id)`
- INSERT/UPDATE: editors and admins
- DELETE: admins only
- Service role: full INSERT for seed data

### Extend `profiles` table

Add one column:

- `onboarding_completed BOOLEAN DEFAULT false` -- tracks whether user has finished or dismissed the tour

This avoids a separate preferences table. The "don't show again" toggle and "Skip" button both set this to `true`.

---

## 2. Information Architecture

### Sidebar changes

```text
[Workspace title]
[Welcome panel - collapsible]     <-- NEW
  Dashboard
  ---Tokens---
  Colors | Typography | ...
  ---System---
  Components | Guidelines | ... | Help    <-- NEW entry
```

- The Welcome panel sits between the workspace header and Dashboard nav item
- "Help" is added as the last item in the System nav group (icon: `HelpCircle`)
- The tour carousel is triggered from the Welcome panel ("Take the tour" link) or from Help page

### New route: `/help`

A lightweight page with three sections: Quickstart, Glossary, FAQ. Content loaded from `onboarding_content` table.

---

## 3. Sidebar Welcome Panel

### Behavior
- Rendered as a collapsible section using `Collapsible` from Radix
- Collapse state persisted in `localStorage` (`welcome_panel_collapsed`)
- When collapsed, shows only a small "Welcome" label with chevron; when expanded, shows full content
- Uses sidebar color tokens (`sidebar-foreground`, `sidebar-accent`) for consistency

### Content (seeded into `onboarding_content`)

**Welcome paragraph** (`content_key: 'welcome_paragraph'`):
> "Curated Lens is your design system's single source of truth -- a system of record for what the brand looks like, and a system of judgment for how it should behave. Every token, component, and guideline is traceable, versioned, and enforced."

**How it works** (`content_key: 'how_it_works'`):
1. Upload sources (brand PDFs, style guides, Figma exports)
2. Review extracted entries in the Library
3. Browse and refine design tokens
4. Set guardrails to enforce brand rules
5. Compose layouts in Studio with Channel Kits
6. Export production-ready specs and code

**Start here actions** (`content_key: 'start_here'`):
- Upload a source -> `/sources`
- Review drafts -> `/library`
- Browse tokens -> `/tokens/colors`
- Open Copilot -> `/copilot`
- Explore Studio -> `/studio`
- Export starter kit -> `/export`

**Method** (`content_key: 'method'`):
> "The operating principle is restraint. Tokens define the boundaries. Components compose within them. Guardrails enforce consistency. Channel Kits show the system in action -- applied, not abstract."

### Visual treatment
- Small text (text-xs / text-[11px]), muted sidebar colors
- "Start here" actions as compact text links with small icons
- "How it works" as a numbered list with no bullets, just ordinal numbers
- Subtle top/bottom border separators
- "Take the tour" link at the bottom of the panel

---

## 4. First-Run Tour Carousel

### Trigger conditions
- Auto-shows on first login when `profiles.onboarding_completed` is `false`
- Can be re-opened from Welcome panel ("Take the tour") or Help page
- Rendered as a `Dialog` overlay with carousel content inside

### Slide content (5 slides, seeded as `tour_slide_1` through `tour_slide_5`)

**Slide 1: What this hub is**
- Title: "Your design system, governed"
- Body: "Curated Lens is where brand decisions become enforceable rules. It is not a component library alone -- it is a system of record and a system of judgment."
- CTA: "Go to Dashboard" -> `/`

**Slide 2: Tokens and guardrails**
- Title: "Tokens define. Guardrails enforce."
- Body: "Design tokens capture every visual decision -- colors, typography, spacing, motion. Guardrails automatically check that usage stays within bounds."
- CTA: "Browse tokens" -> `/tokens/colors`

**Slide 3: Library and sources**
- Title: "Upload. Extract. Approve."
- Body: "Upload brand documents and style guides. The system extracts design entries, flags conflicts, and queues drafts for your review."
- CTA: "Upload a source" -> `/sources`

**Slide 4: Copilot and review**
- Title: "Design-aware conversation"
- Body: "Copilot answers questions grounded in your approved library -- not generic advice. Use review sessions to audit code against your system."
- CTA: "Open Copilot" -> `/copilot`

**Slide 5: Studio and exports**
- Title: "Design in action"
- Body: "Channel Kits bundle constraints for specific contexts. Studio lets you compose layouts, swap content variants, run guardrails, and export production specs."
- CTA: "Explore Studio" -> `/studio`

### Navigation
- Dot indicators at bottom
- "Next" / "Previous" buttons (text, not arrows)
- "Skip" button (top right) -- sets `onboarding_completed = true`
- "Don't show again" toggle on last slide -- sets `onboarding_completed = true`
- Closing the dialog without completing also dismisses (does not set the flag, so it shows again next time)

### Visual treatment
- Centered dialog, max-w-lg
- No heavy animation -- simple opacity fade between slides using CSS transitions
- Slide content is centered text with generous whitespace
- CTA is a single primary `Button`

---

## 5. Help Page

### Route: `/help`

Three sections rendered from `onboarding_content`:

**Quickstart** (`help_quickstart`):
A condensed version of the "How it works" steps with links to each page.

**Glossary** (`help_glossary`):
Definitions for: Token, Guideline, Component, Guardrail, Kit, Variant, Template, Canonical, Voice Token, Slot, Source, Library Entry.

**FAQ** (`help_faq`):
- "My uploaded source shows 'failed'" -> Check file format, retry, or contact admin
- "Search returns low-relevance results" -> Library needs more approved entries; try broader terms
- "I see a 'conflict' status" -> Two sources produced contradicting entries; review and resolve in Library
- "How do I change a token value?" -> Edit the voice token or update the source material and re-extract
- "Exports look different from preview" -> Studio preview uses template renderers; exported code may need framework-specific adjustments

### Visual treatment
- Same page layout as other pages (PageHeader + content)
- Sections as `Card` components with `Accordion` for FAQ items
- "Restart tour" button at top that reopens the carousel

---

## 6. Technical Details

### Files to create

| File | Purpose |
|------|---------|
| Migration SQL | Create `onboarding_content` table, add `onboarding_completed` to `profiles`, seed content |
| `src/components/WelcomePanel.tsx` | Collapsible sidebar welcome section |
| `src/components/OnboardingTour.tsx` | First-run carousel dialog |
| `src/pages/Help.tsx` | Help page with quickstart, glossary, FAQ |

### Files to modify

| File | Change |
|------|--------|
| `src/components/AppSidebar.tsx` | Add WelcomePanel between header and nav; add Help to systemNav |
| `src/components/AppShell.tsx` | Add OnboardingTour component (reads profile flag, shows on first run) |
| `src/App.tsx` | Add `/help` route |
| `src/components/CommandSearch.tsx` | Add "Help" entry |

### Data flow

1. `AppShell` mounts `OnboardingTour` which queries `profiles.onboarding_completed`
2. If `false`, dialog opens automatically
3. User can skip or complete -- updates `profiles.onboarding_completed = true`
4. `WelcomePanel` fetches `onboarding_content` rows for the active workspace
5. Falls back to hardcoded seed content if DB returns empty (same pattern as Studio)
6. Help page fetches `onboarding_content` rows with `help_*` keys

### Collapse persistence
- `localStorage` key: `welcome_panel_collapsed`
- Default: expanded (collapsed = false)
- Toggle via chevron button in the panel header

### Content editability (deferred but designed for)
- All content lives in `onboarding_content` with `content_key` identifiers
- Admin/Editor can update via direct DB access or a future "Content Manager" UI
- The `metadata` JSONB field stores CTA labels, hrefs, sort orders, and icon names

---

## 7. MVP Scope

### Include
1. Database migration: `onboarding_content` table + `profiles.onboarding_completed` column + seed all content
2. `WelcomePanel` component with collapsible behavior and "Start here" links
3. `OnboardingTour` carousel dialog with 5 slides and skip/dismiss behavior
4. `Help` page with quickstart, glossary, and FAQ
5. Sidebar and routing updates

### Defer
- Content editing UI (admin form for updating onboarding_content)
- Per-section collapse memory (e.g. collapsing just "Method" vs the whole panel)
- Analytics on tour completion rates
- Localization / multi-language content

