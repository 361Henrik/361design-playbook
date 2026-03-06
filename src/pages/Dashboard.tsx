import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Palette, Type, Ruler, LayoutGrid, Zap, Hexagon,
  Upload, BookOpen, CheckCircle2, ShieldCheck, Download,
  FileText, FolderOpen, Activity, TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";

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

const PIE_COLORS = [
  "hsl(153 38% 17%)",   // primary
  "hsl(36 42% 56%)",    // accent
  "hsl(240 10% 44%)",   // muted-fg
  "hsl(0 72% 51%)",     // destructive
];

type Stats = {
  totalEntries: number;
  approved: number;
  draft: number;
  conflict: number;
  totalSources: number;
  sourcesProcessed: number;
  sourcesFailed: number;
  recentVersions: number;
  entryTypeData: { name: string; value: number }[];
  statusData: { name: string; value: number }[];
};

const Dashboard = () => {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [checksDone, setChecksDone] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith("/tokens")) localStorage.setItem("onboarding_tokens", "true");
    if (path.startsWith("/guardrails")) localStorage.setItem("onboarding_guardrails", "true");
    if (path.startsWith("/export")) localStorage.setItem("onboarding_export", "true");

    Promise.all(onboardingSteps.map(async (s) => ({ key: s.key, done: await s.check() })))
      .then((results) => {
        const map: Record<string, boolean> = {};
        results.forEach((r) => (map[r.key] = r.done));
        setCompleted(map);
        setChecksDone(true);
      });
  }, []);

  // Fetch analytics
  useEffect(() => {
    async function fetchStats() {
      const [entriesRes, sourcesRes, versionsRes] = await Promise.all([
        supabase.from("library_entries").select("status, entry_type"),
        supabase.from("sources").select("status"),
        supabase.from("versions").select("id", { count: "exact", head: true }),
      ]);

      const entries = entriesRes.data || [];
      const sources = sourcesRes.data || [];

      const approved = entries.filter((e) => e.status === "approved").length;
      const draft = entries.filter((e) => e.status === "draft").length;
      const conflict = entries.filter((e) => e.status === "conflict").length;

      // Entry type distribution
      const typeCounts: Record<string, number> = {};
      entries.forEach((e) => {
        typeCounts[e.entry_type] = (typeCounts[e.entry_type] || 0) + 1;
      });
      const entryTypeData = Object.entries(typeCounts).map(([name, value]) => ({ name, value }));

      const statusData = [
        { name: "Approved", value: approved },
        { name: "Draft", value: draft },
        { name: "Conflict", value: conflict },
      ].filter((d) => d.value > 0);

      setStats({
        totalEntries: entries.length,
        approved,
        draft,
        conflict,
        totalSources: sources.length,
        sourcesProcessed: sources.filter((s) => s.status === "processed").length,
        sourcesFailed: sources.filter((s) => s.status === "failed").length,
        recentVersions: versionsRes.count ?? 0,
        entryTypeData,
        statusData,
      });
    }
    fetchStats();
  }, []);

  const completedCount = Object.values(completed).filter(Boolean).length;
  const allDone = completedCount === onboardingSteps.length;
  const hasData = stats && stats.totalEntries > 0;

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
            <div className="mt-4 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${(completedCount / onboardingSteps.length) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analytics Section */}
      {hasData && (
        <section className="mb-10">
          <h2 className="font-display text-xl font-medium tracking-headline leading-section text-foreground mb-6 flex items-center gap-2">
            <Activity className="h-5 w-5 text-accent" strokeWidth={1.5} />
            System Health
          </h2>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard icon={FileText} label="Library Entries" value={stats.totalEntries} sub={`${stats.approved} approved`} />
            <StatCard icon={FolderOpen} label="Sources" value={stats.totalSources} sub={`${stats.sourcesProcessed} processed`} />
            <StatCard icon={TrendingUp} label="Versions Tracked" value={stats.recentVersions} sub="all time" />
            <StatCard
              icon={ShieldCheck}
              label="Conflicts"
              value={stats.conflict}
              sub={stats.conflict === 0 ? "all clear" : "need review"}
              alert={stats.conflict > 0}
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.entryTypeData.length > 0 && (
              <Card>
                <CardContent className="p-5">
                  <h3 className="font-display text-sm font-medium text-foreground mb-4">Entry Types</h3>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={stats.entryTypeData}>
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                      <Tooltip />
                      <Bar dataKey="value" fill="hsl(153 38% 17%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}

            {stats.statusData.length > 0 && (
              <Card>
                <CardContent className="p-5">
                  <h3 className="font-display text-sm font-medium text-foreground mb-4">Entry Status</h3>
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie
                        data={stats.statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        dataKey="value"
                        nameKey="name"
                        label={({ name, value }) => `${name} (${value})`}
                        labelLine={false}
                      >
                        {stats.statusData.map((_, i) => (
                          <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      )}

      {/* Using the System */}
      <section className="mb-10">
        <h2 className="font-display text-h2 text-foreground mb-4">
          Using the System
        </h2>
        <p className="text-body font-body text-muted-foreground max-w-prose mb-6">
          Follow the path: Foundations → Components → Patterns. These five rules prevent inconsistency.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {[
            { num: "1", rule: "Use named spacing tokens (space-1 through space-9) — never arbitrary pixel values." },
            { num: "2", rule: "Follow the nine typography roles — never invent new sizes or weights." },
            { num: "3", rule: "Constrain content width: max-w-reading (720px) for text, max-w-content (1100px) for pages." },
            { num: "4", rule: "One primary CTA per section. Labels: verb-first, 1–3 words." },
            { num: "5", rule: "Use the master spec (curated-lens-system.md) as the canonical reference." },
          ].map((r) => (
            <Card key={r.num} className="p-4">
              <CardContent className="p-0 flex items-start gap-3">
                <span className="text-h3 font-display text-accent font-medium">{r.num}</span>
                <p className="text-body-sm font-body text-muted-foreground">{r.rule}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Sample Route */}
      <section className="mb-10">
        <h2 className="font-display text-h2 text-foreground mb-2">
          Sample Route
        </h2>
        <p className="text-body-sm font-body text-muted-foreground mb-6 max-w-prose">
          A five-stop walking route demonstrating how content flows through the guest experience.
        </p>
        <div className="flex flex-col gap-0">
          {[
            { num: 1, title: "Start port", desc: "Arrival point — welcome briefing, orientation, and route overview.", tag: "Start" },
            { num: 2, title: "Historic site", desc: "Key landmark with layered storytelling: timeline, context, and local significance.", tag: "Culture" },
            { num: 3, title: "Landscape view", desc: "Panoramic viewpoint — AR overlay identifies peaks, waterways, and distances.", tag: "Nature" },
            { num: 4, title: "Wildlife moment", desc: "Guided observation stop with species cards and seasonal notes.", tag: "Wildlife" },
            { num: 5, title: "Local culture", desc: "Artisan or community encounter — audio story and photo opportunity.", tag: "Culture" },
          ].map((stop, i, arr) => (
            <div key={stop.num} className="flex gap-4">
              {/* Timeline line */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-label font-body font-medium shrink-0">
                  {stop.num}
                </div>
                {i < arr.length - 1 && <div className="w-px flex-1 bg-border min-h-[24px]" />}
              </div>
              {/* Content */}
              <div className="pb-6">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display text-h3 text-foreground">{stop.title}</h3>
                  <Badge variant="outline" className="text-[10px] font-body">{stop.tag}</Badge>
                </div>
                <p className="text-body-sm font-body text-muted-foreground max-w-prose">{stop.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-h2 text-foreground mb-6">
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
              <h3 className="font-display text-h3 text-card-foreground">{cat.title}</h3>
              <p className="mt-1.5 text-body-sm font-body text-muted-foreground">{cat.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

function StatCard({ icon: Icon, label, value, sub, alert = false }: {
  icon: any; label: string; value: number; sub: string; alert?: boolean;
}) {
  return (
    <Card>
      <CardContent className="p-4 flex items-start gap-3">
        <div className={`rounded-md p-2 ${alert ? "bg-destructive/10" : "bg-primary/5"}`}>
          <Icon className={`h-4 w-4 ${alert ? "text-destructive" : "text-primary"}`} strokeWidth={1.5} />
        </div>
        <div>
          <p className="text-2xl font-display font-medium text-foreground">{value}</p>
          <p className="text-xs font-body text-muted-foreground">{label}</p>
          <p className={`text-[10px] font-mono mt-0.5 ${alert ? "text-destructive" : "text-muted-foreground"}`}>{sub}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default Dashboard;
