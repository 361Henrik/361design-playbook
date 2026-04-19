import { PageHeader } from "@/components/PageHeader";
import { DosDonts } from "@/components/DosDonts";
import { threeSixtyGlyphs } from "@/components/icons/threeSixtyGlyphs";

const sharedRules = [
  { label: "Artboard", value: "24×24px (live area 20×20)" },
  { label: "Stroke", value: "1.75px" },
  { label: "Caps", value: "Square" },
  { label: "Joins", value: "Rounded" },
  { label: "Color", value: "currentColor — Charcoal default; one accent (Terracotta OR Bronze) permitted per artifact" },
  { label: "Sizes", value: "16 (inline) · 20 (controls) · 24 (default) · 32 (cards/empty states)" },
];

export default function ThreeSixtyOneIcons() {
  return (
    <div className="px-space-5 md:px-space-8 py-space-8 max-w-content">
      <PageHeader
        title="Icons — Mechanical Set"
        description="The 361 AI Development icon set. Slightly heavier stroke than Host Atlas to hold its own at slide and document scale. Metaphors drawn from build, flow, system, and AI work."
      />

      <section className="mt-space-6">
        <h2 className="font-display text-h3 tracking-headline text-foreground mb-3">Specification</h2>
        <div className="rounded-md border border-border bg-card overflow-hidden">
          {sharedRules.map((r, i) => (
            <div key={r.label} className={`flex items-start gap-4 px-4 py-3 ${i > 0 ? "border-t border-border" : ""}`}>
              <span className="font-body text-xs uppercase tracking-[0.06em] text-muted-foreground w-32 shrink-0 pt-0.5">
                {r.label}
              </span>
              <span className="font-body text-sm text-foreground flex-1">{r.value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-space-8">
        <h2 className="font-display text-h3 tracking-headline text-foreground mb-3">Custom workflow glyphs</h2>
        <p className="text-sm font-body text-muted-foreground mb-4 max-w-prose">
          Twelve custom glyphs cover the shapes Lucide cannot. Use these for diagrams, slides, and docs where the metaphor matters.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {threeSixtyGlyphs.map(({ name, Glyph, use }) => (
            <div key={name} className="p-4 rounded-md border border-border bg-card flex flex-col items-center text-center">
              <Glyph size={32} className="text-foreground mb-3" />
              <p className="font-display text-sm font-medium text-foreground">{name}</p>
              <p className="text-[11px] font-body text-muted-foreground mt-1 leading-tight">{use}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-space-8">
        <h2 className="font-display text-h3 tracking-headline text-foreground mb-3">Usage</h2>
        <DosDonts
          dos={[
            "Use Mechanical icons on every delivery surface (offers, docs, prototypes, diagrams).",
            "Place icons on edges and nodes in workflow diagrams (24px).",
            "Inside badges and status pills, use 16px.",
            "Default to Charcoal. One accent (Terracotta OR Bronze) per artifact.",
          ]}
          donts={[
            "Never mix Mechanical and Cartographic sets in the same artifact.",
            "Never use Mechanical icons on map markers or inside the Host Atlas product UI.",
            "Never apply gradients, drop shadows, or multi-color fills.",
            "Never resize outside the 16/20/24/32 ladder.",
          ]}
        />
      </section>
    </div>
  );
}
