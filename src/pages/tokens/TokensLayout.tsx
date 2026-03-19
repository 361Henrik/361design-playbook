import { PageHeader } from "@/components/PageHeader";
import { CopyButton } from "@/components/CopyButton";
import { DosDonts } from "@/components/DosDonts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TokenExamplesTab } from "@/components/tokens/TokenExamplesTab";

const widthTokens = [
  { name: "max-width-reading", value: "720px", tailwind: "max-w-reading", desc: "Optimal width for long-form text and editorial content." },
  { name: "max-width-content", value: "1100px", tailwind: "max-w-content", desc: "Primary content container for dashboards and pages." },
  { name: "max-width-wide", value: "1280px", tailwind: "max-w-wide", desc: "Full-width layouts with sidebars or multi-panel views." },
  { name: "max-width-prose", value: "52ch", tailwind: "max-w-prose", desc: "Maximum paragraph width for readability." },
];

const gridTokens = [
  { name: "Desktop", columns: 12, gutter: "24px (space-5)", breakpoint: "≥1024px" },
  { name: "Tablet", columns: 8, gutter: "16px (space-4)", breakpoint: "768–1023px" },
  { name: "Mobile", columns: 4, gutter: "16px (space-4)", breakpoint: "<768px" },
];

const TokensLayout = () => {
  return (
    <div className="px-space-5 md:px-space-8 py-space-8 max-w-content">
      <PageHeader
        title="Foundations · Layout"
        description="Page widths, grid columns, and gutters that define the spatial framework. Keep text in controlled columns. Never use full-width paragraphs."
      />

      <Tabs defaultValue="system" className="mt-6">
        <TabsList>
          <TabsTrigger value="system">Layout System</TabsTrigger>
          <TabsTrigger value="widths">Width Examples</TabsTrigger>
          <TabsTrigger value="grids">Grid Examples</TabsTrigger>
          <TabsTrigger value="surfaces">Surface Pairing</TabsTrigger>
          <TabsTrigger value="examples">Code Examples</TabsTrigger>
        </TabsList>

        {/* ── Layout System tab ── */}
        <TabsContent value="system">
          <div className="p-5 rounded-md border border-border bg-card mb-8">
            <h3 className="font-display text-h3 text-card-foreground mb-4">Page Width Tokens</h3>
            <div className="space-y-4">
              {widthTokens.map((w) => (
                <div key={w.name} className="flex items-start gap-4">
                  <span className="text-label font-body text-foreground w-44 shrink-0">{w.name}</span>
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-1">
                      <CopyButton value={w.tailwind} label={`tw: ${w.tailwind}`} />
                      <CopyButton value={w.value} label={w.value} />
                    </div>
                    <p className="text-body-sm font-body text-foreground">{w.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-md border border-border bg-card mb-8">
            <h3 className="font-display text-h3 text-card-foreground mb-4">Width Comparison</h3>
            <div className="space-y-3">
              {widthTokens.slice(0, 3).map((w, i) => (
                <div key={w.name} className="space-y-1">
                  <span className="text-caption font-body text-muted-foreground">{w.name} ({w.value})</span>
                  <div className="h-4 rounded-sm bg-deep-green/15 border border-deep-green/25" style={{ width: `${[56, 86, 100][i]}%` }} />
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-md border border-border bg-card mb-8">
            <h3 className="font-display text-h3 text-card-foreground mb-4">Grid System</h3>
            <div className="space-y-4">
              {gridTokens.map((g) => (
                <div key={g.name} className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-label font-body text-foreground w-20">{g.name}</span>
                    <span className="text-caption font-body text-muted-foreground">{g.columns} columns · gutter {g.gutter} · {g.breakpoint}</span>
                  </div>
                  <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${g.columns}, 1fr)` }}>
                    {Array.from({ length: g.columns }).map((_, i) => (
                      <div key={i} className="h-6 rounded-sm bg-deep-green/10 border border-deep-green/20" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-md border border-border bg-card mb-8">
            <h3 className="font-display text-h3 text-card-foreground mb-3">Text Density Rules</h3>
            <ul className="space-y-2 text-body-sm font-body text-foreground max-w-prose">
              <li className="flex gap-2"><span className="text-accent shrink-0">→</span> One idea per section. No multi-topic paragraphs.</li>
              <li className="flex gap-2"><span className="text-accent shrink-0">→</span> Headings kept short — ideally under 6 words.</li>
              <li className="flex gap-2"><span className="text-accent shrink-0">→</span> Max paragraph width: 52 characters (max-w-prose).</li>
              <li className="flex gap-2"><span className="text-accent shrink-0">→</span> One hero image OR one diagram per section, not both.</li>
            </ul>
          </div>

          <section className="mt-12">
            <h2 className="font-display text-h2 text-foreground mb-4">Do / Don't</h2>
            <DosDonts
              dos={[
                "Use max-w-reading (720px) for editorial content pages.",
                "Use max-w-content (1100px) for dashboard and app content areas.",
                "Use 12-column grid on desktop, 8 on tablet, 4 on mobile.",
                "Use space-5 (24px) gutters on desktop, space-4 (16px) on mobile.",
              ]}
              donts={[
                "Never let paragraphs span the full viewport width.",
                "Don't use arbitrary max-widths outside the defined tokens.",
                "Don't place both a hero image and a diagram in the same section.",
                "Don't compress layout to fit more content — edit the content instead.",
              ]}
            />
          </section>
        </TabsContent>

        {/* ── Width Examples tab ── */}
        <TabsContent value="widths">
          <div className="space-y-10">
            {/* max-w-reading */}
            <div className="p-5 rounded-md border border-border bg-card">
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="font-display text-h3 text-card-foreground">max-w-reading · 720px</h3>
                <CopyButton value="max-w-reading" label="tw: max-w-reading" />
              </div>
              <p className="text-caption font-body text-muted-foreground mb-6">Editorial text column — articles, guides, long-form content.</p>

              <div className="border border-border rounded-md overflow-hidden">
                {/* Simulated page */}
                <div className="bg-muted/30 p-6 flex justify-center">
                  <div className="w-full" style={{ maxWidth: "720px" }}>
                    <div className="bg-background border border-border rounded-md p-8 space-y-4">
                      <div className="h-3 w-2/5 rounded bg-deep-green/20" />
                      <div className="h-6 w-4/5 rounded bg-deep-green/30" />
                      <div className="space-y-2 mt-4">
                        <div className="h-2.5 w-full rounded bg-muted-foreground/10" />
                        <div className="h-2.5 w-full rounded bg-muted-foreground/10" />
                        <div className="h-2.5 w-11/12 rounded bg-muted-foreground/10" />
                        <div className="h-2.5 w-4/5 rounded bg-muted-foreground/10" />
                      </div>
                      <div className="space-y-2 mt-4">
                        <div className="h-2.5 w-full rounded bg-muted-foreground/10" />
                        <div className="h-2.5 w-full rounded bg-muted-foreground/10" />
                        <div className="h-2.5 w-3/4 rounded bg-muted-foreground/10" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-2 border-t border-border bg-muted/40 flex items-center gap-3">
                  <span className="text-caption font-body text-muted-foreground">↕ space-8 section gap</span>
                  <span className="text-caption font-body text-muted-foreground">· space-3 text stack</span>
                  <span className="text-caption font-body text-muted-foreground">· H1 Playfair, Body Lexend</span>
                </div>
              </div>
            </div>

            {/* max-w-content */}
            <div className="p-5 rounded-md border border-border bg-card">
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="font-display text-h3 text-card-foreground">max-w-content · 1100px</h3>
                <CopyButton value="max-w-content" label="tw: max-w-content" />
              </div>
              <p className="text-caption font-body text-muted-foreground mb-6">Dashboard layouts — card grids, data tables, multi-panel content.</p>

              <div className="border border-border rounded-md overflow-hidden">
                <div className="bg-muted/30 p-6 flex justify-center">
                  <div className="w-full" style={{ maxWidth: "720px" }}>
                    {/* Header bar */}
                    <div className="bg-background border border-border rounded-t-md px-4 py-3 flex items-center gap-3">
                      <div className="h-3 w-24 rounded bg-deep-green/20" />
                      <div className="flex-1" />
                      <div className="h-3 w-16 rounded bg-muted-foreground/15" />
                    </div>
                    {/* Card grid */}
                    <div className="bg-background border-x border-b border-border rounded-b-md p-6">
                      <div className="grid grid-cols-3 gap-4">
                        {[0, 1, 2].map((i) => (
                          <div key={i} className="border border-border rounded-md p-4 space-y-2">
                            <div className="h-16 rounded bg-deep-green/8 border border-deep-green/15" />
                            <div className="h-2.5 w-3/4 rounded bg-deep-green/20" />
                            <div className="h-2 w-full rounded bg-muted-foreground/10" />
                            <div className="h-2 w-2/3 rounded bg-muted-foreground/10" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-2 border-t border-border bg-muted/40 flex items-center gap-3">
                  <span className="text-caption font-body text-muted-foreground">↔ 3-col grid, gap space-4</span>
                  <span className="text-caption font-body text-muted-foreground">· card padding space-4</span>
                  <span className="text-caption font-body text-muted-foreground">· H2 section title</span>
                </div>
              </div>
            </div>

            {/* max-w-wide */}
            <div className="p-5 rounded-md border border-border bg-card">
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="font-display text-h3 text-card-foreground">max-w-wide · 1280px</h3>
                <CopyButton value="max-w-wide" label="tw: max-w-wide" />
              </div>
              <p className="text-caption font-body text-muted-foreground mb-6">Hero sections, full-width layouts with sidebars, multi-panel views.</p>

              <div className="border border-border rounded-md overflow-hidden">
                <div className="bg-muted/30 p-6 flex justify-center">
                  <div className="w-full" style={{ maxWidth: "720px" }}>
                    {/* Hero block */}
                    <div className="bg-deep-green rounded-t-md p-8 flex flex-col items-center text-center space-y-3">
                      <div className="h-5 w-2/3 rounded bg-cream/20" />
                      <div className="h-3 w-1/2 rounded bg-cream/15" />
                      <div className="flex gap-3 mt-2">
                        <div className="h-8 w-24 rounded bg-cream/20" />
                        <div className="h-8 w-20 rounded border border-cream/20" />
                      </div>
                    </div>
                    {/* Content below hero */}
                    <div className="bg-background border-x border-b border-border rounded-b-md p-6">
                      <div className="grid grid-cols-3 gap-4">
                        {[0, 1, 2].map((i) => (
                          <div key={i} className="text-center space-y-2">
                            <div className="h-8 w-8 mx-auto rounded-full bg-deep-green/10 border border-deep-green/20" />
                            <div className="h-2.5 w-3/4 mx-auto rounded bg-deep-green/15" />
                            <div className="h-2 w-full rounded bg-muted-foreground/10" />
                            <div className="h-2 w-2/3 mx-auto rounded bg-muted-foreground/10" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-2 border-t border-border bg-muted/40 flex items-center gap-3">
                  <span className="text-caption font-body text-muted-foreground">↕ Hero space-8 from content</span>
                  <span className="text-caption font-body text-muted-foreground">· Display heading, Lexend body</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ── Grid Examples tab ── */}
        <TabsContent value="grids">
          <div className="space-y-10">
            {/* 12-column reference */}
            <div className="p-5 rounded-md border border-border bg-card">
              <h3 className="font-display text-h3 text-card-foreground mb-1">12-Column Desktop Grid</h3>
              <p className="text-caption font-body text-muted-foreground mb-5">Base grid with space-5 (24px) gutters. All layout patterns map onto this grid.</p>
              <div className="grid grid-cols-12 gap-1.5">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="space-y-1">
                    <div className="h-12 rounded-sm bg-deep-green/10 border border-deep-green/20" />
                    <span className="block text-center text-[10px] font-body text-muted-foreground">{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pattern: 3-card grid */}
            <div className="p-5 rounded-md border border-border bg-card">
              <h3 className="font-display text-h3 text-card-foreground mb-1">Pattern: 3-Card Grid</h3>
              <p className="text-caption font-body text-muted-foreground mb-5">Each card spans 4 columns. Gap: space-5. Card padding: space-4. Used for feature grids, dashboards.</p>

              <div className="border border-border rounded-md overflow-hidden">
                <div className="bg-muted/30 p-6">
                  {/* Column overlay */}
                  <div className="relative">
                    <div className="absolute inset-0 grid grid-cols-12 gap-1.5 pointer-events-none opacity-30">
                      {Array.from({ length: 12 }).map((_, i) => (
                         <div key={i} className="h-full bg-deep-green/5 border-x border-deep-green/10" />
                      ))}
                    </div>
                    <div className="relative grid grid-cols-3 gap-6">
                      {["Feature A", "Feature B", "Feature C"].map((label) => (
                        <div key={label} className="bg-background border border-border rounded-md p-4 space-y-2">
                          <div className="h-10 rounded bg-deep-green/8 border border-deep-green/15" />
                          <div className="h-2.5 w-3/5 rounded bg-deep-green/20" />
                          <div className="h-2 w-full rounded bg-muted-foreground/10" />
                          <div className="h-2 w-4/5 rounded bg-muted-foreground/10" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="px-4 py-2 border-t border-border bg-muted/40">
                  <span className="text-caption font-body text-muted-foreground">4 + 4 + 4 columns · gap-6 (space-5) · card p-4 (space-4)</span>
                </div>
              </div>
            </div>

            {/* Pattern: Sidebar + Content */}
            <div className="p-5 rounded-md border border-border bg-card">
              <h3 className="font-display text-h3 text-card-foreground mb-1">Pattern: Sidebar + Content</h3>
              <p className="text-caption font-body text-muted-foreground mb-5">Sidebar spans 3 columns (fixed 240–280px), content fills remaining 9 columns. Standard for dashboards and settings.</p>

              <div className="border border-border rounded-md overflow-hidden">
                <div className="bg-muted/30 p-6">
                  <div className="relative">
                    <div className="absolute inset-0 grid grid-cols-12 gap-1.5 pointer-events-none opacity-30">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="h-full bg-deep-green/5 border-x border-deep-green/10" />
                      ))}
                    </div>
                    <div className="relative flex gap-6" style={{ minHeight: 180 }}>
                      {/* Sidebar */}
                      <div className="w-1/4 shrink-0 bg-deep-green rounded-md p-4 space-y-3">
                        <div className="h-3 w-3/4 rounded bg-cream/20" />
                        <div className="space-y-2 mt-4">
                          {["Nav Item 1", "Nav Item 2", "Nav Item 3", "Nav Item 4"].map((item) => (
                            <div key={item} className="h-2.5 w-full rounded bg-cream/12" />
                          ))}
                        </div>
                      </div>
                      {/* Content */}
                      <div className="flex-1 bg-background border border-border rounded-md p-5 space-y-4">
                        <div className="h-4 w-2/5 rounded bg-deep-green/20" />
                        <div className="space-y-2">
                          <div className="h-2.5 w-full rounded bg-muted-foreground/10" />
                          <div className="h-2.5 w-full rounded bg-muted-foreground/10" />
                          <div className="h-2.5 w-3/4 rounded bg-muted-foreground/10" />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          <div className="h-16 rounded border border-border bg-muted/30" />
                          <div className="h-16 rounded border border-border bg-muted/30" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-2 border-t border-border bg-muted/40">
                  <span className="text-caption font-body text-muted-foreground">3 col sidebar (bg-deep-green) + 9 col content (bg-background) · gap space-5</span>
                </div>
              </div>
            </div>

            {/* Pattern: 3-Column Editor */}
            <div className="p-5 rounded-md border border-border bg-card">
              <h3 className="font-display text-h3 text-card-foreground mb-1">Pattern: 3-Column Editor</h3>
              <p className="text-caption font-body text-muted-foreground mb-5">List (3 col) + Editor (6 col) + Preview (3 col). Used for route builders, content editors, approval flows.</p>

              <div className="border border-border rounded-md overflow-hidden">
                <div className="bg-muted/30 p-6">
                  <div className="relative">
                    <div className="absolute inset-0 grid grid-cols-12 gap-1.5 pointer-events-none opacity-30">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="h-full bg-deep-green/5 border-x border-deep-green/10" />
                      ))}
                    </div>
                    <div className="relative grid grid-cols-12 gap-4" style={{ minHeight: 200 }}>
                      {/* List panel */}
                      <div className="col-span-3 bg-background border border-border rounded-md p-3 space-y-2">
                        <div className="h-2.5 w-2/3 rounded bg-deep-green/20 mb-3" />
                        {[0, 1, 2, 3, 4].map((i) => (
                          <div key={i} className={`h-7 rounded px-2 flex items-center ${i === 1 ? "bg-deep-green/10 border border-deep-green/20" : "bg-muted/30"}`}>
                            <div className="h-2 w-4/5 rounded bg-muted-foreground/15" />
                          </div>
                        ))}
                      </div>
                      {/* Editor panel */}
                      <div className="col-span-6 bg-background border border-border rounded-md p-4 space-y-3">
                        <div className="h-3.5 w-1/3 rounded bg-primary/25" />
                        <div className="h-8 w-full rounded border border-border bg-muted/20" />
                        <div className="h-8 w-full rounded border border-border bg-muted/20" />
                        <div className="h-20 w-full rounded border border-border bg-muted/20" />
                        <div className="flex gap-3 mt-2">
                          <div className="h-7 w-20 rounded bg-primary/20" />
                          <div className="h-7 w-16 rounded border border-border" />
                        </div>
                      </div>
                      {/* Preview panel */}
                      <div className="col-span-3 bg-muted/40 border border-border rounded-md p-3 space-y-2">
                        <div className="h-2 w-1/2 rounded bg-muted-foreground/15 mb-2" />
                        <div className="h-24 rounded bg-background border border-border" />
                        <div className="h-2 w-full rounded bg-muted-foreground/10" />
                        <div className="h-2 w-3/4 rounded bg-muted-foreground/10" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-2 border-t border-border bg-muted/40">
                  <span className="text-caption font-body text-muted-foreground">3 + 6 + 3 columns · List / Editor / Preview · gap space-4</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ── Surface Pairing tab ── */}
        <TabsContent value="surfaces">
          <div className="space-y-10">
            <div className="mb-2">
              <h2 className="font-display text-h2 text-foreground mb-2">Surface Pairing</h2>
              <p className="text-body-sm font-body text-foreground max-w-prose">
                Two approved surface types create visual rhythm and information hierarchy. White panels carry primary reading content. Green panels anchor navigation, context, and emphasis.
              </p>
            </div>

            {/* Side-by-side reference */}
            <div className="p-5 rounded-md border border-border bg-card">
              <h3 className="font-display text-h3 text-card-foreground mb-4">Surface Reference</h3>
              <div className="grid grid-cols-2 gap-0 rounded-md overflow-hidden border border-border">
                <div className="p-8 bg-background">
                  <p className="text-caption font-body font-medium text-muted-foreground uppercase tracking-widest mb-2">Primary Surface</p>
                  <p className="text-label font-body text-foreground mb-1">bg-background</p>
                  <p className="text-body-sm font-body text-foreground max-w-prose">Main content, editorial text, forms, data tables. Default reading context.</p>
                </div>
                <div className="p-8 bg-primary text-primary-foreground">
                  <p className="text-caption font-body font-medium text-primary-foreground/60 uppercase tracking-widest mb-2">Anchor Surface</p>
                  <p className="text-label font-body text-primary-foreground mb-1">bg-primary</p>
                  <p className="text-body-sm font-body text-primary-foreground/90 max-w-prose">Navigation, hero sections, quote blocks, contextual anchoring.</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <CopyButton value="bg-background text-foreground" label="Primary Surface" />
                <CopyButton value="bg-primary text-primary-foreground" label="Anchor Surface" />
              </div>
            </div>

            {/* Example: Sidebar navigation */}
            <div className="p-5 rounded-md border border-border bg-card">
              <h3 className="font-display text-h3 text-card-foreground mb-1">Example: Navigation Sidebar</h3>
              <p className="text-caption font-body text-muted-foreground mb-5">Anchor surface (green) for persistent navigation. Primary surface (white) for page content.</p>

              <div className="border border-border rounded-md overflow-hidden">
                <div className="flex" style={{ minHeight: 220 }}>
                  <div className="w-56 shrink-0 bg-primary p-5 space-y-4">
                    <div className="h-3.5 w-3/4 rounded bg-primary-foreground/20 mb-6" />
                    {["Dashboard", "Components", "Tokens", "Patterns", "Settings"].map((item, i) => (
                      <div
                        key={item}
                        className={`px-3 py-1.5 rounded text-body-sm font-body ${
                          i === 2 ? "bg-primary-foreground/10 text-primary-foreground" : "text-primary-foreground/60"
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="flex-1 bg-background p-6 space-y-4">
                    <div className="h-5 w-1/3 rounded bg-primary/20" />
                    <div className="space-y-2">
                      <div className="h-2.5 w-full rounded bg-muted-foreground/10" />
                      <div className="h-2.5 w-4/5 rounded bg-muted-foreground/10" />
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="h-20 rounded border border-border bg-muted/20" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="px-4 py-2 border-t border-border bg-muted/40">
                  <span className="text-caption font-body text-muted-foreground">Anchor (sidebar) + Primary (content) · sidebar p-5, content p-6</span>
                </div>
              </div>
            </div>

            {/* Example: Hero + Content */}
            <div className="p-5 rounded-md border border-border bg-card">
              <h3 className="font-display text-h3 text-card-foreground mb-1">Example: Hero + Editorial Content</h3>
              <p className="text-caption font-body text-muted-foreground mb-5">Anchor surface for hero/brand messaging. Primary surface for body content below.</p>

              <div className="border border-border rounded-md overflow-hidden">
                <div className="bg-primary p-10 text-center space-y-3">
                  <div className="h-6 w-2/5 mx-auto rounded bg-primary-foreground/20" />
                  <div className="h-3 w-1/3 mx-auto rounded bg-primary-foreground/12" />
                  <div className="flex justify-center gap-3 mt-4">
                    <div className="h-8 w-28 rounded bg-primary-foreground/20" />
                    <div className="h-8 w-24 rounded border border-primary-foreground/20" />
                  </div>
                </div>
                <div className="bg-background p-8 space-y-4">
                  <div className="max-w-lg mx-auto space-y-3">
                    <div className="h-4 w-1/3 rounded bg-primary/20" />
                    <div className="h-2.5 w-full rounded bg-muted-foreground/10" />
                    <div className="h-2.5 w-full rounded bg-muted-foreground/10" />
                    <div className="h-2.5 w-3/4 rounded bg-muted-foreground/10" />
                  </div>
                </div>
                <div className="px-4 py-2 border-t border-border bg-muted/40">
                  <span className="text-caption font-body text-muted-foreground">Hero (anchor) → Content (primary) · section gap space-8 · Display heading</span>
                </div>
              </div>
            </div>

            {/* Example: Quote / Callout block */}
            <div className="p-5 rounded-md border border-border bg-card">
              <h3 className="font-display text-h3 text-card-foreground mb-1">Example: Inline Callout Block</h3>
              <p className="text-caption font-body text-muted-foreground mb-5">Anchor surface used as an editorial callout or quote block within primary reading content.</p>

              <div className="border border-border rounded-md overflow-hidden">
                <div className="bg-background p-8">
                  <div className="max-w-lg mx-auto space-y-5">
                    <div className="space-y-2">
                      <div className="h-2.5 w-full rounded bg-muted-foreground/10" />
                      <div className="h-2.5 w-full rounded bg-muted-foreground/10" />
                      <div className="h-2.5 w-2/3 rounded bg-muted-foreground/10" />
                    </div>
                    {/* Callout */}
                    <div className="bg-primary rounded-md p-6 space-y-2">
                      <div className="h-1 w-8 rounded bg-bronze mb-3" />
                      <div className="h-3 w-4/5 rounded bg-primary-foreground/20" />
                      <div className="h-2.5 w-3/5 rounded bg-primary-foreground/12" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-2.5 w-full rounded bg-muted-foreground/10" />
                      <div className="h-2.5 w-full rounded bg-muted-foreground/10" />
                      <div className="h-2.5 w-4/5 rounded bg-muted-foreground/10" />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-2 border-t border-border bg-muted/40">
                  <span className="text-caption font-body text-muted-foreground">Callout block (anchor surface) inside reading content · bronze accent · p-6</span>
                </div>
              </div>
            </div>

            {/* Do / Don't */}
            <section>
              <h2 className="font-display text-h2 text-foreground mb-4">Do / Don't</h2>
              <DosDonts
                dos={[
                  "Use white (bg-background) as the default reading surface.",
                  "Use green (bg-primary) to anchor navigation, heroes, and callouts.",
                  "Keep text on green surfaces using text-primary-foreground for contrast.",
                  "Use bronze accents sparingly for dividers and emphasis markers.",
                ]}
                donts={[
                  "Don't use green as the primary reading surface for long text.",
                  "Don't mix more than two surface colors in a single view.",
                  "Don't use arbitrary background colors outside the defined palette.",
                  "Don't place green callouts directly adjacent to green sidebars.",
                ]}
              />
            </section>
          </div>
        </TabsContent>

        {/* ── Code Examples tab ── */}
        <TabsContent value="examples">
          <TokenExamplesTab tokenCategory="layout" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TokensLayout;
