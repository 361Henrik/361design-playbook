import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlaybookBlockRenderer } from "@/components/PlaybookBlockRenderer";
import { ImageCanvas } from "@/components/handbook/ImageCanvas";
import { FilterPanel } from "@/components/handbook/FilterPanel";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { allPlaybookPages, getPlaybookSections } from "@/playbook/index";
import type { PlaybookPage } from "@/playbook/types";
import { Search, Eye, List, ChevronsDownUp, ChevronsUpDown, Download, Maximize2, Minimize2, SlidersHorizontal } from "lucide-react";
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
  const [viewMode, setViewMode] = useState<"browse" | "present">("browse");
  const [collapsedCards, setCollapsedCards] = useState<Set<string>>(
    () => new Set(allPlaybookPages.map((p) => p.slug))
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
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

  const matchesSearch = useCallback(
    (page: PlaybookPage) =>
      !searchQuery || page.page.toLowerCase().includes(searchQuery.toLowerCase()),
    [searchQuery]
  );

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

  const filterPanelProps = {
    sections,
    selectedSlugs,
    onToggle: toggle,
    onSelectAll: selectAllInSection,
    onClearSection: clearSection,
    matchesSearch,
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Handbook Viewer"
        description="Browse, select, and preview the complete design handbook in one curated view."
      />

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[180px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search handbook…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 text-sm"
          />
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-1">
          <Button
            variant={viewMode === "browse" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("browse")}
            className="h-8 text-xs gap-1.5"
          >
            <List className="h-3.5 w-3.5" />
            Browse
          </Button>
          <Button
            variant={viewMode === "present" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("present")}
            className="h-8 text-xs gap-1.5"
          >
            <Eye className="h-3.5 w-3.5" />
            Present
          </Button>
        </div>

        {/* Mobile filter trigger */}
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 lg:hidden">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filter
            </Button>
          </DrawerTrigger>
          <DrawerContent className="max-h-[75vh]">
            <DrawerHeader>
              <DrawerTitle className="font-display text-base">Filter Handbook</DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-6 overflow-y-auto">
              <FilterPanel {...filterPanelProps} />
            </div>
          </DrawerContent>
        </Drawer>

        {/* Contextual actions */}
        {viewMode === "present" ? (
          <div className="flex items-center gap-1 ml-auto">
            <Button variant="outline" size="sm" onClick={handleExportPng} className="h-8 text-xs gap-1.5">
              <Download className="h-3.5 w-3.5" />
              Export PNG
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setIsFullscreen((p) => !p)} className="h-8 text-xs gap-1">
              {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
            </Button>
          </div>
        ) : (
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
        )}
      </div>

      {/* Present mode */}
      {viewMode === "present" ? (
        <div className={isFullscreen ? "fixed inset-0 z-50 bg-background overflow-auto p-8" : ""}>
          {isFullscreen && (
            <div className="flex justify-end mb-4">
              <Button variant="outline" size="sm" onClick={() => setIsFullscreen(false)} className="h-8 text-xs gap-1.5">
                <Minimize2 className="h-3.5 w-3.5" />
                Exit fullscreen
              </Button>
            </div>
          )}
          <div className="flex gap-6 items-start">
            {!isFullscreen && (
              <div className="w-[260px] shrink-0 sticky top-6 hidden lg:block">
                <FilterPanel {...filterPanelProps} />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <ImageCanvas ref={canvasRef} pages={selectedPages} fullscreen={isFullscreen} />
            </div>
          </div>
        </div>
      ) : (
        /* Browse mode */
        <div className="flex gap-6 items-start">
          {/* Desktop filter sidebar */}
          <div className="w-[260px] shrink-0 sticky top-6 hidden lg:block">
            <FilterPanel {...filterPanelProps} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 space-y-4">
            {selectedPages.length === 0 && (
              <div className="text-center py-16">
                <p className="font-body text-sm text-muted-foreground">
                  Select items from the filter panel to preview them here.
                </p>
              </div>
            )}
            {selectedPages.map((page) => {
              const isCollapsed = collapsedCards.has(page.slug);
              return (
                <Card key={page.slug} className="overflow-hidden">
                  <CardHeader
                    className="cursor-pointer hover:bg-muted/20 transition-colors"
                    onClick={() => toggleCardCollapse(page.slug)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 min-w-0">
                        <CardTitle className="font-display text-lg">{page.page}</CardTitle>
                        <CardDescription className="font-body text-xs">{page.description}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Badge variant="outline" className={`text-[10px] ${statusColor[page.status] || ""}`}>
                          {page.status}
                        </Badge>
                        <Badge variant="secondary" className="text-[10px]">{page.section}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  {!isCollapsed && (
                    <CardContent className="space-y-5 pt-0">
                      {page.content.map((block, i) => (
                        <PlaybookBlockRenderer key={i} block={block} />
                      ))}
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
