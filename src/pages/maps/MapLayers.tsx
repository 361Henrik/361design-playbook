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

const MapLayers = () => {
  return (
    <div className="px-8 py-10 max-w-5xl">
      <PageHeader
        title="Map Layers"
        description="The map is structured as five distinct layers, from base geography up to interaction. Each layer has a defined purpose and visual priority."
      />

      <div className="space-y-6">
        {/* Layer Stack */}
        <div className="p-5 rounded-md border border-border bg-card">
          <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-3">Layer Stack</h3>
          <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose mb-4">
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

        {/* Individual layers */}
        {layers.map((layer) => (
          <div key={layer.number} className="p-5 rounded-md border border-border bg-card">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-xs font-mono text-muted-foreground">Layer {layer.number}</span>
              <h3 className="font-display text-base font-medium tracking-headline text-card-foreground">{layer.title}</h3>
            </div>
            <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose mb-3">
              {layer.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {layer.items.map((item) => (
                <span key={item} className="px-3 py-1 rounded-full bg-muted border border-border text-xs font-body text-muted-foreground">{item}</span>
              ))}
            </div>
          </div>
        ))}

        {/* Rendering rule */}
        <div className="p-5 rounded-md border-2 border-destructive/20 bg-card">
          <p className="text-sm font-body font-medium text-destructive mb-3">✗ Layer Rules</p>
          <ul className="space-y-2 text-sm font-body leading-reading text-muted-foreground">
            <li className="flex gap-2"><span className="text-destructive">✗</span> Never merge layers — each layer has distinct rendering logic</li>
            <li className="flex gap-2"><span className="text-destructive">✗</span> Never show POI layer without the route layer visible</li>
            <li className="flex gap-2"><span className="text-destructive">✗</span> Never allow interaction layer to obscure the vessel position</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MapLayers;
