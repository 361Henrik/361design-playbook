import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { MapPin, BookOpen, Compass, UserCheck } from "lucide-react";

const NarrativePatterns = () => {
  return (
    <div className="px-space-5 md:px-space-8 py-space-8 max-w-content">
      <PageHeader
        title="Narrative Patterns"
        description="A graphic pattern for representing progression — use it for storytelling, explanations, journeys, and onboarding."
      />

      {/* Purpose */}
      <div className="mb-10">
        <h2 className="font-display text-lg font-medium tracking-headline leading-section text-foreground mb-4">Purpose</h2>
        <p className="text-sm font-body text-muted-foreground max-w-prose mb-4">
          Use the narrative path style when content has a clear sequence or flow. It turns abstract steps into a visible journey.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: BookOpen, label: "Storytelling", desc: "Layered narratives with a beginning, middle, and end." },
            { icon: Compass, label: "Explanations", desc: "Step-by-step breakdowns of a process or concept." },
            { icon: MapPin, label: "Journeys", desc: "Physical or thematic routes through places or ideas." },
            { icon: UserCheck, label: "Onboarding", desc: "Guided first-run experiences that build confidence." },
          ].map((item) => (
            <div key={item.label} className="p-4 rounded-md border border-border bg-card">
              <item.icon className="h-4 w-4 text-accent mb-3" strokeWidth={1.5} />
              <p className="text-xs font-body font-medium text-foreground mb-1">{item.label}</p>
              <p className="text-[11px] font-body text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Graphic Principles */}
      <div className="mb-10">
        <h2 className="font-display text-lg font-medium tracking-headline leading-section text-foreground mb-4">Graphic Principles</h2>

        {/* Flowing path */}
        <div className="p-5 rounded-md border border-border bg-card mb-4">
          <p className="text-xs font-body font-medium text-foreground mb-1">Flowing path lines</p>
          <p className="text-sm font-body text-muted-foreground mb-4">
            Use a single vertical or horizontal line to connect stops. The line represents progression — keep it thin (1px), using the border colour token.
          </p>
          <div className="rounded-md border border-border bg-muted/30 p-6">
            <div className="flex flex-col gap-0 max-w-sm">
              {["Arrive", "Discover", "Reflect"].map((label, i, arr) => (
                <div key={label} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-[10px] font-body font-medium shrink-0">
                      {i + 1}
                    </div>
                    {i < arr.length - 1 && <div className="w-px flex-1 bg-border min-h-[20px]" />}
                  </div>
                  <p className="text-sm font-body text-foreground pb-5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modular information */}
        <div className="p-5 rounded-md border border-border bg-card mb-4">
          <p className="text-xs font-body font-medium text-foreground mb-1">Modular information</p>
          <p className="text-sm font-body text-muted-foreground mb-4">
            Each stop on the path is a self-contained module. It can represent a concept, a place, or a step — but always one idea only.
          </p>
          <div className="rounded-md border border-border bg-muted/30 p-6">
            <div className="grid grid-cols-3 gap-4">
              {[
                { tag: "Place", title: "Historic harbour", desc: "Maritime heritage and trade history." },
                { tag: "Concept", title: "Tidal patterns", desc: "How the coast shapes daily life." },
                { tag: "Step", title: "Scan & explore", desc: "QR entry to the walking route." },
              ].map((mod) => (
                <div key={mod.title} className="p-4 rounded-md border border-border bg-background">
                  <Badge variant="outline" className="text-[10px] font-body mb-2">{mod.tag}</Badge>
                  <p className="text-xs font-body font-medium text-foreground mb-1">{mod.title}</p>
                  <p className="text-[11px] font-body text-muted-foreground">{mod.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Spacing rules */}
        <div className="p-5 rounded-md border border-border bg-card">
          <p className="text-xs font-body font-medium text-foreground mb-1">Spacing &amp; density</p>
          <p className="text-sm font-body text-muted-foreground">
            Path stops use <code className="text-[11px] font-mono bg-muted px-1 py-0.5 rounded">space-6</code> vertical rhythm between modules.
            Stop content padding uses <code className="text-[11px] font-mono bg-muted px-1 py-0.5 rounded">space-4</code>.
            Text stacks within a stop use <code className="text-[11px] font-mono bg-muted px-1 py-0.5 rounded">space-3</code>.
            Keep one idea per stop — never combine a place and a concept in a single module.
          </p>
        </div>
      </div>

      {/* Do / Don't */}
      <div>
        <h2 className="font-display text-lg font-medium tracking-headline leading-section text-foreground mb-4">Do / Don't</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-md border border-accent/20 bg-card">
            <p className="text-xs font-body font-medium text-accent mb-2">Do</p>
            <ul className="space-y-1.5 text-sm font-body text-muted-foreground">
              <li>• Use numbered stops for sequential content</li>
              <li>• Keep each stop to one idea, place, or step</li>
              <li>• Use a thin connecting line (1px, border token)</li>
              <li>• Apply consistent vertical rhythm (space-6)</li>
              <li>• Use badges to categorise stop types</li>
            </ul>
          </div>
          <div className="p-4 rounded-md border border-destructive/20 bg-card">
            <p className="text-xs font-body font-medium text-destructive mb-2">Don't</p>
            <ul className="space-y-1.5 text-sm font-body text-muted-foreground">
              <li>• Don't use decorative path shapes or curves</li>
              <li>• Don't combine multiple ideas in one stop</li>
              <li>• Don't animate the path line or stops</li>
              <li>• Don't use colour-coded lines — keep it neutral</li>
              <li>• Don't add icons to every stop — numbers suffice</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NarrativePatterns;
