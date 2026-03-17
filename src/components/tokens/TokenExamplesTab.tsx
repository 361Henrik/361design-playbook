import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useWorkspace } from "@/hooks/useWorkspace";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle, AlertTriangle, Download } from "lucide-react";
import { SEED_VARIANTS, type VariantRow } from "@/data/studioData";

/* ---- Guardrail checks (inline, lightweight) ---- */

function runQuickChecks(text: string, slotType: string) {
  const issues: string[] = [];
  if (slotType === "cta" && text.includes("!")) issues.push("Exclamation in CTA");
  if (slotType === "cta" && text.trim().split(/\s+/).length > 3) issues.push("CTA > 3 words");
  if (slotType === "headline") {
    const words = text.split(" ");
    if (words.length > 1 && words.every((w) => w[0] === w[0]?.toUpperCase())) {
      issues.push("Title Case detected");
    }
  }
  const fillers = ["just", "simply", "actually", "basically"];
  const found = fillers.filter((f) => text.toLowerCase().includes(f));
  if (found.length) issues.push(`Filler: ${found.join(", ")}`);
  if (slotType === "body" && text.length > 52 * 2) {
    // rough proxy for 52ch
  }
  return issues;
}

/* ---- Preview renderer ---- */

function VariantPreview({ slotType, content }: { slotType: string; content: { text: string; meta?: Record<string, unknown> } }) {
  switch (slotType) {
    case "headline":
      return <p className="font-display text-2xl font-medium tracking-headline leading-section text-foreground">{content.text}</p>;
    case "body":
      return <p className="font-body text-sm leading-reading text-muted-foreground max-w-prose">{content.text}</p>;
    case "cta":
      return <Button size="sm">{content.text}</Button>;
    case "stat":
      return (
        <div className="flex items-baseline gap-2">
          <span className="font-display text-3xl font-medium tracking-headline text-foreground">{content.text}</span>
          {content.meta?.label && <span className="text-xs font-body text-muted-foreground">{String(content.meta.label)}</span>}
        </div>
      );
    default:
      return <p className="font-body text-sm text-foreground">{content.text}</p>;
  }
}

/* ---- Export helper ---- */

function exportSpec(variant: VariantRow & { tags: string[] }) {
  const lines = [
    `# Example: ${variant.name}`,
    `\n## Content\n"${variant.content.text}"`,
    `\n## Token Category\n${variant.token_category || "—"}`,
    `\n## Slot Type\n${variant.slot_type}`,
    `\n## Tags\n${variant.tags.join(" | ") || "none"}`,
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${variant.name.toLowerCase().replace(/\s+/g, "-")}.md`;
  a.click();
  URL.revokeObjectURL(url);
}

/* ---- Filter categories ---- */

const FILTER_CATEGORIES = ["channel", "format", "intent", "context"] as const;

interface TokenExamplesTabProps {
  tokenCategory: string;
}

export function TokenExamplesTab({ tokenCategory }: TokenExamplesTabProps) {
  const { activeWorkspace } = useWorkspace();
  const [variants, setVariants] = useState<(VariantRow & { tags: string[] })[]>([]);
  const [tagVocab, setTagVocab] = useState<{ name: string; category: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Record<string, string>>({});

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      // Load tag vocabulary
      const { data: tags } = await supabase
        .from("tag_vocabulary")
        .select("name, category")
        .in("category", [...FILTER_CATEGORIES]);
      setTagVocab(tags || []);

      // Load variants with token_category
      if (activeWorkspace?.id) {
        const { data: varData } = await supabase
          .from("variants")
          .select("*")
          .eq("workspace_id", activeWorkspace.id)
          .eq("token_category", tokenCategory)
          .order("sort_order");

        if (varData && varData.length > 0) {
          // Load tags for these variants
          const variantIds = varData.map((v) => v.id);
          const { data: vtData } = await supabase
            .from("variant_tags")
            .select("variant_id, tag_name")
            .in("variant_id", variantIds);

          const tagMap = new Map<string, string[]>();
          (vtData || []).forEach((vt) => {
            const arr = tagMap.get(vt.variant_id) || [];
            arr.push(vt.tag_name);
            tagMap.set(vt.variant_id, arr);
          });

          setVariants(
            varData.map((v) => ({
              ...v,
              content: v.content as { text: string; meta?: Record<string, unknown> },
              tags: tagMap.get(v.id) || [],
              token_category: (v as any).token_category || null,
            }))
          );
        } else {
          // Fallback to seed data
          const seeded = SEED_VARIANTS
            .filter((s) => {
              // Map seed variants to token categories
              const catMap: Record<string, string> = {
                headline: "typography",
                cta: "voice",
                body: "layout",
                stat: "color",
              };
              return catMap[s.slot_type] === tokenCategory;
            })
            .map((s, i) => ({
              ...s,
              id: `seed-${i}`,
              workspace_id: "",
              tags: [],
              token_category: tokenCategory,
            }));
          setVariants(seeded);
        }
      }
      setLoading(false);
    };
    load();
  }, [activeWorkspace?.id, tokenCategory]);

  // Client-side filtering by tags
  const filtered = useMemo(() => {
    return variants.filter((v) => {
      for (const cat of FILTER_CATEGORIES) {
        const filterVal = filters[cat];
        if (filterVal && filterVal !== "all") {
          if (!v.tags.includes(filterVal)) return false;
        }
      }
      return true;
    });
  }, [variants, filters]);

  if (loading) {
    return (
      <div className="space-y-4 mt-6">
        {[1, 2, 3].map((i) => <Skeleton key={i} className="h-32 w-full rounded-md" />)}
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-6">
      {/* Filter bar */}
      <div className="flex flex-wrap gap-3">
        {FILTER_CATEGORIES.map((cat) => {
          const options = tagVocab.filter((t) => t.category === cat);
          if (!options.length) return null;
          return (
            <Select
              key={cat}
              value={filters[cat] || "all"}
              onValueChange={(val) => setFilters((prev) => ({ ...prev, [cat]: val }))}
            >
              <SelectTrigger className="w-[150px] h-8 text-xs">
                <SelectValue placeholder={cat} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All {cat}</SelectItem>
                {options.map((o) => (
                  <SelectItem key={o.name} value={o.name}>{o.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        })}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-sm font-body text-muted-foreground">
              No examples match these filters. Try adjusting your selection.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filtered.map((v) => {
            const issues = runQuickChecks(v.content.text, v.slot_type);
            return (
              <Card key={v.id}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-display text-base font-medium tracking-headline text-card-foreground">
                          {v.name}
                        </h3>
                        {issues.length === 0 ? (
                          <CheckCircle className="h-3.5 w-3.5 text-primary shrink-0" strokeWidth={1.5} />
                        ) : (
                          <AlertTriangle className="h-3.5 w-3.5 text-accent shrink-0" strokeWidth={1.5} />
                        )}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        <Badge variant="bronze" className="text-[10px]">{v.slot_type}</Badge>
                        {v.tags.map((t) => (
                          <Badge key={t} variant="outline" className="text-[10px]">{t}</Badge>
                        ))}
                      </div>

                      {/* Preview */}
                      <div className="p-4 rounded-md bg-background border border-border">
                        <VariantPreview slotType={v.slot_type} content={v.content} />
                      </div>

                      {/* Guardrail issues */}
                      {issues.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {issues.map((iss) => (
                            <Badge key={iss} variant="destructive" className="text-[10px]">{iss}</Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Export */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0"
                      onClick={() => exportSpec(v)}
                    >
                      <Download className="h-4 w-4" strokeWidth={1.5} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
