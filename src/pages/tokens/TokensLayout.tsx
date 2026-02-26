import { PageHeader } from "@/components/PageHeader";

const TokensLayout = () => {
  return (
    <div className="px-8 py-10 max-w-5xl">
      <PageHeader
        title="Layout Tokens"
        description="Keep text in controlled columns. Never use full-width paragraphs. Max paragraph width is 48–52 characters."
      />

      <div className="space-y-6">
        <div className="p-5 rounded-md border border-border bg-card">
          <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-3">Max Content Width</h3>
          <div className="bg-background border border-border rounded-md p-6">
            <p className="max-w-prose text-sm font-body leading-reading text-muted-foreground">
              This paragraph is constrained to 52ch — the maximum readable width. Restraint signals confidence. One idea per section, headings kept short, controlled density throughout.
            </p>
          </div>
          <p className="mt-3 text-xs font-body text-muted-foreground">
            Token: <code className="text-foreground">max-w-prose</code> (52ch)
          </p>
        </div>

        <div className="p-5 rounded-md border border-border bg-card">
          <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-3">Panel Pairing</h3>
          <div className="grid grid-cols-2 gap-0 rounded-md overflow-hidden border border-border">
            <div className="p-6 bg-background">
              <p className="text-xs font-body font-medium text-muted-foreground uppercase tracking-widest mb-2">Primary Context</p>
              <p className="text-sm font-body leading-reading text-foreground max-w-prose">White panel — used for primary content, editorial text, and main information display.</p>
            </div>
            <div className="p-6 bg-primary text-primary-foreground">
              <p className="text-xs font-body font-medium text-primary-foreground/60 uppercase tracking-widest mb-2">Anchor Context</p>
              <p className="text-sm font-body leading-reading text-primary-foreground/90 max-w-prose">Green panel — used for anchoring navigation, supporting context, and complementary information.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokensLayout;
