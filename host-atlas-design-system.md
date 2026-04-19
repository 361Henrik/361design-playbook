# Host Atlas — Design System

> Single source of truth for the Host Atlas product. External tools and AI assistants must follow these rules verbatim.

---

## 1. Philosophy

Calm. Editorial. Premium. Minimal. Restraint signals confidence.

- No SaaS-style visuals (no gradients, glass, neon, 3D).
- No decorative or trend-driven styling.
- Every decision should reduce noise, not add to it.

---

## 2. Color System

| Token | Hex | Role | Allowed | Prohibited |
|---|---|---|---|---|
| Base Canvas | `#F6F3EE` | Primary background | All main surfaces (≥80% of visible area) | As text, button fill, or border |
| Warm Stone | `#E8E2D9` | Secondary surface | Cards, panels, layered sections | As primary background, as text |
| Deep Charcoal | `#1A1F1A` | Primary text | All body copy, headings, labels | As background, as button fill |
| Muted | `#6E6A5E` | Secondary text | Descriptions, captions, supporting labels | As background, as primary text |
| Deep Green | `#1F4A3A` | Structure / identity surface | Section backgrounds, anchor panels, nav rail | As button fill, as text on light surfaces |
| Terracotta | `#C35C3C` | Interaction & emphasis | Buttons, CTAs, active states, highlight panels | Text, labels, icons, map elements, borders, on Deep Green |
| Champagne Bronze | `#C9A962` | Highlight | Icon highlights, selected map markers, dividers; headings on Deep Green only | Text on light/neutral backgrounds, content body icons, on Terracotta |
| Warm Border | `#CCC4B8` | Single border color | All borders | Multiple border tones, decorative lines |

Pure black (`#000`) and any blue tone are prohibited.

---

## 3. Color Principles

- One token, one role. No overlapping uses.
- One accent color per container — never stack Bronze + Terracotta.
- Restrained palette: most surfaces are neutral; accents earn their place.
- No visual noise: no decorative color, no gradients, no transparency tricks.

---

## 4. Surface & Environment Rules

- **Base Canvas** is the foundation. It dominates and recedes.
- **Warm Stone** is the only secondary surface. Used for cards and panels separated from the canvas by a 1px Warm Border.
- **Deep Green** is the structural / identity surface. Used for anchor panels and the nav rail. When used, it requires Cream type and Bronze headings.
- Surfaces layer in this order only: Canvas → Stone → Green. Never invert.

**Environments** define the rules for everything inside them:
- Cream Environment (Base Canvas / Warm Stone): primary CTA is Terracotta.
- Green Environment (Deep Green): primary CTA is Bronze; secondary is white outlined in Bronze.
- Terracotta Environment (highlight panels): primary CTA is Cream with Charcoal text.

---

## 5. CTA System (summary)

CTA color is determined by **Environment first, Container second**. The full matrix lives in `Interaction → CTA System` and must not be duplicated elsewhere.

- Environment-based logic: the background dictates valid CTA colors.
- Container logic: filled, outlined, or neutral. An outlined container may color-match its outline.
- Priority hierarchy: Primary (one per view) → Secondary → Tertiary (text link).
- Prohibited: Terracotta on Green, Bronze on Terracotta, color-on-color (CTA matching its container fill), more than one accent per area.

---

## 6. Spacing System

Generous. Calm. Consistent rhythm.

| Token | Value | Use |
|---|---|---|
| `space-1` | 4px | Hairline gaps |
| `space-2` | 8px | Inline gaps |
| `space-3` | 12px | Tight stacks |
| `space-4` | 16px | Default stack rhythm |
| `space-5` | 24px | Card padding |
| `space-6` | 32px | Section gaps inside a card |
| `space-7` | 48px | Page gutters |
| `space-8` | 64px | Section spacing |
| `space-9` | 96px | Hero / page-level spacing |

Rules:
- Section spacing: `space-8` minimum between major sections.
- Card padding: `space-5` default; `space-6` for primary cards.
- Vertical rhythm: stack siblings with the same token; never mix two adjacent values.

---

## 7. Typography

- **Display / headlines**: Playfair Display, Medium (500) and Regular (400). Used for H1–H3 and editorial accents.
- **Body**: Lexend, 300/400/500/600. Used for body copy, labels, UI text.
- **Default text color**: Deep Charcoal. Muted only for secondary copy.
- No decorative styles, no italics outside cited quotes, no all-caps outside section labels (11–13px, 0.05–0.08em tracking).
- Sizes: `caption 0.75rem · label 0.875rem · body 1rem · body-lg 1.125rem · h3 1.25rem · h2 1.5rem · h1 2rem · display 3rem`.

---

## 8. Component Style

- Soft cards: `bg-card`, `rounded-md`, `border border-border`.
- Subtle borders: 1px Warm Border. No double borders, no colored borders.
- Minimal shadows: only on overlays (popover, dialog). Never on inline content.
- No heavy gradients, no glassmorphism, no neumorphism.
- Hover and focus states adjust opacity, border, or background — never scale or rotate.

---

## 9. Logo System

- The icon is **standalone**: transparent background, no container, no shape behind it.
- **White icon**: approved on Deep Green and Terracotta. Prohibited on Cream.
- **Gold (Bronze) icon**: approved on Deep Green and Base Canvas (Cream). Prohibited on Terracotta.
- The full lockup uses Charcoal type on Cream, or Cream/Bronze type on Deep Green.
- Minimum sizes: 120px wide for the lockup; 24px / 16px for the standalone icon.
- Exclusion zone: half the icon's height on every side.

---

## 10. Icon System

Two sets, one grammar. See `/host-atlas/icons` and `/361/icons` for full taxonomies.

- Host Atlas (Cartographic): 1.5px stroke, round caps, currentColor.
- Sizes: 16, 20, 24, 32 only.
- Map markers are the only place fills are permitted (white disk, ringed by Charcoal or Bronze).
- Icons inside content bodies use `text-foreground`; Bronze (`text-accent`) is permitted only in the nav rail and brand surfaces.

---

## 11. Implementation Rules

- Tokens only. Never hardcode hex values, raw HSL, or pixel sizes outside the spacing scale.
- Reference tokens via CSS variables (`var(--background)`) or Tailwind theme classes (`bg-background`, `text-foreground`).
- One role per token. Never repurpose a token to mean something new.
- Preserve structure: spacing scale, typography roles, and surface layering are immutable.
- No unnecessary visual additions — if a rule is not in this document, it is not in the system.

---

*Version 2.0.0 · Last updated 2026-04-19*
