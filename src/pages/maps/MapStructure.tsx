import { PageHeader } from "@/components/PageHeader";

const layers = [
  {
    number: 1,
    title: "Base Geography",
    description: "The foundational layer. Water, land, and minimal terrain shading. Muted and desaturated — it provides spatial context without competing with content layers.",
    items: ["Water bodies", "Land masses", "Minimal terrain relief"],
  },
  {
    number: 2,
    title: "Landscape Labels",
    description: "Named geographic features visible from the vessel. These labels help guests identify what they see outside the window.",
    items: ["Islands & islets", "Skerries", "Hills & mountains", "Villages", "Fjords", "Visible landmarks"],
  },
  {
    number: 3,
    title: "Route Layer",
    description: "The journey line and vessel position. The most prominent visual element on the map.",
    items: ["Full route line", "Completed route segment", "Current vessel position"],
  },
  {
    number: 4,
    title: "POI Layer",
    description: "Curated points of interest selected by the operator. Each POI uses a category icon from the approved icon set.",
    items: ["Curated POIs", "Category icons", "Operator-selected markers"],
  },
  {
    number: 5,
    title: "Interaction Layer",
    description: "The response layer for guest interaction. Appears when a guest taps a marker or interacts with the map.",
    items: ["Selected marker state", "Information card", "Filtering states"],
  },
];

const labelHierarchy = [
  { level: 1, type: "Major landmark", size: "14px", weight: "Medium", example: "Mont Blanc, Etna, Preikestolen" },
  { level: 2, type: "Island / large feature", size: "13px", weight: "Regular", example: "Brač, Korčula, Lofoten" },
  { level: 3, type: "Village / town", size: "12px", weight: "Medium", example: "Vik, Flåm, Kotor" },
  { level: 4, type: "Small island / islet", size: "11px", weight: "Regular", example: "Lokrum, Sveti Stefan" },
  { level: 5, type: "Water feature", size: "12px italic", weight: "Regular", example: "Sognefjorden, Adriatic Sea" },
  { level: 6, type: "POI label", size: "10–11px", weight: "Regular", example: "Viking burial site, Lavender field" },
];

const MapStructure = () => {
  return (
    <div className="px-space-5 md:px-space-8 py-space-8 max-w-content">
      <PageHeader
        title="Map Structure"
        description="Layer hierarchy, label logic, and geographic representation rules. The structural foundation that defines how the map is built."
      />

      <div className="space-y-10">
        {/* ── Layer Hierarchy ── */}
        <section className="space-y-6">
          <h2 className="font-display text-xl font-medium tracking-headline leading-section text-foreground">Layer Hierarchy</h2>

          <div className="p-5 rounded-md border border-border bg-card">
            <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-3">Layer Stack</h3>
            <p className="text-sm font-body leading-reading text-foreground max-w-prose mb-4">
              Layers are rendered bottom-to-top. Higher layers visually sit above lower layers. The base geography is always present; upper layers are conditionally shown based on zoom level, corridor state, and guest interaction.
            </p>
            <div className="flex flex-col gap-1">
              {[...layers].reverse().map((layer) => (
                <div key={layer.number} className="flex items-center gap-3 px-4 py-2.5 rounded bg-primary/5 border border-primary/10">
                  <span className="text-xs font-mono text-muted-foreground w-6">L{layer.number}</span>
                  <span className="text-sm font-body font-medium text-card-foreground">{layer.title}</span>
                </div>
              ))}
            </div>
          </div>

          {layers.map((layer) => (
            <div key={layer.number} className="p-5 rounded-md border border-border bg-card">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-xs font-mono text-muted-foreground">Layer {layer.number}</span>
                <h3 className="font-display text-base font-medium tracking-headline text-card-foreground">{layer.title}</h3>
              </div>
              <p className="text-sm font-body leading-reading text-foreground max-w-prose mb-3">
                {layer.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {layer.items.map((item) => (
                  <span key={item} className="px-3 py-1 rounded-full bg-muted border border-border text-xs font-body text-muted-foreground">{item}</span>
                ))}
              </div>
            </div>
          ))}

          <div className="p-5 rounded-md border-2 border-destructive/20 bg-card">
            <p className="text-sm font-body font-medium text-destructive mb-3">✗ Layer Rules</p>
            <ul className="space-y-2 text-sm font-body leading-reading text-foreground">
              <li className="flex gap-2"><span className="text-destructive">✗</span> Never merge layers — each layer has distinct rendering logic</li>
              <li className="flex gap-2"><span className="text-destructive">✗</span> Never show POI layer without the route layer visible</li>
              <li className="flex gap-2"><span className="text-destructive">✗</span> Never allow interaction layer to obscure the vessel position</li>
            </ul>
          </div>
        </section>

        {/* ── Label Logic ── */}
        <section className="space-y-6">
          <h2 className="font-display text-xl font-medium tracking-headline leading-section text-foreground">Label Logic</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Level</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Type</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Size</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Weight</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Example</th>
                </tr>
              </thead>
              <tbody>
                {labelHierarchy.map((row) => (
                  <tr key={row.level} className="border-b border-border/50">
                    <td className="py-3 px-4 font-mono text-xs text-muted-foreground">L{row.level}</td>
                    <td className="py-3 px-4 text-card-foreground">{row.type}</td>
                    <td className="py-3 px-4 font-mono text-xs text-muted-foreground">{row.size}</td>
                    <td className="py-3 px-4 text-muted-foreground">{row.weight}</td>
                    <td className="py-3 px-4 text-muted-foreground">{row.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-5 rounded-md border border-border bg-card">
            <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-3">Naming Conventions</h3>
            <ul className="space-y-2 text-sm font-body leading-reading text-foreground">
              <li>• Use local names with Latin transliteration where needed</li>
              <li>• Include the English name in parentheses only for major landmarks</li>
              <li>• Water features use italic styling to distinguish from land</li>
              <li>• Never abbreviate geographic feature names</li>
              <li>• Use title case for all labels</li>
            </ul>
          </div>

          <div className="p-5 rounded-md border border-border bg-card">
            <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-3">Visibility Rules</h3>
            <p className="text-sm font-body leading-reading text-foreground max-w-prose mb-3">
              Labels appear and disappear based on corridor state and zoom level. The system prevents label collision and clutter.
            </p>
            <div className="space-y-3">
              <div className="px-4 py-3 rounded bg-primary/5 border border-primary/10">
                <p className="text-xs font-body font-medium text-card-foreground mb-1">Always visible</p>
                <p className="text-sm font-body text-muted-foreground">Major landmarks (L1), current vessel position label</p>
              </div>
              <div className="px-4 py-3 rounded bg-primary/5 border border-primary/10">
                <p className="text-xs font-body font-medium text-card-foreground mb-1">Visible in standard + expanded corridor</p>
                <p className="text-sm font-body text-muted-foreground">Islands (L2), villages (L3), water features (L5)</p>
              </div>
              <div className="px-4 py-3 rounded bg-primary/5 border border-primary/10">
                <p className="text-xs font-body font-medium text-card-foreground mb-1">Visible only when zoomed in</p>
                <p className="text-sm font-body text-muted-foreground">Small islets (L4), POI labels (L6)</p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-md border border-border bg-card">
            <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-2">Label Collision</h3>
            <p className="text-sm font-body leading-reading text-foreground max-w-prose">
              When labels overlap, higher-level labels take priority. Lower-level labels are hidden — never truncated, never reduced in size. The map should always feel spacious and readable.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MapStructure;