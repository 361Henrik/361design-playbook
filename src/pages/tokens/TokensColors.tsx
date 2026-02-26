import { PageHeader } from "@/components/PageHeader";

const tokensData = [
  { name: "Deep Forest Green", variable: "--forest", hex: "#1B3D2F", hsl: "153 38% 17%", usage: "Primary anchor, sidebar, panels (20–30%)", swatch: "bg-primary" },
  { name: "Warm White", variable: "--warm-white", hex: "#FBFAF8", hsl: "40 33% 97%", usage: "Dominant background (60–70%)", swatch: "bg-background" },
  { name: "Warm Off-White", variable: "--off-white", hex: "#F5F3EF", hsl: "37 21% 95%", usage: "Cards, secondary surfaces", swatch: "bg-card" },
  { name: "Near Black", variable: "--near-black", hex: "#1A1A2E", hsl: "240 29% 14%", usage: "Body text, headings", swatch: "bg-foreground" },
  { name: "Antique Bronze", variable: "--bronze", hex: "#C49A5C", hsl: "36 42% 56%", usage: "Accent only — jewelry, never paint (<8%)", swatch: "bg-accent" },
];

const TokensColors = () => {
  return (
    <div className="px-8 py-10 max-w-5xl">
      <PageHeader
        title="Color Tokens"
        description="The Curated Lens palette uses five core colors with strict distribution: 60–70% Warm White, 20–30% Deep Forest Green, and less than 8% Antique Bronze."
      />

      <div className="space-y-4">
        {tokensData.map((token) => (
          <div key={token.name} className="flex items-start gap-5 p-5 rounded-md border border-border bg-card">
            <div className={`w-16 h-16 rounded-md shrink-0 ${token.swatch} border border-border`} />
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-base font-medium tracking-headline text-card-foreground">
                {token.name}
              </h3>
              <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs font-body text-muted-foreground">
                <span>HEX: <code className="text-foreground">{token.hex}</code></span>
                <span>HSL: <code className="text-foreground">{token.hsl}</code></span>
                <span>CSS: <code className="text-foreground">var({token.variable})</code></span>
              </div>
              <p className="mt-2 text-sm font-body leading-reading text-muted-foreground max-w-prose">
                {token.usage}
              </p>
            </div>
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
              Use Bronze sparingly as an accent — a thin rule, an icon highlight, a subtle label. It is jewelry.
            </p>
          </div>
          <div className="p-5 rounded-md border-2 border-destructive/20 bg-card">
            <p className="text-sm font-body font-medium text-destructive mb-2">✗ Don't</p>
            <p className="text-sm font-body leading-reading text-muted-foreground">
              Never use Bronze as a fill color, background, or large surface. Never introduce gradients or additional near-whites.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TokensColors;
