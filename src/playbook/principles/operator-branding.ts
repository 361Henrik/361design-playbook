import type { PlaybookPage } from "../types";

export const operatorBrandingPlaybook: PlaybookPage = {
  section: "Principles",
  page: "Operator Branding Model",
  slug: "principles/operator-branding",
  description:
    "The Curated Guide is the platform provider — invisible to end users. The guest experience must feel like it belongs to the operator: the cruise line, tour company, or destination organization.",
  status: "complete",
  openQuestions: [],
  content: [
    {
      type: "text",
      heading: "Branding Philosophy",
      body: "The platform is not white-label, but it must appear to users as if it belongs to the operator. Users should perceive the experience as belonging to the cruise line, the tour operator, or the destination organization.\n\nThe Curated Guide is only the platform provider brand — used in B2B sales, partner communications, and internal documentation. It must never appear in the guest-facing experience.",
    },
    {
      type: "principle-list",
      heading: "Branding Principles",
      items: [
        {
          title: "Operator Logo is Primary",
          description:
            "The operator's logo is the only brand mark visible in the guest experience. It appears in the app header, loading screens, and welcome flows.",
        },
        {
          title: "Platform UI Adapts to Operator Identity",
          description:
            "Typography, colors, and tone must harmonize with the operator's brand identity. The design system provides the structural framework; the operator provides the personality.",
        },
        {
          title: "The Curated Guide Remains Invisible",
          description:
            "No Curated Guide logos, wordmarks, or 'powered by' labels appear anywhere in the guest experience. The platform credit exists only in legal footer text if required by contract.",
        },
        {
          title: "Native Feel",
          description:
            "The guest experience should feel like 'the operator's own digital experience platform' — not a third-party tool. UI styling, copy tone, and visual rhythm must feel native to the operator's brand world.",
        },
      ],
    },
    {
      type: "spec-table",
      heading: "Operator Customization Tokens",
      rows: [
        { label: "Operator logo", value: "SVG or PNG, displayed in header and welcome screen" },
        { label: "Primary color override", value: "Operator brand color replaces --primary for guest UI" },
        { label: "Accent color override", value: "Optional accent replaces --accent for highlights" },
        { label: "Font pairing", value: "Operator may supply a display font; body font remains Lexend for consistency" },
        { label: "Tone modifiers", value: "Voice tokens adjusted per operator (e.g., formal, adventurous, heritage)" },
        { label: "Welcome copy", value: "Operator-specific onboarding text and imagery" },
      ],
    },
    {
      type: "do-dont",
      heading: "Branding Rules",
      dos: [
        "Show the operator's logo prominently in the guest experience",
        "Allow operator color overrides for primary and accent tokens",
        "Match copy tone to the operator's brand voice",
        "Use operator imagery in hero sections and onboarding",
        "Maintain structural consistency while adapting personality",
      ],
      donts: [
        "Never display Curated Guide logos in the guest experience",
        "Never use 'powered by' labels visible to guests",
        "Never let operator customization break accessibility (contrast, sizing)",
        "Never override structural layout or spacing tokens per operator",
        "Never allow operator branding to compromise readability or hierarchy",
      ],
    },
    {
      type: "text",
      heading: "Implementation Guidance",
      body: "Operator branding is applied through token overrides stored per workspace. The design system enforces structural integrity — spacing, layout widths, typography roles, and accessibility rules remain constant. Only color, logo, imagery, and tone are customizable.\n\nThe system should feel like: 'the operator's own digital experience platform.'",
    },
  ],
};
