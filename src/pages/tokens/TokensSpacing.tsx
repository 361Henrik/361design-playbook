import { PageHeader } from "@/components/PageHeader";
import { CopyButton } from "@/components/CopyButton";
import { DosDonts } from "@/components/DosDonts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TokenExamplesTab } from "@/components/tokens/TokenExamplesTab";

const spacingScale = [
  { name: "space-1", px: "4px", tailwind: "space-1", barPct: 4 },
  { name: "space-2", px: "8px", tailwind: "space-2", barPct: 8 },
  { name: "space-3", px: "12px", tailwind: "space-3", barPct: 12 },
  { name: "space-4", px: "16px", tailwind: "space-4", barPct: 17 },
  { name: "space-5", px: "24px", tailwind: "space-5", barPct: 25 },
  { name: "space-6", px: "32px", tailwind: "space-6", barPct: 33 },
  { name: "space-7", px: "48px", tailwind: "space-7", barPct: 50 },
  { name: "space-8", px: "64px", tailwind: "space-8", barPct: 67 },
  { name: "space-9", px: "96px", tailwind: "space-9", barPct: 100 },
];

const spacingRules = [
  { context: "Section spacing", token: "space-8", value: "64px", description: "Vertical gap between major page sections." },
  { context: "Block spacing", token: "space-6", value: "32px", description: "Gap between content blocks within a section." },
  { context: "Component padding", token: "space-4", value: "16px", description: "Internal padding for cards, panels, and containers." },
  { context: "Text stack spacing", token: "space-3", value: "12px", description: "Gap between stacked text elements (heading + paragraph)." },
  { context: "Tight spacing", token: "space-2", value: "8px", description: "Inline gaps between badges, icons, small elements." },
];

const TokensSpacing = () => {
  return (
    <div className="px-8 py-10 max-w-5xl">
      <PageHeader
        title="Spacing Tokens"
        description="A nine-step spacing scale from 4px to 96px. Named tokens replace subjective terms like 'generous whitespace' with enforceable values."
      />

      <Tabs defaultValue="tokens" className="mt-6">
        <TabsList>
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
          <TabsTrigger value="rules">Rules</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
        </TabsList>

        <TabsContent value="tokens">
          {/* Visual spacing scale */}
          <div className="mb-10 p-5 rounded-md border border-border bg-card">
            <h3 className="font-display text-h3 text-card-foreground mb-4">Spacing Scale</h3>
            <div className="space-y-3">
              {spacingScale.map((s) => (
                <div key={s.name} className="flex items-center gap-4">
                  <span className="text-caption font-body text-muted-foreground w-16 shrink-0 text-right font-medium">{s.name}</span>
                  <span className="text-caption font-body text-muted-foreground w-12 shrink-0">{s.px}</span>
                  <div className="flex-1 h-3 bg-muted rounded-sm overflow-hidden">
                    <div
                      className="h-full rounded-sm bg-primary/20 border border-primary/30"
                      style={{ width: `${s.barPct}%` }}
                    />
                  </div>
                  <CopyButton value={`p-${s.tailwind}`} label={s.tailwind} />
                </div>
              ))}
            </div>
          </div>

          {/* Token cards */}
          <div className="space-y-4">
            {spacingScale.map((s) => (
              <div key={s.name} className="flex items-center gap-5 p-4 rounded-md border border-border bg-card">
                <div
                  className="rounded-md bg-primary/10 border border-primary/20 shrink-0"
                  style={{ width: s.px, height: s.px, minWidth: "16px", minHeight: "16px", maxWidth: "64px", maxHeight: "64px" }}
                />
                <div className="flex-1">
                  <h3 className="font-body text-label text-card-foreground">{s.name}</h3>
                  <p className="text-caption font-body text-muted-foreground">{s.px}</p>
                </div>
                <CopyButton value={s.tailwind} label={`tw: ${s.tailwind}`} />
                <CopyButton value={s.px} label={s.px} />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rules">
          <div className="mb-8">
            <h2 className="font-display text-h2 text-foreground mb-6">Spacing Rules</h2>
            <p className="text-body font-body text-muted-foreground max-w-prose mb-8">
              Use these rules to remove ambiguity. Each context maps to a specific spacing token.
            </p>

            <div className="space-y-4">
              {spacingRules.map((r) => (
                <div key={r.context} className="flex items-start gap-5 p-5 rounded-md border border-border bg-card">
                  <div className="w-16 h-16 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <span className="text-caption font-body font-medium text-primary">{r.value}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-body text-label text-card-foreground">{r.context}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <CopyButton value={r.token} label={`tw: ${r.token}`} />
                      <CopyButton value={r.value} label={r.value} />
                    </div>
                    <p className="mt-2 text-body-sm font-body text-muted-foreground max-w-prose">{r.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Do / Don't */}
          <section className="mt-12">
            <h2 className="font-display text-h2 text-foreground mb-4">Do / Don't</h2>
            <DosDonts
              dos={[
                "Always use named spacing tokens (space-1 through space-9) instead of arbitrary pixel values.",
                "Use space-8 (64px) between major sections for clear separation.",
                "Use space-4 (16px) as the default component internal padding.",
                "Maintain hierarchy: section > block > component > text stack > tight.",
              ]}
              donts={[
                "Don't use subjective terms like 'generous' or 'compact' — use the token name.",
                "Don't use arbitrary pixel values (e.g. px-7, mt-[37px]) outside the scale.",
                "Don't skip more than two scale steps in adjacent elements.",
                "Don't reduce spacing on mobile — maintain the same tokens at all breakpoints.",
              ]}
            />
          </section>
        </TabsContent>

        <TabsContent value="examples">
          <TokenExamplesTab tokenCategory="spacing" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TokensSpacing;
