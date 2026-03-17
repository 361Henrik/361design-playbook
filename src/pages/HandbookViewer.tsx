import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PlaybookBlockRenderer } from "@/components/PlaybookBlockRenderer";
import { ImageCanvas } from "@/components/handbook/ImageCanvas";
import { allPlaybookPages, getPlaybookSections } from "@/playbook/index";
import type { PlaybookPage } from "@/playbook/types";
import { Search, Eye, List, Image, ChevronsDownUp, ChevronsUpDown, Download, Maximize2, Minimize2 } from "lucide-react";
import { toPng } from "html-to-image";

const STORAGE_KEY = "handbook-viewer-selection";

function loadSelection(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return new Set(JSON.parse(raw));
  } catch {}
  return new Set(allPlaybookPages.map((p) => p.slug));
}

function saveSelection(slugs: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...slugs]));
}

const statusColor: Record<string, string> = {
  complete: "bg-primary/10 text-primary border-primary/20",
  draft: "bg-accent/50 text-accent-foreground border-accent",
  incomplete: "bg-muted text-muted-foreground border-border",
};

export default function HandbookViewer() {
  const [selectedSlugs, setSelectedSlugs] = useState<Set<string>>(loadSelection);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"overview" | "full" | "image">("overview");
  const [showSelectedOnly, setShowSelectedOnly] = useState(false);
  const [collapsedCards, setCollapsedCards] = useState<Set<string>>(new Set());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const sections = useMemo(() => getPlaybookSections(), []);

  useEffect(() => {
    saveSelection(selectedSlugs);
  }, [selectedSlugs]);

  const toggle = useCallback((slug: string) => {
    setSelectedSlugs((prev) => {
      const next = new Set(prev);
      next.has(slug) ? next.delete(slug) : next.add(slug);
      return next;
    });
  }, []);

  const selectAllInSection = useCallback((pages: PlaybookPage[]) => {
    setSelectedSlugs((prev) => {
      const next = new Set(prev);
      pages.forEach((p) => next.add(p.slug));
      return next;
    });
  }, []);

  const clearSection = useCallback((pages: PlaybookPage[]) => {
    setSelectedSlugs((prev) => {
      const next = new Set(prev);
      pages.forEach((p) => next.delete(p.slug));
      return next;
    });
  }, []);

  const matchesSearch = (page: PlaybookPage) =>
    !searchQuery || page.page.toLowerCase().includes(searchQuery.toLowerCase());

  const selectedPages = useMemo(
    () => allPlaybookPages.filter((p) => selectedSlugs.has(p.slug)),
    [selectedSlugs]
  );

  const toggleCardCollapse = (slug: string) => {
    setCollapsedCards((prev) => {
      const next = new Set(prev);
      next.has(slug) ? next.delete(slug) : next.add(slug);
      return next;
    });
  };

  const expandAll = () => setCollapsedCards(new Set());
  const collapseAll = () => setCollapsedCards(new Set(selectedPages.map((p) => p.slug)));

  const handleExportPng = useCallback(async () => {
    if (!canvasRef.current) return;
    try {
      const dataUrl = await toPng(canvasRef.current, { pixelRatio: 2, backgroundColor: "#fafaf8" });
      const link = document.createElement("a");
      link.download = "design-handbook.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Export failed", err);
    }
  }, []);

  const toggleFullscreen = () => setIsFullscreen((prev) => !prev);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Handbook Viewer"
        description="Browse, select, and preview the complete design handbook in one curated view."
      />

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search handbook…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "overview" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("overview")}
            className="h-8 text-xs gap-1.5"
          >
            <List className="h-3.5 w-3.5" />
            Overview
          </Button>
          <Button
            variant={viewMode === "full" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("full")}
            className="h-8 text-xs gap-1.5"
          >
            <Eye className="h-3.5 w-3.5" />
            Full
          </Button>
          <Button
            variant={viewMode === "image" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("image")}
            className="h-8 text-xs gap-1.5"
          >
            <Image className="h-3.5 w-3.5" />
            Image
          </Button>
        </div>

        {viewMode === "image" && (
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" onClick={handleExportPng} className="h-8 text-xs gap-1.5">
              <Download className="h-3.5 w-3.5" />
              Export PNG
            </Button>
            <Button variant="ghost" size="sm" onClick={toggleFullscreen} className="h-8 text-xs gap-1">
              {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
            </Button>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Switch
            id="selected-only"
            checked={showSelectedOnly}
            onCheckedChange={setShowSelectedOnly}
          />
          <Label htmlFor="selected-only" className="text-xs text-muted-foreground cursor-pointer">
            Selected only
          </Label>
        </div>

        <div className="flex items-center gap-1 ml-auto">
          <Button variant="ghost" size="sm" onClick={expandAll} className="h-8 text-xs gap-1">
            <ChevronsUpDown className="h-3.5 w-3.5" />
            Expand
          </Button>
          <Button variant="ghost" size="sm" onClick={collapseAll} className="h-8 text-xs gap-1">
            <ChevronsDownUp className="h-3.5 w-3.5" />
            Collapse
          </Button>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex gap-6 items-start">
        {/* Selection panel */}
        <div className="w-[260px] shrink-0 sticky top-6 space-y-5 hidden lg:block">
          {Object.entries(sections).map(([section, pages]) => {
            const filtered = pages.filter(matchesSearch);
            if (showSelectedOnly) {
              const hasSelected = filtered.some((p) => selectedSlugs.has(p.slug));
              if (!hasSelected) return null;
            }
            if (filtered.length === 0) return null;

            const allSelected = filtered.every((p) => selectedSlugs.has(p.slug));

            return (
              <div key={section}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-widest font-body font-medium text-muted-foreground">
                    {section}
                  </span>
                  <button
                    onClick={() => allSelected ? clearSection(filtered) : selectAllInSection(filtered)}
                    className="text-[10px] font-body text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {allSelected ? "Clear" : "All"}
                  </button>
                </div>
                <div className="space-y-1">
                  {filtered.map((page) => {
                    if (showSelectedOnly && !selectedSlugs.has(page.slug)) return null;
                    return (
                      <label
                        key={page.slug}
                        className="flex items-center gap-2 py-1 px-1 rounded-sm hover:bg-muted/40 cursor-pointer transition-colors"
                      >
                        <Checkbox
                          checked={selectedSlugs.has(page.slug)}
                          onCheckedChange={() => toggle(page.slug)}
                        />
                        <span className="font-body text-xs text-foreground leading-tight">{page.page}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div className="pt-3 border-t border-border">
            <p className="font-body text-[10px] text-muted-foreground">
              {selectedSlugs.size} of {allPlaybookPages.length} selected
            </p>
          </div>
        </div>

        {/* Preview area */}
        <div className="flex-1 min-w-0 space-y-4">
          {selectedPages.length === 0 && (
            <div className="text-center py-16">
              <p className="font-body text-sm text-muted-foreground">
                Select items from the panel to preview them here.
              </p>
            </div>
          )}

          {selectedPages.map((page) => {
            const isCollapsed = collapsedCards.has(page.slug);
            const blocks = viewMode === "overview" ? page.content.slice(0, 1) : page.content;

            return (
              <Card key={page.slug} className="overflow-hidden">
                <CardHeader
                  className="cursor-pointer hover:bg-muted/20 transition-colors"
                  onClick={() => toggleCardCollapse(page.slug)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <CardTitle className="font-display text-lg">{page.page}</CardTitle>
                      <CardDescription className="font-body text-xs">
                        {page.description}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant="outline" className={`text-[10px] ${statusColor[page.status] || ""}`}>
                        {page.status}
                      </Badge>
                      <Badge variant="secondary" className="text-[10px]">
                        {page.section}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                {!isCollapsed && (
                  <CardContent className="space-y-5 pt-0">
                    {blocks.map((block, i) => (
                      <PlaybookBlockRenderer key={i} block={block} />
                    ))}
                    {viewMode === "overview" && page.content.length > 1 && (
                      <p className="font-body text-[10px] text-muted-foreground italic">
                        +{page.content.length - 1} more section{page.content.length - 1 > 1 ? "s" : ""} — switch to Full view
                      </p>
                    )}
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
