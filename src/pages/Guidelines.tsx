import { PageHeader } from "@/components/PageHeader";

const GuidelinesPage = () => {
  return (
    <div className="px-8 py-10 max-w-5xl">
      <PageHeader
        title="Brand Guidelines"
        description="Calm, architectural, intelligent, editorial authority, controlled luxury. Restraint signals confidence."
      />

      <div className="space-y-6">
        <div className="p-5 rounded-md border border-border bg-card">
          <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-2">Brand Essence</h3>
          <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose">
            Calm, architectural, intelligent, editorial authority, controlled luxury. Every decision should reinforce restraint as a signal of confidence.
          </p>
        </div>

        <div className="p-5 rounded-md border border-border bg-card">
          <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-2">Imagery Philosophy</h3>
          <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose">
            Cinematic, contemplative, premium travel mood. Integrated product experience. Avoid staged corporate stock imagery. Avoid recognizable operator assets unless approved.
          </p>
        </div>

        <div className="p-5 rounded-md border-2 border-destructive/20 bg-card">
          <h3 className="font-display text-base font-medium tracking-headline text-destructive mb-2">Avoidance List</h3>
          <ul className="space-y-1.5 text-sm font-body leading-reading text-muted-foreground">
            <li>• No decorative or trend-driven styling</li>
            <li>• No startup-techy aesthetics</li>
            <li>• No over-animated layouts (no bouncy, scaling, dramatic motion)</li>
            <li>• No over-colored layouts or gradients</li>
            <li>• No multiple hero images per section</li>
            <li>• One hero image OR one diagram, not both</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GuidelinesPage;
