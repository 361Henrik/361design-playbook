import type { PlaybookPage } from "../types";

export const dataDisplayPlaybook: PlaybookPage = {
  section: "Components",
  page: "Data Display",
  slug: "components/data-display",
  description: "Tables, badges, stat blocks, separators, and list patterns.",
  status: "complete",
  openQuestions: [],
  content: [
    {
      type: "text",
      heading: "Purpose",
      body: "Data display components present structured information clearly. They use restrained styling — subtle borders instead of zebra stripes, Inter body text, and Playfair Display for metric values.",
    },
    {
      type: "component-spec",
      heading: "Data Display Components",
      components: [
        {
          name: "Badge",
          description: "Small label for status, category, or metadata. Uses rounded-full shape with subtle color fills.",
          dos: [
            "Use for status indicators, tags, and counts",
            "Keep text to 1-2 words maximum",
          ],
          donts: [
            "Don't use as interactive buttons — they're informational only",
            "Avoid using more than 3-4 badges in a row",
          ],
          code: `<Badge>Default</Badge>\n<Badge variant="secondary">Secondary</Badge>\n<Badge variant="outline">Outline</Badge>\n<Badge variant="destructive">Error</Badge>`,
        },
        {
          name: "Data Table",
          description: "Structured tabular data display. Uses Inter body text, subtle row borders, and restrained header styling.",
          accessibilityNotes: "Uses semantic <table> markup. Ensure column headers describe their data. Add caption for screen readers when context is needed.",
          responsiveNotes: "Wrap in a horizontal scroll container on mobile. Consider card-based layouts for narrow screens.",
          dos: [
            "Use for structured, comparable data",
            "Right-align numeric columns",
            "Keep rows scannable — limit to 4-6 columns",
          ],
          donts: [
            "Don't use for layout purposes",
            "Avoid zebra striping — use subtle borders instead",
            "Don't embed complex interactions inside table cells",
          ],
          code: `<Table>\n  <TableHeader>\n    <TableRow>\n      <TableHead>Token</TableHead>\n      <TableHead>Value</TableHead>\n      <TableHead className="text-right">Role</TableHead>\n    </TableRow>\n  </TableHeader>\n  <TableBody>\n    <TableRow>\n      <TableCell className="font-mono text-xs">--primary</TableCell>\n      <TableCell className="font-mono text-xs">215 51% 25%</TableCell>\n      <TableCell className="text-right">Interaction</TableCell>\n    </TableRow>\n  </TableBody>\n</Table>`,
        },
        {
          name: "Stat Block",
          description: "A compact card for displaying a key metric with label and optional trend indicator.",
          dos: [
            "Use Playfair Display for the metric value",
            "Keep the label concise — 2-3 words",
            "Group stat blocks in rows of 3-4",
          ],
          donts: [
            "Don't use for non-numeric data",
            "Avoid crowding too many stats — curate the most important ones",
          ],
          code: `<Card>\n  <CardContent className="p-4 text-center">\n    <p className="font-display text-2xl font-medium text-foreground">42</p>\n    <p className="text-xs font-body text-muted-foreground mt-1">Tokens</p>\n  </CardContent>\n</Card>`,
        },
        {
          name: "Separator",
          description: "A thin horizontal or vertical line that visually divides content sections.",
          dos: [
            "Use to separate logical groups of content",
            "Keep spacing consistent above and below",
          ],
          donts: [
            "Don't overuse — whitespace alone is often sufficient",
            "Avoid using as a decorative element",
          ],
          code: `<Separator />`,
        },
      ],
    },
  ],
};
