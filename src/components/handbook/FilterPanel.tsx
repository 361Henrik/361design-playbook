import { Checkbox } from "@/components/ui/checkbox";
import type { PlaybookPage } from "@/playbook/types";
import { allPlaybookPages } from "@/playbook/index";

interface FilterPanelProps {
  sections: Record<string, PlaybookPage[]>;
  selectedSlugs: Set<string>;
  onToggle: (slug: string) => void;
  onSelectAll: (pages: PlaybookPage[]) => void;
  onClearSection: (pages: PlaybookPage[]) => void;
  matchesSearch: (page: PlaybookPage) => boolean;
}

export function FilterPanel({
  sections,
  selectedSlugs,
  onToggle,
  onSelectAll,
  onClearSection,
  matchesSearch,
}: FilterPanelProps) {
  return (
    <div className="space-y-5">
      {Object.entries(sections).map(([section, pages]) => {
        const filtered = pages.filter(matchesSearch);
        if (filtered.length === 0) return null;
        const allSelected = filtered.every((p) => selectedSlugs.has(p.slug));
        return (
          <div key={section}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-widest font-body font-medium text-muted-foreground">
                {section}
              </span>
              <button
                onClick={() =>
                  allSelected ? onClearSection(filtered) : onSelectAll(filtered)
                }
                className="text-[10px] font-body text-muted-foreground hover:text-foreground transition-colors"
              >
                {allSelected ? "Clear" : "All"}
              </button>
            </div>
            <div className="space-y-1">
              {filtered.map((page) => (
                <label
                  key={page.slug}
                  className="flex items-center gap-2 py-1 px-1 rounded-sm hover:bg-muted/40 cursor-pointer transition-colors"
                >
                  <Checkbox
                    checked={selectedSlugs.has(page.slug)}
                    onCheckedChange={() => onToggle(page.slug)}
                  />
                  <span className="font-body text-xs text-foreground leading-tight">
                    {page.page}
                  </span>
                </label>
              ))}
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
  );
}
