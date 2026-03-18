import type { PlaybookPage } from "../types";

export const layoutPlaybook: PlaybookPage = {
  section: "Tokens",
  page: "Layout Tokens",
  slug: "tokens/layout",
  description: "Page widths, grid columns, and gutters defined as tokens. Keep text in controlled columns. Never use full-width paragraphs.",
  status: "complete",
  openQuestions: [],
  content: [
    {
      type: "spec-table",
      heading: "Page Width Tokens",
      rows: [
        { label: "max-width-reading", value: "720px", notes: "Optimal width for long-form text and editorial content." },
        { label: "max-width-content", value: "1100px", notes: "Primary content container for dashboards and pages." },
        { label: "max-width-wide", value: "1280px", notes: "Full-width layouts with sidebars or multi-panel views." },
        { label: "max-width-prose", value: "52ch", notes: "Maximum paragraph width for readability." },
      ],
    },
    {
      type: "spec-table",
      heading: "Grid System",
      rows: [
        { label: "Desktop (≥1024px)", value: "12 columns, 24px (space-5) gutter" },
        { label: "Tablet (768–1023px)", value: "8 columns, 16px (space-4) gutter" },
        { label: "Mobile (<768px)", value: "4 columns, 16px (space-4) gutter" },
      ],
    },
    {
      type: "rule-list",
      heading: "Text Density Rules",
      variant: "neutral",
      items: [
        "One idea per section. No multi-topic paragraphs.",
        "Headings kept short — ideally under 6 words.",
        "Max paragraph width: 52 characters (max-w-prose).",
        "One hero image OR one diagram per section, not both.",
      ],
    },
    {
      type: "do-dont",
      dos: [
        "Use max-w-reading (720px) for editorial content pages.",
        "Use max-w-content (1100px) for dashboard and app content areas.",
        "Use 12-column grid on desktop, 8 on tablet, 4 on mobile.",
        "Use space-5 (24px) gutters on desktop, space-4 (16px) on mobile.",
      ],
      donts: [
        "Never let paragraphs span the full viewport width.",
        "Don't use arbitrary max-widths outside the defined tokens.",
        "Don't place both a hero image and a diagram in the same section.",
        "Don't compress layout to fit more content — edit the content instead.",
      ],
    },
    {
      type: "applied-example",
      heading: "Applied Example",
      description: "A page layout showing header, sidebar, content area, and margin structure with width tokens.",
      variant: "layout-page",
    },
  ],
};
