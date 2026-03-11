import type { PlaybookPage } from "../types";

export const corridorPlaybook: PlaybookPage = {
  section: "Maps",
  page: "Dynamic Scenic Corridor",
  slug: "maps/corridor",
  description: "The map uses a Dynamic Scenic Corridor model instead of a fixed width. The corridor defines the visible map area around the route and adapts depending on landscape visibility.",
  status: "complete",
  openQuestions: [],
  content: [
    {
      type: "text",
      heading: "Concept",
      body: "The scenic corridor is a curated envelope around the route. It determines what the guest sees on the map at any point along the journey. Rather than showing a fixed-width strip, the corridor expands and contracts based on what is actually visible and worth showing.",
    },
    {
      type: "spec-table",
      heading: "Standard Corridor",
      description: "The default route view. Shows landscape near the vessel — nearby islands, villages, bridges, hills, and local POIs.",
      rows: [
        { label: "River Cruise", value: "3–6 km width" },
        { label: "Coastal Sailing", value: "5–10 km width" },
        { label: "Focus", value: "Nearby islands, villages, bridges, hills, local POIs" },
      ],
    },
    {
      type: "text",
      heading: "Scenic Expansion",
      body: "Used when important landmarks are visible farther away. The corridor widens locally to include the distant landmark, and its label appears. The widening feels smooth and natural — no sudden jumps.",
    },
    {
      type: "rule-list",
      heading: "Scenic Expansion Triggers",
      variant: "neutral",
      items: ["Major mountain", "Volcano", "Glacier", "Famous island", "Cathedral or castle"],
    },
    {
      type: "rule-list",
      heading: "Scenic Expansion Behavior",
      variant: "neutral",
      items: [
        "Corridor widens locally around the landmark",
        "Distant landmark becomes visible on the map",
        "Labels appear for that landmark",
        "The widening feels smooth and natural — no sudden jumps",
      ],
    },
    {
      type: "spec-table",
      heading: "Scenario Examples",
      rows: [
        { label: "Mont Blanc from valley", value: "Corridor widens south" },
        { label: "Etna from sea", value: "Corridor extends inland" },
        { label: "Glacier from fjord", value: "Corridor reaches up the valley" },
      ],
    },
    {
      type: "text",
      heading: "Tight Corridor",
      body: "Used when there are no important distant features. Reduces clutter, keeps the map elegant, and emphasizes immediate surroundings. Typical locations: open sea, long river sections, empty terrain.",
    },
    {
      type: "text",
      heading: "Corridor Editing",
      body: "Operators must be able to manually adjust corridor width. Route designers can widen corridor locally to include distant landmarks, narrow corridor locally to reduce clutter, include specific distant landmarks by exception, and exclude irrelevant areas. The corridor therefore becomes a curated scenic envelope around the route — not an automatic buffer, but an editorial decision.",
    },
  ],
};
