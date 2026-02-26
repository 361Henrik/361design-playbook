import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { channelKits, getConstraintBadges, type ChannelKit, type TemplateEntry } from "@/data/channelKits";
import { downloadFile } from "@/data/exportGenerators";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, Monitor, Tablet, Smartphone } from "lucide-react";

type Viewport = "desktop" | "tablet" | "mobile";
const viewportWidths: Record<Viewport, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "375px",
};

export default function ChannelKitsPage() {
  const [activeChannelId, setActiveChannelId] = useState(channelKits[0].id);
  const activeKit = channelKits.find((k) => k.id === activeChannelId)!;

  const [activeTemplateId, setActiveTemplateId] = useState(activeKit.templates[0].id);
  const activeTemplate =
    activeKit.templates.find((t) => t.id === activeTemplateId) || activeKit.templates[0];

  const [viewport, setViewport] = useState<Viewport>("desktop");

  /* When switching channels, reset to first template */
  const handleChannelChange = (id: string) => {
    setActiveChannelId(id);
    const kit = channelKits.find((k) => k.id === id)!;
    setActiveTemplateId(kit.templates[0].id);
  };

  /* Export helpers */
  const exportLayout = (t: TemplateEntry, kit: ChannelKit) =>
    downloadFile(t.layoutSpec, `${t.id}-layout-spec.md`);
  const exportCode = (t: TemplateEntry) =>
    downloadFile(t.code, `${t.id}.tsx`, "text/typescript");
  const exportCopy = (t: TemplateEntry) =>
    downloadFile(t.copySpec, `${t.id}-copy-spec.md`);
  const exportAll = (t: TemplateEntry, kit: ChannelKit) => {
    exportLayout(t, kit);
    setTimeout(() => exportCode(t), 200);
    setTimeout(() => exportCopy(t), 400);
  };

  const constraints = getConstraintBadges(activeKit);

  /* Preview container sizing for special channels */
  const getPreviewStyle = (): React.CSSProperties => {
    if (activeKit.id === "social-post") return {};
    if (activeKit.id === "email") return {};
    return { maxWidth: viewportWidths[viewport] };
  };

  return (
    <div>
      <PageHeader
        title="Channel kits"
        description="Live previews of the design system and voice in action across delivery surfaces."
      />

      {/* Channel tabs */}
      <Tabs value={activeChannelId} onValueChange={handleChannelChange}>
        <div className="flex items-center justify-between gap-4 mb-4">
          <TabsList>
            {channelKits.map((kit) => (
              <TabsTrigger key={kit.id} value={kit.id} className="font-body text-sm">
                {kit.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="flex items-center gap-2">
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
                  className={`p-1.5 transition-colors ${
                    viewport === v.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  title={v.id}
                >
                  <v.icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                </button>
              ))}
            </div>

            {/* Export dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="h-3.5 w-3.5 mr-1.5" strokeWidth={1.5} />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => exportLayout(activeTemplate, activeKit)}>
                  Layout spec (.md)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => exportCode(activeTemplate)}>
                  Code (.tsx)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => exportCopy(activeTemplate)}>
                  Copy spec (.md)
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => exportAll(activeTemplate, activeKit)}>
                  Download all
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </Tabs>

      {/* Constraint bar */}
      <div className="flex flex-wrap gap-2 mb-4 px-1">
        {constraints.map((c) => (
          <Badge key={c.label} variant="outline" className="text-[11px] font-body font-normal gap-1">
            <span className="text-muted-foreground">{c.label}:</span> {c.value}
          </Badge>
        ))}
      </div>

      {/* Template sub-tabs (when channel has multiple) */}
      {activeKit.templates.length > 1 && (
        <Tabs value={activeTemplateId} onValueChange={setActiveTemplateId} className="mb-4">
          <TabsList>
            {activeKit.templates.map((t) => (
              <TabsTrigger key={t.id} value={t.id} className="font-body text-xs">
                {t.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}

      {/* Preview frame */}
      <div className="rounded-lg border border-border bg-muted/30 p-2">
        <div
          className="mx-auto transition-all duration-ui overflow-hidden rounded-md border border-border bg-background"
          style={getPreviewStyle()}
        >
          {activeTemplate.component()}
        </div>
      </div>

      {/* Template description */}
      <p className="mt-3 text-xs font-body text-muted-foreground px-1">
        {activeTemplate.description}
      </p>
    </div>
  );
}
