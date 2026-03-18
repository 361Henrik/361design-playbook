import { PageHeader } from "@/components/PageHeader";

const systemRules = [
  "Use named spacing values (space-1 through space-9). Never introduce arbitrary pixel values.",
  "Follow the nine typography roles. Never invent new sizes or weights.",
  "Constrain content width: max-w-reading (720px) for text, max-w-content (1100px) for pages.",
  "One primary CTA per section. Labels: verb-first, 1–3 words.",
  "Use the master spec (curated-lens-system.md) as the canonical reference.",
];

const GuidelinesPage = () => {
  return (
    <div className="px-space-5 md:px-space-8 py-space-8 max-w-content">
      <PageHeader
        title="System · Guidelines"
        description="Calm, architectural, intelligent, editorial authority, controlled luxury. Restraint signals confidence."
      />

      <div className="space-y-10">
        {/* System Rules */}
        <section>
          <h2 className="font-display text-xl font-medium tracking-headline text-foreground mb-4">
            System Rules
          </h2>
          <div className="space-y-3">
            {systemRules.map((rule, i) => (
              <div key={i} className="flex items-start gap-4 py-3 border-b border-border last:border-b-0">
                <span className="font-display text-lg font-medium text-accent shrink-0 w-6 text-right">{i + 1}</span>
                <p className="text-sm font-body leading-reading text-foreground max-w-prose">{rule}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Brand Essence */}
        <section>
          <h2 className="font-display text-xl font-medium tracking-headline text-foreground mb-4">
            Brand Essence
          </h2>
          <p className="text-sm font-body leading-reading text-foreground max-w-prose">
            Calm, architectural, intelligent, editorial authority, controlled luxury. Every decision should reinforce restraint as a signal of confidence.
          </p>
        </section>

        {/* Imagery Philosophy */}
        <section>
          <h2 className="font-display text-xl font-medium tracking-headline text-foreground mb-4">
            Imagery Philosophy
          </h2>
          <p className="text-sm font-body leading-reading text-foreground max-w-prose">
            Cinematic, contemplative, premium travel mood. Integrated product experience. Avoid staged corporate stock imagery. Avoid recognisable operator assets unless approved.
          </p>
        </section>

        {/* Avoidance List */}
        <section>
          <h2 className="font-display text-xl font-medium tracking-headline text-foreground mb-4">
            Avoidance List
          </h2>
          <ul className="space-y-2 text-sm font-body leading-reading text-foreground max-w-prose">
            <li>No decorative or trend-driven styling</li>
            <li>No startup-techy aesthetics</li>
            <li>No over-animated layouts (no bouncy, scaling, dramatic motion)</li>
            <li>No over-coloured layouts or gradients</li>
            <li>No multiple hero images per section</li>
            <li>One hero image or one diagram, not both</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default GuidelinesPage;
