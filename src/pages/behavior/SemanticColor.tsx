import { PageHeader } from "@/components/PageHeader";

const meanings = [
  {
    name: "Success",
    swatch: "bg-emerald-700/15 border-emerald-700/30",
    dot: "bg-emerald-700",
    description: "A calm, muted green. Used for confirmations, completed actions, and positive status indicators. Never celebratory — simply clear.",
  },
  {
    name: "Warning",
    swatch: "bg-amber-600/15 border-amber-600/30",
    dot: "bg-amber-600",
    description: "A soft amber. Used when attention is needed but nothing is broken. Expiring items, approaching limits, gentle cautions.",
  },
  {
    name: "Error",
    swatch: "bg-destructive/15 border-destructive/30",
    dot: "bg-destructive",
    description: "A controlled red. Used for failed actions, validation issues, and critical alerts. Firm but never alarming — the tone should be helpful, not punishing.",
  },
  {
    name: "Information",
    swatch: "bg-primary/10 border-primary/25",
    dot: "bg-primary",
    description: "A muted blue. Used for neutral notices, tips, and contextual guidance. The quietest of all semantic colours.",
  },
];

const SemanticColor = () => (
  <div className="px-8 py-10 max-w-5xl">
    <PageHeader
      title="Semantic Colour Usage"
      description="Colour carries meaning. These tones are reserved for communication, not decoration — each one says something specific."
    />

    <div className="space-y-8">
      <div className="p-5 rounded-md border border-border bg-card">
        <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-2">
          Principle
        </h3>
        <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose">
          Semantic colours exist outside the brand palette. They serve a single purpose: to convey meaning quickly and without ambiguity. Their tones are deliberately muted so they integrate with the editorial aesthetic rather than disrupting it.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-medium tracking-headline text-foreground">
          The Four Meanings
        </h2>
        <div className="space-y-4">
          {meanings.map((m) => (
            <div key={m.name} className={`p-5 rounded-md border ${m.swatch}`}>
              <div className="flex items-center gap-3 mb-2">
                <span className={`w-3 h-3 rounded-full ${m.dot}`} />
                <h3 className="font-display text-base font-medium tracking-headline text-card-foreground">{m.name}</h3>
              </div>
              <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose">{m.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-medium tracking-headline text-foreground">
          Usage Principles
        </h2>
        <div className="p-5 rounded-md border border-border bg-card">
          <ul className="space-y-2 text-sm font-body leading-reading text-muted-foreground">
            <li>Use semantic colour for the indicator only — a border, an icon, or a small badge. Never flood an entire card or section.</li>
            <li>Pair every colour signal with a text label. Colour alone is not accessible.</li>
            <li>Keep saturation low. These tones should feel like part of the palette, not interruptions to it.</li>
            <li>In dark mode, reduce brightness further. Semantic colours should be visible but never glowing.</li>
          </ul>
        </div>
      </section>
    </div>
  </div>
);

export default SemanticColor;
