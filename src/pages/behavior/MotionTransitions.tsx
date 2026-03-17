import { PageHeader } from "@/components/PageHeader";

const MotionTransitions = () => (
  <div className="px-8 py-10 max-w-5xl">
    <PageHeader
      title="Motion & Transitions"
      description="Movement supports orientation. It tells the user where they came from and where they are going — nothing more."
    />

    <div className="space-y-8">
      <div className="p-5 rounded-md border border-border bg-card">
        <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-2">
          Core Philosophy
        </h3>
        <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose">
          Stillness is the default. Motion is used only when it clarifies a spatial relationship or confirms an action. If removing an animation changes nothing about the user's understanding, the animation should not exist.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-medium tracking-headline text-foreground">
          Timing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Micro-interactions", value: "150–200 ms", note: "Hover states, icon transitions, button presses. Fast enough to feel instant, slow enough to be perceived." },
            { label: "UI Transitions", value: "250–350 ms", note: "Panel reveals, accordion expand/collapse, content shifts. Calm and measured." },
            { label: "Ambient Loops", value: "8–20 seconds", note: "Hero imagery, background movement. Slow, contemplative, almost imperceptible." },
          ].map((t) => (
            <div key={t.label} className="p-5 rounded-md border border-border bg-card">
              <p className="text-xs uppercase tracking-widest font-body font-medium text-muted-foreground/60 mb-1">{t.label}</p>
              <p className="font-display text-lg font-medium text-card-foreground mb-2">{t.value}</p>
              <p className="text-sm font-body leading-reading text-muted-foreground">{t.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-medium tracking-headline text-foreground">
          Easing
        </h2>
        <div className="p-5 rounded-md border border-border bg-card">
          <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose">
            Use <span className="font-medium text-card-foreground">ease-out</span> for elements entering view — they arrive quickly and settle gently. Use <span className="font-medium text-card-foreground">ease-in-out</span> for ambient, looping movement where both start and end should feel soft.
          </p>
          <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose mt-2">
            Avoid linear timing (feels mechanical) and spring physics (feels playful). The system's personality is architectural calm, not energetic bounce.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-medium tracking-headline text-foreground">
          Common Patterns
        </h2>
        <div className="space-y-3">
          {[
            { pattern: "Panel Expand / Collapse", description: "Content slides down with a 250ms ease-out. Collapsing mirrors the timing. Height transitions only — no opacity fade needed." },
            { pattern: "Hover Transitions", description: "Background colour and text colour shift over 200ms. Nothing moves position. The change is purely tonal." },
            { pattern: "Map Marker Selection", description: "Selected marker gains a subtle scale increase (1.0 → 1.05) and a soft shadow over 200ms. Deselection reverses identically." },
            { pattern: "Page Content Load", description: "Content appears immediately. No staggered fade-in, no skeleton-to-content animation. If the data is ready, show it." },
          ].map((p) => (
            <div key={p.pattern} className="p-4 rounded-md border border-border bg-card flex gap-4 items-baseline">
              <span className="font-body text-sm font-medium text-card-foreground w-44 shrink-0">{p.pattern}</span>
              <p className="text-sm font-body leading-reading text-muted-foreground">{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="p-5 rounded-md border-2 border-destructive/20 bg-card">
        <h3 className="font-display text-base font-medium tracking-headline text-destructive mb-2">Never</h3>
        <ul className="space-y-1.5 text-sm font-body leading-reading text-muted-foreground">
          <li>• Parallax scroll effects</li>
          <li>• Page route transitions with sliding or fading</li>
          <li>• Bouncing, elastic, or overshoot animations</li>
          <li>• Scale transforms on buttons or interactive elements</li>
          <li>• Decorative motion that serves no spatial purpose</li>
        </ul>
      </div>
    </div>
  </div>
);

export default MotionTransitions;
