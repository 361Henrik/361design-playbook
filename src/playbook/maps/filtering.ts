import type { PlaybookPage } from "../types";

export const filteringPlaybook: PlaybookPage = {
  section: "Maps",
  page: "Filtering & Categories",
  slug: "maps/filtering",
  description: "The POI category system and filtering behavior. Guests see a curated default — they can reveal more, but never face clutter.",
  status: "complete",
  openQuestions: [],
  content: [
    {
      type: "category-list",
      heading: "POI Categories",
      categories: [
        { name: "Nature", description: "Mountains, waterfalls, glaciers, national parks, scenic viewpoints", defaultVisible: true },
        { name: "Culture", description: "Churches, castles, museums, historic sites, monuments", defaultVisible: true },
        { name: "Village", description: "Towns, villages, harbors, fishing communities", defaultVisible: true },
        { name: "Activity", description: "Excursions, hiking trails, kayaking, cycling routes", defaultVisible: false },
        { name: "Dining", description: "Restaurants, cafés, local food experiences", defaultVisible: false },
        { name: "Maritime", description: "Lighthouses, harbors, shipwrecks, maritime heritage", defaultVisible: true },
        { name: "Wildlife", description: "Bird colonies, whale watching, seal colonies, wildlife reserves", defaultVisible: false },
      ],
    },
    {
      type: "rule-list",
      heading: "Filter UI Behavior",
      variant: "neutral",
      items: [
        "Filter bar sits at the top or bottom of the map, depending on device",
        "Categories are shown as pill-shaped toggles",
        "Active categories use filled style; inactive use outline style",
        "Toggling a category on/off animates markers in/out (fade, 300ms)",
        "Maximum 4 categories visible in filter bar; overflow scrolls horizontally",
        "'All' toggle resets to default visibility",
      ],
    },
    {
      type: "spec-table",
      heading: "Default Visibility",
      description: "On first load, only default-on categories are visible. This ensures the map feels clean and curated.",
      rows: [
        { label: "Default ON", value: "Nature, Culture, Village, Maritime" },
        { label: "Default OFF", value: "Activity, Dining, Wildlife" },
      ],
    },
    {
      type: "text",
      heading: "Operator Control",
      body: "Operators can customize which categories are default-on per route. They can also create custom categories for specific voyages (e.g., 'Wine Region' for a Douro cruise). Custom categories follow the same visual rules as standard categories.",
    },
  ],
};
