import type { PlaybookPage } from "../types";

export const iconsPlaybook: PlaybookPage = {
  section: "Foundations",
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
      type: "icon-grid",
      heading: "Icon Groups",
      groups: [
        {
          category: "Navigation",
          icons: [
            { name: "Menu", lucideId: "Menu" },
            { name: "Close", lucideId: "X" },
            { name: "Chevron Down", lucideId: "ChevronDown" },
            { name: "Chevron Right", lucideId: "ChevronRight" },
            { name: "Arrow Right", lucideId: "ArrowRight" },
            { name: "Arrow Left", lucideId: "ArrowLeft" },
            { name: "Arrow Up", lucideId: "ArrowUp" },
            { name: "External Link", lucideId: "ExternalLink" },
          ],
        },
        {
          category: "Actions",
          icons: [
            { name: "Search", lucideId: "Search" },
            { name: "Plus", lucideId: "Plus" },
            { name: "Minus", lucideId: "Minus" },
            { name: "Check", lucideId: "Check" },
            { name: "Copy", lucideId: "Copy" },
            { name: "Download", lucideId: "Download" },
            { name: "Upload", lucideId: "Upload" },
            { name: "Settings", lucideId: "Settings" },
          ],
        },
        {
          category: "Content",
          icons: [
            { name: "User", lucideId: "User" },
            { name: "Mail", lucideId: "Mail" },
            { name: "Calendar", lucideId: "Calendar" },
            { name: "Eye", lucideId: "Eye" },
            { name: "Eye Off", lucideId: "EyeOff" },
            { name: "Palette", lucideId: "Palette" },
            { name: "Type", lucideId: "Type" },
            { name: "Layout", lucideId: "LayoutGrid" },
          ],
        },
        {
          category: "Shapes",
          icons: [
            { name: "Circle", lucideId: "Circle" },
            { name: "Square", lucideId: "Square" },
            { name: "Triangle", lucideId: "Triangle" },
            { name: "Star", lucideId: "Star" },
            { name: "Hexagon", lucideId: "Hexagon" },
            { name: "Ruler", lucideId: "Ruler" },
            { name: "Zap", lucideId: "Zap" },
          ],
        },
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
      heading: "Marker Anatomy (Outside → Inside)",
      rows: [
        { label: "Outer ring", value: "2px solid #1A1A1A (default) · 3px solid #C6A96B (selected)" },
        { label: "White disk", value: "Solid #FFFFFF fill inside ring — no gradient, no transparency" },
        { label: "Icon", value: "Outline style · 2–2.5px stroke · #1A1A1A · centered on white disk" },
        { label: "Fills rule", value: "White disk (solid white background behind icon)" },
      ],
    },
    {
      type: "spec-table",
      heading: "Map Marker States",
      rows: [
        { label: "Default", value: "2px black ring, white disk, black outline icon. No label visible." },
        { label: "Hover", value: "2.5px black ring. White disk and icon unchanged." },
        { label: "Selected", value: "3px champagne bronze ring. White disk and icon unchanged." },
        { label: "Curated", value: "Double bronze ring (operator-highlighted). White disk and icon unchanged." },
        { label: "Cluster", value: "Count number on white disk instead of icon." },
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
    {
      type: "applied-example",
      heading: "Applied Example",
      description: "Icons used in navigation items, buttons with labels, and data lists.",
      variant: "icon-usage",
    },
  ],
};
