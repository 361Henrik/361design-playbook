import type { PlaybookPage } from "./types";

export const brandPrinciples: PlaybookPage = {
  section: "Principles",
  page: "Brand Guidelines",
  slug: "principles/brand-guidelines",
  description: "Calm, architectural, intelligent, editorial authority, controlled luxury. Restraint signals confidence.",
  status: "complete",
  openQuestions: [],
  content: [
    {
      type: "text",
      heading: "Brand Essence",
      body: "Calm, architectural, intelligent, editorial authority, controlled luxury. Every decision should reinforce restraint as a signal of confidence.",
    },
    {
      type: "text",
      heading: "Imagery Philosophy",
      body: "Cinematic, contemplative, premium travel mood. Integrated product experience. Avoid staged corporate stock imagery. Avoid recognizable operator assets unless approved.",
    },
    {
      type: "rule-list",
      heading: "Avoidance List",
      variant: "dont",
      items: [
        "No decorative or trend-driven styling",
        "No startup-techy aesthetics",
        "No over-animated layouts (no bouncy, scaling, dramatic motion)",
        "No over-colored layouts or gradients",
        "No multiple hero images per section",
        "One hero image OR one diagram, not both",
      ],
    },
  ],
};
