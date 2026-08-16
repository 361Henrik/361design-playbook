import type { PlaybookPage } from "../types";

export const colorsPlaybook: PlaybookPage = {
  section: "Foundations",
  page: "Color",
  slug: "tokens/colors",
  description: "HostAtlas uses isolated surface contracts. Select Helmut, Olga, or an imported Marketing system before applying color.",
  status: "complete",
  openQuestions: [],
  content: [
    {
      type: "text",
      heading: "Select the Surface First",
      body: "HostAtlas is not one palette with operator overrides. Helmut and Olga have separate token contracts. Marketing requires the exact imported design system for the project. Missing or ambiguous surface identity is BLOCKED.",
    },
    {
      type: "color-swatch",
      heading: "ATLAS · Helmut",
      colors: [
        { name: "Forest", value: "#1B3D2F", description: "Structure, active route, and focus." },
        { name: "Warm White", value: "#FBF9F5", description: "Primary guest canvas." },
        { name: "Off-white", value: "#F3F0EA", description: "Secondary surface and neutral map differentiation." },
        { name: "Near Black", value: "#191926", description: "Text, marker ring, and icon." },
        { name: "Antique Bronze", value: "#C69B5B", description: "Selected state and accent, no more than 8%." },
      ],
    },
    {
      type: "color-swatch",
      heading: "ATLAS · Olga",
      colors: [
        { name: "Base Canvas", value: "#F6F3EE", description: "Primary operator surface." },
        { name: "Warm Stone", value: "#E8E2D9", description: "Cards and layered panels." },
        { name: "Deep Charcoal", value: "#1A1F1A", description: "Primary text." },
        { name: "Muted", value: "#6E6A5E", description: "Secondary text." },
        { name: "Deep Green", value: "#1F4A3A", description: "Structure and identity surface." },
        { name: "Terracotta", value: "#C35C3C", description: "Interaction on cream only." },
        { name: "Champagne Bronze", value: "#C9A962", description: "Accent and CTA on Deep Green only." },
        { name: "Warm Border", value: "#CCC4B8", description: "Single border color." },
      ],
    },
    {
      type: "spec-table",
      heading: "Collision Rules",
      rows: [
        { label: "Helmut", value: "No Terracotta", notes: "Never import Olga interaction or dense desktop patterns." },
        { label: "Olga", value: "No #C69B5B", notes: "Use Olga's exact eight-token system." },
        { label: "Marketing", value: "No guessed tokens", notes: "Require exact imported theme and audience brief." },
        { label: "All surfaces", value: "No blue or gradients", notes: "Flat, exact, role-bound tokens only." },
      ],
    },
    {
      type: "do-dont",
      dos: [
        "Declare surface and design-system identifier in every handoff.",
        "Use one token for one defined role.",
        "Use non-color indicators for state and status.",
      ],
      donts: [
        "Never merge Helmut and Olga palettes.",
        "Never use Terracotta in Helmut.",
        "Never guess a Marketing palette or font.",
        "Never use blue, gradients, or decorative color.",
      ],
    },
  ],
};
