import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Camera, MapPin, Check, X } from "lucide-react";

import logoIcon from "@/assets/logo-icon.png";
import logoIconInverted from "@/assets/logo-icon-inverted.png";
import logoFull from "@/assets/logo-full.png";
import logoLockup from "@/assets/logo-lockup.png";

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
function ColorCell({ bg, label, children, valid = true }: {
  bg: string; label: string; children: React.ReactNode; valid?: boolean;
}) {
  return (
    <div className="space-y-2">
      <div className={`${bg} rounded-md p-6 flex items-center justify-center min-h-[88px]`}>
        {children}
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
              <img src={logoFull} alt="The Curated Lens — full lockup" className="h-20 w-auto object-contain" />
            </div>
            <p className="font-body text-xs text-muted-foreground leading-reading">
              Full lockup for hero placements, headers, and external communications.
            </p>
          </div>

          {/* Lockup horizontal */}
          <div className="rounded-md border border-border bg-card p-6 space-y-4">
            <Badge variant="outline" className="border-accent text-accent text-[10px] font-mono uppercase">Secondary</Badge>
            <div className="flex items-center justify-center py-4">
              <img src={logoLockup} alt="The Curated Lens — horizontal lockup" className="h-16 w-auto object-contain" />
            </div>
            <p className="font-body text-xs text-muted-foreground leading-reading">
              Horizontal lockup for tight spaces, inline references, and secondary placements.
            </p>
          </div>

          {/* Icon */}
          <div className="rounded-md border border-border bg-card p-6 space-y-4">
            <Badge variant="outline" className="border-accent text-accent text-[10px] font-mono uppercase">Icon</Badge>
            <div className="flex items-center justify-center py-4">
              <img src={logoIcon} alt="Pin + shutter icon" className="h-16 w-auto object-contain" />
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
        <h3 className="font-display text-sm tracking-headline text-foreground">White Icon</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-space-4">
          <ColorCell bg="bg-deep-green" label="White on Deep Green">
            <img src={logoIconInverted} alt="White icon on green" className="h-12 w-auto object-contain" />
          </ColorCell>
          <ColorCell bg="bg-primary" label="White on Terracotta">
            <img src={logoIconInverted} alt="White icon on terracotta" className="h-12 w-auto object-contain" />
          </ColorCell>
        </div>

        <h3 className="font-display text-sm tracking-headline text-foreground pt-space-3">Golden Icon</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-space-4">
          <ColorCell bg="bg-deep-green" label="Golden on Deep Green">
            <img src={logoIcon} alt="Golden icon on green" className="h-12 w-auto object-contain" />
          </ColorCell>
          <ColorCell bg="bg-background" label="Golden on Base Canvas">
            <img src={logoIcon} alt="Golden icon on cream" className="h-12 w-auto object-contain" />
          </ColorCell>
        </div>

        <h3 className="font-display text-sm tracking-headline text-foreground pt-space-3">Full Lockup</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-space-4">
          <ColorCell bg="bg-background" label="Full lockup on light">
            <img src={logoFull} alt="Full logo on light" className="h-10 w-auto object-contain" />
          </ColorCell>
          <ColorCell bg="bg-deep-green" label="Full lockup on Deep Green">
            <img src={logoFull} alt="Full logo on green" className="h-10 w-auto object-contain brightness-200" />
          </ColorCell>
        </div>

        <h3 className="font-display text-sm tracking-headline text-foreground pt-space-3">Prohibited</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-space-4">
          <ColorCell bg="bg-primary" label="Golden on Terracotta" valid={false}>
            <img src={logoIcon} alt="" className="h-12 w-auto object-contain opacity-70" />
          </ColorCell>
          <ColorCell bg="bg-card" label="Muted on muted" valid={false}>
            <img src={logoIcon} alt="" className="h-12 w-auto object-contain opacity-30" />
          </ColorCell>
          <ColorCell bg="bg-charcoal" label="Icon without contrast adjustment" valid={false}>
            <img src={logoIcon} alt="" className="h-12 w-auto object-contain opacity-40" />
          </ColorCell>
        </div>
      </Section>

      {/* ─── 3. Clear Space ─── */}
      <Section title="Clear Space">
        <p className="font-body text-sm text-muted-foreground leading-reading max-w-prose">
          Maintain a minimum clear zone equal to the icon height on all sides. No text, graphics, or edges may enter this zone.
        </p>
        <div className="flex items-center justify-center py-8">
          <div className="relative inline-flex items-center justify-center">
            <div className="absolute inset-0 border-2 border-dashed border-accent/30 rounded-md" style={{ margin: "-24px" }} />
            <div className="bg-card border border-border rounded-md p-6">
              <img src={logoFull} alt="Full lockup with clear space" className="h-14 w-auto object-contain" />
            </div>
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
                <img src={logoFull} alt="Full logo min size" className="h-14 w-auto object-contain" />
                <span className="font-mono text-[10px] text-muted-foreground">min 120px wide</span>
              </div>
            </div>
          </div>
          <div className="rounded-md border border-border bg-card p-6 space-y-4">
            <h3 className="font-display text-sm tracking-headline text-foreground">Icon Only</h3>
            <div className="flex items-end gap-6">
              <div className="space-y-1 text-center">
                <img src={logoIcon} alt="Icon 32px" className="h-8 w-auto object-contain" />
                <span className="font-mono text-[10px] text-muted-foreground">min 24px</span>
              </div>
              <div className="space-y-1 text-center">
                <img src={logoIcon} alt="Icon 16px" className="h-4 w-auto object-contain" />
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
          <div className="rounded-md border border-border bg-card p-6 space-y-3">
            <Badge variant="outline" className="border-accent text-accent text-[10px] font-mono uppercase">Map Marker</Badge>
            <div className="flex items-center justify-center py-4">
              <div className="w-12 h-12 rounded-full border-2 border-charcoal bg-white flex items-center justify-center">
                <Camera className="h-5 w-5 text-foreground" strokeWidth={1.5} />
              </div>
            </div>
            <p className="font-body text-xs text-muted-foreground leading-reading">
              Default map marker uses the icon in a white disk with charcoal ring — matching the POI marker system.
            </p>
          </div>

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
          <div className="space-y-2">
            <div className="rounded-md bg-background border border-border p-8 flex items-center justify-center">
              <img src={logoFull} alt="Logo on light" className="h-14 w-auto object-contain" />
            </div>
            <span className="font-body text-xs text-muted-foreground">Light / Base Canvas</span>
          </div>

          <div className="space-y-2">
            <div className="rounded-md bg-deep-green p-8 flex items-center justify-center">
              <img src={logoIconInverted} alt="Logo on Deep Green" className="h-14 w-auto object-contain" />
            </div>
            <span className="font-body text-xs text-muted-foreground">Deep Green</span>
          </div>

          <div className="space-y-2">
            <div className="rounded-md bg-charcoal/80 p-8 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-charcoal/60 to-charcoal/30" />
              <div className="relative z-10">
                <img src={logoIconInverted} alt="Logo over image" className="h-14 w-auto object-contain" />
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
