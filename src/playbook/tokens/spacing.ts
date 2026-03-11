import type { PlaybookPage } from "../types";

export const spacingPlaybook: PlaybookPage = {
  section: "Tokens",
  page: "Spacing Tokens",
  slug: "tokens/spacing",
  description: "A nine-step spacing scale from 4px to 96px. Named tokens replace subjective terms like 'generous whitespace' with enforceable values.",
  status: "complete",
  openQuestions: [],
  content: [
    {
      type: "spec-table",
      heading: "Spacing Scale",
      columns: ["Token", "Value"],
      rows: [
        { label: "space-1", value: "4px" },
        { label: "space-2", value: "8px" },
        { label: "space-3", value: "12px" },
        { label: "space-4", value: "16px" },
        { label: "space-5", value: "24px" },
        { label: "space-6", value: "32px" },
        { label: "space-7", value: "48px" },
        { label: "space-8", value: "64px" },
        { label: "space-9", value: "96px" },
      ],
    },
    {
      type: "spec-table",
      heading: "Spacing Rules",
      rows: [
        { label: "Section spacing", value: "space-8 (64px)", notes: "Vertical gap between major page sections." },
        { label: "Block spacing", value: "space-6 (32px)", notes: "Gap between content blocks within a section." },
        { label: "Component padding", value: "space-4 (16px)", notes: "Internal padding for cards, panels, and containers." },
        { label: "Text stack spacing", value: "space-3 (12px)", notes: "Gap between stacked text elements (heading + paragraph)." },
        { label: "Tight spacing", value: "space-2 (8px)", notes: "Inline gaps between badges, icons, small elements." },
      ],
    },
    {
      type: "do-dont",
      dos: [
        "Always use named spacing tokens (space-1 through space-9) instead of arbitrary pixel values.",
        "Use space-8 (64px) between major sections for clear separation.",
        "Use space-4 (16px) as the default component internal padding.",
        "Maintain hierarchy: section > block > component > text stack > tight.",
      ],
      donts: [
        "Don't use subjective terms like 'generous' or 'compact' — use the token name.",
        "Don't use arbitrary pixel values (e.g. px-7, mt-[37px]) outside the scale.",
        "Don't skip more than two scale steps in adjacent elements.",
        "Don't reduce spacing on mobile — maintain the same tokens at all breakpoints.",
      ],
    },
  ],
};
