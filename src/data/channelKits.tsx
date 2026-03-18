/* ------------------------------------------------------------------ */
/*  Channel Kits — Hardcoded MVP definitions + template render fns     */
/* ------------------------------------------------------------------ */

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, BarChart3, Users, TrendingUp, ArrowRight, Layers, Eye, Shield } from "lucide-react";

/* ---- Types ---- */

export interface TemplateEntry {
  id: string;
  name: string;
  description: string;
  component: () => ReactNode;
  code: string;
  layoutSpec: string;
  copySpec: string;
}

export interface ChannelKit {
  id: string;
  name: string;
  description: string;
  toneModifiers: string[];
  maxHeadingLength: number;
  maxBodyLength: number | null;
  ctaRules: string;
  allowedComponents: string[];
  typographyOverrides: {
    maxHeadlineSize: string;
    bodySize: string;
  };
  spacingProfile: "compact" | "standard" | "generous";
  colorEmphasis: string;
  templates: TemplateEntry[];
}

/* ---- Constraint badges (shown in the constraint bar) ---- */

export function getConstraintBadges(kit: ChannelKit) {
  return [
    { label: "Heading", value: `${kit.maxHeadingLength} chars` },
    { label: "Body", value: kit.maxBodyLength ? `${kit.maxBodyLength} chars` : "No limit" },
    { label: "CTA", value: kit.ctaRules },
    { label: "Tone", value: kit.toneModifiers.join(", ") },
    { label: "Headline", value: kit.typographyOverrides.maxHeadlineSize },
    { label: "Spacing", value: kit.spacingProfile },
  ];
}

/* ================================================================== */
/*  TEMPLATES                                                          */
/* ================================================================== */

/* ---- 1. Web App Dashboard ---- */

const WebAppDashboardTemplate = () => (
  <div className="bg-background p-6 space-y-6">
    {/* Top bar hint */}
    <div className="flex items-center justify-between">
      <h1 className="font-display text-xl font-medium tracking-headline text-foreground">
        Overview
      </h1>
      <Button size="sm">Create report</Button>
    </div>

    {/* Stat cards */}
    <div className="grid grid-cols-3 gap-4">
      {[
        { label: "Active users", value: "2,847", icon: Users, change: "+12%" },
        { label: "Engagement rate", value: "68.3%", icon: BarChart3, change: "+4.2%" },
        { label: "Growth", value: "23.1%", icon: TrendingUp, change: "+8.7%" },
      ].map((stat) => (
        <Card key={stat.label}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="font-body text-xs">{stat.label}</CardDescription>
              <stat.icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-display text-2xl font-medium tracking-headline">{stat.value}</p>
            <p className="text-xs font-body text-accent mt-1">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>

    {/* Table hint */}
    <Card>
      <CardHeader>
        <CardTitle className="font-display text-base font-medium">Recent activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {[
            { action: "Token updated", detail: "Primary color adjusted", time: "2 min ago" },
            { action: "Component added", detail: "Navigation breadcrumb", time: "1 hr ago" },
            { action: "Review completed", detail: "Landing page audit", time: "3 hr ago" },
          ].map((row) => (
            <div key={row.action} className="flex items-center justify-between px-6 py-3">
              <div>
                <p className="text-sm font-body font-medium text-foreground">{row.action}</p>
                <p className="text-xs font-body text-muted-foreground">{row.detail}</p>
              </div>
              <span className="text-xs font-body text-muted-foreground">{row.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>

    {/* Button pair */}
    <div className="flex gap-3">
      <Button>View all activity</Button>
      <Button variant="outline">Export data</Button>
    </div>
  </div>
);

/* ---- 2. Landing Hero ---- */

const LandingHeroTemplate = () => (
  <div className="bg-background">
    {/* Hero section */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10">
      <div className="rounded-lg bg-primary text-primary-foreground p-8 space-y-4 flex flex-col justify-center">
        <h1 className="font-display text-4xl font-medium tracking-headline leading-hero">
          Design with purpose
        </h1>
        <p className="text-sm font-body leading-reading text-primary-foreground/90 max-w-prose">
          Every decision should be intentional. A system that provides the rails without prescribing the destination.
        </p>
        <div className="flex gap-3 pt-2">
          <Button variant="secondary">Get started</Button>
          <Button variant="ghost" className="text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10">
            View docs
          </Button>
        </div>
      </div>
      <Card className="flex flex-col justify-center p-8">
        <div className="space-y-4">
          {[
            { icon: Layers, title: "Structured tokens", desc: "Colors, type, and spacing as a coherent system" },
            { icon: Eye, title: "Visual guardrails", desc: "Automated checks against brand rules" },
            { icon: Shield, title: "Voice consistency", desc: "Copy patterns that match the tone" },
          ].map((feature) => (
            <div key={feature.title} className="flex gap-3">
              <div className="h-8 w-8 rounded-md bg-secondary flex items-center justify-center shrink-0">
                <feature.icon className="h-4 w-4 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-body font-medium text-foreground">{feature.title}</p>
                <p className="text-xs font-body text-muted-foreground">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </div>
);

/* ---- 3. Landing Pricing ---- */

const LandingPricingTemplate = () => (
  <div className="bg-background p-10 space-y-8">
    <div className="text-center space-y-2">
      <h2 className="font-display text-4xl font-medium tracking-headline leading-hero text-foreground">
        Choose your path
      </h2>
      <p className="font-body text-base text-muted-foreground max-w-prose mx-auto">
        Each tier unlocks more of the system. Start where it makes sense.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        {
          name: "Foundation",
          price: "Free",
          desc: "Core tokens and guidelines",
          cta: "Explore",
          features: ["Color palette", "Typography scale", "Spacing tokens", "Voice pillars"],
          highlighted: false,
        },
        {
          name: "Professional",
          price: "$49/mo",
          desc: "Full system with guardrails",
          cta: "Get started",
          features: ["Everything in Foundation", "Component library", "Guardrail engine", "Channel kits", "Export tools"],
          highlighted: true,
        },
        {
          name: "Enterprise",
          price: "Custom",
          desc: "Dedicated support and training",
          cta: "Contact us",
          features: ["Everything in Professional", "Custom integrations", "Dedicated onboarding", "Priority support"],
          highlighted: false,
        },
      ].map((tier) => (
        <Card key={tier.name} className={tier.highlighted ? "border-primary ring-1 ring-primary" : ""}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle className="font-display text-lg font-medium">{tier.name}</CardTitle>
              {tier.highlighted && <Badge>Recommended</Badge>}
            </div>
            <CardDescription className="font-body text-xs">{tier.desc}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-display text-3xl font-medium tracking-headline">{tier.price}</p>
            <Separator />
            <ul className="space-y-2">
              {tier.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm font-body text-foreground">
                  <Check className="h-3.5 w-3.5 text-primary shrink-0" strokeWidth={2} />
                  {f}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant={tier.highlighted ? "default" : "outline"}>
              {tier.cta}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  </div>
);

/* ---- 4. Social Post ---- */

const SocialPostTemplate = () => (
  <div className="flex items-center justify-center p-8 bg-muted">
    <div className="w-[400px] h-[400px] rounded-lg bg-primary text-primary-foreground p-8 flex flex-col justify-between overflow-hidden">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <Layers className="h-4 w-4" strokeWidth={1.5} />
          </div>
          <span className="text-xs font-body opacity-70">Curated Lens</span>
        </div>
        <h2 className="font-display text-2xl font-medium tracking-headline leading-section">
          Consistency is a design decision, not an accident
        </h2>
        <p className="text-sm font-body leading-reading text-primary-foreground/90">
          When every token traces back to a single source of truth, your team moves faster and your product feels intentional.
        </p>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-primary-foreground/20">
        <span className="text-xs font-body opacity-60">Explore the system</span>
        <ArrowRight className="h-4 w-4 opacity-60" strokeWidth={1.5} />
      </div>
    </div>
  </div>
);

/* ---- 5. Email Header ---- */

const EmailHeaderTemplate = () => (
  <div className="flex justify-center p-8 bg-muted">
    <div className="w-[600px] bg-background rounded-lg overflow-hidden border border-border">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-8 py-6">
        <p className="text-xs font-body opacity-70 mb-1">Curated Lens</p>
        <h1 className="font-display text-xl font-medium tracking-headline">
          Your weekly design digest
        </h1>
      </div>

      {/* Hero image placeholder */}
      <div className="h-48 bg-secondary flex items-center justify-center">
        <div className="text-center space-y-2">
          <Layers className="h-8 w-8 text-primary mx-auto" strokeWidth={1.5} />
          <p className="text-xs font-body text-muted-foreground">Hero image area</p>
        </div>
      </div>

      {/* Body */}
      <div className="px-8 py-6 space-y-4">
        <p className="text-sm font-body leading-reading text-foreground">
          Three tokens were updated this week. Two new components passed guardrail review. Here is what changed and why it matters for your workflow.
        </p>
        <Button>View changes</Button>
      </div>

      {/* Footer */}
      <Separator />
      <div className="px-8 py-4">
        <p className="text-[11px] font-body text-muted-foreground leading-relaxed">
          You received this because you are subscribed to weekly digests. Manage your preferences in settings.
        </p>
      </div>
    </div>
  </div>
);

/* ---- 6. Email Transactional ---- */

const EmailTransactionalTemplate = () => (
  <div className="flex justify-center p-8 bg-muted">
    <div className="w-[600px] bg-background rounded-lg overflow-hidden border border-border">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-8 py-5">
        <p className="text-xs font-body opacity-70">Curated Lens</p>
      </div>

      {/* Content */}
      <div className="px-8 py-8 space-y-5">
        <h1 className="font-display text-xl font-medium tracking-headline text-foreground">
          Review approved
        </h1>
        <p className="text-sm font-body leading-reading text-foreground">
          The design review for "Landing page hero section" has been approved. All 29 guardrail checks passed. The components are ready for production.
        </p>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-body font-medium text-foreground">Landing page hero</p>
              <p className="text-xs font-body text-muted-foreground">3 components, 5 tokens verified</p>
            </div>
            <Badge variant="secondary">Approved</Badge>
          </div>
        </Card>
        <Button>View review</Button>
      </div>

      {/* Footer */}
      <Separator />
      <div className="px-8 py-4">
        <p className="text-[11px] font-body text-muted-foreground leading-relaxed">
          This is an automated notification. Reply directly if you have questions about this review.
        </p>
      </div>
    </div>
  </div>
);

/* ================================================================== */
/*  CHANNEL KIT DEFINITIONS                                            */
/* ================================================================== */

export const channelKits: ChannelKit[] = [
  {
    id: "web-app",
    name: "Web App",
    description: "Dashboard and product interfaces — functional, dense, and scannable.",
    toneModifiers: ["Functional", "Precise"],
    maxHeadingLength: 40,
    maxBodyLength: null,
    ctaRules: "Verb-first, 1–3 words",
    allowedComponents: ["card-primary", "card-stat", "button-primary", "button-secondary", "badge", "table"],
    typographyOverrides: { maxHeadlineSize: "text-xl", bodySize: "text-sm" },
    spacingProfile: "compact",
    colorEmphasis: "Functional — white dominant, minimal bronze",
    templates: [
      {
        id: "web-app-dashboard",
        name: "Dashboard",
        description: "Stat cards, data table, and action buttons in a compact layout.",
        component: WebAppDashboardTemplate,
        code: `import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BarChart3, TrendingUp } from "lucide-react";

export function WebAppDashboard() {
  return (
    <div className="bg-background p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-xl font-medium tracking-headline text-foreground">
          Overview
        </h1>
        <Button size="sm">Create report</Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Active users", value: "2,847", icon: Users, change: "+12%" },
          { label: "Engagement rate", value: "68.3%", icon: BarChart3, change: "+4.2%" },
          { label: "Growth", value: "23.1%", icon: TrendingUp, change: "+8.7%" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardDescription className="font-body text-xs">{stat.label}</CardDescription>
                <stat.icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="font-display text-2xl font-medium tracking-headline">{stat.value}</p>
              <p className="text-xs font-body text-accent mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-3">
        <Button>View all activity</Button>
        <Button variant="outline">Export data</Button>
      </div>
    </div>
  );
}`,
        layoutSpec: `# Web App — Dashboard
## Constraints
- Heading: max 40 characters, sentence case, Playfair Display
- CTA: verb-first, 1–3 words, no exclamation marks
- Spacing: compact (gap-4, p-6)
- Color: functional — white dominant, minimal bronze accent on change indicators
## Layout
- Header row: title (left) + primary action (right)
- Stat cards: grid-cols-3, gap-4
- Activity table: single Card with divide-y rows
- Footer actions: flex row with primary + outline buttons
## Components Used
- Card (card-primary)
- Button (button-primary, button-outline)
- Badge (implicit in stat change indicators)`,
        copySpec: `# Web App — Dashboard Copy Spec
## Page Title
"Overview" (sentence case, 8 chars, max 40)
Voice tokens: Sentence Case Headlines
## Primary CTA
"Create report" (verb-first, 2 words)
Voice tokens: Verb-First Calm Authority, No Exclamation Marks
## Secondary CTAs
"View all activity" (verb-first, 3 words)
"Export data" (verb-first, 2 words)
Voice tokens: Verb-First Calm Authority
## Stat Labels
"Active users", "Engagement rate", "Growth" (sentence case, descriptive)
Voice tokens: Precise Not Cold, No Filler Words
## Table Row Copy
"Token updated", "Component added", "Review completed" (past participle, factual)
Voice tokens: Confident Not Aggressive, No Filler Words`,
      },
    ],
  },
  {
    id: "landing-page",
    name: "Landing Page",
    description: "Marketing and editorial surfaces — aspirational, spacious, and persuasive without pressure.",
    toneModifiers: ["Editorial", "Aspirational"],
    maxHeadingLength: 60,
    maxBodyLength: null,
    ctaRules: "Verb-first, 1–5 words",
    allowedComponents: ["card-primary", "card-anchor", "button-primary", "button-secondary", "badge", "feature-card"],
    typographyOverrides: { maxHeadlineSize: "text-4xl", bodySize: "text-base" },
    spacingProfile: "generous",
    colorEmphasis: "Editorial — green anchor panels, white context, bronze accents",
    templates: [
      {
        id: "landing-hero",
        name: "Hero section",
        description: "Panel pairing with headline, feature list, and dual CTAs.",
        component: LandingHeroTemplate,
        code: `import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Layers, Eye, Shield } from "lucide-react";

export function LandingHero() {
  return (
    <div className="bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10">
        <div className="rounded-lg bg-primary text-primary-foreground p-8 space-y-4 flex flex-col justify-center">
          <h1 className="font-display text-4xl font-medium tracking-headline leading-hero">
            Design with purpose
          </h1>
          <p className="text-sm font-body leading-reading text-primary-foreground/90 max-w-prose">
            Every decision should be intentional. A system that provides the rails without prescribing the destination.
          </p>
          <div className="flex gap-3 pt-2">
            <Button variant="secondary">Get started</Button>
            <Button variant="ghost" className="text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10">
              View docs
            </Button>
          </div>
        </div>
        <Card className="flex flex-col justify-center p-8">
          {/* Feature list */}
          <div className="space-y-4">
            {[
              { icon: Layers, title: "Structured tokens", desc: "Colors, type, and spacing as a coherent system" },
              { icon: Eye, title: "Visual guardrails", desc: "Automated checks against brand rules" },
              { icon: Shield, title: "Voice consistency", desc: "Copy patterns that match the tone" },
            ].map((feature) => (
              <div key={feature.title} className="flex gap-3">
                <div className="h-8 w-8 rounded-md bg-secondary flex items-center justify-center shrink-0">
                  <feature.icon className="h-4 w-4 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-body font-medium text-foreground">{feature.title}</p>
                  <p className="text-xs font-body text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}`,
        layoutSpec: `# Landing Page — Hero Section
## Constraints
- Heading: max 60 characters, sentence case, Playfair Display
- CTA: verb-first, 1–5 words, no exclamation marks
- Spacing: generous (gap-8, p-10)
- Color: 60% white / 30% green / 8% bronze max
## Layout
- Panel pairing: Anchor (left, bg-primary) + Context (right, Card)
- Grid: grid-cols-1 md:grid-cols-2, gap-8
- Anchor panel: headline + body + dual CTAs
- Context panel: 3 feature rows with icon + text
## Components Used
- Card (card-primary)
- Button (button-secondary, button-ghost)
- Feature row (custom layout using design tokens)`,
        copySpec: `# Landing Page — Hero Copy Spec
## Headline
"Design with purpose" (sentence case, 19 chars, max 60)
Voice tokens: Confident Not Aggressive, Sentence Case Headlines
## Primary CTA
"Get started" (verb-first, 2 words)
Voice tokens: Verb-First Calm Authority, No Exclamation Marks
## Secondary CTA
"View docs" (verb-first, 2 words)
Voice tokens: Verb-First Calm Authority
## Body
"Every decision should be intentional. A system that provides the rails without prescribing the destination."
Voice tokens: Confident Not Aggressive, No Filler Words, No Urgency/Scarcity
## Feature Titles
"Structured tokens", "Visual guardrails", "Voice consistency" (sentence case, noun phrases)
Voice tokens: Precise Not Cold, Sentence Case Headlines`,
      },
      {
        id: "landing-pricing",
        name: "Pricing section",
        description: "Three-tier pricing cards with feature checklists and tiered CTAs.",
        component: LandingPricingTemplate,
        code: `import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";

export function LandingPricing() {
  const tiers = [
    {
      name: "Foundation", price: "Free", desc: "Core tokens and guidelines",
      cta: "Explore", features: ["Color palette", "Typography scale", "Spacing tokens", "Voice pillars"],
      highlighted: false,
    },
    {
      name: "Professional", price: "$49/mo", desc: "Full system with guardrails",
      cta: "Get started", features: ["Everything in Foundation", "Component library", "Guardrail engine", "Channel kits", "Export tools"],
      highlighted: true,
    },
    {
      name: "Enterprise", price: "Custom", desc: "Dedicated support and training",
      cta: "Contact us", features: ["Everything in Professional", "Custom integrations", "Dedicated onboarding", "Priority support"],
      highlighted: false,
    },
  ];

  return (
    <div className="bg-background p-10 space-y-8">
      <div className="text-center space-y-2">
        <h2 className="font-display text-4xl font-medium tracking-headline leading-hero text-foreground">
          Choose your path
        </h2>
        <p className="font-body text-base text-muted-foreground max-w-prose mx-auto">
          Each tier unlocks more of the system. Start where it makes sense.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((tier) => (
          <Card key={tier.name} className={tier.highlighted ? "border-primary ring-1 ring-primary" : ""}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CardTitle className="font-display text-lg font-medium">{tier.name}</CardTitle>
                {tier.highlighted && <Badge>Recommended</Badge>}
              </div>
              <CardDescription className="font-body text-xs">{tier.desc}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-display text-3xl font-medium tracking-headline">{tier.price}</p>
              <Separator />
              <ul className="space-y-2">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm font-body text-foreground">
                    <Check className="h-3.5 w-3.5 text-primary shrink-0" strokeWidth={2} />
                    {f}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={tier.highlighted ? "default" : "outline"}>
                {tier.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}`,
        layoutSpec: `# Landing Page — Pricing Section
## Constraints
- Heading: max 60 characters, sentence case, Playfair Display
- CTA: verb-first, 1–5 words per tier
- Spacing: generous (gap-6, p-10)
- Color: highlighted tier uses border-primary ring
## Layout
- Centered heading + subtitle
- Grid: grid-cols-1 md:grid-cols-3, gap-6
- Each card: name + badge, description, price, separator, feature checklist, full-width CTA
## Components Used
- Card (card-primary)
- Button (button-primary, button-outline)
- Badge (default variant on recommended tier)
- Separator
- Check icon for feature list`,
        copySpec: `# Landing Page — Pricing Copy Spec
## Section Headline
"Choose your path" (sentence case, 16 chars, max 60)
Voice tokens: Confident Not Aggressive, Sentence Case Headlines
## Section Subtitle
"Each tier unlocks more of the system. Start where it makes sense."
Voice tokens: No Filler Words, Precise Not Cold
## Tier CTAs
"Explore" (verb-first, 1 word)
"Get started" (verb-first, 2 words)
"Contact us" (verb-first, 2 words)
Voice tokens: Verb-First Calm Authority, No Exclamation Marks
## Badge
"Recommended" (single word, no urgency)
Voice tokens: No Urgency/Scarcity Language`,
      },
    ],
  },
  {
    id: "social-post",
    name: "Social Post",
    description: "Square-format cards for social media — warm, concise, and brand-forward.",
    toneModifiers: ["Warm", "Concise"],
    maxHeadingLength: 80,
    maxBodyLength: 280,
    ctaRules: "Soft CTA, 1–3 words",
    allowedComponents: ["card-primary", "badge"],
    typographyOverrides: { maxHeadlineSize: "text-2xl", bodySize: "text-sm" },
    spacingProfile: "compact",
    colorEmphasis: "Warm — bronze accents, green primary background",
    templates: [
      {
        id: "social-post",
        name: "Brand post",
        description: "400×400 square card with headline, body, and soft CTA.",
        component: SocialPostTemplate,
        code: `import { Layers, ArrowRight } from "lucide-react";

export function SocialPost() {
  return (
    <div className="w-[400px] h-[400px] rounded-lg bg-primary text-primary-foreground p-8 flex flex-col justify-between">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <Layers className="h-4 w-4" strokeWidth={1.5} />
          </div>
          <span className="text-xs font-body opacity-70">Curated Lens</span>
        </div>
        <h2 className="font-display text-2xl font-medium tracking-headline leading-section">
          Consistency is a design decision, not an accident
        </h2>
        <p className="text-sm font-body leading-reading text-primary-foreground/90">
          When every token traces back to a single source of truth, your team moves faster and your product feels intentional.
        </p>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-primary-foreground/20">
        <span className="text-xs font-body opacity-60">Explore the system</span>
        <ArrowRight className="h-4 w-4 opacity-60" strokeWidth={1.5} />
      </div>
    </div>
  );
}`,
        layoutSpec: `# Social Post — Brand Post
## Constraints
- Heading: max 80 characters, sentence case
- Body: max 280 characters
- CTA: soft, 1–3 words, no hard sell
- Fixed dimensions: 400×400px
- Spacing: compact (p-8)
- Color: primary background, foreground text
## Layout
- Single card, vertical flex with justify-between
- Top: brand mark + name
- Middle: headline + body
- Bottom: soft CTA with arrow, border-t separator
## Components Used
- Custom card layout (using primary token colors)`,
        copySpec: `# Social Post — Brand Post Copy Spec
## Headline
"Consistency is a design decision, not an accident" (sentence case, 52 chars, max 80)
Voice tokens: Confident Not Aggressive, Sentence Case Headlines
## Body
"When every token traces back to a single source of truth, your team moves faster and your product feels intentional." (117 chars, max 280)
Voice tokens: No Filler Words, Precise Not Cold
## Soft CTA
"Explore the system" (verb-first, 3 words, soft)
Voice tokens: Verb-First Calm Authority, No Exclamation Marks, No Urgency/Scarcity`,
      },
    ],
  },
  {
    id: "email",
    name: "Email",
    description: "600px-width email layouts — respectful, informative, single-CTA focused.",
    toneModifiers: ["Respectful", "Informative"],
    maxHeadingLength: 50,
    maxBodyLength: null,
    ctaRules: "Single CTA per email, verb-first, 1–3 words",
    allowedComponents: ["button-primary", "card-primary", "badge", "separator"],
    typographyOverrides: { maxHeadlineSize: "text-xl", bodySize: "text-sm" },
    spacingProfile: "standard",
    colorEmphasis: "Neutral — white body, green header bar",
    templates: [
      {
        id: "email-header",
        name: "Newsletter",
        description: "Weekly digest email with hero image area and single CTA.",
        component: EmailHeaderTemplate,
        code: `import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Layers } from "lucide-react";

export function EmailNewsletter() {
  return (
    <div className="w-[600px] bg-background rounded-lg overflow-hidden border border-border">
      <div className="bg-primary text-primary-foreground px-8 py-6">
        <p className="text-xs font-body opacity-70 mb-1">Curated Lens</p>
        <h1 className="font-display text-xl font-medium tracking-headline">
          Your weekly design digest
        </h1>
      </div>
      <div className="h-48 bg-secondary flex items-center justify-center">
        <div className="text-center space-y-2">
          <Layers className="h-8 w-8 text-primary mx-auto" strokeWidth={1.5} />
          <p className="text-xs font-body text-muted-foreground">Hero image area</p>
        </div>
      </div>
      <div className="px-8 py-6 space-y-4">
        <p className="text-sm font-body leading-reading text-foreground">
          Three tokens were updated this week. Two new components passed guardrail review. Here is what changed and why it matters for your workflow.
        </p>
        <Button>View changes</Button>
      </div>
      <Separator />
      <div className="px-8 py-4">
        <p className="text-[11px] font-body text-muted-foreground leading-relaxed">
          You received this because you are subscribed to weekly digests. Manage your preferences in settings.
        </p>
      </div>
    </div>
  );
}`,
        layoutSpec: `# Email — Newsletter
## Constraints
- Heading: max 50 characters, sentence case
- CTA: single per email, verb-first, 1–3 words
- Width: fixed 600px
- Spacing: standard (px-8, py-6)
- Color: green header, white body, muted footer
## Layout
- Header bar: bg-primary, brand name + headline
- Hero image placeholder: bg-secondary, centered icon
- Body: paragraph + single CTA button
- Footer: separator + fine print
## Components Used
- Button (button-primary)
- Separator`,
        copySpec: `# Email — Newsletter Copy Spec
## Subject/Headline
"Your weekly design digest" (sentence case, 26 chars, max 50)
Voice tokens: Sentence Case Headlines, No Urgency/Scarcity
## Body
"Three tokens were updated this week. Two new components passed guardrail review. Here is what changed and why it matters for your workflow."
Voice tokens: Precise Not Cold, No Filler Words
## CTA
"View changes" (verb-first, 2 words)
Voice tokens: Verb-First Calm Authority, No Exclamation Marks
## Footer
"You received this because you are subscribed to weekly digests."
Voice tokens: Respectful, No Filler Words`,
      },
      {
        id: "email-transactional",
        name: "Transactional",
        description: "Confirmation email with action button and summary card.",
        component: EmailTransactionalTemplate,
        code: `import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function EmailTransactional() {
  return (
    <div className="w-[600px] bg-background rounded-lg overflow-hidden border border-border">
      <div className="bg-primary text-primary-foreground px-8 py-5">
        <p className="text-xs font-body opacity-70">Curated Lens</p>
      </div>
      <div className="px-8 py-8 space-y-5">
        <h1 className="font-display text-xl font-medium tracking-headline text-foreground">
          Review approved
        </h1>
        <p className="text-sm font-body leading-reading text-foreground">
          The design review for "Landing page hero section" has been approved. All 29 guardrail checks passed. The components are ready for production.
        </p>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-body font-medium text-foreground">Landing page hero</p>
              <p className="text-xs font-body text-muted-foreground">3 components, 5 tokens verified</p>
            </div>
            <Badge variant="secondary">Approved</Badge>
          </div>
        </Card>
        <Button>View review</Button>
      </div>
      <Separator />
      <div className="px-8 py-4">
        <p className="text-[11px] font-body text-muted-foreground leading-relaxed">
          This is an automated notification. Reply directly if you have questions about this review.
        </p>
      </div>
    </div>
  );
}`,
        layoutSpec: `# Email — Transactional
## Constraints
- Heading: max 50 characters, sentence case
- CTA: single per email, verb-first, 1–3 words
- Width: fixed 600px
- Spacing: standard (px-8, py-8)
- Color: green header bar, white body
## Layout
- Minimal header: bg-primary, brand name only
- Content: headline + body paragraph + summary card + CTA
- Summary card: title + detail + status badge
- Footer: separator + fine print
## Components Used
- Button (button-primary)
- Card (card-primary)
- Badge (secondary variant)
- Separator`,
        copySpec: `# Email — Transactional Copy Spec
## Headline
"Review approved" (sentence case, 15 chars, max 50)
Voice tokens: Confident Not Aggressive, Sentence Case Headlines
## Body
"The design review for 'Landing page hero section' has been approved. All 29 guardrail checks passed. The components are ready for production."
Voice tokens: Precise Not Cold, No Filler Words, No Urgency/Scarcity
## CTA
"View review" (verb-first, 2 words)
Voice tokens: Verb-First Calm Authority, No Exclamation Marks
## Card Summary
"Landing page hero" / "3 components, 5 tokens verified"
Voice tokens: Precise Not Cold
## Footer
"This is an automated notification. Reply directly if you have questions about this review."
Voice tokens: Respectful, No Filler Words`,
      },
    ],
  },
];
