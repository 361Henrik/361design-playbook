import { PageHeader } from "@/components/PageHeader";
import { CopyButton } from "@/components/CopyButton";
import { DosDonts } from "@/components/DosDonts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TokenExamplesTab } from "@/components/tokens/TokenExamplesTab";

const tokensData = [
  { name: "Deep Forest Green", variable: "--primary", hex: "#2E5A1C", hsl: "103 53% 23%", tailwind: "primary", usage: "Primary structural color. Used for buttons, outlines, navigation anchors, route lines in maps, icons, UI accents, and occasional section framing. Green is structural, not decorative.", swatch: "bg-primary", ratio: "20–30%" },
  { name: "Warm White", variable: "--background", hex: "#FBFAF8", hsl: "40 33% 97%", tailwind: "background", usage: "Primary background color. Used for page backgrounds, large layout surfaces, the main visual canvas. Should dominate the interface. Never compete visually with strong colors.", swatch: "bg-background", ratio: "60–70%" },
  { name: "Warm Off-White", variable: "--card", hex: "#F5F3EF", hsl: "37 21% 95%", tailwind: "card", usage: "Secondary surface color. Used for cards, secondary panels, and subtle surface separation. Creates gentle contrast with the Warm White background.", swatch: "bg-card", ratio: "within the 60–70%" },
  { name: "Near Black", variable: "--foreground", hex: "#1A1A2E", hsl: "240 29% 14%", tailwind: "foreground", usage: "Primary text color. Used for body copy, headings, labels, and UI text. Avoid pure black — this tone provides warmth and readability.", swatch: "bg-foreground", ratio: "text only" },
  { name: "Antique Bronze", variable: "--accent", hex: "#C49A5C", hsl: "36 42% 56%", tailwind: "accent", usage: "Accent color used sparingly. Icon highlights, POI highlight states on maps, thin divider lines, small emphasis words in headings, subtle labels. Bronze is jewelry, never paint.", swatch: "bg-accent", ratio: "<8%" },
];

const TokensColors = () => {
  return (
    <div className="px-8 py-10 max-w-5xl">
      <PageHeader
        title="Color Tokens"
        description="The Curated Lens palette uses five core colors with strict distribution: 60–70% Warm White, 20–30% Deep Forest Green, and less than 8% Antique Bronze."
      />

      <Tabs defaultValue="tokens" className="mt-6">
        <TabsList>
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
        </TabsList>

        <TabsContent value="tokens">
          {/* Distribution bar */}
          <div className="mb-10 p-5 rounded-md border border-border bg-card">
            <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-4">Color Distribution</h3>
            <div className="flex rounded-md overflow-hidden h-10 border border-border">
              <div className="bg-background flex-[65] flex items-center justify-center">
                <span className="text-xs font-body font-medium text-muted-foreground">Warm White 60–70%</span>
              </div>
              <div className="bg-primary flex-[25] flex items-center justify-center">
                <span className="text-xs font-body font-medium text-primary-foreground">Green 20–30%</span>
              </div>
              <div className="bg-accent flex-[7] flex items-center justify-center">
                <span className="text-xs font-body font-medium text-accent-foreground">Bronze &lt;8%</span>
              </div>
            </div>
            <p className="mt-3 text-xs font-body text-muted-foreground">Near Black is used only for text. Off-White lives within the Warm White zone as a subtle surface variation.</p>
          </div>

          {/* Color tokens */}
          <div className="space-y-4">
            {tokensData.map((token) => (
              <div key={token.name} className="flex items-start gap-5 p-5 rounded-md border border-border bg-card">
                <div className={`w-20 h-20 rounded-md shrink-0 ${token.swatch} border border-border`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5">
                    <h3 className="font-display text-base font-medium tracking-headline text-card-foreground">{token.name}</h3>
                    <span className="text-xs font-body font-medium text-accent px-2 py-0.5 rounded bg-accent/10 border border-accent/20">{token.ratio}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <CopyButton value={token.hex} label={token.hex} />
                    <CopyButton value={`hsl(${token.hsl})`} label={`HSL`} />
                    <CopyButton value={`var(${token.variable})`} label={`var(${token.variable})`} />
                    <CopyButton value={token.tailwind} label={`tw: ${token.tailwind}`} />
                  </div>
                  <p className="mt-3 text-sm font-body leading-reading text-muted-foreground max-w-prose">{token.usage}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contrast pairs */}
          <section className="mt-12">
            <h2 className="font-display text-xl font-medium tracking-headline leading-section text-foreground mb-4">Approved Contrast Pairs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { bg: "bg-background", fg: "text-foreground", label: "Near Black on Warm White" },
                { bg: "bg-primary", fg: "text-primary-foreground", label: "Warm White on Forest Green" },
                { bg: "bg-card", fg: "text-card-foreground", label: "Near Black on Off-White" },
                { bg: "bg-background", fg: "text-accent", label: "Bronze on Warm White (accent only)" },
              ].map((pair) => (
                <div key={pair.label} className={`p-5 rounded-md border border-border ${pair.bg}`}>
                  <p className={`text-sm font-body font-medium ${pair.fg}`}>{pair.label}</p>
                  <p className={`text-xs font-body mt-1 ${pair.fg} opacity-70`}>Aa Bb Cc 123</p>
                </div>
              ))}
            </div>
          </section>

          {/* Do / Don't */}
          <section className="mt-12">
            <h2 className="font-display text-xl font-medium tracking-headline leading-section text-foreground mb-4">Do / Don't</h2>
            <DosDonts
              dos={[
                "Use Green for buttons, outlines, navigation anchors, route lines, icons, and UI accents.",
                "Use Bronze sparingly — icon highlights, thin divider lines, subtle labels. It is jewelry.",
                "Maintain the 60/30/8 distribution target across every page and section.",
                "Use Warm Off-White for cards to create subtle separation from Warm White backgrounds.",
                "Use the approved contrast pairs for text readability.",
                "Use Near Black for all body copy, headings, labels, and UI text.",
              ]}
              donts={[
                "Never use Green for paragraph text, descriptive subtitles on beige backgrounds, or long blocks of copy.",
                "Never use Bronze as a fill color, button, background, or large UI surface.",
                "Never introduce gradients or additional near-whites beyond the five core colors.",
                "Don't use pure black (#000). Use Near Black (#1A1A2E) for warmth.",
                "Don't add new colors to the palette without design system approval.",
              ]}
            />
          </section>
        </TabsContent>

        <TabsContent value="examples">
          <TokenExamplesTab tokenCategory="color" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TokensColors;
