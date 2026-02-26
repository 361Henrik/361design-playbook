import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { VariantRow } from "@/data/studioData";
import { SLOT_TYPE_LABELS } from "@/data/studioData";

interface VariantsTabProps {
  variants: VariantRow[];
  loading: boolean;
}

export function VariantsTab({ variants, loading }: VariantsTabProps) {
  const slotTypes = [...new Set(variants.map((v) => v.slot_type))];
  const [activeType, setActiveType] = useState<string>(slotTypes[0] || "headline");

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="py-3"><div className="h-3 bg-muted rounded w-48" /></CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (variants.length === 0) {
    return <p className="text-sm text-muted-foreground font-body">No variants found. Seed data may not be loaded yet.</p>;
  }

  const filtered = variants.filter((v) => v.slot_type === activeType);

  return (
    <div className="space-y-4">
      <Tabs value={activeType} onValueChange={setActiveType}>
        <TabsList>
          {slotTypes.map((type) => (
            <TabsTrigger key={type} value={type} className="font-body text-xs">
              {SLOT_TYPE_LABELS[type] || type}
              <span className="ml-1.5 text-[10px] text-muted-foreground">
                {variants.filter((v) => v.slot_type === type).length}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="space-y-2">
        {filtered.map((variant) => (
          <Card key={variant.id}>
            <CardHeader className="pb-2 pt-3 px-4">
              <div className="flex items-center gap-2">
                <CardTitle className="font-body text-sm font-medium">{variant.name}</CardTitle>
                <Badge variant="outline" className="text-[10px] font-body font-normal">
                  {variant.slot_type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-3">
              <p className="text-sm font-body text-foreground bg-muted/50 rounded px-3 py-2">
                "{variant.content.text}"
              </p>
              {variant.content.meta && (
                <div className="flex gap-2 mt-2">
                  {Object.entries(variant.content.meta).map(([key, val]) => (
                    <span key={key} className="text-[10px] font-mono text-muted-foreground">
                      {key}: {String(val)}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
