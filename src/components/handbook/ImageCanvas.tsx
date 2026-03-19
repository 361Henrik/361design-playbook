import { forwardRef } from "react";
import type { PlaybookPage, ContentBlock } from "@/playbook/types";
import { DosDonts } from "@/components/DosDonts";
import { Badge } from "@/components/ui/badge";

/* ---------- visual-only block renderers (no prose-heavy text) ---------- */

function VisualColorSwatch({ block }: { block: Extract<ContentBlock, { type: "color-swatch" }> }) {
  return (
    <div className="space-y-3">
      {block.heading && <h4 className="font-display text-sm font-semibold text-foreground">{block.heading}</h4>}
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
        {block.colors.map((c, i) => (
          <div key={i} className="space-y-1 text-center">
            <div className="w-full aspect-square rounded-lg border border-border shadow-sm" style={{ backgroundColor: c.value }} />
            <p className="font-body text-[10px] font-medium text-foreground truncate">{c.name}</p>
            <p className="font-mono text-[9px] text-muted-foreground">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function VisualTokenReference({ block }: { block: Extract<ContentBlock, { type: "token-reference" }> }) {
  return (
    <div className="space-y-3">
      {block.heading && <h4 className="font-display text-sm font-semibold text-foreground">{block.heading}</h4>}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {block.tokens.map((t, i) => (
          <div key={i} className="p-3 rounded-lg border border-border bg-card/60">
            <p className="font-mono text-xs text-foreground">{t.name}</p>
            <p className="font-mono text-[10px] text-muted-foreground">{t.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function VisualSpecTable({ block }: { block: Extract<ContentBlock, { type: "spec-table" }> }) {
  const cols = block.columns || ["Label", "Value"];
  return (
    <div className="space-y-2">
      {block.heading && <h4 className="font-display text-sm font-semibold text-foreground">{block.heading}</h4>}
      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {cols.map((c, i) => (
                <th key={i} className="px-3 py-2 text-left font-body font-medium text-foreground">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="px-3 py-1.5 font-body text-foreground">{row.label}</td>
                <td className="px-3 py-1.5 font-mono text-muted-foreground">{row.value}</td>
                {row.notes && <td className="px-3 py-1.5 font-body text-muted-foreground">{row.notes}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function VisualDoDont({ block }: { block: Extract<ContentBlock, { type: "do-dont" }> }) {
  return (
    <div className="space-y-2">
      {block.heading && <h4 className="font-display text-sm font-semibold text-foreground">{block.heading}</h4>}
      <DosDonts dos={block.dos} donts={block.donts} />
    </div>
  );
}

function VisualPrincipleList({ block }: { block: Extract<ContentBlock, { type: "principle-list" }> }) {
  return (
    <div className="space-y-2">
      {block.heading && <h4 className="font-display text-sm font-semibold text-foreground">{block.heading}</h4>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {block.items.map((item, i) => (
          <div key={i} className="p-3 rounded-lg border border-border bg-card/60">
            <p className="font-body text-xs font-medium text-foreground">{item.title}</p>
            <p className="font-body text-[10px] text-muted-foreground mt-0.5">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function VisualLayerStack({ block }: { block: Extract<ContentBlock, { type: "layer-stack" }> }) {
  return (
    <div className="space-y-2">
      {block.heading && <h4 className="font-display text-sm font-semibold text-foreground">{block.heading}</h4>}
      <div className="space-y-2">
        {block.layers.map((l, i) => (
          <div key={i} className="p-3 rounded-lg border border-border bg-card/60 flex items-start gap-3">
            <Badge variant="outline" className="text-[10px] shrink-0 mt-0.5">{l.number}</Badge>
            <div>
              <p className="font-body text-xs font-medium text-foreground">{l.title}</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {l.items.map((item, j) => (
                  <Badge key={j} variant="secondary" className="text-[9px]">{item}</Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VisualComponentSpec({ block }: { block: Extract<ContentBlock, { type: "component-spec" }> }) {
  return (
    <div className="space-y-3">
      {block.heading && <h4 className="font-display text-sm font-semibold text-foreground">{block.heading}</h4>}
      {block.components.map((comp, i) => (
        <div key={i} className="p-4 rounded-lg border border-border bg-card/60 space-y-2">
          <p className="font-display text-xs font-semibold text-foreground">{comp.name}</p>
          <p className="font-body text-[10px] text-muted-foreground">{comp.description}</p>
          <DosDonts dos={comp.dos} donts={comp.donts} />
        </div>
      ))}
    </div>
  );
}

function VisualText({ block }: { block: Extract<ContentBlock, { type: "text" }> }) {
  return (
    <div>
      {block.heading && <h4 className="font-display text-sm font-semibold text-foreground mb-1">{block.heading}</h4>}
      <p className="font-body text-xs leading-relaxed text-muted-foreground line-clamp-3">{block.body}</p>
    </div>
  );
}

function VisualRuleList({ block }: { block: Extract<ContentBlock, { type: "rule-list" }> }) {
  const color = block.variant === "do" ? "text-foreground" : block.variant === "dont" ? "text-foreground" : "text-muted-foreground";
  const marker = block.variant === "do" ? "✓" : block.variant === "dont" ? "✗" : "•";
  return (
    <div>
      {block.heading && <h4 className="font-display text-sm font-semibold text-foreground mb-1">{block.heading}</h4>}
      <ul className="space-y-0.5">
        {block.items.slice(0, 6).map((item, i) => (
          <li key={i} className="font-body text-[11px] text-muted-foreground">
            <span className={`${color} mr-1.5`}>{marker}</span>{item}
          </li>
        ))}
        {block.items.length > 6 && (
          <li className="font-body text-[10px] text-muted-foreground/60 italic">+{block.items.length - 6} more</li>
        )}
      </ul>
    </div>
  );
}

function VisualChannelKit({ block }: { block: Extract<ContentBlock, { type: "channel-kit" }> }) {
  return (
    <div className="space-y-2">
      {block.heading && <h4 className="font-display text-sm font-semibold text-foreground">{block.heading}</h4>}
      {block.kits.map((kit, i) => (
        <div key={i} className="p-3 rounded-lg border border-border bg-card/60">
          <p className="font-display text-xs font-semibold text-foreground">{kit.name}</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {kit.toneModifiers.map((t, j) => (
              <Badge key={j} variant="secondary" className="text-[9px]">{t}</Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- generic fallback for less visual types ---------- */

function VisualFallback({ block }: { block: ContentBlock }) {
  if ("heading" in block && block.heading) {
    return <h4 className="font-display text-sm font-semibold text-foreground">{block.heading}</h4>;
  }
  return null;
}

/* ---------- visual block dispatcher ---------- */

function VisualBlock({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "color-swatch": return <VisualColorSwatch block={block} />;
    case "token-reference": return <VisualTokenReference block={block} />;
    case "spec-table": return <VisualSpecTable block={block} />;
    case "do-dont": return <VisualDoDont block={block} />;
    case "principle-list": return <VisualPrincipleList block={block} />;
    case "layer-stack": return <VisualLayerStack block={block} />;
    case "component-spec": return <VisualComponentSpec block={block} />;
    case "text": return <VisualText block={block} />;
    case "rule-list": return <VisualRuleList block={block} />;
    case "channel-kit": return <VisualChannelKit block={block} />;
    default: return <VisualFallback block={block} />;
  }
}

/* ================================================================
   ImageCanvas — the composited "design board" surface
   ================================================================ */

interface ImageCanvasProps {
  pages: PlaybookPage[];
  fullscreen?: boolean;
}

const ImageCanvas = forwardRef<HTMLDivElement, ImageCanvasProps>(({ pages, fullscreen }, ref) => {
  return (
    <div
      ref={ref}
      className={`mx-auto bg-muted/30 rounded-2xl border border-border p-8 sm:p-12 space-y-10 ${
        fullscreen ? "max-w-none" : "max-w-[1200px]"
      }`}
    >
      {/* Canvas header */}
      <div className="text-center space-y-1 pb-6 border-b border-border">
        <h2 className="font-display text-xl font-semibold text-foreground tracking-tight">Design System</h2>
        <p className="font-body text-xs text-muted-foreground">Curated handbook selection · {pages.length} element{pages.length !== 1 ? "s" : ""}</p>
      </div>

      {/* Rendered sections */}
      {pages.map((page) => (
        <section key={page.slug} className="space-y-4">
          <div className="flex items-center gap-3">
            <h3 className="font-display text-base font-semibold text-foreground">{page.page}</h3>
            <Badge variant="secondary" className="text-[9px]">{page.section}</Badge>
          </div>
          <div className="space-y-4 pl-0.5">
            {page.content.map((block, i) => (
              <VisualBlock key={i} block={block} />
            ))}
          </div>
        </section>
      ))}

      {pages.length === 0 && (
        <div className="text-center py-16">
          <p className="font-body text-sm text-muted-foreground">Select items to compose a visual board.</p>
        </div>
      )}
    </div>
  );
});

ImageCanvas.displayName = "ImageCanvas";

export { ImageCanvas };
