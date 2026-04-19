import { PageHeader } from "@/components/PageHeader";
import { DosDonts } from "@/components/DosDonts";

export default function ThreeSixtyOneGuardrails() {
  return (
    <div className="px-space-5 md:px-space-8 py-space-8 max-w-content">
      <PageHeader
        title="Delivery Guardrails"
        description="Quality bar for offers, documentation, prototypes, and delivery assets. Anything shipped under the 361 mark must clear this bar."
      />

      <section className="mt-space-6">
        <h2 className="font-display text-h3 tracking-headline text-foreground mb-3">Universal rules</h2>
        <DosDonts
          dos={[
            "Use Mechanical icons (1.75px, square caps) on all delivery surfaces.",
            "One accent per artifact: Terracotta (action) OR Bronze (highlight).",
            "Lead with the decision; the rationale follows.",
            "Numerals for counts, dates, and prices.",
            "Single H1 per document; H2/H3 for structure.",
          ]}
          donts={[
            "Never mix Cartographic and Mechanical icons in one artifact.",
            "Never use stock photography or decorative imagery.",
            "Never use gradients, drop shadows, or 3D effects.",
            "Never use both Terracotta and Bronze on the same slide.",
            "Never include Host Atlas product chrome in a 361 deliverable.",
          ]}
        />
      </section>

      <section className="mt-space-8">
        <h2 className="font-display text-h3 tracking-headline text-foreground mb-3">Pre-ship checklist</h2>
        <ul className="space-y-2 text-sm font-body leading-reading text-foreground p-5 rounded-md border border-border bg-card">
          <li>1. Cover slide / title page is set in Playfair Display.</li>
          <li>2. Body copy is Lexend, minimum 14pt for screens, 11pt for documents.</li>
          <li>3. Every diagram uses Mechanical glyphs only.</li>
          <li>4. No more than one accent color appears in any single view.</li>
          <li>5. All numbers are numerals; all dates are ISO (YYYY-MM-DD).</li>
          <li>6. No "lorem ipsum", no placeholder text.</li>
        </ul>
      </section>
    </div>
  );
}
