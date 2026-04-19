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
          title: "Controlled color adaptation",
          description:
            "Operators may override the accent color (buttons, highlights) and optionally the route color. The neutral foundation (Base Canvas, Warm Stone, Charcoal) remains constant. No colored backgrounds.",
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
        { label: "Accent color override", value: "Replaces Terracotta for buttons and highlights" },
        { label: "Route color override", value: "Optional, replaces Deep Green for map route lines (must pass contrast)" },
        { label: "Font pairing", value: "Operator may supply a display font; body font remains Lexend for consistency" },
        { label: "Tone modifiers", value: "Voice tokens adjusted per operator (formal, adventurous, heritage, etc.)" },
        { label: "Welcome copy", value: "Operator-specific onboarding text and imagery" },
      ],
    },
    {
      type: "text",
      heading: "What stays constant",
      body: "Operator customization affects personality — accent color, logo, imagery, copy tone. It does not override structural design rules.\n\n• Neutral background foundation (Base Canvas, Warm Stone)\n• Spacing scale and layout widths\n• Minimum tap target sizes (44–48px)\n• Typography roles (Playfair Display + Lexend)\n• Contrast and accessibility requirements\n• Map interaction behavior and marker design\n• Animation timing and easing\n• Information architecture and navigation patterns",
    },
    {
      type: "do-dont",
      heading: "Adaptation Rules",
      dos: [
        "Show the operator's logo prominently in the guest experience",
        "Allow accent color override for buttons and highlights",
        "Allow optional route color override (with contrast checks)",
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
      body: "Operator branding is applied through token overrides stored per workspace. The system enforces structural integrity — spacing, layout widths, typography roles, neutral backgrounds, and accessibility rules remain constant. Only accent color, route color, logo, imagery, and tone are customizable.",
    },
  ],
};
