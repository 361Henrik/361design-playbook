import type { PlaybookPage } from "../types";

export const operatorBrandingPlaybook: PlaybookPage = {
  section: "Principles",
  page: "Operator Branding Framework",
  slug: "principles/operator-branding",
  description:
    "Platform configuration layer (B2B). Defines how the Operator Expression mode adapts to each operator's identity so the guest experience feels native to the cruise line, tour company, or destination organization.",
  status: "complete",
  openQuestions: [],
  content: [
    {
      type: "text",
      heading: "Audience: Platform Configuration (B2B)",
      body: "This section describes the Operator Expression rendering mode — how the system adapts to operator branding. It is written for platform teams and operator onboarding, not for guest interface design.\n\nGuest-facing UI behavior rules are documented separately in Senior-First UX, Editorial Elegance, and the Map Design sections. Those rules apply regardless of which operator is configured.",
    },
    {
      type: "text",
      heading: "Branding Philosophy",
      body: "The Curated Lens is a single system with two rendering modes. In Operator Expression mode, the platform adapts its accent colors and tone to match each operator's identity.\n\nTravelers should perceive the experience as belonging to the cruise line, the tour operator, or the destination organization. The Curated Lens is the platform provider brand — used in B2B contexts only.\n\nThe platform should feel like: 'the operator's own digital experience platform.'",
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
          title: "Controlled Color Adaptation",
          description:
            "Operators may override the accent color (buttons, highlights) and optionally the route color. The neutral foundation (cream, ivory, charcoal) remains constant. No colored backgrounds are permitted.",
        },
        {
          title: "The Curated Lens Remains Invisible",
          description:
            "No Curated Lens logos, wordmarks, or 'powered by' labels appear anywhere in the guest experience. The platform credit exists only in legal footer text if required by contract.",
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
        { label: "Accent color override", value: "Replaces terracotta for buttons and highlights" },
        { label: "Route color override", value: "Optional, replaces deep green for map route lines (must pass contrast)" },
        { label: "Font pairing", value: "Operator may supply a display font; body font remains Lexend for consistency" },
        { label: "Tone modifiers", value: "Voice tokens adjusted per operator (e.g., formal, adventurous, heritage)" },
        { label: "Welcome copy", value: "Operator-specific onboarding text and imagery" },
      ],
    },
    {
      type: "text",
      heading: "What Operator Expression Does NOT Change",
      body: "Operator customization affects visual personality — accent colors, logos, imagery, and copy tone. It does not override structural design rules.\n\nThe following are constant across all operator configurations:\n\n• Neutral background foundation (cream, ivory)\n• Spacing scale and layout widths\n• Minimum tap target sizes (44–48px)\n• Typography roles and hierarchy (Playfair Display + Lexend)\n• Contrast and accessibility requirements\n• Map interaction behavior and marker design\n• Animation timing and easing\n• Information architecture and navigation patterns\n\nThe Curated Lens system remains structurally consistent across all operator implementations.",
    },
    {
      type: "do-dont",
      heading: "Branding Rules",
      dos: [
        "Show the operator's logo prominently in the guest experience",
        "Allow operator accent color override for buttons and highlights",
        "Allow optional route color override (with contrast checks)",
        "Match copy tone to the operator's brand voice",
        "Use operator imagery in hero sections and onboarding",
        "Maintain structural consistency while adapting personality",
      ],
      donts: [
        "Never display Curated Lens logos in the guest experience",
        "Never use 'powered by' labels visible to guests",
        "Never let operator customization break accessibility (contrast, sizing)",
        "Never allow marker redesign — black/white with optional bronze only",
        "Never allow map base color changes",
        "Never allow layout restructuring or typography changes",
        "Never allow colored backgrounds — neutrals are constant",
      ],
    },
    {
      type: "text",
      heading: "Implementation Note",
      body: "Operator branding is applied through token overrides stored per workspace. The design system enforces structural integrity — spacing, layout widths, typography roles, neutral backgrounds, and accessibility rules remain constant. Only accent color, route color, logo, imagery, and tone are customizable.\n\nThis distinction is critical: operator branding is a rendering mode that adapts personality within the system, not a modification of the system itself.",
    },
  ],
};
