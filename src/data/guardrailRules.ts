import { ReactNode } from "react";
import {
  AlertTriangle,
  XCircle,
  CheckCircle,
  Palette,
  Type,
  LayoutGrid,
  Zap,
  Image,
  Layers,
  MessageSquare,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type RuleSeverity = "error" | "warning";
export type RuleCategory = "color" | "typography" | "layout" | "motion" | "imagery" | "consistency" | "voice";
export type RuleStatus = "pass" | "fail";

export interface GuardrailRule {
  id: string;
  name: string;
  category: RuleCategory;
  severity: RuleSeverity;
  description: string;
  checkDescription: string;
  status: RuleStatus;
  details?: string;
  /** Weight used for compound taste score calculation (0–1) */
  weight?: number;
}

/* ------------------------------------------------------------------ */
/*  Category metadata                                                  */
/* ------------------------------------------------------------------ */

export const categoryMeta: Record<RuleCategory, { label: string; icon: typeof Palette }> = {
  color: { label: "Color", icon: Palette },
  typography: { label: "Typography", icon: Type },
  layout: { label: "Layout", icon: LayoutGrid },
  motion: { label: "Motion", icon: Zap },
  imagery: { label: "Imagery", icon: Image },
  consistency: { label: "Consistency", icon: Layers },
  voice: { label: "Voice", icon: MessageSquare },
};

/* ------------------------------------------------------------------ */
/*  Rules                                                              */
/* ------------------------------------------------------------------ */

export const guardrailRules: GuardrailRule[] = [
  // ─── Color ───
  {
    id: "color-bronze-ratio",
    name: "Bronze accent ≤ 8%",
    category: "color",
    severity: "error",
    description: "Antique Bronze must remain an accent — never exceeding 8% of total visible area.",
    checkDescription: "Verify bronze (#C49A5C) usage stays below 8% of surface area.",
    status: "pass",
    weight: 0.8,
  },
  {
    id: "color-no-gradients",
    name: "No gradients",
    category: "color",
    severity: "error",
    description: "Gradients are prohibited across the entire design system. Use flat, solid color fills only.",
    checkDescription: "Scan for any linear-gradient, radial-gradient, or conic-gradient usage.",
    status: "pass",
    weight: 0.7,
  },
  {
    id: "color-approved-palette",
    name: "Approved palette only",
    category: "color",
    severity: "error",
    description: "Only the approved colors may be used: Cream, Soft Ivory, Charcoal, Muted Grey, Deep Marine Blue, Champagne Bronze, and Border Subtle.",
    checkDescription: "Flag any color value not in the approved palette.",
    status: "pass",
    weight: 0.9,
  },
  {
    id: "color-neutral-dominant",
    name: "Neutral base dominant",
    category: "color",
    severity: "warning",
    description: "Neutral surfaces (cream, ivory) must dominate. Marine blue for interaction only. Bronze for highlights only. No colored backgrounds.",
    checkDescription: "Verify neutral surfaces fill 80%+ of visible area with no colored backgrounds.",
    status: "pass",
    weight: 0.5,
  },
  {
    id: "color-contrast",
    name: "WCAG AA contrast",
    category: "color",
    severity: "error",
    description: "All text/background pairs must meet WCAG AA contrast requirements (4.5:1 for body text, 3:1 for large text).",
    checkDescription: "Check contrast ratios for all approved color pairings.",
    status: "pass",
    weight: 1.0,
  },

  // ─── Typography ───
  {
    id: "type-no-weight-300",
    name: "No weight 300",
    category: "typography",
    severity: "error",
    description: "Font weight 300 (light) is never permitted. It undermines the confident, architectural tone.",
    checkDescription: "Flag any font-weight: 300 or font-light usage.",
    status: "pass",
    weight: 0.6,
  },
  {
    id: "type-headlines-playfair",
    name: "Headlines use Playfair Display",
    category: "typography",
    severity: "error",
    description: "All headlines (h1–h6) must use Playfair Display. No exceptions.",
    checkDescription: "Verify all heading elements use font-display (Playfair Display).",
    status: "pass",
    weight: 0.8,
  },
  {
    id: "type-body-inter",
    name: "Body text uses Inter",
    category: "typography",
    severity: "error",
    description: "All body text, labels, and UI copy must use Inter.",
    checkDescription: "Verify all non-heading text uses font-body (Inter).",
    status: "pass",
    weight: 0.7,
  },
  {
    id: "type-headline-tracking",
    name: "Headline letter-spacing −0.01em",
    category: "typography",
    severity: "warning",
    description: "Headlines should use tracking-headline (−0.01em) for the refined, editorial feel.",
    checkDescription: "Check letter-spacing on heading elements.",
    status: "pass",
    weight: 0.3,
  },
  {
    id: "type-body-line-height",
    name: "Body line-height 1.6–1.75",
    category: "typography",
    severity: "warning",
    description: "Body text line-height should be 1.6–1.75 for comfortable reading.",
    checkDescription: "Verify line-height on paragraph and body text elements.",
    status: "pass",
    weight: 0.4,
  },

  // ─── Layout ───
  {
    id: "layout-max-52ch",
    name: "Max paragraph width 52ch",
    category: "layout",
    severity: "warning",
    description: "Paragraph text must be capped at max-w-prose (48–52 characters) for readability.",
    checkDescription: "Flag any paragraph or body text block wider than 52ch.",
    status: "pass",
    weight: 0.5,
  },
  {
    id: "layout-no-full-width-text",
    name: "No full-width text blocks",
    category: "layout",
    severity: "error",
    description: "Text must never span the full viewport width. Always constrain with max-width.",
    checkDescription: "Flag text containers without max-width constraints.",
    status: "pass",
    weight: 0.7,
  },
  {
    id: "layout-top-padding",
    name: "Section top padding 120–160px",
    category: "layout",
    severity: "warning",
    description: "Major sections should have 120–160px of top padding for breathing room.",
    checkDescription: "Verify top padding on major section containers.",
    status: "pass",
    weight: 0.3,
  },
  {
    id: "layout-no-nested-cards",
    name: "No nested cards",
    category: "layout",
    severity: "error",
    description: "Cards must never be nested inside other cards. Keep the hierarchy flat.",
    checkDescription: "Flag any Card component rendered inside another Card.",
    status: "pass",
    weight: 0.6,
  },

  // ─── Motion ───
  {
    id: "motion-no-bounce",
    name: "No bouncing animations",
    category: "motion",
    severity: "error",
    description: "Bouncing transitions and spring physics are prohibited. They conflict with the calm, restrained aesthetic.",
    checkDescription: "Flag any bounce, spring, or elastic easing functions.",
    status: "pass",
    weight: 0.7,
  },
  {
    id: "motion-no-parallax",
    name: "No parallax scrolling",
    category: "motion",
    severity: "error",
    description: "Parallax scroll effects are not permitted anywhere in the system.",
    checkDescription: "Flag any parallax or scroll-linked transform effects.",
    status: "pass",
    weight: 0.6,
  },
  {
    id: "motion-no-scale-hover",
    name: "No scale on hover",
    category: "motion",
    severity: "error",
    description: "Buttons and interactive elements must not scale on hover. Use opacity or color shifts instead.",
    checkDescription: "Flag any hover:scale or whileHover scale transforms.",
    status: "pass",
    weight: 0.5,
  },
  {
    id: "motion-ui-duration",
    name: "UI transitions 300–400ms",
    category: "motion",
    severity: "warning",
    description: "Standard UI transitions should be 300–400ms with ease-out easing.",
    checkDescription: "Verify transition durations on interactive elements.",
    status: "pass",
    weight: 0.3,
  },
  {
    id: "motion-hero-loop",
    name: "Hero loops 8–20s",
    category: "motion",
    severity: "warning",
    description: "Ambient hero animations should loop at 8–20 second intervals.",
    checkDescription: "Check animation-duration on hero/ambient loop elements.",
    status: "pass",
    weight: 0.2,
  },

  // ─── Imagery ───
  {
    id: "imagery-no-corporate-stock",
    name: "No corporate stock imagery",
    category: "imagery",
    severity: "error",
    description: "Generic corporate stock photos (handshakes, skylines, smiling teams) are prohibited.",
    checkDescription: "Review all images for corporate stock photography patterns.",
    status: "pass",
    details: "Requires manual review — automated detection not available.",
    weight: 0.5,
  },
  {
    id: "imagery-no-hero-multiple",
    name: "Single hero image per section",
    category: "imagery",
    severity: "warning",
    description: "Each section should have at most one hero-level image. Multiple hero images create visual competition.",
    checkDescription: "Flag sections with more than one large-scale image.",
    status: "pass",
    weight: 0.3,
  },

  // ─── Consistency ───
  {
    id: "consistency-type-hierarchy",
    name: "Consistent type hierarchy",
    category: "consistency",
    severity: "warning",
    description: "Each page should follow a single typographic hierarchy: h1 → h2 → h3. Don't skip levels or mix sizes arbitrarily.",
    checkDescription: "Verify heading levels are used sequentially without skipping.",
    status: "pass",
    weight: 0.4,
  },
  {
    id: "consistency-spacing-scale",
    name: "Use spacing scale only",
    category: "consistency",
    severity: "warning",
    description: "All spacing values should come from the defined spacing scale. Avoid arbitrary pixel values.",
    checkDescription: "Flag spacing values that don't match the spacing scale tokens.",
    status: "pass",
    weight: 0.5,
  },
  {
    id: "consistency-icon-style",
    name: "Icons: thin stroke, no fills",
    category: "consistency",
    severity: "error",
    description: "All icons must use stroke width 1.5–2px, geometric style, no fills, no gradients.",
    checkDescription: "Verify all icon instances use strokeWidth 1.5–2 and no fill.",
    status: "pass",
    weight: 0.6,
  },

  // ─── Voice ───
  {
    id: "voice-no-urgency-scarcity",
    name: "No urgency/scarcity language",
    category: "voice",
    severity: "error",
    description: "Never use urgency or scarcity language: 'Limited time', 'Don't miss out', 'Only X left'.",
    checkDescription: "Flag any urgency or artificial scarcity phrases in UI copy.",
    status: "pass",
    weight: 0.8,
  },
  {
    id: "voice-no-exclamation-cta",
    name: "No exclamation marks in CTAs",
    category: "voice",
    severity: "error",
    description: "CTA labels must not contain exclamation marks. Our brand doesn't shout.",
    checkDescription: "Flag any button or link label containing '!'.",
    status: "pass",
    weight: 0.7,
  },
  {
    id: "voice-sentence-case",
    name: "Sentence case headlines",
    category: "voice",
    severity: "warning",
    description: "Headlines should use sentence case, not Title Case or ALL CAPS.",
    checkDescription: "Flag headings using Title Case or ALL CAPS patterns.",
    status: "pass",
    weight: 0.4,
  },
  {
    id: "voice-cta-length",
    name: "CTA labels 1–3 words",
    category: "voice",
    severity: "warning",
    description: "CTA labels should be 1–3 words, verb-first. Keep them calm and direct.",
    checkDescription: "Flag CTA labels exceeding 3 words or not starting with a verb.",
    status: "pass",
    weight: 0.3,
  },
  {
    id: "voice-no-filler",
    name: "No filler words",
    category: "voice",
    severity: "warning",
    description: "Avoid filler words: 'just', 'simply', 'actually', 'basically'. Every word earns its place.",
    checkDescription: "Flag occurrences of common filler words in UI copy.",
    status: "pass",
    weight: 0.3,
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

export function getRulesByCategory(category: RuleCategory) {
  return guardrailRules.filter((r) => r.category === category);
}

export function getFailingRules() {
  return guardrailRules.filter((r) => r.status === "fail");
}

export function getPassingRules() {
  return guardrailRules.filter((r) => r.status === "pass");
}

export function getHealthScore() {
  const total = guardrailRules.length;
  const passing = getPassingRules().length;
  return Math.round((passing / total) * 100);
}

export function getRuleCountByCategory() {
  const counts: Record<string, { total: number; passing: number; failing: number }> = {};
  for (const rule of guardrailRules) {
    if (!counts[rule.category]) {
      counts[rule.category] = { total: 0, passing: 0, failing: 0 };
    }
    counts[rule.category].total++;
    if (rule.status === "pass") counts[rule.category].passing++;
    else counts[rule.category].failing++;
  }
  return counts;
}

/**
 * Compound "Taste Score" — aggregates multiple soft warnings into a single
 * composite score. When several individually-minor warnings fire together,
 * the combined effect may make the UI "feel off."
 *
 * Returns 0–100 where 100 = perfect taste, lower = more compound issues.
 */
export function getTasteScore(activeExceptionRuleIds: string[] = []) {
  let totalWeight = 0;
  let failingWeight = 0;

  for (const rule of guardrailRules) {
    const weight = rule.weight || 0.5;
    totalWeight += weight;

    if (rule.status === "fail" && !activeExceptionRuleIds.includes(rule.id)) {
      failingWeight += weight;
    }
  }

  if (totalWeight === 0) return 100;
  return Math.round(((totalWeight - failingWeight) / totalWeight) * 100);
}

/**
 * WCAG AA contrast check for two HSL colors.
 * Returns { ratio, passesBody, passesLarge }
 */
export function checkContrastRatio(
  hsl1: string,
  hsl2: string
): { ratio: number; passesBody: boolean; passesLarge: boolean } {
  const hslToRgb = (hslStr: string): [number, number, number] => {
    const parts = hslStr.trim().split(/\s+/);
    const h = parseFloat(parts[0]) / 360;
    const s = parseFloat(parts[1]) / 100;
    const l = parseFloat(parts[2]) / 100;

    if (s === 0) return [l, l, l];

    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    return [hue2rgb(p, q, h + 1 / 3), hue2rgb(p, q, h), hue2rgb(p, q, h - 1 / 3)];
  };

  const luminance = (rgb: [number, number, number]) => {
    const [r, g, b] = rgb.map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const l1 = luminance(hslToRgb(hsl1));
  const l2 = luminance(hslToRgb(hsl2));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  const ratio = (lighter + 0.05) / (darker + 0.05);

  return {
    ratio: Math.round(ratio * 100) / 100,
    passesBody: ratio >= 4.5,
    passesLarge: ratio >= 3,
  };
}

/**
 * Get all contrast pairs for the brand palette
 */
export function getContrastResults() {
  const palette = [
    { name: "Deep Forest Green", hsl: "103 53% 23%", role: "primary" },
    { name: "Warm White", hsl: "40 33% 97%", role: "background" },
    { name: "Warm Off-White", hsl: "37 21% 95%", role: "secondary" },
    { name: "Near Black", hsl: "240 29% 14%", role: "foreground" },
    { name: "Antique Bronze", hsl: "36 42% 56%", role: "accent" },
  ];

  const results: {
    fg: string;
    bg: string;
    fgRole: string;
    bgRole: string;
    ratio: number;
    passesBody: boolean;
    passesLarge: boolean;
  }[] = [];

  // Only check text-on-background pairs that are likely to be used
  const textColors = palette.filter((c) => ["primary", "foreground", "accent"].includes(c.role));
  const bgColors = palette.filter((c) => ["background", "secondary"].includes(c.role));

  for (const fg of textColors) {
    for (const bg of bgColors) {
      const result = checkContrastRatio(fg.hsl, bg.hsl);
      results.push({
        fg: fg.name,
        bg: bg.name,
        fgRole: fg.role,
        bgRole: bg.role,
        ...result,
      });
    }
  }

  // Also check primary-foreground (white text on primary bg)
  const primaryOnWhite = checkContrastRatio(palette[0].hsl, palette[1].hsl);
  // Already covered above

  return results;
}
