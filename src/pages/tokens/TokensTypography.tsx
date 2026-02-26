import { PageHeader } from "@/components/PageHeader";

const typographyTokens = [
  { name: "Display / Hero", font: "Playfair Display", weight: "500", lineHeight: "1.05", letterSpacing: "-0.01em", example: "The Art of Restraint", className: "font-display text-4xl font-medium leading-hero tracking-headline" },
  { name: "Section Heading", font: "Playfair Display", weight: "500", lineHeight: "1.1", letterSpacing: "-0.01em", example: "Design Token Center", className: "font-display text-2xl font-medium leading-section tracking-headline" },
  { name: "Subsection", font: "Playfair Display", weight: "500", lineHeight: "1.1", letterSpacing: "-0.01em", example: "Color Palette", className: "font-display text-lg font-medium leading-section tracking-headline" },
  { name: "Body", font: "Inter", weight: "400", lineHeight: "1.65", letterSpacing: "normal", example: "Restraint signals confidence. White space is a primary design element. Keep text in controlled columns; never use full-width paragraphs.", className: "font-body text-base font-normal leading-reading" },
  { name: "UI / Navigation", font: "Inter", weight: "500", lineHeight: "1.4", letterSpacing: "normal", example: "Components • Guidelines • Export", className: "font-body text-sm font-medium leading-snug" },
  { name: "Caption / Label", font: "Inter", weight: "400", lineHeight: "1.4", letterSpacing: "0.01em", example: "HSL: 153 38% 17%", className: "font-body text-xs font-normal leading-snug tracking-wide" },
];

const TokensTypography = () => {
  return (
    <div className="px-8 py-10 max-w-5xl">
      <PageHeader
        title="Typography Tokens"
        description="Playfair Display for headlines and editorial authority. Inter for body, UI, and utility. No substitutions. Never use weight 300."
      />

      <div className="space-y-6">
        {typographyTokens.map((t) => (
          <div key={t.name} className="p-5 rounded-md border border-border bg-card">
            <div className="flex items-baseline justify-between mb-3">
              <h3 className="font-display text-base font-medium tracking-headline text-card-foreground">
                {t.name}
              </h3>
              <div className="flex gap-3 text-xs font-body text-muted-foreground">
                <span>{t.font}</span>
                <span>w{t.weight}</span>
                <span>lh {t.lineHeight}</span>
              </div>
            </div>
            <p className={`${t.className} text-foreground`}>{t.example}</p>
          </div>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="font-display text-xl font-medium tracking-headline leading-section text-foreground mb-4">
          Do / Don't
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-md border-2 border-primary/20 bg-card">
            <p className="text-sm font-body font-medium text-primary mb-2">✓ Do</p>
            <p className="text-sm font-body leading-reading text-muted-foreground">
              Use Playfair Display at weight 500 for all headings. Use Inter weight 400 for body and 500 for navigation/CTAs. Maintain consistent hierarchy.
            </p>
          </div>
          <div className="p-5 rounded-md border-2 border-destructive/20 bg-card">
            <p className="text-sm font-body font-medium text-destructive mb-2">✗ Don't</p>
            <p className="text-sm font-body leading-reading text-muted-foreground">
              Never use weight 300. Never substitute fonts. Don't invent new typographic structures beyond the established hierarchy.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TokensTypography;
