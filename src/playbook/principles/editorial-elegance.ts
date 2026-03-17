import type { PlaybookPage } from "../types";

export const editorialElegancePlaybook: PlaybookPage = {
  section: "Principles",
  page: "Editorial Elegance",
  slug: "principles/editorial-elegance",
  description:
    "Guest-facing design philosophy (B2C). Despite strong usability requirements, every interface must feel premium, calm, visually refined, and editorial — like a travel magazine translated into a digital experience.",
  status: "complete",
  openQuestions: [],
  content: [
    {
      type: "text",
      heading: "Audience: Guest Experience (B2C)",
      body: "This section defines the visual and emotional quality standard for all guest-facing interfaces. These rules apply to every surface a traveler interacts with, regardless of which operator is configured.\n\nEditorial elegance is a guest experience principle — it governs how the interface feels to the person using it.",
    },
    {
      type: "text",
      heading: "The Balance",
      body: "The Curated Lens serves demanding accessibility and usability requirements — large text, high contrast, generous spacing, clear hierarchy. These constraints could easily produce a clinical, utilitarian interface.\n\nThe design system's job is to ensure that accessibility and beauty are the same gesture. Generous whitespace is both readable and elegant. Large type is both accessible and editorial. Restraint in color is both calm and premium.\n\nThe platform should feel like a premium travel magazine translated into a digital experience — not a software application.",
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
            "Neutral base always dominant. Marine blue for interaction only. Bronze for subtle highlights. No colored backgrounds — surfaces are always cream, ivory, or white.",
        },
        {
          title: "Subtle Depth",
          description:
            "Use shadow-sm on cards, gentle border transitions on hover, and opacity shifts — not dramatic shadows, glows, or elevation changes.",
        },
        {
          title: "High-Quality Photography",
          description:
            "Imagery should be cinematic, contemplative, and premium. Integrated naturally into the layout, never competing with text for readability. Overlays on photography must maintain full text contrast.",
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
        "Colored backgrounds on primary surfaces — neutrals only",
        "Rounded-everything aesthetic (keep border-radius restrained)",
        "Tech startup visual language (neon, glassmorphism, 3D)",
        "Cluttered layouts that feel like software rather than editorial content",
      ],
    },
    {
      type: "text",
      heading: "Cross-Platform Application",
      body: "These editorial principles apply across every guest-facing surface:\n\n• Map design and location markers\n• Story and article pages\n• Onboarding flows\n• Notifications\n• Navigation menus\n• Mobile exploration interface\n• Editorial content layouts\n\nNo surface is exempt from the elegance standard. The editorial quality must remain consistent whether the guest is viewing a map, reading a story, or browsing onboarding content.",
    },
    {
      type: "text",
      heading: "Distinction from Operator Branding",
      body: "Editorial elegance is a constant — it applies to every operator configuration. While operators may customize accent colors and tone, the underlying editorial quality standard (whitespace, typography hierarchy, restraint, depth) does not change.\n\nOperator branding adapts personality. Editorial elegance defines quality.",
    },
  ],
};
