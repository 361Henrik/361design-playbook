import { PageHeader } from "@/components/PageHeader";

const DarkMode = () => (
  <div className="px-space-5 md:px-space-8 py-space-8 max-w-content">
    <PageHeader
      title="Dark Mode Principles"
      description="Dark mode is not an inversion — it is a different atmosphere. The same calm, editorial quality must carry through."
    />

    <div className="space-y-8">
      <div className="p-5 rounded-md border border-border bg-card">
        <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-2">
          Philosophy
        </h3>
        <p className="text-sm font-body leading-reading text-foreground max-w-prose">
          A dark environment should feel like reading in a dimly lit, well-designed room — not like staring at a screen in the dark. Every surface, every colour, and every piece of text must be adjusted to maintain readability and visual calm without harshness.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-medium tracking-headline text-foreground">
          Surface Treatment
        </h2>
        <div className="p-5 rounded-md border border-border bg-card">
          <ul className="space-y-2 text-sm font-body leading-reading text-foreground">
            <li>The background should be a deep, warm grey — never pure black. Pure black creates harsh contrast that strains the eyes.</li>
            <li>Cards and elevated surfaces are slightly lighter than the background, creating gentle separation through subtle luminance shifts.</li>
            <li>Borders become softer — reduced from solid lines to faint separators. They guide the eye without cutting through the surface.</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-medium tracking-headline text-foreground">
          Colour Adjustments
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Reduced Saturation",
              body: "Colours that work in light mode can feel electric in dark mode. Desaturate all accent and semantic colours by 15–25% to maintain the editorial tone.",
            },
            {
              title: "Text Contrast",
              body: "Primary text should be warm off-white, not pure white. Secondary text should sit at roughly 60% opacity against the surface. This preserves hierarchy without glare.",
            },
            {
              title: "Accent Colours",
              body: "The primary accent softens slightly. It should remain identifiable but not glow. Think of it as the same voice at a lower volume.",
            },
            {
              title: "Semantic Colours",
              body: "Success, warning, error, and info tones all shift toward lower brightness. They remain distinguishable but integrate gently into the darker palette.",
            },
          ].map((c) => (
            <div key={c.title} className="p-5 rounded-md border border-border bg-card">
              <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-2">{c.title}</h3>
              <p className="text-sm font-body leading-reading text-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-medium tracking-headline text-foreground">
          Readability
        </h2>
        <div className="p-5 rounded-md border border-border bg-card">
          <p className="text-sm font-body leading-reading text-foreground max-w-prose">
            Long-form reading in dark mode requires particular care. Line spacing should remain generous, and paragraph width should stay within the comfortable prose measure. The goal is that a user could read for twenty minutes without fatigue — the same standard as light mode.
          </p>
        </div>
      </section>

      <div className="p-5 rounded-md border-2 border-border bg-card">
        <h3 className="font-display text-base font-medium tracking-headline text-foreground mb-2">Avoid</h3>
        <ul className="space-y-1.5 text-sm font-body leading-reading text-foreground">
          <li>• Pure black (#000) backgrounds</li>
          <li>• Pure white (#fff) text</li>
          <li>• Glowing or neon accent colours</li>
          <li>• Inverted shadows (light shadows on dark surfaces)</li>
          <li>• Assuming a simple CSS inversion is sufficient</li>
        </ul>
      </div>
    </div>
  </div>
);

export default DarkMode;
