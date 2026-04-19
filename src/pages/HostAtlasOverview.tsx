import { Link } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Compass, Map, Palette, MousePointer, Component, Route, Hexagon } from "lucide-react";

const sections = [
  {
    title: "Foundations",
    icon: Palette,
    href: "/tokens/colors",
    description: "Colors, typography, spacing, layout, motion, voice, logo.",
  },
  {
    title: "Interaction",
    icon: MousePointer,
    href: "/behavior/cta-system",
    description: "CTA system, states, feedback, motion, dark mode.",
  },
  {
    title: "Components",
    icon: Component,
    href: "/components",
    description: "Buttons, cards, forms, data, layout, navigation.",
  },
  {
    title: "Maps",
    icon: Map,
    href: "/maps/principles",
    description: "Host Atlas's signature surface — principles to examples.",
  },
  {
    title: "Patterns",
    icon: Route,
    href: "/narrative-patterns",
    description: "Narrative patterns and image system.",
  },
  {
    title: "Icons — Cartographic",
    icon: Hexagon,
    href: "/host-atlas/icons",
    description: "1.5px stroke, rounded caps, place + observation taxonomy.",
  },
];

export default function HostAtlasOverview() {
  return (
    <div className="px-space-5 md:px-space-8 py-space-8 max-w-content">
      <div className="flex items-center gap-3 mb-space-3">
        <Compass className="h-5 w-5 text-accent" strokeWidth={1.5} />
        <span className="text-[11px] uppercase tracking-[0.08em] font-body font-medium text-muted-foreground">
          Domain
        </span>
      </div>
      <PageHeader
        title="Host Atlas"
        description="The product design system. Calm, editorial, premium. Maps are its signature surface; everything in this domain serves the guest-facing product and operator adaptation layer."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-space-6">
        {sections.map((s) => (
          <Link
            key={s.href}
            to={s.href}
            className="group p-5 rounded-md border border-border bg-card hover:border-accent transition-colors duration-ui"
          >
            <div className="flex items-start gap-4">
              <s.icon className="h-5 w-5 text-accent shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <h3 className="font-display text-base font-medium tracking-headline text-foreground group-hover:text-foreground">
                  {s.title}
                </h3>
                <p className="mt-1 text-sm font-body text-muted-foreground leading-reading">
                  {s.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <section className="mt-space-9 p-5 rounded-md border border-border bg-deep-green text-cream">
        <h2 className="font-display text-h3 tracking-headline mb-2">Operator Adaptation</h2>
        <p className="font-body text-sm leading-reading text-cream/90 max-w-prose">
          Host Atlas adapts to each operator's identity through controlled token overrides — accent color, route color, logo, imagery, and tone. Structural rules (spacing, typography, map behavior, accessibility) remain immutable.
        </p>
      </section>
    </div>
  );
}
