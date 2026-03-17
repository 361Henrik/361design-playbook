

# Two-Pane Login Page Redesign

Redesign the Auth page from a centered card into a split-panel editorial layout: branded intro on the left, login form on the right.

---

## Layout Structure

```text
Desktop (>=1024px):
+---------------------------+---------------------+
|                           |                     |
|   LEFT PANEL (50%)        |  RIGHT PANEL (50%)  |
|   bg-primary (Deep Green) |  bg-background      |
|                           |                     |
|   Logo                    |  "Sign In" heading   |
|   Headline                |  Login/Signup tabs   |
|   Subhead                 |  Form fields         |
|   Description paragraph   |  CTA button          |
|   3 benefit bullets       |  Forgot password     |
|   Bronze accent line      |  Help link           |
|                           |                     |
+---------------------------+---------------------+

Tablet (768-1023px): Stacked -- intro panel on top (compact), form below
Mobile (<768px): Stacked -- intro collapses to logo + one-liner, form fills viewport
```

---

## Left Panel Content

- **Logo**: "The Curated Lens" in `font-display` (Playfair Display), warm-white text
- **Headline**: "Your Design System. Defined. Applied."
- **Subhead**: "The single source of truth for design tokens, rules, components, and interactive guidance."
- **Description** (3 benefit lines with subtle bronze bullet markers):
  - Browse tokens and patterns with live previews
  - Run guided reviews backed by brand guardrails
  - Export production-ready code for any channel
- **Accent**: A thin horizontal bronze line separator between headline block and benefits
- **Background**: `bg-primary` (Deep Forest Green) with `text-primary-foreground` (Warm White)
- **Spacing**: generous padding (`p-12 lg:p-16`), editorial whitespace

## Right Panel

- Clean `bg-background` (Warm White)
- Title: "Sign In" / "Create Account" based on active tab
- Existing login/signup tab forms (preserved as-is)
- Below form: "Forgot password?" link + "Need help?" link to `/help`
- Centered vertically with `max-w-sm` constraint

## Responsive Behavior

- **Desktop** (`lg:`): `flex-row`, each panel 50%
- **Tablet** (`md:`): stacked, left panel becomes a compact header (logo + headline only, ~200px height)
- **Mobile**: left panel shrinks to logo + single tagline (~80px), form takes remaining space

---

## File Changes

### `src/pages/Auth.tsx` -- Full rewrite of the return JSX

1. Replace the outer `div > Card` with a two-pane flex layout
2. Extract the left branded panel as an inline section (no separate component needed -- it's static content)
3. Keep all existing form logic, state, and handlers untouched
4. Update the title from "Curated Lens" to "The Curated Lens"
5. Add subtle `animate-in` fade on the left panel using Tailwind's `animate` utilities
6. Add "Need help?" link below the forgot password button, linking to `/help`
7. Use `font-display` for headings, `font-body` for body text, `text-bronze` for accent markers

### No other files need changes

All styling uses existing Tailwind tokens (`primary`, `primary-foreground`, `bronze`, `font-display`, `font-body`, spacing tokens). No new dependencies or components required.

---

## Accessibility

- Tab order: left panel is decorative/informational, focus starts on the first form field in the right panel
- Left panel content uses semantic `h1` for the headline, `p` for descriptions
- Form labels and inputs remain properly associated
- Color contrast: warm-white on deep-green meets WCAG AA

## Acceptance Criteria

- Desktop shows side-by-side layout with branded left panel and login form on right
- Left panel displays headline, subhead, benefit bullets, and bronze accent
- Mobile/tablet gracefully stacks with condensed intro
- All existing auth functionality (login, signup, forgot password) works unchanged
- Title reads "The Curated Lens" throughout
- No gradients, no heavy animation -- calm editorial feel

