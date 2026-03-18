import type { PlaybookPage } from "../types";

export const colorsPlaybook: PlaybookPage = {
  section: "Foundations",
  page: "Color",
  slug: "tokens/colors",
  description: "The Curated Lens palette uses a neutral foundation (cream, ivory) with Deep Marine Blue for interaction and Champagne Bronze for subtle highlights. No colored backgrounds — neutrals dominate.",
  status: "complete",
  openQuestions: [],
  content: [
    {
      type: "text",
      heading: "System Modes",
      body: "The Curated Lens operates as a single system with two rendering modes:\n\n**Curated Lens Signature Mode (B2B)** — Used in the Design System Hub, sales materials, and onboarding. Marine blue + bronze accents express the Curated Lens identity.\n\n**Operator Expression Mode (B2C)** — Used in guest-facing environments. Allows controlled color adaptation (accent override, optional route color) while map structure, marker system, layout, and typography rules remain immutable.\n\nThe Curated Lens system remains structurally consistent across all operator implementations.",
    },
    {
      type: "color-swatch",
      heading: "Core Palette",
      colors: [
        {
          name: "Cream",
          value: "#F7F4EF (HSL 36 24% 95%)",
          description: "Primary background color. Used for page backgrounds, large layout surfaces, and the main visual canvas. Should dominate the interface as the neutral foundation. CSS: --background, Tailwind: background",
        },
        {
          name: "Soft Ivory",
          value: "#FBF9F6 (HSL 40 33% 97%)",
          description: "Secondary surface color. Used for cards, secondary panels, and subtle surface separation. Creates gentle contrast with the cream background. CSS: --card, Tailwind: card",
        },
        {
          name: "Charcoal",
          value: "#1A1A1A (HSL 0 0% 10%)",
          description: "Primary text color. Used for body copy, headings, labels, and UI text. Avoid pure black — this tone provides warmth and readability. CSS: --foreground, Tailwind: foreground",
        },
        {
          name: "Muted Grey",
          value: "#5C5C5C (HSL 0 0% 36%)",
          description: "Secondary text color. Used for supporting copy, descriptions, captions, and de-emphasized labels. CSS: --muted-foreground, Tailwind: muted-foreground",
        },
        {
          name: "Deep Marine Blue",
          value: "#1F3A5F (HSL 215 51% 25%)",
          description: "Accent interaction color. Used for buttons, active states, route lines on maps, navigation anchors, and focused UI elements. Marine blue signals interaction, not decoration. CSS: --primary, Tailwind: primary",
        },
        {
          name: "Champagne Bronze",
          value: "#C6A96B (HSL 40 42% 60%)",
          description: "Subtle highlight accent. Used for icon highlights, POI selected states on maps, thin divider lines, and small emphasis words. Bronze is jewelry, never paint. CSS: --accent, Tailwind: accent",
        },
        {
          name: "Border Subtle",
          value: "#D9D6D1 (HSL 36 10% 83%)",
          description: "Default border color for cards, inputs, and dividers. Maintains calm separation without visual noise. CSS: --border, Tailwind: border",
        },
      ],
    },
    {
      type: "spec-table",
      heading: "Color Usage Rules",
      rows: [
        { label: "Neutral base", value: "Always dominant", notes: "Cream + ivory fill 80%+ of visible surface" },
        { label: "Marine blue", value: "Interaction only", notes: "Buttons, route lines, active states, focused elements" },
        { label: "Bronze", value: "Highlight only", notes: "Selected markers, icon accents, thin dividers" },
        { label: "Charcoal", value: "Text only", notes: "Never as background fill" },
        { label: "Colored backgrounds", value: "Prohibited", notes: "All surfaces use neutral cream, ivory, or white" },
      ],
    },
    {
      type: "spec-table",
      heading: "Operator Adaptation Rules",
      rows: [
        { label: "Accent color override", value: "Allowed", notes: "Buttons, highlights in Operator Expression mode" },
        { label: "Route color override", value: "Allowed (controlled)", notes: "Must pass contrast checks" },
        { label: "Marker redesign", value: "Not allowed", notes: "Black/white with optional bronze highlight only" },
        { label: "Map base color changes", value: "Not allowed", notes: "Land = light grey, water = soft blue" },
        { label: "Typography changes", value: "Not allowed", notes: "Playfair Display + Lexend are constant" },
        { label: "Layout restructuring", value: "Not allowed", notes: "Spacing scale and widths are immutable" },
      ],
    },
    {
      type: "spec-table",
      heading: "Approved Contrast Pairs",
      rows: [
        { label: "Charcoal on Cream", value: "Primary text pairing" },
        { label: "Cream on Marine Blue", value: "Inverted panels / buttons" },
        { label: "Charcoal on Ivory", value: "Card text" },
        { label: "Bronze on Cream", value: "Accent text only — decorative labels" },
      ],
    },
    {
      type: "do-dont",
      dos: [
        "Use marine blue for buttons, active states, route lines, and focused elements.",
        "Use bronze sparingly — icon highlights, selected markers, thin divider lines. It is jewelry.",
        "Keep neutral surfaces dominant — cream and ivory form the visual foundation.",
        "Use charcoal for all body copy, headings, labels, and UI text.",
        "Use the approved contrast pairs for text readability.",
      ],
      donts: [
        "Never use marine blue as a background fill — it is for interaction elements only.",
        "Never use bronze as a fill color, button, background, or large UI surface.",
        "Never introduce gradients or additional colors beyond the defined palette.",
        "Don't use pure black (#000). Use charcoal (#1A1A1A) for warmth.",
        "Don't add colored backgrounds to any surface — neutrals only.",
      ],
    },
    {
      type: "text",
      heading: "Palette Philosophy",
      body: "The palette evokes exploration, cartography, travel storytelling, and editorial clarity. The system should feel warm, calm, architectural, and editorially precise — never trendy, loud, or digitally generic.\n\nThe Curated Lens system remains structurally consistent across all operator implementations.",
    },
    {
      type: "applied-example",
      heading: "Applied Example",
      description: "System colors applied to buttons, alerts, and status messages.",
      variant: "color-usage",
    },
  ],
};
