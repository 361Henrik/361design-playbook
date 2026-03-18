import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { CopyButton } from "@/components/CopyButton";
import { DosDonts } from "@/components/DosDonts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TokenExamplesTab } from "@/components/tokens/TokenExamplesTab";
import { supabase } from "@/integrations/supabase/client";
import { useWorkspace } from "@/hooks/useWorkspace";
import { MessageSquare, Ban, MousePointerClick, BookType } from "lucide-react";

interface VoiceToken {
  id: string;
  token_type: string;
  name: string;
  description: string | null;
  dos: string[];
  donts: string[];
  severity: string;
  sort_order: number;
}

const TOKEN_TYPE_META: Record<string, { label: string; icon: typeof MessageSquare; description: string }> = {
  pillar: {
    label: "Brand pillars",
    icon: MessageSquare,
    description: "Core voice attributes that define how the brand speaks. 3–5 maximum.",
  },
  prohibited_pattern: {
    label: "Prohibited patterns",
    icon: Ban,
    description: "Specific language anti-patterns that must never appear in any channel.",
  },
  cta_style: {
    label: "CTA style",
    icon: MousePointerClick,
    description: "Rules governing call-to-action phrasing across all components.",
  },
  grammar_rule: {
    label: "Grammar rules",
    icon: BookType,
    description: "Mechanical style choices that ensure consistency in headlines, lists, and body copy.",
  },
};

const SECTION_ORDER = ["pillar", "prohibited_pattern", "cta_style", "grammar_rule"];

const TokensVoice = () => {
  const { activeWorkspace } = useWorkspace();
  const [tokens, setTokens] = useState<VoiceToken[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!activeWorkspace?.id) return;
    const fetchTokens = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("voice_tokens")
        .select("*")
        .eq("workspace_id", activeWorkspace.id)
        .order("sort_order");
      setTokens((data as VoiceToken[]) || []);
      setLoading(false);
    };
    fetchTokens();
  }, [activeWorkspace?.id]);

  const grouped = SECTION_ORDER.map((type) => ({
    type,
    meta: TOKEN_TYPE_META[type],
    items: tokens.filter((t) => t.token_type === type),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="px-space-5 md:px-space-8 py-space-8 max-w-content">
      <PageHeader
        title="Foundations · Voice & Tone"
        description="The building blocks of how the brand speaks — pillars, prohibited patterns, CTA rules, and grammar conventions."
      />

      <Tabs defaultValue="system" className="mt-6">
        <TabsList>
          <TabsTrigger value="system">Voice System</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
        </TabsList>

        <TabsContent value="system">
          {loading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-40 w-full rounded-md" />
              ))}
            </div>
          ) : grouped.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-sm font-body text-muted-foreground">
                  No voice rules defined yet.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-12">
              {grouped.map(({ type, meta, items }) => (
                <section key={type}>
                  <div className="flex items-center gap-3 mb-1">
                    <meta.icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
                    <h2 className="font-display text-xl font-medium tracking-headline leading-section text-foreground">
                      {meta.label}
                    </h2>
                  </div>
                  <p className="text-sm font-body text-muted-foreground mb-5 max-w-prose">
                    {meta.description}
                  </p>

                  <div className="space-y-4">
                    {items.map((token) => (
                      <Card key={token.id}>
                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-3">
                            <CardTitle className="text-base font-display tracking-headline">
                              {token.name}
                            </CardTitle>
                            <CopyButton value={token.name} label="Copy name" />
                          </div>
                          {token.description && (
                            <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose mt-1">
                              {token.description}
                            </p>
                          )}
                        </CardHeader>
                        <CardContent>
                          {(token.dos.length > 0 || token.donts.length > 0) && (
                            <DosDonts dos={token.dos} donts={token.donts} />
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="examples">
          <TokenExamplesTab tokenCategory="voice" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TokensVoice;
