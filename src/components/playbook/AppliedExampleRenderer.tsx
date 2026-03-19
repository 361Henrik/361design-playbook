import type { ContentBlock } from "@/playbook/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { icons } from "lucide-react";

type AppliedBlock = Extract<ContentBlock, { type: "applied-example" }>;

function SectionLabel({ children }: { children: string }) {
  return (
    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
      {children}
    </span>
  );
}

/* ── Spacing: Card with annotated token gaps ── */
function SpacingCardExample() {
  return (
    <div className="space-y-2">
      <SectionLabel>Card using spacing tokens</SectionLabel>
      <div className="rounded-md border border-border bg-card relative overflow-hidden max-w-sm">
        {/* space-4 padding annotated */}
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="font-display text-sm font-semibold text-foreground">Route: Coastal Path</p>
            <Badge variant="secondary" className="text-[9px]">space-2 gap</Badge>
          </div>
          {/* space-3 between text elements */}
          <p className="font-body text-xs text-muted-foreground leading-reading max-w-prose">
            A scenic 12km walk along the clifftops with three curated stops at historic lighthouses.
          </p>
          {/* space-4 before button */}
          <div className="pt-1">
            <Button size="sm" className="text-xs">View Route</Button>
          </div>
        </div>
        {/* Annotation overlay */}
        <div className="absolute top-0 right-0 flex flex-col items-end gap-0.5 p-1.5">
          <span className="text-[8px] font-mono text-primary/60 bg-primary/5 px-1 rounded">p: space-4</span>
          <span className="text-[8px] font-mono text-primary/60 bg-primary/5 px-1 rounded">gap: space-3</span>
        </div>
      </div>
    </div>
  );
}

/* ── Layout: Page structure with width tokens ── */
function LayoutPageExample() {
  return (
    <div className="space-y-2">
      <SectionLabel>Page layout with width tokens</SectionLabel>
      <div className="rounded-md border border-border bg-background overflow-hidden">
        {/* Header */}
        <div className="border-b border-border bg-card px-4 py-2 flex items-center justify-between">
          <span className="font-display text-xs font-medium text-foreground">Header</span>
          <span className="text-[8px] font-mono text-muted-foreground">max-width-wide: 1280px</span>
        </div>
        {/* Content area */}
        <div className="p-4 flex gap-3">
          {/* Sidebar */}
          <div className="w-16 shrink-0 rounded border border-dashed border-border/60 p-2 flex flex-col items-center gap-1">
            <span className="text-[8px] font-mono text-muted-foreground">3 col</span>
            <div className="w-full h-2 rounded-sm bg-muted" />
            <div className="w-full h-2 rounded-sm bg-muted" />
            <div className="w-full h-2 rounded-sm bg-muted" />
          </div>
          {/* Main content */}
          <div className="flex-1 rounded border border-dashed border-border/60 p-3 space-y-2">
            <span className="text-[8px] font-mono text-muted-foreground">9 col — max-width-content: 1100px</span>
            <div className="w-3/4 h-3 rounded-sm bg-primary/10" />
            <div className="space-y-1">
              <div className="w-full h-2 rounded-sm bg-muted/60" />
              <div className="w-5/6 h-2 rounded-sm bg-muted/60" />
              <div className="w-2/3 h-2 rounded-sm bg-muted/60" />
            </div>
            <span className="text-[8px] font-mono text-muted-foreground">max-width-reading: 720px for prose</span>
          </div>
        </div>
        {/* Margin annotation */}
        <div className="border-t border-border/40 px-4 py-1.5 flex justify-between">
          <span className="text-[8px] font-mono text-muted-foreground">← space-5 margin →</span>
          <span className="text-[8px] font-mono text-muted-foreground">12-col grid, 24px gutter</span>
        </div>
      </div>
    </div>
  );
}

/* ── Interaction States: Button row ── */
function InteractionStatesExample() {
  return (
    <div className="space-y-2">
      <SectionLabel>Button interaction states</SectionLabel>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-col items-center gap-1.5">
          <Button size="sm" className="text-xs pointer-events-none">Default</Button>
          <span className="text-[9px] font-mono text-muted-foreground">resting</span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <Button size="sm" className="text-xs bg-primary/80 pointer-events-none">Hover</Button>
          <span className="text-[9px] font-mono text-muted-foreground">hover</span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <Button size="sm" className="text-xs bg-primary/70 scale-[0.98] pointer-events-none">Active</Button>
          <span className="text-[9px] font-mono text-muted-foreground">pressed</span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <Button size="sm" className="text-xs ring-2 ring-ring ring-offset-2 ring-offset-background pointer-events-none">Focus</Button>
          <span className="text-[9px] font-mono text-muted-foreground">focus</span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <Button size="sm" className="text-xs" disabled>Disabled</Button>
          <span className="text-[9px] font-mono text-muted-foreground">disabled</span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <Button size="sm" className="text-xs pointer-events-none">
            <span className="inline-block h-3 w-3 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
            Loading
          </Button>
          <span className="text-[9px] font-mono text-muted-foreground">loading</span>
        </div>
      </div>
    </div>
  );
}

/* ── Signifiers: Element in multiple states ── */
function SignifiersExample() {
  return (
    <div className="space-y-2">
      <SectionLabel>Signifier clarity across states</SectionLabel>
      <div className="flex flex-wrap items-start gap-4">
        {/* Clickable nav item */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="px-3 py-2 rounded-md bg-card border border-border text-xs font-body text-foreground cursor-pointer hover:bg-accent/10 transition-colors">
            Explore Routes
          </div>
          <span className="text-[9px] font-mono text-muted-foreground">clickable</span>
        </div>
        {/* Hovered */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="px-3 py-2 rounded-md bg-accent/10 border border-accent/20 text-xs font-body text-foreground">
            Explore Routes
          </div>
          <span className="text-[9px] font-mono text-muted-foreground">hovered</span>
        </div>
        {/* Active / selected */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="px-3 py-2 rounded-md bg-primary text-primary-foreground text-xs font-body font-medium">
            Explore Routes
          </div>
          <span className="text-[9px] font-mono text-muted-foreground">active</span>
        </div>
        {/* Disabled */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="px-3 py-2 rounded-md bg-muted/40 border border-border text-xs font-body text-muted-foreground/50 cursor-not-allowed">
            Explore Routes
          </div>
          <span className="text-[9px] font-mono text-muted-foreground">disabled</span>
        </div>
      </div>
    </div>
  );
}

/* ── Motion: Before → Transition → After ── */
function MotionSequenceExample() {
  return (
    <div className="space-y-2">
      <SectionLabel>Transition sequence — 350ms ease-out</SectionLabel>
      <div className="flex items-center gap-4">
        {/* Frame 1: Before */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-20 h-12 rounded-md border border-border bg-card flex items-center justify-center">
            <div className="w-8 h-2 rounded-sm bg-muted-foreground/20" />
          </div>
          <span className="text-[9px] font-mono text-muted-foreground">before</span>
        </div>
        {/* Arrow */}
        <span className="text-muted-foreground/40 text-lg">→</span>
        {/* Frame 2: Transition */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-20 h-12 rounded-md border border-primary/30 bg-card flex items-center justify-center">
            <div className="w-8 h-2 rounded-sm bg-primary/40" />
          </div>
          <span className="text-[9px] font-mono text-muted-foreground">350ms</span>
        </div>
        {/* Arrow */}
        <span className="text-muted-foreground/40 text-lg">→</span>
        {/* Frame 3: After */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-20 h-12 rounded-md border border-primary bg-primary/5 flex items-center justify-center">
            <div className="w-8 h-2 rounded-sm bg-primary" />
          </div>
          <span className="text-[9px] font-mono text-muted-foreground">after</span>
        </div>
      </div>
      <p className="font-body text-[10px] text-muted-foreground">
        Properties: opacity, background-color, border-color. Easing: ease-out. No scale or bounce.
      </p>
    </div>
  );
}

/* ── Colors: Applied in buttons, alerts, messages ── */
function ColorUsageExample() {
  return (
    <div className="space-y-2">
      <SectionLabel>Colors applied in UI elements</SectionLabel>
      <div className="flex flex-wrap items-start gap-4">
        {/* Primary button */}
        <div className="flex flex-col items-center gap-1.5">
          <Button size="sm" className="text-xs pointer-events-none">Book Route</Button>
          <span className="text-[9px] font-mono text-muted-foreground">terracotta</span>
        </div>
        {/* Success alert */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="px-3 py-2 rounded-md border border-green-600/20 bg-green-50 text-xs font-body text-green-800">
            Route saved
          </div>
          <span className="text-[9px] font-mono text-muted-foreground">success</span>
        </div>
        {/* Warning */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="px-3 py-2 rounded-md border border-amber-500/20 bg-amber-50 text-xs font-body text-amber-800">
            Low availability
          </div>
          <span className="text-[9px] font-mono text-muted-foreground">warning</span>
        </div>
        {/* Error */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="px-3 py-2 rounded-md border border-destructive/20 bg-destructive/5 text-xs font-body text-destructive">
            Connection lost
          </div>
          <span className="text-[9px] font-mono text-muted-foreground">error</span>
        </div>
        {/* Bronze accent */}
        <div className="flex flex-col items-center gap-1.5">
          <Badge className="bg-[hsl(var(--pill-bg))] text-[hsl(var(--pill-text))] border-[hsl(var(--pill-border))] text-[10px]">
            Curated
          </Badge>
          <span className="text-[9px] font-mono text-muted-foreground">bronze accent</span>
        </div>
      </div>
    </div>
  );
}

/* ── Icons: Used in navigation, buttons, lists ── */
function IconUsageExample() {
  const MenuIcon = (icons as Record<string, any>)["Menu"];
  const SearchIcon = (icons as Record<string, any>)["Search"];
  const ChevronRightIcon = (icons as Record<string, any>)["ChevronRight"];
  const MapPinIcon = (icons as Record<string, any>)["MapPin"];
  const DownloadIcon = (icons as Record<string, any>)["Download"];
  const CheckIcon = (icons as Record<string, any>)["Check"];

  return (
    <div className="space-y-3">
      <SectionLabel>Icons in context</SectionLabel>
      {/* Navigation */}
      <div className="space-y-1">
        <span className="text-[9px] font-mono text-muted-foreground">navigation</span>
        <div className="flex items-center gap-2 p-2 rounded-md border border-border bg-card max-w-xs">
          {MenuIcon && <MenuIcon className="h-4 w-4 text-foreground" strokeWidth={1.5} />}
          <span className="font-body text-xs text-foreground flex-1">Routes</span>
          {ChevronRightIcon && <ChevronRightIcon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />}
        </div>
      </div>
      {/* Button with icon */}
      <div className="space-y-1">
        <span className="text-[9px] font-mono text-muted-foreground">button with icon</span>
        <div className="flex gap-2">
          <Button size="sm" className="text-xs pointer-events-none">
            {SearchIcon && <SearchIcon className="h-3.5 w-3.5" strokeWidth={1.5} />}
            Search
          </Button>
          <Button size="sm" variant="outline" className="text-xs pointer-events-none">
            {DownloadIcon && <DownloadIcon className="h-3.5 w-3.5" strokeWidth={1.5} />}
            Export
          </Button>
        </div>
      </div>
      {/* List items */}
      <div className="space-y-1">
        <span className="text-[9px] font-mono text-muted-foreground">list items</span>
        <div className="space-y-1 max-w-xs">
          {[
            { icon: MapPinIcon, label: "Coastal Viewpoint" },
            { icon: CheckIcon, label: "Historic Lighthouse" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted/30 transition-colors">
              {item.icon && <item.icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />}
              <span className="font-body text-xs text-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const EXAMPLE_MAP: Record<AppliedBlock["variant"], () => JSX.Element> = {
  "spacing-card": SpacingCardExample,
  "layout-page": LayoutPageExample,
  "interaction-states": InteractionStatesExample,
  "signifiers": SignifiersExample,
  "motion-sequence": MotionSequenceExample,
  "color-usage": ColorUsageExample,
  "icon-usage": IconUsageExample,
};

export function AppliedExampleRenderer({ block }: { block: AppliedBlock }) {
  const ExampleComponent = EXAMPLE_MAP[block.variant];
  if (!ExampleComponent) return null;

  return (
    <div className="space-y-2">
      {block.heading && (
        <h4 className="font-display text-base font-semibold text-foreground">{block.heading}</h4>
      )}
      {block.description && (
        <p className="font-body text-xs text-muted-foreground">{block.description}</p>
      )}
      <div className="p-5 rounded-md border border-border bg-background">
        <ExampleComponent />
      </div>
    </div>
  );
}
