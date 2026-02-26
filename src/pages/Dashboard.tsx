import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette, Type, Ruler, LayoutGrid, Zap, Hexagon, Upload, BookOpen, CheckCircle2, ShieldCheck, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const categories = [
  { title: "Colors", description: "Deep Forest Green, Warm White, Antique Bronze — exact values and usage ratios.", icon: Palette, href: "/tokens/colors" },
  { title: "Typography", description: "Playfair Display headlines, Inter body — weights, line-heights, and discipline.", icon: Type, href: "/tokens/typography" },
  { title: "Spacing", description: "Section padding, headline gaps, paragraph spacing ranges.", icon: Ruler, href: "/tokens/spacing" },
  { title: "Layout", description: "Content widths, column control, panel pairings.", icon: LayoutGrid, href: "/tokens/layout" },
  { title: "Motion", description: "UI transitions, hero loops, and prohibited patterns.", icon: Zap, href: "/tokens/motion" },
  { title: "Icons", description: "Thin stroke, geometric, no fills, no gradients.", icon: Hexagon, href: "/tokens/icons" },
];

type Step = { key: string; label: string; icon: any; href: string; check: () => Promise<boolean> };

const onboardingSteps: Step[] = [
  { key: "upload", label: "Upload your first source", icon: Upload, href: "/sources", check: async () => { const { count } = await supabase.from("sources").select("*", { count: "exact", head: true }); return (count ?? 0) > 0; } },
  { key: "review", label: "Review draft entries", icon: BookOpen, href: "/library", check: async () => { const { count } = await supabase.from("library_entries").select("*", { count: "exact", head: true }).eq("status", "approved"); return (count ?? 0) > 0; } },
  { key: "tokens", label: "Browse design tokens", icon: Palette, href: "/tokens/colors", check: async () => { const v = localStorage.getItem("onboarding_tokens"); return v === "true"; } },
  { key: "guardrails", label: "Check guardrails", icon: ShieldCheck, href: "/guardrails", check: async () => { const v = localStorage.getItem("onboarding_guardrails"); return v === "true"; } },
  { key: "export", label: "Export starter kit", icon: Download, href: "/export", check: async () => { const v = localStorage.getItem("onboarding_export"); return v === "true"; } },
];

const Dashboard = () => {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [checksDone, setChecksDone] = useState(false);

  useEffect(() => {
    // Track page visits for onboarding
    const path = window.location.pathname;
    if (path.startsWith("/tokens")) localStorage.setItem("onboarding_tokens", "true");
    if (path.startsWith("/guardrails")) localStorage.setItem("onboarding_guardrails", "true");
    if (path.startsWith("/export")) localStorage.setItem("onboarding_export", "true");

    // Check all steps
    Promise.all(onboardingSteps.map(async (s) => ({ key: s.key, done: await s.check() })))
      .then((results) => {
        const map: Record<string, boolean> = {};
        results.forEach((r) => (map[r.key] = r.done));
        setCompleted(map);
        setChecksDone(true);
      });
  }, []);

  const completedCount = Object.values(completed).filter(Boolean).length;
  const allDone = completedCount === onboardingSteps.length;

  return (
    <div className="px-8 py-10 max-w-5xl">
      <PageHeader
        title="Design System Hub"
        description="The single source of truth for Curated Lens. Browse tokens, components, and guidelines — all enforced with brand guardrails."
      />

      {/* Onboarding checklist */}
      {checksDone && !allDone && (
        <Card className="mb-8 border-accent/30">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-sm font-medium text-foreground">Getting Started</h3>
              <Badge variant="secondary" className="text-[10px] font-mono">{completedCount}/{onboardingSteps.length}</Badge>
            </div>
            <div className="space-y-2">
              {onboardingSteps.map((step) => (
                <Link
                  key={step.key}
                  to={step.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-ui ${
                    completed[step.key] ? "bg-primary/5 text-primary" : "hover:bg-muted text-muted-foreground"
                  }`}
                >
                  {completed[step.key] ? (
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" strokeWidth={1.5} />
                  ) : (
                    <step.icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                  )}
                  <span className={`text-sm font-body ${completed[step.key] ? "line-through" : ""}`}>{step.label}</span>
                </Link>
              ))}
            </div>
            {/* Progress bar */}
            <div className="mt-4 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${(completedCount / onboardingSteps.length) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>
      )}

      <section>
        <h2 className="font-display text-xl font-medium tracking-headline leading-section text-foreground mb-6">
          Token Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              to={cat.href}
              className="group block rounded-md border border-border bg-card p-5 transition-colors duration-ui hover:border-primary/30"
            >
              <cat.icon className="h-5 w-5 text-accent mb-3" strokeWidth={1.5} />
              <h3 className="font-display text-base font-medium tracking-headline text-card-foreground">{cat.title}</h3>
              <p className="mt-1.5 text-sm font-body leading-reading text-muted-foreground">{cat.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
