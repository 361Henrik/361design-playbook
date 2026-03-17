import { PageHeader } from "@/components/PageHeader";

const principles = [
  {
    title: "Route First",
    description: "The journey route is the primary visual element. Everything else supports it. The route line anchors the guest's spatial understanding.",
  },
  {
    title: "Landscape Before Data",
    description: "Show the landscape — water, land, mountains, islands — before any data points. The map should feel like looking out the window, not reading a spreadsheet.",
  },
  {
    title: "Calm Base Map",
    description: "The base map uses muted, desaturated tones. No bright fills, no busy patterns. The terrain whispers — the route and POIs speak.",
  },
  {
    title: "Corridor Only",
    description: "Only the scenic corridor around the route is shown. The map does not display the entire region. Irrelevant geography is hidden to maintain focus and elegance.",
  },
  {
    title: "Curated Discovery",
    description: "Every marker, label, and POI is intentionally placed by the operator. Nothing appears automatically. The map is an editorial product, not a data dump.",
  },
  {
    title: "Readable at a Glance",
    description: "Guests aged 65–85 must understand the map instantly. Large labels, high contrast, minimal clutter. If it requires study, it has failed.",
  },
];

const MapPrinciples = () => {
  return (
    <div className="px-space-5 md:px-space-8 py-space-8 max-w-content">
      <PageHeader
        title="Map Principles"
        description="The map is not a navigation tool. It is a landscape awareness and storytelling tool that helps guests understand where they are, what they see, what is nearby, and where they are along the journey."
      />

      <div className="space-y-8">
        {/* Purpose */}
        <div className="p-5 rounded-md border border-border bg-card">
          <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-2">Purpose</h3>
          <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose">
            The Curated Lens map exists to create a sense of place. It answers four questions for the guest:
          </p>
          <ul className="mt-3 space-y-1.5 text-sm font-body leading-reading text-muted-foreground">
            <li>• Where am I right now?</li>
            <li>• What am I seeing outside the window?</li>
            <li>• What is nearby worth knowing about?</li>
            <li>• Where am I along the journey?</li>
          </ul>
        </div>

        {/* Feeling */}
        <div className="p-5 rounded-md border border-border bg-card">
          <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-2">Visual Feeling</h3>
          <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose">
            The map must feel calm, elegant, editorial, minimal, and readable for older guests. The visual clarity should be closer to Apple Maps than to dense navigation or nautical charts. Every element earns its place through restraint.
          </p>
        </div>

        {/* Principles grid */}
        <div>
          <h2 className="font-display text-xl font-medium tracking-headline leading-section text-foreground mb-4">Core Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {principles.map((p) => (
              <div key={p.title} className="p-5 rounded-md border border-border bg-card">
                <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-2">{p.title}</h3>
                <p className="text-sm font-body leading-reading text-muted-foreground">{p.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Anti-patterns */}
        <div className="p-5 rounded-md border-2 border-destructive/20 bg-card">
          <p className="text-sm font-body font-medium text-destructive mb-3">✗ The Map Must Never</p>
          <ul className="space-y-2 text-sm font-body leading-reading text-muted-foreground">
            <li className="flex gap-2"><span className="text-destructive">✗</span> Feel like a GPS or car navigation system</li>
            <li className="flex gap-2"><span className="text-destructive">✗</span> Show dense, unfiltered geographic data</li>
            <li className="flex gap-2"><span className="text-destructive">✗</span> Display areas far outside the scenic corridor</li>
            <li className="flex gap-2"><span className="text-destructive">✗</span> Use bright, saturated, or playful styling</li>
            <li className="flex gap-2"><span className="text-destructive">✗</span> Require pinching, zooming, or effort to read</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MapPrinciples;
