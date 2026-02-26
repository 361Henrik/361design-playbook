import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/CodeBlock";
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
import { Download, FileCode, FileJson, FileText, Package, Crown } from "lucide-react";

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

  // Fetch canonical entries to merge into exports
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

  return (
    <div className="px-8 py-10 max-w-5xl space-y-10">
      <PageHeader
        title="Code Export"
        description="Export tokens as CSS custom properties, Tailwind config, JSON, or TypeScript. All outputs are deterministic and sorted alphabetically."
      />

      {/* Canonical source info */}
      {canonicalCount > 0 && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-primary/5 border border-primary/20">
          <Crown className="h-3.5 w-3.5 text-primary" strokeWidth={1.5} />
          <span className="text-xs font-body text-foreground">
            <strong>{canonicalCount}</strong> canonical token(s) merged into exports as the single source of truth.
          </span>
        </div>
      )}

      {/* Format cards */}
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
                    <Badge variant="default" className="text-[10px] px-1.5 py-0">
                      Active
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-sm">{fmt.label}</CardTitle>
                <CardDescription className="text-xs leading-reading">{fmt.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(fmt.id);
                  }}
                >
                  <Download className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Download {fmt.filename}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Preview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-medium tracking-headline text-foreground">
            Preview
          </h2>
          <Button variant="secondary" size="sm" onClick={() => handleDownload(activeFormat)}>
            <Download className="h-3.5 w-3.5" strokeWidth={1.5} />
            Download
          </Button>
        </div>

        <Tabs value={activeFormat} onValueChange={(v) => setActiveFormat(v as ExportFormat)}>
          <TabsList>
            {exportFormats.map((fmt) => (
              <TabsTrigger key={fmt.id} value={fmt.id}>
                {fmt.label.split(" ")[0]}
              </TabsTrigger>
            ))}
          </TabsList>
          {exportFormats.map((fmt) => (
            <TabsContent key={fmt.id} value={fmt.id} className="mt-4">
              <CodeBlock
                code={getContent(fmt.id)}
                language={fmt.id === "json" ? "json" : fmt.id === "typescript" ? "ts" : fmt.id === "css" ? "css" : "ts"}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Starter Kit */}
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
              Download all token files plus a README with setup instructions. Includes CSS variables,
              Tailwind config, JSON tokens, TypeScript constants, and documentation.
            </p>
          </div>
          <Button onClick={handleStarterKit} className="shrink-0">
            <Download className="h-4 w-4" strokeWidth={1.5} />
            Download All
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExportPage;
