import type { PlaybookPage } from "./types";

export const brandPrinciples: PlaybookPage = {
  section: "Principles",
  page: "Brand Guidelines",
  slug: "principles/brand-guidelines",
  description: "Calm, architectural, intelligent, editorial authority, controlled luxury. Restraint signals confidence.",
  status: "complete",
  openQuestions: [],
  content: [
    {
      type: "text",
      heading: "Brand Essence",
      body: "Calm, architectural, intelligent, editorial authority, controlled luxury. Every decision should reinforce restraint as a signal of confidence.\n\nThe palette evokes exploration, cartography, travel storytelling, and editorial clarity. The system should feel warm, calm, and intentional.",
    },
    {
      type: "text",
      heading: "Single System, Two Rendering Modes",
      body: "The Curated Lens is a single design system with two rendering modes:\n\n**Curated Lens Signature Mode (B2B)** — How the system expresses its own identity in the Design System Hub, sales materials, and onboarding. Uses Deep Marine Blue + Champagne Bronze as accent colors.\n\n**Operator Expression Mode (B2C)** — How the system adapts to each operator's identity in guest-facing environments. Allows controlled color adaptation while structural rules (map, marker, layout, typography) remain immutable.\n\nThese modes share a single foundation: neutral backgrounds (cream, ivory), the same typography stack, the same spacing scale, and the same structural constraints.",
    },
    {
      type: "text",
      heading: "Audience-Centered Design",
      body: "The platform serves mature travelers (typically 50+) who expect premium, intuitive experiences. The design must be optimized for clarity, readability, and ease of use — without ever feeling like a 'senior product.' Elegance and accessibility are the same gesture.",
    },
    {
      type: "text",
      heading: "Imagery Philosophy",
      body: "Cinematic, contemplative, premium travel mood. Integrated product experience. Avoid staged corporate stock imagery. Avoid recognizable operator assets unless approved. Never use low-contrast overlays on photography that compromise text readability.",
    },
    {
      type: "rule-list",
      heading: "Avoidance List",
      variant: "dont",
      items: [
        "No decorative or trend-driven styling",
        "No startup-techy aesthetics",
        "No over-animated layouts (no bouncy, scaling, dramatic motion)",
        "No colored backgrounds — all surfaces are neutral",
        "No multiple hero images per section",
        "One hero image OR one diagram, not both",
        "No overly playful or cartoon-style icons",
        "No dense dashboards with competing data",
        "No tech startup visual language (neon, glassmorphism, 3D)",
      ],
    },
  ],
};
