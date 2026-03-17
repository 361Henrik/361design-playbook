import type { ContentBlock } from "@/playbook/types";
import { Badge } from "@/components/ui/badge";
import { icons } from "lucide-react";

// ── Spacing Visual Block ──
export function SpacingVisualBlock({ block }: { block: Extract<ContentBlock, { type: "spacing-visual" }> }) {
  const maxPx = Math.max(...block.steps.map(s => s.px));

  return (
    <div className="space-y-3">
      {block.heading && (
        <h4 className="font-display text-base font-semibold text-foreground">{block.heading}</h4>
      )}
      <div className="space-y-2">
        {block.steps.map((step, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="font-mono text-xs text-foreground w-16 shrink-0">{step.token}</span>
            <div className="flex-1 flex items-center gap-2">
              <div
                className="h-5 rounded-sm bg-primary/80 transition-all"
                style={{ width: `${(step.px / maxPx) * 100}%`, minWidth: 4 }}
              />
              <span className="font-mono text-[10px] text-muted-foreground shrink-0">{step.px}px</span>
            </div>
          </div>
        ))}
      </div>
      {block.steps.some(s => s.description) && (
        <div className="mt-2 space-y-1">
          {block.steps.filter(s => s.description).map((s, i) => (
            <p key={i} className="font-body text-xs text-muted-foreground">
              <span className="font-mono text-foreground">{s.token}</span> — {s.description}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Icon Grid Block ──
export function IconGridBlock({ block }: { block: Extract<ContentBlock, { type: "icon-grid" }> }) {
  return (
    <div className="space-y-4">
      {block.heading && (
        <h4 className="font-display text-base font-semibold text-foreground">{block.heading}</h4>
      )}
      {block.groups.map((group, gi) => (
        <div key={gi} className="space-y-2">
          <p className="font-body text-xs font-medium text-muted-foreground uppercase tracking-wider">{group.category}</p>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
            {group.icons.map((icon, ii) => {
              const LucideIcon = (icons as Record<string, any>)[icon.lucideId];
              return (
                <div key={ii} className="flex flex-col items-center gap-1.5 p-2.5 rounded-md border border-border bg-card hover:border-accent/20 transition-colors">
                  {LucideIcon ? (
                    <LucideIcon className="h-6 w-6 text-foreground" strokeWidth={1.5} />
                  ) : (
                    <Badge variant="outline" className="text-[9px]">{icon.lucideId}</Badge>
                  )}
                  <span className="text-[9px] font-body text-muted-foreground text-center leading-tight">{icon.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Enhanced Color Swatch Block ──
export function EnhancedColorSwatchBlock({ block }: { block: Extract<ContentBlock, { type: "color-swatch" }> }) {
  return (
    <div className="space-y-2">
      {block.heading && (
        <h4 className="font-display text-base font-semibold text-foreground">{block.heading}</h4>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {block.colors.map((c, i) => {
          // Extract hex from value (e.g. "#F7F4EF (HSL 36 24% 95%)" → "#F7F4EF")
          const hex = c.value.match(/#[0-9A-Fa-f]{3,8}/)?.[0] || c.value;
          // Determine if swatch is dark for text contrast
          const isDark = isColorDark(hex);

          return (
            <div key={i} className="space-y-1.5">
              <div
                className="w-full h-16 rounded-md border border-border flex items-end p-2"
                style={{ backgroundColor: hex }}
              >
                <span
                  className="font-body text-[10px] font-medium"
                  style={{ color: isDark ? "#F7F4EF" : "#1A1A1A" }}
                >
                  Aa
                </span>
              </div>
              <p className="font-body text-xs font-medium text-foreground">{c.name}</p>
              <p className="font-mono text-[10px] text-muted-foreground">{hex}</p>
              {c.description && (
                <p className="font-body text-[10px] text-muted-foreground leading-snug line-clamp-2">{c.description}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function isColorDark(hex: string): boolean {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return false;
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.5;
}
