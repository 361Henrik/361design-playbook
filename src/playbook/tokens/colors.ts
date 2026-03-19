import type { PlaybookPage } from "../types";

export const colorsPlaybook: PlaybookPage = {
  section: "Foundations",
  page: "Color",
  slug: "tokens/colors",
  description: "Four neutrals, each with a single purpose. Deep green for structure. Terracotta for interaction. Bronze for highlights. No overlapping roles.",
  status: "complete",
  openQuestions: [],
  content: [
    {
      type: "text",
      heading: "System Modes",
      body: "The Curated Lens operates as a single system with two rendering modes:\n\n**Curated Lens Signature Mode (B2B)** — Used in the Design System Hub, sales materials, and onboarding. Deep green + bronze accents express the Curated Lens identity.\n\n**Operator Expression Mode (B2C)** — Used in guest-facing environments. Allows controlled color adaptation (accent override, optional route color) while map structure, marker system, layout, and typography rules remain immutable.",
    },
    {
      type: "color-swatch",
      heading: "Core Palette",
      colors: [
        {
          name: "Base Canvas",
          value: "#F6F3EE (HSL 37 31% 95%)",
          description: "Primary background. Used across all main surfaces. A neutral, low-chroma base that allows accent colors to stand out clearly. The canvas should recede — never compete. CSS: --background, Tailwind: background",
        },
        {
          name: "Warm Stone",
          value: "#E8E2D9 (HSL 33 16% 89%)",
          description: "Secondary surface. Cards, panels, and layered sections sit on this. Creates clear separation from the background without competing. CSS: --card, Tailwind: card",
        },
        {
          name: "Deep Charcoal",
          value: "#1A1F1A (HSL 120 9% 11%)",
          description: "Primary text. All body copy, headings, labels, and UI text. One text color for all primary content. CSS: --foreground, Tailwind: foreground",
        },
        {
          name: "Muted",
          value: "#6E6A5E (HSL 45 8% 40%)",
          description: "Secondary text. Descriptions, captions, supporting labels. The only secondary text tone in the system. CSS: --muted-foreground, Tailwind: muted-foreground",
        },
        {
          name: "Deep Green",
          value: "#1F4A3A (HSL 158 41% 21%)",
          description: "Structure and identity color. Section backgrounds, emphasis panels, and areas requiring stronger contrast within a page. When used as a background, pair with light text and bronze headings. Signals importance and structure, never decoration. CSS: --deep-green, Tailwind: deep-green",
        },
        {
          name: "Terracotta",
          value: "#C35C3C (HSL 14 53% 50%)",
          description: "Interaction and emphasis color only. Buttons, CTAs, active states, selected states, highlight panels, callout sections. Never for typography (body, headings, labels, tags), map elements (markers, routes, overlays), icons, borders, or structural UI. Controlled, intentional, rare enough to signal importance. CSS: --primary / --terracotta, Tailwind: primary / terracotta",
        },
        {
          name: "Champagne Bronze",
          value: "#C9A962 (HSL 40 46% 53%)",
          description: "Highlight accent. Icon highlights, selected markers, thin dividers. On deep green surfaces only, bronze is used for headings to create a refined, high-contrast hierarchy. Never used as text on light/neutral surfaces — insufficient contrast. Bronze is jewelry, never paint. CSS: --accent, Tailwind: accent",
        },
        {
          name: "Warm Border",
          value: "#CCC4B8 (HSL 33 12% 76%)",
          description: "The single border color. Cards, inputs, dividers. Visible against both Base Canvas and Warm Stone surfaces — no border variations. CSS: --border, Tailwind: border",
        },
      ],
    },
    {
      type: "spec-table",
      heading: "Color Usage Rules",
      rows: [
        { label: "Base Canvas", value: "Primary reading surface", notes: "All main surfaces, 80%+ of visible area" },
        { label: "Warm Stone", value: "Secondary surface only", notes: "Cards, panels, layered sections" },
        { label: "Deep Charcoal", value: "Primary text only", notes: "Never as background fill" },
        { label: "Muted", value: "Secondary text only", notes: "No other grey tones allowed" },
        { label: "Deep Green", value: "Structural / identity surface", notes: "Navigation, sidebars, hero sections, anchor panels. The primary identity surface." },
        { label: "Terracotta", value: "Interaction only", notes: "Buttons, CTAs, active states. Never for navigation, sidebars, large panels, or structural surfaces." },
        { label: "Bronze", value: "Highlight only", notes: "Icons, markers, dividers. Text only on deep green backgrounds." },
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
        { label: "Deep Charcoal on Base Canvas", value: "Primary text pairing" },
        { label: "Cream on Deep Green", value: "Inverted panels / emphasis sections" },
        { label: "Deep Charcoal on Warm Stone", value: "Card text" },
        { label: "Bronze on Deep Green", value: "Headings only — high-contrast accent on dark surface" },
      ],
    },
    {
      type: "do-dont",
      dos: [
        "Use terracotta exclusively for interactive elements and emphasis surfaces — buttons, CTAs, active states, highlight panels.",
        "Use deep green for structural emphasis — section backgrounds, identity panels.",
        "Keep terracotta rare and intentional — it signals importance through scarcity.",
        "Use bronze sparingly — icon highlights, selected markers, thin dividers. As text, only on deep green.",
        "Keep Base Canvas dominant — it is the neutral foundation that lets accents shine.",
        "Use Deep Charcoal for all primary text. One weight of dark, no variations.",
        "Use the single Muted tone for all secondary text. No additional greys.",
      ],
      donts: [
        "Never introduce additional neutral tones beyond the four defined.",
        "Never introduce any blue tones.",
        "Never use terracotta for typography — body text, headings, labels, navigation text, tags, or pill labels.",
        "Never use terracotta in maps — markers, icons, route lines, overlays, or highlights.",
        "Never use terracotta for system icons or navigation icons.",
        "Never use terracotta for borders, dividers, or neutral surface backgrounds.",
        "Never use deep green as a button or interactive color.",
        "Never use bronze as a fill color, button, large surface, or text on light/neutral backgrounds.",
        "Never use pure black (#000). Deep Charcoal (#1A1F1A) provides warmth.",
        "Never add colored backgrounds — neutrals only.",
      ],
    },
    {
      type: "text",
      heading: "Palette Philosophy",
      body: "Four neutrals. Two structural accents. One interaction color. Each with a single, non-overlapping purpose. The palette evokes cartography, editorial clarity, and architectural warmth. No redundancy, no ambiguity.",
    },
    {
      type: "applied-example",
      heading: "Applied Example",
      description: "System colors applied to buttons, alerts, and status messages.",
      variant: "color-usage",
    },
  ],
};
