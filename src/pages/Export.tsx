import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/CodeBlock";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import {
  exportFormats,
  getExportContent,
  downloadFile,
  generateCSS,
  generateTailwind,
  generateJSON,
  generateTypeScript,
  generateStarterReadme,
  mergeCanonicalTokens,
  type ExportFormat,
} from "@/data/exportGenerators";
import { generateAllExportFiles } from "@/data/markdownExport";
import { allPlaybookPages, getPlaybookSections, getPlaybookAudit } from "@/playbook";
import { Download, FileCode, FileJson, FileText, Package, Crown, BookOpen, CheckCircle, AlertTriangle, CircleDot } from "lucide-react";
import JSZip from "jszip";
import { useEffect } from "react";

const formatIcons: Record<ExportFormat, typeof FileCode> = {
  css: FileText,
  tailwind: FileCode,
  json: FileJson,
  typescript: FileCode,
};

const ExportPage = () => {
  const [activeFormat, setActiveFormat] = useState<ExportFormat>("css");
  const [canonicalCount, setCanonicalCount] = useState(0);
  const [mergedTokens, setMergedTokens] = useState<any>(null);
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>(
    allPlaybookPages.map((p) => p.slug)
  );

  useEffect(() => {
    const fetchCanonical = async () => {
      const { data } = await supabase
        .from("library_entries")
        .select("title, content, entry_type, tags")
        .eq("status", "approved")
        .eq("is_canonical", true);
      if (data && data.length > 0) {
        setCanonicalCount(data.length);
        setMergedTokens(mergeCanonicalTokens(data));
      }
    };
    fetchCanonical();
  }, []);

  const getContent = (format: ExportFormat) => {
    if (mergedTokens) {
      switch (format) {
        case "css": return generateCSS(mergedTokens);
        case "json": return generateJSON(mergedTokens);
        case "typescript": return generateTypeScript(mergedTokens);
        default: return getExportContent(format);
      }
    }
    return getExportContent(format);
  };

  const handleDownload = (format: ExportFormat) => {
    const fmt = exportFormats.find((f) => f.id === format)!;
    const content = getContent(format);
    const mimeType = format === "json" ? "application/json" : "text/plain";
    downloadFile(content, fmt.filename, mimeType);
  };

  const handleStarterKit = () => {
    downloadFile(getContent("css"), "tokens.css");
    setTimeout(() => downloadFile(generateTailwind(), "tailwind.config.ts"), 100);
    setTimeout(() => downloadFile(getContent("json"), "tokens.json", "application/json"), 200);
    setTimeout(() => downloadFile(getContent("typescript"), "tokens.ts"), 300);
    setTimeout(() => downloadFile(generateStarterReadme(), "README.md"), 400);
  };

  const handlePlaybookExport = async () => {
    const files = generateAllExportFiles(selectedSlugs);
    const zip = new JSZip();
    const folder = zip.folder("curated-lens-playbook")!;
    for (const file of files) {
      folder.file(file.path, file.content);
    }
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "curated-lens-playbook.zip";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const toggleSlug = (slug: string) => {
    setSelectedSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const toggleAll = () => {
    if (selectedSlugs.length === allPlaybookPages.length) {
      setSelectedSlugs([]);
    } else {
      setSelectedSlugs(allPlaybookPages.map((p) => p.slug));
    }
  };

  const audit = getPlaybookAudit();
  const sections = getPlaybookSections();

  return (
    <div className="px-space-5 md:px-space-8 py-space-8 max-w-content space-y-space-8">
      <PageHeader
        title="Code Export"
        description="Export tokens as CSS, Tailwind, JSON, or TypeScript — or export the full design playbook as Markdown for IDE handoff."
      />

      <Tabs defaultValue="tokens">
        <TabsList>
          <TabsTrigger value="tokens">Token Export</TabsTrigger>
          <TabsTrigger value="playbook" className="flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5" strokeWidth={1.5} />
            Design Playbook
          </TabsTrigger>
        </TabsList>

        {/* ── Token Export Tab ── */}
        <TabsContent value="tokens" className="space-y-10">
          {canonicalCount > 0 && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-primary/5 border border-primary/20">
              <Crown className="h-3.5 w-3.5 text-primary" strokeWidth={1.5} />
              <span className="text-xs font-body text-foreground">
                <strong>{canonicalCount}</strong> canonical token(s) merged into exports as the single source of truth.
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {exportFormats.map((fmt) => {
              const Icon = formatIcons[fmt.id];
              const isActive = activeFormat === fmt.id;
              return (
                <Card
                  key={fmt.id}
                  className={`cursor-pointer transition-colors duration-ui ${
                    isActive ? "border-primary/50 bg-primary/5" : "hover:border-primary/20"
                  }`}
                  onClick={() => setActiveFormat(fmt.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Icon className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
                      {isActive && (
                        <Badge variant="default" className="text-[10px] px-1.5 py-0">Active</Badge>
                      )}
                    </div>
                    <CardTitle className="text-sm">{fmt.label}</CardTitle>
                    <CardDescription className="text-xs leading-reading">{fmt.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button variant="outline" size="sm" className="w-full" onClick={(e) => { e.stopPropagation(); handleDownload(fmt.id); }}>
                      <Download className="h-3.5 w-3.5" strokeWidth={1.5} />
                      Download {fmt.filename}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-medium tracking-headline text-foreground">Preview</h2>
              <Button variant="secondary" size="sm" onClick={() => handleDownload(activeFormat)}>
                <Download className="h-3.5 w-3.5" strokeWidth={1.5} />
                Download
              </Button>
            </div>
            <Tabs value={activeFormat} onValueChange={(v) => setActiveFormat(v as ExportFormat)}>
              <TabsList>
                {exportFormats.map((fmt) => (
                  <TabsTrigger key={fmt.id} value={fmt.id}>{fmt.label.split(" ")[0]}</TabsTrigger>
                ))}
              </TabsList>
              {exportFormats.map((fmt) => (
                <TabsContent key={fmt.id} value={fmt.id} className="mt-4">
                  <CodeBlock code={getContent(fmt.id)} language={fmt.id === "json" ? "json" : fmt.id === "typescript" ? "ts" : fmt.id === "css" ? "css" : "ts"} />
                </TabsContent>
              ))}
            </Tabs>
          </div>

          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6 flex items-center gap-6">
              <div className="shrink-0">
                <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
                  <Package className="h-6 w-6 text-primary-foreground" strokeWidth={1.5} />
                </div>
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="font-display text-base font-medium text-foreground">Starter Kit</h3>
                <p className="text-sm font-body text-muted-foreground leading-reading">
                  Download all token files plus a README with setup instructions.
                </p>
              </div>
              <Button onClick={handleStarterKit} className="shrink-0">
                <Download className="h-4 w-4" strokeWidth={1.5} />
                Download All
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Design Playbook Tab ── */}
        <TabsContent value="playbook" className="space-y-8">
          {/* Audit Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-md border border-border bg-card text-center">
              <p className="text-h2 font-display text-foreground">{audit.total}</p>
              <p className="text-caption font-body text-muted-foreground">Total pages</p>
            </div>
            <div className="p-4 rounded-md border border-border bg-card text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <CheckCircle className="h-4 w-4 text-primary" strokeWidth={1.5} />
                <p className="text-h2 font-display text-foreground">{audit.complete}</p>
              </div>
              <p className="text-caption font-body text-muted-foreground">Complete</p>
            </div>
            <div className="p-4 rounded-md border border-border bg-card text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <CircleDot className="h-4 w-4 text-accent" strokeWidth={1.5} />
                <p className="text-h2 font-display text-foreground">{audit.draft}</p>
              </div>
              <p className="text-caption font-body text-muted-foreground">Draft</p>
            </div>
            <div className="p-4 rounded-md border border-border bg-card text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <AlertTriangle className="h-4 w-4 text-destructive" strokeWidth={1.5} />
                <p className="text-h2 font-display text-foreground">{audit.openQuestions.length}</p>
              </div>
              <p className="text-caption font-body text-muted-foreground">Open questions</p>
            </div>
          </div>

          {/* Open Questions */}
          {audit.openQuestions.length > 0 && (
            <div className="p-5 rounded-md border-2 border-accent/30 bg-card">
              <h3 className="font-display text-base font-medium tracking-headline text-card-foreground mb-3">Open Questions</h3>
              <div className="space-y-2">
                {audit.openQuestions.map((q, i) => (
                  <div key={i} className="flex gap-2 text-sm font-body text-muted-foreground">
                    <span className="text-accent shrink-0">⚠️</span>
                    <span><strong className="text-card-foreground">{q.section} → {q.page}:</strong> {q.question}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section selection */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-medium tracking-headline text-foreground">Select pages for export</h2>
              <Button variant="ghost" size="sm" onClick={toggleAll} className="text-xs">
                {selectedSlugs.length === allPlaybookPages.length ? "Deselect all" : "Select all"}
              </Button>
            </div>

            <div className="space-y-6">
              {Object.entries(sections).map(([section, pages]) => (
                <div key={section}>
                  <p className="text-caption font-body font-medium text-muted-foreground uppercase tracking-widest mb-2">{section}</p>
                  <div className="space-y-1">
                    {pages.map((page) => {
                      const statusIcon = page.status === "complete" ? "✅" : page.status === "draft" ? "📝" : "⚠️";
                      return (
                        <label
                          key={page.slug}
                          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors duration-ui"
                        >
                          <Checkbox
                            checked={selectedSlugs.includes(page.slug)}
                            onCheckedChange={() => toggleSlug(page.slug)}
                          />
                          <span className="text-sm font-body text-card-foreground flex-1">{page.page}</span>
                          <span className="text-xs">{statusIcon}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Export button */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6 flex items-center gap-6">
              <div className="shrink-0">
                <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-primary-foreground" strokeWidth={1.5} />
                </div>
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="font-display text-base font-medium text-foreground">Export Design Playbook</h3>
                <p className="text-sm font-body text-muted-foreground leading-reading">
                  Download {selectedSlugs.length} page{selectedSlugs.length !== 1 ? "s" : ""} as a structured Markdown ZIP.
                  Upload this into your IDE as the design system source of truth.
                </p>
              </div>
              <Button onClick={handlePlaybookExport} className="shrink-0" disabled={selectedSlugs.length === 0}>
                <Download className="h-4 w-4" strokeWidth={1.5} />
                Download ZIP
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExportPage;
