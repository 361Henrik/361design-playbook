import { PageHeader } from "@/components/PageHeader";
import { CopyButton } from "@/components/CopyButton";
import { DosDonts } from "@/components/DosDonts";

const TokensLayout = () => {
  return (
    <div className="px-8 py-10 max-w-5xl">
      <PageHeader
        title="Layout Tokens"
        description="Keep text in controlled columns. Never use full-width paragraphs. Max paragraph width is 48–52 characters."
      />

      {/* Content width */}
      <div className="space-y-6">
        <div className="p-5 rounded-md border border-border bg-card">
          <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-3">Max Content Width</h3>
          <div className="bg-background border border-border rounded-md p-6">
            <p className="max-w-prose text-sm font-body leading-reading text-muted-foreground">
              This paragraph is constrained to 52ch — the maximum readable width. Restraint signals confidence. One idea per section, headings kept short, controlled density throughout.
            </p>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <CopyButton value="max-w-prose" label="tw: max-w-prose" />
            <CopyButton value="max-width: 52ch" label="CSS: 52ch" />
          </div>
        </div>

        {/* Text density */}
        <div className="p-5 rounded-md border border-border bg-card">
          <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-3">Text Density Rules</h3>
          <ul className="space-y-2 text-sm font-body leading-reading text-muted-foreground max-w-prose">
            <li className="flex gap-2"><span className="text-accent shrink-0">→</span> One idea per section. No multi-topic paragraphs.</li>
            <li className="flex gap-2"><span className="text-accent shrink-0">→</span> Headings kept short — ideally under 6 words.</li>
            <li className="flex gap-2"><span className="text-accent shrink-0">→</span> Max paragraph width: 48–52 characters.</li>
            <li className="flex gap-2"><span className="text-accent shrink-0">→</span> One hero image OR one diagram per section, not both.</li>
          </ul>
        </div>

        {/* Panel pairing */}
        <div className="p-5 rounded-md border border-border bg-card">
          <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-3">Panel Pairing</h3>
          <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose mb-4">
            Two approved panel states: Primary Context (white) and Anchor Context (green). Use side-by-side to create visual rhythm and information hierarchy.
          </p>
          <div className="grid grid-cols-2 gap-0 rounded-md overflow-hidden border border-border">
            <div className="p-6 bg-background">
              <p className="text-xs font-body font-medium text-muted-foreground uppercase tracking-widest mb-2">Primary Context</p>
              <p className="text-sm font-body leading-reading text-foreground max-w-prose">White panel — primary content, editorial text, and main information display.</p>
            </div>
            <div className="p-6 bg-primary text-primary-foreground">
              <p className="text-xs font-body font-medium text-primary-foreground/60 uppercase tracking-widest mb-2">Anchor Context</p>
              <p className="text-sm font-body leading-reading text-primary-foreground/90 max-w-prose">Green panel — anchoring navigation, supporting context, and complementary information.</p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <CopyButton value="bg-background text-foreground" label="Primary Context" />
            <CopyButton value="bg-primary text-primary-foreground" label="Anchor Context" />
          </div>
        </div>

        {/* Page width tokens */}
        <div className="p-5 rounded-md border border-border bg-card">
          <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-3">Page Width Tokens</h3>
          <div className="space-y-3">
            {[
              { name: "Content area", value: "max-w-5xl", px: "1024px", desc: "Main content container" },
              { name: "Prose width", value: "max-w-prose", px: "52ch", desc: "Maximum paragraph width" },
              { name: "Narrow column", value: "max-w-md", px: "448px", desc: "Forms, narrow content" },
            ].map((w) => (
              <div key={w.name} className="flex items-center gap-4">
                <span className="text-xs font-body text-muted-foreground w-28 shrink-0">{w.name}</span>
                <CopyButton value={w.value} label={`${w.value} (${w.px})`} />
                <span className="text-xs font-body text-muted-foreground">{w.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Do / Don't */}
      <section className="mt-12">
        <h2 className="font-display text-xl font-medium tracking-headline leading-section text-foreground mb-4">
          Do / Don't
        </h2>
        <DosDonts
          dos={[
            "Constrain all body text to max-w-prose (52ch) for optimal readability.",
            "Use the Primary/Anchor panel pairing for visual rhythm.",
            "Keep one idea per section with short, decisive headings.",
            "Let white space create structure — it's a design element, not waste.",
          ]}
          donts={[
            "Never let paragraphs span the full viewport width.",
            "Don't place both a hero image and a diagram in the same section.",
            "Don't use more than three columns for text-heavy content.",
            "Don't compress layout to fit more content — edit the content instead.",
          ]}
        />
      </section>
    </div>
  );
};

export default TokensLayout;
