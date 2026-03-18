import type { PlaybookPage } from "../types";

export const motionPlaybook: PlaybookPage = {
  section: "Foundations",
  page: "Motion",
  slug: "tokens/motion",
  description: "UI transitions 300–400ms with ease-out. Hero movement 8–20s subtle loop. Restraint in every interaction.",
  status: "complete",
  openQuestions: [],
  content: [
    {
      type: "spec-table",
      heading: "UI Transitions",
      rows: [
        { label: "Duration", value: "300–400ms (default 350ms)", notes: "Tailwind: duration-ui" },
        { label: "Easing", value: "ease-out", notes: "CSS: transition-timing-function: ease-out" },
      ],
    },
    {
      type: "spec-table",
      heading: "Hero Loops",
      rows: [
        { label: "Duration range", value: "8–20 seconds" },
        { label: "Easing", value: "ease-in-out" },
        { label: "Purpose", value: "Ambient, contemplative — never attention-grabbing" },
      ],
    },
    {
      type: "rule-list",
      heading: "Approved Transition Properties",
      variant: "neutral",
      items: ["color", "background-color", "border-color", "opacity", "box-shadow", "transform (translate only)"],
    },
    {
      type: "rule-list",
      heading: "Prohibited Motion Patterns",
      variant: "dont",
      items: [
        "Parallax-heavy transitions",
        "Bouncing or scaling buttons",
        "Dramatic page transitions",
        "Over-animated layouts or loading sequences",
        "Any motion that breaks architectural calm",
        "Scale transforms on interactive elements",
      ],
    },
    {
      type: "do-dont",
      dos: [
        "Use 300–400ms ease-out for all UI transitions.",
        "Keep hero animations subtle and long (8–20s loops).",
        "Only animate color, opacity, box-shadow, and translate.",
        "Let stillness be the default — motion is the exception.",
      ],
      donts: [
        "No parallax-heavy scroll effects.",
        "No bouncing, scaling, or elastic button animations.",
        "No dramatic page or route transitions.",
        "No spring physics or playful motion curves.",
      ],
    },
    {
      type: "applied-example",
      heading: "Applied Example",
      description: "A three-frame visual sequence showing a UI element transitioning through before, mid-transition, and after states.",
      variant: "motion-sequence",
    },
  ],
};
