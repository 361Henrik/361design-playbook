import type { PlaybookPage } from "../types";

export const interactionPlaybook: PlaybookPage = {
  section: "Maps",
  page: "Map Interaction",
  slug: "maps/interaction",
  description: "Tap, pan, and zoom behavior. Every interaction must feel calm and intentional — the map responds, never reacts.",
  status: "complete",
  openQuestions: [],
  content: [
    {
      type: "spec-table",
      heading: "Tap / Click Behavior",
      rows: [
        { label: "Tap POI marker", value: "Opens information card for that POI. Marker enters selected state. Other markers dim slightly." },
        { label: "Tap landscape label", value: "No action. Labels are informational only — they do not open cards or trigger navigation." },
        { label: "Tap empty map area", value: "Dismisses any open information card. Returns all markers to default state." },
        { label: "Tap vessel marker", value: "Centers map on vessel and shows current position context (e.g., 'Approaching Flåm')." },
      ],
    },
    {
      type: "spec-table",
      heading: "Pan & Zoom",
      rows: [
        { label: "Pan", value: "Free panning within the scenic corridor. Cannot pan beyond corridor boundaries. Smooth deceleration." },
        { label: "Zoom", value: "2–3 discrete zoom levels only. Pinch-to-zoom with snapping. No free zoom — prevents accidental over-zoom." },
        { label: "Return to vessel", value: "After panning away, a 'Return to vessel' button appears. Tapping it smoothly animates back to the vessel position." },
      ],
    },
    {
      type: "text",
      heading: "Information Card",
      body: "When a guest taps a POI marker, an information card slides up from the bottom of the map. The card contains: POI name (title), category icon and label, short description (2–3 sentences max), distance from vessel (optional, in natural language: 'About 2 km away'), and 'Read more' link to full article (if available). The card uses a 300ms ease-out slide animation. It dismisses on tap outside, swipe down, or tapping another marker.",
    },
    {
      type: "rule-list",
      heading: "Interaction Constraints",
      variant: "dont",
      items: [
        "No double-tap to zoom",
        "No long-press actions",
        "No gesture-based navigation (swipe to next POI)",
        "No hover tooltips (touch-first design)",
        "No clustering that requires tap-to-expand",
      ],
    },
  ],
};
