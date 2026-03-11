import type { PlaybookPage } from "../types";

export const routePositionPlaybook: PlaybookPage = {
  section: "Maps",
  page: "Route & Position",
  slug: "maps/route-position",
  description: "How the journey route is drawn, how progress is shown, and how the vessel position behaves on the map.",
  status: "complete",
  openQuestions: [],
  content: [
    {
      type: "text",
      heading: "Route Line",
      body: "The route is a single continuous line from embarkation to disembarkation. It is the most prominent element on the map after the base geography.",
    },
    {
      type: "spec-table",
      heading: "Route Line Specs",
      rows: [
        { label: "Completed segment", value: "2px solid · Near-black (#1A1A1A) · Full opacity" },
        { label: "Upcoming segment", value: "2px solid · Warm grey (#8B8680) · 60% opacity" },
        { label: "Line style", value: "Smooth curves · No dashes · No arrows · Round line caps" },
      ],
    },
    {
      type: "spec-table",
      heading: "Vessel Position",
      rows: [
        { label: "Marker", value: "8px solid circle · Near-black (#1A1A1A) · No stroke" },
        { label: "Update frequency", value: "Every 30–60 seconds · Smooth interpolation between updates" },
        { label: "Map centering", value: "Map follows vessel by default · Guest can pan freely · 'Return to vessel' button appears" },
      ],
    },
    {
      type: "text",
      heading: "Progress Indication",
      body: "Progress is shown through the contrast between completed (dark) and upcoming (light) route segments. No percentage, no progress bar, no numeric distance. The completed/upcoming split at the vessel position is the only progress indicator. Port stops along the route are shown as small circles on the route line. Visited ports use the completed style; upcoming ports use the upcoming style.",
    },
    {
      type: "rule-list",
      heading: "Route Constraints",
      variant: "dont",
      items: [
        "No dashed or dotted route lines",
        "No directional arrows on the route",
        "No glowing, pulsing, or animated vessel marker",
        "No ETA or distance overlays on the map",
        "No speed indicators",
      ],
    },
  ],
};
