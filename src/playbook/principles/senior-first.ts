import type { PlaybookPage } from "../types";

export const seniorFirstPlaybook: PlaybookPage = {
  section: "Principles",
  page: "Senior-First UX",
  slug: "principles/senior-first-ux",
  description:
    "Guest-facing design principles for mature travelers (50+). Prioritizes clarity, contrast, calm hierarchy, and generous spacing — while remaining elegant and premium. The interface must never feel like a 'senior product.'",
  status: "complete",
  openQuestions: [],
  content: [
    {
      type: "text",
      heading: "Audience: Guest Experience (B2C)",
      body: "This section defines interface design rules for the guest-facing experience — the screens, maps, cards, and flows that travelers interact with directly.\n\nThese rules are not about how the platform is sold to operators. They are about how the interface behaves for the people using it.",
    },
    {
      type: "text",
      heading: "Philosophy",
      body: "The guest experience serves a predominantly mature audience — typically 50 and above. Many guests may have reduced visual acuity, slower interaction speed, limited patience for learning new digital systems, and less tolerance for confusing interfaces.\n\nHowever, the interface must never feel like a 'senior product.' It must remain elegant, editorial, and refined. The design earns trust through clarity, not condescension.",
    },
    {
      type: "principle-list",
      heading: "Core Design Principles",
      items: [
        {
          title: "Clarity Over Novelty",
          description:
            "Every UI decision prioritizes immediate comprehension. Novel interactions, experimental layouts, and trend-driven aesthetics are rejected in favor of instantly recognizable patterns.",
        },
        {
          title: "Generous Touch Targets",
          description:
            "All interactive elements have a minimum comfortable tap area of 44–48px. This includes buttons, icons, markers, toggles, and links. Small hit areas are treated as accessibility failures.",
        },
        {
          title: "Strong Visual Hierarchy",
          description:
            "Every screen communicates a clear reading order. Primary content is unmistakable. Supporting elements recede. Users never wonder 'what should I look at first?'",
        },
        {
          title: "Reduce Cognitive Load",
          description:
            "Limit choices per screen. Avoid multi-step decision trees. Present one idea per section. Progressive disclosure is preferred over dense layouts.",
        },
        {
          title: "Clear Feedback After Every Action",
          description:
            "Every tap, click, or gesture produces visible feedback — state changes, confirmation messages, or subtle animation. Silent interactions erode confidence.",
        },
        {
          title: "Readable at Arm's Length",
          description:
            "Body text should be legible at arm's length on a tablet or phone held naturally. Never rely on fine print, small icons, or dense information clusters to convey meaning.",
        },
      ],
    },
    {
      type: "text",
      heading: "Design Tone",
      body: "The guest interface should consistently feel:\n\n• Calm — no urgency, no pressure, no visual noise\n• Refined — premium materials, elegant spacing, considered typography\n• Editorial — like a travel magazine, not a software application\n• Trustworthy — predictable, consistent, reliable\n• Intuitive — self-teaching through constraints, never requiring a tutorial\n\nAvoid playful UI patterns, cluttered layouts, or anything that feels like a technology product rather than a curated experience.",
    },
    {
      type: "spec-table",
      heading: "Minimum Size & Contrast Rules",
      rows: [
        { label: "Tap target minimum", value: "44px × 44px", notes: "48px preferred for primary actions" },
        { label: "Body text minimum", value: "16px (1rem)", notes: "18px (Body Large) for primary guest content" },
        { label: "Icon minimum", value: "20px × 20px", notes: "24px preferred for map and navigation icons" },
        { label: "Text contrast ratio", value: "WCAG AA (4.5:1)", notes: "AAA (7:1) preferred for body text" },
        { label: "Icon contrast ratio", value: "3:1 minimum", notes: "Against background surface" },
        { label: "Touch spacing", value: "8px minimum between targets", notes: "Prevents accidental taps" },
        { label: "Label font size", value: "13px minimum", notes: "Never smaller for any UI label" },
      ],
    },
    {
      type: "do-dont",
      heading: "Guest Interface Rules",
      dos: [
        "Use Body Large (18px) for primary guest-facing content",
        "Ensure all buttons have minimum 44px height",
        "Provide visible state changes on every interaction",
        "Use sentence case for clarity in all labels",
        "Keep navigation patterns consistent across all screens",
        "Show one primary CTA per screen or card",
        "Use generous whitespace to separate interactive elements",
      ],
      donts: [
        "Never use tiny icons without text labels",
        "Never rely on hover states as the only feedback mechanism",
        "Never display dense information clusters on mobile",
        "Avoid low-contrast overlays on photography",
        "Never use animation that could cause disorientation",
        "Avoid requiring gestures beyond tap, swipe, and simple scroll",
        "Never hide critical functionality behind long-press or double-tap",
      ],
    },
    {
      type: "rule-list",
      heading: "Accessibility Baseline",
      variant: "neutral",
      items: [
        "All text meets WCAG AA contrast (4.5:1 minimum)",
        "Interactive elements have visible focus indicators",
        "Readable font sizes — 16px body minimum, 18px preferred for guest content",
        "No information conveyed by color alone — use shape, label, or pattern",
        "Animations respect prefers-reduced-motion",
        "Form inputs have persistent visible labels (never placeholder-only)",
        "Error messages appear inline next to the relevant field, not in toasts",
      ],
    },
    {
      type: "text",
      heading: "The Elegance Constraint",
      body: "These accessibility rules are non-negotiable, but they must be delivered with elegance. Generous whitespace, refined typography, restrained color, and editorial layouts ensure that accessibility and beauty are the same thing — not competing priorities.",
    },
  ],
};
