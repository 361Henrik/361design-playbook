import type { PlaybookPage } from "../types";

export const buttonsPlaybook: PlaybookPage = {
  section: "Components",
  page: "Buttons & CTAs",
  slug: "components/buttons",
  description: "Primary, secondary, ghost, destructive, and text-link button variants with sizing rules.",
  status: "complete",
  openQuestions: [],
  content: [
    {
      type: "text",
      heading: "Purpose",
      body: "Buttons are the primary interactive elements for triggering actions. The Curated Lens uses a restrained set of button variants — each with a clear role — to maintain visual calm and intentional hierarchy.",
    },
    {
      type: "component-spec",
      heading: "Button Variants",
      components: [
        {
          name: "Primary Button",
          description: "The main call-to-action. Uses Terracotta with cream text. No scaling or bouncing hover effects — opacity shift only.",
          anatomy: "A <button> element styled with the primary variant. Contains text and an optional trailing icon.",
          accessibilityNotes: "Uses native <button> semantics. Ensure visible focus ring (ring-ring). Disabled state reduces opacity to 50%.",
          responsiveNotes: "Full-width on mobile (w-full) when used as a page-level CTA. Inline at md+ breakpoints. Minimum height 44px (48px preferred for guest-facing CTAs).",
          dos: [
            "Use for the single most important action on a page",
            "Pair with a secondary or ghost button for less prominent actions",
            "Keep label concise — 1-3 words",
            "Ensure minimum 44px height for tap accessibility",
            "Provide clear visual feedback on tap (opacity shift, not scale)",
          ],
          donts: [
            "Never use more than one primary button in the same section",
            "Do not add scale or bounce hover effects",
            "Avoid long, sentence-length labels",
            "Never make buttons smaller than 44px tap target",
          ],
          code: `<Button>Get Started</Button>\n<Button disabled>Disabled</Button>\n<Button>Download <Download className="h-4 w-4" /></Button>`,
        },
        {
          name: "Secondary Button",
          description: "Used alongside primary buttons for supporting actions. Stone background with deep charcoal text.",
          anatomy: "Same structure as Primary Button but with variant='secondary'.",
          accessibilityNotes: "Same focus and disabled behavior as Primary. Ensure sufficient contrast on both light and dark backgrounds.",
          responsiveNotes: "Follows the same sizing rules as Primary Button.",
          dos: [
            "Use for secondary actions alongside a primary CTA",
            "Use for filters, toggles, or less prominent interactions",
          ],
          donts: [
            "Don't use when there's no primary button to pair with",
            "Avoid using for destructive actions — use destructive variant instead",
          ],
          code: `<Button variant="secondary">Learn More</Button>\n<Button variant="outline">Cancel</Button>\n<Button variant="ghost">Skip</Button>`,
        },
        {
          name: "Text Link Button",
          description: "An inline text-link style button for tertiary actions. Underline on hover, no background shift.",
          dos: [
            "Use for inline navigation or 'learn more' links",
            "Keep within running text or at the end of a section",
          ],
          donts: [
            "Never use as the primary CTA",
            "Avoid pairing with an underline — the hover state adds it",
          ],
          code: `<Button variant="link">View documentation</Button>\n<Button variant="link">External link <ExternalLink className="h-3.5 w-3.5" /></Button>`,
        },
        {
          name: "Destructive Button",
          description: "Reserved for irreversible or dangerous actions. Red-toned background that clearly signals caution.",
          dos: [
            "Use only for delete, remove, or irreversible actions",
            "Always pair with a confirmation dialog",
          ],
          donts: [
            "Never use for cancel or dismiss actions",
            "Don't place next to a primary button without clear visual separation",
          ],
          code: `<Button variant="destructive">Delete Account</Button>\n<Button variant="destructive" size="sm">Remove</Button>`,
        },
        {
          name: "Button Sizes",
          description: "Three size tiers: sm for inline/compact contexts, default for standard use, lg for hero-level CTAs.",
          dos: [
            "Use sm for table rows, toolbars, or dense UI",
            "Use default for most form and page actions",
            "Use lg for hero sections or landing page CTAs",
          ],
          donts: [
            "Don't mix sizes within the same button group",
            "Avoid lg in compact layouts like sidebars or modals",
          ],
          code: `<Button size="sm">Small</Button>\n<Button size="default">Default</Button>\n<Button size="lg">Large</Button>\n<Button size="icon"><Settings className="h-4 w-4" /></Button>`,
        },
      ],
    },
  ],
};
