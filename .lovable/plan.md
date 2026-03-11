

# Curated Lens Design Playbook — Architecture & Export Plan

## A. Recommended Architecture

The system already has two layers:

1. **Visual documentation app** — React pages (`src/pages/`) with inline data arrays and JSX
2. **Token export engine** — `src/data/exportGenerators.ts` producing CSS/JSON/TS/Tailwind

The problem: design knowledge (principles, component rules, interaction guidance, maps docs) lives **inside JSX components as inline arrays and hardcoded strings**. This is fine for display but impossible to export reliably.

**Proposed architecture:**

```text
src/
  playbook/                    ← NEW: structured content files
    _meta.ts                   ← system overview, version, brand name
    principles.ts              ← brand principles + design philosophy
    tokens/
      colors.ts
      typography.ts
      spacing.ts
      layout.ts
      motion.ts
      icons.ts
      voice.ts
    components/
      buttons.ts
      cards.ts
      forms.ts
      ...                      ← one file per component/category
    patterns/
      narrative-patterns.ts
    guidelines/
      brand.ts
      imagery.ts
      avoidance.ts
    maps/
      principles.ts
      corridor.ts
      layers.ts
      visual-style.ts
      labels.ts
      route-position.ts
      interaction.ts
      filtering.ts
      guest-experience.ts
      examples.ts
    guardrails/
      rules.ts                 ← existing guardrailRules.ts content
  
  data/
    exportGenerators.ts        ← existing token export
    markdownExport.ts          ← NEW: reads playbook/ → generates .md files
  
  pages/                       ← existing pages import from playbook/
```

**Key principle:** Each playbook file exports a **typed data object** — not JSX. Pages import these objects and render them. The Markdown exporter imports the same objects and serializes them to `.md`.

This means: **one source of truth, two outputs** (visual app + Markdown files).

## B. Source of Truth & Content Structure

**Schema-first, not page-first.**

Each playbook file follows a consistent content model:

```typescript
// Example: src/playbook/maps/principles.ts
export const mapPrinciples = {
  section: "Maps",
  page: "Map Principles",
  slug: "maps/principles",
  description: "...",
  
  content: [
    {
      type: "principle-list",
      items: [
        { title: "Route First", description: "..." },
        // ...
      ]
    },
    {
      type: "dont-list",
      items: [...]
    },
    {
      type: "spec-table",
      rows: [...]
    }
  ],
  
  status: "complete" | "draft" | "incomplete",
  openQuestions: ["Should we define zoom-level thresholds?"],
}
```

Content block types would be: `text`, `principle-list`, `do-dont`, `spec-table`, `layer-stack`, `color-swatch`, `token-reference`, `rule-list`. Each type has a known Markdown serialization.

Pages then become thin renderers:

```tsx
import { mapPrinciples } from "@/playbook/maps/principles";
// render mapPrinciples.content blocks as JSX
```

## C. Markdown Export Structure

```text
curated-lens-playbook/
  README.md                         ← system overview + how to use
  
  01-principles/
    brand-guidelines.md
    design-philosophy.md
    avoidance-rules.md
  
  02-tokens/
    colors.md
    typography.md
    spacing.md
    layout.md
    motion.md
    icons.md
    voice.md
  
  03-components/
    buttons.md
    cards.md
    forms.md
    tables.md
    navigation.md
    ...
  
  04-patterns/
    narrative-patterns.md
  
  05-maps/
    map-principles.md
    dynamic-scenic-corridor.md
    map-layers.md
    map-visual-style.md
    map-labels-geography.md
    route-position.md
    map-interaction.md
    filtering-categories.md
    guest-experience.md
    map-examples.md
  
  06-guardrails/
    design-rules.md
    taste-score.md
  
  07-guidelines/
    imagery.md
    voice-tone.md
  
  08-handoff/
    implementation-notes.md         ← IDE-specific instructions
    open-questions.md               ← known gaps
    token-reference.md              ← quick-reference table
```

Each numbered folder ensures correct reading order. Every `.md` file is self-contained and IDE-uploadable.

## D. Content Model Per Markdown File

Every exported Markdown file follows this template:

```markdown
# [Page Title]

> [One-line purpose statement]

## Purpose
[Why this section exists]

## Principles / Rules
[Numbered or bulleted core rules]

## Specifications
[Tables, values, measurements where applicable]

## Token References
[Which tokens apply — color names, spacing values, font rules]

## Usage Guidance
[When and how to apply]

## Do / Don't
[Concrete examples]

## Implementation Notes
[IDE-specific guidance: CSS classes, component names, constraints]

## Open Questions
[Anything undefined or ambiguous — flagged for human review]
```

Not every file needs every section. The exporter skips empty sections.

## E. Review & Question Flow

Before export, the system runs a **completeness audit**. This is a page (e.g. `/export/review`) that checks each playbook file's `status` and `openQuestions` fields and cross-references against a checklist:

**Automated checks:**
- Does every component have `dos` and `donts`?
- Does every component have `anatomy` and `accessibilityNotes`?
- Are all token categories present (colors, typography, spacing, layout, motion, icons, voice)?
- Do map pages have spec values (not just descriptions)?
- Are there any `status: "incomplete"` or `status: "draft"` entries?
- Are `openQuestions` arrays non-empty?

**Output:** A summary card per section showing: complete / draft / incomplete / missing, with specific gaps listed.

This replaces guesswork with a structured pre-flight check.

## F. Export UI / Workflow

Extend the existing `/export` page with a new tab: **"Design Playbook"** alongside the existing token exports.

**Flow:**
1. **Review tab** — shows all sections with completeness status (green/amber/red)
2. **Open Questions tab** — aggregated list of all `openQuestions` across the playbook
3. **Export tab** — checkboxes per section, "Select All", then "Download as ZIP"
4. Download produces a `.zip` with the folder structure from Section C

The existing token export (CSS/JSON/TS/Tailwind) stays unchanged. The Markdown playbook export is a separate, parallel export path.

## G. Onboarding

The existing `WelcomePanel` and `OnboardingTour` components already handle first-run guidance. Extend with one additional card or tour step:

- "This hub is both documentation and an export tool. Use the Export page to download your design playbook as Markdown for IDE handoff."

No new onboarding system needed. Just one extra slide in the existing tour.

## H. Phase 1 vs Later

**Phase 1 (now):**
- Create `src/playbook/` content files by extracting data from existing pages
- Refactor pages to import from playbook files (thin renderers)
- Build `markdownExport.ts` that serializes playbook → Markdown
- Add "Design Playbook" tab to Export page with completeness review + ZIP download
- Add `open-questions.md` generation

**Phase 2 (later):**
- Component-level Markdown export with code snippets
- Figma token sync
- Version diffing between exports
- Multi-workspace / multi-brand cloning

**Not in scope:**
- Multi-brand inheritance
- Dynamic component syncing
- External API integrations for export

## I. Risks & Tradeoffs

| Risk | Mitigation |
|------|-----------|
| Extracting content from 25+ page components is labor-intensive | Do it incrementally — start with tokens + maps (most structured), then components |
| Content model may not cover all block types | Start with 6–8 block types, extend as needed |
| Playbook files duplicate what pages already contain | This is intentional — the refactor makes pages thinner and content portable |
| ZIP download may hit browser limits for large exports | Unlikely at this scale; if needed, use JSZip library |
| IDE may not interpret Markdown structure correctly | Use standard Markdown only (headers, tables, lists, blockquotes) — no custom syntax |

## Summary

The core move is: **extract design knowledge from JSX into typed data files, then serialize those files as both React pages and Markdown exports.** This gives you a living documentation app and a portable design playbook from the same source of truth.

