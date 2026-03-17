import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useWorkspace } from "@/hooks/useWorkspace";
import { KitsTab } from "@/components/studio/KitsTab";
import { VariantsTab } from "@/components/studio/VariantsTab";
import { StudioPlayground } from "@/components/studio/StudioPlayground";
import { channelKits } from "@/data/channelKits";
import { SEED_VARIANTS } from "@/data/studioData";
import type { KitRow, TemplateRow, VariantRow, SlotSchema } from "@/data/studioData";

export default function StudioPage() {
  const { activeWorkspace } = useWorkspace();
  const [kits, setKits] = useState<KitRow[]>([]);
  const [templates, setTemplates] = useState<TemplateRow[]>([]);
  const [variants, setVariants] = useState<VariantRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!activeWorkspace?.id) return;
    loadData();
  }, [activeWorkspace?.id]);

  async function loadData() {
    setLoading(true);
    const wsId = activeWorkspace!.id;

    // Fetch kits
    const { data: kitsData } = await supabase
      .from("kits")
      .select("*")
      .eq("workspace_id", wsId)
      .order("sort_order");

    // Fetch templates
    const { data: templatesData } = await supabase
      .from("templates")
      .select("*")
      .eq("workspace_id", wsId)
      .order("sort_order");

    // Fetch variants
    const { data: variantsData } = await supabase
      .from("variants")
      .select("*")
      .eq("workspace_id", wsId)
      .order("sort_order");

    // If DB is empty, use hardcoded fallback data
    if (!kitsData || kitsData.length === 0) {
      // Convert channelKits to KitRow format as fallback
      const fallbackKits: KitRow[] = channelKits.map((ck, i) => ({
        id: ck.id,
        workspace_id: wsId,
        name: ck.name,
        slug: ck.id,
        description: ck.description,
        channel: ck.id.replace("-", "_"),
        token_overrides: {},
        layout_constraints: {
          maxHeadingLength: ck.maxHeadingLength,
          maxBodyLength: ck.maxBodyLength,
          ctaRules: ck.ctaRules,
          spacingProfile: ck.spacingProfile,
          maxHeadlineSize: ck.typographyOverrides.maxHeadlineSize,
          bodySize: ck.typographyOverrides.bodySize,
        },
        component_subset: ck.allowedComponents,
        guardrail_profile: [],
        tone_modifiers: ck.toneModifiers,
        sort_order: i,
        is_default: true,
      }));

      const fallbackTemplates: TemplateRow[] = channelKits.flatMap((ck) =>
        ck.templates.map((t, j) => ({
          id: t.id,
          kit_id: ck.id,
          workspace_id: wsId,
          name: t.name,
          description: t.description,
          component_jsx: t.code,
          layout_spec: t.layoutSpec,
          copy_spec: t.copySpec,
          slot_schema: getDefaultSlotSchema(t.id),
          sort_order: j,
          is_default: true,
        }))
      );

      const fallbackVariants: VariantRow[] = SEED_VARIANTS.map((v, i) => ({
        ...v,
        id: `seed-${i}`,
        workspace_id: wsId,
      }));

      setKits(fallbackKits);
      setTemplates(fallbackTemplates);
      setVariants(fallbackVariants);
    } else {
      setKits((kitsData || []) as unknown as KitRow[]);
      setTemplates((templatesData || []) as unknown as TemplateRow[]);
      setVariants((variantsData || []) as unknown as VariantRow[]);
    }

    setLoading(false);
  }

  return (
    <div className="px-space-5 md:px-space-8 py-space-8 max-w-content">
      <PageHeader
        title="Studio"
        description="Compose layouts, swap content variants, and validate against guardrails before exporting."
      />

      <Tabs defaultValue="kits">
        <TabsList className="mb-6">
          <TabsTrigger value="kits" className="font-body text-sm">Kits</TabsTrigger>
          <TabsTrigger value="variants" className="font-body text-sm">Variants</TabsTrigger>
          <TabsTrigger value="studio" className="font-body text-sm">Studio</TabsTrigger>
        </TabsList>

        <TabsContent value="kits">
          <KitsTab kits={kits} loading={loading} />
        </TabsContent>

        <TabsContent value="variants">
          <VariantsTab variants={variants} loading={loading} />
        </TabsContent>

        <TabsContent value="studio">
          <StudioPlayground kits={kits} templates={templates} variants={variants} loading={loading} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* Default slot schemas for seed templates */
function getDefaultSlotSchema(templateId: string): SlotSchema[] {
  const schemas: Record<string, SlotSchema[]> = {
    "web-app-dashboard": [
      { slot_id: "headline", label: "Page title", type: "text", max_length: 40, default_value: "Overview" },
      { slot_id: "cta_primary", label: "Primary CTA", type: "text", max_length: 15, default_value: "Create report" },
      { slot_id: "stat_1_value", label: "Stat 1", type: "text", max_length: 10, default_value: "2,847" },
      { slot_id: "stat_2_value", label: "Stat 2", type: "text", max_length: 10, default_value: "68.3%" },
      { slot_id: "stat_3_value", label: "Stat 3", type: "text", max_length: 10, default_value: "23.1%" },
    ],
    "landing-hero": [
      { slot_id: "headline", label: "Headline", type: "text", max_length: 60, default_value: "Design with purpose" },
      { slot_id: "body", label: "Body", type: "textarea", max_length: 200, default_value: "Every decision should be intentional. A system that provides the rails without prescribing the destination." },
      { slot_id: "cta_primary", label: "Primary CTA", type: "text", max_length: 15, default_value: "Get started" },
      { slot_id: "cta_secondary", label: "Secondary CTA", type: "text", max_length: 15, default_value: "View docs" },
    ],
    "landing-pricing": [
      { slot_id: "headline", label: "Section headline", type: "text", max_length: 60, default_value: "Choose your path" },
      { slot_id: "body", label: "Section subtitle", type: "textarea", max_length: 120, default_value: "Each tier unlocks more of the system. Start where it makes sense." },
    ],
    "social-post": [
      { slot_id: "headline", label: "Headline", type: "text", max_length: 80, default_value: "Consistency is a design decision, not an accident" },
      { slot_id: "body", label: "Body", type: "textarea", max_length: 280, default_value: "When every token traces back to a single source of truth, your team moves faster and your product feels intentional." },
      { slot_id: "cta", label: "Soft CTA", type: "text", max_length: 25, default_value: "Explore the system" },
    ],
    "email-header": [
      { slot_id: "headline", label: "Subject / Headline", type: "text", max_length: 50, default_value: "Your weekly design digest" },
      { slot_id: "body", label: "Body", type: "textarea", max_length: 200, default_value: "Three tokens were updated this week. Two new components passed guardrail review. Here is what changed and why it matters for your workflow." },
      { slot_id: "cta", label: "CTA", type: "text", max_length: 15, default_value: "View changes" },
    ],
    "email-transactional": [
      { slot_id: "headline", label: "Headline", type: "text", max_length: 50, default_value: "Review approved" },
      { slot_id: "body", label: "Body", type: "textarea", max_length: 250, default_value: 'The design review for "Landing page hero section" has been approved. All 29 guardrail checks passed. The components are ready for production.' },
      { slot_id: "cta", label: "CTA", type: "text", max_length: 15, default_value: "View review" },
    ],
  };
  return schemas[templateId] || [];
}
