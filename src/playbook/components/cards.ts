import type { PlaybookPage } from "../types";

export const cardsPlaybook: PlaybookPage = {
  section: "Components",
  page: "Cards & Panels",
  slug: "components/cards",
  description: "Primary Context (white) and Anchor Context (green) panel variants including the signature panel pairing.",
  status: "complete",
  openQuestions: [],
  content: [
    {
      type: "text",
      heading: "Purpose",
      body: "Cards and panels are the primary content containers in The Curated Lens. The system uses two context types — Primary (white) and Anchor (green) — to create visual rhythm and hierarchy.",
    },
    {
      type: "component-spec",
      heading: "Card Variants",
      components: [
        {
          name: "Primary Context Card",
          description: "The default card variant — Warm Off-White background. Used for most content blocks, feature highlights, and informational panels.",
          anatomy: "Card > CardHeader (title + description) > CardContent > optional CardFooter.",
          accessibilityNotes: "Card is a generic <div>. Add role='region' and aria-label when the card represents a distinct landmark.",
          responsiveNotes: "Cards stack vertically on mobile. Use grid-cols-1 md:grid-cols-2 lg:grid-cols-3 for responsive grids.",
          dos: [
            "Use for content that lives on the Warm White page background",
            "Keep card content focused — one idea per card",
            "Use CardFooter for actions, not inline buttons in content",
          ],
          donts: [
            "Don't nest cards inside cards",
            "Avoid adding drop shadows beyond the default shadow-sm",
            "Don't use colored backgrounds — that's the Anchor Context card",
          ],
          code: `<Card>\n  <CardHeader>\n    <CardTitle>Feature Highlight</CardTitle>\n    <CardDescription>A brief description of this feature.</CardDescription>\n  </CardHeader>\n  <CardContent>\n    <p className="text-sm font-body text-muted-foreground leading-reading">\n      Content goes here.\n    </p>\n  </CardContent>\n  <CardFooter>\n    <Button variant="secondary" size="sm">\n      Learn More <ArrowRight className="h-3.5 w-3.5" />\n    </Button>\n  </CardFooter>\n</Card>`,
        },
        {
          name: "Anchor Context Panel",
          description: "A Deep Forest Green panel that provides visual weight and grounds sections. Used for hero areas, featured callouts, and section anchors.",
          anatomy: "A styled <div> with bg-primary and text-primary-foreground. May contain headings, body text, and CTAs.",
          accessibilityNotes: "Ensure all text meets WCAG AA contrast against the Forest Green background. Use primary-foreground tokens.",
          responsiveNotes: "Can be full-width on mobile. On desktop, pair side-by-side with a Primary Context card for the classic panel pairing.",
          dos: [
            "Use to anchor a section — it provides visual gravity",
            "Pair with a Primary Context card in a 50/50 or 60/40 split",
            "Use sparingly — one anchor panel per major section",
          ],
          donts: [
            "Never stack two anchor panels back-to-back",
            "Don't use for secondary content — it's too visually heavy",
            "Avoid placing complex forms inside anchor panels",
          ],
          code: `<div className="rounded-lg bg-primary text-primary-foreground p-6 space-y-3">\n  <h3 className="font-display text-lg font-medium tracking-headline leading-section">\n    Anchor Context\n  </h3>\n  <p className="text-sm font-body leading-reading opacity-85">\n    This panel grounds the page.\n  </p>\n  <Button variant="secondary" size="sm">\n    Explore <ArrowRight className="h-3.5 w-3.5" />\n  </Button>\n</div>`,
        },
        {
          name: "Panel Pairing",
          description: "The signature layout: a Primary Context (white) card paired side-by-side with an Anchor Context (green) panel. This creates the visual rhythm that defines the Curated Lens aesthetic.",
          anatomy: "A grid container with two children — one Primary Context card and one Anchor Context panel, typically in a 50/50 or 60/40 split.",
          accessibilityNotes: "Both panels should be independently readable. Don't rely on the pairing to convey meaning — each panel should stand alone.",
          responsiveNotes: "Stacks vertically on mobile (grid-cols-1). Side-by-side at md+ (grid-cols-2). The Anchor panel should come first in the stack.",
          dos: [
            "Use for hero sections and major feature introductions",
            "Keep one panel informational, the other action-oriented",
            "Maintain equal or near-equal visual weight between panels",
          ],
          donts: [
            "Don't use more than one panel pairing per page section",
            "Avoid mismatched content density between the two panels",
            "Never add a third panel to the pairing",
          ],
          code: `<div className="grid grid-cols-1 md:grid-cols-2 gap-4">\n  {/* Anchor Context */}\n  <div className="rounded-lg bg-primary text-primary-foreground p-6 space-y-3">\n    <h3 className="font-display text-lg font-medium tracking-headline">\n      Design with Purpose\n    </h3>\n    <p className="text-sm font-body leading-reading opacity-85">\n      Every decision should be intentional.\n    </p>\n    <Button variant="secondary" size="sm">Get Started</Button>\n  </div>\n\n  {/* Primary Context */}\n  <Card>\n    <CardHeader>\n      <CardTitle>What's Included</CardTitle>\n      <CardDescription>Everything you need to build on-brand.</CardDescription>\n    </CardHeader>\n    <CardContent>...</CardContent>\n  </Card>\n</div>`,
        },
      ],
    },
  ],
};
