import type { PlaybookPage } from "../types";

export const voicePlaybook: PlaybookPage = {
  section: "Tokens",
  page: "Voice Tokens",
  slug: "tokens/voice",
  description: "The atomic building blocks of how the brand speaks — pillars, prohibited patterns, CTA rules, and grammar conventions.",
  status: "draft",
  openQuestions: [
    "Voice tokens are stored in the database and loaded dynamically. The Markdown export captures the structure but not live data.",
    "Should specific voice token values be snapshot into the export, or should it reference the database as source of truth?",
  ],
  content: [
    {
      type: "text",
      heading: "Overview",
      body: "Voice tokens define the brand's verbal identity. They are organized into four categories: brand pillars (core voice attributes), prohibited patterns (language anti-patterns), CTA style (call-to-action rules), and grammar rules (mechanical style choices).",
    },
    {
      type: "spec-table",
      heading: "Voice Token Types",
      rows: [
        { label: "Brand Pillars", value: "3–5 maximum", notes: "Core voice attributes that define how the brand speaks." },
        { label: "Prohibited Patterns", value: "Specific anti-patterns", notes: "Language patterns that must never appear in any channel." },
        { label: "CTA Style", value: "Phrasing rules", notes: "Rules governing call-to-action phrasing across all components." },
        { label: "Grammar Rules", value: "Mechanical choices", notes: "Style choices for headlines, lists, and body copy." },
      ],
    },
    {
      type: "text",
      heading: "Implementation Note",
      body: "Voice tokens are managed in the database with per-token severity levels (error or warning) and Do/Don't guidance. They are fetched at runtime and grouped by type. See the Voice Tokens page in the hub for live values.",
    },
  ],
};
