import type { ContentBlock } from "@/playbook/types";
import { DosDonts } from "@/components/DosDonts";
import { CodeBlock } from "@/components/CodeBlock";
import { Badge } from "@/components/ui/badge";
import { SpacingVisualBlock, IconGridBlock, EnhancedColorSwatchBlock } from "@/components/playbook/VisualBlockRenderers";
import { AppliedExampleRenderer } from "@/components/playbook/AppliedExampleRenderer";

function TextBlock({ block }: { block: Extract<ContentBlock, { type: "text" }> }) {
  return (
    <div className="space-y-2">
      {block.heading && (
        <h4 className="font-display text-base font-semibold text-foreground">{block.heading}</h4>
      )}
      <p className="font-body text-sm leading-reading text-foreground whitespace-pre-line">{block.body}</p>
    </div>
  );
}

function PrincipleListBlock({ block }: { block: Extract<ContentBlock, { type: "principle-list" }> }) {
  return (
    <div className="space-y-3">
      {block.heading && (
        <h4 className="font-display text-base font-semibold text-foreground">{block.heading}</h4>
      )}
      {block.description && (
        <p className="font-body text-sm text-foreground">{block.description}</p>
      )}
      <div className="space-y-2">
        {block.items.map((item, i) => (
          <div key={i} className="pl-3 border-l-2 border-primary/20">
            <p className="font-body text-sm font-medium text-foreground">{item.title}</p>
            <p className="font-body text-xs text-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DoDontBlock({ block }: { block: Extract<ContentBlock, { type: "do-dont" }> }) {
  return (
    <div className="space-y-2">
      {block.heading && (
        <h4 className="font-display text-base font-semibold text-foreground">{block.heading}</h4>
      )}
      <DosDonts dos={block.dos} donts={block.donts} />
    </div>
  );
}

function SpecTableBlock({ block }: { block: Extract<ContentBlock, { type: "spec-table" }> }) {
  const cols = block.columns || ["Label", "Value", "Notes"];
  return (
    <div className="space-y-2">
      {block.heading && (
        <h4 className="font-display text-base font-semibold text-foreground">{block.heading}</h4>
      )}
      {block.description && (
        <p className="font-body text-xs text-foreground mb-2">{block.description}</p>
      )}
      <div className="overflow-x-auto rounded-md border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {cols.map((c, i) => (
                <th key={i} className="px-3 py-2 text-left font-body font-medium text-foreground text-xs">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="px-3 py-2 font-body text-xs text-foreground">{row.label}</td>
                <td className="px-3 py-2 font-body text-xs font-mono text-muted-foreground">{row.value}</td>
                {row.notes && <td className="px-3 py-2 font-body text-xs text-muted-foreground">{row.notes}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RuleListBlock({ block }: { block: Extract<ContentBlock, { type: "rule-list" }> }) {
  const color = block.variant === "do" ? "text-primary" : block.variant === "dont" ? "text-destructive" : "text-muted-foreground";
  const marker = block.variant === "do" ? "✓" : block.variant === "dont" ? "✗" : "•";
  return (
    <div className="space-y-2">
      {block.heading && (
        <h4 className="font-display text-base font-semibold text-foreground">{block.heading}</h4>
      )}
      <ul className="space-y-1">
        {block.items.map((item, i) => (
          <li key={i} className="font-body text-sm text-foreground">
            <span className={`${color} mr-2`}>{marker}</span>{item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TokenRefBlock({ block }: { block: Extract<ContentBlock, { type: "token-reference" }> }) {
  return (
    <div className="space-y-2">
      {block.heading && (
        <h4 className="font-display text-base font-semibold text-foreground">{block.heading}</h4>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {block.tokens.map((t, i) => (
          <div key={i} className="p-3 rounded-md border border-border bg-card">
            <p className="font-mono text-xs text-foreground">{t.name}</p>
            <p className="font-mono text-xs text-muted-foreground">{t.value}</p>
            {t.description && <p className="font-body text-xs text-muted-foreground mt-1">{t.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

function ColorSwatchBlock({ block }: { block: Extract<ContentBlock, { type: "color-swatch" }> }) {
  return <EnhancedColorSwatchBlock block={block} />;
}

function LayerStackBlock({ block }: { block: Extract<ContentBlock, { type: "layer-stack" }> }) {
  return (
    <div className="space-y-2">
      {block.heading && (
        <h4 className="font-display text-base font-semibold text-foreground">{block.heading}</h4>
      )}
      {block.description && (
        <p className="font-body text-xs text-foreground">{block.description}</p>
      )}
      <div className="space-y-2">
        {block.layers.map((l, i) => (
          <div key={i} className="p-3 rounded-md border border-border bg-card">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="text-[10px]">{l.number}</Badge>
              <span className="font-body text-sm font-medium text-foreground">{l.title}</span>
            </div>
            <p className="font-body text-xs text-foreground mb-1">{l.description}</p>
            <div className="flex flex-wrap gap-1">
              {l.items.map((item, j) => (
                <Badge key={j} variant="secondary" className="text-[10px]">{item}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CategoryListBlock({ block }: { block: Extract<ContentBlock, { type: "category-list" }> }) {
  return (
    <div className="space-y-2">
      {block.heading && (
        <h4 className="font-display text-base font-semibold text-foreground">{block.heading}</h4>
      )}
      <div className="flex flex-wrap gap-2">
        {block.categories.map((cat, i) => (
          <div key={i} className="p-2 rounded-md border border-border bg-card text-xs">
            <span className="font-body font-medium text-foreground">{cat.name}</span>
            <span className="font-body text-foreground ml-1">— {cat.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScenarioBlock({ block }: { block: Extract<ContentBlock, { type: "scenario" }> }) {
  return (
    <div className="space-y-3">
      {block.heading && (
        <h4 className="font-display text-base font-semibold text-foreground">{block.heading}</h4>
      )}
      {block.scenarios.map((s, i) => (
        <div key={i} className="p-3 rounded-md border border-border bg-card">
          <p className="font-body text-sm font-medium text-foreground">{s.title}</p>
          {s.type && <Badge variant="outline" className="text-[10px] mt-1">{s.type}</Badge>}
          <p className="font-body text-xs text-muted-foreground mt-1">{s.description}</p>
          <ul className="mt-2 space-y-0.5">
            {s.features.map((f, j) => (
              <li key={j} className="font-body text-xs text-muted-foreground">• {f}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function ComponentSpecBlock({ block }: { block: Extract<ContentBlock, { type: "component-spec" }> }) {
  return (
    <div className="space-y-3">
      {block.heading && (
        <h4 className="font-display text-base font-semibold text-foreground">{block.heading}</h4>
      )}
      {block.components.map((comp, i) => (
        <div key={i} className="p-4 rounded-md border border-border bg-card space-y-2">
          <p className="font-display text-sm font-semibold text-foreground">{comp.name}</p>
          <p className="font-body text-xs text-muted-foreground">{comp.description}</p>
          {comp.anatomy && (
            <p className="font-body text-xs text-muted-foreground"><span className="font-medium">Anatomy:</span> {comp.anatomy}</p>
          )}
          <DosDonts dos={comp.dos} donts={comp.donts} />
          {comp.code && <CodeBlock code={comp.code} language="tsx" />}
        </div>
      ))}
    </div>
  );
}

function ChannelKitBlock({ block }: { block: Extract<ContentBlock, { type: "channel-kit" }> }) {
  return (
    <div className="space-y-3">
      {block.heading && (
        <h4 className="font-display text-base font-semibold text-foreground">{block.heading}</h4>
      )}
      {block.kits.map((kit, i) => (
        <div key={i} className="p-4 rounded-md border border-border bg-card space-y-2">
          <p className="font-display text-sm font-semibold text-foreground">{kit.name}</p>
          <p className="font-body text-xs text-muted-foreground">{kit.description}</p>
          <div className="flex flex-wrap gap-1">
            {kit.toneModifiers.map((t, j) => (
              <Badge key={j} variant="secondary" className="text-[10px]">{t}</Badge>
            ))}
          </div>
          <p className="font-body text-xs text-muted-foreground">Spacing: {kit.spacingProfile} · Colour emphasis: {kit.colorEmphasis}</p>
        </div>
      ))}
    </div>
  );
}

export function PlaybookBlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "text": return <TextBlock block={block} />;
    case "principle-list": return <PrincipleListBlock block={block} />;
    case "do-dont": return <DoDontBlock block={block} />;
    case "spec-table": return <SpecTableBlock block={block} />;
    case "rule-list": return <RuleListBlock block={block} />;
    case "token-reference": return <TokenRefBlock block={block} />;
    case "color-swatch": return <ColorSwatchBlock block={block} />;
    case "layer-stack": return <LayerStackBlock block={block} />;
    case "category-list": return <CategoryListBlock block={block} />;
    case "scenario": return <ScenarioBlock block={block} />;
    case "component-spec": return <ComponentSpecBlock block={block} />;
    case "channel-kit": return <ChannelKitBlock block={block} />;
    case "spacing-visual": return <SpacingVisualBlock block={block} />;
    case "icon-grid": return <IconGridBlock block={block} />;
    case "applied-example": return <AppliedExampleRenderer block={block} />;
    default: return null;
  }
}
