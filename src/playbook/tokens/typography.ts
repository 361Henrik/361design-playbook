import type { PlaybookPage } from "../types";

export const typographyPlaybook: PlaybookPage = {
  section: "Tokens",
  page: "Typography Tokens",
  slug: "tokens/typography",
  description: "Playfair Display for headlines and editorial authority. Lexend for body, UI, and utility. Nine defined roles. No substitutions. Never use weight 300.",
  status: "complete",
  openQuestions: [],
  content: [
    {
      type: "spec-table",
      heading: "Font Stack",
      rows: [
        { label: "Display Font", value: "Playfair Display", notes: "Weight 500 (default), 600 (rare emphasis only). Used for Display, H1, H2, H3." },
        { label: "Body Font", value: "Lexend", notes: "Weight 400 (body), 500 (label/CTA). Never 300. Used for Body Large, Body, Body Small, Label, Caption." },
      ],
    },
    {
      type: "spec-table",
      heading: "Type Scale",
      columns: ["Role", "Font", "Weight", "Size", "Line Height", "Letter Spacing"],
      rows: [
        { label: "Display", value: "Playfair Display · 500 · 3rem (48px) · 1.2 · -0.01em" },
        { label: "H1", value: "Playfair Display · 500 · 2.25rem (36px) · 1.2 · -0.01em" },
        { label: "H2", value: "Playfair Display · 500 · 1.5rem (24px) · 1.2 · -0.01em" },
        { label: "H3", value: "Playfair Display · 500 · 1.25rem (20px) · 1.2 · -0.005em" },
        { label: "Body Large", value: "Lexend · 400 · 1.125rem (18px) · 1.6 · normal" },
        { label: "Body", value: "Lexend · 400 · 1rem (16px) · 1.6 · normal" },
        { label: "Body Small", value: "Lexend · 400 · 0.875rem (14px) · 1.6 · normal" },
        { label: "Label", value: "Lexend · 500 · 0.8125rem (13px) · 1.3 · 0.01em" },
        { label: "Caption", value: "Lexend · 400 · 0.75rem (12px) · 1.3 · 0.01em" },
      ],
    },
    {
      type: "spec-table",
      heading: "Line-Height Rules",
      rows: [
        { label: "Headlines (Display–H3)", value: "~1.2", notes: "leading-heading" },
        { label: "Body text", value: "~1.6", notes: "leading-reading" },
        { label: "Labels & Captions", value: "~1.3", notes: "leading-label" },
      ],
    },
    {
      type: "do-dont",
      dos: [
        "Use Playfair Display at weight 500 for all headings (Display–H3).",
        "Use Lexend weight 400 for body text and weight 500 for labels and CTAs.",
        "Follow the nine-role hierarchy: Display → H1 → H2 → H3 → Body Large → Body → Body Small → Label → Caption.",
        "Headlines use line-height ~1.2, body ~1.6, labels ~1.3.",
      ],
      donts: [
        "Never use weight 300 on any font — it reads as weak and uncommitted.",
        "Never substitute fonts. No Inter, no Roboto, no Open Sans as primary body.",
        "Don't invent new typographic roles beyond the established nine.",
        "Don't mix Playfair into body text or Lexend into hero headlines.",
      ],
    },
  ],
};
