import { PageHeader } from "@/components/PageHeader";

const GuardrailsPage = () => {
  return (
    <div className="px-8 py-10 max-w-5xl">
      <PageHeader
        title="Guardrails"
        description="System health dashboard showing all active rules and violations across tokens, components, and layout."
      />
      <p className="text-sm font-body text-muted-foreground">Guardrails engine coming in Milestone 4.</p>
    </div>
  );
};

export default GuardrailsPage;
