import { PageHeader } from "@/components/PageHeader";

const templates = [
  {
    title: "Spec doc",
    structure: "Summary · Goals · Non-goals · Decisions · Open questions · Appendix.",
    note: "One H1 (the spec title). H2 for the six fixed sections. No deeper than H3.",
  },
  {
    title: "Decision log (ADR)",
    structure: "Status · Context · Decision · Consequences · Date.",
    note: "Numbered ADR-001, ADR-002, etc. Status is Proposed | Accepted | Superseded.",
  },
  {
    title: "Runbook",
    structure: "Trigger · Preconditions · Steps (numbered) · Verification · Rollback.",
    note: "Each step is one imperative sentence. Verification must be observable.",
  },
  {
    title: "Inline diagram",
    structure: "Mechanical icons on edges and nodes. Single-color (Charcoal). One Terracotta highlight allowed for the focal node.",
    note: "Diagrams render inline — never in a separate gallery.",
  },
];

export default function ThreeSixtyOneDocs() {
  return (
    <div className="px-space-5 md:px-space-8 py-space-8 max-w-content">
      <PageHeader
        title="Documentation System"
        description="Templates and conventions for spec docs, decision logs, runbooks, and inline diagrams. Built for skim-reading and async review."
      />

      <div className="space-y-4 mt-space-6">
        {templates.map((t) => (
          <article key={t.title} className="p-5 rounded-md border border-border bg-card">
            <h3 className="font-display text-base font-medium tracking-headline text-foreground mb-2">
              {t.title}
            </h3>
            <p className="text-sm font-body leading-reading text-foreground mb-2">
              <span className="text-muted-foreground">Structure: </span>{t.structure}
            </p>
            <p className="text-xs font-body text-muted-foreground">{t.note}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
