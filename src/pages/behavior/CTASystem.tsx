import { PageHeader } from "@/components/PageHeader";
import { Separator } from "@/components/ui/separator";

/* ------------------------------------------------------------------ */
/*  Reusable CTA button (real component, not image)                    */
/* ------------------------------------------------------------------ */
function CTAButton({
  label,
  variant,
}: {
  label: string;
  variant:
    | "bronze-solid"
    | "white-bronze-outline"
    | "cream-solid"
    | "terracotta-solid"
    | "cream-dark-text"
    | "white-outline";
}) {
  const base =
    "inline-flex items-center justify-center rounded-md font-body font-medium text-sm px-5 py-2.5 transition-colors duration-300";

  const classes: Record<typeof variant, string> = {
    "bronze-solid": `${base} bg-accent text-foreground hover:bg-accent/90`,
    "white-bronze-outline": `${base} bg-transparent border border-accent text-white hover:bg-accent/10`,
    "cream-solid": `${base} bg-background text-foreground hover:bg-background/90`,
    "terracotta-solid": `${base} bg-primary text-primary-foreground hover:bg-primary/90`,
    "cream-dark-text": `${base} bg-background text-foreground hover:bg-background/90`,
    "white-outline": `${base} bg-transparent border border-white/60 text-white hover:bg-white/10`,
  };

  return <button className={classes[variant]}>{label}</button>;
}

/* ------------------------------------------------------------------ */
/*  Matrix cell                                                        */
/* ------------------------------------------------------------------ */
interface CellProps {
  envBg: string;
  envTextClass: string;
  envMutedClass: string;
  containerLabel: string;
  containerDesc: string;
  containerStyle: string; // extra classes for the inner container
  children: React.ReactNode;
  note?: string;
}

function MatrixCell({
  envBg,
  envTextClass,
  envMutedClass,
  containerLabel,
  containerDesc,
  containerStyle,
  children,
  note,
}: CellProps) {
  return (
    <div className={`rounded-md p-5 ${envBg} flex flex-col gap-3`}>
      <p className={`text-[11px] font-body uppercase tracking-widest ${envMutedClass}`}>
        {containerLabel}
      </p>
      <div className={`rounded-md p-4 ${containerStyle}`}>
        <p className={`text-xs font-body mb-3 ${envTextClass} opacity-70`}>{containerDesc}</p>
        <div className="flex flex-wrap gap-3">{children}</div>
      </div>
      {note && (
        <p className={`text-[10px] font-body ${envMutedClass} mt-1`}>{note}</p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
const CTASystem = () => {
  return (
    <div className="px-space-5 md:px-space-8 py-space-8 max-w-content">
      <PageHeader
        title="CTA System"
        description="The single source of truth for all CTA behavior. Color is determined by environment first, then refined by container style."
      />

      {/* Principle */}
      <div className="mb-10 p-5 rounded-md border border-border bg-card">
        <h3 className="font-display text-base font-medium tracking-headline text-foreground mb-3">
          Two-step logic
        </h3>
        <ol className="space-y-2 text-sm font-body text-foreground list-decimal list-inside">
          <li>
            <strong>Environment</strong> — the background surface defines which CTA colors are valid.
          </li>
          <li>
            <strong>Container</strong> — filled, outlined, or neutral containers refine the final
            button behavior.
          </li>
        </ol>
        <p className="mt-3 text-sm font-body text-muted-foreground max-w-prose">
          CTA must always carry the highest contrast in its context. Background defines environment,
          container refines behavior.
        </p>
      </div>

      <Separator className="my-10" />

      {/* ── ENVIRONMENT × CONTAINER MATRIX ── */}
      <h2 className="font-display text-xl font-medium tracking-headline text-foreground mb-2">
        Environment × Container matrix
      </h2>
      <p className="text-sm font-body text-muted-foreground mb-8 max-w-prose">
        Each cell shows the correct CTA for a given environment and container combination.
      </p>

      {/* Column headers */}
      <div className="grid grid-cols-3 gap-4 mb-3">
        <p className="text-xs font-body font-medium text-foreground uppercase tracking-widest text-center">
          Green Environment
        </p>
        <p className="text-xs font-body font-medium text-foreground uppercase tracking-widest text-center">
          Cream Environment
        </p>
        <p className="text-xs font-body font-medium text-foreground uppercase tracking-widest text-center">
          Terracotta Environment
        </p>
      </div>

      {/* Row 1 — Filled Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <MatrixCell
          envBg="bg-deep-green"
          envTextClass="text-white"
          envMutedClass="text-white/40"
          containerLabel="Filled container"
          containerDesc="Green fill → neutral CTA"
          containerStyle="bg-white/5 border border-white/10"
          note="CTA must NOT match container color"
        >
          <CTAButton label="Explore" variant="cream-solid" />
          <CTAButton label="Learn more" variant="white-bronze-outline" />
        </MatrixCell>

        <MatrixCell
          envBg="bg-background border border-border"
          envTextClass="text-foreground"
          envMutedClass="text-muted-foreground"
          containerLabel="Filled container"
          containerDesc="Terracotta fill → neutral CTA"
          containerStyle="bg-primary rounded-md"
          note="Neutral button on colored fill"
        >
          <CTAButton label="View details" variant="cream-dark-text" />
        </MatrixCell>

        <MatrixCell
          envBg="bg-primary"
          envTextClass="text-white"
          envMutedClass="text-white/40"
          containerLabel="Filled container"
          containerDesc="Terracotta surface → neutral CTA"
          containerStyle="bg-white/5 border border-white/10"
          note="Never use Bronze or Green here"
        >
          <CTAButton label="View details" variant="cream-dark-text" />
          <CTAButton label="Dismiss" variant="white-outline" />
        </MatrixCell>
      </div>

      {/* Row 2 — Outlined Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <MatrixCell
          envBg="bg-deep-green"
          envTextClass="text-white"
          envMutedClass="text-white/40"
          containerLabel="Outlined container"
          containerDesc="Bronze outline → CTA may match"
          containerStyle="border-2 border-accent bg-transparent"
          note="CTA may use outline accent color"
        >
          <CTAButton label="Explore" variant="bronze-solid" />
        </MatrixCell>

        <MatrixCell
          envBg="bg-background border border-border"
          envTextClass="text-foreground"
          envMutedClass="text-muted-foreground"
          containerLabel="Outlined container"
          containerDesc="Accent outline → CTA may match"
          containerStyle="border-2 border-accent bg-transparent"
          note="Only case for colored CTAs outside defaults"
        >
          <CTAButton label="Open studio" variant="bronze-solid" />
        </MatrixCell>

        <MatrixCell
          envBg="bg-primary"
          envTextClass="text-white"
          envMutedClass="text-white/40"
          containerLabel="Outlined container"
          containerDesc="White outline → neutral CTA"
          containerStyle="border-2 border-white/30 bg-transparent"
          note="Outline white only — no color accent"
        >
          <CTAButton label="View details" variant="cream-dark-text" />
        </MatrixCell>
      </div>

      {/* Row 3 — Neutral Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MatrixCell
          envBg="bg-deep-green"
          envTextClass="text-white"
          envMutedClass="text-white/40"
          containerLabel="Neutral container"
          containerDesc="Default CTA on green"
          containerStyle="bg-transparent"
          note="Primary: Bronze solid"
        >
          <CTAButton label="Get started" variant="bronze-solid" />
          <CTAButton label="Learn more" variant="white-bronze-outline" />
        </MatrixCell>

        <MatrixCell
          envBg="bg-background border border-border"
          envTextClass="text-foreground"
          envMutedClass="text-muted-foreground"
          containerLabel="Neutral container"
          containerDesc="Default CTA on cream"
          containerStyle="bg-transparent"
          note="Primary: Terracotta solid"
        >
          <CTAButton label="Get started" variant="terracotta-solid" />
        </MatrixCell>

        <MatrixCell
          envBg="bg-primary"
          envTextClass="text-white"
          envMutedClass="text-white/40"
          containerLabel="Neutral container"
          containerDesc="Default CTA on terracotta"
          containerStyle="bg-transparent"
          note="Primary: Cream with dark text"
        >
          <CTAButton label="View details" variant="cream-dark-text" />
        </MatrixCell>
      </div>

      <Separator className="my-12" />

      {/* ── RULES SUMMARY ── */}
      <h2 className="font-display text-xl font-medium tracking-headline text-foreground mb-6">
        Rules summary
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Green */}
        <div className="p-5 rounded-md bg-deep-green">
          <h3 className="font-display text-sm font-medium text-accent mb-3">Green Environment</h3>
          <ul className="space-y-1.5 text-xs font-body text-white/70">
            <li>✓ Primary: Champagne Bronze, solid</li>
            <li>✓ Secondary: White + bronze outline</li>
            <li>✕ Never Terracotta</li>
            <li>✕ Never Bronze + Terracotta</li>
          </ul>
        </div>

        {/* Cream */}
        <div className="p-5 rounded-md border border-border bg-background">
          <h3 className="font-display text-sm font-medium text-foreground mb-3">
            Cream Environment
          </h3>
          <ul className="space-y-1.5 text-xs font-body text-muted-foreground">
            <li>✓ Primary: Terracotta, solid</li>
            <li>✓ Green or Bronze only via outlined containers</li>
            <li>✕ No arbitrary bronze without container logic</li>
          </ul>
        </div>

        {/* Terracotta */}
        <div className="p-5 rounded-md bg-primary">
          <h3 className="font-display text-sm font-medium text-primary-foreground mb-3">
            Terracotta Environment
          </h3>
          <ul className="space-y-1.5 text-xs font-body text-primary-foreground/70">
            <li>✓ Primary: Base Canvas + dark text</li>
            <li>✓ Secondary: White outline</li>
            <li>✕ Never Bronze or Green</li>
            <li>✕ Never Terracotta-on-Terracotta</li>
          </ul>
        </div>
      </div>

      {/* Global rules */}
      <div className="p-5 rounded-md border border-border bg-card">
        <h3 className="font-display text-sm font-medium text-foreground mb-3">Global rules</h3>
        <ul className="space-y-1.5 text-sm font-body text-foreground">
          <li>• Only one accent color per container</li>
          <li>• Do not stack warm or dominant colors in the same interaction layer</li>
          <li>• CTA must always carry the highest contrast in its context</li>
          <li>• Background defines environment → container refines behavior</li>
        </ul>
      </div>

      <Separator className="my-12" />

      {/* ── VISUAL PRIORITY ── */}
      <h2 className="font-display text-xl font-medium tracking-headline text-foreground mb-4">
        Visual priority
      </h2>
      <div className="flex items-center gap-3 text-sm font-body text-foreground">
        <span className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground font-medium">
          CTA
        </span>
        <span className="text-muted-foreground">→</span>
        <span className="px-3 py-1.5 rounded-md border-2 border-accent text-foreground font-medium">
          Container accent
        </span>
        <span className="text-muted-foreground">→</span>
        <span className="px-3 py-1.5 rounded-md bg-background border border-border text-foreground font-medium">
          Background
        </span>
      </div>

      <Separator className="my-12" />

      {/* ── GUARDRAILS ── */}
      <h2 className="font-display text-xl font-medium tracking-headline text-foreground mb-4">
        Guardrails
      </h2>
      <p className="text-sm font-body text-muted-foreground mb-4 max-w-prose">
        These rules are enforced system-wide. Violations flag as errors in the guardrail engine.
      </p>
      <div className="space-y-2">
        {[
          "Terracotta CTA on Deep Green background → error",
          "Bronze CTA on Terracotta surface → error",
          "CTA color matches its container background (low contrast) → error",
          "Multiple accent colors in one CTA area → error",
          "Warm color stacking (e.g. Terracotta on Bronze) → error",
        ].map((rule) => (
          <div
            key={rule}
            className="flex items-start gap-3 p-3 rounded-md border border-border bg-background"
          >
            <span className="text-xs font-mono text-destructive mt-0.5">ERR</span>
            <p className="text-sm font-body text-foreground">{rule}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CTASystem;
