import { PageHeader } from "@/components/PageHeader";

const MapInteraction = () => {
  return (
    <div className="px-space-5 md:px-space-8 py-space-8 max-w-content">
      <PageHeader
        title="Map Interaction"
        description="Tap, pan, and zoom behavior. Every interaction must feel calm and intentional — the map responds, never reacts."
      />

      <div className="space-y-8">
        {/* Tap behavior */}
        <div className="p-5 rounded-md border border-border bg-card">
          <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-3">Tap / Click Behavior</h3>
          <div className="space-y-3">
            <div className="px-4 py-3 rounded bg-primary/5 border border-primary/10">
              <p className="text-xs font-body font-medium text-card-foreground mb-1">Tap POI marker</p>
              <p className="text-sm font-body text-muted-foreground">Opens information card for that POI. Marker enters selected state. Other markers dim slightly.</p>
            </div>
            <div className="px-4 py-3 rounded bg-primary/5 border border-primary/10">
              <p className="text-xs font-body font-medium text-card-foreground mb-1">Tap landscape label</p>
              <p className="text-sm font-body text-muted-foreground">No action. Labels are informational only — they do not open cards or trigger navigation.</p>
            </div>
            <div className="px-4 py-3 rounded bg-primary/5 border border-primary/10">
              <p className="text-xs font-body font-medium text-card-foreground mb-1">Tap empty map area</p>
              <p className="text-sm font-body text-muted-foreground">Dismisses any open information card. Returns all markers to default state.</p>
            </div>
            <div className="px-4 py-3 rounded bg-primary/5 border border-primary/10">
              <p className="text-xs font-body font-medium text-card-foreground mb-1">Tap vessel marker</p>
              <p className="text-sm font-body text-muted-foreground">Centers map on vessel and shows current position context (e.g., "Approaching Flåm").</p>
            </div>
          </div>
        </div>

        {/* Pan and zoom */}
        <div className="p-5 rounded-md border border-border bg-card">
          <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-3">Pan & Zoom</h3>
          <div className="space-y-3">
            <div className="px-4 py-3 rounded bg-primary/5 border border-primary/10">
              <p className="text-xs font-body font-medium text-card-foreground mb-1">Pan</p>
              <p className="text-sm font-body text-muted-foreground">Free panning within the scenic corridor. Cannot pan beyond corridor boundaries. Smooth deceleration.</p>
            </div>
            <div className="px-4 py-3 rounded bg-primary/5 border border-primary/10">
              <p className="text-xs font-body font-medium text-card-foreground mb-1">Zoom</p>
              <p className="text-sm font-body text-muted-foreground">2–3 discrete zoom levels only. Pinch-to-zoom with snapping. No free zoom — prevents accidental over-zoom.</p>
            </div>
            <div className="px-4 py-3 rounded bg-primary/5 border border-primary/10">
              <p className="text-xs font-body font-medium text-card-foreground mb-1">Return to vessel</p>
              <p className="text-sm font-body text-muted-foreground">After panning away, a "Return to vessel" button appears. Tapping it smoothly animates back to the vessel position.</p>
            </div>
          </div>
        </div>

        {/* Information card */}
        <div className="p-5 rounded-md border border-border bg-card">
          <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-3">Information Card</h3>
          <p className="text-sm font-body leading-reading text-foreground max-w-prose mb-3">
            When a guest taps a POI marker, an information card slides up from the bottom of the map. The card contains:
          </p>
          <ul className="space-y-1.5 text-sm font-body leading-reading text-foreground">
            <li>• POI name (title)</li>
            <li>• Category icon and label</li>
            <li>• Short description (2–3 sentences max)</li>
            <li>• Distance from vessel (optional, in natural language: "About 2 km away")</li>
            <li>• "Read more" link to full article (if available)</li>
          </ul>
          <p className="text-sm font-body leading-reading text-muted-foreground mt-3 max-w-prose">
            The card uses a 300ms ease-out slide animation. It dismisses on tap outside, swipe down, or tapping another marker.
          </p>
        </div>

        {/* Constraints */}
        <div className="p-5 rounded-md border-2 border-destructive/20 bg-card">
          <p className="text-sm font-body font-medium text-destructive mb-3">✗ Interaction Constraints</p>
          <ul className="space-y-2 text-sm font-body leading-reading text-foreground">
            <li className="flex gap-2"><span className="text-destructive">✗</span> No double-tap to zoom</li>
            <li className="flex gap-2"><span className="text-destructive">✗</span> No long-press actions</li>
            <li className="flex gap-2"><span className="text-destructive">✗</span> No gesture-based navigation (swipe to next POI)</li>
            <li className="flex gap-2"><span className="text-destructive">✗</span> No hover tooltips (touch-first design)</li>
            <li className="flex gap-2"><span className="text-destructive">✗</span> No clustering that requires tap-to-expand</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MapInteraction;
