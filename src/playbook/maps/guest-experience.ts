import type { PlaybookPage } from "../types";

export const guestExperiencePlaybook: PlaybookPage = {
  section: "Maps",
  page: "Guest Experience (65–85)",
  slug: "maps/guest-experience",
  description: "The primary map audience is cruise guests aged 65–85. Every design decision must prioritize clarity, comfort, and confidence for this demographic.",
  status: "complete",
  openQuestions: [],
  content: [
    {
      type: "text",
      heading: "Core Principle",
      body: "If a guest needs to ask how to use the map, the map has failed. The interface must be immediately obvious, forgiving of imprecise gestures, and readable without glasses in good lighting conditions.",
    },
    {
      type: "spec-table",
      heading: "Touch Targets",
      rows: [
        { label: "Minimum tap target", value: "48 × 48px (Apple HIG minimum) — we use 52 × 52px" },
        { label: "Marker hit area", value: "Visual marker is 24–28px · Hit area extends to 52px invisible radius" },
        { label: "Spacing between targets", value: "Minimum 12px between tap targets · Prevents mis-taps" },
      ],
    },
    {
      type: "spec-table",
      heading: "Typography for Readability",
      rows: [
        { label: "Minimum map label size", value: "10px rendered — never smaller, even for minor features" },
        { label: "Information card text", value: "16px body · 20px title · 1.5 line-height minimum" },
        { label: "Contrast ratio", value: "WCAG AA minimum (4.5:1) for all text · AAA preferred (7:1) for body text" },
      ],
    },
    {
      type: "rule-list",
      heading: "Simplified Interaction Model",
      variant: "neutral",
      items: [
        "Single-tap only — no double-tap, long-press, or multi-finger gestures required",
        "Pinch-to-zoom snaps to discrete levels — prevents 'lost in zoom' state",
        "'Return to vessel' button is always one tap away",
        "Information cards have a visible close button (not just swipe-to-dismiss)",
        "Filter toggles are large, labeled pills — not small icons",
        "No tutorial needed — the map teaches itself through constraints",
      ],
    },
    {
      type: "text",
      heading: "Error Tolerance",
      body: "Older guests often tap imprecisely. The map must be forgiving: expanded hit areas, no destructive actions, easy undo of any state change, and a single 'reset' gesture that returns everything to default.",
    },
    {
      type: "do-dont",
      dos: [
        "Use large, high-contrast text for all map labels.",
        "Provide a visible 'Return to vessel' button at all times.",
        "Snap zoom to discrete levels to prevent disorientation.",
        "Use expanded hit areas (52px) for all tappable elements.",
        "Keep information cards short — 2–3 sentences maximum.",
      ],
      donts: [
        "No gestures beyond single-tap and simple pinch-to-zoom.",
        "No small or low-contrast labels anywhere on the map.",
        "No hidden interactions (long-press, double-tap, swipe).",
        "No animated or auto-advancing content on the map.",
        "No clustered markers that require tap-to-expand.",
      ],
    },
  ],
};
