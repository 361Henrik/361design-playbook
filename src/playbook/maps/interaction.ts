import type { PlaybookPage } from "../types";

export const interactionPlaybook: PlaybookPage = {
  section: "Maps",
  page: "Map Interaction",
  slug: "maps/interaction",
  description: "Guest-facing tap, pan, and zoom behavior. Every interaction must feel calm and intentional — the map responds, never reacts. Designed for users 50+ with generous targets and clear feedback.",
  status: "complete",
  openQuestions: [],
  content: [
    {
      type: "text",
      heading: "Audience: Guest Experience (B2C)",
      body: "This section defines map interaction behavior for the guest-facing experience. These rules govern how the map responds to touch input from travelers, many of whom are 50+ with varying levels of digital confidence.\n\nInteraction behavior is structural — it does not change per operator.",
    },
    {
      type: "text",
      heading: "Interaction Philosophy",
      body: "Map interactions must be immediately understandable to users who may have limited digital literacy or reduced motor precision. Every gesture produces clear, visible feedback. The map responds deliberately — it never reacts with bouncy, elastic, or surprising motion.\n\nAnimations should be subtle and slow enough to feel calm, never playful or attention-seeking.",
    },
    {
      type: "spec-table",
      heading: "Marker Behavior",
      rows: [
        { label: "Default state", value: "Minimal — white disk, black ring (2px), black icon. No label visible." },
        { label: "First tap", value: "Marker expands slightly (32→40px or 40→48px). Label appears below. Ring thickens to 2.5px." },
        { label: "Second tap (on expanded)", value: "Opens story/location card sliding up from bottom of screen." },
        { label: "Selected state", value: "Ring changes to 3px bronze (#C49A5C). Other markers dim slightly (opacity 0.6)." },
        { label: "Tap empty area", value: "Dismisses open card. Returns all markers to default state." },
        { label: "Animation", value: "300ms ease-out for all marker state transitions. Never bouncy or elastic." },
      ],
    },
    {
      type: "spec-table",
      heading: "Tap / Click Behavior",
      rows: [
        { label: "Tap POI marker", value: "First tap expands marker and shows label. Second tap opens information card. Marker enters selected state." },
        { label: "Tap landscape label", value: "No action. Labels are informational only — they do not open cards or trigger navigation." },
        { label: "Tap empty map area", value: "Dismisses any open information card. Returns all markers to default state." },
        { label: "Tap vessel marker", value: "Centers map on vessel and shows current position context (e.g., 'Approaching Flåm')." },
      ],
    },
    {
      type: "spec-table",
      heading: "Pan & Zoom",
      rows: [
        { label: "Pan", value: "Free panning within the scenic corridor. Cannot pan beyond corridor boundaries. Smooth deceleration." },
        { label: "Zoom", value: "2–3 discrete zoom levels only. Pinch-to-zoom with snapping. No free zoom — prevents accidental over-zoom." },
        { label: "Return to vessel", value: "After panning away, a 'Return to vessel' button appears (min 48px height). Tapping it smoothly animates back to the vessel position." },
      ],
    },
    {
      type: "text",
      heading: "Information Card",
      body: "When a guest taps an expanded marker, an information card slides up from the bottom of the map. The card contains: POI name (title, Playfair Display), category icon and label, short description (2–3 sentences max, Body Large 18px), distance from vessel (optional, in natural language: 'About 2 km away'), and 'Read more' link to full article (if available).\n\nThe card uses a 300ms ease-out slide animation. It dismisses on tap outside, swipe down, or tapping another marker. Card text must meet WCAG AA contrast requirements.",
    },
    {
      type: "rule-list",
      heading: "Interaction Constraints",
      variant: "dont",
      items: [
        "No double-tap to zoom — confusing for older users",
        "No long-press actions — not discoverable",
        "No gesture-based navigation (swipe to next POI)",
        "No hover tooltips (touch-first design)",
        "No clustering that requires tap-to-expand",
        "No bouncy or elastic animation on any map element",
        "No spring physics on marker transitions",
        "No interactions that require pinch precision",
      ],
    },
    {
      type: "do-dont",
      dos: [
        "Use 48px minimum touch targets for all interactive map elements",
        "Provide clear visual feedback on every tap (ring change, label appear, card slide)",
        "Keep marker expand/collapse animations at 300ms ease-out",
        "Show a persistent 'Return to vessel' button when panned away",
        "Make the information card dismissible by multiple methods (tap outside, swipe, back button)",
      ],
      donts: [
        "Never require complex gestures to access information",
        "Never hide critical information behind interactions that are hard to discover",
        "Never use small text in map information cards",
        "Never animate markers with bouncing, scaling, or elastic effects",
      ],
    },
  ],
};
