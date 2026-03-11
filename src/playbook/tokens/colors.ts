import type { PlaybookPage } from "../types";

export const colorsPlaybook: PlaybookPage = {
  section: "Tokens",
  page: "Color Tokens",
  slug: "tokens/colors",
  description: "The Curated Lens palette uses five core colors with strict distribution: 60–70% Warm White, 20–30% Deep Forest Green, and less than 8% Antique Bronze.",
  status: "complete",
  openQuestions: [],
  content: [
    {
      type: "color-swatch",
      heading: "Core Palette",
      colors: [
        { name: "Deep Forest Green", value: "#1B3D2F (HSL 153 38% 17%)", description: "Primary anchor, sidebar, panels. Use at 20–30% of visible area. CSS: --primary, Tailwind: primary" },
        { name: "Warm White", value: "#FBFAF8 (HSL 40 33% 97%)", description: "Dominant background. The canvas for everything. Never compete with it. CSS: --background, Tailwind: background" },
        { name: "Warm Off-White", value: "#F5F3EF (HSL 37 21% 95%)", description: "Cards, secondary surfaces, subtle separation from Warm White. CSS: --card, Tailwind: card" },
        { name: "Near Black", value: "#1A1A2E (HSL 240 29% 14%)", description: "Body text and headings. Rich, warm near-black — not pure #000. CSS: --foreground, Tailwind: foreground" },
        { name: "Antique Bronze", value: "#C49A5C (HSL 36 42% 56%)", description: "Accent only — a thin rule, an icon highlight, a subtle label. Bronze is jewelry, never paint. CSS: --accent, Tailwind: accent" },
      ],
    },
    {
      type: "spec-table",
      heading: "Color Distribution",
      rows: [
        { label: "Warm White", value: "60–70%", notes: "Dominant background" },
        { label: "Deep Forest Green", value: "20–30%", notes: "Primary surfaces" },
        { label: "Antique Bronze", value: "<8%", notes: "Accent only" },
        { label: "Near Black", value: "Text only", notes: "Never as background" },
        { label: "Warm Off-White", value: "Within 60–70%", notes: "Subtle card separation" },
      ],
    },
    {
      type: "spec-table",
      heading: "Approved Contrast Pairs",
      rows: [
        { label: "Near Black on Warm White", value: "Primary text pairing" },
        { label: "Warm White on Forest Green", value: "Inverted panels/sidebar" },
        { label: "Near Black on Off-White", value: "Card text" },
        { label: "Bronze on Warm White", value: "Accent text only — decorative labels" },
      ],
    },
    {
      type: "do-dont",
      dos: [
        "Use Bronze sparingly — a thin rule, an icon highlight, a subtle label. It is jewelry.",
        "Maintain the 60/30/8 distribution target across every page and section.",
        "Use Warm Off-White for cards to create subtle separation from Warm White backgrounds.",
        "Use the approved contrast pairs for text readability.",
      ],
      donts: [
        "Never use Bronze as a fill color, background, or large surface.",
        "Never introduce gradients or additional near-whites beyond the five core colors.",
        "Don't use pure black (#000). Use Near Black (#1A1A2E) for warmth.",
        "Don't add new colors to the palette without design system approval.",
      ],
    },
  ],
};
