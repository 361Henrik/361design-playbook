import { PageHeader } from "@/components/PageHeader";
import { CopyButton } from "@/components/CopyButton";
import { DosDonts } from "@/components/DosDonts";

const typographyTokens = [
  {
    name: "Display",
    font: "Playfair Display",
    weight: "500",
    lineHeight: "1.2",
    letterSpacing: "-0.01em",
    size: "3rem (48px)",
    example: "The Art of Restraint",
    className: "font-display text-display",
    tailwind: "font-display text-display",
  },
  {
    name: "H1",
    font: "Playfair Display",
    weight: "500",
    lineHeight: "1.2",
    letterSpacing: "-0.01em",
    size: "2.25rem (36px)",
    example: "Design Token Center",
    className: "font-display text-h1",
    tailwind: "font-display text-h1",
  },
  {
    name: "H2",
    font: "Playfair Display",
    weight: "500",
    lineHeight: "1.2",
    letterSpacing: "-0.01em",
    size: "1.5rem (24px)",
    example: "Color Palette",
    className: "font-display text-h2",
    tailwind: "font-display text-h2",
  },
  {
    name: "H3",
    font: "Playfair Display",
    weight: "500",
    lineHeight: "1.2",
    letterSpacing: "-0.005em",
    size: "1.25rem (20px)",
    example: "Spacing Scale",
    className: "font-display text-h3",
    tailwind: "font-display text-h3",
  },
  {
    name: "Body Large",
    font: "Lexend",
    weight: "400",
    lineHeight: "1.6",
    letterSpacing: "normal",
    size: "1.125rem (18px)",
    example: "Restraint signals confidence. White space is a primary design element, not wasted area.",
    className: "font-body text-body-lg",
    tailwind: "font-body text-body-lg",
  },
  {
    name: "Body",
    font: "Lexend",
    weight: "400",
    lineHeight: "1.6",
    letterSpacing: "normal",
    size: "1rem (16px)",
    example: "Keep text in controlled columns; never use full-width paragraphs. Every word should earn its place.",
    className: "font-body text-body",
    tailwind: "font-body text-body",
  },
  {
    name: "Body Small",
    font: "Lexend",
    weight: "400",
    lineHeight: "1.6",
    letterSpacing: "normal",
    size: "0.875rem (14px)",
    example: "Components • Guidelines • Export • Settings",
    className: "font-body text-body-sm",
    tailwind: "font-body text-body-sm",
  },
  {
    name: "Label",
    font: "Lexend",
    weight: "500",
    lineHeight: "1.3",
    letterSpacing: "0.01em",
    size: "0.8125rem (13px)",
    example: "Email Address",
    className: "font-body text-label",
    tailwind: "font-body text-label",
  },
  {
    name: "Caption",
    font: "Lexend",
    weight: "400",
    lineHeight: "1.3",
    letterSpacing: "0.01em",
    size: "0.75rem (12px)",
    example: "HSL: 103 53% 23%  •  Last updated 2 hours ago",
    className: "font-body text-caption",
    tailwind: "font-body text-caption",
  },
];

const TokensTypography = () => {
  return (
    <div className="px-space-5 md:px-space-8 py-space-8 max-w-content">
      <PageHeader
        title="Foundations · Typography"
        description="Playfair Display for headlines and editorial authority. Lexend for body, UI, and utility. Nine defined roles. No substitutions. Never use weight 300."
      />

      {/* Font stack overview */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <div className="p-5 rounded-md border border-border bg-card">
          <p className="text-caption font-body font-medium text-foreground uppercase tracking-widest mb-3">Display Font</p>
          <p className="font-display text-h1 text-card-foreground">Playfair Display</p>
          <p className="mt-2 text-body-sm font-body text-foreground">Weight 500 (default) · 600 (rare, emphasis only)</p>
          <p className="mt-1 text-body-sm font-body text-foreground">Used for: Display, H1, H2, H3</p>
          <div className="mt-3">
            <CopyButton value='font-family: "Playfair Display", Georgia, serif' label="CSS" />
          </div>
        </div>
        <div className="p-5 rounded-md border border-border bg-card">
          <p className="text-caption font-body font-medium text-foreground uppercase tracking-widest mb-3">Body Font</p>
          <p className="font-body text-h1 font-medium text-card-foreground">Lexend</p>
          <p className="mt-2 text-body-sm font-body text-foreground">Weight 400 (body) · 500 (label/CTA) · Never 300</p>
          <p className="mt-1 text-body-sm font-body text-foreground">Used for: Body Large, Body, Body Small, Label, Caption</p>
          <div className="mt-3">
            <CopyButton value='font-family: Lexend, system-ui, sans-serif' label="CSS" />
          </div>
        </div>
      </div>

      {/* Line-height rules */}
      <div className="p-5 rounded-md border border-border bg-card mb-10">
        <h3 className="font-display text-h3 text-card-foreground mb-4">Line-Height Rules</h3>
        <div className="space-y-2">
          {[
            { role: "Headlines (Display–H3)", value: "~1.2", token: "leading-heading" },
            { role: "Body text", value: "~1.6", token: "leading-reading" },
            { role: "Labels & Captions", value: "~1.3", token: "leading-label" },
          ].map((r) => (
            <div key={r.role} className="flex items-center gap-4">
              <span className="text-body-sm font-body text-foreground w-48 shrink-0">{r.role}</span>
              <CopyButton value={r.token} label={`${r.token} (${r.value})`} />
            </div>
          ))}
        </div>
      </div>

      {/* Type scale */}
      <h2 className="font-display text-h2 text-foreground mb-6">Type Scale</h2>
      <div className="space-y-4">
        {typographyTokens.map((t) => (
          <div key={t.name} className="p-5 rounded-md border border-border bg-card">
            <div className="flex items-baseline justify-between mb-1">
              <h3 className="font-display text-h3 text-card-foreground">{t.name}</h3>
              <div className="flex gap-3 text-caption font-body text-foreground shrink-0 ml-4">
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
        <h2 className="font-display text-h2 text-foreground mb-4">Do / Don't</h2>
        <DosDonts
          dos={[
            "Use Playfair Display at weight 500 for all headings (Display–H3).",
            "Use Lexend weight 400 for body text and weight 500 for labels and CTAs.",
            "Follow the nine-role hierarchy: Display → H1 → H2 → H3 → Body Large → Body → Body Small → Label → Caption.",
            "Headlines use line-height ~1.2, body ~1.6, labels ~1.3.",
          ]}
          donts={[
            "Never use weight 300 on any font — it reads as weak and uncommitted.",
            "Never substitute fonts. No Inter, no Roboto, no Open Sans as primary body.",
            "Don't invent new typographic roles beyond the established nine.",
            "Don't mix Playfair into body text or Lexend into hero headlines.",
          ]}
        />
      </section>
    </div>
  );
};

export default TokensTypography;
