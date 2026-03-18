import { PageHeader } from "@/components/PageHeader";
import { AppliedExampleRenderer } from "@/components/playbook/AppliedExampleRenderer";

const SignifiersClarity = () => (
  <div className="px-space-5 md:px-space-8 py-space-8 max-w-content">
    <PageHeader
      title="Signifiers & Clarity"
      description="The interface should communicate meaning through visual cues alone. Users understand what to do without being told."
    />

    <div className="space-y-8">
      <div className="p-5 rounded-md border border-border bg-card">
        <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-2">
          Guiding Principle
        </h3>
        <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose">
          Clarity is the highest form of respect for the user. Every element should reveal its purpose through its appearance — not through labels, tooltips, or instructions. When the interface is well-designed, guidance becomes invisible.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-medium tracking-headline text-foreground">
          Active States
        </h2>
        <div className="p-5 rounded-md border border-border bg-card">
          <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose mb-3">
            Selected items should be unmistakable. Use a combination of background contrast, a subtle accent border, and slightly bolder text weight to distinguish active elements from their surroundings.
          </p>
          <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose">
            The difference should feel natural — like a quiet emphasis rather than a loud highlight.
          </p>
        </div>
        {/* Mini example */}
        <div className="flex gap-3">
          <div className="px-4 py-2 rounded-md bg-sidebar-accent text-primary font-body text-sm font-medium border border-primary/20">
            Selected
          </div>
          <div className="px-4 py-2 rounded-md bg-card text-muted-foreground font-body text-sm border border-border">
            Default
          </div>
          <div className="px-4 py-2 rounded-md bg-card text-muted-foreground font-body text-sm border border-border">
            Default
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-medium tracking-headline text-foreground">
          Hover States
        </h2>
        <div className="p-5 rounded-md border border-border bg-card">
          <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose">
            Hover should feel like a gentle invitation. A slight background shift or a soft underline is enough to signal interactivity. Avoid colour changes that feel aggressive or animations that draw excessive attention. The transition should be barely perceptible — 200ms ease-out at most.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-medium tracking-headline text-foreground">
          Disabled States
        </h2>
        <div className="p-5 rounded-md border border-border bg-card">
          <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose mb-3">
            Disabled elements should recede into the background. Reduce opacity to approximately 40%, remove interactive cursors, and let the surrounding active elements take visual priority.
          </p>
          <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose">
            A disabled element should never confuse — it should simply feel unavailable, like a door that is clearly closed.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-body text-sm">
            Available
          </button>
          <button className="px-4 py-2 rounded-md bg-primary/40 text-primary-foreground/50 font-body text-sm cursor-not-allowed">
            Unavailable
          </button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-medium tracking-headline text-foreground">
          Containers & Contrast
        </h2>
        <div className="p-5 rounded-md border border-border bg-card">
          <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose">
            Use containers to group related information and create visual hierarchy. A card with a subtle border separates content from its surroundings without demanding attention. Contrast — not decoration — is the primary tool for guiding the eye.
          </p>
        </div>
      </section>
    </div>
  </div>
);

export default SignifiersClarity;
