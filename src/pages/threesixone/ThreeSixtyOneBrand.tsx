import { PageHeader } from "@/components/PageHeader";
import { CopyButton } from "@/components/CopyButton";
import { DosDonts } from "@/components/DosDonts";

const palette = [
  { name: "Charcoal", role: "Primary text & strokes", hex: "#1A1F1A", swatch: "bg-foreground" },
  { name: "Base Canvas", role: "Background", hex: "#F6F3EE", swatch: "bg-background" },
  { name: "Warm Stone", role: "Card / panel", hex: "#E8E2D9", swatch: "bg-card" },
  { name: "Terracotta", role: "Action accent (one per artifact)", hex: "#C35C3C", swatch: "bg-primary" },
  { name: "Bronze", role: "Highlight accent (one per artifact)", hex: "#C9A962", swatch: "bg-accent" },
];

export default function ThreeSixtyOneBrand() {
  return (
    <div className="px-space-5 md:px-space-8 py-space-8 max-w-content">
      <PageHeader
        title="361 Identity"
        description="Brand and voice for 361 AI Development. Shares the foundational palette and typography with Host Atlas; diverges in icon weight, density, and accent rules."
      />

      <section className="mt-space-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-md border border-border bg-card">
          <h3 className="font-display text-base font-medium tracking-headline text-foreground mb-2">Wordmark</h3>
          <p className="font-display text-3xl font-medium tracking-headline text-foreground">361</p>
          <p className="text-xs font-body text-muted-foreground mt-2">
            Playfair Display, Medium. Numerals only — never set as "three sixty one".
          </p>
        </div>
        <div className="p-5 rounded-md border border-border bg-deep-green">
          <h3 className="font-display text-base font-medium tracking-headline text-cream mb-2">Lockup on dark</h3>
          <p className="font-display text-3xl font-medium tracking-headline text-cream">361<span className="text-accent">.</span></p>
          <p className="text-xs font-body text-cream/80 mt-2">Bronze period only on Deep Green surfaces.</p>
        </div>
      </section>

      <section className="mt-space-8">
        <h2 className="font-display text-h3 tracking-headline text-foreground mb-3">Palette</h2>
        <div className="space-y-3">
          {palette.map((c) => (
            <div key={c.hex} className="flex items-center gap-4 p-4 rounded-md border border-border bg-background">
              <div className={`w-12 h-12 rounded-md ${c.swatch} border border-border shrink-0`} />
              <div className="flex-1">
                <p className="font-display text-sm font-medium text-foreground">{c.name}</p>
                <p className="text-xs font-body text-muted-foreground">{c.role}</p>
              </div>
              <CopyButton value={c.hex} label={c.hex} />
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs font-body text-muted-foreground">
          One accent per artifact. Terracotta for action; Bronze for highlight. Never both on the same slide or page.
        </p>
      </section>

      <section className="mt-space-8">
        <h2 className="font-display text-h3 tracking-headline text-foreground mb-3">Voice</h2>
        <DosDonts
          dos={[
            "Direct, declarative sentences. State the work, then the outcome.",
            "Use numerals over words for counts and timelines.",
            "Lead with the decision, follow with the rationale.",
            "Plain language. Define jargon on first use.",
          ]}
          donts={[
            "No marketing superlatives — 'world-class', 'cutting-edge'.",
            "No hedging — 'might', 'could possibly', 'we believe'.",
            "No empty connectors — 'in order to', 'with the goal of'.",
            "No emoji or decorative punctuation in deliverables.",
          ]}
        />
      </section>
    </div>
  );
}
