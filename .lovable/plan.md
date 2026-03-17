

## Handbook Viewer — Plan

### What we're building

A new **Handbook Viewer** page that renders all playbook content in a structured, browsable format with checkbox selection and live preview. It leverages the existing `src/playbook/` data layer as its single source of truth.

### Placement

Add **Handbook Viewer** to the **Tools** section in the sidebar (alongside Export, Studio, Library, etc.) with a `BookOpen` icon.

### Architecture

The page will import `allPlaybookPages` and `getPlaybookSections()` from `src/playbook/index.ts` and render playbook `ContentBlock[]` data directly — no content duplication.

A new renderer component will handle all block types (`text`, `color-swatch`, `spec-table`, `do-dont`, `principle-list`, `rule-list`, `token-reference`, `layer-stack`, `category-list`, `scenario`, `component-spec`, `channel-kit`).

### Page layout

```text
┌─────────────────────────────────────────────────┐
│  PageHeader: Handbook Viewer                    │
│  [Search] [View: Overview | Full] [Selected only]│
├──────────────┬──────────────────────────────────┤
│  Selection   │  Preview Area                    │
│  Panel       │                                  │
│  (sticky)    │  Rendered content blocks for     │
│              │  each selected playbook page     │
│  ☑ Tokens    │                                  │
│    ☑ Colors  │  ┌─ Card: Color Tokens ────────┐│
│    ☐ Typo    │  │  [content blocks rendered]  ││
│  ☑ Maps      │  └────────────────────────────┘│
│    ☑ Princ.  │                                  │
│  ...         │  ┌─ Card: Map Principles ──────┐│
│              │  │  [content blocks rendered]  ││
│              │  └────────────────────────────┘│
└──────────────┴──────────────────────────────────┘
```

Left panel: ~280px, sticky. Right panel: flex-1 scrollable.

### Files to create/edit

1. **`src/pages/HandbookViewer.tsx`** — Main page
   - State: `selectedSlugs: Set<string>`, `searchQuery`, `viewMode: 'overview' | 'full'`, `showSelectedOnly`
   - Left panel: sections from `getPlaybookSections()`, each with "Select all / Clear" controls and individual checkboxes per page
   - Right panel: iterate selected pages, render each inside a Card with the page title, description, status badge, and content blocks
   - Overview mode: show title + description + first content block only
   - Full mode: render all content blocks
   - Persist selection to `localStorage` key `handbook-viewer-selection`

2. **`src/components/PlaybookBlockRenderer.tsx`** — Reusable renderer
   - Takes a `ContentBlock` and renders the appropriate UI:
     - `text` → heading + prose paragraph
     - `color-swatch` → grid of color chips
     - `spec-table` → simple table
     - `do-dont` → reuse existing `DosDonts` component
     - `principle-list` → styled list
     - `rule-list` → bulleted list with do/dont/neutral styling
     - `token-reference` → token cards
     - `layer-stack` → numbered layer cards
     - `category-list` → tag-style list
     - `scenario` → scenario cards
     - `component-spec` → component detail cards with code blocks
     - `channel-kit` → kit summary cards

3. **`src/components/AppSidebar.tsx`** — Add Handbook Viewer to `toolsNav`

4. **`src/App.tsx`** — Add route `/handbook` → `HandbookViewer`

### Interaction details

- **Search**: filters the left panel list by page name (case-insensitive)
- **Select all / Clear all**: per-section toggle
- **Show selected only**: hides unchecked items from left panel
- **Expand all / Collapse all**: buttons in the preview area header that control whether preview cards are open or collapsed (using a collapsible wrapper)
- **View toggle**: Overview (compact) vs Full (all blocks)
- **localStorage persistence**: save/restore selected slugs on mount

### Visual approach

- Reuse existing `Card`, `Checkbox`, `Input`, `Badge`, `Button` components
- Soft borders, generous spacing, no aggressive colors
- Section headers in the left panel use the same `text-[10px] uppercase tracking-widest` style as sidebar group labels
- Preview cards use `Card` with `CardContent` and the standard border treatment
- Status shown as subtle `Badge` (complete/draft/incomplete)

### No backend changes needed

All data comes from the in-memory playbook registry. No database tables or edge functions required.

