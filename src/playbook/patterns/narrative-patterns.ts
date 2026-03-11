import type { PlaybookPage } from "../types";

export const narrativePatterns: PlaybookPage = {
  section: "Patterns",
  page: "Narrative Patterns",
  slug: "patterns/narrative-patterns",
  description: "A graphic pattern for representing progression — use it for storytelling, explanations, journeys, and onboarding.",
  status: "complete",
  openQuestions: [],
  content: [
    {
      type: "text",
      heading: "Purpose",
      body: "Use the narrative path style when content has a clear sequence or flow. It turns abstract steps into a visible journey.",
    },
    {
      type: "principle-list",
      heading: "Use Cases",
      items: [
        { title: "Storytelling", description: "Layered narratives with a beginning, middle, and end." },
        { title: "Explanations", description: "Step-by-step breakdowns of a process or concept." },
        { title: "Journeys", description: "Physical or thematic routes through places or ideas." },
        { title: "Onboarding", description: "Guided first-run experiences that build confidence." },
      ],
    },
    {
      type: "principle-list",
      heading: "Graphic Principles",
      items: [
        { title: "Flowing path lines", description: "Use a single vertical or horizontal line to connect stops. The line represents progression — keep it thin (1px), using the border colour token." },
        { title: "Modular information", description: "Each stop on the path is a self-contained module. It can represent a concept, a place, or a step — but always one idea only." },
        { title: "Spacing & density", description: "Path stops use space-6 vertical rhythm between modules. Stop content padding uses space-4. Text stacks within a stop use space-3. Keep one idea per stop." },
      ],
    },
    {
      type: "do-dont",
      dos: [
        "Use numbered stops for sequential content",
        "Keep each stop to one idea, place, or step",
        "Use a thin connecting line (1px, border token)",
        "Apply consistent vertical rhythm (space-6)",
        "Use badges to categorise stop types",
      ],
      donts: [
        "Don't use decorative path shapes or curves",
        "Don't combine multiple ideas in one stop",
        "Don't animate the path line or stops",
        "Don't use colour-coded lines — keep it neutral",
        "Don't add icons to every stop — numbers suffice",
      ],
    },
  ],
};
