import { PageHeader } from "@/components/PageHeader";

const DynamicScenicCorridor = () => {
  return (
    <div className="px-8 py-10 max-w-5xl">
      <PageHeader
        title="Dynamic Scenic Corridor"
        description="The map uses a Dynamic Scenic Corridor model instead of a fixed width. The corridor defines the visible map area around the route and adapts depending on landscape visibility."
      />

      <div className="space-y-8">
        {/* Concept */}
        <div className="p-5 rounded-md border border-border bg-card">
          <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-2">Concept</h3>
          <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose">
            The scenic corridor is a curated envelope around the route. It determines what the guest sees on the map at any point along the journey. Rather than showing a fixed-width strip, the corridor expands and contracts based on what is actually visible and worth showing.
          </p>
        </div>

        {/* Standard Corridor */}
        <div className="p-5 rounded-md border border-border bg-card">
          <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-3">Standard Corridor</h3>
          <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose mb-4">
            The default route view. Shows landscape near the vessel — nearby islands, villages, bridges, hills, and local POIs.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="px-4 py-3 rounded bg-primary/5 border border-primary/10">
              <p className="text-xs font-body font-medium text-card-foreground mb-1">River Cruise</p>
              <p className="text-sm font-mono text-muted-foreground">3–6 km width</p>
            </div>
            <div className="px-4 py-3 rounded bg-primary/5 border border-primary/10">
              <p className="text-xs font-body font-medium text-card-foreground mb-1">Coastal Sailing</p>
              <p className="text-sm font-mono text-muted-foreground">5–10 km width</p>
            </div>
          </div>
          <p className="text-xs font-body text-muted-foreground mt-3">
            Focus: nearby islands, villages, bridges, hills, local POIs.
          </p>
        </div>

        {/* Scenic Expansion */}
        <div className="p-5 rounded-md border border-border bg-card">
          <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-3">Scenic Expansion</h3>
          <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose mb-4">
            Used when important landmarks are visible farther away. The corridor widens locally to include the distant landmark, and its label appears.
          </p>
          <div className="space-y-2">
            <p className="text-xs font-body font-medium text-card-foreground">Trigger Examples</p>
            <div className="flex flex-wrap gap-2">
              {["Major mountain", "Volcano", "Glacier", "Famous island", "Cathedral or castle"].map((t) => (
                <span key={t} className="px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-xs font-body text-card-foreground">{t}</span>
              ))}
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <p className="text-xs font-body font-medium text-card-foreground">Behavior</p>
            <ul className="space-y-1.5 text-sm font-body leading-reading text-muted-foreground">
              <li>• Corridor widens locally around the landmark</li>
              <li>• Distant landmark becomes visible on the map</li>
              <li>• Labels appear for that landmark</li>
              <li>• The widening feels smooth and natural — no sudden jumps</li>
            </ul>
          </div>
          <div className="mt-4 p-4 rounded bg-muted/50 border border-border">
            <p className="text-xs font-body font-medium text-card-foreground mb-2">Scenario Examples</p>
            <ul className="space-y-1 text-sm font-body text-muted-foreground">
              <li>• Mont Blanc visible from a valley — corridor widens south</li>
              <li>• Etna visible from the sea — corridor extends inland</li>
              <li>• Glacier visible from a fjord — corridor reaches up the valley</li>
            </ul>
          </div>
        </div>

        {/* Tight Corridor */}
        <div className="p-5 rounded-md border border-border bg-card">
          <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-3">Tight Corridor</h3>
          <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose mb-3">
            Used when there are no important distant features. Reduces clutter, keeps the map elegant, and emphasizes immediate surroundings.
          </p>
          <div className="space-y-2">
            <p className="text-xs font-body font-medium text-card-foreground">Typical Locations</p>
            <div className="flex flex-wrap gap-2">
              {["Open sea", "Long river sections", "Empty terrain"].map((t) => (
                <span key={t} className="px-3 py-1 rounded-full bg-muted border border-border text-xs font-body text-muted-foreground">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Corridor Editing */}
        <div className="p-5 rounded-md border border-border bg-card">
          <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-3">Corridor Editing</h3>
          <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose mb-3">
            Operators must be able to manually adjust corridor width. Route designers should be able to:
          </p>
          <ul className="space-y-1.5 text-sm font-body leading-reading text-muted-foreground">
            <li>• Widen corridor locally to include distant landmarks</li>
            <li>• Narrow corridor locally to reduce clutter</li>
            <li>• Include specific distant landmarks by exception</li>
            <li>• Exclude irrelevant areas</li>
          </ul>
          <p className="text-sm font-body leading-reading text-muted-foreground mt-3 max-w-prose">
            The corridor therefore becomes a curated scenic envelope around the route — not an automatic buffer, but an editorial decision.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DynamicScenicCorridor;
