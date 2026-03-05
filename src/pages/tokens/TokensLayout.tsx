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
    <div className="px-8 py-10 max-w-5xl">
      <PageHeader
        title="Layout Tokens"
        description="Page widths, grid columns, and gutters defined as tokens. Keep text in controlled columns. Never use full-width paragraphs."
      />

      <Tabs defaultValue="tokens" className="mt-6">
        <TabsList>
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
        </TabsList>

        <TabsContent value="tokens">
          {/* Page width tokens */}
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
                    <p className="text-body-sm font-body text-muted-foreground">{w.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Width visualizer */}
          <div className="p-5 rounded-md border border-border bg-card mb-8">
            <h3 className="font-display text-h3 text-card-foreground mb-4">Width Comparison</h3>
            <div className="space-y-3">
              {widthTokens.slice(0, 3).map((w, i) => (
                <div key={w.name} className="space-y-1">
                  <span className="text-caption font-body text-muted-foreground">{w.name} ({w.value})</span>
                  <div className="h-4 rounded-sm bg-primary/15 border border-primary/25" style={{ width: `${[56, 86, 100][i]}%` }} />
                </div>
              ))}
            </div>
          </div>

          {/* Grid system */}
          <div className="p-5 rounded-md border border-border bg-card mb-8">
            <h3 className="font-display text-h3 text-card-foreground mb-4">Grid System</h3>
            <div className="space-y-4">
              {gridTokens.map((g) => (
                <div key={g.name} className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-label font-body text-foreground w-20">{g.name}</span>
                    <span className="text-caption font-body text-muted-foreground">{g.columns} columns · gutter {g.gutter} · {g.breakpoint}</span>
                  </div>
                  <div className={`grid gap-1`} style={{ gridTemplateColumns: `repeat(${g.columns}, 1fr)` }}>
                    {Array.from({ length: g.columns }).map((_, i) => (
                      <div key={i} className="h-6 rounded-sm bg-primary/10 border border-primary/20" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Text density */}
          <div className="p-5 rounded-md border border-border bg-card mb-8">
            <h3 className="font-display text-h3 text-card-foreground mb-3">Text Density Rules</h3>
            <ul className="space-y-2 text-body-sm font-body text-muted-foreground max-w-prose">
              <li className="flex gap-2"><span className="text-accent shrink-0">→</span> One idea per section. No multi-topic paragraphs.</li>
              <li className="flex gap-2"><span className="text-accent shrink-0">→</span> Headings kept short — ideally under 6 words.</li>
              <li className="flex gap-2"><span className="text-accent shrink-0">→</span> Max paragraph width: 52 characters (max-w-prose).</li>
              <li className="flex gap-2"><span className="text-accent shrink-0">→</span> One hero image OR one diagram per section, not both.</li>
            </ul>
          </div>

          {/* Panel pairing */}
          <div className="p-5 rounded-md border border-border bg-card mb-8">
            <h3 className="font-display text-h3 text-card-foreground mb-3">Panel Pairing</h3>
            <p className="text-body-sm font-body text-muted-foreground max-w-prose mb-4">
              Two approved panel states: Primary Context (white) and Anchor Context (green). Use side-by-side to create visual rhythm and information hierarchy.
            </p>
            <div className="grid grid-cols-2 gap-0 rounded-md overflow-hidden border border-border">
              <div className="p-6 bg-background">
                <p className="text-caption font-body font-medium text-muted-foreground uppercase tracking-widest mb-2">Primary Context</p>
                <p className="text-body-sm font-body text-foreground max-w-prose">White panel — primary content, editorial text, and main information display.</p>
              </div>
              <div className="p-6 bg-primary text-primary-foreground">
                <p className="text-caption font-body font-medium text-primary-foreground/60 uppercase tracking-widest mb-2">Anchor Context</p>
                <p className="text-body-sm font-body text-primary-foreground/90 max-w-prose">Green panel — anchoring navigation, supporting context, and complementary information.</p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <CopyButton value="bg-background text-foreground" label="Primary Context" />
              <CopyButton value="bg-primary text-primary-foreground" label="Anchor Context" />
            </div>
          </div>

          {/* Do / Don't */}
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

        <TabsContent value="examples">
          <TokenExamplesTab tokenCategory="layout" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TokensLayout;
