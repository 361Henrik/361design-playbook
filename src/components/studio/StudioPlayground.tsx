import { useState, useMemo } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Monitor, Tablet, Smartphone } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { downloadFile } from "@/data/exportGenerators";
import { SlotEditor } from "./SlotEditor";
import { GuardrailRunner } from "./GuardrailRunner";
import { channelKits } from "@/data/channelKits";
import type { KitRow, TemplateRow, VariantRow, SlotSchema } from "@/data/studioData";

type Viewport = "desktop" | "tablet" | "mobile";
const viewportWidths: Record<Viewport, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "375px",
};

interface StudioPlaygroundProps {
  kits: KitRow[];
  templates: TemplateRow[];
  variants: VariantRow[];
  loading: boolean;
}

export function StudioPlayground({ kits, templates, variants, loading }: StudioPlaygroundProps) {
  const [selectedKitId, setSelectedKitId] = useState<string>("");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [slotValues, setSlotValues] = useState<Record<string, string>>({});

  const selectedKit = kits.find((k) => k.id === selectedKitId);
  const kitTemplates = templates.filter((t) => t.kit_id === selectedKitId);
  const selectedTemplate = templates.find((t) => t.id === selectedTemplateId);

  // Auto-select first kit
  if (kits.length > 0 && !selectedKitId) {
    setSelectedKitId(kits[0].id);
  }

  // Auto-select first template when kit changes
  if (kitTemplates.length > 0 && !kitTemplates.find((t) => t.id === selectedTemplateId)) {
    setSelectedTemplateId(kitTemplates[0].id);
  }

  // Init slot values from schema defaults
  const slotSchema: SlotSchema[] = (selectedTemplate?.slot_schema as SlotSchema[]) || [];
  useMemo(() => {
    if (slotSchema.length > 0) {
      const defaults: Record<string, string> = {};
      slotSchema.forEach((s) => { defaults[s.slot_id] = s.default_value; });
      setSlotValues((prev) => {
        const merged = { ...defaults };
        // Keep existing user edits
        for (const [k, v] of Object.entries(prev)) {
          if (slotSchema.some((s) => s.slot_id === k)) merged[k] = v;
        }
        return merged;
      });
    }
  }, [selectedTemplateId]);

  const handleSlotChange = (slotId: string, value: string) => {
    setSlotValues((prev) => ({ ...prev, [slotId]: value }));
  };

  // Find matching hardcoded renderer from channelKits
  const renderPreview = () => {
    if (!selectedTemplate) return null;

    // Try to match by looking up the template name against channelKits data
    for (const kit of channelKits) {
      for (const tmpl of kit.templates) {
        // Match by name similarity
        if (selectedTemplate.name === tmpl.name || selectedTemplate.description === tmpl.description) {
          return tmpl.component();
        }
      }
    }

    // Fallback: show placeholder
    return (
      <div className="flex items-center justify-center h-64 text-sm font-body text-muted-foreground">
        No preview renderer available for this template.
      </div>
    );
  };

  const constraints = selectedKit?.layout_constraints as Record<string, unknown> || {};

  // Export
  const handleExport = (type: "layout" | "code" | "copy" | "all") => {
    if (!selectedTemplate) return;
    const prefix = selectedKit?.slug || "template";
    if (type === "layout" || type === "all") {
      downloadFile(selectedTemplate.layout_spec || "No layout spec available.", `${prefix}-${selectedTemplate.name.toLowerCase().replace(/\s+/g, "-")}-layout.md`);
    }
    if (type === "code" || type === "all") {
      setTimeout(() => downloadFile(selectedTemplate.component_jsx, `${prefix}-${selectedTemplate.name.toLowerCase().replace(/\s+/g, "-")}.tsx`, "text/typescript"), type === "all" ? 200 : 0);
    }
    if (type === "copy" || type === "all") {
      setTimeout(() => downloadFile(selectedTemplate.copy_spec || "No copy spec available.", `${prefix}-${selectedTemplate.name.toLowerCase().replace(/\s+/g, "-")}-copy.md`), type === "all" ? 400 : 0);
    }
  };

  if (loading) {
    return <div className="animate-pulse space-y-4"><div className="h-10 bg-muted rounded w-full" /><div className="h-64 bg-muted rounded w-full" /></div>;
  }

  if (kits.length === 0) {
    return <p className="text-sm text-muted-foreground font-body">No kits available. Load seed data to get started.</p>;
  }

  return (
    <div className="space-y-4">
      {/* Kit + Template selectors */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-xs font-body text-muted-foreground">Kit:</span>
          <Select value={selectedKitId} onValueChange={(val) => { setSelectedKitId(val); setSlotValues({}); }}>
            <SelectTrigger className="h-8 w-[180px] text-sm font-body">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {kits.map((k) => (
                <SelectItem key={k.id} value={k.id} className="text-sm">{k.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-body text-muted-foreground">Template:</span>
          <Select value={selectedTemplateId} onValueChange={setSelectedTemplateId}>
            <SelectTrigger className="h-8 w-[180px] text-sm font-body">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {kitTemplates.map((t) => (
                <SelectItem key={t.id} value={t.id} className="text-sm">{t.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="ml-auto flex items-center gap-2">
          {/* Viewport toggle */}
          <div className="flex items-center border border-border rounded-md overflow-hidden">
            {([
              { id: "desktop" as Viewport, icon: Monitor },
              { id: "tablet" as Viewport, icon: Tablet },
              { id: "mobile" as Viewport, icon: Smartphone },
            ]).map((v) => (
              <button
                key={v.id}
                onClick={() => setViewport(v.id)}
                className={`p-1.5 transition-colors ${viewport === v.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                title={v.id}
              >
                <v.icon className="h-3.5 w-3.5" strokeWidth={1.5} />
              </button>
            ))}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="h-3.5 w-3.5 mr-1.5" strokeWidth={1.5} />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleExport("layout")}>Layout spec (.md)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("code")}>Code (.tsx)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("copy")}>Copy spec (.md)</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleExport("all")}>Download all</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Constraint bar */}
      {selectedKit && (
        <div className="flex flex-wrap gap-1.5">
          {constraints.maxHeadingLength && (
            <Badge variant="outline" className="text-[10px] font-body font-normal gap-1">
              <span className="text-muted-foreground">Heading:</span> {String(constraints.maxHeadingLength)} chars
            </Badge>
          )}
          {constraints.ctaRules && (
            <Badge variant="outline" className="text-[10px] font-body font-normal gap-1">
              <span className="text-muted-foreground">CTA:</span> {String(constraints.ctaRules)}
            </Badge>
          )}
          {constraints.spacingProfile && (
            <Badge variant="outline" className="text-[10px] font-body font-normal gap-1">
              <span className="text-muted-foreground">Spacing:</span> {String(constraints.spacingProfile)}
            </Badge>
          )}
          {selectedKit.tone_modifiers.length > 0 && (
            <Badge variant="outline" className="text-[10px] font-body font-normal gap-1">
              <span className="text-muted-foreground">Tone:</span> {selectedKit.tone_modifiers.join(", ")}
            </Badge>
          )}
        </div>
      )}

      {/* Main layout: slots + preview */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4">
        {/* Slot editor */}
        <div className="border border-border rounded-lg p-4 space-y-4 bg-card">
          <h3 className="text-xs font-body font-medium text-foreground uppercase tracking-widest">Content slots</h3>
          <SlotEditor
            slots={slotSchema}
            values={slotValues}
            onChange={handleSlotChange}
            variants={variants}
          />
        </div>

        {/* Preview */}
        <div className="rounded-lg border border-border bg-muted/30 p-2">
          <div
            className="mx-auto transition-all duration-ui overflow-hidden rounded-md border border-border bg-background"
            style={{ maxWidth: viewportWidths[viewport] }}
          >
            {renderPreview()}
          </div>
        </div>
      </div>

      {/* Guardrail results */}
      {selectedKit && (
        <div className="border border-border rounded-lg p-4 bg-card">
          <GuardrailRunner
            guardrailProfile={selectedKit.guardrail_profile}
            slotValues={slotValues}
            layoutConstraints={constraints}
          />
        </div>
      )}
    </div>
  );
}
