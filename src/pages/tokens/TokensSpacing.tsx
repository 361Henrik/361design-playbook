import { PageHeader } from "@/components/PageHeader";

const spacingTokens = [
  { name: "Section Top Padding", value: "120–160px", token: "section-top (10rem)", description: "Generous breathing room above major sections." },
  { name: "Headline to Paragraph", value: "32–40px", token: "headline-gap (2.5rem)", description: "Space between a heading and its following content." },
  { name: "Paragraph to Paragraph", value: "56–72px", token: "section-gap (4.5rem)", description: "Generous vertical rhythm between content blocks." },
  { name: "Card Internal Padding", value: "20–24px", token: "p-5 / p-6", description: "Internal spacing within cards and panels." },
  { name: "Grid Gap", value: "16px", token: "gap-4", description: "Standard gap between grid items." },
];

const TokensSpacing = () => {
  return (
    <div className="px-8 py-10 max-w-5xl">
      <PageHeader
        title="Spacing Tokens"
        description="White space is a primary design element. Generous padding and controlled density create the calm, architectural feel."
      />

      <div className="space-y-4">
        {spacingTokens.map((s) => (
          <div key={s.name} className="flex items-start gap-5 p-5 rounded-md border border-border bg-card">
            <div className="w-16 h-16 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <span className="text-xs font-body font-medium text-primary">{s.value}</span>
            </div>
            <div>
              <h3 className="font-display text-base font-medium tracking-headline text-card-foreground">{s.name}</h3>
              <p className="text-xs font-body text-muted-foreground mt-1">
                Tailwind: <code className="text-foreground">{s.token}</code>
              </p>
              <p className="mt-2 text-sm font-body leading-reading text-muted-foreground max-w-prose">{s.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TokensSpacing;
