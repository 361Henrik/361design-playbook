import type { PlaybookPage } from "../types";

export const visualStylePlaybook: PlaybookPage = {
  section: "Maps",
  page: "Map Visual Style",
  slug: "maps/visual-style",
  description: "Helmut guest-map aesthetic: neutral, editorial, sunlight-readable, and bound to ATLAS · Helmut.",
  status: "complete",
  openQuestions: [],
  content: [
    {
      type: "text",
      heading: "Surface Contract: Helmut",
      body: "The guest map uses ATLAS · Helmut only. Operator identity may change logo, imagery, and voice, but not the map palette, route grammar, marker design, typography, or accessibility behavior.",
    },
    {
      type: "color-swatch",
      heading: "Map Color Palette",
      colors: [
        { name: "Water", value: "#FBF9F5", description: "Warm White with shoreline stroke and explicit water labels." },
        { name: "Land", value: "#F3F0EA", description: "Off-white, clearly differentiated without introducing blue." },
        { name: "Route — upcoming", value: "#191926 at 45%", description: "Near Black at reduced opacity; pair state with line pattern or label." },
        { name: "Route — active", value: "#1B3D2F", description: "Forest. Fixed, high-contrast route state." },
        { name: "Vessel position", value: "#1B3D2F", description: "Forest with a non-color direction indicator." },
        { name: "POI marker background", value: "#FBF9F5", description: "Warm White disk for legibility." },
        { name: "POI marker ring", value: "#191926", description: "Near Black outline ring (2px)." },
        { name: "POI marker icon", value: "#191926", description: "Near Black outline icon." },
        { name: "POI marker — selected", value: "#C69B5B", description: "Antique Bronze ring (3px), paired with size and label state." },
        { name: "Label text", value: "#191926", description: "Near Black; opacity may reduce only after contrast verification." },
      ],
    },
    {
      type: "text",
      heading: "Standard Map Marker Design",
      body: "Each marker has a Near Black 2px outer ring, a solid Warm White disk, and a centered Near Black outline icon. Selection uses a 3px Antique Bronze ring plus a visible label or size change so color is never the only signal. The visual marker may be 32–48px, but the invisible hit area is always at least 52px.",
    },
    {
      type: "spec-table",
      heading: "Marker Specifications",
      rows: [
        { label: "Marker shape", value: "Circular disk with pointer tip", notes: "Solid Warm White disk" },
        { label: "Default ring", value: "2px solid #191926", notes: "Near Black" },
        { label: "Selected ring", value: "3px solid #C69B5B", notes: "Helmut Antique Bronze" },
        { label: "Visual marker", value: "32–48px", notes: "Size follows information priority" },
        { label: "Touch target", value: "52px minimum", notes: "Expanded hit area for outdoor senior-first use" },
        { label: "Elevation", value: "1px solid offset or shoreline separation", notes: "No shadow-dependent legibility" },
      ],
    },
    {
      type: "spec-table",
      heading: "Map Typography",
      rows: [
        { label: "Geographic labels", value: "12–14px · Lexend 500 · Near Black" },
        { label: "Water labels", value: "12–14px · Lexend 500 · Near Black", notes: "Include a water descriptor where ambiguity is possible" },
        { label: "Village / town labels", value: "12–14px · Lexend 500 · Near Black" },
        { label: "POI labels", value: "14–16px · Lexend 500 · Near Black", notes: "Below or beside marker" },
      ],
    },
    {
      type: "rule-list",
      heading: "Visual Constraints",
      variant: "dont",
      items: [
        "No colors outside ATLAS · Helmut",
        "No category-based marker coloring",
        "No gradients, textures, satellite mode, or decorative terrain",
        "No state communicated by color alone",
        "No map hit areas below 52px",
        "No operator palette or font override",
      ],
    },
  ],
};
