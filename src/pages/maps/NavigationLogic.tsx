import { PageHeader } from "@/components/PageHeader";

const categories = [
  { name: "Nature", description: "Mountains, waterfalls, glaciers, national parks, scenic viewpoints", defaultVisible: true },
  { name: "Culture", description: "Churches, castles, museums, historic sites, monuments", defaultVisible: true },
  { name: "Village", description: "Towns, villages, harbors, fishing communities", defaultVisible: true },
  { name: "Activity", description: "Excursions, hiking trails, kayaking, cycling routes", defaultVisible: false },
  { name: "Dining", description: "Restaurants, cafés, local food experiences", defaultVisible: false },
  { name: "Maritime", description: "Lighthouses, harbors, shipwrecks, maritime heritage", defaultVisible: true },
  { name: "Wildlife", description: "Bird colonies, whale watching, seal colonies, wildlife reserves", defaultVisible: false },
];

const NavigationLogic = () => {
  return (
    <div className="px-space-5 md:px-space-8 py-space-8 max-w-content">
      <PageHeader
        title="Navigation Logic"
        description="Filtering behavior, category structure, route display, and position handling. The operational rules that govern how the map functions."
      />

      <div className="space-y-10">
        {/* ── Filtering & Categories ── */}
        <section className="space-y-6">
          <h2 className="font-display text-xl font-medium tracking-headline leading-section text-foreground">Filtering & Categories</h2>

          <div className="space-y-2">
            {categories.map((cat) => (
              <div key={cat.name} className="flex items-center gap-4 p-4 rounded-md border border-border bg-card">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-body font-medium text-card-foreground">{cat.name}</p>
                    {cat.defaultVisible && (
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-[10px] font-body font-medium text-primary">Default ON</span>
                    )}
                  </div>
                  <p className="text-xs font-body text-muted-foreground mt-1">{cat.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-md border border-border bg-card">
            <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-3">Filter UI Behavior</h3>
            <ul className="space-y-2 text-sm font-body leading-reading text-muted-foreground">
              <li>• Filter bar sits at the top or bottom of the map, depending on device</li>
              <li>• Categories are shown as pill-shaped toggles</li>
              <li>• Active categories use filled style; inactive use outline style</li>
              <li>• Toggling a category on/off animates markers in/out (fade, 300ms)</li>
              <li>• Maximum 4 categories visible in filter bar; overflow scrolls horizontally</li>
              <li>• "All" toggle resets to default visibility</li>
            </ul>
          </div>

          <div className="p-5 rounded-md border border-border bg-card">
            <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-3">Default Visibility</h3>
            <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose mb-3">
              On first load, only default-on categories are visible. This ensures the map feels clean and curated. Guests can enable additional categories — but the default must never feel cluttered.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="px-4 py-3 rounded bg-primary/5 border border-primary/10">
                <p className="text-xs font-body font-medium text-card-foreground mb-1">Default ON</p>
                <p className="text-sm font-body text-muted-foreground">Nature, Culture, Village, Maritime</p>
              </div>
              <div className="px-4 py-3 rounded bg-muted border border-border">
                <p className="text-xs font-body font-medium text-card-foreground mb-1">Default OFF</p>
                <p className="text-sm font-body text-muted-foreground">Activity, Dining, Wildlife</p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-md border border-border bg-card">
            <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-2">Operator Control</h3>
            <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose">
              Operators can customize which categories are default-on per route. They can also create custom categories for specific voyages (e.g., "Wine Region" for a Douro cruise). Custom categories follow the same visual rules as standard categories.
            </p>
          </div>
        </section>

        {/* ── Route & Position ── */}
        <section className="space-y-6">
          <h2 className="font-display text-xl font-medium tracking-headline leading-section text-foreground">Route & Position</h2>

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
        </section>
      </div>
    </div>
  );
};

export default NavigationLogic;