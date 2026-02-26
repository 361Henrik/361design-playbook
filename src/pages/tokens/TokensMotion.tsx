import { PageHeader } from "@/components/PageHeader";
import { CopyButton } from "@/components/CopyButton";
import { DosDonts } from "@/components/DosDonts";
import { useState } from "react";

const TokensMotion = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="px-8 py-10 max-w-5xl">
      <PageHeader
        title="Motion Tokens"
        description="UI transitions 300–400ms with ease-out. Hero movement 8–20s subtle loop. Restraint in every interaction."
      />

      <div className="space-y-6">
        {/* UI Transitions */}
        <div className="p-5 rounded-md border border-border bg-card">
          <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-2">UI Transitions</h3>
          <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose mb-4">
            All interactive UI elements use 300–400ms transitions with ease-out timing. Hover states, focus rings, sidebar collapse — all calm and controlled.
          </p>
          <div className="flex items-center gap-4 mb-3">
            <CopyButton value="duration-ui" label="tw: duration-ui (350ms)" />
            <CopyButton value="transition-duration: 350ms" label="CSS" />
            <CopyButton value="ease-out" label="easing: ease-out" />
          </div>

          {/* Live demo */}
          <div className="mt-4 p-4 rounded-md bg-background border border-border">
            <p className="text-xs font-body text-muted-foreground mb-3">Live demo — hover the element:</p>
            <div
              className="inline-block px-5 py-2.5 rounded-md border border-border bg-card text-sm font-body font-medium text-card-foreground transition-all duration-ui ease-out cursor-pointer hover:border-primary/40 hover:shadow-sm"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              {hovered ? "350ms ease-out ✓" : "Hover me"}
            </div>
          </div>
        </div>

        {/* Hero Loops */}
        <div className="p-5 rounded-md border border-border bg-card">
          <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-2">Hero Loops</h3>
          <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose mb-3">
            Ambient hero animations use 8–20 second loops. Subtle, contemplative movement — never attention-grabbing. Think slow breathing, gentle drift.
          </p>
          <div className="flex flex-wrap gap-2">
            <CopyButton value="8s" label="min: 8s" />
            <CopyButton value="20s" label="max: 20s" />
            <CopyButton value="animation-timing-function: ease-in-out" label="easing: ease-in-out" />
          </div>
        </div>

        {/* Transition types */}
        <div className="p-5 rounded-md border border-border bg-card">
          <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-2">Approved Transition Properties</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
            {["color", "background-color", "border-color", "opacity", "box-shadow", "transform (translate only)"].map((prop) => (
              <div key={prop} className="px-3 py-2 rounded bg-primary/5 border border-primary/10 text-xs font-body text-card-foreground">
                {prop}
              </div>
            ))}
          </div>
        </div>

        {/* Prohibited */}
        <div className="p-5 rounded-md border-2 border-destructive/20 bg-card">
          <p className="text-sm font-body font-medium text-destructive mb-3">✗ Prohibited Motion Patterns</p>
          <ul className="space-y-2 text-sm font-body leading-reading text-muted-foreground">
            <li className="flex gap-2"><span className="text-destructive">✗</span> Parallax-heavy transitions</li>
            <li className="flex gap-2"><span className="text-destructive">✗</span> Bouncing or scaling buttons</li>
            <li className="flex gap-2"><span className="text-destructive">✗</span> Dramatic page transitions</li>
            <li className="flex gap-2"><span className="text-destructive">✗</span> Over-animated layouts or loading sequences</li>
            <li className="flex gap-2"><span className="text-destructive">✗</span> Any motion that breaks architectural calm</li>
            <li className="flex gap-2"><span className="text-destructive">✗</span> Scale transforms on interactive elements</li>
          </ul>
        </div>
      </div>

      {/* Do / Don't */}
      <section className="mt-12">
        <h2 className="font-display text-xl font-medium tracking-headline leading-section text-foreground mb-4">
          Do / Don't
        </h2>
        <DosDonts
          dos={[
            "Use 300–400ms ease-out for all UI transitions.",
            "Keep hero animations subtle and long (8–20s loops).",
            "Only animate color, opacity, box-shadow, and translate.",
            "Let stillness be the default — motion is the exception.",
          ]}
          donts={[
            "No parallax-heavy scroll effects.",
            "No bouncing, scaling, or elastic button animations.",
            "No dramatic page or route transitions.",
            "No spring physics or playful motion curves.",
          ]}
        />
      </section>
    </div>
  );
};

export default TokensMotion;
