import type { PlaybookPage } from "../types";

export const iconsPlaybook: PlaybookPage = {
  section: "Tokens",
  page: "Icon System",
  slug: "tokens/icons",
  description: "Thin stroke (1.5–2px), geometric, no fills, no gradients. Lucide icons aligned with the system's architectural sensibility.",
  status: "complete",
  openQuestions: [],
  content: [
    {
      type: "spec-table",
      heading: "Icon Specifications",
      rows: [
        { label: "Stroke Width", value: "1.5–2px" },
        { label: "Default Size", value: "24×24px (h-6 w-6)" },
        { label: "Small Size", value: "16×16px (h-4 w-4)" },
        { label: "Style", value: "Outline only — no fills" },
        { label: "Library", value: "Lucide React" },
      ],
    },
    {
      type: "spec-table",
      heading: "Icon Groups",
      rows: [
        { label: "Navigation", value: "Menu, Close, Chevron Down/Right, Arrow Right/Left/Up, External Link" },
        { label: "Actions", value: "Search, Plus, Minus, Check, Copy, Download, Upload, Settings" },
        { label: "Content", value: "User, Mail, Calendar, Eye, Eye Off, Palette, Type, Layout" },
        { label: "Shapes", value: "Circle, Square, Triangle, Star, Hexagon, Ruler, Zap" },
      ],
    },
    {
      type: "spec-table",
      heading: "POI Map Icon Taxonomy",
      rows: [
        { label: "Essentials", value: "Hotel, Café, Restaurant, Information" },
        { label: "Culture & Heritage", value: "Historic Site, Museum, Gallery" },
        { label: "Scenic & Landscape", value: "View, Island/Islet, Nature Sight, Lookout" },
        { label: "Nature Experiences", value: "Nature Walk, Beach" },
        { label: "Urban & Exploration", value: "Bridge, Shopping" },
      ],
    },
    {
      type: "spec-table",
      heading: "Map Marker States",
      rows: [
        { label: "Default", value: "2px foreground ring, white body, outline icon" },
        { label: "Hover", value: "2.5px foreground ring" },
        { label: "Selected", value: "3px bronze ring" },
        { label: "Curated", value: "Double bronze ring (operator-highlighted)" },
        { label: "Cluster", value: "Count number instead of icon" },
      ],
    },
    {
      type: "do-dont",
      dos: [
        "Use thin-stroke (1.5–2px) geometric icons from Lucide.",
        "Keep icons functional and minimal — they serve navigation and clarity.",
        "Use consistent sizing: 24px default, 16px for compact contexts.",
        "Color icons with text-foreground or text-muted-foreground only.",
      ],
      donts: [
        "No filled icons — always use outline/stroke variants.",
        "No gradients on icons under any circumstances.",
        "No decorative or illustrative icon styles.",
        "Don't use icons larger than 32px except in hero/empty states.",
      ],
    },
  ],
};
