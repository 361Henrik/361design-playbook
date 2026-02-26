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
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type RuleSeverity = "error" | "warning";
export type RuleCategory = "color" | "typography" | "layout" | "motion" | "imagery" | "consistency";
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
  },
  {
    id: "color-no-gradients",
    name: "No gradients",
    category: "color",
    severity: "error",
    description: "Gradients are prohibited across the entire design system. Use flat, solid color fills only.",
    checkDescription: "Scan for any linear-gradient, radial-gradient, or conic-gradient usage.",
    status: "pass",
  },
  {
    id: "color-approved-palette",
    name: "Approved palette only",
    category: "color",
    severity: "error",
    description: "Only the five approved colors may be used: Deep Forest Green, Warm White, Warm Off-White, Near Black, and Antique Bronze.",
    checkDescription: "Flag any color value not in the approved palette.",
    status: "pass",
  },
  {
    id: "color-60-30-8",
    name: "60/30/8 distribution",
    category: "color",
    severity: "warning",
    description: "Follow the 60% Warm White / 30% Forest Green / 8% Bronze distribution ratio.",
    checkDescription: "Verify approximate color distribution across page surfaces.",
    status: "pass",
  },
  {
    id: "color-contrast",
    name: "WCAG AA contrast",
    category: "color",
    severity: "error",
    description: "All text/background pairs must meet WCAG AA contrast requirements (4.5:1 for body text, 3:1 for large text).",
    checkDescription: "Check contrast ratios for all approved color pairings.",
    status: "pass",
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
  },
  {
    id: "type-headlines-playfair",
    name: "Headlines use Playfair Display",
    category: "typography",
    severity: "error",
    description: "All headlines (h1–h6) must use Playfair Display. No exceptions.",
    checkDescription: "Verify all heading elements use font-display (Playfair Display).",
    status: "pass",
  },
  {
    id: "type-body-inter",
    name: "Body text uses Inter",
    category: "typography",
    severity: "error",
    description: "All body text, labels, and UI copy must use Inter.",
    checkDescription: "Verify all non-heading text uses font-body (Inter).",
    status: "pass",
  },
  {
    id: "type-headline-tracking",
    name: "Headline letter-spacing −0.01em",
    category: "typography",
    severity: "warning",
    description: "Headlines should use tracking-headline (−0.01em) for the refined, editorial feel.",
    checkDescription: "Check letter-spacing on heading elements.",
    status: "pass",
  },
  {
    id: "type-body-line-height",
    name: "Body line-height 1.6–1.75",
    category: "typography",
    severity: "warning",
    description: "Body text line-height should be 1.6–1.75 for comfortable reading.",
    checkDescription: "Verify line-height on paragraph and body text elements.",
    status: "pass",
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
  },
  {
    id: "layout-no-full-width-text",
    name: "No full-width text blocks",
    category: "layout",
    severity: "error",
    description: "Text must never span the full viewport width. Always constrain with max-width.",
    checkDescription: "Flag text containers without max-width constraints.",
    status: "pass",
  },
  {
    id: "layout-top-padding",
    name: "Section top padding 120–160px",
    category: "layout",
    severity: "warning",
    description: "Major sections should have 120–160px of top padding for breathing room.",
    checkDescription: "Verify top padding on major section containers.",
    status: "pass",
  },
  {
    id: "layout-no-nested-cards",
    name: "No nested cards",
    category: "layout",
    severity: "error",
    description: "Cards must never be nested inside other cards. Keep the hierarchy flat.",
    checkDescription: "Flag any Card component rendered inside another Card.",
    status: "pass",
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
  },
  {
    id: "motion-no-parallax",
    name: "No parallax scrolling",
    category: "motion",
    severity: "error",
    description: "Parallax scroll effects are not permitted anywhere in the system.",
    checkDescription: "Flag any parallax or scroll-linked transform effects.",
    status: "pass",
  },
  {
    id: "motion-no-scale-hover",
    name: "No scale on hover",
    category: "motion",
    severity: "error",
    description: "Buttons and interactive elements must not scale on hover. Use opacity or color shifts instead.",
    checkDescription: "Flag any hover:scale or whileHover scale transforms.",
    status: "pass",
  },
  {
    id: "motion-ui-duration",
    name: "UI transitions 300–400ms",
    category: "motion",
    severity: "warning",
    description: "Standard UI transitions should be 300–400ms with ease-out easing.",
    checkDescription: "Verify transition durations on interactive elements.",
    status: "pass",
  },
  {
    id: "motion-hero-loop",
    name: "Hero loops 8–20s",
    category: "motion",
    severity: "warning",
    description: "Ambient hero animations should loop at 8–20 second intervals.",
    checkDescription: "Check animation-duration on hero/ambient loop elements.",
    status: "pass",
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
  },
  {
    id: "imagery-no-hero-multiple",
    name: "Single hero image per section",
    category: "imagery",
    severity: "warning",
    description: "Each section should have at most one hero-level image. Multiple hero images create visual competition.",
    checkDescription: "Flag sections with more than one large-scale image.",
    status: "pass",
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
  },
  {
    id: "consistency-spacing-scale",
    name: "Use spacing scale only",
    category: "consistency",
    severity: "warning",
    description: "All spacing values should come from the defined spacing scale. Avoid arbitrary pixel values.",
    checkDescription: "Flag spacing values that don't match the spacing scale tokens.",
    status: "pass",
  },
  {
    id: "consistency-icon-style",
    name: "Icons: thin stroke, no fills",
    category: "consistency",
    severity: "error",
    description: "All icons must use stroke width 1.5–2px, geometric style, no fills, no gradients.",
    checkDescription: "Verify all icon instances use strokeWidth 1.5–2 and no fill.",
    status: "pass",
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
