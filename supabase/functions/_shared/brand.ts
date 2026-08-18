/**
 * Brand constants shared by all edge functions.
 *
 * Single source of truth for the prompt-facing brand facts: product name,
 * palette, typography, component catalog, and guardrail rules. Mirrors
 * src/brand/constants.ts (Deno functions cannot import from src/) — if you
 * change a value here, change it there too.
 *
 * Canonical reference: host-atlas-design-system.md §2, §7.
 */

export const BRAND_NAME = "Host Atlas";

export const PALETTE = [
  { name: "Base Canvas", hex: "#F6F3EE", hsl: "37 31% 95%", note: "primary background. Neutral foundation, always dominant." },
  { name: "Warm Stone", hex: "#E8E2D9", hsl: "33 16% 89%", note: "secondary surfaces (cards, panels)." },
  { name: "Deep Charcoal", hex: "#1A1F1A", hsl: "120 9% 11%", note: "text only. No pure black." },
  { name: "Muted", hex: "#6E6A5E", hsl: "45 8% 40%", note: "secondary text, captions, de-emphasized labels." },
  { name: "Deep Green", hex: "#1F4A3A", hsl: "158 41% 21%", note: "structure / identity (section backgrounds, anchor panels, nav rail). Not for buttons." },
  { name: "Terracotta", hex: "#C35C3C", hsl: "14 53% 50%", note: "interaction and emphasis only (buttons, CTAs, active states, highlight panels). NEVER for text, labels, icons, map elements, or borders." },
  { name: "Champagne Bronze", hex: "#C9A962", hsl: "41 49% 59%", note: "highlight accent (≤8% of visible area). Jewelry, never paint. Not for buttons or backgrounds." },
  { name: "Warm Border", hex: "#CCC4B8", hsl: "36 16% 76%", note: "the single border color. No other border tones." },
];

export const PALETTE_BLOCK = PALETTE.map(
  (c) => `- ${c.name}: HSL ${c.hsl} (${c.hex}) — ${c.note}`,
).join("\n");

export const TYPOGRAPHY_BLOCK = `- Display/Headlines: Playfair Display (font-display)
- Body/UI: Lexend (font-body)
- Monospace: JetBrains Mono (font-mono)`;

export const COMPONENT_INDEX = [
  { name: "Primary Button", category: "buttons", dos: ["Single most important action per page", "1-3 word labels"], donts: ["No more than one per section", "No scale/bounce hover"] },
  { name: "Secondary Button", category: "buttons", dos: ["Pair with primary CTA"], donts: ["Not for destructive actions"] },
  { name: "Text Link Button", category: "buttons", dos: ["Inline navigation"], donts: ["Never as primary CTA"] },
  { name: "Destructive Button", category: "buttons", dos: ["Delete/remove only", "Always with confirmation"], donts: ["Not for cancel/dismiss"] },
  { name: "Primary Context Card", category: "cards", dos: ["Warm Stone bg", "One idea per card"], donts: ["No nested cards", "No colored backgrounds"] },
  { name: "Anchor Context Panel", category: "cards", dos: ["Deep Green bg", "One per major section"], donts: ["Never stack two back-to-back"] },
  { name: "Panel Pairing", category: "cards", dos: ["Hero sections", "50/50 or 60/40 split"], donts: ["Max one per page section", "No third panel"] },
  { name: "Text Input", category: "forms", dos: ["Always with visible Label"], donts: ["No placeholder-only labels"] },
  { name: "Textarea", category: "forms", dos: ["Multi-line freeform text"], donts: ["Not for single-line"] },
  { name: "Select", category: "forms", dos: ["3-10 options"], donts: ["Not for 2 options (use radio)"] },
  { name: "Checkbox / Switch", category: "forms", dos: ["Binary toggles"], donts: ["Don't mix in same form"] },
  { name: "Data Table", category: "data-display", dos: ["Structured tabular data"], donts: ["No nested tables"] },
  { name: "Badge", category: "data-display", dos: ["Status indicators"], donts: ["No long text"] },
  { name: "Tabs", category: "navigation", dos: ["2-5 tabs max"], donts: ["No nested tabs"] },
];

export const GUARDRAIL_RULES = [
  { id: "color-bronze-ratio", name: "Bronze accent ≤ 8%", severity: "error", description: "Champagne Bronze must remain a subtle highlight accent — never exceeding 8% of visible area, never for buttons, backgrounds, or large surfaces." },
  { id: "color-no-gradients", name: "No gradients", severity: "error", description: "Gradients are prohibited. Use flat, solid color fills only." },
  { id: "color-approved-palette", name: "Approved palette only", severity: "error", description: `Only approved colors: ${PALETTE.map((c) => `${c.name} (${c.hex})`).join(", ")}.` },
  { id: "color-neutral-dominant", name: "Neutral base dominant", severity: "warning", description: "Neutral surfaces (canvas, stone) dominant. Terracotta for interaction and emphasis surfaces only — never text, labels, icons, map elements, or borders. Deep green for structure only. No blue tones." },
  { id: "color-terracotta-usage", name: "Terracotta interaction only", severity: "error", description: "Terracotta restricted to buttons, CTAs, active/selected states, highlight panels, callout sections. Prohibited for typography, map elements, icons, borders, dividers." },
  { id: "color-contrast", name: "WCAG AA contrast", severity: "error", description: "All text/background pairs must meet WCAG AA (4.5:1 body, 3:1 large). AAA (7:1) preferred for body text." },
  { id: "color-no-bright-markers", name: "No bright colored markers", severity: "error", description: "Map markers use white disk + charcoal ring only. Color reserved for state changes (selected = bronze)." },
  { id: "type-no-weight-300", name: "No weight 300", severity: "error", description: "Font weight 300 is never permitted." },
  { id: "type-headlines-playfair", name: "Headlines use Playfair Display", severity: "error", description: "All headlines (h1–h6) must use Playfair Display." },
  { id: "type-body-lexend", name: "Body text uses Lexend", severity: "error", description: "All body text, labels, UI copy must use Lexend." },
  { id: "type-headline-tracking", name: "Headline letter-spacing −0.01em", severity: "warning", description: "Headlines should use tracking-headline." },
  { id: "type-body-line-height", name: "Body line-height 1.6–1.75", severity: "warning", description: "Body text line-height should be 1.6–1.75." },
  { id: "type-body-min-16px", name: "Body text min 16px", severity: "error", description: "Body text must never be smaller than 16px. Guest content should use 18px (Body Large)." },
  { id: "layout-max-52ch", name: "Max paragraph width 52ch", severity: "warning", description: "Paragraph text capped at 48–52 characters." },
  { id: "layout-no-full-width-text", name: "No full-width text blocks", severity: "warning", description: "Text must never span the full viewport width." },
  { id: "layout-top-padding", name: "Section top padding 120–160px", severity: "warning", description: "Major sections need 120–160px top padding." },
  { id: "layout-no-nested-cards", name: "No nested cards", severity: "error", description: "Cards must never be nested inside other cards." },
  { id: "a11y-tap-target-44", name: "Tap target min 44px", severity: "error", description: "All interactive elements must have minimum 44×44px tap area. 48px preferred." },
  { id: "a11y-touch-spacing", name: "Touch spacing min 8px", severity: "warning", description: "Minimum 8px between adjacent interactive elements." },
  { id: "a11y-icon-min-20px", name: "Icon min 20px", severity: "error", description: "Icons must be at least 20×20px. 24px preferred for navigation and map icons." },
  { id: "a11y-no-low-contrast-overlay", name: "No low-contrast overlays", severity: "error", description: "Text overlays on photography must meet WCAG AA contrast." },
  { id: "a11y-no-color-only", name: "No information by color alone", severity: "error", description: "Color must never be the sole means of conveying information." },
  { id: "a11y-reduced-motion", name: "Respects prefers-reduced-motion", severity: "error", description: "All animations must respect the prefers-reduced-motion media query." },
  { id: "motion-no-bounce", name: "No bouncing animations", severity: "error", description: "Bouncing/spring physics prohibited." },
  { id: "motion-no-parallax", name: "No parallax scrolling", severity: "error", description: "Parallax effects not permitted." },
  { id: "motion-no-scale-hover", name: "No scale on hover", severity: "error", description: "No hover:scale transforms. Use opacity/color shifts." },
  { id: "motion-ui-duration", name: "UI transitions 300–400ms", severity: "warning", description: "Standard transitions 300–400ms ease-out." },
  { id: "motion-hero-loop", name: "Hero loops 8–20s", severity: "warning", description: "Ambient hero animations loop at 8–20s." },
  { id: "imagery-no-corporate-stock", name: "No corporate stock imagery", severity: "error", description: "Generic corporate stock photos prohibited." },
  { id: "consistency-type-hierarchy", name: "Consistent type hierarchy", severity: "warning", description: "h1 → h2 → h3, no skipping levels." },
  { id: "consistency-spacing-scale", name: "Use spacing scale only", severity: "warning", description: "All spacing from defined scale, no arbitrary pixels." },
  { id: "consistency-icon-style", name: "Icons: thin stroke, no fills", severity: "warning", description: "Stroke width 1.5–2px, geometric, no fills/gradients." },
  { id: "brand-no-platform-logo", name: "No platform branding in guest UX", severity: "error", description: "Host Atlas logos and wordmarks must not appear in the guest experience." },
  { id: "brand-operator-primary", name: "Operator logo primary", severity: "error", description: "The operator's logo must be the primary brand mark in guest-facing UI." },
];
