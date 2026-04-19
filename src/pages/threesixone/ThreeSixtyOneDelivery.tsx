import { PageHeader } from "@/components/PageHeader";

const assets = [
  {
    title: "Workflow diagram",
    use: "Build → ship sequences. Linear left-to-right. Mechanical Pipeline + Run + Ship glyphs on transitions.",
  },
  {
    title: "Service blueprint",
    use: "Three swimlanes: User · Frontstage · Backstage. Touchpoints as Node glyphs; handoffs as Handoff glyphs.",
  },
  {
    title: "System map",
    use: "Nodes and edges. Cluster by responsibility (data, agent, interface). Single-color Charcoal; one Bronze highlight for focal cluster.",
  },
  {
    title: "Status / progress visual",
    use: "Three-state badge: Planned (outline) · In progress (Terracotta dot) · Shipped (Bronze check). No percentage bars.",
  },
];

export default function ThreeSixtyOneDelivery() {
  return (
    <div className="px-space-5 md:px-space-8 py-space-8 max-w-content">
      <PageHeader
        title="Delivery Assets"
        description="Reusable visual patterns for communicating systems and progress: workflow diagrams, service blueprints, system maps, and status visuals."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-space-6">
        {assets.map((a) => (
          <article key={a.title} className="p-5 rounded-md border border-border bg-card">
            <h3 className="font-display text-base font-medium tracking-headline text-foreground mb-2">
              {a.title}
            </h3>
            <p className="text-sm font-body leading-reading text-muted-foreground">{a.use}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
