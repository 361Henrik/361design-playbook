import type { PlaybookPage } from "../types";

export const navigationPlaybook: PlaybookPage = {
  section: "Components",
  page: "Navigation",
  slug: "components/navigation",
  description: "Tabs, breadcrumbs, and link patterns.",
  status: "complete",
  openQuestions: [
    "Should we define mobile navigation patterns (hamburger, bottom nav)?",
  ],
  content: [
    {
      type: "text",
      heading: "Purpose",
      body: "Navigation components help users orient themselves within the application. They use Inter body text with restrained styling to stay out of the way while remaining clear and accessible.",
    },
    {
      type: "component-spec",
      heading: "Navigation Components",
      components: [
        {
          name: "Tabs",
          description: "Horizontal tab navigation for switching between related views within the same page context.",
          accessibilityNotes: "Uses Radix Tabs with full keyboard navigation (Arrow keys, Home, End). Each tab panel is associated with its trigger.",
          dos: [
            "Use for 2-5 related views on the same page",
            "Keep tab labels to 1-2 words",
            "Show the most common view as the default tab",
          ],
          donts: [
            "Don't use for primary navigation — use the sidebar",
            "Avoid more than 5 tabs — consider a different pattern",
            "Don't nest tabs inside tabs",
          ],
          code: `<Tabs defaultValue="overview">\n  <TabsList>\n    <TabsTrigger value="overview">Overview</TabsTrigger>\n    <TabsTrigger value="usage">Usage</TabsTrigger>\n    <TabsTrigger value="code">Code</TabsTrigger>\n  </TabsList>\n  <TabsContent value="overview">...</TabsContent>\n  <TabsContent value="usage">...</TabsContent>\n  <TabsContent value="code">...</TabsContent>\n</Tabs>`,
        },
        {
          name: "Breadcrumb",
          description: "A horizontal trail showing the user's location in the hierarchy. Uses Inter body text with subtle separators.",
          dos: [
            "Use on detail pages where hierarchy context matters",
            "Make all but the last item clickable links",
            "Keep labels concise — mirror sidebar labels",
          ],
          donts: [
            "Don't use on top-level pages (Dashboard, etc.)",
            "Avoid more than 4 levels deep",
          ],
          code: `<nav className="flex items-center gap-1.5 text-sm font-body">\n  <a href="#" className="text-muted-foreground hover:text-foreground">\n    Components\n  </a>\n  <span className="text-muted-foreground/50">/</span>\n  <span className="text-foreground font-medium">Primary Button</span>\n</nav>`,
        },
      ],
    },
  ],
};
