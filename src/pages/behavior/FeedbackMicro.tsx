import { PageHeader } from "@/components/PageHeader";

const FeedbackMicro = () => (
  <div className="px-space-5 md:px-space-8 py-space-8 max-w-content">
    <PageHeader
      title="Feedback & Micro-interactions"
      description="Feedback should feel immediate, quiet, and reassuring — like a gentle confirmation that the system understood."
    />

    <div className="space-y-8">
      <div className="p-5 rounded-md border border-border bg-card">
        <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-2">
          Guiding Principle
        </h3>
        <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose">
          Every action deserves acknowledgment. But acknowledgment does not mean celebration. A save should feel confirmed, not congratulated. A copy should feel complete, not announced. The system speaks through quiet visual shifts — never through interruption.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-medium tracking-headline text-foreground">
          Confirmation Patterns
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Save & Submit",
              description: "A brief toast appears at the bottom of the viewport — muted background, calm text, auto-dismissing after 3 seconds. No sound, no dramatic entrance.",
            },
            {
              title: "Copy to Clipboard",
              description: "The icon shifts from a copy symbol to a quiet checkmark. The transition takes 200ms and reverses after 2 seconds. Nothing else changes.",
            },
            {
              title: "Selection",
              description: "Selected items gain a subtle accent background and a soft border. The change is immediate — no bounce, no scale, no overshoot.",
            },
            {
              title: "Deletion",
              description: "The item fades out over 200ms. A brief undo toast appears with a clear, calm action link. The space closes gently after the element is removed.",
            },
          ].map((p) => (
            <div key={p.title} className="p-5 rounded-md border border-border bg-card">
              <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-2">{p.title}</h3>
              <p className="text-sm font-body leading-reading text-muted-foreground">{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-medium tracking-headline text-foreground">
          What to Avoid
        </h2>
        <div className="p-5 rounded-md border-2 border-destructive/20 bg-card">
          <ul className="space-y-1.5 text-sm font-body leading-reading text-muted-foreground">
            <li>• Animations that draw attention away from the user's current focus</li>
            <li>• Bouncing, elastic, or spring-physics effects</li>
            <li>• Success messages that feel like achievements</li>
            <li>• Sounds, haptics, or any sensory interruption</li>
            <li>• Feedback that requires the user to dismiss it manually (except errors)</li>
          </ul>
        </div>
      </section>

      <div className="p-5 rounded-md border border-border bg-card">
        <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-2">
          The Quiet Standard
        </h3>
        <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose">
          The best feedback disappears from memory the moment it has served its purpose. If users notice the feedback mechanism itself, it is too loud. The goal is reassurance, not applause.
        </p>
      </div>
    </div>
  </div>
);

export default FeedbackMicro;
