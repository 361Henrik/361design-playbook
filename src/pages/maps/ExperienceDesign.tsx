import { PageHeader } from "@/components/PageHeader";
import { DosDonts } from "@/components/DosDonts";

const ExperienceDesign = () => {
  return (
    <div className="px-8 py-10 max-w-5xl">
      <PageHeader
        title="Experience Design"
        description="The scenic corridor concept, narrative mapping, emotional experience principles, and guest-first design for an audience aged 65–85."
      />

      <div className="space-y-10">
        {/* ── Scenic Corridor ── */}
        <section className="space-y-6">
          <h2 className="font-display text-xl font-medium tracking-headline leading-section text-foreground">Scenic Corridor</h2>

          <div className="p-5 rounded-md border border-border bg-card">
            <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-2">Concept</h3>
            <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose">
              The scenic corridor is a curated envelope around the route. It determines what the guest sees on the map at any point along the journey. Rather than showing a fixed-width strip, the corridor expands and contracts based on what is actually visible and worth showing.
            </p>
          </div>

          <div className="p-5 rounded-md border border-border bg-card">
            <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-3">Standard Corridor</h3>
            <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose mb-4">
              The default route view. Shows landscape near the vessel — nearby islands, villages, bridges, hills, and local POIs.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="px-4 py-3 rounded bg-primary/5 border border-primary/10">
                <p className="text-xs font-body font-medium text-card-foreground mb-1">River Cruise</p>
                <p className="text-sm font-mono text-muted-foreground">3–6 km width</p>
              </div>
              <div className="px-4 py-3 rounded bg-primary/5 border border-primary/10">
                <p className="text-xs font-body font-medium text-card-foreground mb-1">Coastal Sailing</p>
                <p className="text-sm font-mono text-muted-foreground">5–10 km width</p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-md border border-border bg-card">
            <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-3">Scenic Expansion</h3>
            <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose mb-4">
              Used when important landmarks are visible farther away. The corridor widens locally to include the distant landmark, and its label appears.
            </p>
            <div className="space-y-2">
              <p className="text-xs font-body font-medium text-card-foreground">Trigger Examples</p>
              <div className="flex flex-wrap gap-2">
                {["Major mountain", "Volcano", "Glacier", "Famous island", "Cathedral or castle"].map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-xs font-body text-card-foreground">{t}</span>
                ))}
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-xs font-body font-medium text-card-foreground">Behavior</p>
              <ul className="space-y-1.5 text-sm font-body leading-reading text-muted-foreground">
                <li>• Corridor widens locally around the landmark</li>
                <li>• Distant landmark becomes visible on the map</li>
                <li>• Labels appear for that landmark</li>
                <li>• The widening feels smooth and natural — no sudden jumps</li>
              </ul>
            </div>
            <div className="mt-4 p-4 rounded bg-muted/50 border border-border">
              <p className="text-xs font-body font-medium text-card-foreground mb-2">Scenario Examples</p>
              <ul className="space-y-1 text-sm font-body text-muted-foreground">
                <li>• Mont Blanc visible from a valley — corridor widens south</li>
                <li>• Etna visible from the sea — corridor extends inland</li>
                <li>• Glacier visible from a fjord — corridor reaches up the valley</li>
              </ul>
            </div>
          </div>

          <div className="p-5 rounded-md border border-border bg-card">
            <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-3">Tight Corridor</h3>
            <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose mb-3">
              Used when there are no important distant features. Reduces clutter, keeps the map elegant, and emphasizes immediate surroundings.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Open sea", "Long river sections", "Empty terrain"].map((t) => (
                <span key={t} className="px-3 py-1 rounded-full bg-muted border border-border text-xs font-body text-muted-foreground">{t}</span>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-md border border-border bg-card">
            <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-3">Corridor Editing</h3>
            <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose mb-3">
              Operators must be able to manually adjust corridor width. Route designers should be able to:
            </p>
            <ul className="space-y-1.5 text-sm font-body leading-reading text-muted-foreground">
              <li>• Widen corridor locally to include distant landmarks</li>
              <li>• Narrow corridor locally to reduce clutter</li>
              <li>• Include specific distant landmarks by exception</li>
              <li>• Exclude irrelevant areas</li>
            </ul>
            <p className="text-sm font-body leading-reading text-muted-foreground mt-3 max-w-prose">
              The corridor therefore becomes a curated scenic envelope around the route — not an automatic buffer, but an editorial decision.
            </p>
          </div>
        </section>

        {/* ── Guest Experience ── */}
        <section className="space-y-6">
          <h2 className="font-display text-xl font-medium tracking-headline leading-section text-foreground">Guest Experience (65–85)</h2>

          <div className="p-5 rounded-md border border-border bg-card">
            <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-2">Core Principle</h3>
            <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose">
              If a guest needs to ask how to use the map, the map has failed. The interface must be immediately obvious, forgiving of imprecise gestures, and readable without glasses in good lighting conditions.
            </p>
          </div>

          <div className="p-5 rounded-md border border-border bg-card">
            <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-3">Touch Targets</h3>
            <div className="space-y-3">
              <div className="px-4 py-3 rounded bg-primary/5 border border-primary/10">
                <p className="text-xs font-body font-medium text-card-foreground mb-1">Minimum tap target</p>
                <p className="text-sm font-mono text-muted-foreground">48 × 48px (Apple HIG minimum) — we use 52 × 52px</p>
              </div>
              <div className="px-4 py-3 rounded bg-primary/5 border border-primary/10">
                <p className="text-xs font-body font-medium text-card-foreground mb-1">Marker hit area</p>
                <p className="text-sm font-mono text-muted-foreground">Visual marker is 24–28px · Hit area extends to 52px invisible radius</p>
              </div>
              <div className="px-4 py-3 rounded bg-primary/5 border border-primary/10">
                <p className="text-xs font-body font-medium text-card-foreground mb-1">Spacing between targets</p>
                <p className="text-sm font-mono text-muted-foreground">Minimum 12px between tap targets · Prevents mis-taps</p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-md border border-border bg-card">
            <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-3">Typography for Readability</h3>
            <div className="space-y-3">
              <div className="px-4 py-3 rounded bg-primary/5 border border-primary/10">
                <p className="text-xs font-body font-medium text-card-foreground mb-1">Minimum map label size</p>
                <p className="text-sm font-mono text-muted-foreground">10px rendered — never smaller, even for minor features</p>
              </div>
              <div className="px-4 py-3 rounded bg-primary/5 border border-primary/10">
                <p className="text-xs font-body font-medium text-card-foreground mb-1">Information card text</p>
                <p className="text-sm font-mono text-muted-foreground">16px body · 20px title · 1.5 line-height minimum</p>
              </div>
              <div className="px-4 py-3 rounded bg-primary/5 border border-primary/10">
                <p className="text-xs font-body font-medium text-card-foreground mb-1">Contrast ratio</p>
                <p className="text-sm font-mono text-muted-foreground">WCAG AA minimum (4.5:1) for all text · AAA preferred (7:1) for body text</p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-md border border-border bg-card">
            <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-3">Simplified Interaction Model</h3>
            <ul className="space-y-2 text-sm font-body leading-reading text-muted-foreground">
              <li>• Single-tap only — no double-tap, long-press, or multi-finger gestures required</li>
              <li>• Pinch-to-zoom snaps to discrete levels — prevents "lost in zoom" state</li>
              <li>• "Return to vessel" button is always one tap away</li>
              <li>• Information cards have a visible close button (not just swipe-to-dismiss)</li>
              <li>• Filter toggles are large, labeled pills — not small icons</li>
              <li>• No tutorial needed — the map teaches itself through constraints</li>
            </ul>
          </div>

          <div className="p-5 rounded-md border border-border bg-card">
            <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-2">Error Tolerance</h3>
            <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose">
              Older guests often tap imprecisely. The map must be forgiving: expanded hit areas, no destructive actions, easy undo of any state change, and a single "reset" gesture that returns everything to default.
            </p>
          </div>

          <DosDonts
            dos={[
              "Use large, high-contrast text for all map labels.",
              "Provide a visible 'Return to vessel' button at all times.",
              "Snap zoom to discrete levels to prevent disorientation.",
              "Use expanded hit areas (52px) for all tappable elements.",
              "Keep information cards short — 2–3 sentences maximum.",
            ]}
            donts={[
              "No gestures beyond single-tap and simple pinch-to-zoom.",
              "No small or low-contrast labels anywhere on the map.",
              "No hidden interactions (long-press, double-tap, swipe).",
              "No animated or auto-advancing content on the map.",
              "No clustered markers that require tap-to-expand.",
            ]}
          />
        </section>
      </div>
    </div>
  );
};

export default ExperienceDesign;