import { PageHeader } from "@/components/PageHeader";
import { CopyButton } from "@/components/CopyButton";
import { DosDonts } from "@/components/DosDonts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TokenExamplesTab } from "@/components/tokens/TokenExamplesTab";

const typographyTokens = [
  {
    name: "Display / Hero",
    font: "Playfair Display",
    weight: "500",
    lineHeight: "1.05",
    letterSpacing: "-0.01em",
    size: "text-4xl (2.25rem)",
    example: "The Art of Restraint",
    className: "font-display text-4xl font-medium leading-hero tracking-headline",
    tailwind: "font-display text-4xl font-medium leading-hero tracking-headline",
  },
  {
    name: "Section Heading",
    font: "Playfair Display",
    weight: "500",
    lineHeight: "1.1",
    letterSpacing: "-0.01em",
    size: "text-2xl (1.5rem)",
    example: "Design Token Center",
    className: "font-display text-2xl font-medium leading-section tracking-headline",
    tailwind: "font-display text-2xl font-medium leading-section tracking-headline",
  },
  {
    name: "Subsection",
    font: "Playfair Display",
    weight: "500",
    lineHeight: "1.1",
    letterSpacing: "-0.01em",
    size: "text-lg (1.125rem)",
    example: "Color Palette",
    className: "font-display text-lg font-medium leading-section tracking-headline",
    tailwind: "font-display text-lg font-medium leading-section tracking-headline",
  },
  {
    name: "Body",
    font: "Inter",
    weight: "400",
    lineHeight: "1.65",
    letterSpacing: "normal",
    size: "text-base (1rem)",
    example: "Restraint signals confidence. White space is a primary design element. Keep text in controlled columns; never use full-width paragraphs.",
    className: "font-body text-base font-normal leading-reading",
    tailwind: "font-body text-base font-normal leading-reading",
  },
  {
    name: "UI / Navigation",
    font: "Inter",
    weight: "500",
    lineHeight: "1.4",
    letterSpacing: "normal",
    size: "text-sm (0.875rem)",
    example: "Components • Guidelines • Export",
    className: "font-body text-sm font-medium leading-snug",
    tailwind: "font-body text-sm font-medium leading-snug",
  },
  {
    name: "Caption / Label",
    font: "Inter",
    weight: "400",
    lineHeight: "1.4",
    letterSpacing: "0.01em",
    size: "text-xs (0.75rem)",
    example: "HSL: 153 38% 17%  •  Last updated 2 hours ago",
    className: "font-body text-xs font-normal leading-snug tracking-wide",
    tailwind: "font-body text-xs font-normal leading-snug tracking-wide",
  },
];

const TokensTypography = () => {
  return (
    <div className="px-8 py-10 max-w-5xl">
      <PageHeader
        title="Typography Tokens"
        description="Playfair Display for headlines and editorial authority. Inter for body, UI, and utility. No substitutions. Never use weight 300."
      />

      <Tabs defaultValue="tokens" className="mt-6">
        <TabsList>
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
        </TabsList>

        <TabsContent value="tokens">
          {/* Font stack overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            <div className="p-5 rounded-md border border-border bg-card">
              <p className="text-xs font-body font-medium text-muted-foreground uppercase tracking-widest mb-3">Display Font</p>
              <p className="font-display text-3xl font-medium tracking-headline leading-hero text-card-foreground">Playfair Display</p>
              <p className="mt-2 text-xs font-body text-muted-foreground">Weight 500 (default) · 600 (rare, emphasis only)</p>
              <div className="mt-3">
                <CopyButton value='font-family: "Playfair Display", Georgia, serif' label="CSS" />
              </div>
            </div>
            <div className="p-5 rounded-md border border-border bg-card">
              <p className="text-xs font-body font-medium text-muted-foreground uppercase tracking-widest mb-3">Body Font</p>
              <p className="font-body text-3xl font-medium leading-section text-card-foreground">Inter</p>
              <p className="mt-2 text-xs font-body text-muted-foreground">Weight 400 (body) · 500 (nav/CTA) · Never 300</p>
              <div className="mt-3">
                <CopyButton value='font-family: Inter, system-ui, sans-serif' label="CSS" />
              </div>
            </div>
          </div>

          {/* Type scale */}
          <h2 className="font-display text-xl font-medium tracking-headline leading-section text-foreground mb-6">Type Scale</h2>
          <div className="space-y-4">
            {typographyTokens.map((t) => (
              <div key={t.name} className="p-5 rounded-md border border-border bg-card">
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="font-display text-base font-medium tracking-headline text-card-foreground">{t.name}</h3>
                  <div className="flex gap-3 text-xs font-body text-muted-foreground shrink-0 ml-4">
                    <span>{t.font}</span>
                    <span>w{t.weight}</span>
                    <span>lh {t.lineHeight}</span>
                    <span>{t.size}</span>
                  </div>
                </div>
                <p className={`${t.className} text-foreground mt-3`}>{t.example}</p>
                <div className="mt-3 pt-3 border-t border-border flex flex-wrap gap-2">
                  <CopyButton value={t.tailwind} label="Tailwind classes" />
                </div>
              </div>
            ))}
          </div>

          {/* Do / Don't */}
          <section className="mt-12">
            <h2 className="font-display text-xl font-medium tracking-headline leading-section text-foreground mb-4">Do / Don't</h2>
            <DosDonts
              dos={[
                "Use Playfair Display at weight 500 for all headings.",
                "Use Inter weight 400 for body text and weight 500 for navigation and CTAs.",
                "Maintain consistent typographic hierarchy — Display → Section → Subsection → Body → UI → Caption.",
                "Keep paragraph line-height between 1.6–1.75 for comfortable reading.",
              ]}
              donts={[
                "Never use weight 300 on any font — it reads as weak and uncommitted.",
                "Never substitute fonts. No Roboto, no Open Sans, no system fonts as primary.",
                "Don't invent new typographic structures beyond the established six-level hierarchy.",
                "Don't mix Playfair into body text or Inter into hero headlines.",
              ]}
            />
          </section>
        </TabsContent>

        <TabsContent value="examples">
          <TokenExamplesTab tokenCategory="typography" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TokensTypography;
