import type { PlaybookPage } from "../types";

export const operatorBrandingPlaybook: PlaybookPage = {
  section: "Principles",
  page: "Operator Branding Framework",
  slug: "principles/operator-branding",
  description:
    "Platform configuration layer (B2B). Defines how the system adapts to each operator's identity so the guest experience feels native to the cruise line, tour company, or destination organization. This is a platform capability, not a UI behavior rule.",
  status: "complete",
  openQuestions: [],
  content: [
    {
      type: "text",
      heading: "Audience: Platform Configuration (B2B)",
      body: "This section describes a platform capability — how the system adapts to operator branding. It is written for platform teams and operator onboarding, not for guest interface design.\n\nGuest-facing UI behavior rules are documented separately in Senior-First UX, Editorial Elegance, and the Map Design sections. Those rules apply regardless of which operator is configured.",
    },
    {
      type: "text",
      heading: "Branding Philosophy",
      body: "The platform is not white-label, but it must appear to guests as if it belongs to the operator. Travelers should perceive the experience as belonging to the cruise line, the tour operator, or the destination organization.\n\nThe Curated Guide is the platform provider brand — used in B2B sales, partner communications, and internal documentation. It must never appear in the guest-facing experience.\n\nThe platform should feel like: 'the operator's own digital experience platform.'",
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
            "The guest experience should feel like the operator's own product — not a third-party tool. UI styling, copy tone, and visual rhythm must feel native to the operator's brand world.",
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
      type: "text",
      heading: "What Operator Branding Does NOT Change",
      body: "Operator customization affects visual personality — colors, logos, imagery, and copy tone. It does not override structural design rules.\n\nThe following are constant across all operator configurations:\n\n• Spacing scale and layout widths\n• Minimum tap target sizes (44–48px)\n• Typography roles and hierarchy\n• Contrast and accessibility requirements\n• Map interaction behavior\n• Animation timing and easing\n• Information architecture and navigation patterns\n\nThese structural rules exist to protect the guest experience regardless of operator identity.",
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
        "Never mix B2B sales messaging with guest-facing UI design rules",
      ],
    },
    {
      type: "text",
      heading: "Implementation Note",
      body: "Operator branding is applied through token overrides stored per workspace. The design system enforces structural integrity — spacing, layout widths, typography roles, and accessibility rules remain constant. Only color, logo, imagery, and tone are customizable.\n\nThis distinction is critical: operator branding is a configuration layer that sits above the design system, not a modification of it.",
    },
  ],
};
