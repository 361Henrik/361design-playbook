import type { PlaybookPage } from "../types";

export const imageSystemPlaybook: PlaybookPage = {
  section: "Principles",
  page: "Image System",
  slug: "principles/image-system",
  description:
    "A three-layered image philosophy: Hero (Emotion & Place), Experience (Human Presence), and Product in Use.",
  status: "complete",
  openQuestions: [],
  content: [
    {
      type: "text",
      heading: "Core Principle",
      body: "Capture real travel moments in real places, where the landscape is the hero and the product is a natural extension of the experience — never dominating it.\n\nThe visual tone should feel calm, cinematic, elegant, and observational. Nothing staged, nothing loud.",
    },

    /* ---- Layer 1 ---- */
    {
      type: "text",
      heading: "Layer 1 — Hero (Emotion & Place)",
      body: "Use wide, cinematic compositions that establish place and atmosphere before human activity enters the frame.\n\n**Guidelines**\n- Show real, recognizable locations such as Geirangerfjord, Lake Thun, or the Wachau Valley\n- Prioritize landscape over people\n- Use no people or only minimal human presence\n- Favor soft natural light, especially golden hour, early morning, or late afternoon\n- Aim for a feeling of quiet anticipation: a place before it becomes a story",
    },
    {
      type: "rule-list",
      heading: "Hero — Example Prompts",
      variant: "neutral",
      items: [
        '"Wide cinematic view of Geirangerfjord at sunrise, soft mist, no people, natural colors, high-end travel photography"',
        '"Rolling vineyard landscape in Wachau Valley, golden hour, layered depth, calm atmosphere"',
      ],
    },

    /* ---- Layer 2 ---- */
    {
      type: "text",
      heading: "Layer 2 — Experience (Human Presence)",
      body: "Introduce people in a restrained, natural way so the image suggests experience without becoming lifestyle advertising.\n\n**Guidelines**\n- People should feel present but understated\n- Show them from behind or in profile rather than facing the camera\n- Avoid posed, performative, or fashion-led imagery\n- Use neutral, timeless wardrobe with no visible branding\n- Make the travel mode clear through context",
    },
    {
      type: "principle-list",
      heading: "Mode-Specific Direction",
      items: [
        {
          title: "Train",
          description:
            "Long-distance views, depth, anticipation, looking outward through panoramic windows.",
        },
        {
          title: "Fjord Cruise",
          description:
            "Dramatic scale, open deck, vertical landscapes, powerful nature.",
        },
        {
          title: "River Cruise",
          description:
            "Intimacy, cultural proximity, villages, vineyards, layered human landscape.",
        },
      ],
    },
    {
      type: "rule-list",
      heading: "Experience — Example Prompts",
      variant: "neutral",
      items: [
        '"Passenger seated by panoramic train window looking at distant alpine lake and mountains, soft light, cinematic realism"',
        '"Couple standing on fjord cruise deck, vast Norwegian mountains, quiet moment, natural colors"',
        '"Traveler leaning on river cruise railing, vineyard valley and small village nearby, warm evening light"',
      ],
    },

    /* ---- Layer 3 ---- */
    {
      type: "text",
      heading: "Layer 3 — Product in Use (Curated Lens Visible)",
      body: "Show the product as a subtle part of the journey, never the main subject.\n\n**Guidelines**\n- Integrate the phone naturally into the scene\n- Keep the device present but visually understated\n- Show either a calm glance at the screen or the device resting alongside the environment\n- The landscape or experience must always remain the dominant visual element",
    },

    /* ---- Do / Don't ---- */
    {
      type: "do-dont",
      heading: "Image System — Do's & Don'ts",
      dos: [
        "Use real, recognizable travel locations",
        "Favor soft, natural light (golden hour, early morning)",
        "Keep people understated — from behind or in profile",
        "Show the product as a subtle, natural part of the scene",
        "Prioritize cinematic compositions with landscape as hero",
      ],
      donts: [
        "Use staged corporate stock imagery",
        "Show posed, performative, or fashion-led shots",
        "Let the device dominate the composition",
        "Use low-contrast overlays that compromise text readability",
        "Include recognizable operator assets unless approved",
        "Use overly saturated or artificially enhanced color grading",
      ],
    },
  ],
};
