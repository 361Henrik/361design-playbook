import type { PlaybookPage } from "../types";

export const mapExamplesPlaybook: PlaybookPage = {
  section: "Maps",
  page: "Map Examples",
  slug: "maps/examples",
  description: "Scenario-based examples showing how the map system adapts to different voyage types and geographic contexts.",
  status: "complete",
  openQuestions: [],
  content: [
    {
      type: "scenario",
      heading: "Voyage Scenarios",
      scenarios: [
        {
          title: "Rhine River Cruise",
          type: "River",
          corridor: "Standard (3–5 km)",
          description: "Dense landscape with castles, vineyards, and villages on both banks. Many POIs in a narrow corridor. Labels prioritize the most famous landmarks — Lorelei Rock, Marksburg Castle — while smaller villages appear at closer zoom.",
          features: [
            "Tight corridor — both banks always visible",
            "High POI density — filtering is essential",
            "Frequent port stops shown on route line",
            "Village labels on both sides of the river",
          ],
        },
        {
          title: "Norwegian Fjord Voyage",
          type: "Coastal",
          corridor: "Mixed (Standard + Scenic Expansion)",
          description: "Deep fjords with steep mountains. The corridor alternates between tight fjord passages and scenic expansions when glaciers or major peaks become visible. Labels emphasize natural features over settlements.",
          features: [
            "Corridor widens for glacier and mountain views",
            "Water labels in italic for fjord names",
            "Sparse POIs — nature dominates",
            "Vessel position critical in narrow fjord passages",
          ],
        },
        {
          title: "Dalmatian Coast Cruise",
          type: "Coastal",
          corridor: "Standard + Scenic Expansion",
          description: "Island-hopping along the Croatian coast. Many small islands and islets require careful label management. Historic towns like Dubrovnik and Split trigger scenic expansion to show the wider context.",
          features: [
            "Many L4 labels (small islands) — collision management important",
            "Scenic expansion for major historic cities",
            "Maritime category prominent (harbors, lighthouses)",
            "Filter defaults include Culture for historic sites",
          ],
        },
        {
          title: "Open Sea Transit",
          type: "Ocean",
          corridor: "Tight",
          description: "Long stretches with no land visible. The corridor tightens to show only the route line and vessel position. Minimal labels, minimal POIs. The map becomes a simple progress indicator.",
          features: [
            "Tight corridor — no landscape features",
            "Route line and vessel position only",
            "Water labels for sea/ocean names",
            "Map serves as journey progress, not discovery",
          ],
        },
      ],
    },
    {
      type: "text",
      heading: "Pattern Summary",
      body: "The map system adapts to each voyage context through corridor width, label density, and POI category defaults. The core principles — calm, curated, readable — remain constant regardless of geography. The operator's role is to define the scenic envelope; the system's role is to present it elegantly.",
    },
  ],
};
