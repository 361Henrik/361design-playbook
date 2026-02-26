import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { KitRow } from "@/data/studioData";

interface KitsTabProps {
  kits: KitRow[];
  loading: boolean;
}

export function KitsTab({ kits, loading }: KitsTabProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader><div className="h-4 bg-muted rounded w-24" /></CardHeader>
            <CardContent><div className="h-3 bg-muted rounded w-full" /></CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (kits.length === 0) {
    return <p className="text-sm text-muted-foreground font-body">No kits found. Seed data may not be loaded yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {kits.map((kit) => {
        const constraints = kit.layout_constraints as Record<string, unknown>;
        return (
          <Card key={kit.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <CardTitle className="font-display text-base font-medium">{kit.name}</CardTitle>
                <Badge variant="outline" className="text-[10px] font-body">{kit.channel.replace("_", " ")}</Badge>
                {kit.is_default && <Badge variant="secondary" className="text-[10px] font-body">Default</Badge>}
              </div>
              {kit.description && (
                <CardDescription className="font-body text-xs">{kit.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Constraint summary */}
              <div className="flex flex-wrap gap-1.5">
                {constraints.maxHeadingLength && (
                  <Badge variant="outline" className="text-[10px] font-body font-normal">
                    Heading: {String(constraints.maxHeadingLength)} chars
                  </Badge>
                )}
                {constraints.spacingProfile && (
                  <Badge variant="outline" className="text-[10px] font-body font-normal">
                    Spacing: {String(constraints.spacingProfile)}
                  </Badge>
                )}
                {constraints.ctaRules && (
                  <Badge variant="outline" className="text-[10px] font-body font-normal">
                    CTA: {String(constraints.ctaRules)}
                  </Badge>
                )}
              </div>

              {/* Tone modifiers */}
              {kit.tone_modifiers.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {kit.tone_modifiers.map((t) => (
                    <span key={t} className="text-[10px] font-body text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {/* Component subset count */}
              {kit.component_subset.length > 0 && (
                <p className="text-[10px] font-body text-muted-foreground">
                  {kit.component_subset.length} components allowed
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
