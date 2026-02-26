

# Channel Kits + Preview Ports

Live preview environments that show the design system and tone of voice **in action** across different delivery surfaces -- using real tokens, real components, and curated copy patterns.

---

## 1. Where It Lives

- New page at `/channel-kits` under the System group in the sidebar (between "Export" and "Sources", using a `Megaphone` icon)
- The page has a channel selector at the top (tab bar or card picker) and a live preview frame below
- Each channel kit is a self-contained preview that enforces specific constraints from the design system

---

## 2. MVP Templates (6 total)

Each template is a React component that renders a realistic layout using only approved tokens, components, and copy. The copy is hardcoded in MVP (not fetched from `channel_kits` DB table -- that comes later).

| # | Template ID | Channel | What It Shows |
|---|------------|---------|---------------|
| 1 | `web-app-dashboard` | Web App | Dashboard-style layout: sidebar hint, stat cards, a data table row, primary + secondary buttons |
| 2 | `landing-hero` | Landing Page | Panel pairing (anchor + primary context), hero headline, CTA, feature list cards |
| 3 | `landing-pricing` | Landing Page | Three pricing cards with tiered CTAs, badge accents, feature checklists |
| 4 | `social-post` | Social Post | Square card format with headline, body (character-limited), soft CTA, brand color framing |
| 5 | `email-header` | Email | Email header + hero image area + single CTA + footer, constrained width (600px) |
| 6 | `email-transactional` | Email | Transactional email: confirmation message, action button, fine print |

Each template includes curated copy that follows voice tokens (sentence case, verb-first CTAs, no exclamation marks, no filler).

---

## 3. Preview Frame UI

### Layout
- **Top bar**: Channel selector as a `TabsList` (Web App | Landing Page | Social | Email)
- **Constraint bar** (below tabs): Shows active constraints as read-only badges:
  - Heading limit: "40 chars" 
  - CTA style: "Verb-first, 1-3 words"
  - Tone: "Functional, precise"
  - Typography: "Playfair Display / Inter"
  - Color distribution: "60/30/8"
- **Preview area**: Bordered container with a subtle checkerboard or light gray surround to frame the preview
  - Landing Page and Web App render at full width of the content area
  - Social Post renders at a fixed 400x400 square, centered
  - Email renders at a fixed 600px width, centered (standard email width)
- **Template sub-tabs**: When a channel has multiple templates (Landing Page has 2, Email has 2), sub-tabs appear below the main channel tabs
- **Viewport toggle**: Small device-width toggle (desktop / tablet / mobile) that wraps the preview in a resizable container

### Interaction
- Preview is read-only -- no editing, no content generation
- Hovering over a component in the preview shows a subtle tooltip with the component name from the registry
- The constraint bar updates when switching channels

---

## 4. How Each Kit Constrains the System

Each channel kit defines a constraint profile. These are hardcoded in MVP as a TypeScript data structure:

```text
ChannelKit {
  id: string
  name: string
  description: string
  toneModifiers: string[]           -- ["Functional", "Precise"]
  maxHeadingLength: number          -- character limit
  maxBodyLength: number | null      -- null = no limit
  ctaRules: string                  -- "Verb-first, 1-3 words"
  allowedComponents: string[]       -- component IDs from registry
  typographyOverrides: {            -- channel-specific type constraints
    maxHeadlineSize: string         -- e.g. "text-2xl" (web app) vs "text-4xl" (landing)
    bodySize: string                -- e.g. "text-sm" vs "text-base"
  }
  spacingProfile: string            -- "compact" | "standard" | "generous"
  colorEmphasis: string             -- which color gets more weight in this channel
  templates: TemplateEntry[]
}

TemplateEntry {
  id: string
  name: string
  description: string
  component: () => ReactNode        -- the preview render function
}
```

### Constraint matrix (MVP)

| Constraint | Web App | Landing Page | Social Post | Email |
|-----------|---------|-------------|-------------|-------|
| Heading limit | 40 chars | 60 chars | 80 chars | 50 chars |
| Body limit | none | none | 280 chars | none |
| CTA words | 1-3 | 1-5 | 1-3 (soft) | 1-3 |
| Headline size | text-xl | text-4xl | text-2xl | text-xl |
| Body size | text-sm | text-base | text-sm | text-sm |
| Spacing | compact | generous | compact | standard |
| Color emphasis | Functional (more white) | Editorial (more green) | Warm (bronze accents) | Neutral |
| Components | Cards, tables, buttons, badges | Panel pairing, hero, feature cards | Single card | Single-column, CTA button |

---

## 5. Export Options

Each channel kit preview can be exported in three formats:

### a) Layout Spec (Markdown)
A structured markdown document describing the layout, component usage, spacing, and constraints:
```
# Landing Page -- Hero Section
## Constraints
- Heading: max 60 characters, sentence case, Playfair Display
- CTA: verb-first, 1-5 words, no exclamation marks
- Color distribution: 60% white / 30% green / 8% bronze max
## Layout
- Panel pairing: Anchor (left) + Primary Context (right)
- Grid: grid-cols-1 md:grid-cols-2, gap-4
## Components Used
- Anchor Context Panel (card-anchor)
- Primary Button (button-primary)
- Secondary Button (button-secondary)
```

### b) Code Export (React/Tailwind)
The actual JSX + Tailwind code for the template, using the project's component imports. Downloaded as a `.tsx` file. Uses the existing `downloadFile` utility from `exportGenerators.ts`.

### c) Copy Spec (Markdown)
All copy used in the template, annotated with voice token references:
```
# Landing Page -- Hero Copy Spec
## Headline
"Design with purpose" (sentence case, max 60 chars)
Voice tokens: Confident Not Aggressive, Sentence Case Headlines
## CTA
"Get started" (verb-first, 2 words, no exclamation)
Voice tokens: Verb-First Calm Authority, No Exclamation Marks
## Body
"Every decision should be intentional..." (no filler words)
Voice tokens: No Filler Words
```

Export is triggered by a dropdown button in the top bar: "Export" with three menu items (Layout Spec, Code, Copy Spec). All three can also be downloaded together as a zip-like bundle (sequential downloads, same pattern as the Starter Kit in Export page).

---

## 6. Data Model

### No new database tables for MVP
All channel kit data and templates are hardcoded in a new TypeScript file `src/data/channelKits.tsx`. This mirrors how `componentRegistry.tsx` works -- the data is static, the rendering is dynamic.

### Future: `channel_kits` table
The existing plan already defines this table. When CRUD is added later, the hardcoded data becomes seed/default data, and user-created kits are stored in the database. The preview templates remain in code (they're React components), but the constraint profiles and copy specs become editable.

---

## 7. Success Criteria

1. **Constraint fidelity**: Every template passes all 29 guardrail rules (24 visual + 5 voice) when manually reviewed. No template violates its own channel constraints.
2. **Token traceability**: Every color, font, spacing value, and component used in a template traces back to a named token or registry entry. No arbitrary values.
3. **Copy compliance**: All copy in templates follows voice tokens -- sentence case headlines, verb-first CTAs of 1-3 words, no exclamation marks, no filler words, no urgency language.
4. **Export accuracy**: Exported code compiles and renders identically to the preview when pasted into a fresh project with the Starter Kit tokens applied.
5. **Visual coherence**: Each channel looks distinct (a social post should feel different from a web app dashboard) while clearly belonging to the same brand system.
6. **No content generation**: The page is a reference/preview system. There is no text input, no AI prompt, no "generate copy" button.

---

## Technical Details

### Files to Create

| File | Purpose |
|------|---------|
| `src/data/channelKits.tsx` | Channel kit definitions (constraints, metadata) + template render functions |
| `src/pages/ChannelKits.tsx` | Main page with channel tabs, constraint bar, preview frame, export buttons |

### Files to Modify

| File | Change |
|------|--------|
| `src/App.tsx` | Add `/channel-kits` route |
| `src/components/AppSidebar.tsx` | Add "Channel Kits" to systemNav |
| `src/components/CommandSearch.tsx` | Add Channel Kits to search index |

### Dependencies
No new dependencies. Templates use existing components (`Button`, `Card`, `Badge`, `Table`, `Tabs`, etc.) and existing utilities (`downloadFile` from `exportGenerators.ts`).

### Template implementation pattern
Each template is a plain React component that uses only design system components and tokens. Example structure:

```tsx
// Inside channelKits.tsx
const LandingHeroTemplate = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="rounded-lg bg-primary text-primary-foreground p-6 space-y-3">
      <h1 className="font-display text-4xl font-medium tracking-headline leading-hero">
        Design with purpose
      </h1>
      <p className="text-sm font-body leading-reading opacity-85">
        Every decision should be intentional. The system provides the rails.
      </p>
      <Button variant="secondary">Get started</Button>
    </div>
    <Card>...</Card>
  </div>
);
```

The code export captures this JSX as a string (same pattern as `componentRegistry.tsx` where each entry has a `code` string alongside the `preview` function).

