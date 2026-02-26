

# Examples Tab for Token Pages

Add an "Examples" tab to each token category page (Colors, Typography, Spacing, Layout, Motion, Icons, Voice) that surfaces real-world usage examples from the `variants` table, filtered and tagged with a controlled vocabulary. Each example shows the design system tokens in context -- bridging the gap between abstract token definitions and applied usage.

---

## How It Works

Each token page gets a two-tab layout: **Tokens** (current content) and **Examples**. The Examples tab queries the `variants` table filtered by a new `token_category` field, and renders each variant as a card with title, summary, kit associations, a live preview, and an exportable spec.

---

## Data Model Changes

### Extend the `variants` table

Add one new column:

- `token_category TEXT` -- maps to the token page: `'color'`, `'typography'`, `'spacing'`, `'layout'`, `'motion'`, `'icons'`, `'voice'`. A variant can belong to one token category (nullable for variants that don't map to a specific token page).

This column is indexed for fast filtering. No new tables needed -- variants already have `slot_type`, `content`, `component_ids`, and `voice_token_ids`. The `variant_tags` junction table already provides controlled vocabulary tagging.

### Controlled vocabulary tags for examples

Seed new tags into `tag_vocabulary` under four categories:

| Category | Tags |
|----------|------|
| `channel` | `web-app`, `landing-page`, `social`, `email` |
| `format` | `headline`, `body`, `cta`, `stat`, `card`, `hero`, `table-row` |
| `intent` | `inform`, `persuade`, `guide`, `confirm`, `warn` |
| `context` | `onboarding`, `dashboard`, `settings`, `marketing`, `transactional` |

These map to `variant_tags.tag_name` and are used for filtering in the Examples tab.

### Relationship to `library_entries`

Examples are **not** library entries. They live in the `variants` table (which is part of the Studio/Applied layer). However, each variant can reference `voice_token_ids` (linking to voice tokens) and `component_ids` (linking to the component registry). The `token_category` field creates the new link to token pages.

Library entries with `entry_type = 'example'` remain a separate concept (extracted from uploaded sources). The Examples tab on token pages shows `variants` -- curated, structured content -- not raw library extractions.

---

## UI Behavior

### Tab Structure

Each token page (e.g., `TokensColors.tsx`) wraps its existing content in a `Tabs` component:

```
[Tokens] [Examples]
```

- **Tokens tab**: Exactly the current page content (no changes)
- **Examples tab**: Filterable grid of variant cards

### Examples Tab Layout

1. **Filter bar**: Four dropdown filters (channel, format, intent, context) using `Select` components. Each pulls its options from `tag_vocabulary` filtered by category. An "All" option resets the filter. Filters are AND-combined.

2. **Results grid**: Cards laid out in a single-column list (matching the token card pattern). Each card shows:
   - **Title**: variant `name` (e.g., "Calm authority headline")
   - **Summary**: derived from `content.meta` or the first 80 chars of `content.text`
   - **Tags**: rendered as `Badge` chips (channel, format, intent, context)
   - **Kit associations**: which kits reference this variant's `slot_type`, shown as small badges
   - **Preview**: the variant content rendered in the appropriate token style (e.g., a headline variant renders in `font-display text-4xl`, a CTA renders as a `Button`)
   - **Export button**: downloads a markdown spec with the content, applied tokens, and voice token references

3. **Empty state**: "No examples match these filters" with a suggestion to adjust filters.

### Preview Rendering

The preview renderer maps `slot_type` to a visual treatment:

| slot_type | Preview rendering |
|-----------|------------------|
| `headline` | `font-display text-2xl font-medium tracking-headline` |
| `body` | `font-body text-sm leading-reading max-w-prose` |
| `cta` | Rendered inside a `<Button>` component |
| `stat` | Stat card layout with `content.meta.label` as description |
| `feature_list` | Bulleted list with check icons |

### Filtering Logic

1. Query `variants` where `token_category` matches the current page (e.g., `'typography'` for the Typography page)
2. Join `variant_tags` to get tag names
3. Client-side filter by selected channel/format/intent/context tags
4. Sort by `sort_order`

---

## Guardrail Validation

Each example (variant) is validated client-side against relevant guardrail rules when displayed. A small status indicator (green check or amber warning) appears on each card:

- **Voice rules**: Check `content.text` against `voice-no-urgency-scarcity`, `voice-no-exclamation-cta`, `voice-sentence-case`, `voice-cta-length`, `voice-no-filler`
- **Typography rules**: For headline variants, verify sentence case (`voice-sentence-case`)
- **Layout rules**: For body variants, verify character count against `layout-max-52ch`

The validation reuses the same logic from `GuardrailRunner.tsx`. A failing check shows as a warning badge on the card -- it doesn't block display.

---

## Export

Each example card has a small export button that downloads a markdown spec:

```markdown
# Example: Calm authority headline
## Content
"Design with purpose"
## Token Category
Typography
## Tags
channel: landing-page | format: headline | intent: persuade | context: marketing
## Applied Tokens
- Font: Playfair Display (font-display)
- Size: text-4xl
- Tracking: tracking-headline
- Line height: leading-hero
## Voice Tokens
- Confident, Not Aggressive
- Sentence Case Headlines
## Kit Associations
- Landing Page (landing-hero template)
```

---

## Seed Data

Seed ~12 example variants with `token_category` assignments and tags, reusing and extending the existing `SEED_VARIANTS` from `studioData.ts`:

| Variant | token_category | Tags |
|---------|---------------|------|
| "Calm authority headline" | typography | landing-page, headline, persuade, marketing |
| "System thinking headline" | typography | web-app, headline, inform, dashboard |
| "Outcome-focused headline" | typography | social, headline, persuade, marketing |
| "Primary action CTA" | voice | web-app, cta, guide, dashboard |
| "Exploration CTA" | voice | landing-page, cta, persuade, marketing |
| "View action CTA" | voice | web-app, cta, guide, dashboard |
| "System value proposition" | layout | landing-page, body, persuade, marketing |
| "Token traceability body" | layout | web-app, body, inform, dashboard |
| "Weekly digest body" | spacing | email, body, inform, transactional |
| "Active users stat" | color | web-app, stat, inform, dashboard |
| "Engagement rate stat" | color | web-app, stat, inform, dashboard |
| "Growth stat" | color | web-app, stat, inform, dashboard |

---

## Technical Details

### Files to Create

| File | Purpose |
|------|---------|
| `src/components/tokens/TokenExamplesTab.tsx` | Shared Examples tab component used by all token pages |

### Files to Modify

| File | Change |
|------|--------|
| Migration SQL | Add `token_category` column to `variants`; seed tags into `tag_vocabulary`; update existing seed variants with `token_category` and insert `variant_tags` |
| `src/pages/tokens/TokensColors.tsx` | Wrap in Tabs, add Examples tab |
| `src/pages/tokens/TokensTypography.tsx` | Wrap in Tabs, add Examples tab |
| `src/pages/tokens/TokensSpacing.tsx` | Wrap in Tabs, add Examples tab |
| `src/pages/tokens/TokensLayout.tsx` | Wrap in Tabs, add Examples tab |
| `src/pages/tokens/TokensMotion.tsx` | Wrap in Tabs, add Examples tab |
| `src/pages/tokens/TokensIcons.tsx` | Wrap in Tabs, add Examples tab |
| `src/pages/tokens/TokensVoice.tsx` | Wrap in Tabs, add Examples tab |

### Implementation Approach

1. **Database migration**: Add `token_category` column, seed tag vocabulary entries, update existing variant seed data
2. **Create `TokenExamplesTab`**: A reusable component that accepts `tokenCategory: string` as a prop, fetches variants + tags, renders the filter bar and card grid
3. **Update each token page**: Wrap existing content in `<Tabs>` / `<TabsContent>`, import and render `<TokenExamplesTab tokenCategory="color" />` in the second tab
4. **Add guardrail validation**: Run relevant checks on variant content and display pass/fail indicators

The `TokenExamplesTab` component handles all data fetching, filtering, preview rendering, and export -- keeping the individual token pages clean with minimal changes (just wrapping in Tabs).

