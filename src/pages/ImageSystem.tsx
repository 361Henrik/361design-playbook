import { PageHeader } from "@/components/PageHeader";
import { DosDonts } from "@/components/DosDonts";

const examplePromptClass =
  "pl-4 border-l-2 border-primary/30 text-sm font-body italic leading-reading text-muted-foreground";

const ImageSystem = () => {
  return (
    <div className="px-8 py-10 max-w-5xl">
      <PageHeader
        title="Image System"
        description="A three-layered image philosophy: Hero, Experience, and Product in Use. The landscape is the hero — the product is a natural extension of the journey."
      />

      {/* Core Principle */}
      <div className="space-y-8">
        <div className="p-5 rounded-md border border-border bg-card">
          <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-2">
            Core Principle
          </h3>
          <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose">
            Capture real travel moments in real places, where the landscape is the hero and the product is a natural extension of the experience — never dominating it.
          </p>
          <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose mt-2">
            The visual tone should feel calm, cinematic, elegant, and observational. Nothing staged, nothing loud.
          </p>
        </div>

        {/* Layer 1 */}
        <section className="space-y-4">
          <h2 className="font-display text-xl font-medium tracking-headline text-foreground">
            Layer 1 — Hero (Emotion & Place)
          </h2>
          <div className="p-5 rounded-md border border-border bg-card">
            <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose mb-4">
              Use wide, cinematic compositions that establish place and atmosphere before human activity enters the frame.
            </p>
            <ul className="space-y-1.5 text-sm font-body leading-reading text-muted-foreground list-disc pl-5">
              <li>Show real, recognizable locations such as Geirangerfjord, Lake Thun, or the Wachau Valley</li>
              <li>Prioritize landscape over people</li>
              <li>Use no people or only minimal human presence</li>
              <li>Favor soft natural light, especially golden hour, early morning, or late afternoon</li>
              <li>Aim for a feeling of quiet anticipation: a place before it becomes a story</li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-widest font-body font-medium text-muted-foreground/60">Example Prompts</p>
            <blockquote className={examplePromptClass}>
              "Wide cinematic view of Geirangerfjord at sunrise, soft mist, no people, natural colors, high-end travel photography"
            </blockquote>
            <blockquote className={examplePromptClass}>
              "Rolling vineyard landscape in Wachau Valley, golden hour, layered depth, calm atmosphere"
            </blockquote>
          </div>
        </section>

        {/* Layer 2 */}
        <section className="space-y-4">
          <h2 className="font-display text-xl font-medium tracking-headline text-foreground">
            Layer 2 — Experience (Human Presence)
          </h2>
          <div className="p-5 rounded-md border border-border bg-card">
            <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose mb-4">
              Introduce people in a restrained, natural way so the image suggests experience without becoming lifestyle advertising.
            </p>
            <ul className="space-y-1.5 text-sm font-body leading-reading text-muted-foreground list-disc pl-5">
              <li>People should feel present but understated</li>
              <li>Show them from behind or in profile rather than facing the camera</li>
              <li>Avoid posed, performative, or fashion-led imagery</li>
              <li>Use neutral, timeless wardrobe with no visible branding</li>
              <li>Make the travel mode clear through context</li>
            </ul>
          </div>

          {/* Mode-specific direction */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Train", body: "Long-distance views, depth, anticipation, looking outward through panoramic windows." },
              { title: "Fjord Cruise", body: "Dramatic scale, open deck, vertical landscapes, powerful nature." },
              { title: "River Cruise", body: "Intimacy, cultural proximity, villages, vineyards, layered human landscape." },
            ].map((mode) => (
              <div key={mode.title} className="p-4 rounded-md border border-border bg-card">
                <p className="text-sm font-body font-medium text-card-foreground mb-1">{mode.title}</p>
                <p className="text-sm font-body leading-reading text-muted-foreground">{mode.body}</p>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <p className="text-xs uppercase tracking-widest font-body font-medium text-muted-foreground/60">Example Prompts</p>
            <blockquote className={examplePromptClass}>
              "Passenger seated by panoramic train window looking at distant alpine lake and mountains, soft light, cinematic realism"
            </blockquote>
            <blockquote className={examplePromptClass}>
              "Couple standing on fjord cruise deck, vast Norwegian mountains, quiet moment, natural colors"
            </blockquote>
            <blockquote className={examplePromptClass}>
              "Traveler leaning on river cruise railing, vineyard valley and small village nearby, warm evening light"
            </blockquote>
          </div>
        </section>

        {/* Layer 3 */}
        <section className="space-y-4">
          <h2 className="font-display text-xl font-medium tracking-headline text-foreground">
            Layer 3 — Product in Use (Curated Lens Visible)
          </h2>
          <div className="p-5 rounded-md border border-border bg-card">
            <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose mb-4">
              Show the product as a subtle part of the journey, never the main subject.
            </p>
            <ul className="space-y-1.5 text-sm font-body leading-reading text-muted-foreground list-disc pl-5">
              <li>Integrate the phone naturally into the scene</li>
              <li>Keep the device present but visually understated</li>
              <li>Show either a calm glance at the screen or the device resting alongside the environment</li>
              <li>The landscape or experience must always remain the dominant visual element</li>
            </ul>
          </div>
        </section>

        {/* Do's & Don'ts */}
        <section className="space-y-4">
          <h2 className="font-display text-xl font-medium tracking-headline text-foreground">
            Do's & Don'ts
          </h2>
          <DosDonts
            dos={[
              "Use real, recognizable travel locations",
              "Favor soft, natural light (golden hour, early morning)",
              "Keep people understated — from behind or in profile",
              "Show the product as a subtle, natural part of the scene",
              "Prioritize cinematic compositions with landscape as hero",
            ]}
            donts={[
              "Use staged corporate stock imagery",
              "Show posed, performative, or fashion-led shots",
              "Let the device dominate the composition",
              "Use low-contrast overlays that compromise text readability",
              "Include recognizable operator assets unless approved",
              "Use overly saturated or artificially enhanced color grading",
            ]}
          />
        </section>
      </div>
    </div>
  );
};

export default ImageSystem;
