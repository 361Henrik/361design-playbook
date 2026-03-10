import { PageHeader } from "@/components/PageHeader";

const labelHierarchy = [
  { level: 1, type: "Major landmark", size: "14px", weight: "Medium", example: "Mont Blanc, Etna, Preikestolen" },
  { level: 2, type: "Island / large feature", size: "13px", weight: "Regular", example: "Brač, Korčula, Lofoten" },
  { level: 3, type: "Village / town", size: "12px", weight: "Medium", example: "Vik, Flåm, Kotor" },
  { level: 4, type: "Small island / islet", size: "11px", weight: "Regular", example: "Lokrum, Sveti Stefan" },
  { level: 5, type: "Water feature", size: "12px italic", weight: "Regular", example: "Sognefjorden, Adriatic Sea" },
  { level: 6, type: "POI label", size: "10–11px", weight: "Regular", example: "Viking burial site, Lavender field" },
];

const MapLabelsGeography = () => {
  return (
    <div className="px-8 py-10 max-w-5xl">
      <PageHeader
        title="Map Labels & Geography"
        description="Label hierarchy, naming conventions, and visibility rules. Every label is intentional — nothing appears by default."
      />

      <div className="space-y-8">
        {/* Label hierarchy */}
        <div>
          <h2 className="font-display text-xl font-medium tracking-headline leading-section text-foreground mb-4">Label Hierarchy</h2>
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
        </div>

        {/* Naming conventions */}
        <div className="p-5 rounded-md border border-border bg-card">
          <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-3">Naming Conventions</h3>
          <ul className="space-y-2 text-sm font-body leading-reading text-muted-foreground">
            <li>• Use local names with Latin transliteration where needed</li>
            <li>• Include the English name in parentheses only for major landmarks</li>
            <li>• Water features use italic styling to distinguish from land</li>
            <li>• Never abbreviate geographic feature names</li>
            <li>• Use title case for all labels</li>
          </ul>
        </div>

        {/* Visibility rules */}
        <div className="p-5 rounded-md border border-border bg-card">
          <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-3">Visibility Rules</h3>
          <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose mb-3">
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

        {/* Collision */}
        <div className="p-5 rounded-md border border-border bg-card">
          <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-2">Label Collision</h3>
          <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose">
            When labels overlap, higher-level labels take priority. Lower-level labels are hidden — never truncated, never reduced in size. The map should always feel spacious and readable.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MapLabelsGeography;
