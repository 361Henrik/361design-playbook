import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Upload, FileText, Image, Link2, Loader2, CheckCircle2, XCircle, Clock, RotateCcw, AlertTriangle, Trash2, Play, Ban } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Source = {
  id: string;
  title: string;
  file_type: string;
  file_url: string | null;
  status: string;
  created_at: string;
  error_message: string | null;
  retry_count: number;
  file_hash: string | null;
  pages_processed: number | null;
  total_pages: number | null;
};

const SourcesPage = () => {
  const [sources, setSources] = useState<Source[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [fileType, setFileType] = useState<string>("pdf");
  const [file, setFile] = useState<File | null>(null);
  const [dupeWarning, setDupeWarning] = useState<{ existing: Source; hash: string } | null>(null);
  const [continuing, setContinuing] = useState<string | null>(null);
  const { toast } = useToast();
  const { isEditor, isAdmin } = useAuth();

  const fetchSources = async () => {
    const { data, error } = await supabase.from("sources").select("*").order("created_at", { ascending: false });
    if (!error && data) setSources(data as Source[]);
    setLoading(false);
  };

  useEffect(() => { fetchSources(); }, []);

  const computeHash = async (file: File): Promise<string> => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    return Array.from(new Uint8Array(hashBuffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  const doUpload = async (forceHash?: string) => {
    setUploading(true);
    try {
      let fileUrl: string | null = null;
      let hash: string | null = forceHash || null;

      if (file) {
        if (!hash) hash = await computeHash(file);
        const path = `${Date.now()}-${file.name}`;
        const { error: uploadError } = await supabase.storage.from("sources").upload(path, file);
        if (uploadError) throw uploadError;
        fileUrl = path;
      }

      const { data: source, error: insertError } = await supabase
        .from("sources")
        .insert({ title, file_type: fileType, file_url: fileUrl, file_hash: hash } as any)
        .select()
        .single();
      if (insertError) throw insertError;

      toast({ title: "Source uploaded", description: "Starting AI extraction…" });

      const { data, error: fnError } = await supabase.functions.invoke("extract-source", { body: { source_id: source.id } });
      if (fnError) {
        toast({ title: "Extraction failed", description: fnError.message, variant: "destructive" });
      } else if (data?.not_relevant) {
        toast({ title: "Not a design document", description: "Low relevance detected. You can force extraction from the source card.", variant: "destructive" });
      } else {
        const msg = data?.conflicts_count > 0
          ? `${data.entries_count} entries extracted. ${data.conflicts_count} conflict(s) found — review in Library.`
          : `${data?.entries_count || 0} entries extracted as drafts.`;
        toast({ title: "Extraction complete", description: msg });
      }

      setTitle("");
      setFile(null);
      fetchSources();
    } catch (e: any) {
      toast({ title: "Upload failed", description: e.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleUpload = async () => {
    if (!title.trim()) {
      toast({ title: "Title required", description: "Please enter a title.", variant: "destructive" });
      return;
    }
    if (file) {
      const hash = await computeHash(file);
      const existing = sources.find((s) => s.file_hash === hash);
      if (existing) {
        setDupeWarning({ existing, hash });
        return;
      }
      await doUpload(hash);
    } else {
      await doUpload();
    }
  };

  const retryExtraction = async (sourceId: string) => {
    toast({ title: "Retrying extraction…" });
    const { data, error } = await supabase.functions.invoke("extract-source", { body: { source_id: sourceId } });
    if (error) {
      toast({ title: "Retry failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Extraction complete" });
    }
    fetchSources();
  };

  const forceExtraction = async (sourceId: string) => {
    // Reset status to pending, then retry
    await supabase.from("sources").update({ status: "pending", error_message: null } as any).eq("id", sourceId);
    await retryExtraction(sourceId);
  };

  const continueExtraction = async (sourceId: string) => {
    const source = sources.find((s) => s.id === sourceId);
    if (!source || !source.pages_processed || !source.total_pages) return;

    setContinuing(sourceId);
    const nextOffset = source.pages_processed * 8000;
    toast({ title: "Continuing extraction…", description: `Processing page ${source.pages_processed + 1} of ${source.total_pages}` });

    const { data, error } = await supabase.functions.invoke("extract-source", {
      body: { source_id: sourceId, continue_from: nextOffset },
    });

    if (error) {
      toast({ title: "Continue failed", description: error.message, variant: "destructive" });
    } else {
      const msg = data?.has_more
        ? `Extracted ${data.entries_count} more entries. More pages remain.`
        : `Extracted ${data?.entries_count || 0} more entries. All pages processed.`;
      toast({ title: "Chunk complete", description: msg });
    }
    setContinuing(null);
    fetchSources();
  };

  const deleteSource = async (id: string) => {
    const { error } = await supabase.from("sources").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Deleted" }); fetchSources(); }
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle2 className="h-4 w-4 text-primary" strokeWidth={1.5} />;
      case "failed": return <XCircle className="h-4 w-4 text-destructive" strokeWidth={1.5} />;
      case "partial": return <AlertTriangle className="h-4 w-4 text-accent" strokeWidth={1.5} />;
      case "not_relevant": return <Ban className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />;
      case "processing": return <Loader2 className="h-4 w-4 text-accent animate-spin" strokeWidth={1.5} />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />;
    }
  };

  const fileTypeIcon = (type: string) => {
    switch (type) {
      case "pdf": return <FileText className="h-4 w-4" strokeWidth={1.5} />;
      case "image": return <Image className="h-4 w-4" strokeWidth={1.5} />;
      case "url": return <Link2 className="h-4 w-4" strokeWidth={1.5} />;
      default: return <FileText className="h-4 w-4" strokeWidth={1.5} />;
    }
  };

  return (
    <div className="px-8 py-10 max-w-5xl">
      <PageHeader
        title="Sources"
        description="Upload PDFs, images, and markdown files. AI extracts structured design entries for the library."
      />

      {/* Upload form — only for editors */}
      {isEditor && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-base">Upload New Source</CardTitle>
            <CardDescription className="text-xs">Upload a document and AI will extract design tokens, guidelines, and patterns.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-body">Title</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Brand Guidelines v2" className="text-sm" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-body">Type</Label>
                <Select value={fileType} onValueChange={setFileType}>
                  <SelectTrigger className="text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="markdown">Markdown</SelectItem>
                    <SelectItem value="url">URL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-body">File</Label>
                <Input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="text-sm"
                  accept={fileType === "pdf" ? ".pdf" : fileType === "image" ? "image/*" : ".md,.txt"} />
              </div>
            </div>
            <Button onClick={handleUpload} disabled={uploading} className="gap-2">
              {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" strokeWidth={1.5} />}
              {uploading ? "Processing…" : "Upload & Extract"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Sources list */}
      <h2 className="font-display text-lg font-medium mb-4">Uploaded Sources</h2>
      {loading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Loading…</div>
      ) : sources.length === 0 ? (
        <p className="text-sm text-muted-foreground font-body">No sources uploaded yet.</p>
      ) : (
        <div className="space-y-2">
          {sources.map((source) => (
            <Card key={source.id} className="hover:border-primary/20 transition-colors duration-ui">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="flex items-center gap-2 text-muted-foreground">{fileTypeIcon(source.file_type)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium font-body truncate">{source.title}</p>
                  <p className="text-[10px] text-muted-foreground font-body">{new Date(source.created_at).toLocaleDateString()}</p>
                  {source.error_message && (
                    <p className="text-[10px] text-destructive font-body mt-0.5">{source.error_message}</p>
                  )}
                  {source.pages_processed != null && source.total_pages != null && (
                    <p className="text-[10px] text-muted-foreground font-mono mt-0.5">
                      Processed {source.pages_processed}/{source.total_pages} pages
                    </p>
                  )}
                </div>
                <Badge variant="secondary" className="text-[10px] font-mono uppercase">{source.file_type}</Badge>
                <div className="flex items-center gap-1.5">
                  {statusIcon(source.status)}
                  <span className="text-[10px] font-body text-muted-foreground capitalize">{source.status === "not_relevant" ? "Not Relevant" : source.status}</span>
                </div>
                <div className="flex items-center gap-1">
                  {(source.status === "failed" || source.status === "not_relevant") && isEditor && (
                    <Button size="sm" variant="ghost" className="h-7 gap-1 text-xs" onClick={() => source.status === "not_relevant" ? forceExtraction(source.id) : retryExtraction(source.id)} title={source.status === "not_relevant" ? "Force extraction" : "Retry"}>
                      <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
                      {source.status === "not_relevant" ? "Force" : "Retry"}
                    </Button>
                  )}
                  {source.status === "partial" && source.pages_processed != null && source.total_pages != null && source.pages_processed < source.total_pages && isEditor && (
                    <Button size="sm" variant="ghost" className="h-7 gap-1 text-xs" onClick={() => continueExtraction(source.id)} disabled={continuing === source.id} title="Continue extraction">
                      {continuing === source.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5" strokeWidth={1.5} />}
                      Continue
                    </Button>
                  )}
                  {isAdmin && (
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => deleteSource(source.id)} title="Delete">
                      <Trash2 className="h-3.5 w-3.5 text-destructive/70" strokeWidth={1.5} />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Duplicate warning dialog */}
      <Dialog open={!!dupeWarning} onOpenChange={() => setDupeWarning(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">Duplicate File Detected</DialogTitle>
            <DialogDescription className="font-body text-sm">
              This file was already uploaded as "<strong>{dupeWarning?.existing.title}</strong>" on{" "}
              {dupeWarning?.existing.created_at ? new Date(dupeWarning.existing.created_at).toLocaleDateString() : ""}.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDupeWarning(null)}>Cancel</Button>
            <Button onClick={() => { const h = dupeWarning!.hash; setDupeWarning(null); doUpload(h); }}>
              Upload Anyway
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SourcesPage;
