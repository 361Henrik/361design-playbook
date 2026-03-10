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

const FilteringCategories = () => {
  return (
    <div className="px-8 py-10 max-w-5xl">
      <PageHeader
        title="Filtering & Categories"
        description="The POI category system and filtering behavior. Guests see a curated default — they can reveal more, but never face clutter."
      />

      <div className="space-y-8">
        {/* Category system */}
        <div>
          <h2 className="font-display text-xl font-medium tracking-headline leading-section text-foreground mb-4">POI Categories</h2>
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
        </div>

        {/* Filter UI */}
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

        {/* Default visibility */}
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

        {/* Operator control */}
        <div className="p-5 rounded-md border border-border bg-card">
          <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-2">Operator Control</h3>
          <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose">
            Operators can customize which categories are default-on per route. They can also create custom categories for specific voyages (e.g., "Wine Region" for a Douro cruise). Custom categories follow the same visual rules as standard categories.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FilteringCategories;
