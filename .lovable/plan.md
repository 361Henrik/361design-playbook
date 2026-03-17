

## Live Visual Examples in the Handbook Viewer

### The Problem

When you select Color, Spacing, or Icon pages in the Handbook Viewer, you see **spec tables with text values** (e.g., "space-5 → 24px", "Stroke Width → 1.5–2px"). But the dedicated token pages (`/tokens/colors`, `/tokens/spacing`, `/tokens/icons`) already render rich visuals — actual color swatches, spacing bars, and live Lucide icons.

The Handbook Viewer's `PlaybookBlockRenderer` doesn't know how to render these visual previews because the playbook data uses generic `spec-table` blocks for spacing and icons, and while `color-swatch` blocks do render swatches, they're small and basic.

### Solution: Add Visual Preview Block Types

Add three new content block types to the playbook schema and corresponding renderers, then update the playbook data files to use them.

**1. New block types in `src/playbook/types.ts`**

```text
SpacingVisualBlock  → { type: "spacing-visual", heading?, steps: { token, px, description? }[] }
IconGridBlock       → { type: "icon-grid", heading?, groups: { category, icons: { name, lucideId }[] }[] }
```

Also enhance the existing `color-swatch` renderer to show contrast pairs and usage context inline.

**2. New renderers in `src/components/PlaybookBlockRenderer.tsx`**

| Block type | What it renders |
|-----------|----------------|
| `spacing-visual` | Horizontal bars at actual pixel widths (like the TokensSpacing page), with token name and px label |
| `icon-grid` | Actual Lucide icons rendered at 24px with name labels, grouped by category |
| Enhanced `color-swatch` | Larger swatches (h-16 instead of h-12), plus a small text sample showing the color as foreground |

**3. Update playbook data files**

| File | Change |
|------|--------|
| `src/playbook/tokens/spacing.ts` | Replace the first `spec-table` (Spacing Scale) with a `spacing-visual` block |
| `src/playbook/tokens/icons.ts` | Replace the "Icon Groups" `spec-table` with an `icon-grid` block using Lucide icon names |
| `src/playbook/tokens/colors.ts` | Already uses `color-swatch` — enhance the renderer only, no data change needed |

**4. Icon rendering approach**

The `icon-grid` renderer will import a curated map of Lucide icons (the same ones already imported in `TokensIcons.tsx`) and render them by name. Icons not found in the map will show a placeholder badge with the name.

### Files to edit

| File | Scope |
|------|-------|
| `src/playbook/types.ts` | Add `SpacingVisualBlock` and `IconGridBlock` interfaces, add to `ContentBlock` union |
| `src/components/PlaybookBlockRenderer.tsx` | Add `SpacingVisualBlock` and `IconGridBlock` renderers, enhance `ColorSwatchBlock` renderer |
| `src/playbook/tokens/spacing.ts` | Replace first spec-table with `spacing-visual` block |
| `src/playbook/tokens/icons.ts` | Replace "Icon Groups" spec-table with `icon-grid` block |

### What stays the same
- All existing block types and renderers continue working
- Dedicated token pages (`/tokens/*`) are unaffected
- Handbook Viewer layout, filter panel, Browse/Present modes unchanged
- ImageCanvas export still works (renders whatever the blocks produce)

