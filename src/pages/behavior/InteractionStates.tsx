import { PageHeader } from "@/components/PageHeader";

const stateRows = [
  { state: "Default", description: "The resting appearance. Calm, readable, clearly defined." },
  { state: "Hover", description: "A gentle shift — slightly warmer background or soft underline. Invites without insisting." },
  { state: "Active / Pressed", description: "A brief, quiet acknowledgment. Slight darkening or inward shift that confirms the touch landed." },
  { state: "Focus", description: "A subtle ring or outline for keyboard navigation. Present but never distracting." },
  { state: "Disabled", description: "Reduced opacity, removed cursor. The element clearly communicates it is not available." },
  { state: "Loading", description: "A calm, understated indicator — a slow pulse or quiet spinner. Never urgent or anxious." },
];

const elements = [
  {
    name: "Buttons",
    note: "Primary buttons hold steady confidence. On hover, a slight background shift. On press, a gentle darkening. Disabled buttons fade to 40% opacity.",
  },
  {
    name: "Inputs",
    note: "Inputs gain a soft border accent on focus. Filled inputs show content clearly against the field. Error states use a controlled red border — never a full background change.",
  },
  {
    name: "Map Markers",
    note: "Default markers rest quietly on the map. Selected markers elevate slightly with a subtle shadow and accent ring. Hover reveals a calm tooltip with no animation delay.",
  },
  {
    name: "Navigation Items",
    note: "Active routes show a background fill and accent colour. Hover transitions feel like a whisper — 200ms, barely noticeable. The current page is always unmistakable.",
  },
];

const InteractionStates = () => (
  <div className="px-space-5 md:px-space-8 py-space-8 max-w-content">
    <PageHeader
      title="Interaction States"
      description="Every interactive element moves through a quiet choreography of states. Each state should feel intentional, never dramatic."
    />

    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="font-display text-xl font-medium tracking-headline text-foreground">
          The Six States
        </h2>
        <div className="space-y-3">
          {stateRows.map((r) => (
            <div key={r.state} className="p-4 rounded-md border border-border bg-card flex gap-4 items-baseline">
              <span className="font-body text-sm font-medium text-card-foreground w-28 shrink-0">{r.state}</span>
              <p className="text-sm font-body leading-reading text-muted-foreground">{r.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-medium tracking-headline text-foreground">
          Applied to Elements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {elements.map((el) => (
            <div key={el.name} className="p-5 rounded-md border border-border bg-card">
              <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-2">{el.name}</h3>
              <p className="text-sm font-body leading-reading text-muted-foreground">{el.note}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="p-5 rounded-md border border-border bg-card">
        <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-2">
          A Note on Consistency
        </h3>
        <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose">
          Every element in the system follows the same progression. This consistency means users never have to relearn how things behave — the interface becomes predictable in the best way. Predictability, in this context, is a form of elegance.
        </p>
      </div>
    </div>
  </div>
);

export default InteractionStates;
