import { PageHeader } from "@/components/PageHeader";

const DepthSurfaces = () => (
  <div className="px-space-5 md:px-space-8 py-space-8 max-w-content">
    <PageHeader
      title="Depth & Surfaces"
      description="Layers create structure. Depth is communicated through contrast and containment — not through dramatic shadows or visual weight."
    />

    <div className="space-y-8">
      <div className="p-5 rounded-md border border-border bg-card">
        <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-2">
          Philosophy
        </h3>
        <p className="text-sm font-body leading-reading text-foreground max-w-prose">
          The interface is built on a quiet layer model. The background is the foundation, cards rest gently above it, and overlays float above everything. The transitions between layers should feel like turning pages — not like opening drawers.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-medium tracking-headline text-foreground">
          Surface Hierarchy
        </h2>
        <div className="space-y-3">
          {[
            {
              level: "Background",
              description: "The base canvas. Neutral, unadorned, slightly warm in light mode. All content sits above this.",
            },
            {
              level: "Card",
              description: "The primary content container. Separated by a 1px border and a barely perceptible background shift. Cards feel present but weightless.",
            },
            {
              level: "Overlay",
              description: "Dialogs, popovers, and dropdown menus. Slightly elevated with a soft shadow (0 4px 12px) and a backdrop that dims the layer beneath by roughly 30%.",
            },
          ].map((s) => (
            <div key={s.level} className="p-4 rounded-md border border-border bg-card flex gap-4 items-baseline">
              <span className="font-body text-sm font-medium text-card-foreground w-28 shrink-0">{s.level}</span>
              <p className="text-sm font-body leading-reading text-foreground">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Visual example */}
      <section className="space-y-4">
        <h2 className="font-display text-xl font-medium tracking-headline text-foreground">
          Visual Example
        </h2>
        <div className="relative rounded-md bg-muted/40 p-8 border border-border">
          <p className="text-xs uppercase tracking-widest font-body font-medium text-muted-foreground/50 mb-4">Background</p>
          <div className="rounded-md border border-border bg-card p-5 shadow-sm">
            <p className="text-xs uppercase tracking-widest font-body font-medium text-muted-foreground/50 mb-3">Card</p>
            <div className="rounded-md border border-border bg-popover p-4 shadow-md">
              <p className="text-xs uppercase tracking-widest font-body font-medium text-muted-foreground/50">Overlay</p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-medium tracking-headline text-foreground">
          Principles
        </h2>
        <div className="p-5 rounded-md border border-border bg-card">
          <ul className="space-y-2 text-sm font-body leading-reading text-foreground">
            <li>Prefer border separation over shadow. A 1px border communicates containment without heaviness.</li>
            <li>Shadows are reserved for floating elements (overlays, tooltips). Keep them soft and diffused.</li>
            <li>Never stack more than three visual layers in a single view. Complexity should be managed through navigation, not nesting.</li>
            <li>Use contrast — not blur — to distinguish layers. Background blur effects are fragile and inconsistent across devices.</li>
          </ul>
        </div>
      </section>
    </div>
  </div>
);

export default DepthSurfaces;
