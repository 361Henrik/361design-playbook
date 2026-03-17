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
      type: "spacing-visual",
      heading: "Spacing Scale",
      steps: [
        { token: "space-1", px: 4 },
        { token: "space-2", px: 8 },
        { token: "space-3", px: 12 },
        { token: "space-4", px: 16 },
        { token: "space-5", px: 24 },
        { token: "space-6", px: 32 },
        { token: "space-7", px: 48 },
        { token: "space-8", px: 64 },
        { token: "space-9", px: 96 },
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
