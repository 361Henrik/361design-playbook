import type { PlaybookPage } from "../types";

export const editorialElegancePlaybook: PlaybookPage = {
  section: "Principles",
  page: "Editorial Elegance",
  slug: "principles/editorial-elegance",
  description:
    "Despite strong usability requirements, every interface must feel premium, calm, visually refined, and editorial rather than technical.",
  status: "complete",
  openQuestions: [],
  content: [
    {
      type: "text",
      heading: "The Balance",
      body: "The Curated Lens serves demanding accessibility and usability requirements — large text, high contrast, generous spacing, clear hierarchy. These constraints could easily produce a clinical, utilitarian interface.\n\nThe design system's job is to ensure that accessibility and beauty are the same gesture. Generous whitespace is both readable and elegant. Large type is both accessible and editorial. Restraint in color is both calm and premium.",
    },
    {
      type: "principle-list",
      heading: "Editorial Design Techniques",
      items: [
        {
          title: "Generous Whitespace",
          description:
            "Use space-7 (48px) to space-9 (96px) between major sections. Let content breathe. Whitespace signals confidence and quality.",
        },
        {
          title: "Elegant Typography Hierarchy",
          description:
            "Playfair Display headlines create editorial authority. Lexend body text provides clean readability. The contrast between display and body fonts communicates premium intent.",
        },
        {
          title: "Restrained Color",
          description:
            "The 60/30/8 distribution (Warm White / Forest Green / Bronze) keeps the palette calm. Color is applied architecturally, not decoratively.",
        },
        {
          title: "Subtle Depth",
          description:
            "Use shadow-sm on cards, gentle border transitions on hover, and opacity shifts — not dramatic shadows, glows, or elevation changes.",
        },
      ],
    },
    {
      type: "rule-list",
      heading: "Avoid These Anti-Patterns",
      variant: "dont",
      items: [
        "Overly playful or cartoon-style icons",
        "Bright, saturated interface colors",
        "Dense dashboards with competing data",
        "Loud or attention-grabbing animations",
        "Gradient backgrounds on primary surfaces",
        "Rounded-everything aesthetic (keep border-radius restrained)",
        "Tech startup visual language (neon, glassmorphism, 3D)",
      ],
    },
    {
      type: "text",
      heading: "Cross-Platform Application",
      body: "These editorial principles apply across every surface: map design, location markers, story pages, onboarding flows, notifications, navigation, mobile exploration interface, editorial content layouts, and the CMS/editorial interface. No surface is exempt from the elegance standard.",
    },
  ],
};
