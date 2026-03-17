import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import {
  guardrailRules,
  categoryMeta,
  getHealthScore,
  getRuleCountByCategory,
  getTasteScore,
  getContrastResults,
  type RuleCategory,
  type GuardrailRule,
} from "@/data/guardrailRules";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Shield,
  ShieldOff,
  Plus,
  Gauge,
  Eye,
} from "lucide-react";

type Exception = {
  id: string;
  rule_id: string;
  reason: string;
  approved_by: string | null;
  expires_at: string | null;
  created_at: string;
};

const GuardrailsPage = () => {
  const score = getHealthScore();
  const counts = getRuleCountByCategory();
  const categoryOrder: RuleCategory[] = ["color", "typography", "layout", "motion", "imagery", "consistency"];
  const { isEditor } = useAuth();
  const { toast } = useToast();

  const [exceptions, setExceptions] = useState<Exception[]>([]);
  const [addingException, setAddingException] = useState<string | null>(null);
  const [exceptionReason, setExceptionReason] = useState("");
  const [showContrast, setShowContrast] = useState(false);

  const fetchExceptions = async () => {
    const { data } = await supabase.from("guardrail_exceptions").select("*");
    setExceptions((data as Exception[]) || []);
  };

  useEffect(() => { fetchExceptions(); }, []);

  const activeExceptionRuleIds = exceptions
    .filter((e) => !e.expires_at || new Date(e.expires_at) > new Date())
    .map((e) => e.rule_id);

  const tasteScore = getTasteScore(activeExceptionRuleIds);
  const contrastResults = getContrastResults();
  const contrastFailures = contrastResults.filter((r) => !r.passesBody);

  const addException = async () => {
    if (!addingException || !exceptionReason.trim()) return;
    const { error } = await supabase.from("guardrail_exceptions").insert({
      rule_id: addingException,
      reason: exceptionReason,
      expires_at: new Date(Date.now() + 30 * 86400000).toISOString(),
    });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else toast({ title: "Exception added", description: "Valid for 30 days." });
    setAddingException(null);
    setExceptionReason("");
    fetchExceptions();
  };

  const removeException = async (id: string) => {
    await supabase.from("guardrail_exceptions").delete().eq("id", id);
    fetchExceptions();
  };

  const getExceptionForRule = (ruleId: string) =>
    exceptions.find((e) => e.rule_id === ruleId && (!e.expires_at || new Date(e.expires_at) > new Date()));

  const tasteColor = tasteScore >= 90 ? "text-primary" : tasteScore >= 70 ? "text-accent" : "text-destructive";

  return (
    <div className="px-8 py-10 max-w-5xl space-y-10">
      <PageHeader
        title="Guardrails"
        description="System health dashboard showing all active rules and their enforcement status across tokens, components, and layout."
      />

      {/* Health Score + Taste Score */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <Shield className="h-8 w-8 text-primary mb-3" strokeWidth={1.5} />
            <p className="font-display text-4xl font-medium text-foreground">{score}%</p>
            <p className="text-xs font-body text-muted-foreground mt-1">System Health</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <Gauge className="h-8 w-8 text-accent mb-3" strokeWidth={1.5} />
            <p className={`font-display text-4xl font-medium ${tasteColor}`}>{tasteScore}</p>
            <p className="text-xs font-body text-muted-foreground mt-1">Taste Score</p>
            <p className="text-[10px] font-body text-muted-foreground/50 mt-0.5">Weighted compound</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
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
                      <Badge variant="destructive" className="text-[10px] px-1.5 py-0">{c.failing} failing</Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Accessibility contrast results */}
      <Card className={contrastFailures.length > 0 ? "border-destructive/30" : "border-primary/20"}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
              <CardTitle className="text-sm">WCAG AA Contrast Check</CardTitle>
              {contrastFailures.length > 0 ? (
                <Badge variant="destructive" className="text-[10px]">{contrastFailures.length} failing</Badge>
              ) : (
                <Badge variant="secondary" className="text-[10px] bg-primary/10 text-primary">All passing</Badge>
              )}
            </div>
            <Button variant="ghost" size="sm" className="text-xs h-7" onClick={() => setShowContrast(!showContrast)}>
              {showContrast ? "Hide" : "Show"} Details
            </Button>
          </div>
        </CardHeader>
        {showContrast && (
          <CardContent className="pt-0">
            <div className="space-y-1">
              {contrastResults.map((r, i) => (
                <div key={i} className="flex items-center gap-3 text-xs font-body py-1">
                  {r.passesBody ? (
                    <CheckCircle className="h-3.5 w-3.5 text-primary shrink-0" strokeWidth={2} />
                  ) : r.passesLarge ? (
                    <AlertTriangle className="h-3.5 w-3.5 text-accent shrink-0" strokeWidth={2} />
                  ) : (
                    <XCircle className="h-3.5 w-3.5 text-destructive shrink-0" strokeWidth={2} />
                  )}
                  <span className="text-foreground">{r.fg}</span>
                  <span className="text-muted-foreground/50">on</span>
                  <span className="text-foreground">{r.bg}</span>
                  <span className="font-mono text-muted-foreground ml-auto">{r.ratio}:1</span>
                  <Badge variant={r.passesBody ? "secondary" : "destructive"} className="text-[10px]">
                    {r.passesBody ? "AA" : r.passesLarge ? "AA Large" : "Fail"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Active exceptions banner */}
      {exceptions.length > 0 && (
        <Card className="border-accent/30 bg-accent/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <ShieldOff className="h-4 w-4 text-accent" strokeWidth={1.5} />
              <span className="text-sm font-body font-medium text-foreground">Active Exceptions</span>
              <Badge variant="secondary" className="text-[10px] font-mono">{exceptions.length}</Badge>
            </div>
            <div className="space-y-1">
              {exceptions.map((ex) => {
                const rule = guardrailRules.find((r) => r.id === ex.rule_id);
                const expired = ex.expires_at && new Date(ex.expires_at) < new Date();
                return (
                  <div key={ex.id} className={`flex items-center gap-2 text-xs font-body ${expired ? "opacity-50" : ""}`}>
                    <span className="text-muted-foreground">{rule?.name || ex.rule_id}:</span>
                    <span className="text-foreground">{ex.reason}</span>
                    {ex.expires_at && (
                      <span className="text-[10px] text-muted-foreground/50">
                        {expired ? "(expired)" : `expires ${new Date(ex.expires_at).toLocaleDateString()}`}
                      </span>
                    )}
                    {isEditor && (
                      <button onClick={() => removeException(ex.id)} className="text-destructive/50 hover:text-destructive ml-auto">
                        <XCircle className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Rules by category */}
      {categoryOrder.map((cat) => {
        const meta = categoryMeta[cat];
        const rules = guardrailRules.filter((r) => r.category === cat);
        const Icon = meta.icon;

        return (
          <section key={cat} className="space-y-4">
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
              <h2 className="font-display text-lg font-medium tracking-headline text-foreground">{meta.label}</h2>
              <Badge variant="bronze" className="font-mono text-[10px]">{rules.length} rules</Badge>
            </div>

            <div className="space-y-2">
              {rules.map((rule) => (
                <RuleRow
                  key={rule.id}
                  rule={rule}
                  exception={getExceptionForRule(rule.id)}
                  isEditor={isEditor}
                  onAddException={() => setAddingException(rule.id)}
                />
              ))}
            </div>
          </section>
        );
      })}

      {/* Legend */}
      <Separator />
      <div className="flex flex-wrap gap-6 text-xs font-body text-muted-foreground">
        <div className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-primary" strokeWidth={2} /> Pass</div>
        <div className="flex items-center gap-1.5"><XCircle className="h-3.5 w-3.5 text-destructive" strokeWidth={2} /> Error</div>
        <div className="flex items-center gap-1.5"><AlertTriangle className="h-3.5 w-3.5 text-accent" strokeWidth={2} /> Warning</div>
        <div className="flex items-center gap-1.5"><ShieldOff className="h-3.5 w-3.5 text-accent" strokeWidth={2} /> Exception</div>
      </div>

      {/* Exception dialog */}
      <Dialog open={!!addingException} onOpenChange={() => setAddingException(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">Add Exception</DialogTitle>
            <DialogDescription className="font-body text-sm">
              Allow this rule to be intentionally broken for a campaign or special case. Expires in 30 days.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={exceptionReason}
            onChange={(e) => setExceptionReason(e.target.value)}
            placeholder="Reason for exception…"
            className="text-sm"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddingException(null)}>Cancel</Button>
            <Button onClick={addException}>Add Exception</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

function RuleRow({ rule, exception, isEditor, onAddException }: {
  rule: GuardrailRule;
  exception?: Exception;
  isEditor: boolean;
  onAddException: () => void;
}) {
  const isPassing = rule.status === "pass";

  return (
    <Card className={`transition-colors duration-ui ${!isPassing && !exception ? "border-destructive/30" : ""} ${exception ? "border-accent/30" : ""}`}>
      <CardContent className="p-4 flex items-start gap-4">
        <div className="pt-0.5">
          {exception ? (
            <ShieldOff className="h-4 w-4 text-accent" strokeWidth={2} />
          ) : isPassing ? (
            <CheckCircle className="h-4 w-4 text-primary" strokeWidth={2} />
          ) : rule.severity === "error" ? (
            <XCircle className="h-4 w-4 text-destructive" strokeWidth={2} />
          ) : (
            <AlertTriangle className="h-4 w-4 text-accent" strokeWidth={2} />
          )}
        </div>

        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-body font-medium text-foreground">{rule.name}</p>
            <Badge variant={rule.severity === "error" ? "destructive" : "secondary"} className="text-[10px] px-1.5 py-0">{rule.severity}</Badge>
            {exception && <Badge className="text-[10px] px-1.5 py-0 bg-accent/20 text-accent-foreground">exception</Badge>}
            {rule.weight && (
              <span className="text-[10px] font-mono text-muted-foreground/40">w:{rule.weight}</span>
            )}
          </div>
          <p className="text-xs font-body text-muted-foreground leading-reading">{rule.description}</p>
          <p className="text-[11px] font-mono text-muted-foreground/70">Check: {rule.checkDescription}</p>
          {rule.details && <p className="text-[11px] font-body text-accent italic">{rule.details}</p>}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <Badge variant={isPassing || exception ? "secondary" : "destructive"} className="text-[10px]">
            {exception ? "EXCEPTED" : isPassing ? "PASS" : "FAIL"}
          </Badge>
          {!isPassing && !exception && isEditor && (
            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={onAddException} title="Add exception">
              <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default GuardrailsPage;
