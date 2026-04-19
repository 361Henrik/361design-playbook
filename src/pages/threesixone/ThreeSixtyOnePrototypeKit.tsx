import { PageHeader } from "@/components/PageHeader";

const primitives = [
  { title: "Frame", use: "Browser, mobile, or modal frame around the prototype surface. 1px border, no chrome detail." },
  { title: "Block", use: "Solid grey rectangle representing content. Use only when fidelity is intentionally low." },
  { title: "Label callout", use: "Numbered circle + thin line + caption. Caption sits in the margin, never overlaps content." },
  { title: "State stack", use: "Two or three frames stacked horizontally to show before / during / after." },
  { title: "Annotation", use: "Charcoal text in margin, 11pt. One observation per annotation." },
];

export default function ThreeSixtyOnePrototypeKit() {
  return (
    <div className="px-space-5 md:px-space-8 py-space-8 max-w-content">
      <PageHeader
        title="Prototype Kit"
        description="Wireframe primitives and the annotation system used to build clickable demos and hi-fi prototypes for client review."
      />

      <div className="space-y-4 mt-space-6">
        {primitives.map((p) => (
          <article key={p.title} className="p-5 rounded-md border border-border bg-card">
            <h3 className="font-display text-base font-medium tracking-headline text-foreground mb-2">
              {p.title}
            </h3>
            <p className="text-sm font-body leading-reading text-muted-foreground">{p.use}</p>
          </article>
        ))}
      </div>

      <section className="mt-space-8 p-5 rounded-md border border-border bg-card">
        <h2 className="font-display text-h3 tracking-headline mb-2 text-foreground">Annotation rule</h2>
        <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose">
          Annotations clarify intent — they do not replace it. If a screen needs more than three annotations to be understood, the screen needs redesign, not more notes.
        </p>
      </section>
    </div>
  );
}
