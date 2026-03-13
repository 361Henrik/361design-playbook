import type { PlaybookPage } from "../types";

export const colorsPlaybook: PlaybookPage = {
  section: "Tokens",
  page: "Color Tokens",
  slug: "tokens/colors",
  description: "The Curated Lens palette uses five core colors with strict distribution: 60–70% Warm White, 20–30% Deep Forest Green, and less than 8% Antique Bronze. The palette evokes exploration, cartography, travel storytelling, and editorial clarity.",
  status: "complete",
  openQuestions: [],
  content: [
    {
      type: "color-swatch",
      heading: "Core Palette",
      colors: [
        {
          name: "Deep Forest Green",
          value: "#2E5A1C (HSL 103 53% 23%)",
          description: "Primary structural color. Used for buttons, outlines, navigation anchors, route lines in maps, icons, UI accents, and occasional section framing. Should appear in 20–30% of the visible interface. Green is structural, not decorative. CSS: --primary, Tailwind: primary",
        },
        {
          name: "Warm White",
          value: "#FBFAF8 (HSL 40 33% 97%)",
          description: "Primary background color. Used for page backgrounds, large layout surfaces, the main visual canvas. Should dominate the interface at 60–70% of visible area. It should never compete visually with strong colors. CSS: --background, Tailwind: background",
        },
        {
          name: "Warm Off-White",
          value: "#F5F3EF (HSL 37 21% 95%)",
          description: "Secondary surface color. Used for cards, secondary panels, and subtle surface separation. Creates gentle contrast with the Warm White background. CSS: --card, Tailwind: card",
        },
        {
          name: "Near Black",
          value: "#1A1A2E (HSL 240 29% 14%)",
          description: "Primary text color. Used for body copy, headings, labels, and UI text. Avoid pure black — this tone provides warmth and readability. CSS: --foreground, Tailwind: foreground",
        },
        {
          name: "Antique Bronze",
          value: "#C49A5C (HSL 36 42% 56%)",
          description: "Accent color used sparingly (<8%). Used for icon highlights, POI highlight states on maps, thin divider lines, small emphasis words in headings, and subtle labels. Bronze is jewelry, never paint. CSS: --accent, Tailwind: accent",
        },
      ],
    },
    {
      type: "spec-table",
      heading: "Color Distribution",
      rows: [
        { label: "Warm White", value: "60–70%", notes: "Dominant background" },
        { label: "Deep Forest Green", value: "20–30%", notes: "Structural surfaces" },
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
        "Use Green for buttons, outlines, navigation anchors, route lines, icons, and UI accents.",
        "Use Bronze sparingly — icon highlights, thin divider lines, subtle labels. It is jewelry.",
        "Maintain the 60/30/8 distribution target across every page and section.",
        "Use Warm Off-White for cards to create subtle separation from Warm White backgrounds.",
        "Use the approved contrast pairs for text readability.",
        "Use Near Black for all body copy, headings, labels, and UI text.",
      ],
      donts: [
        "Never use Green for paragraph text, descriptive subtitles on beige backgrounds, or long blocks of copy.",
        "Never use Bronze as a fill color, button, background, or large UI surface.",
        "Never introduce gradients or additional near-whites beyond the five core colors.",
        "Don't use pure black (#000). Use Near Black (#1A1A2E) for warmth.",
        "Don't add new colors to the palette without design system approval.",
      ],
    },
    {
      type: "text",
      heading: "Palette Philosophy",
      body: "The palette evokes exploration, cartography, travel storytelling, and editorial clarity. The system should feel warm, calm, architectural, and editorially precise — never trendy, loud, or digitally generic.",
    },
  ],
};
