import { PageHeader } from "@/components/PageHeader";

const TokensMotion = () => {
  return (
    <div className="px-8 py-10 max-w-5xl">
      <PageHeader
        title="Motion Tokens"
        description="UI transitions 300–400ms with ease-out. Hero movement 8–20s subtle loop. Restraint in every interaction."
      />

      <div className="space-y-6">
        <div className="p-5 rounded-md border border-border bg-card">
          <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-2">UI Transitions</h3>
          <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose mb-4">
            All interactive UI elements use 300–400ms transitions with ease-out timing. Hover states, focus rings, sidebar collapse — all calm and controlled.
          </p>
          <p className="text-xs font-body text-muted-foreground">
            Token: <code className="text-foreground">duration-ui</code> (350ms)
          </p>
        </div>

        <div className="p-5 rounded-md border border-border bg-card">
          <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-2">Hero Loops</h3>
          <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose">
            Ambient hero animations use 8–20 second loops. Subtle, contemplative movement — never attention-grabbing.
          </p>
        </div>

        <div className="p-5 rounded-md border-2 border-destructive/20 bg-card">
          <p className="text-sm font-body font-medium text-destructive mb-2">✗ Prohibited</p>
          <ul className="space-y-1.5 text-sm font-body leading-reading text-muted-foreground">
            <li>• Parallax-heavy transitions</li>
            <li>• Bouncing or scaling buttons</li>
            <li>• Dramatic page transitions</li>
            <li>• Over-animated layouts</li>
            <li>• Any motion that breaks architectural calm</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TokensMotion;
