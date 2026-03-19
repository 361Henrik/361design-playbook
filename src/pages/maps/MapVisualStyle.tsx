import { PageHeader } from "@/components/PageHeader";

const colorTokens = [
  { name: "Water", value: "#D4E4ED", description: "Desaturated blue-grey. Calm, not bright." },
  { name: "Land", value: "#F0EDE8", description: "Warm off-white / parchment. Barely visible terrain." },
  { name: "Terrain shadow", value: "#E2DDD6", description: "Subtle hillshade for depth, not topographic detail." },
  { name: "Route — upcoming", value: "#8B8680", description: "Muted warm grey. Present but not dominant." },
  { name: "Route — completed", value: "#1A1A1A", description: "Near-black. Clear progress indication." },
  { name: "Vessel position", value: "#1A1A1A", description: "Matches completed route. Solid, confident." },
  { name: "POI marker", value: "#5C5650", description: "Dark warm grey. Refined, not bright." },
  { name: "POI marker — selected", value: "#1A1A1A", description: "Full contrast when tapped / active." },
  { name: "Label text", value: "#6B6560", description: "Warm mid-grey. Readable but quiet." },
  { name: "Corridor boundary", value: "transparent", description: "The corridor is implied, never drawn." },
];

const MapVisualStyle = () => {
  return (
    <div className="px-space-5 md:px-space-8 py-space-8 max-w-content">
      <PageHeader
        title="Map Visual Style"
        description="Muted, desaturated, editorial. The map should feel like a premium illustrated guide — not a navigation screen."
      />

      <div className="space-y-8">
        {/* Color palette */}
        <div>
          <h2 className="font-display text-xl font-medium tracking-headline leading-section text-foreground mb-4">Map Color Palette</h2>
          <div className="space-y-2">
            {colorTokens.map((token) => (
              <div key={token.name} className="flex items-center gap-4 p-4 rounded-md border border-border bg-card">
                <div
                  className="w-10 h-10 rounded border border-border shrink-0"
                  style={{ backgroundColor: token.value === "transparent" ? "transparent" : token.value }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-body font-medium text-card-foreground">{token.name}</p>
                  <p className="text-xs font-body text-muted-foreground">{token.description}</p>
                </div>
                <span className="text-xs font-mono text-muted-foreground shrink-0">{token.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Typography */}
        <div className="p-5 rounded-md border border-border bg-card">
          <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-3">Map Typography</h3>
          <div className="space-y-3">
            <div className="px-4 py-3 rounded bg-primary/5 border border-primary/10">
              <p className="text-xs font-body font-medium text-card-foreground mb-1">Geographic labels (islands, mountains)</p>
              <p className="text-sm font-mono text-muted-foreground">12–14px · Regular · Warm grey · Letter-spacing +0.02em</p>
            </div>
            <div className="px-4 py-3 rounded bg-primary/5 border border-primary/10">
              <p className="text-xs font-body font-medium text-card-foreground mb-1">Water labels (fjords, seas, rivers)</p>
              <p className="text-sm font-mono text-muted-foreground">11–13px · Italic · Blue-grey · Letter-spacing +0.04em</p>
            </div>
            <div className="px-4 py-3 rounded bg-primary/5 border border-primary/10">
              <p className="text-xs font-body font-medium text-card-foreground mb-1">Village / town labels</p>
              <p className="text-sm font-mono text-muted-foreground">11–12px · Medium · Dark grey · Letter-spacing +0.01em</p>
            </div>
            <div className="px-4 py-3 rounded bg-primary/5 border border-primary/10">
              <p className="text-xs font-body font-medium text-card-foreground mb-1">POI labels</p>
              <p className="text-sm font-mono text-muted-foreground">10–11px · Regular · Warm grey · Below marker</p>
            </div>
          </div>
        </div>

        {/* Constraints */}
        <div className="p-5 rounded-md border-2 border-border bg-card">
          <p className="text-sm font-body font-medium text-foreground mb-3">✗ Visual Constraints</p>
          <ul className="space-y-2 text-sm font-body leading-reading text-foreground">
            <li className="flex gap-2"><span className="text-foreground">✗</span> No saturated or bright colors on the base map</li>
            <li className="flex gap-2"><span className="text-foreground">✗</span> No gradients on land or water fills</li>
            <li className="flex gap-2"><span className="text-foreground">✗</span> No drop shadows on markers or labels</li>
            <li className="flex gap-2"><span className="text-foreground">✗</span> No outline strokes on land masses</li>
            <li className="flex gap-2"><span className="text-foreground">✗</span> No pattern fills or textures</li>
            <li className="flex gap-2"><span className="text-foreground">✗</span> No colored category markers — all markers use the neutral palette</li>
            <li className="flex gap-2"><span className="text-foreground">✗</span> No terracotta in any map element — markers, routes, overlays, or highlights</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MapVisualStyle;
