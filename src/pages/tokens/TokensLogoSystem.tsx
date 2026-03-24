import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Camera, MapPin, Check, X } from "lucide-react";

/* ─── Logo mark (pin + shutter) as inline SVG ─── */
function LogoIcon({ size = 48, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Pin silhouette */}
      <path d="M24 4C17.4 4 12 9.4 12 16c0 9 12 24 12 24s12-15 12-24c0-6.6-5.4-12-12-12z" />
      {/* Shutter aperture inside */}
      <circle cx="24" cy="16" r="6" />
      <line x1="24" y1="10" x2="24" y2="12" />
      <line x1="29.2" y1="13" x2="27.5" y2="14" />
      <line x1="29.2" y1="19" x2="27.5" y2="18" />
      <line x1="24" y1="22" x2="24" y2="20" />
      <line x1="18.8" y1="19" x2="20.5" y2="18" />
      <line x1="18.8" y1="13" x2="20.5" y2="14" />
    </svg>
  );
}

/* ─── Wordmark ─── */
function Wordmark({ color = "currentColor", className = "" }: { color?: string; className?: string }) {
  return (
    <span className={`font-display text-lg tracking-headline leading-none ${className}`} style={{ color }}>
      The Curated Lens
    </span>
  );
}

/* ─── Full lockup ─── */
function FullLockup({ iconColor = "currentColor", textColor = "currentColor" }: { iconColor?: string; textColor?: string }) {
  return (
    <div className="flex items-center gap-3">
      <LogoIcon size={36} color={iconColor} />
      <Wordmark color={textColor} />
    </div>
  );
}

/* ─── Section wrapper ─── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-space-5">
      <h2 className="font-display text-h3 tracking-headline text-foreground">{title}</h2>
      {children}
    </section>
  );
}

/* ─── Color usage cell ─── */
function ColorCell({ bg, label, iconColor, textColor, valid = true }: {
  bg: string; label: string; iconColor: string; textColor: string; valid?: boolean;
}) {
  return (
    <div className="space-y-2">
      <div className={`${bg} rounded-md p-6 flex items-center justify-center min-h-[88px]`}>
        <FullLockup iconColor={iconColor} textColor={textColor} />
      </div>
      <div className="flex items-center gap-1.5">
        {valid
          ? <Check className="h-3.5 w-3.5 text-deep-green" strokeWidth={2} />
          : <X className="h-3.5 w-3.5 text-primary" strokeWidth={2} />}
        <span className={`font-body text-xs ${valid ? "text-foreground" : "text-muted-foreground line-through"}`}>{label}</span>
      </div>
    </div>
  );
}

export default function TokensLogoSystem() {
  return (
    <div className="max-w-4xl space-y-space-10">
      <PageHeader
        title="Logo System"
        description="All rules for logo usage across the design system. The icon connects brand identity with product experience — especially maps."
      />

      {/* ─── 1. Logo Versions ─── */}
      <Section title="Logo Versions">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-5">
          {/* Full lockup */}
          <div className="rounded-md border border-border bg-card p-6 space-y-4">
            <Badge variant="outline" className="border-accent text-accent text-[10px] font-mono uppercase">Primary</Badge>
            <div className="flex items-center justify-center py-4">
              <FullLockup iconColor="hsl(var(--charcoal))" textColor="hsl(var(--charcoal))" />
            </div>
            <p className="font-body text-xs text-muted-foreground leading-reading">
              Full lockup for hero placements, headers, and external communications.
            </p>
          </div>

          {/* Wordmark */}
          <div className="rounded-md border border-border bg-card p-6 space-y-4">
            <Badge variant="outline" className="border-accent text-accent text-[10px] font-mono uppercase">Secondary</Badge>
            <div className="flex items-center justify-center py-4">
              <Wordmark color="hsl(var(--charcoal))" className="text-xl" />
            </div>
            <p className="font-body text-xs text-muted-foreground leading-reading">
              Wordmark only for tight spaces, inline references, and secondary placements.
            </p>
          </div>

          {/* Icon */}
          <div className="rounded-md border border-border bg-card p-6 space-y-4">
            <Badge variant="outline" className="border-accent text-accent text-[10px] font-mono uppercase">Icon</Badge>
            <div className="flex items-center justify-center py-4">
              <LogoIcon size={48} color="hsl(var(--charcoal))" />
            </div>
            <p className="font-body text-xs text-muted-foreground leading-reading">
              Pin + shutter icon for map markers, favicons, app icons, and product UI elements.
            </p>
          </div>
        </div>
      </Section>

      {/* ─── 2. Color Usage ─── */}
      <Section title="Color Usage">
        <p className="font-body text-sm text-muted-foreground leading-reading max-w-prose">
          Approved logo color combinations. Each pairing is designed for maximum legibility within its environment.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-space-4">
          <ColorCell bg="bg-background" label="Charcoal on Base Canvas" iconColor="hsl(var(--charcoal))" textColor="hsl(var(--charcoal))" />
          <ColorCell bg="bg-deep-green" label="White on Deep Green" iconColor="#ffffff" textColor="#ffffff" />
          <ColorCell bg="bg-deep-green" label="Bronze on Deep Green" iconColor="hsl(var(--bronze))" textColor="hsl(var(--bronze))" />
          <ColorCell bg="bg-background" label="Bronze icon on light (icon only)" iconColor="hsl(var(--bronze))" textColor="hsl(var(--charcoal))" />
        </div>

        <h3 className="font-display text-sm tracking-headline text-foreground pt-space-3">Prohibited</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-space-4">
          <ColorCell bg="bg-primary" label="White on Terracotta" iconColor="#ffffff" textColor="#ffffff" valid={false} />
          <ColorCell bg="bg-background" label="Bronze wordmark on light" iconColor="hsl(var(--bronze))" textColor="hsl(var(--bronze))" valid={false} />
          <ColorCell bg="bg-card" label="Muted on muted" iconColor="hsl(var(--muted-foreground))" textColor="hsl(var(--muted-foreground))" valid={false} />
        </div>
      </Section>

      {/* ─── 3. Clear Space ─── */}
      <Section title="Clear Space">
        <p className="font-body text-sm text-muted-foreground leading-reading max-w-prose">
          Maintain a minimum clear zone equal to the icon height on all sides. No text, graphics, or edges may enter this zone.
        </p>
        <div className="flex items-center justify-center py-8">
          <div className="relative inline-flex items-center justify-center">
            {/* Clear zone visualisation */}
            <div className="absolute inset-0 border-2 border-dashed border-accent/30 rounded-md" style={{ margin: "-24px" }} />
            <div className="bg-card border border-border rounded-md p-6">
              <FullLockup iconColor="hsl(var(--charcoal))" textColor="hsl(var(--charcoal))" />
            </div>
            {/* Dimension arrows */}
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 font-mono text-[10px] text-accent">x</span>
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] text-accent">x</span>
            <span className="absolute top-1/2 -left-8 -translate-y-1/2 font-mono text-[10px] text-accent">x</span>
            <span className="absolute top-1/2 -right-8 -translate-y-1/2 font-mono text-[10px] text-accent">x</span>
          </div>
        </div>
        <p className="font-body text-xs text-muted-foreground text-center">
          x = icon height. This is the minimum exclusion zone.
        </p>
      </Section>

      {/* ─── 4. Size & Scaling ─── */}
      <Section title="Size & Scaling">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-5">
          <div className="rounded-md border border-border bg-card p-6 space-y-4">
            <h3 className="font-display text-sm tracking-headline text-foreground">Full Logo</h3>
            <div className="flex items-end gap-6">
              <div className="space-y-1 text-center">
                <FullLockup iconColor="hsl(var(--charcoal))" textColor="hsl(var(--charcoal))" />
                <span className="font-mono text-[10px] text-muted-foreground">min 120px wide</span>
              </div>
            </div>
          </div>
          <div className="rounded-md border border-border bg-card p-6 space-y-4">
            <h3 className="font-display text-sm tracking-headline text-foreground">Icon Only</h3>
            <div className="flex items-end gap-6">
              <div className="space-y-1 text-center">
                <LogoIcon size={32} color="hsl(var(--charcoal))" />
                <span className="font-mono text-[10px] text-muted-foreground">min 24px</span>
              </div>
              <div className="space-y-1 text-center">
                <LogoIcon size={16} color="hsl(var(--charcoal))" />
                <span className="font-mono text-[10px] text-muted-foreground">16px favicon</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── 5. Product Integration ─── */}
      <Section title="Product Integration">
        <p className="font-body text-sm text-muted-foreground leading-reading max-w-prose">
          The pin + shutter icon bridges brand identity with product experience. It appears as map markers, POI indicators, and interface anchors.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-5">
          {/* Map marker */}
          <div className="rounded-md border border-border bg-card p-6 space-y-3">
            <Badge variant="outline" className="border-accent text-accent text-[10px] font-mono uppercase">Map Marker</Badge>
            <div className="flex items-center justify-center py-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full border-2 border-charcoal bg-white flex items-center justify-center">
                  <Camera className="h-5 w-5 text-foreground" strokeWidth={1.5} />
                </div>
              </div>
            </div>
            <p className="font-body text-xs text-muted-foreground leading-reading">
              Default map marker uses the icon in a white disk with charcoal ring — matching the POI marker system.
            </p>
          </div>

          {/* Selected state */}
          <div className="rounded-md border border-border bg-card p-6 space-y-3">
            <Badge variant="outline" className="border-accent text-accent text-[10px] font-mono uppercase">Selected State</Badge>
            <div className="flex items-center justify-center py-4">
              <div className="w-12 h-12 rounded-full border-[3px] border-accent bg-white flex items-center justify-center">
                <Camera className="h-5 w-5 text-foreground" strokeWidth={1.5} />
              </div>
            </div>
            <p className="font-body text-xs text-muted-foreground leading-reading">
              Selected markers use a 3px Champagne Bronze ring, reinforcing brand presence on interaction.
            </p>
          </div>

          {/* Interface element */}
          <div className="rounded-md border border-border bg-card p-6 space-y-3">
            <Badge variant="outline" className="border-accent text-accent text-[10px] font-mono uppercase">Interface</Badge>
            <div className="flex items-center justify-center py-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-deep-green">
                <MapPin className="h-4 w-4 text-accent" strokeWidth={1.5} />
                <span className="font-body text-xs text-white">Curated Location</span>
              </div>
            </div>
            <p className="font-body text-xs text-muted-foreground leading-reading">
              The icon anchors navigation chips, location badges, and contextual indicators across the product.
            </p>
          </div>
        </div>
      </Section>

      {/* ─── 6. Background Pairing ─── */}
      <Section title="Background Pairing">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-5">
          {/* Light */}
          <div className="space-y-2">
            <div className="rounded-md bg-background border border-border p-8 flex items-center justify-center">
              <FullLockup iconColor="hsl(var(--charcoal))" textColor="hsl(var(--charcoal))" />
            </div>
            <span className="font-body text-xs text-muted-foreground">Light / Base Canvas</span>
          </div>

          {/* Deep Green */}
          <div className="space-y-2">
            <div className="rounded-md bg-deep-green p-8 flex items-center justify-center">
              <FullLockup iconColor="hsl(var(--bronze))" textColor="hsl(var(--bronze))" />
            </div>
            <span className="font-body text-xs text-muted-foreground">Deep Green</span>
          </div>

          {/* Image / overlay */}
          <div className="space-y-2">
            <div className="rounded-md bg-charcoal/80 p-8 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-charcoal/60 to-charcoal/30" />
              <div className="relative z-10">
                <FullLockup iconColor="#ffffff" textColor="#ffffff" />
              </div>
            </div>
            <span className="font-body text-xs text-muted-foreground">Over image (neutral overlay 10–20%)</span>
          </div>
        </div>
        <p className="font-body text-xs text-muted-foreground leading-reading max-w-prose pt-space-2">
          When placed over photography, use a neutral-toned gradient overlay at 10–20% opacity to ensure legibility.
          Follow the overlay priority: Crop → Reposition → Better Image → Reduce Density → Overlay.
        </p>
      </Section>
    </div>
  );
}
