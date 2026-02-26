import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { Upload, FileText, Image, Link2, Loader2, CheckCircle2, XCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Source = {
  id: string;
  title: string;
  file_type: string;
  file_url: string | null;
  status: string;
  created_at: string;
};

const SourcesPage = () => {
  const [sources, setSources] = useState<Source[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [fileType, setFileType] = useState<string>("pdf");
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const fetchSources = async () => {
    const { data, error } = await supabase
      .from("sources")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setSources(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSources();
  }, []);

  const handleUpload = async () => {
    if (!title.trim()) {
      toast({ title: "Title required", description: "Please enter a title for this source.", variant: "destructive" });
      return;
    }

    setUploading(true);
    try {
      let fileUrl: string | null = null;

      if (file) {
        const ext = file.name.split(".").pop();
        const path = `${Date.now()}-${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from("sources")
          .upload(path, file);
        if (uploadError) throw uploadError;
        fileUrl = path;
      }

      const { data: source, error: insertError } = await supabase
        .from("sources")
        .insert({ title, file_type: fileType, file_url: fileUrl })
        .select()
        .single();

      if (insertError) throw insertError;

      toast({ title: "Source uploaded", description: "Starting AI extraction…" });

      // Trigger extraction
      const { error: fnError } = await supabase.functions.invoke("extract-source", {
        body: { source_id: source.id },
      });

      if (fnError) {
        console.error("Extraction error:", fnError);
        toast({ title: "Extraction failed", description: fnError.message, variant: "destructive" });
      } else {
        toast({ title: "Extraction complete", description: "Entries extracted and saved as drafts." });
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

  const statusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle2 className="h-4 w-4 text-primary" strokeWidth={1.5} />;
      case "failed": return <XCircle className="h-4 w-4 text-destructive" strokeWidth={1.5} />;
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

      {/* Upload form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-base">Upload New Source</CardTitle>
          <CardDescription className="text-xs">
            Upload a document and AI will extract design tokens, guidelines, and patterns.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-body">Title</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Brand Guidelines v2"
                className="text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-body">Type</Label>
              <Select value={fileType} onValueChange={setFileType}>
                <SelectTrigger className="text-sm">
                  <SelectValue />
                </SelectTrigger>
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
              <Input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="text-sm"
                accept={fileType === "pdf" ? ".pdf" : fileType === "image" ? "image/*" : ".md,.txt"}
              />
            </div>
          </div>
          <Button onClick={handleUpload} disabled={uploading} className="gap-2">
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" strokeWidth={1.5} />}
            {uploading ? "Processing…" : "Upload & Extract"}
          </Button>
        </CardContent>
      </Card>

      {/* Sources list */}
      <h2 className="font-display text-lg font-medium mb-4">Uploaded Sources</h2>
      {loading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </div>
      ) : sources.length === 0 ? (
        <p className="text-sm text-muted-foreground font-body">No sources uploaded yet.</p>
      ) : (
        <div className="space-y-2">
          {sources.map((source) => (
            <Card key={source.id} className="hover:border-primary/20 transition-colors duration-ui">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  {fileTypeIcon(source.file_type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium font-body truncate">{source.title}</p>
                  <p className="text-[10px] text-muted-foreground font-body">
                    {new Date(source.created_at).toLocaleDateString()}
                  </p>
                </div>
                <Badge variant="secondary" className="text-[10px] font-mono uppercase">
                  {source.file_type}
                </Badge>
                <div className="flex items-center gap-1.5">
                  {statusIcon(source.status)}
                  <span className="text-[10px] font-body text-muted-foreground capitalize">{source.status}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SourcesPage;
