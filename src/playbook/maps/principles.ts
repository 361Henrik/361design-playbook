import type { PlaybookPage } from "../types";

export const mapPrinciplesPlaybook: PlaybookPage = {
  section: "Maps",
  page: "Map Principles",
  slug: "maps/principles",
  description: "The map is not a navigation tool. It is a landscape awareness and storytelling tool that helps guests understand where they are, what they see, what is nearby, and where they are along the journey.",
  status: "complete",
  openQuestions: [],
  content: [
    {
      type: "text",
      heading: "Purpose",
      body: "The Curated Lens map exists to create a sense of place. It answers four questions for the guest:\n• Where am I right now?\n• What am I seeing outside the window?\n• What is nearby worth knowing about?\n• Where am I along the journey?",
    },
    {
      type: "text",
      heading: "Visual Feeling",
      body: "The map must feel calm, elegant, editorial, minimal, and extremely readable — especially outdoors in bright sunlight. The visual clarity should be closer to Apple Maps than to dense navigation or nautical charts. Every element earns its place through restraint.\n\nAvoid cluttered maps with excessive markers. The map is a storytelling surface, not a data visualization.",
    },
    {
      type: "principle-list",
      heading: "Core Principles",
      items: [
        { title: "Route First", description: "The journey route is the primary visual element. Everything else supports it. The route line anchors the guest's spatial understanding." },
        { title: "Landscape Before Data", description: "Show the landscape — water, land, mountains, islands — before any data points. The map should feel like looking out the window, not reading a spreadsheet." },
        { title: "Calm Base Map", description: "The base map uses muted, desaturated tones. No bright fills, no busy patterns. The terrain whispers — the route and POIs speak." },
        { title: "Corridor Only", description: "Only the scenic corridor around the route is shown. The map does not display the entire region. Irrelevant geography is hidden to maintain focus and elegance." },
        { title: "Curated Discovery", description: "Every marker, label, and POI is intentionally placed by the operator. Nothing appears automatically. The map is an editorial product, not a data dump." },
        { title: "Readable at a Glance", description: "Guests aged 50+ must understand the map instantly. Large labels, high contrast markers (white disk, black ring, black icon), minimal clutter. If it requires study, it has failed." },
        { title: "Clear Contrast in All Conditions", description: "Map markers and labels must remain readable in bright sunlight, indoor lighting, and screen glare conditions. The white-on-black marker design ensures visibility in all environments." },
      ],
    },
    {
      type: "text",
      heading: "Minimal Marker Philosophy",
      body: "Markers use a standard design: white circular disk with black outline ring and black icon centered inside. This provides:\n• High contrast against any map background\n• Readability in bright sunlight\n• Visual clarity for older users\n• A calm, visually quiet map surface\n\nColor is used sparingly — only for state changes (selected = bronze ring). Default markers are always monochrome. Markers should feel refined and understated, not playful.",
    },
    {
      type: "rule-list",
      heading: "The Map Must Never",
      variant: "dont",
      items: [
        "Feel like a GPS or car navigation system",
        "Show dense, unfiltered geographic data",
        "Display areas far outside the scenic corridor",
        "Use bright, saturated, or playful styling",
        "Require pinching, zooming, or effort to read",
        "Use bright colored markers for category differentiation",
        "Show too many markers at once — curate, don't flood",
      ],
    },
  ],
};
