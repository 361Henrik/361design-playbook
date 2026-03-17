

## Color Mismatch on Auth Page — Root Cause & Fix

### The Problem

The screenshot shows **dark/black text on the marine blue panel**, which violates the playbook's approved contrast pair: **"Cream on Marine Blue"**.

### Root Cause

Line 123-125 of `src/index.css`:
```css
h1, h2, h3, h4, h5, h6 {
  @apply font-display text-foreground;
}
```

This global base rule forces **all headings to `text-foreground` (charcoal/black)**, which overrides the `text-primary-foreground` (cream) set on the parent `<section>` in the Auth page. CSS specificity means the base layer `h1` selector wins over inherited color from the parent container.

The Auth page headline "Your Design System. Defined. Applied." is an `<h1>`, so it renders in charcoal instead of cream — breaking the approved "Cream on Marine Blue" contrast pair.

### The Fix

**`src/index.css`** — Change the heading rule to only set `font-display` (the font family), and remove `text-foreground` so headings can inherit color from their parent context:

```css
h1, h2, h3, h4, h5, h6 {
  @apply font-display;
}
```

This is the correct approach because:
- Headings on cream/ivory backgrounds already inherit `text-foreground` from the `body` rule
- Headings inside colored panels (like the marine blue auth panel) will correctly inherit `text-primary-foreground` from their parent
- No other pages break because `text-foreground` is already set on `body` and flows down naturally

**No other file changes needed.** This single line fix resolves the contrast violation globally.

### Playbook Compliance Check

| Rule | Status |
|------|--------|
| Cream on Marine Blue (approved pair) | Will be fixed by this change |
| Charcoal on Cream (approved pair) | Still works via body inheritance |
| Charcoal on Ivory (approved pair) | Still works via body inheritance |
| Bronze on Cream (accent only) | Unaffected |
| No pure black (#000) | Correct — using #111111 charcoal |

