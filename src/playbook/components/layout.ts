import type { PlaybookPage } from "../types";

export const layoutComponentsPlaybook: PlaybookPage = {
  section: "Components",
  page: "Layout Sections",
  slug: "components/layout",
  description: "Hero sections, content blocks, split layouts, and panel pairings.",
  status: "complete",
  openQuestions: [
    "Should we define a maximum number of content blocks per page?",
  ],
  content: [
    {
      type: "text",
      heading: "Purpose",
      body: "Layout components define the structural rhythm of pages. They control spacing, width constraints, and visual hierarchy through consistent padding and typographic scale.",
    },
    {
      type: "component-spec",
      heading: "Layout Components",
      components: [
        {
          name: "Hero Section",
          description: "A full-width introductory block with generous top padding (120-160px), a Playfair Display headline, and a supporting paragraph capped at max-w-prose.",
          responsiveNotes: "Top padding reduces on mobile. Headline font size steps down from text-4xl to text-2xl.",
          dos: [
            "Use 120-160px top padding for breathing room",
            "Cap body text at max-w-prose (52ch)",
            "Keep to one headline and one paragraph",
          ],
          donts: [
            "Don't add background images or gradients",
            "Avoid multiple CTAs in the hero",
            "Never skip the top padding — it defines the rhythm",
          ],
          code: `<section className="pt-section-top pb-10 space-y-4">\n  <h1 className="font-display text-4xl font-medium tracking-headline leading-hero">\n    Design, Curated\n  </h1>\n  <p className="font-body text-base leading-reading text-muted-foreground max-w-prose">\n    A complete design system built on restraint and purpose.\n  </p>\n  <Button>Explore the System</Button>\n</section>`,
        },
        {
          name: "Content Block",
          description: "A standard content section with a section headline, body text, and consistent vertical spacing (section-gap between blocks).",
          dos: [
            "Use section-gap (72px) between content blocks",
            "Use headline-gap (40px) between heading and body",
            "Cap paragraph width at max-w-prose",
          ],
          donts: [
            "Don't use full-width paragraphs — always constrain width",
            "Avoid stacking more than 3 paragraphs without a visual break",
          ],
          code: `<section className="space-y-headline-gap">\n  <h2 className="font-display text-xl font-medium tracking-headline leading-section">\n    Our Approach\n  </h2>\n  <p className="font-body text-sm leading-reading text-muted-foreground max-w-prose">\n    Content here...\n  </p>\n</section>`,
        },
        {
          name: "Split Layout",
          description: "A two-column layout for pairing text with media, stats with details, or any complementary content.",
          responsiveNotes: "Stacks to single column on mobile. Use gap-section-gap for vertical spacing when stacked.",
          dos: [
            "Use for content + visual pairings",
            "Keep both sides visually balanced",
            "Use gap-8 or gap-12 between columns",
          ],
          donts: [
            "Don't use for more than 2 columns at this level",
            "Avoid drastically different content heights between sides",
          ],
          code: `<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">\n  <div className="space-y-3">\n    <h3 className="font-display text-lg font-medium tracking-headline">\n      Built for Teams\n    </h3>\n    <p className="font-body text-sm leading-reading text-muted-foreground">\n      Content here...\n    </p>\n  </div>\n  <div className="bg-muted rounded-lg p-8">\n    {/* Visual content */}\n  </div>\n</div>`,
        },
      ],
    },
  ],
};
