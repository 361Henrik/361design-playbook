import { PageHeader } from "@/components/PageHeader";
import { CopyButton } from "@/components/CopyButton";
import { DosDonts } from "@/components/DosDonts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TokenExamplesTab } from "@/components/tokens/TokenExamplesTab";

const tokensData = [
  { name: "Cream", variable: "--background", hex: "#F7F4EF", hsl: "36 24% 95%", tailwind: "background", usage: "Primary background color. Used for page backgrounds, large layout surfaces, the main visual canvas. Should dominate the interface. Never compete visually with strong colors.", swatch: "bg-background", ratio: "dominant" },
  { name: "Soft Ivory", variable: "--card", hex: "#FBF9F6", hsl: "40 33% 97%", tailwind: "card", usage: "Secondary surface color. Used for cards, secondary panels, and subtle surface separation. Creates gentle contrast with the Cream background.", swatch: "bg-card", ratio: "secondary" },
  { name: "Charcoal", variable: "--foreground", hex: "#1A1A1A", hsl: "0 0% 10%", tailwind: "foreground", usage: "Primary text color. Used for body copy, headings, labels, and UI text. Provides warmth and readability without pure black.", swatch: "bg-foreground", ratio: "text only" },
  { name: "Muted Grey", variable: "--muted-foreground", hex: "#5C5C5C", hsl: "0 0% 36%", tailwind: "muted-foreground", usage: "Secondary text color. Used for supporting copy, descriptions, captions, and de-emphasized labels.", swatch: "bg-muted-foreground", ratio: "secondary text" },
  { name: "Deep Marine Blue", variable: "--primary", hex: "#1F3A5F", hsl: "215 51% 25%", tailwind: "primary", usage: "Accent interaction color. Used for buttons, active states, route lines on maps, navigation anchors, and focused UI elements. Marine blue signals interaction, not decoration.", swatch: "bg-primary", ratio: "interaction" },
  { name: "Champagne Bronze", variable: "--accent", hex: "#C6A96B", hsl: "40 42% 60%", tailwind: "accent", usage: "Subtle highlight accent. Used for icon highlights, POI selected states on maps, thin divider lines, and small emphasis words. Bronze is jewelry, never paint.", swatch: "bg-accent", ratio: "highlight only" },
  { name: "Border Subtle", variable: "--border", hex: "#D9D6D1", hsl: "36 10% 83%", tailwind: "border", usage: "Default border color for cards, inputs, and dividers. Maintains calm separation without visual noise.", swatch: "bg-border", ratio: "structural" },
];

const TokensColors = () => {
  return (
    <div className="px-space-5 md:px-space-8 py-space-8 max-w-content">
      <PageHeader
        title="Color Tokens"
        description="The Curated Lens uses a neutral foundation with marine blue for interaction and champagne bronze for subtle highlights. No colored backgrounds — neutrals dominate."
      />

      <Tabs defaultValue="tokens" className="mt-6">
        <TabsList>
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
        </TabsList>

        <TabsContent value="tokens">
          {/* System Modes */}
          <div className="mb-10 p-5 rounded-md border border-border bg-card">
            <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-4">System Modes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-md border border-border bg-background">
                <h4 className="font-display text-sm font-medium text-foreground mb-1">Curated Lens Signature</h4>
                <p className="text-xs font-body text-muted-foreground">B2B — Design System Hub, sales, onboarding. Uses marine blue + bronze accents. Expresses the Curated Lens identity.</p>
              </div>
              <div className="p-4 rounded-md border border-border bg-background">
                <h4 className="font-display text-sm font-medium text-foreground mb-1">Operator Expression</h4>
                <p className="text-xs font-body text-muted-foreground">B2C — Guest-facing. Allows controlled color adaptation (accent override, optional route color) while map, marker, layout, and typography rules remain immutable.</p>
              </div>
            </div>
          </div>

          {/* Color Usage Rules */}
          <div className="mb-10 p-5 rounded-md border border-border bg-card">
            <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-4">Color Usage Rules</h3>
            <ul className="space-y-2 text-sm font-body text-muted-foreground">
              <li>• <strong className="text-foreground">Neutral base always dominant</strong> — cream and ivory fill 80%+ of visible surface</li>
              <li>• <strong className="text-foreground">Marine blue = interaction only</strong> — buttons, route lines, active states, focused elements</li>
              <li>• <strong className="text-foreground">Bronze = subtle highlight only</strong> — selected markers, icon accents, thin dividers</li>
              <li>• <strong className="text-foreground">No colored backgrounds</strong> — surfaces are always neutral (cream, ivory, white)</li>
            </ul>
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
                { bg: "bg-background", fg: "text-foreground", label: "Charcoal on Cream" },
                { bg: "bg-primary", fg: "text-primary-foreground", label: "Cream on Marine Blue" },
                { bg: "bg-card", fg: "text-card-foreground", label: "Charcoal on Ivory" },
                { bg: "bg-background", fg: "text-accent", label: "Bronze on Cream (accent only)" },
              ].map((pair) => (
                <div key={pair.label} className={`p-5 rounded-md border border-border ${pair.bg}`}>
                  <p className={`text-sm font-body font-medium ${pair.fg}`}>{pair.label}</p>
                  <p className={`text-xs font-body mt-1 ${pair.fg} opacity-70`}>Aa Bb Cc 123</p>
                </div>
              ))}
            </div>
          </section>

          {/* Operator Adaptation */}
          <section className="mt-12">
            <h2 className="font-display text-xl font-medium tracking-headline leading-section text-foreground mb-4">Operator Adaptation Rules</h2>
            <DosDonts
              dos={[
                "Allow accent color override for buttons and highlights in Operator Expression mode.",
                "Allow optional route color override (controlled, must pass contrast checks).",
                "Maintain structural consistency: 'The Curated Lens system remains structurally consistent across all operator implementations.'",
              ]}
              donts={[
                "Never allow marker redesign — black/white with optional bronze highlight only.",
                "Never allow map base color changes — land remains light grey, water remains soft blue.",
                "Never allow typography changes — Playfair Display + Lexend are constant.",
                "Never allow layout restructuring — spacing scale and widths are immutable.",
              ]}
            />
          </section>

          {/* Do / Don't */}
          <section className="mt-12">
            <h2 className="font-display text-xl font-medium tracking-headline leading-section text-foreground mb-4">Do / Don't</h2>
            <DosDonts
              dos={[
                "Use marine blue for buttons, active states, route lines, and focused elements.",
                "Use bronze sparingly — icon highlights, selected markers, thin divider lines. It is jewelry.",
                "Keep neutral surfaces dominant — cream and ivory form the visual foundation.",
                "Use charcoal for all body copy, headings, labels, and UI text.",
                "Use muted grey for secondary text and supporting descriptions.",
                "Use the approved contrast pairs for text readability.",
              ]}
              donts={[
                "Never use marine blue as a background fill — it is for interaction elements only.",
                "Never use bronze as a fill color, button, background, or large UI surface.",
                "Never introduce gradients or additional colors beyond the defined palette.",
                "Don't use pure black (#000). Use charcoal (#1A1A1A) for warmth.",
                "Don't add colored backgrounds to any surface — neutrals only.",
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
