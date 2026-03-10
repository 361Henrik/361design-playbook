import { PageHeader } from "@/components/PageHeader";
import { DosDonts } from "@/components/DosDonts";

const GuestExperience = () => {
  return (
    <div className="px-8 py-10 max-w-5xl">
      <PageHeader
        title="Guest Experience (65–85)"
        description="The primary map audience is cruise guests aged 65–85. Every design decision must prioritize clarity, comfort, and confidence for this demographic."
      />

      <div className="space-y-8">
        {/* Core principle */}
        <div className="p-5 rounded-md border border-border bg-card">
          <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-2">Core Principle</h3>
          <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose">
            If a guest needs to ask how to use the map, the map has failed. The interface must be immediately obvious, forgiving of imprecise gestures, and readable without glasses in good lighting conditions.
          </p>
        </div>

        {/* Touch targets */}
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

        {/* Typography */}
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

        {/* Interaction simplicity */}
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

        {/* Error tolerance */}
        <div className="p-5 rounded-md border border-border bg-card">
          <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-2">Error Tolerance</h3>
          <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose">
            Older guests often tap imprecisely. The map must be forgiving: expanded hit areas, no destructive actions, easy undo of any state change, and a single "reset" gesture that returns everything to default.
          </p>
        </div>

        {/* Do / Don't */}
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
      </div>
    </div>
  );
};

export default GuestExperience;
