import { PageHeader } from "@/components/PageHeader";

const RoutePosition = () => {
  return (
    <div className="px-8 py-10 max-w-5xl">
      <PageHeader
        title="Route & Position"
        description="How the journey route is drawn, how progress is shown, and how the vessel position behaves on the map."
      />

      <div className="space-y-8">
        {/* Route line */}
        <div className="p-5 rounded-md border border-border bg-card">
          <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-3">Route Line</h3>
          <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose mb-4">
            The route is a single continuous line from embarkation to disembarkation. It is the most prominent element on the map after the base geography.
          </p>
          <div className="space-y-3">
            <div className="px-4 py-3 rounded bg-primary/5 border border-primary/10">
              <p className="text-xs font-body font-medium text-card-foreground mb-1">Completed segment</p>
              <p className="text-sm font-mono text-muted-foreground">2px solid · Near-black (#1A1A1A) · Full opacity</p>
            </div>
            <div className="px-4 py-3 rounded bg-primary/5 border border-primary/10">
              <p className="text-xs font-body font-medium text-card-foreground mb-1">Upcoming segment</p>
              <p className="text-sm font-mono text-muted-foreground">2px solid · Warm grey (#8B8680) · 60% opacity</p>
            </div>
            <div className="px-4 py-3 rounded bg-primary/5 border border-primary/10">
              <p className="text-xs font-body font-medium text-card-foreground mb-1">Line style</p>
              <p className="text-sm font-mono text-muted-foreground">Smooth curves · No dashes · No arrows · Round line caps</p>
            </div>
          </div>
        </div>

        {/* Vessel position */}
        <div className="p-5 rounded-md border border-border bg-card">
          <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-3">Vessel Position</h3>
          <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose mb-3">
            The vessel is shown as a solid dot at the current GPS position on the route line. It must always be visible and never obscured by other map elements.
          </p>
          <div className="space-y-3">
            <div className="px-4 py-3 rounded bg-primary/5 border border-primary/10">
              <p className="text-xs font-body font-medium text-card-foreground mb-1">Marker</p>
              <p className="text-sm font-mono text-muted-foreground">8px solid circle · Near-black (#1A1A1A) · No stroke</p>
            </div>
            <div className="px-4 py-3 rounded bg-primary/5 border border-primary/10">
              <p className="text-xs font-body font-medium text-card-foreground mb-1">Update frequency</p>
              <p className="text-sm font-mono text-muted-foreground">Every 30–60 seconds · Smooth interpolation between updates</p>
            </div>
            <div className="px-4 py-3 rounded bg-primary/5 border border-primary/10">
              <p className="text-xs font-body font-medium text-card-foreground mb-1">Map centering</p>
              <p className="text-sm font-mono text-muted-foreground">Map follows vessel by default · Guest can pan freely · "Return to vessel" button appears</p>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="p-5 rounded-md border border-border bg-card">
          <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-3">Progress Indication</h3>
          <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose mb-3">
            Progress is shown through the contrast between completed (dark) and upcoming (light) route segments. No percentage, no progress bar, no numeric distance.
          </p>
          <ul className="space-y-1.5 text-sm font-body leading-reading text-muted-foreground">
            <li>• The completed/upcoming split at the vessel position is the only progress indicator</li>
            <li>• Port stops along the route are shown as small circles on the route line</li>
            <li>• Visited ports use the completed style; upcoming ports use the upcoming style</li>
          </ul>
        </div>

        {/* Constraints */}
        <div className="p-5 rounded-md border-2 border-destructive/20 bg-card">
          <p className="text-sm font-body font-medium text-destructive mb-3">✗ Route Constraints</p>
          <ul className="space-y-2 text-sm font-body leading-reading text-muted-foreground">
            <li className="flex gap-2"><span className="text-destructive">✗</span> No dashed or dotted route lines</li>
            <li className="flex gap-2"><span className="text-destructive">✗</span> No directional arrows on the route</li>
            <li className="flex gap-2"><span className="text-destructive">✗</span> No glowing, pulsing, or animated vessel marker</li>
            <li className="flex gap-2"><span className="text-destructive">✗</span> No ETA or distance overlays on the map</li>
            <li className="flex gap-2"><span className="text-destructive">✗</span> No speed indicators</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RoutePosition;
