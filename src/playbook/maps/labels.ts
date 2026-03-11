import type { PlaybookPage } from "../types";

export const labelsPlaybook: PlaybookPage = {
  section: "Maps",
  page: "Map Labels & Geography",
  slug: "maps/labels",
  description: "Label hierarchy, naming conventions, and visibility rules. Every label is intentional — nothing appears by default.",
  status: "complete",
  openQuestions: [],
  content: [
    {
      type: "spec-table",
      heading: "Label Hierarchy",
      columns: ["Level", "Type", "Size", "Weight", "Example"],
      rows: [
        { label: "L1 — Major landmark", value: "14px · Medium", notes: "Mont Blanc, Etna, Preikestolen" },
        { label: "L2 — Island / large feature", value: "13px · Regular", notes: "Brač, Korčula, Lofoten" },
        { label: "L3 — Village / town", value: "12px · Medium", notes: "Vik, Flåm, Kotor" },
        { label: "L4 — Small island / islet", value: "11px · Regular", notes: "Lokrum, Sveti Stefan" },
        { label: "L5 — Water feature", value: "12px italic · Regular", notes: "Sognefjorden, Adriatic Sea" },
        { label: "L6 — POI label", value: "10–11px · Regular", notes: "Viking burial site, Lavender field" },
      ],
    },
    {
      type: "rule-list",
      heading: "Naming Conventions",
      variant: "neutral",
      items: [
        "Use local names with Latin transliteration where needed",
        "Include the English name in parentheses only for major landmarks",
        "Water features use italic styling to distinguish from land",
        "Never abbreviate geographic feature names",
        "Use title case for all labels",
      ],
    },
    {
      type: "spec-table",
      heading: "Visibility Rules",
      rows: [
        { label: "Always visible", value: "Major landmarks (L1), current vessel position label" },
        { label: "Visible in standard + expanded corridor", value: "Islands (L2), villages (L3), water features (L5)" },
        { label: "Visible only when zoomed in", value: "Small islets (L4), POI labels (L6)" },
      ],
    },
    {
      type: "text",
      heading: "Label Collision",
      body: "When labels overlap, higher-level labels take priority. Lower-level labels are hidden — never truncated, never reduced in size. The map should always feel spacious and readable.",
    },
  ],
};
