import type { PlaybookPage } from "../types";

export const layersPlaybook: PlaybookPage = {
  section: "Maps",
  page: "Map Layers",
  slug: "maps/layers",
  description: "The map is structured as five distinct layers, from base geography up to interaction. Each layer has a defined purpose and visual priority.",
  status: "complete",
  openQuestions: [],
  content: [
    {
      type: "text",
      heading: "Layer Stack",
      body: "Layers are rendered bottom-to-top. Higher layers visually sit above lower layers. The base geography is always present; upper layers are conditionally shown based on zoom level, corridor state, and guest interaction.",
    },
    {
      type: "layer-stack",
      heading: "Layers",
      layers: [
        { number: 1, title: "Base Geography", description: "The foundational layer. Water, land, and minimal terrain shading. Muted and desaturated — it provides spatial context without competing with content layers.", items: ["Water bodies", "Land masses", "Minimal terrain relief"] },
        { number: 2, title: "Landscape Labels", description: "Named geographic features visible from the vessel. These labels help guests identify what they see outside the window.", items: ["Islands & islets", "Skerries", "Hills & mountains", "Villages", "Fjords", "Visible landmarks"] },
        { number: 3, title: "Route Layer", description: "The journey line and vessel position. The most prominent visual element on the map.", items: ["Full route line", "Completed route segment", "Current vessel position"] },
        { number: 4, title: "POI Layer", description: "Curated points of interest selected by the operator. Each POI uses a category icon from the approved icon set.", items: ["Curated POIs", "Category icons", "Operator-selected markers"] },
        { number: 5, title: "Interaction Layer", description: "The response layer for guest interaction. Appears when a guest taps a marker or interacts with the map.", items: ["Selected marker state", "Information card", "Filtering states"] },
      ],
    },
    {
      type: "rule-list",
      heading: "Layer Rules",
      variant: "dont",
      items: [
        "Never merge layers — each layer has distinct rendering logic",
        "Never show POI layer without the route layer visible",
        "Never allow interaction layer to obscure the vessel position",
      ],
    },
  ],
};
