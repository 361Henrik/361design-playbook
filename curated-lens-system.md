# The Curated Lens Design System

> Single source of truth for design tokens, components, patterns, and channel rules.

---

## 1. Foundations

### 1.1 Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--primary` | HSL 153 38% 17% (Deep Forest Green) | Primary surfaces, sidebar, anchoring panels |
| `--background` | HSL 40 33% 97% (Warm White) | Page background, primary context panels |
| `--accent` | HSL 36 42% 56% (Antique Bronze) | Accent markers, highlights — <8% usage |
| `--foreground` | HSL 240 29% 14% (Near Black) | Body text |
| `--card` | HSL 37 21% 95% (Warm Off-White) | Card backgrounds |
| `--muted-foreground` | HSL 240 10% 44% | Secondary text |
| `--destructive` | HSL 0 72% 51% | Error states only |

**Distribution rule**: 60–70% Warm White, 20–30% Deep Green, <8% Antique Bronze.

### 1.2 Typography

**Fonts**:
- **Display font**: Playfair Display (headings)
- **Body font**: Lexend (body, UI, labels)

| Role | Font | Size | Weight | Line-height | Letter-spacing |
|------|------|------|--------|-------------|----------------|
| Display | Playfair Display | 3rem (48px) | 500 | 1.2 | -0.01em |
| H1 | Playfair Display | 2.25rem (36px) | 500 | 1.2 | -0.01em |
| H2 | Playfair Display | 1.5rem (24px) | 500 | 1.2 | -0.01em |
| H3 | Playfair Display | 1.25rem (20px) | 500 | 1.2 | -0.005em |
| Body Large | Lexend | 1.125rem (18px) | 400 | 1.6 | normal |
| Body | Lexend | 1rem (16px) | 400 | 1.6 | normal |
| Body Small | Lexend | 0.875rem (14px) | 400 | 1.6 | normal |
| Label | Lexend | 0.8125rem (13px) | 500 | 1.3 | 0.01em |
| Caption | Lexend | 0.75rem (12px) | 400 | 1.3 | 0.01em |

**Rules**:
- Weight 300 is prohibited.
- Headlines: line-height ~1.2. Body: ~1.6. Labels: ~1.3.
- Never use Playfair in body text or Lexend in hero headlines.

### 1.3 Spacing

| Token | Value | Tailwind class |
|-------|-------|---------------|
| space-1 | 4px | `p-space-1` |
| space-2 | 8px | `p-space-2` |
| space-3 | 12px | `p-space-3` |
| space-4 | 16px | `p-space-4` |
| space-5 | 24px | `p-space-5` |
| space-6 | 32px | `p-space-6` |
| space-7 | 48px | `p-space-7` |
| space-8 | 64px | `p-space-8` |
| space-9 | 96px | `p-space-9` |

**Usage rules**:
| Context | Token | Value |
|---------|-------|-------|
| Section spacing | space-8 | 64px |
| Block spacing | space-6 | 32px |
| Component padding | space-4 | 16px |
| Text stack spacing | space-3 | 12px |
| Tight spacing | space-2 | 8px |

---

## 2. Layout

### 2.1 Page Widths

| Token | Value | Use case |
|-------|-------|----------|
| max-width-reading | 720px | Long-form editorial content |
| max-width-content | 1100px | Dashboard and page content |
| max-width-wide | 1280px | Multi-panel views with sidebars |
| max-width-prose | 52ch | Maximum paragraph width |

### 2.2 Grid

| Breakpoint | Columns | Gutter |
|------------|---------|--------|
| Desktop (≥1024px) | 12 | 24px (space-5) |
| Tablet (768–1023px) | 8 | 16px (space-4) |
| Mobile (<768px) | 4 | 16px (space-4) |

### 2.3 Panel Pairing

Two approved panel states:
- **Primary Context** (bg-background): White — primary content, editorial text
- **Anchor Context** (bg-primary): Green — navigation, anchoring, supporting info

Use side-by-side on desktop, stacked on mobile.

---

## 3. Components

### 3.1 Button

**Purpose**: Trigger actions.

**Variants**: Primary, Secondary, Ghost, Outline, Destructive, Link.

**Sizes**: sm (h-9), default (h-10), lg (h-11), icon (h-10 w-10).

**Spacing**: Internal padding follows size variant. Between buttons: space-3 (12px).

**States**: Default → Hover (opacity shift, no scale) → Focus (ring-ring) → Disabled (opacity 50%).

**Accessibility**: Native `<button>` semantics. Visible focus ring. Disabled state removes pointer events.

**Rules**:
- One primary button per section maximum.
- Labels: 1–3 words, verb-first.
- No bounce or scale hover effects.

### 3.2 Card

**Purpose**: Container for grouped content.

**Variants**:
- **Default Card**: bg-card, border, shadow-sm. For content blocks.
- **Story Card**: Default card with image area + text. For editorial content.
- **Data Card**: Compact card with stat value + label + icon. For dashboards.

**Spacing**: Internal padding space-4 (16px) to space-5 (24px). Gap between cards: space-4.

**States**: Default → Hover (border-primary/30 transition).

**Accessibility**: Generic `<div>`. Add `role="region"` + `aria-label` for landmark cards.

### 3.3 Panel

**Purpose**: Full-height containers for app structure.

**Variants**:
- **Sidebar Panel**: bg-primary, full height, fixed width (240–280px). Navigation.
- **Inspector Panel**: bg-card, right-aligned, collapsible. Detail views.

**Spacing**: Internal padding space-4. Section gaps within panel: space-6.

### 3.4 Navigation

**Purpose**: Sidebar and tab navigation.

**Sidebar item**: Text label + optional icon. Padding space-2 vertical, space-3 horizontal.

**States**: Default (muted-foreground) → Hover (bg-sidebar-accent) → Active (text-sidebar-primary, font-medium).

**Accessibility**: Use `<nav>` landmark. Active item: `aria-current="page"`.

### 3.5 Form Fields

**Components**: Input, Select, Toggle, Checkbox, Textarea.

**Spacing**: Label above input with space-2 gap. Between fields: space-4. Form sections: space-6.

**States**: Default → Focus (ring-ring, border-primary) → Error (border-destructive) → Disabled (opacity 50%).

**Accessibility**: Always pair Label with input via htmlFor. Never use placeholder as label.

### 3.6 Table / Data List

**Purpose**: Display structured data.

**Spacing**: Cell padding space-3 vertical, space-4 horizontal. Header: font-medium, muted-foreground.

**States**: Row hover (bg-muted/50). Sortable headers: cursor-pointer.

**Accessibility**: Use semantic `<table>`, `<thead>`, `<tbody>` elements.

### 3.7 Badge / Tag

**Purpose**: Categorize, label, or indicate status.

**Variants**: Default (bg-primary), Secondary (bg-secondary), Outline (border only), Destructive.

**Spacing**: Internal padding space-1 vertical, space-2 horizontal. Between badges: space-2.

### 3.8 Callout / Quote Block

**Purpose**: Highlight editorial content, tips, or warnings.

**Structure**: Left border accent (4px, bronze or primary) + padded content area.

**Spacing**: Internal padding space-4. Vertical margin space-6.

**Typography**: Body text inside. Optional heading in H3.

---

## 4. Patterns

### 4.1 Operator Dashboard (Desktop)

**Layout**: Sidebar (240px, bg-primary) + Header bar (56px) + Main content (max-w-content) + optional Inspector panel (320px, right).

**Max width**: 1280px (max-w-wide) for the full viewport.

**Typography**: H2 for page titles. Body Small for table text. Label for column headers. Caption for timestamps.

**Spacing**: Section gaps space-8. Card grid gap space-4. Table cell padding space-3/space-4.

**Components used**: Sidebar navigation, stat cards (Data Card), tables, buttons, badges, form fields.

### 4.2 Route Builder / Editor (Desktop)

**Layout**: Three-panel — Route list (280px, left) + Editing panel (flex-1, center) + Preview panel (360px, right).

**Max width**: max-w-wide (1280px).

**Typography**: H3 for section titles within panels. Body for editing fields. Label for form labels.

**Spacing**: Panel internal padding space-5. Between form fields space-4. Panel separator: 1px border.

**Components used**: Cards, form fields, buttons, navigation tabs within panels.

### 4.3 Guest Mobile Experience

**Layout**: Single-column card stack. Full-width cards with space-4 gaps.

**Max width**: 100% (mobile viewport). Content padding space-4 horizontal.

**Typography**: H2 for section headers (larger for readability). Body Large for primary content. Body for descriptions.

**Spacing**: Section gaps space-7. Card padding space-5. CTA buttons full-width.

**Components used**: Cards (story card variant), large primary buttons (full-width), badges, minimal navigation.

**Rules**:
- Larger touch targets (min 44px).
- Clear CTA buttons — one per card.
- Minimal UI density — more whitespace than desktop.

### 4.4 Email Layout

**Max width**: 600px.

**Typography**: Simplify to four roles only — H2 (heading), Body (paragraph), Label (preheader), Caption (footer).

**Font**: Use Lexend with web-safe fallback (system-ui, sans-serif). Playfair Display for email heading only if web font loading is supported.

**Spacing**: Header padding space-5. Body padding space-5 horizontal. Section gaps space-6. Footer padding space-4.

**Components used**: Simplified buttons (full-width on mobile, inline on desktop), cards (simplified, no shadow), badges (as text labels).

**Color rules**: bg-primary header bar. bg-background body. Keep bronze usage to CTA buttons or single accent link.

**Rules**:
- All widths in px, not %, for email client compatibility.
- Single-column layout only.
- Button min-height 44px.
- Footer text in Caption size, muted-foreground.

---

## 5. Channel Rules

### 5.1 Operator Dashboard — Do's & Don'ts

**Do**:
- Use compact spacing (space-3/space-4) for data-dense views.
- Use Data Card variant for key metrics at the top of the page.
- Use tables for list views with sortable headers.
- Keep sidebar navigation visible at all times on desktop.

**Don't**:
- Don't use Display or H1 typography — H2 is the largest heading.
- Don't exceed 3 stat cards per row.
- Don't use anchor panels inside the main content — reserve for sidebar.

### 5.2 Guest Mobile — Do's & Don'ts

**Do**:
- Use Body Large (18px) for primary content readability.
- Make all CTA buttons full-width.
- Use story card variant with image area for visual content.
- Keep navigation to a minimal bottom bar or hamburger menu.

**Don't**:
- Don't show more than one CTA per card.
- Don't use tables — use stacked card lists instead.
- Don't use Caption size for primary content.
- Don't reduce spacing below space-3 for any element.

### 5.3 Email — Do's & Don'ts

**Do**:
- Lock width to 600px max.
- Use inline CSS for email client compatibility.
- Keep a single primary CTA per email section.
- Use preheader text (Label role) for inbox preview.

**Don't**:
- Don't use more than two font sizes per email.
- Don't use background images (poor client support).
- Don't use complex component compositions — keep it flat.
- Don't use bronze on more than one element per email.

### 5.4 Route Builder — Do's & Don'ts

**Do**:
- Use panel separators (1px border) between the three panels.
- Use tabs within panels for sub-views.
- Keep the preview panel read-only with a clear visual distinction.

**Don't**:
- Don't let any panel width go below 240px.
- Don't use hero/display typography — H3 is the max.
- Don't place primary actions in the route list panel — keep them in the editor.
