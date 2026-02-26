import { PageHeader } from "@/components/PageHeader";
import { CopyButton } from "@/components/CopyButton";
import { DosDonts } from "@/components/DosDonts";

const spacingTokens = [
  { name: "Section Top Padding", range: "120–160px", token: "section-top", value: "10rem (160px)", tailwind: "pt-section-top", description: "Generous breathing room above major sections. Sets the architectural pace.", barWidth: "w-full" },
  { name: "Section Gap", range: "56–72px", token: "section-gap", value: "4.5rem (72px)", tailwind: "mt-section-gap", description: "Vertical rhythm between content blocks and paragraph groups.", barWidth: "w-3/4" },
  { name: "Headline to Content", range: "32–40px", token: "headline-gap", value: "2.5rem (40px)", tailwind: "mt-headline-gap", description: "Space between a heading and its following body content.", barWidth: "w-1/2" },
  { name: "Card Internal Padding", range: "20–24px", token: "p-5 / p-6", value: "1.25–1.5rem", tailwind: "p-5", description: "Internal spacing within cards, panels, and contained areas.", barWidth: "w-1/3" },
  { name: "Grid Gap", range: "16px", token: "gap-4", value: "1rem", tailwind: "gap-4", description: "Standard gap between grid items and inline elements.", barWidth: "w-1/4" },
  { name: "Inline Spacing", range: "8–12px", token: "gap-2 / gap-3", value: "0.5–0.75rem", tailwind: "gap-2", description: "Small gaps between inline elements like badges, icons, and buttons.", barWidth: "w-1/6" },
];

const TokensSpacing = () => {
  return (
    <div className="px-8 py-10 max-w-5xl">
      <PageHeader
        title="Spacing Tokens"
        description="White space is a primary design element. Generous padding and controlled density create the calm, architectural feel."
      />

      {/* Visual spacing scale */}
      <div className="mb-10 p-5 rounded-md border border-border bg-card">
        <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-4">Spacing Scale</h3>
        <div className="space-y-3">
          {spacingTokens.map((s) => (
            <div key={s.name} className="flex items-center gap-4">
              <span className="text-xs font-body text-muted-foreground w-32 shrink-0 text-right">{s.range}</span>
              <div className={`h-3 rounded-sm bg-primary/20 border border-primary/30 ${s.barWidth}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Token cards */}
      <div className="space-y-4">
        {spacingTokens.map((s) => (
          <div key={s.name} className="flex items-start gap-5 p-5 rounded-md border border-border bg-card">
            <div className="w-16 h-16 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <span className="text-[10px] font-body font-medium text-primary leading-tight text-center">{s.range}</span>
            </div>
            <div className="flex-1">
              <h3 className="font-display text-base font-medium tracking-headline text-card-foreground">{s.name}</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                <CopyButton value={s.tailwind} label={`tw: ${s.tailwind}`} />
                <CopyButton value={s.value} label={s.value} />
              </div>
              <p className="mt-2 text-sm font-body leading-reading text-muted-foreground max-w-prose">{s.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Do / Don't */}
      <section className="mt-12">
        <h2 className="font-display text-xl font-medium tracking-headline leading-section text-foreground mb-4">
          Do / Don't
        </h2>
        <DosDonts
          dos={[
            "Use generous section top padding (120–160px) to establish architectural rhythm.",
            "Let white space do the work — it is a primary design element, not empty area.",
            "Use consistent spacing tokens rather than arbitrary pixel values.",
            "Maintain clear hierarchy: section > paragraph > inline spacing.",
          ]}
          donts={[
            "Don't use tight spacing to cram more content on screen.",
            "Don't use inconsistent spacing values — stick to the token scale.",
            "Don't skip spacing levels (e.g., going from section-gap to gap-2 directly).",
            "Don't reduce padding on mobile — maintain the architectural calm at all sizes.",
          ]}
        />
      </section>
    </div>
  );
};

export default TokensSpacing;
