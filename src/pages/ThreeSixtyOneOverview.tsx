import { Link } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Workflow, Presentation, FileText, Network, Wrench, ShieldCheck, Hexagon, PenTool } from "lucide-react";

const sections = [
  {
    title: "361 Identity",
    icon: PenTool,
    href: "/361/brand",
    description: "Logo, palette, type, and voice for offers, decks, docs.",
  },
  {
    title: "Offer & Pitch System",
    icon: Presentation,
    href: "/361/offers",
    description: "Slide templates, pricing blocks, case-study layout.",
  },
  {
    title: "Documentation System",
    icon: FileText,
    href: "/361/docs",
    description: "Spec doc, decision log (ADR), runbook, inline diagrams.",
  },
  {
    title: "Delivery Assets",
    icon: Network,
    href: "/361/delivery",
    description: "Workflow diagrams, service blueprints, system maps.",
  },
  {
    title: "Prototype Kit",
    icon: Wrench,
    href: "/361/prototype-kit",
    description: "Reusable demo screens, wireframe primitives, annotation system.",
  },
  {
    title: "Guardrails (Delivery)",
    icon: ShieldCheck,
    href: "/361/guardrails",
    description: "Quality bar for offers, docs, and prototypes.",
  },
  {
    title: "Icons — Mechanical",
    icon: Hexagon,
    href: "/361/icons",
    description: "1.75px stroke, square caps, build + flow + AI taxonomy.",
  },
];

export default function ThreeSixtyOneOverview() {
  return (
    <div className="px-space-5 md:px-space-8 py-space-8 max-w-content">
      <div className="flex items-center gap-3 mb-space-3">
        <Workflow className="h-5 w-5 text-accent" strokeWidth={1.5} />
        <span className="text-[11px] uppercase tracking-[0.08em] font-body font-medium text-muted-foreground">
          Domain
        </span>
      </div>
      <PageHeader
        title="361 AI Development"
        description="The delivery & build studio system. Mechanical, structured, legible at slide and document scale. Used to ship offers, documentation, prototypes, and internal delivery assets."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-space-6">
        {sections.map((s) => (
          <Link
            key={s.href}
            to={s.href}
            className="group p-5 rounded-md border border-border bg-card hover:border-accent transition-colors duration-ui"
          >
            <div className="flex items-start gap-4">
              <s.icon className="h-5 w-5 text-accent shrink-0 mt-0.5" strokeWidth={1.75} />
              <div>
                <h3 className="font-display text-base font-medium tracking-headline text-foreground">
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

      <section className="mt-space-9 p-5 rounded-md border border-border bg-card">
        <h2 className="font-display text-h3 tracking-headline mb-2 text-foreground">Two systems, one studio</h2>
        <p className="font-body text-sm leading-reading text-muted-foreground max-w-prose">
          361 AI Development shares the foundational palette, typography, and spacing scale with Host Atlas, but diverges in icon weight, density, and accent rules so its outputs hold their own at 200% zoom on slides and in documents.
        </p>
      </section>
    </div>
  );
}
