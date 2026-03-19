import { PageHeader } from "@/components/PageHeader";
import { CopyButton } from "@/components/CopyButton";
import { DosDonts } from "@/components/DosDonts";

const tokensData = [
  { name: "Warm Canvas", variable: "--background", hex: "#EEE7DD", hsl: "36 33% 90%", tailwind: "background", usage: "Primary background. Every main surface uses this color. It is the canvas of the system.", swatch: "bg-background", role: "background" },
  { name: "Warm Stone", variable: "--card", hex: "#E8E2D9", hsl: "33 16% 89%", tailwind: "card", usage: "Secondary surface. Cards, panels, and layered sections. Creates clear separation from the background.", swatch: "bg-card", role: "surface" },
  { name: "Deep Charcoal", variable: "--foreground", hex: "#1A1F1A", hsl: "120 9% 11%", tailwind: "foreground", usage: "Primary text. All body copy, headings, labels, and UI text. The only primary text color.", swatch: "bg-foreground", role: "text" },
  { name: "Muted", variable: "--muted-foreground", hex: "#6E6A5E", hsl: "45 8% 40%", tailwind: "muted-foreground", usage: "Secondary text. Descriptions, captions, supporting labels. The only secondary text tone — no additional greys.", swatch: "bg-muted-foreground", role: "secondary text" },
  { name: "Deep Green", variable: "--deep-green", hex: "#1F4A3A", hsl: "158 41% 21%", tailwind: "deep-green", usage: "Structure and identity color. Section backgrounds, emphasis panels, and areas requiring stronger contrast within a page. When used as a background, pair with light text and bronze headings. Signals importance and structure, never interaction.", swatch: "bg-deep-green", role: "structure" },
  { name: "Terracotta", variable: "--primary", hex: "#C35C3C", hsl: "14 53% 50%", tailwind: "primary", usage: "Interaction color. Buttons, active states, route lines, navigation anchors and focused elements. The primary CTA color across the entire system.", swatch: "bg-primary", role: "interaction" },
  { name: "Champagne Bronze", variable: "--accent", hex: "#C9A962", hsl: "40 46% 53%", tailwind: "accent", usage: "Highlight accent. Icon highlights, selected markers, thin dividers. As text, only on deep green surfaces for headings — never on light/neutral backgrounds. Bronze is jewelry, never paint.", swatch: "bg-accent", role: "highlight" },
  { name: "Warm Border", variable: "--border", hex: "#CCC4B8", hsl: "33 12% 76%", tailwind: "border", usage: "The single border color. Cards, inputs, dividers. Visible against both Warm Canvas and Warm Stone surfaces. No border variations.", swatch: "bg-border", role: "structural" },
];

const TokensColors = () => {
  return (
    <div className="px-space-5 md:px-space-8 py-space-8 max-w-content">
      <PageHeader
        title="Foundations · Color"
        description="Four neutrals, each with a single purpose. Deep green for structure. Terracotta for interaction. Bronze for highlights. No overlapping roles."
      />

      {/* System Modes */}
      <div className="mt-6 mb-10 p-5 rounded-md border border-border bg-card">
        <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-4">System Modes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-md border border-border bg-background">
            <h4 className="font-display text-sm font-medium text-foreground mb-1">Curated Lens Signature</h4>
            <p className="text-xs font-body text-muted-foreground">B2B — Design System Hub, sales, onboarding. Deep green + terracotta + bronze accents.</p>
          </div>
          <div className="p-4 rounded-md border border-border bg-background">
            <h4 className="font-display text-sm font-medium text-foreground mb-1">Operator Expression</h4>
            <p className="text-xs font-body text-muted-foreground">B2C — Guest-facing. Controlled color adaptation while structure remains immutable.</p>
          </div>
        </div>
      </div>

      {/* Color Usage Rules */}
      <div className="mb-10 p-5 rounded-md border border-border bg-card">
        <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-4">Color Usage Rules</h3>
        <ul className="space-y-2 text-sm font-body text-muted-foreground">
          <li>• <strong className="text-foreground">Warm Canvas = background</strong> — all main surfaces, 80%+ of visible area</li>
          <li>• <strong className="text-foreground">Warm Stone = secondary surface</strong> — cards, panels, layered sections</li>
          <li>• <strong className="text-foreground">Deep Charcoal = primary text</strong> — one text color, no variations</li>
          <li>• <strong className="text-foreground">Muted = secondary text</strong> — the only secondary tone, no additional greys</li>
          <li>• <strong className="text-foreground">Deep Green = structure</strong> — section backgrounds, emphasis panels, identity</li>
          <li>• <strong className="text-foreground">Terracotta = interaction</strong> — buttons, CTAs, active states</li>
          <li>• <strong className="text-foreground">Bronze = highlight</strong> — selected markers, icon accents, thin dividers</li>
          <li>• <strong className="text-foreground">Warm Border = borders</strong> — single border color, no variations</li>
        </ul>
      </div>

      {/* Color tokens */}
      <div className="space-y-4">
        {tokensData.map((token) => (
          <div key={token.name} className="flex items-start gap-5 p-5 rounded-md border border-border bg-white">
            <div className={`w-20 h-20 rounded-md shrink-0 ${token.swatch} border border-border`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1.5">
                <h3 className="font-display text-base font-medium tracking-headline text-foreground">{token.name}</h3>
                <span className="text-xs font-body font-medium text-foreground px-2 py-0.5 rounded bg-background border border-accent">{token.role}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <CopyButton value={token.hex} label={token.hex} />
                <CopyButton value={`hsl(${token.hsl})`} label={`HSL`} />
                <CopyButton value={`var(${token.variable})`} label={`var(${token.variable})`} />
                <CopyButton value={token.tailwind} label={`tw: ${token.tailwind}`} />
              </div>
              <p className="mt-3 text-sm font-body leading-reading text-foreground max-w-prose">{token.usage}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Contrast pairs */}
      <section className="mt-12">
        <h2 className="font-display text-xl font-medium tracking-headline leading-section text-foreground mb-4">Approved Contrast Pairs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { bg: "bg-background", fg: "text-foreground", label: "Deep Charcoal on Warm Canvas" },
            { bg: "bg-deep-green", fg: "text-primary-foreground", label: "Cream on Deep Green" },
            { bg: "bg-card", fg: "text-card-foreground", label: "Deep Charcoal on Warm Stone" },
            { bg: "bg-deep-green", fg: "text-accent", label: "Bronze on Deep Green (headings only)" },
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
            "Use terracotta exclusively for interactive elements — buttons, links, active states.",
            "Use deep green for structural emphasis — section backgrounds, identity panels.",
            "Use bronze sparingly — icon highlights, selected markers, thin dividers.",
            "Keep Warm Canvas dominant — it is the visual foundation.",
            "Use Deep Charcoal for all primary text. One weight of dark, no variations.",
            "Use the single Muted tone for all secondary text. No additional greys.",
          ]}
          donts={[
            "Never introduce additional neutral tones beyond the four defined.",
            "Never introduce any blue tones.",
            "Never use deep green as a button or interactive color.",
            "Never use bronze as a fill color, button, or large surface.",
            "Never use pure black (#000). Deep Charcoal (#1A1F1A) provides warmth.",
            "Never add colored backgrounds — neutrals only.",
          ]}
        />
      </section>
    </div>
  );
};

export default TokensColors;
