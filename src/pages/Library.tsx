import { useState, useEffect, useMemo } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Search, Loader2, CheckCircle2, FileEdit, Trash2, Sparkles, BookOpen, Tag, AlertTriangle, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type LibraryEntry = {
  id: string;
  title: string;
  entry_type: string;
  tags: string[] | null;
  summary: string | null;
  content: string | null;
  rules: string[] | null;
  status: string;
  version: number;
  created_at: string;
  source_id: string | null;
  related_entry_ids: string[] | null;
};

const LibraryPage = () => {
  const [entries, setEntries] = useState<LibraryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<LibraryEntry[] | null>(null);
  const [aiSummary, setAiSummary] = useState("");
  const [searching, setSearching] = useState(false);
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkLoading, setBulkLoading] = useState(false);
  const [conflictEntry, setConflictEntry] = useState<LibraryEntry | null>(null);
  const [conflictTargets, setConflictTargets] = useState<LibraryEntry[]>([]);
  const { toast } = useToast();
  const { isAdmin, isEditor } = useAuth();

  const fetchEntries = async () => {
    let query = supabase
      .from("library_entries")
      .select("*")
      .order("created_at", { ascending: false });

    if (filterType !== "all") query = query.eq("entry_type", filterType);
    if (filterStatus !== "all") query = query.eq("status", filterStatus);

    const { data, error } = await query;
    if (!error && data) setEntries(data as LibraryEntry[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchEntries();
  }, [filterType, filterStatus]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults(null);
      setAiSummary("");
      return;
    }
    setSearching(true);
    try {
      const { data, error } = await supabase.functions.invoke("search-library", {
        body: { query: searchQuery, filters: filterType !== "all" ? { entry_type: filterType } : undefined },
      });
      if (error) throw error;
      setSearchResults(data.results || []);
      setAiSummary(data.ai_summary || "");
    } catch (e: any) {
      toast({ title: "Search failed", description: e.message, variant: "destructive" });
    } finally {
      setSearching(false);
    }
  };

  const approveEntry = async (id: string) => {
    const { error } = await supabase.from("library_entries").update({ status: "approved" }).eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Approved" }); fetchEntries(); }
  };

  const rejectEntry = async (id: string) => {
    const { error } = await supabase.from("library_entries").update({ status: "rejected" }).eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Rejected" }); fetchEntries(); }
  };

  const deleteEntry = async (id: string) => {
    const { error } = await supabase.from("library_entries").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Deleted" }); fetchEntries(); }
  };

  // Conflict viewer
  const viewConflict = async (entry: LibraryEntry) => {
    if (!entry.related_entry_ids || entry.related_entry_ids.length === 0) return;
    const { data } = await supabase
      .from("library_entries")
      .select("*")
      .in("id", entry.related_entry_ids);
    setConflictTargets((data || []) as LibraryEntry[]);
    setConflictEntry(entry);
  };

  // Batch operations
  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelectedIds(next);
  };

  const displayEntries = searchResults !== null ? searchResults : entries;

  const toggleSelectAll = () => {
    if (selectedIds.size === displayEntries.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(displayEntries.map((e) => e.id)));
    }
  };

  const bulkAction = async (action: "approve" | "reject" | "delete") => {
    if (selectedIds.size === 0) return;
    setBulkLoading(true);
    const ids = Array.from(selectedIds);

    if (action === "delete") {
      const { error } = await supabase.from("library_entries").delete().in("id", ids);
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else toast({ title: `Deleted ${ids.length} entries` });
    } else {
      const status = action === "approve" ? "approved" : "rejected";
      const { error } = await supabase.from("library_entries").update({ status }).in("id", ids);
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else toast({ title: `${action === "approve" ? "Approved" : "Rejected"} ${ids.length} entries` });
    }
    setSelectedIds(new Set());
    setBulkLoading(false);
    fetchEntries();
  };

  // Counts
  const draftCount = useMemo(() => entries.filter((e) => e.status === "draft").length, [entries]);
  const conflictCount = useMemo(() => entries.filter((e) => e.status === "conflict").length, [entries]);

  const typeColor = (type: string) => {
    switch (type) {
      case "token": return "bg-primary/10 text-primary";
      case "guideline": return "bg-accent/20 text-accent-foreground";
      case "component": return "bg-secondary text-secondary-foreground";
      case "pattern": return "bg-muted text-muted-foreground";
      case "example": return "bg-primary/5 text-primary";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="px-8 py-10 max-w-5xl">
      <PageHeader
        title="Library"
        description="Searchable, filterable collection of all extracted design tokens, guidelines, components, and patterns."
      />

      {/* Stats bar */}
      <div className="flex gap-3 mb-4">
        {draftCount > 0 && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-accent/10 border border-accent/20">
            <Badge variant="secondary" className="text-xs font-mono">{draftCount}</Badge>
            <span className="text-xs font-body text-muted-foreground">drafts awaiting review</span>
          </div>
        )}
        {conflictCount > 0 && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-destructive/10 border border-destructive/20">
            <AlertTriangle className="h-3.5 w-3.5 text-destructive" strokeWidth={1.5} />
            <Badge variant="destructive" className="text-xs font-mono">{conflictCount}</Badge>
            <span className="text-xs font-body text-destructive/80">conflicts detected</span>
          </div>
        )}
      </div>

      {/* Search */}
      <div className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search the library… e.g. 'What color for accents?'"
            className="pl-9 text-sm"
          />
        </div>
        <Button onClick={handleSearch} disabled={searching} className="gap-2">
          {searching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" strokeWidth={1.5} />}
          Search
        </Button>
      </div>

      {/* AI Summary */}
      {aiSummary && (
        <Card className="mb-6 border-accent/30 bg-accent/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-2">
              <Sparkles className="h-4 w-4 text-accent mt-0.5 shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-xs font-medium text-accent mb-1 font-body">AI Answer</p>
                <p className="text-sm font-body leading-reading text-foreground">{aiSummary}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <Select value={filterType} onValueChange={(v) => { setFilterType(v); setSearchResults(null); }}>
          <SelectTrigger className="w-[140px] text-xs"><SelectValue placeholder="Type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="token">Token</SelectItem>
            <SelectItem value="guideline">Guideline</SelectItem>
            <SelectItem value="component">Component</SelectItem>
            <SelectItem value="pattern">Pattern</SelectItem>
            <SelectItem value="example">Example</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={(v) => { setFilterStatus(v); setSearchResults(null); }}>
          <SelectTrigger className="w-[140px] text-xs"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="conflict">Conflict</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bulk action bar */}
      {selectedIds.size > 0 && isEditor && (
        <div className="flex items-center gap-3 mb-4 px-3 py-2 rounded-md bg-primary/5 border border-primary/20">
          <span className="text-xs font-body text-foreground font-medium">{selectedIds.size} selected</span>
          <div className="flex gap-2 ml-auto">
            <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => bulkAction("approve")} disabled={bulkLoading}>
              Approve
            </Button>
            <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => bulkAction("reject")} disabled={bulkLoading}>
              Reject
            </Button>
            {isAdmin && (
              <Button size="sm" variant="destructive" className="text-xs h-7" onClick={() => bulkAction("delete")} disabled={bulkLoading}>
                Delete
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Results */}
      {loading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </div>
      ) : displayEntries.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="h-8 w-8 text-muted-foreground/30 mx-auto mb-3" strokeWidth={1.5} />
          <p className="text-sm text-muted-foreground font-body">
            {searchResults !== null ? "No results found." : "No library entries yet. Upload a source to get started."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Select all */}
          {isEditor && (
            <div className="flex items-center gap-2 px-1">
              <Checkbox
                checked={selectedIds.size === displayEntries.length && displayEntries.length > 0}
                onCheckedChange={toggleSelectAll}
              />
              <span className="text-[10px] text-muted-foreground font-body">Select all ({displayEntries.length})</span>
            </div>
          )}

          {displayEntries.map((entry) => (
            <Card key={entry.id} className={`hover:border-primary/20 transition-colors duration-ui ${entry.status === "conflict" ? "border-destructive/30 bg-destructive/[0.02]" : ""}`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  {isEditor && (
                    <Checkbox
                      className="mt-1"
                      checked={selectedIds.has(entry.id)}
                      onCheckedChange={() => toggleSelect(entry.id)}
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-medium font-body">{entry.title}</h3>
                      <Badge className={`text-[10px] font-mono ${typeColor(entry.entry_type)}`}>{entry.entry_type}</Badge>
                      <Badge
                        variant={entry.status === "approved" ? "default" : entry.status === "rejected" ? "destructive" : entry.status === "conflict" ? "destructive" : "secondary"}
                        className="text-[10px] font-mono"
                      >{entry.status}</Badge>
                    </div>
                    {entry.summary && <p className="text-xs text-muted-foreground font-body leading-reading mb-2">{entry.summary}</p>}
                    {entry.tags && entry.tags.length > 0 && (
                      <div className="flex items-center gap-1 flex-wrap">
                        <Tag className="h-3 w-3 text-muted-foreground/50" strokeWidth={1.5} />
                        {entry.tags.map((tag) => (
                          <span key={tag} className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded font-mono">{tag}</span>
                        ))}
                      </div>
                    )}
                    {entry.rules && entry.rules.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {entry.rules.slice(0, 3).map((rule, i) => (
                          <p key={i} className="text-[10px] text-muted-foreground font-mono pl-2 border-l-2 border-accent/30">{rule}</p>
                        ))}
                        {entry.rules.length > 3 && (
                          <p className="text-[10px] text-muted-foreground/50 font-mono pl-2">+{entry.rules.length - 3} more rules</p>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {entry.status === "conflict" && isEditor && (
                      <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={() => viewConflict(entry)}>
                        <AlertTriangle className="h-3 w-3" strokeWidth={1.5} />
                        View Conflict
                      </Button>
                    )}
                    {(entry.status === "draft" || entry.status === "conflict") && isEditor && (
                      <>
                        <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => approveEntry(entry.id)} title="Approve">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary" strokeWidth={1.5} />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => rejectEntry(entry.id)} title="Reject">
                          <FileEdit className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.5} />
                        </Button>
                      </>
                    )}
                    {isAdmin && (
                      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => deleteEntry(entry.id)} title="Delete">
                        <Trash2 className="h-3.5 w-3.5 text-destructive/70" strokeWidth={1.5} />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Conflict comparison dialog */}
      <Dialog open={!!conflictEntry} onOpenChange={() => { setConflictEntry(null); setConflictTargets([]); }}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-base font-display flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" strokeWidth={1.5} />
              Conflict: {conflictEntry?.title}
            </DialogTitle>
            <DialogDescription className="text-xs font-body">
              This new entry conflicts with {conflictTargets.length} existing approved entry(s). Compare and decide which to keep.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {/* New entry */}
            <div className="rounded-md border border-accent/30 bg-accent/5 p-3">
              <p className="text-[10px] font-mono uppercase tracking-widest text-accent mb-2">New (from extraction)</p>
              <p className="text-sm font-medium font-body">{conflictEntry?.title}</p>
              {conflictEntry?.summary && <p className="text-xs text-muted-foreground mt-1">{conflictEntry.summary}</p>}
              {conflictEntry?.content && <p className="text-xs text-foreground/80 mt-2 font-mono whitespace-pre-wrap">{conflictEntry.content}</p>}
            </div>

            <div className="flex items-center justify-center">
              <span className="text-[10px] font-mono text-muted-foreground bg-muted px-2 py-1 rounded">vs</span>
            </div>

            {/* Existing entries */}
            {conflictTargets.map((target) => (
              <div key={target.id} className="rounded-md border border-primary/30 bg-primary/5 p-3">
                <p className="text-[10px] font-mono uppercase tracking-widest text-primary mb-2">Existing (approved)</p>
                <p className="text-sm font-medium font-body">{target.title}</p>
                {target.summary && <p className="text-xs text-muted-foreground mt-1">{target.summary}</p>}
                {target.content && <p className="text-xs text-foreground/80 mt-2 font-mono whitespace-pre-wrap">{target.content}</p>}
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-4 justify-end">
            <Button variant="outline" size="sm" onClick={() => { if (conflictEntry) rejectEntry(conflictEntry.id); setConflictEntry(null); setConflictTargets([]); }}>
              Keep Existing
            </Button>
            <Button size="sm" onClick={() => { if (conflictEntry) approveEntry(conflictEntry.id); setConflictEntry(null); setConflictTargets([]); }}>
              Approve New
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LibraryPage;
