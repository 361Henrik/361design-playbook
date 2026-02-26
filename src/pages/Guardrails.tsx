import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  guardrailRules,
  categoryMeta,
  getHealthScore,
  getRuleCountByCategory,
  type RuleCategory,
  type GuardrailRule,
} from "@/data/guardrailRules";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Shield,
} from "lucide-react";

const GuardrailsPage = () => {
  const score = getHealthScore();
  const counts = getRuleCountByCategory();
  const categoryOrder: RuleCategory[] = ["color", "typography", "layout", "motion", "imagery", "consistency"];

  return (
    <div className="px-8 py-10 max-w-5xl space-y-10">
      <PageHeader
        title="Guardrails"
        description="System health dashboard showing all active rules and their enforcement status across tokens, components, and layout."
      />

      {/* Health Score */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-1">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <Shield className="h-8 w-8 text-primary mb-3" strokeWidth={1.5} />
            <p className="font-display text-4xl font-medium text-foreground">{score}%</p>
            <p className="text-xs font-body text-muted-foreground mt-1">System Health</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categoryOrder.map((cat) => {
                const meta = categoryMeta[cat];
                const c = counts[cat] || { total: 0, passing: 0, failing: 0 };
                const Icon = meta.icon;
                return (
                  <div key={cat} className="text-center space-y-1">
                    <Icon className="h-5 w-5 mx-auto text-muted-foreground" strokeWidth={1.5} />
                    <p className="text-xs font-body font-medium text-foreground">{meta.label}</p>
                    <div className="flex items-center justify-center gap-1.5">
                      <span className="text-xs font-mono text-primary">{c.passing}</span>
                      <span className="text-[10px] text-muted-foreground/50">/</span>
                      <span className="text-xs font-mono text-muted-foreground">{c.total}</span>
                    </div>
                    {c.failing > 0 && (
                      <Badge variant="destructive" className="text-[10px] px-1.5 py-0">
                        {c.failing} failing
                      </Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rules by category */}
      {categoryOrder.map((cat) => {
        const meta = categoryMeta[cat];
        const rules = guardrailRules.filter((r) => r.category === cat);
        const Icon = meta.icon;

        return (
          <section key={cat} className="space-y-4">
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
              <h2 className="font-display text-lg font-medium tracking-headline text-foreground">
                {meta.label}
              </h2>
              <Badge variant="secondary" className="font-mono text-[10px]">
                {rules.length} rules
              </Badge>
            </div>

            <div className="space-y-2">
              {rules.map((rule) => (
                <RuleRow key={rule.id} rule={rule} />
              ))}
            </div>
          </section>
        );
      })}

      {/* Legend */}
      <Separator />
      <div className="flex flex-wrap gap-6 text-xs font-body text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <CheckCircle className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
          Pass
        </div>
        <div className="flex items-center gap-1.5">
          <XCircle className="h-3.5 w-3.5 text-destructive" strokeWidth={2} />
          Error (hard violation)
        </div>
        <div className="flex items-center gap-1.5">
          <AlertTriangle className="h-3.5 w-3.5 text-accent" strokeWidth={2} />
          Warning (soft guidance)
        </div>
      </div>
    </div>
  );
};

function RuleRow({ rule }: { rule: GuardrailRule }) {
  const isPassing = rule.status === "pass";

  return (
    <Card className={`transition-colors duration-ui ${!isPassing ? "border-destructive/30" : ""}`}>
      <CardContent className="p-4 flex items-start gap-4">
        {/* Status icon */}
        <div className="pt-0.5">
          {isPassing ? (
            <CheckCircle className="h-4 w-4 text-primary" strokeWidth={2} />
          ) : rule.severity === "error" ? (
            <XCircle className="h-4 w-4 text-destructive" strokeWidth={2} />
          ) : (
            <AlertTriangle className="h-4 w-4 text-accent" strokeWidth={2} />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-body font-medium text-foreground">{rule.name}</p>
            <Badge
              variant={rule.severity === "error" ? "destructive" : "secondary"}
              className="text-[10px] px-1.5 py-0"
            >
              {rule.severity}
            </Badge>
          </div>
          <p className="text-xs font-body text-muted-foreground leading-reading">
            {rule.description}
          </p>
          <p className="text-[11px] font-mono text-muted-foreground/70">
            Check: {rule.checkDescription}
          </p>
          {rule.details && (
            <p className="text-[11px] font-body text-accent italic">{rule.details}</p>
          )}
        </div>

        {/* Status badge */}
        <Badge variant={isPassing ? "secondary" : "destructive"} className="text-[10px] shrink-0">
          {isPassing ? "PASS" : "FAIL"}
        </Badge>
      </CardContent>
    </Card>
  );
}

export default GuardrailsPage;
