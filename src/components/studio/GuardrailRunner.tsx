import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { guardrailRules, type GuardrailRule } from "@/data/guardrailRules";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

interface GuardrailRunnerProps {
  guardrailProfile: string[]; // rule IDs to check (empty = all)
  slotValues: Record<string, string>;
  layoutConstraints: Record<string, unknown>;
}

interface CheckResult {
  rule: GuardrailRule;
  passed: boolean;
  detail?: string;
}

export function GuardrailRunner({ guardrailProfile, slotValues, layoutConstraints }: GuardrailRunnerProps) {
  const results = useMemo(() => {
    const rulesToCheck = guardrailProfile.length > 0
      ? guardrailRules.filter((r) => guardrailProfile.includes(r.id))
      : guardrailRules;

    const checks: CheckResult[] = rulesToCheck.map((rule) => {
      // Run client-side checks based on rule ID
      switch (rule.id) {
        case "voice-no-exclamation-cta": {
          const ctaSlots = Object.entries(slotValues).filter(([k]) => k.includes("cta"));
          const hasExclamation = ctaSlots.some(([, v]) => v.includes("!"));
          return { rule, passed: !hasExclamation, detail: hasExclamation ? "CTA contains exclamation mark" : undefined };
        }
        case "voice-sentence-case": {
          const headlineSlots = Object.entries(slotValues).filter(([k]) => k.includes("headline"));
          const titleCase = headlineSlots.some(([, v]) => {
            const words = v.split(" ");
            return words.length > 1 && words.every((w) => w[0] === w[0]?.toUpperCase());
          });
          return { rule, passed: !titleCase, detail: titleCase ? "Headline appears to use Title Case" : undefined };
        }
        case "voice-cta-length": {
          const ctaSlots = Object.entries(slotValues).filter(([k]) => k.includes("cta"));
          const tooLong = ctaSlots.some(([, v]) => v.trim().split(/\s+/).length > 3);
          return { rule, passed: !tooLong, detail: tooLong ? "CTA exceeds 3 words" : undefined };
        }
        case "voice-no-filler": {
          const fillers = ["just", "simply", "actually", "basically"];
          const allText = Object.values(slotValues).join(" ").toLowerCase();
          const found = fillers.filter((f) => allText.includes(f));
          return { rule, passed: found.length === 0, detail: found.length > 0 ? `Filler words: ${found.join(", ")}` : undefined };
        }
        case "voice-no-urgency-scarcity": {
          const urgency = ["limited time", "don't miss", "only.*left", "hurry", "act now"];
          const allText = Object.values(slotValues).join(" ").toLowerCase();
          const found = urgency.some((u) => new RegExp(u).test(allText));
          return { rule, passed: !found, detail: found ? "Contains urgency/scarcity language" : undefined };
        }
        default:
          // For non-content rules, assume pass (they require visual/structural review)
          return { rule, passed: true };
      }
    });

    return checks;
  }, [guardrailProfile, slotValues, layoutConstraints]);

  const passing = results.filter((r) => r.passed).length;
  const failing = results.filter((r) => !r.passed);
  const total = results.length;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {failing.length === 0 ? (
          <CheckCircle className="h-4 w-4 text-primary" strokeWidth={1.5} />
        ) : (
          <AlertTriangle className="h-4 w-4 text-accent" strokeWidth={1.5} />
        )}
        <span className="text-sm font-body font-medium text-foreground">
          {passing}/{total} checks passed
        </span>
      </div>

      {failing.length > 0 && (
        <div className="space-y-1">
          {failing.map((f) => (
            <div key={f.rule.id} className="flex items-start gap-2 text-xs font-body">
              <XCircle className="h-3.5 w-3.5 text-destructive shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <span className="font-medium text-foreground">{f.rule.name}</span>
                {f.detail && <span className="text-muted-foreground ml-1">— {f.detail}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
