import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { ArrowRight, Download, ExternalLink, Eye, Heart, Mail, Search, Settings, Star, User } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface ComponentEntry {
  id: string;
  name: string;
  category: string;
  description: string;
  anatomy?: string;
  accessibilityNotes?: string;
  responsiveNotes?: string;
  dos: string[];
  donts: string[];
  preview: () => ReactNode;
  code: string;
}

export interface CategoryInfo {
  id: string;
  label: string;
  description: string;
  icon: string;
}

/* ------------------------------------------------------------------ */
/*  Categories                                                         */
/* ------------------------------------------------------------------ */

export const categories: CategoryInfo[] = [
  { id: "buttons", label: "Buttons & CTAs", description: "Primary, secondary, ghost, and text-link button variants.", icon: "🔘" },
  { id: "cards", label: "Cards & Panels", description: "Primary Context (white) and Anchor Context (green) panel variants.", icon: "🃏" },
  { id: "forms", label: "Forms", description: "Inputs, selects, textareas, checkboxes, and switches.", icon: "📝" },
  { id: "data-display", label: "Data Display", description: "Tables, badges, stat blocks, and lists.", icon: "📊" },
  { id: "layout", label: "Layout Sections", description: "Hero sections, content blocks, split layouts, and panel pairings.", icon: "📐" },
  { id: "navigation", label: "Navigation", description: "Tabs, breadcrumbs, and link patterns.", icon: "🧭" },
];

/* ------------------------------------------------------------------ */
/*  Registry                                                           */
/* ------------------------------------------------------------------ */

export const components: ComponentEntry[] = [
  /* ===== Buttons ===== */
  {
    id: "button-primary",
    name: "Primary Button",
    category: "buttons",
    description: "The main call-to-action. Uses Terracotta with cream text. No scaling or bouncing hover effects — opacity shift only.",
    anatomy: "A <button> element styled with the primary variant. Contains text and an optional trailing icon.",
    accessibilityNotes: "Uses native <button> semantics. Ensure visible focus ring (ring-ring). Disabled state reduces opacity to 50%.",
    responsiveNotes: "Full-width on mobile (w-full) when used as a page-level CTA. Inline at md+ breakpoints.",
    dos: [
      "Use for the single most important action on a page",
      "Pair with a secondary or ghost button for less prominent actions",
      "Keep label concise — 1-3 words",
    ],
    donts: [
      "Never use more than one primary button in the same section",
      "Do not add scale or bounce hover effects",
      "Avoid long, sentence-length labels",
    ],
    preview: () => (
      <div className="flex flex-wrap gap-3 items-center">
        <Button>Get Started</Button>
        <Button disabled>Disabled</Button>
        <Button>
          Download <Download className="h-4 w-4" />
        </Button>
      </div>
    ),
    code: `<Button>Get Started</Button>
<Button disabled>Disabled</Button>
<Button>Download <Download className="h-4 w-4" /></Button>`,
  },
  {
    id: "button-secondary",
    name: "Secondary Button",
    category: "buttons",
    description: "Used alongside primary buttons for supporting actions. Ivory background with marine blue text.",
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
    preview: () => (
      <div className="flex flex-wrap gap-3 items-center">
        <Button variant="secondary">Learn More</Button>
        <Button variant="outline">Cancel</Button>
        <Button variant="ghost">Skip</Button>
      </div>
    ),
    code: `<Button variant="secondary">Learn More</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">Skip</Button>`,
  },
  {
    id: "button-link",
    name: "Text Link Button",
    category: "buttons",
    description: "An inline text-link style button for tertiary actions. Underline on hover, no background shift.",
    dos: [
      "Use for inline navigation or 'learn more' links",
      "Keep within running text or at the end of a section",
    ],
    donts: [
      "Never use as the primary CTA",
      "Avoid pairing with an underline — the hover state adds it",
    ],
    preview: () => (
      <div className="flex flex-wrap gap-4 items-center">
        <Button variant="link">View documentation</Button>
        <Button variant="link">
          External link <ExternalLink className="h-3.5 w-3.5" />
        </Button>
      </div>
    ),
    code: `<Button variant="link">View documentation</Button>
<Button variant="link">External link <ExternalLink className="h-3.5 w-3.5" /></Button>`,
  },
  {
    id: "button-destructive",
    name: "Destructive Button",
    category: "buttons",
    description: "Reserved for irreversible or dangerous actions. Red-toned background that clearly signals caution.",
    dos: [
      "Use only for delete, remove, or irreversible actions",
      "Always pair with a confirmation dialog",
    ],
    donts: [
      "Never use for cancel or dismiss actions",
      "Don't place next to a primary button without clear visual separation",
    ],
    preview: () => (
      <div className="flex flex-wrap gap-3 items-center">
        <Button variant="destructive">Delete Account</Button>
        <Button variant="destructive" size="sm">Remove</Button>
      </div>
    ),
    code: `<Button variant="destructive">Delete Account</Button>
<Button variant="destructive" size="sm">Remove</Button>`,
  },
  {
    id: "button-sizes",
    name: "Button Sizes",
    category: "buttons",
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
    preview: () => (
      <div className="flex flex-wrap gap-3 items-end">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon"><Settings className="h-4 w-4" /></Button>
      </div>
    ),
    code: `<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Settings className="h-4 w-4" /></Button>`,
  },

  /* ===== Cards & Panels ===== */
  {
    id: "card-primary",
    name: "Primary Context Card",
    category: "cards",
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
    preview: () => (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-lg">Feature Highlight</CardTitle>
          <CardDescription>A brief description of this feature and why it matters.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm font-body text-muted-foreground leading-reading">
            Content goes here. Keep it concise and purposeful — every word should earn its place.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="secondary" size="sm">Learn More <ArrowRight className="h-3.5 w-3.5" /></Button>
        </CardFooter>
      </Card>
    ),
    code: `<Card>
  <CardHeader>
    <CardTitle>Feature Highlight</CardTitle>
    <CardDescription>A brief description of this feature.</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-sm font-body text-muted-foreground leading-reading">
      Content goes here.
    </p>
  </CardContent>
  <CardFooter>
    <Button variant="secondary" size="sm">
      Learn More <ArrowRight className="h-3.5 w-3.5" />
    </Button>
  </CardFooter>
</Card>`,
  },
  {
    id: "card-anchor",
    name: "Anchor Context Panel",
    category: "cards",
    description: "A Deep Marine Blue panel that provides visual weight and grounds sections. Used for hero areas, featured callouts, and section anchors.",
    anatomy: "A styled <div> with bg-primary and text-primary-foreground. May contain headings, body text, and CTAs.",
    accessibilityNotes: "Ensure all text meets WCAG AA contrast against the Marine Blue background. Use primary-foreground tokens.",
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
    preview: () => (
      <div className="w-full max-w-sm rounded-lg bg-primary text-primary-foreground p-6 space-y-3">
        <h3 className="font-display text-lg font-medium tracking-headline leading-section">
          Anchor Context
        </h3>
        <p className="text-sm font-body leading-reading text-primary-foreground/90">
          This panel grounds the page. It's the visual anchor — calm, confident, and purposeful.
        </p>
        <Button variant="secondary" size="sm" className="mt-2">
          Explore <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    ),
    code: `<div className="rounded-lg bg-primary text-primary-foreground p-6 space-y-3">
  <h3 className="font-display text-lg font-medium tracking-headline leading-section">
    Anchor Context
  </h3>
  <p className="text-sm font-body leading-reading text-primary-foreground/90">
    This panel grounds the page.
  </p>
  <Button variant="secondary" size="sm">
    Explore <ArrowRight className="h-3.5 w-3.5" />
  </Button>
</div>`,
  },
  {
    id: "panel-pairing",
    name: "Panel Pairing",
    category: "cards",
    description: "The signature layout: a Primary Context (ivory) card paired side-by-side with an Anchor Context (marine blue) panel. This creates the visual rhythm that defines the Curated Lens aesthetic.",
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
    preview: () => (
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg bg-primary text-primary-foreground p-6 space-y-3">
          <h3 className="font-display text-lg font-medium tracking-headline leading-section">
            Design with Purpose
          </h3>
          <p className="text-sm font-body leading-reading text-primary-foreground/90">
            Every decision should be intentional. The system provides the rails — you provide the vision.
          </p>
          <Button variant="secondary" size="sm">Get Started</Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">What's Included</CardTitle>
            <CardDescription>Everything you need to build on-brand.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-body text-muted-foreground">
              <Star className="h-3.5 w-3.5 text-accent" strokeWidth={1.5} /> Design tokens
            </div>
            <div className="flex items-center gap-2 text-sm font-body text-muted-foreground">
              <Star className="h-3.5 w-3.5 text-accent" strokeWidth={1.5} /> Component library
            </div>
            <div className="flex items-center gap-2 text-sm font-body text-muted-foreground">
              <Star className="h-3.5 w-3.5 text-accent" strokeWidth={1.5} /> Brand guardrails
            </div>
          </CardContent>
        </Card>
      </div>
    ),
    code: `<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* Anchor Context */}
  <div className="rounded-lg bg-primary text-primary-foreground p-6 space-y-3">
    <h3 className="font-display text-lg font-medium tracking-headline">
      Design with Purpose
    </h3>
    <p className="text-sm font-body leading-reading text-primary-foreground/90">
      Every decision should be intentional.
    </p>
    <Button variant="secondary" size="sm">Get Started</Button>
  </div>

  {/* Primary Context */}
  <Card>
    <CardHeader>
      <CardTitle>What's Included</CardTitle>
      <CardDescription>Everything you need to build on-brand.</CardDescription>
    </CardHeader>
    <CardContent>...</CardContent>
  </Card>
</div>`,
  },

  /* ===== Forms ===== */
  {
    id: "input-text",
    name: "Text Input",
    category: "forms",
    description: "Standard text input field. Uses Lexend at the body weight, with a subtle border and focus ring in marine blue.",
    accessibilityNotes: "Always pair with a <Label>. Use htmlFor to associate label with input. Placeholder text is not a substitute for labels.",
    dos: [
      "Always pair with a visible Label above the input",
      "Use placeholder text for format hints, not labels",
      "Use the appropriate input type (email, tel, url, etc.)",
    ],
    donts: [
      "Never rely on placeholder text as the only label",
      "Don't use custom border colors — use the border token",
      "Avoid inline validation before the user has finished typing",
    ],
    preview: () => (
      <div className="w-full max-w-sm space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="e.g. Jane Doe" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" placeholder="jane@example.com" />
        </div>
      </div>
    ),
    code: `<div className="space-y-2">
  <Label htmlFor="name">Full Name</Label>
  <Input id="name" placeholder="e.g. Jane Doe" />
</div>`,
  },
  {
    id: "input-textarea",
    name: "Textarea",
    category: "forms",
    description: "Multi-line text input. Follows the same typography and spacing rules as the text input.",
    dos: [
      "Set a reasonable min-height or rows count",
      "Use for freeform text: comments, descriptions, notes",
    ],
    donts: [
      "Don't use for single-line inputs — use Input instead",
      "Avoid auto-resizing that causes layout shifts",
    ],
    preview: () => (
      <div className="w-full max-w-sm space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" placeholder="Tell us about yourself..." rows={3} />
      </div>
    ),
    code: `<div className="space-y-2">
  <Label htmlFor="bio">Bio</Label>
  <Textarea id="bio" placeholder="Tell us about yourself..." rows={3} />
</div>`,
  },
  {
    id: "input-select",
    name: "Select",
    category: "forms",
    description: "Dropdown select component for choosing from a predefined list of options.",
    dos: [
      "Use for 4+ options — fewer options may work better as radio buttons",
      "Provide a meaningful placeholder/default option",
    ],
    donts: [
      "Don't use for binary choices — use a Switch instead",
      "Avoid deeply nested option groups",
    ],
    preview: () => (
      <div className="w-full max-w-sm space-y-2">
        <Label>Role</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="editor">Editor</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
      </div>
    ),
    code: `<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select a role" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="admin">Admin</SelectItem>
    <SelectItem value="editor">Editor</SelectItem>
    <SelectItem value="viewer">Viewer</SelectItem>
  </SelectContent>
</Select>`,
  },
  {
    id: "input-checkbox-switch",
    name: "Checkbox & Switch",
    category: "forms",
    description: "Binary toggle controls. Checkbox for opt-in acknowledgements, Switch for on/off settings.",
    dos: [
      "Use Checkbox for consent/agreement patterns",
      "Use Switch for instant-apply settings (no save button needed)",
    ],
    donts: [
      "Don't use a Switch when a save/submit action is required",
      "Avoid using checkboxes for navigation or filtering — use toggle buttons",
    ],
    preview: () => (
      <div className="w-full max-w-sm space-y-4">
        <div className="flex items-center gap-3">
          <Checkbox id="terms" />
          <Label htmlFor="terms" className="text-sm font-body">I agree to the terms</Label>
        </div>
        <div className="flex items-center gap-3">
          <Switch id="notifications" />
          <Label htmlFor="notifications" className="text-sm font-body">Enable notifications</Label>
        </div>
      </div>
    ),
    code: `<div className="flex items-center gap-3">
  <Checkbox id="terms" />
  <Label htmlFor="terms">I agree to the terms</Label>
</div>

<div className="flex items-center gap-3">
  <Switch id="notifications" />
  <Label htmlFor="notifications">Enable notifications</Label>
</div>`,
  },

  /* ===== Data Display ===== */
  {
    id: "badge",
    name: "Badge",
    category: "data-display",
    description: "Small label for status, category, or metadata. Uses rounded-full shape with subtle color fills.",
    dos: [
      "Use for status indicators, tags, and counts",
      "Keep text to 1-2 words maximum",
    ],
    donts: [
      "Don't use as interactive buttons — they're informational only",
      "Avoid using more than 3-4 badges in a row",
    ],
    preview: () => (
      <div className="flex flex-wrap gap-2">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="bronze">Bronze</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Error</Badge>
      </div>
    ),
    code: `<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="bronze">Bronze</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Error</Badge>`,
  },
  {
    id: "data-table",
    name: "Data Table",
    category: "data-display",
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
    preview: () => (
      <div className="w-full max-w-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Token</TableHead>
              <TableHead>Value</TableHead>
              <TableHead className="text-right">Usage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-mono text-xs">--primary</TableCell>
              <TableCell className="font-mono text-xs">103 53% 23%</TableCell>
              <TableCell className="text-right">30%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono text-xs">--background</TableCell>
              <TableCell className="font-mono text-xs">40 33% 97%</TableCell>
              <TableCell className="text-right">60%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono text-xs">--accent</TableCell>
              <TableCell className="font-mono text-xs">36 42% 56%</TableCell>
              <TableCell className="text-right">8%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    ),
    code: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Token</TableHead>
      <TableHead>Value</TableHead>
      <TableHead className="text-right">Usage</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-mono text-xs">--primary</TableCell>
      <TableCell className="font-mono text-xs">103 53% 23%</TableCell>
      <TableCell className="text-right">30%</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
  },
  {
    id: "stat-block",
    name: "Stat Block",
    category: "data-display",
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
    preview: () => (
      <div className="grid grid-cols-3 gap-4 w-full max-w-lg">
        {[
          { label: "Tokens", value: "42", trend: "+3" },
          { label: "Components", value: "18", trend: "+2" },
          { label: "Guardrails", value: "12", trend: "0" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 text-center">
              <p className="font-display text-2xl font-medium text-foreground">{stat.value}</p>
              <p className="text-xs font-body text-muted-foreground mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    ),
    code: `<Card>
  <CardContent className="p-4 text-center">
    <p className="font-display text-2xl font-medium text-foreground">42</p>
    <p className="text-xs font-body text-muted-foreground mt-1">Tokens</p>
  </CardContent>
</Card>`,
  },
  {
    id: "separator",
    name: "Separator",
    category: "data-display",
    description: "A thin horizontal or vertical line that visually divides content sections.",
    dos: [
      "Use to separate logical groups of content",
      "Keep spacing consistent above and below",
    ],
    donts: [
      "Don't overuse — whitespace alone is often sufficient",
      "Avoid using as a decorative element",
    ],
    preview: () => (
      <div className="w-full max-w-sm space-y-4">
        <p className="text-sm font-body text-foreground">Section One</p>
        <Separator />
        <p className="text-sm font-body text-foreground">Section Two</p>
        <Separator />
        <p className="text-sm font-body text-foreground">Section Three</p>
      </div>
    ),
    code: `<Separator />`,
  },

  /* ===== Layout ===== */
  {
    id: "hero-section",
    name: "Hero Section",
    category: "layout",
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
    preview: () => (
      <div className="w-full pt-16 pb-10 space-y-4">
        <h1 className="font-display text-3xl md:text-4xl font-medium tracking-headline leading-hero text-foreground">
          Design, Curated
        </h1>
        <p className="font-body text-base leading-reading text-muted-foreground max-w-prose">
          A complete design system built on restraint, purpose, and quiet confidence. Every token, component, and guideline exists to serve your brand — nothing more, nothing less.
        </p>
        <Button className="mt-2">Explore the System</Button>
      </div>
    ),
    code: `<section className="pt-section-top pb-10 space-y-4">
  <h1 className="font-display text-4xl font-medium tracking-headline leading-hero">
    Design, Curated
  </h1>
  <p className="font-body text-base leading-reading text-muted-foreground max-w-prose">
    A complete design system built on restraint and purpose.
  </p>
  <Button>Explore the System</Button>
</section>`,
  },
  {
    id: "content-block",
    name: "Content Block",
    category: "layout",
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
    preview: () => (
      <div className="w-full space-y-6">
        <h2 className="font-display text-xl font-medium tracking-headline leading-section text-foreground">
          Our Approach
        </h2>
        <p className="font-body text-sm leading-reading text-muted-foreground max-w-prose">
          We believe in systems that empower rather than constrain. Every design decision in Curated Lens has been made with intention — from the restrained color palette to the precise typographic scale.
        </p>
        <p className="font-body text-sm leading-reading text-muted-foreground max-w-prose">
          The result is a framework that feels effortless to use while maintaining rigorous brand consistency across every touchpoint.
        </p>
      </div>
    ),
    code: `<section className="space-y-headline-gap">
  <h2 className="font-display text-xl font-medium tracking-headline leading-section">
    Our Approach
  </h2>
  <p className="font-body text-sm leading-reading text-muted-foreground max-w-prose">
    Content here...
  </p>
</section>`,
  },
  {
    id: "split-layout",
    name: "Split Layout",
    category: "layout",
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
    preview: () => (
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-3">
          <h3 className="font-display text-lg font-medium tracking-headline leading-section text-foreground">
            Built for Teams
          </h3>
          <p className="font-body text-sm leading-reading text-muted-foreground">
            Share tokens, components, and guidelines across your entire organization. Everyone stays aligned.
          </p>
        </div>
        <div className="bg-muted rounded-lg p-8 flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="flex justify-center gap-2">
              <User className="h-8 w-8 text-muted-foreground/50" strokeWidth={1.5} />
              <User className="h-8 w-8 text-muted-foreground/50" strokeWidth={1.5} />
              <User className="h-8 w-8 text-muted-foreground/50" strokeWidth={1.5} />
            </div>
            <p className="text-xs font-body text-muted-foreground">Team Collaboration</p>
          </div>
        </div>
      </div>
    ),
    code: `<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
  <div className="space-y-3">
    <h3 className="font-display text-lg font-medium tracking-headline">
      Built for Teams
    </h3>
    <p className="font-body text-sm leading-reading text-muted-foreground">
      Content here...
    </p>
  </div>
  <div className="bg-muted rounded-lg p-8">
    {/* Visual content */}
  </div>
</div>`,
  },

  /* ===== Navigation ===== */
  {
    id: "tabs-nav",
    name: "Tabs",
    category: "navigation",
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
    preview: () => (
      <Tabs defaultValue="overview" className="w-full max-w-md">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="p-4">
          <p className="text-sm font-body text-muted-foreground">Overview content goes here.</p>
        </TabsContent>
        <TabsContent value="usage" className="p-4">
          <p className="text-sm font-body text-muted-foreground">Usage guidelines go here.</p>
        </TabsContent>
        <TabsContent value="code" className="p-4">
          <p className="text-sm font-body text-muted-foreground">Code examples go here.</p>
        </TabsContent>
      </Tabs>
    ),
    code: `<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="usage">Usage</TabsTrigger>
    <TabsTrigger value="code">Code</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">...</TabsContent>
  <TabsContent value="usage">...</TabsContent>
  <TabsContent value="code">...</TabsContent>
</Tabs>`,
  },
  {
    id: "breadcrumb-nav",
    name: "Breadcrumb",
    category: "navigation",
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
    preview: () => (
      <nav className="flex items-center gap-1.5 text-sm font-body">
        <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Components</a>
        <span className="text-muted-foreground/50">/</span>
        <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Buttons</a>
        <span className="text-muted-foreground/50">/</span>
        <span className="text-foreground font-medium">Primary Button</span>
      </nav>
    ),
    code: `<nav className="flex items-center gap-1.5 text-sm font-body">
  <a href="#" className="text-muted-foreground hover:text-foreground">
    Components
  </a>
  <span className="text-muted-foreground/50">/</span>
  <span className="text-foreground font-medium">Primary Button</span>
</nav>`,
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

export function getComponentsByCategory(categoryId: string) {
  return components.filter((c) => c.category === categoryId);
}

export function getComponentById(id: string) {
  return components.find((c) => c.id === id);
}

export function getCategoryById(id: string) {
  return categories.find((c) => c.id === id);
}

