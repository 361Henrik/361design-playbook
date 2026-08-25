import type { PlaybookPage } from "../types";

export const operatorBrandingPlaybook: PlaybookPage = {
  section: "Principles",
  page: "Operator Adaptation Layer",
  slug: "principles/operator-branding",
  description:
    "How Host Atlas adapts to each operator's identity. Operator expression is an adaptation layer on top of the Host Atlas product brand — not a co-equal mode.",
  status: "complete",
  openQuestions: [],
  content: [
    {
      type: "text",
      heading: "Host Atlas is the product brand",
      body: "Host Atlas is the design system and product. Operator expression is the controlled adaptation layer that allows each cruise line, tour operator, or destination organization to feel native inside the platform.\n\nThe guest experience always runs on Host Atlas — the operator chooses how it shows up.",
    },
    {
      type: "principle-list",
      heading: "Adaptation Principles",
      items: [
        {
          title: "Operator logo is primary",
          description:
            "In the guest-facing experience, the operator's logo appears in the header, loading screens, and welcome flows.",
        },
        {
          title: "Controlled identity adaptation",
          description:
            "Operators may supply an approved logo, imagery, welcome copy, and voice. Helmut's colors, fonts, spacing, route grammar, and accessibility contract remain fixed.",
        },
        {
          title: "Host Atlas chrome is invisible to guests",
          description:
            "No Host Atlas logos, wordmarks, or 'powered by' labels in the guest experience. Platform credit lives only in legal footer text if required by contract.",
        },
        {
          title: "Native feel within structural integrity",
          description:
            "Voice, imagery, and accent feel native to the operator. Spacing, typography, map behavior, and accessibility do not bend.",
        },
      ],
    },
    {
      type: "spec-table",
      heading: "Operator Customization Tokens",
      rows: [
        { label: "Operator logo", value: "SVG or PNG, displayed in header and welcome screen" },
        { label: "Color contract", value: "Fixed ATLAS · Helmut tokens; no operator override" },
        { label: "Route color", value: "Forest #1B3D2F; fixed for legibility and state consistency" },
        { label: "Font pairing", value: "Playfair Display + Lexend; no operator override" },
        { label: "Tone modifiers", value: "Voice tokens adjusted per operator (formal, adventurous, heritage, etc.)" },
        { label: "Welcome copy", value: "Operator-specific onboarding text and imagery" },
      ],
    },
    {
      type: "text",
      heading: "What stays constant",
      body: "Operator customization affects identity through logo, imagery, welcome copy, and tone. It does not override structural design rules.\n\n• Warm White and Off-white surface foundation\n• Spacing scale and layout widths\n• Minimum 48px targets and 52px map hit areas\n• Typography roles (Playfair Display + Lexend)\n• Contrast and accessibility requirements\n• Map interaction behavior and marker design\n• Motion timing and easing\n• Information architecture and navigation patterns",
    },
    {
      type: "do-dont",
      heading: "Adaptation Rules",
      dos: [
        "Show the operator's logo prominently in the guest experience",
        "Use the fixed ATLAS · Helmut color contract",
        "Use Forest for route and focus states",
        "Match copy tone to the operator's brand voice",
        "Use operator imagery in hero sections and onboarding",
        "Maintain structural consistency while adapting personality",
      ],
      donts: [
        "Never display Host Atlas logos in the guest experience",
        "Never use 'powered by' labels visible to guests",
        "Never let operator customization break accessibility (contrast, sizing)",
        "Never allow marker redesign — black/white with optional Bronze only",
        "Never allow map base color changes",
        "Never allow layout restructuring or typography changes",
        "Never allow colored backgrounds — neutrals are constant",
      ],
    },
    {
      type: "text",
      heading: "Implementation note",
      body: "Operator branding is applied through approved identity assets and content stored per workspace. The system enforces Helmut tokens, spacing, layout widths, typography, map behavior, and accessibility. Only logo, imagery, welcome copy, and tone are customizable.",
    },
  ],
};
