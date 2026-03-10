import { PageHeader } from "@/components/PageHeader";
import { CopyButton } from "@/components/CopyButton";
import { DosDonts } from "@/components/DosDonts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TokenExamplesTab } from "@/components/tokens/TokenExamplesTab";
import {
  Circle, Square, Triangle, Star, ArrowRight, ArrowLeft, ArrowUp,
  Search, Menu, X, Plus, Minus, Check, ChevronDown, ChevronRight,
  Settings, User, Mail, Calendar, Download, Upload, Eye, EyeOff,
  Palette, Type, Ruler, LayoutGrid, Zap, Hexagon, Copy, ExternalLink,
  Coffee, UtensilsCrossed, Info,
  Binoculars, ShoppingBag,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

// Custom Beach Parasol icon
const BeachParasol = ({ size = 24, strokeWidth = 2, className = "" }: { size?: number; strokeWidth?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2C8 2 4 5.5 4 9h16c0-3.5-4-7-8-7Z" />
    <line x1="12" y1="9" x2="12" y2="19" />
    <path d="M3 22c2-1.5 4 0 6-1s4 .5 6-1 4 0 6-1" />
  </svg>
);

// Custom Nature Sight icon — two mountain peaks with shared ridgeline
const NatureSightIcon = ({ size = 24, strokeWidth = 2, className = "" }: { size?: number; strokeWidth?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 20l7-14 4 6 3-4 6 12H2z" />
  </svg>
);

// Custom Island icon — land mound with one wave underneath
const IslandIcon = ({ size = 24, strokeWidth = 2, className = "" }: { size?: number; strokeWidth?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 14c2-4 5-6 8-6s6 2 8 6" />
    <path d="M2 19c3-1.5 5.5-1.5 8.5 0s5.5 1.5 8.5 0" />
  </svg>
);

// Custom Hotel icon — bed (headboard + mattress + legs)
const HotelIcon = ({ size = 24, strokeWidth = 2, className = "" }: { size?: number; strokeWidth?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 7v11M3 7h2v4h16v4H3M21 11v7" />
    <line x1="3" y1="18" x2="3" y2="20" />
    <line x1="21" y1="18" x2="21" y2="20" />
  </svg>
);

// Custom Historic Site icon — castle turret with crenellations
const HistoricSiteIcon = ({ size = 24, strokeWidth = 2, className = "" }: { size?: number; strokeWidth?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 21V9h12v12" />
    <path d="M6 9V5h3v4M9 9V5h3v4M12 9V5h3v4M15 9V5h3v4" />
    <path d="M10 21v-4h4v4" />
  </svg>
);

// Custom Gallery icon — simple square picture frame
const GalleryIcon = ({ size = 24, strokeWidth = 2, className = "" }: { size?: number; strokeWidth?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="1" />
    <path d="M3 16l5-5 3 3 4-4 6 6" />
  </svg>
);

// Custom Bridge icon — flat deck with arch underneath
const BridgeIcon = ({ size = 24, strokeWidth = 2, className = "" }: { size?: number; strokeWidth?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="2" y1="8" x2="22" y2="8" />
    <path d="M5 8c0 5 3.5 8 7 8s7-3 7-8" />
    <line x1="5" y1="8" x2="5" y2="20" />
    <line x1="19" y1="8" x2="19" y2="20" />
  </svg>
);

// Custom Museum icon — temple with triangular roof and columns
const MuseumIcon = ({ size = 24, strokeWidth = 2, className = "" }: { size?: number; strokeWidth?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 10l9-7 9 7" />
    <line x1="5" y1="10" x2="5" y2="20" />
    <line x1="9.5" y1="10" x2="9.5" y2="20" />
    <line x1="14.5" y1="10" x2="14.5" y2="20" />
    <line x1="19" y1="10" x2="19" y2="20" />
    <line x1="3" y1="20" x2="21" y2="20" />
  </svg>
);

// Custom Nature Walk icon — signpost
const NatureWalkIcon = ({ size = 24, strokeWidth = 2, className = "" }: { size?: number; strokeWidth?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="3" x2="12" y2="21" />
    <path d="M6 6h10l2 2.5L16 11H6V6z" />
    <path d="M18 14H8l-2 2.5L8 19h10V14z" />
  </svg>
);

// ── Existing icon groups ──
const iconGroups = [
  {
    label: "Navigation",
    icons: [
      { name: "Menu", icon: Menu },
      { name: "Close", icon: X },
      { name: "Chevron Down", icon: ChevronDown },
      { name: "Chevron Right", icon: ChevronRight },
      { name: "Arrow Right", icon: ArrowRight },
      { name: "Arrow Left", icon: ArrowLeft },
      { name: "Arrow Up", icon: ArrowUp },
      { name: "External Link", icon: ExternalLink },
    ],
  },
  {
    label: "Actions",
    icons: [
      { name: "Search", icon: Search },
      { name: "Plus", icon: Plus },
      { name: "Minus", icon: Minus },
      { name: "Check", icon: Check },
      { name: "Copy", icon: Copy },
      { name: "Download", icon: Download },
      { name: "Upload", icon: Upload },
      { name: "Settings", icon: Settings },
    ],
  },
  {
    label: "Content",
    icons: [
      { name: "User", icon: User },
      { name: "Mail", icon: Mail },
      { name: "Calendar", icon: Calendar },
      { name: "Eye", icon: Eye },
      { name: "Eye Off", icon: EyeOff },
      { name: "Palette", icon: Palette },
      { name: "Type", icon: Type },
      { name: "Layout", icon: LayoutGrid },
    ],
  },
  {
    label: "Shapes",
    icons: [
      { name: "Circle", icon: Circle },
      { name: "Square", icon: Square },
      { name: "Triangle", icon: Triangle },
      { name: "Star", icon: Star },
      { name: "Hexagon", icon: Hexagon },
      { name: "Ruler", icon: Ruler },
      { name: "Zap", icon: Zap },
    ],
  },
];

// ── POI taxonomy ──
const poiGroups = [
  {
    label: "Essentials",
    icons: [
      { name: "Hotel", icon: HotelIcon as unknown as LucideIcon },
      { name: "Café", icon: Coffee },
      { name: "Restaurant", icon: UtensilsCrossed },
      { name: "Information", icon: Info },
    ],
  },
  {
    label: "Culture & Heritage",
    icons: [
      { name: "Historic Site", icon: HistoricSiteIcon as unknown as LucideIcon },
      { name: "Museum", icon: MuseumIcon as unknown as LucideIcon },
      { name: "Gallery", icon: GalleryIcon as unknown as LucideIcon },
    ],
  },
  {
    label: "Scenic & Landscape",
    icons: [
      { name: "View", icon: Eye },
      { name: "Island / Islet", icon: IslandIcon as unknown as LucideIcon },
      { name: "Nature Sight", icon: NatureSightIcon as unknown as LucideIcon },
      { name: "Lookout", icon: Binoculars },
    ],
  },
  {
    label: "Nature Experiences",
    icons: [
      { name: "Nature Walk", icon: NatureWalkIcon as unknown as LucideIcon },
      { name: "Beach", icon: BeachParasol as unknown as LucideIcon },
    ],
  },
  {
    label: "Urban & Exploration",
    icons: [
      { name: "Bridge", icon: BridgeIcon as unknown as LucideIcon },
      { name: "Shopping", icon: ShoppingBag },
    ],
  },
];

// ── Marker component ──
type MarkerState = "default" | "hover" | "selected" | "cluster" | "curated";

function MapMarker({
  state = "default",
  size = 40,
  icon: Icon,
  clusterCount,
  className,
}: {
  state?: MarkerState;
  size?: number;
  icon?: LucideIcon;
  clusterCount?: number;
  className?: string;
}) {
  const isCurated = state === "curated";
  const isBronzeRing = state === "selected" || state === "curated";
  const isCluster = state === "cluster";

  // Ring border widths per state
  const ringWidth = state === "selected" ? 3 : state === "hover" ? 2.5 : 2;

  const ringSize = size + 8;
  const outerRingSize = isCurated ? size + 16 : ringSize;

  const shadow = "0 1px 2px rgba(0,0,0,0.15)";

  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <div className="relative" style={{ width: outerRingSize, height: outerRingSize + 8 }}>
        {/* Outer ring (curated double ring) */}
        {isCurated && (
          <div
            className="absolute rounded-full border-accent"
            style={{
              width: outerRingSize,
              height: outerRingSize,
              borderWidth: 2,
              top: 0,
              left: 0,
            }}
          />
        )}
        {/* Ring */}
        <div
          className={cn(
            "absolute rounded-full",
            isBronzeRing ? "border-accent" : "border-foreground"
          )}
          style={{
            width: ringSize,
            height: ringSize,
            borderWidth: ringWidth,
            top: isCurated ? 4 : 0,
            left: isCurated ? 4 : 0,
          }}
        />
        {/* Body */}
        <div
          className="absolute rounded-full flex items-center justify-center bg-background"
          style={{
            width: size,
            height: size,
            top: isCurated ? 8 : 4,
            left: isCurated ? 8 : 4,
            boxShadow: shadow,
          }}
        >
          {/* Inner white plate for map background isolation */}
          <div
            className="rounded-full flex items-center justify-center bg-background"
            style={{
              width: size * 0.82,
              height: size * 0.82,
              boxShadow: "inset 0 0 0 1px hsl(var(--border) / 0.08)",
            }}
          >
            {clusterCount !== undefined ? (
              <span
                className="font-body font-medium text-foreground"
                style={{ fontSize: size * 0.38 }}
              >
                {clusterCount}
              </span>
            ) : Icon ? (
              <Icon
                className="text-foreground"
                strokeWidth={size <= 32 ? 2.25 : 2.5}
                size={size <= 32 ? 16 : size <= 40 ? 20 : 24}
              />
            ) : null}
          </div>
        </div>
        {/* Pointer tip */}
        <div
          className="absolute w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-border"
          style={{
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
      </div>
    </div>
  );
}

// ── Main page ──
const TokensIcons = () => {
  return (
    <div className="px-8 py-10 max-w-5xl">
      <PageHeader
        title="Icon System"
        description="Thin stroke (1.5–2px), geometric, no fills, no gradients. Lucide icons aligned with the system's architectural sensibility."
      />

      <Tabs defaultValue="tokens" className="mt-6">
        <TabsList>
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
          <TabsTrigger value="poi">POI Map Icons</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
        </TabsList>

        {/* ────────── TOKENS TAB ────────── */}
        <TabsContent value="tokens">
          {/* Spec card */}
          <div className="mb-10 p-5 rounded-md border border-border bg-card">
            <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-3">Icon Specifications</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Stroke Width", value: "1.5–2px" },
                { label: "Default Size", value: "24×24px (h-6 w-6)" },
                { label: "Small Size", value: "16×16px (h-4 w-4)" },
                { label: "Style", value: "Outline only" },
              ].map((spec) => (
                <div key={spec.label} className="text-center">
                  <p className="text-xs font-body text-muted-foreground mb-1">{spec.label}</p>
                  <p className="text-sm font-body font-medium text-card-foreground">{spec.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <CopyButton value='<Icon className="h-6 w-6" strokeWidth={1.5} />' label="Default usage" />
              <CopyButton value='<Icon className="h-4 w-4" strokeWidth={2} />' label="Small usage" />
            </div>
          </div>

          {/* Icon groups */}
          {iconGroups.map((group) => (
            <section key={group.label} className="mb-8">
              <h2 className="font-display text-lg font-medium tracking-headline leading-section text-foreground mb-4">{group.label}</h2>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                {group.icons.map(({ name, icon: Icon }) => (
                  <div key={name} className="flex flex-col items-center gap-2 p-3 rounded-md border border-border bg-card hover:border-accent/20 transition-colors duration-ui">
                    <Icon className="h-6 w-6 text-foreground" strokeWidth={1.5} />
                    <span className="text-[10px] font-body text-muted-foreground text-center leading-tight">{name}</span>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Size comparison */}
          <section className="mb-8">
            <h2 className="font-display text-lg font-medium tracking-headline leading-section text-foreground mb-4">Size & Stroke Comparison</h2>
            <div className="p-5 rounded-md border border-border bg-card">
              <div className="flex items-end gap-8">
                {[
                  { size: "h-4 w-4", stroke: 2, label: "16px / 2px stroke" },
                  { size: "h-5 w-5", stroke: 1.5, label: "20px / 1.5px stroke" },
                  { size: "h-6 w-6", stroke: 1.5, label: "24px / 1.5px stroke" },
                  { size: "h-8 w-8", stroke: 1.5, label: "32px / 1.5px stroke" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center gap-2">
                    <Search className={`${item.size} text-foreground`} strokeWidth={item.stroke} />
                    <span className="text-[10px] font-body text-muted-foreground text-center">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Do / Don't */}
          <section className="mt-12">
            <h2 className="font-display text-xl font-medium tracking-headline leading-section text-foreground mb-4">Do / Don't</h2>
            <DosDonts
              dos={[
                "Use thin-stroke (1.5–2px) geometric icons from Lucide.",
                "Keep icons functional and minimal — they serve navigation and clarity.",
                "Use consistent sizing: 24px default, 16px for compact contexts.",
                "Color icons with text-foreground or text-muted-foreground only.",
              ]}
              donts={[
                "No filled icons — always use outline/stroke variants.",
                "No gradients on icons under any circumstances.",
                "No decorative or illustrative icon styles.",
                "Don't use icons larger than 32px except in hero/empty states.",
              ]}
            />
          </section>
        </TabsContent>

        {/* ────────── POI MAP ICONS TAB ────────── */}
        <TabsContent value="poi">
          {/* A) Marker Anatomy */}
          <section className="mb-10">
            <h2 className="font-display text-lg font-medium tracking-headline leading-section text-foreground mb-4">Marker Anatomy</h2>
            <div className="p-6 rounded-md border border-border bg-card">
              <p className="text-sm font-body text-muted-foreground mb-6 max-w-prose">
                Every map marker is composed of four parts: a <strong className="text-foreground">circular body</strong> (white fill),
                a <strong className="text-foreground">center icon</strong> (outline stroke),
                an <strong className="text-foreground">outer ring</strong> (state indicator), and
                a <strong className="text-foreground">pointer tip</strong> (anchors to coordinates).
              </p>
              <div className="flex items-start gap-12">
                {/* Anatomy diagram */}
                <div className="relative w-[120px] h-[140px]">
                  {/* Outer ring */}
                  <div className="absolute top-0 left-[12px] w-[96px] h-[96px] rounded-full border-2 border-dashed border-accent" />
                  {/* Body */}
                  <div className="absolute top-[8px] left-[20px] w-[80px] h-[80px] rounded-full border border-foreground bg-background flex items-center justify-center">
                    <Coffee className="h-8 w-8 text-foreground" strokeWidth={2} />
                  </div>
                  {/* Pointer */}
                  <div className="absolute bottom-[28px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[10px] border-l-transparent border-r-transparent border-t-border" />
                </div>
                {/* Labels */}
                <div className="space-y-3 pt-2">
                  {[
                    { label: "Outer ring", desc: "State ring — black (default) or bronze (interactive)" },
                    { label: "Circular body", desc: "White background, contains the icon" },
                    { label: "Center icon", desc: "Outline-only, 2px stroke, Lucide icon" },
                    { label: "Pointer tip", desc: "Anchors marker to map coordinate" },
                  ].map((part) => (
                    <div key={part.label}>
                      <p className="text-xs font-body font-medium text-foreground">{part.label}</p>
                      <p className="text-xs font-body text-muted-foreground">{part.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* B) Marker Style Rules */}
          <section className="mb-10">
            <h2 className="font-display text-lg font-medium tracking-headline leading-section text-foreground mb-4">Marker Style Rules</h2>
            <div className="p-5 rounded-md border border-border bg-card">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { label: "Stroke", value: "Outline only, 2px" },
                  { label: "Fills", value: "None (body fill is background)" },
                  { label: "Gradients", value: "Not permitted" },
                  { label: "Shape", value: "Geometric, Lucide-style" },
                  { label: "Colours", value: "Black, white, bronze only" },
                  { label: "Green", value: "Not used on markers" },
                ].map((rule) => (
                  <div key={rule.label} className="text-center">
                    <p className="text-xs font-body text-muted-foreground mb-1">{rule.label}</p>
                    <p className="text-sm font-body font-medium text-card-foreground">{rule.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* C) Marker States */}
          <section className="mb-10">
            <h2 className="font-display text-lg font-medium tracking-headline leading-section text-foreground mb-4">Marker States</h2>
            <div className="p-6 rounded-md border border-border bg-card">
              <div className="flex flex-wrap items-end gap-10">
                {([
                  { state: "default" as MarkerState, label: "Default", desc: "White bg, black icon, 2px black ring" },
                  { state: "hover" as MarkerState, label: "Hover / Focus", desc: "White bg, black icon, 2.5px black ring" },
                  { state: "selected" as MarkerState, label: "Selected", desc: "White bg, black icon, 3px bronze ring" },
                  { state: "cluster" as MarkerState, label: "Cluster", desc: "White circle, black number, black ring" },
                  { state: "curated" as MarkerState, label: "Curated Highlight", desc: "White bg, double bronze ring" },
                ]).map((item) => (
                  <div key={item.state} className="flex flex-col items-center gap-3">
                    <MapMarker
                      state={item.state}
                      size={40}
                      icon={item.state === "cluster" ? undefined : Coffee}
                      clusterCount={item.state === "cluster" ? 5 : undefined}
                    />
                    <div className="text-center mt-2">
                      <p className="text-xs font-body font-medium text-foreground">{item.label}</p>
                      <p className="text-[10px] font-body text-muted-foreground max-w-[120px]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* D) Marker Size Tokens */}
          <section className="mb-10">
            <h2 className="font-display text-lg font-medium tracking-headline leading-section text-foreground mb-4">Marker Size Tokens</h2>
            <div className="p-6 rounded-md border border-border bg-card">
              <div className="flex flex-wrap items-end gap-12">
                {[
                  { token: "marker-sm", px: 32, usage: "Clusters" },
                  { token: "marker-md", px: 40, usage: "Default POI" },
                  { token: "marker-lg", px: 48, usage: "Selected POI" },
                ].map((item) => (
                  <div key={item.token} className="flex flex-col items-center gap-3">
                    <MapMarker state="default" size={item.px} icon={Coffee} />
                    <div className="text-center mt-2">
                      <p className="text-xs font-mono text-foreground">{item.token}</p>
                      <p className="text-[10px] font-body text-muted-foreground">{item.px}px — {item.usage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* E) POI Icon Taxonomy */}
          <section className="mb-10">
            <h2 className="font-display text-lg font-medium tracking-headline leading-section text-foreground mb-4">POI Icon Taxonomy</h2>
            {poiGroups.map((group) => (
              <div key={group.label} className="mb-6">
                <h3 className="font-display text-sm font-medium tracking-headline text-foreground mb-3">{group.label}</h3>
                <div className="flex flex-wrap gap-6">
                  {group.icons.map(({ name, icon: Icon }) => (
                    <div key={name} className="flex flex-col items-center gap-2">
                      <MapMarker state="default" size={40} icon={Icon} />
                      <span className="text-[10px] font-body text-muted-foreground text-center leading-tight mt-1">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* F) Example Map Markers */}
          <section className="mb-10">
            <h2 className="font-display text-lg font-medium tracking-headline leading-section text-foreground mb-4">Example Map Markers</h2>
            <div className="relative rounded-md border border-border bg-muted/40 h-[280px] overflow-hidden">
              {/* Faux map grid lines */}
              <div className="absolute inset-0 opacity-[0.06]" style={{
                backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }} />

              {/* Default */}
              <div className="absolute" style={{ top: "30%", left: "15%" }}>
                <MapMarker state="default" size={40} icon={Coffee} />
                <p className="text-[9px] font-body text-muted-foreground text-center mt-1">Default</p>
              </div>

              {/* Hover */}
              <div className="absolute" style={{ top: "20%", left: "45%" }}>
                <MapMarker state="hover" size={40} icon={Coffee} />
                <p className="text-[9px] font-body text-muted-foreground text-center mt-1">Hover</p>
              </div>

              {/* Selected */}
              <div className="absolute" style={{ top: "55%", left: "60%" }}>
                <MapMarker state="selected" size={48} icon={MuseumIcon as unknown as LucideIcon} />
                <p className="text-[9px] font-body text-muted-foreground text-center mt-1">Selected</p>
              </div>

              {/* Cluster */}
              <div className="absolute" style={{ top: "40%", left: "80%" }}>
                <MapMarker state="cluster" size={36} clusterCount={12} />
                <p className="text-[9px] font-body text-muted-foreground text-center mt-1">Cluster</p>
              </div>
            </div>
          </section>

          {/* Do / Don't */}
          <section className="mt-12">
            <h2 className="font-display text-xl font-medium tracking-headline leading-section text-foreground mb-4">Do / Don't</h2>
            <DosDonts
              dos={[
                "Use outline-only Lucide icons at 2px stroke inside markers.",
                "Use only black, white, and Antique Bronze for marker elements.",
                "Scale selected markers to marker-lg (48px) for emphasis.",
                "Show cluster count as a plain number — no icon.",
              ]}
              donts={[
                "No Deep Forest Green on map markers.",
                "No filled or gradient icons inside markers.",
                "No drop shadows or glow effects on markers.",
                "Don't mix marker sizes arbitrarily — follow the size token scale.",
              ]}
            />
          </section>
        </TabsContent>

        {/* ────────── EXAMPLES TAB ────────── */}
        <TabsContent value="examples">
          <TokenExamplesTab tokenCategory="icons" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TokensIcons;
