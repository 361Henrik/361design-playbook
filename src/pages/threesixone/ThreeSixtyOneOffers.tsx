import { PageHeader } from "@/components/PageHeader";

const templates = [
  {
    title: "Cover slide",
    spec: "Title (Playfair, Display, max 6 words) · subtitle (Lexend, body) · client name · date. Deep Green background, Cream type, Bronze period accent.",
  },
  {
    title: "Problem framing",
    spec: "Single sentence problem statement (24pt). Three bullet supporting points (16pt). No imagery.",
  },
  {
    title: "Approach overview",
    spec: "3–5 numbered steps. Each step: verb-led title + one explanatory sentence. Use Mechanical icons left of each step.",
  },
  {
    title: "Pricing block",
    spec: "Two columns: scope (left, prose) · price (right, numerals only). One Terracotta total line at bottom. No comparison tables unless requested.",
  },
  {
    title: "Case study layout",
    spec: "Header (client + outcome metric) · context paragraph · before/after · what we shipped · timeline. One image max.",
  },
  {
    title: "Cover/title patterns",
    spec: "All-caps eyebrow (11pt, 0.08em tracking) · title (Display) · thin Bronze rule below title.",
  },
];

export default function ThreeSixtyOneOffers() {
  return (
    <div className="px-space-5 md:px-space-8 py-space-8 max-w-content">
      <PageHeader
        title="Offer & Pitch System"
        description="Slide templates and copy patterns for offers, pitches, and proposals. Optimized for legibility at 200% zoom and silent reading."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-space-6">
        {templates.map((t) => (
          <article key={t.title} className="p-5 rounded-md border border-border bg-card">
            <h3 className="font-display text-base font-medium tracking-headline text-foreground mb-2">
              {t.title}
            </h3>
            <p className="text-sm font-body leading-reading text-muted-foreground">{t.spec}</p>
          </article>
        ))}
      </div>

      <section className="mt-space-8 p-5 rounded-md border border-border bg-deep-green text-cream">
        <h2 className="font-display text-h3 tracking-headline mb-2">Universal slide rules</h2>
        <ul className="space-y-2 text-sm font-body leading-reading text-cream/90">
          <li>• One idea per slide. If it needs two, split it.</li>
          <li>• Maximum 40 words of body text per slide.</li>
          <li>• Mechanical icons (1.75px stroke) only — never Cartographic.</li>
          <li>• One accent per slide: Terracotta for action OR Bronze for highlight.</li>
          <li>• No drop shadows, no gradients, no stock photography.</li>
        </ul>
      </section>
    </div>
  );
}
