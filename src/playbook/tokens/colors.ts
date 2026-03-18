import type { PlaybookPage } from "../types";

export const colorsPlaybook: PlaybookPage = {
  section: "Foundations",
  page: "Color",
  slug: "tokens/colors",
  description: "Four neutrals, each with a single purpose. Marine blue for interaction. Bronze for highlights. No overlapping roles.",
  status: "complete",
  openQuestions: [],
  content: [
    {
      type: "text",
      heading: "System Modes",
      body: "The Curated Lens operates as a single system with two rendering modes:\n\n**Curated Lens Signature Mode (B2B)** — Used in the Design System Hub, sales materials, and onboarding. Marine blue + bronze accents express the Curated Lens identity.\n\n**Operator Expression Mode (B2C)** — Used in guest-facing environments. Allows controlled color adaptation (accent override, optional route color) while map structure, marker system, layout, and typography rules remain immutable.",
    },
    {
      type: "color-swatch",
      heading: "Core Palette",
      colors: [
        {
          name: "Cream Beige",
          value: "#F2EDE6 (HSL 34 22% 93%)",
          description: "Primary background. Every main surface uses this color. It is the canvas of the system. CSS: --background, Tailwind: background",
        },
        {
          name: "Warm Stone",
          value: "#E8E2D9 (HSL 33 16% 89%)",
          description: "Secondary surface. Cards, panels, and layered sections sit on this. Creates clear separation from the background without competing. CSS: --card, Tailwind: card",
        },
        {
          name: "Near-Black",
          value: "#111111 (HSL 0 0% 7%)",
          description: "Primary text. All body copy, headings, labels, and UI text. One text color for all primary content. CSS: --foreground, Tailwind: foreground",
        },
        {
          name: "Muted",
          value: "#6B6B6B (HSL 0 0% 42%)",
          description: "Secondary text. Descriptions, captions, supporting labels. The only secondary text tone in the system. CSS: --muted-foreground, Tailwind: muted-foreground",
        },
        {
          name: "Deep Marine Blue",
          value: "#1A2744 (HSL 218 38% 18%)",
          description: "Interaction color. Buttons, active states, route lines, navigation anchors and focused elements. Marine blue also serves as a surface for emphasis — information panels, highlight sections or areas requiring stronger contrast within a page. When used as a background, pair with light text and bronze headings. Signals importance and structure, never decoration. CSS: --primary, Tailwind: primary",
        },
        {
          name: "Champagne Bronze",
          value: "#C9A962 (HSL 40 46% 53%)",
          description: "Highlight accent. Icon highlights, selected markers, thin dividers and small emphasis words. On marine blue surfaces, bronze is used for headings to create a refined, high-contrast hierarchy. Bronze is jewelry, never paint. CSS: --accent, Tailwind: accent",
        },
        {
          name: "Warm Border",
          value: "#D4CCC1 (HSL 32 14% 80%)",
          description: "The single border color. Cards, inputs, dividers. Visible against the background, warm, consistent. CSS: --border, Tailwind: border",
        },
      ],
    },
    {
      type: "spec-table",
      heading: "Color Usage Rules",
      rows: [
        { label: "Cream Beige", value: "Background only", notes: "All main surfaces, 80%+ of visible area" },
        { label: "Warm Stone", value: "Secondary surface only", notes: "Cards, panels, layered sections" },
        { label: "Near-Black", value: "Primary text only", notes: "Never as background fill" },
        { label: "Muted", value: "Secondary text only", notes: "No other grey tones allowed" },
        { label: "Marine Blue", value: "Interaction only", notes: "Buttons, route lines, active states" },
        { label: "Bronze", value: "Highlight only", notes: "Selected markers, icon accents, thin dividers" },
        { label: "Warm Border", value: "Borders only", notes: "Single border color, no variations" },
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
        { label: "Near-Black on Cream Beige", value: "Primary text pairing" },
        { label: "Cream on Marine Blue", value: "Inverted panels / buttons" },
        { label: "Near-Black on Warm Stone", value: "Card text" },
        { label: "Bronze on Cream Beige", value: "Accent text only — decorative labels" },
      ],
    },
    {
      type: "do-dont",
      dos: [
        "Use marine blue exclusively for interactive elements — buttons, links, active states.",
        "Use bronze sparingly — icon highlights, selected markers, thin dividers.",
        "Keep Cream Beige dominant — it is the visual foundation.",
        "Use Near-Black for all primary text. One weight of black, no variations.",
        "Use the single Muted tone for all secondary text. No additional greys.",
      ],
      donts: [
        "Never introduce additional neutral tones beyond the four defined.",
        "Never use marine blue as a background fill.",
        "Never use bronze as a fill color, button, or large surface.",
        "Never use pure black (#000). Near-Black (#111) provides warmth.",
        "Never add colored backgrounds — neutrals only.",
      ],
    },
    {
      type: "text",
      heading: "Palette Philosophy",
      body: "Four neutrals. Two accents. Each with a single, non-overlapping purpose. The palette evokes cartography, editorial clarity, and architectural warmth. No redundancy, no ambiguity.",
    },
    {
      type: "applied-example",
      heading: "Applied Example",
      description: "System colors applied to buttons, alerts, and status messages.",
      variant: "color-usage",
    },
  ],
};
