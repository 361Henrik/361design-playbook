import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { History, GitCompareArrows, RotateCcw, Loader2, Clock, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Json } from "@/integrations/supabase/types";

type Version = {
  id: string;
  entity_type: string;
  entity_id: string;
  version_number: number;
  title: string;
  snapshot: Json;
  diff: Json | null;
  change_summary: string | null;
  changed_by: string | null;
  created_at: string;
};

const ChangelogPage = () => {
  const [versions, setVersions] = useState<Version[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>("all");
  const [selectedDiff, setSelectedDiff] = useState<Version | null>(null);
  const { toast } = useToast();

  const fetchVersions = async () => {
    let query = supabase
      .from("versions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    if (filterType !== "all") {
      query = query.eq("entity_type", filterType);
    }

    const { data, error } = await query;
    if (!error && data) setVersions(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchVersions();
  }, [filterType]);

  const revertToVersion = async (version: Version) => {
    if (version.entity_type !== "library_entry") {
      toast({ title: "Revert not supported", description: "Only library entries can be reverted.", variant: "destructive" });
      return;
    }

    const snapshot = version.snapshot as Record<string, any>;
    const { error } = await supabase
      .from("library_entries")
      .update({
        title: snapshot.title,
        summary: snapshot.summary,
        content: snapshot.content,
        rules: snapshot.rules,
        tags: snapshot.tags,
        status: snapshot.status,
      })
      .eq("id", version.entity_id);

    if (error) {
      toast({ title: "Revert failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Reverted", description: `Reverted to version ${version.version_number}.` });
      fetchVersions();
    }
  };

  const entityTypeColor = (type: string) => {
    switch (type) {
      case "library_entry": return "bg-primary/10 text-primary";
      case "token": return "bg-accent/20 text-accent-foreground";
      case "component": return "bg-secondary text-secondary-foreground";
      case "guideline": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return d.toLocaleDateString();
  };

  // Group versions by date
  const groupedVersions: Record<string, Version[]> = {};
  versions.forEach((v) => {
    const dateKey = new Date(v.created_at).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    if (!groupedVersions[dateKey]) groupedVersions[dateKey] = [];
    groupedVersions[dateKey].push(v);
  });

  return (
    <div className="px-8 py-10 max-w-5xl">
      <PageHeader
        title="Changelog"
        description="Track all changes across the design system. View diffs, compare versions, and revert when needed."
      />

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[160px] text-xs">
            <SelectValue placeholder="Entity type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="library_entry">Library Entry</SelectItem>
            <SelectItem value="token">Token</SelectItem>
            <SelectItem value="component">Component</SelectItem>
            <SelectItem value="guideline">Guideline</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Timeline */}
      {loading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </div>
      ) : versions.length === 0 ? (
        <div className="text-center py-12">
          <History className="h-8 w-8 text-muted-foreground/30 mx-auto mb-3" strokeWidth={1.5} />
          <p className="text-sm text-muted-foreground font-body">
            No version history yet. Changes will appear here as entries are created and updated.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedVersions).map(([dateKey, dayVersions]) => (
            <div key={dateKey}>
              <h3 className="text-xs font-body font-medium text-muted-foreground uppercase tracking-widest mb-3">
                {dateKey}
              </h3>
              <div className="space-y-2 relative">
                {/* Timeline line */}
                <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border" />

                {dayVersions.map((version) => (
                  <div key={version.id} className="flex gap-3 relative">
                    {/* Timeline dot */}
                    <div className="mt-2 shrink-0">
                      <div className="h-[9px] w-[9px] rounded-full bg-primary border-2 border-background relative z-10" />
                    </div>

                    <Card className="flex-1 hover:border-primary/20 transition-colors duration-ui">
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="text-sm font-medium font-body">{version.title}</span>
                              <Badge className={`text-[10px] font-mono ${entityTypeColor(version.entity_type)}`}>
                                {version.entity_type.replace("_", " ")}
                              </Badge>
                              <Badge variant="outline" className="text-[10px] font-mono">
                                v{version.version_number}
                              </Badge>
                            </div>
                            {version.change_summary && (
                              <p className="text-xs text-muted-foreground font-body">{version.change_summary}</p>
                            )}
                            <div className="flex items-center gap-1 mt-1">
                              <Clock className="h-3 w-3 text-muted-foreground/50" strokeWidth={1.5} />
                              <span className="text-[10px] text-muted-foreground/50 font-body">
                                {formatDate(version.created_at)}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            {version.diff && (
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-7 w-7"
                                onClick={() => setSelectedDiff(version)}
                                title="View diff"
                              >
                                <GitCompareArrows className="h-3.5 w-3.5" strokeWidth={1.5} />
                              </Button>
                            )}
                            {version.version_number > 1 && (
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-7 w-7"
                                onClick={() => revertToVersion(version)}
                                title="Revert to this version"
                              >
                                <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Diff dialog */}
      <DiffDialog version={selectedDiff} onClose={() => setSelectedDiff(null)} />
    </div>
  );
};

function DiffDialog({ version, onClose }: { version: Version | null; onClose: () => void }) {
  if (!version || !version.diff) return null;

  const diff = version.diff as Record<string, any>;
  const before = diff.before || {};
  const after = diff.after || {};
  const fields = [...new Set([...Object.keys(before), ...Object.keys(after)])];

  return (
    <Dialog open={!!version} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-base font-display">
            Version {version.version_number} — {version.title}
          </DialogTitle>
          <DialogDescription className="text-xs font-body">
            {version.change_summary}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {fields.map((field) => {
            const bVal = typeof before[field] === "object" ? JSON.stringify(before[field], null, 2) : String(before[field] ?? "—");
            const aVal = typeof after[field] === "object" ? JSON.stringify(after[field], null, 2) : String(after[field] ?? "—");
            const changed = bVal !== aVal;

            if (!changed) return null;

            return (
              <div key={field} className="space-y-1">
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{field}</p>
                <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-start">
                  <div className="rounded bg-destructive/5 border border-destructive/20 p-2">
                    <p className="text-xs font-mono text-destructive/80 whitespace-pre-wrap break-words">{bVal}</p>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground mt-2 shrink-0" strokeWidth={1.5} />
                  <div className="rounded bg-primary/5 border border-primary/20 p-2">
                    <p className="text-xs font-mono text-primary whitespace-pre-wrap break-words">{aVal}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ChangelogPage;
