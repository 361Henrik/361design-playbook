import type { PlaybookPage } from "../types";

export const visualStylePlaybook: PlaybookPage = {
  section: "Maps",
  page: "Map Visual Style",
  slug: "maps/visual-style",
  description: "Muted, desaturated, editorial. The map should feel like a premium illustrated guide — not a navigation screen.",
  status: "complete",
  openQuestions: [],
  content: [
    {
      type: "color-swatch",
      heading: "Map Color Palette",
      colors: [
        { name: "Water", value: "#D4E4ED", description: "Desaturated blue-grey. Calm, not bright." },
        { name: "Land", value: "#F0EDE8", description: "Warm off-white / parchment. Barely visible terrain." },
        { name: "Terrain shadow", value: "#E2DDD6", description: "Subtle hillshade for depth, not topographic detail." },
        { name: "Route — upcoming", value: "#8B8680", description: "Muted warm grey. Present but not dominant." },
        { name: "Route — completed", value: "#1A1A1A", description: "Near-black. Clear progress indication." },
        { name: "Vessel position", value: "#1A1A1A", description: "Matches completed route. Solid, confident." },
        { name: "POI marker", value: "#5C5650", description: "Dark warm grey. Refined, not bright." },
        { name: "POI marker — selected", value: "#1A1A1A", description: "Full contrast when tapped / active." },
        { name: "Label text", value: "#6B6560", description: "Warm mid-grey. Readable but quiet." },
        { name: "Corridor boundary", value: "transparent", description: "The corridor is implied, never drawn." },
      ],
    },
    {
      type: "spec-table",
      heading: "Map Typography",
      rows: [
        { label: "Geographic labels (islands, mountains)", value: "12–14px · Regular · Warm grey · Letter-spacing +0.02em" },
        { label: "Water labels (fjords, seas, rivers)", value: "11–13px · Italic · Blue-grey · Letter-spacing +0.04em" },
        { label: "Village / town labels", value: "11–12px · Medium · Dark grey · Letter-spacing +0.01em" },
        { label: "POI labels", value: "10–11px · Regular · Warm grey · Below marker" },
      ],
    },
    {
      type: "rule-list",
      heading: "Visual Constraints",
      variant: "dont",
      items: [
        "No saturated or bright colors on the base map",
        "No gradients on land or water fills",
        "No drop shadows on markers or labels",
        "No outline strokes on land masses",
        "No pattern fills or textures",
        "No colored category markers — all markers use the neutral palette",
      ],
    },
  ],
};
