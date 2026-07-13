/* ------------------------------------------------------------------ */
/*  Brand constants — the single source of truth for names, palette,   */
/*  and typography. Every surface that states a brand fact (guardrail  */
/*  rules, export generators, AI prompts, UI copy) must import from    */
/*  here rather than restating values.                                 */
/*                                                                     */
/*  Canonical reference: host-atlas-design-system.md §2, §7            */
/*  The edge functions mirror these values in                          */
/*  supabase/functions/_shared/brand.ts (Deno cannot import from src). */
/*  If you change a value here, change it there too.                   */
/* ------------------------------------------------------------------ */

export const BRAND = {
  /** The product design system documented by this playbook. */
  productName: "Host Atlas",
  /** The delivery & build studio brand. */
  studioName: "361 AI Development",
  productDescriptor:
    "Host Atlas, a landscape awareness and storytelling platform for scenic journeys",
  /** Used for export filenames and ZIP folder names. */
  exportSlug: "host-atlas",
} as const;

export interface PaletteToken {
  name: string;
  hex: string;
  hsl: string;
  role: string;
}

/** Host Atlas palette — host-atlas-design-system.md §2. */
export const PALETTE = {
  baseCanvas: { name: "Base Canvas", hex: "#F6F3EE", hsl: "37 31% 95%", role: "Primary background" },
  warmStone: { name: "Warm Stone", hex: "#E8E2D9", hsl: "33 16% 89%", role: "Secondary surface" },
  deepCharcoal: { name: "Deep Charcoal", hex: "#1A1F1A", hsl: "120 9% 11%", role: "Primary text" },
  muted: { name: "Muted", hex: "#6E6A5E", hsl: "45 8% 40%", role: "Secondary text" },
  deepGreen: { name: "Deep Green", hex: "#1F4A3A", hsl: "158 41% 21%", role: "Structure / identity surface" },
  terracotta: { name: "Terracotta", hex: "#C35C3C", hsl: "14 53% 50%", role: "Interaction & emphasis" },
  champagneBronze: { name: "Champagne Bronze", hex: "#C9A962", hsl: "41 49% 59%", role: "Highlight" },
  warmBorder: { name: "Warm Border", hex: "#CCC4B8", hsl: "36 16% 76%", role: "Single border color" },
} as const satisfies Record<string, PaletteToken>;

export const TYPOGRAPHY = {
  display: {
    family: "Playfair Display",
    fallback: "Georgia, serif",
    weight: "500",
    letterSpacing: "-0.01em",
  },
  body: {
    family: "Lexend",
    fallback: "system-ui, sans-serif",
    weight: "400",
    lineHeight: "1.6",
  },
} as const;
