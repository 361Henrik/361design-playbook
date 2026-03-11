import type { PlaybookPage } from "../types";

export const guardrailsPlaybook: PlaybookPage = {
  section: "Guardrails",
  page: "Design Rules",
  slug: "guardrails/design-rules",
  description: "Automated and manual guardrail rules that enforce design system consistency across color, typography, layout, motion, imagery, consistency, and voice.",
  status: "complete",
  openQuestions: [],
  content: [
    {
      type: "spec-table",
      heading: "Color Rules",
      rows: [
        { label: "Bronze accent ≤ 8%", value: "Error", notes: "Antique Bronze must remain an accent — never exceeding 8% of total visible area." },
        { label: "No gradients", value: "Error", notes: "Gradients are prohibited. Use flat, solid color fills only." },
        { label: "Approved palette only", value: "Error", notes: "Only the five approved colors may be used." },
        { label: "60/30/8 distribution", value: "Warning", notes: "Follow the 60% Warm White / 30% Forest Green / 8% Bronze distribution ratio." },
        { label: "WCAG AA contrast", value: "Error", notes: "All text/background pairs must meet WCAG AA contrast requirements." },
      ],
    },
    {
      type: "spec-table",
      heading: "Typography Rules",
      rows: [
        { label: "No weight 300", value: "Error", notes: "Font weight 300 (light) is never permitted." },
        { label: "Headlines use Playfair Display", value: "Error", notes: "All headlines (h1–h6) must use Playfair Display." },
        { label: "Body text uses Lexend", value: "Error", notes: "All body text, labels, and UI copy must use Lexend." },
        { label: "Headline letter-spacing −0.01em", value: "Warning", notes: "Headlines should use tracking-headline." },
        { label: "Body line-height 1.6–1.75", value: "Warning", notes: "Body text line-height should be 1.6–1.75." },
      ],
    },
    {
      type: "spec-table",
      heading: "Layout Rules",
      rows: [
        { label: "Max paragraph width 52ch", value: "Warning", notes: "Paragraph text must be capped at 48–52 characters." },
        { label: "No full-width text blocks", value: "Error", notes: "Text must never span the full viewport width." },
        { label: "Section top padding 120–160px", value: "Warning", notes: "Major sections should have 120–160px of top padding." },
        { label: "No nested cards", value: "Error", notes: "Cards must never be nested inside other cards." },
      ],
    },
    {
      type: "spec-table",
      heading: "Motion Rules",
      rows: [
        { label: "No bouncing animations", value: "Error", notes: "Bouncing transitions and spring physics are prohibited." },
        { label: "No parallax scrolling", value: "Error", notes: "Parallax scroll effects are not permitted." },
        { label: "No scale on hover", value: "Error", notes: "Elements must not scale on hover." },
        { label: "UI transitions 300–400ms", value: "Warning", notes: "Standard UI transitions should be 300–400ms ease-out." },
        { label: "Hero loops 8–20s", value: "Warning", notes: "Ambient hero animations should loop at 8–20 second intervals." },
      ],
    },
    {
      type: "spec-table",
      heading: "Voice Rules",
      rows: [
        { label: "No urgency/scarcity language", value: "Error", notes: "Never use 'Limited time', 'Don't miss out', 'Only X left'." },
        { label: "No exclamation marks in CTAs", value: "Error", notes: "CTA labels must not contain exclamation marks." },
        { label: "Sentence case headlines", value: "Warning", notes: "Headlines should use sentence case." },
        { label: "CTA labels 1–3 words", value: "Warning", notes: "CTA labels should be 1–3 words, verb-first." },
        { label: "No filler words", value: "Warning", notes: "Avoid 'just', 'simply', 'actually', 'basically'." },
      ],
    },
  ],
};
