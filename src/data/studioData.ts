/* ------------------------------------------------------------------ */
/*  Studio data types + template renderer registry + seed variants     */
/* ------------------------------------------------------------------ */

import { ReactNode } from "react";

/* ---- Types matching DB schema ---- */

export interface SlotSchema {
  slot_id: string;
  label: string;
  type: "text" | "textarea";
  max_length?: number;
  default_value: string;
}

export interface KitRow {
  id: string;
  workspace_id: string;
  name: string;
  slug: string;
  description: string | null;
  channel: string;
  token_overrides: Record<string, unknown>;
  layout_constraints: Record<string, unknown>;
  component_subset: string[];
  guardrail_profile: string[];
  tone_modifiers: string[];
  sort_order: number;
  is_default: boolean;
}

export interface TemplateRow {
  id: string;
  kit_id: string;
  workspace_id: string;
  name: string;
  description: string | null;
  component_jsx: string;
  layout_spec: string | null;
  copy_spec: string | null;
  slot_schema: SlotSchema[];
  sort_order: number;
  is_default: boolean;
}

export interface VariantRow {
  id: string;
  workspace_id: string;
  name: string;
  slot_type: string;
  content: { text: string; meta?: Record<string, unknown> };
  component_ids: string[];
  voice_token_ids: string[];
  sort_order: number;
  token_category?: string | null;
}

/* ---- Template renderer registry ---- */
/* Maps template slugs to React render functions that accept slot values */

export type TemplateRenderer = (slots: Record<string, string>) => ReactNode;

/* We'll register renderers from channelKits.tsx existing components */
/* The registry is populated in the Studio page to keep this file dependency-free */

const TEMPLATE_RENDERERS = new Map<string, TemplateRenderer>();

export function registerTemplateRenderer(templateId: string, renderer: TemplateRenderer) {
  TEMPLATE_RENDERERS.set(templateId, renderer);
}

export function getTemplateRenderer(templateId: string): TemplateRenderer | undefined {
  return TEMPLATE_RENDERERS.get(templateId);
}

/* ---- Seed variant data (used as fallback when DB is empty) ---- */

export const SEED_VARIANTS: Omit<VariantRow, "id" | "workspace_id">[] = [
  // Headlines
  {
    name: "Calm authority headline",
    slot_type: "headline",
    content: { text: "Design with purpose", meta: { char_count: 19 } },
    component_ids: [],
    voice_token_ids: [],
    sort_order: 0,
  },
  {
    name: "System thinking headline",
    slot_type: "headline",
    content: { text: "Consistency is a design decision", meta: { char_count: 33 } },
    component_ids: [],
    voice_token_ids: [],
    sort_order: 1,
  },
  {
    name: "Outcome-focused headline",
    slot_type: "headline",
    content: { text: "Every token tells a story", meta: { char_count: 25 } },
    component_ids: [],
    voice_token_ids: [],
    sort_order: 2,
  },
  // CTAs
  {
    name: "Primary action CTA",
    slot_type: "cta",
    content: { text: "Get started", meta: { word_count: 2 } },
    component_ids: ["button-primary"],
    voice_token_ids: [],
    sort_order: 0,
  },
  {
    name: "Exploration CTA",
    slot_type: "cta",
    content: { text: "Explore", meta: { word_count: 1 } },
    component_ids: ["button-primary"],
    voice_token_ids: [],
    sort_order: 1,
  },
  {
    name: "View action CTA",
    slot_type: "cta",
    content: { text: "View changes", meta: { word_count: 2 } },
    component_ids: ["button-primary"],
    voice_token_ids: [],
    sort_order: 2,
  },
  // Body
  {
    name: "System value proposition",
    slot_type: "body",
    content: { text: "Every decision should be intentional. A system that provides the rails without prescribing the destination.", meta: { char_count: 105 } },
    component_ids: [],
    voice_token_ids: [],
    sort_order: 0,
  },
  {
    name: "Token traceability body",
    slot_type: "body",
    content: { text: "When every token traces back to a single source of truth, your team moves faster and your product feels intentional.", meta: { char_count: 117 } },
    component_ids: [],
    voice_token_ids: [],
    sort_order: 1,
  },
  {
    name: "Weekly digest body",
    slot_type: "body",
    content: { text: "Three tokens were updated this week. Two new components passed guardrail review. Here is what changed and why it matters for your workflow.", meta: { char_count: 140 } },
    component_ids: [],
    voice_token_ids: [],
    sort_order: 2,
  },
  // Stats
  {
    name: "Active users stat",
    slot_type: "stat",
    content: { text: "2,847", meta: { label: "Active users" } },
    component_ids: ["card-stat"],
    voice_token_ids: [],
    sort_order: 0,
  },
  {
    name: "Engagement rate stat",
    slot_type: "stat",
    content: { text: "68.3%", meta: { label: "Engagement rate" } },
    component_ids: ["card-stat"],
    voice_token_ids: [],
    sort_order: 1,
  },
  {
    name: "Growth stat",
    slot_type: "stat",
    content: { text: "23.1%", meta: { label: "Growth" } },
    component_ids: ["card-stat"],
    voice_token_ids: [],
    sort_order: 2,
  },
];

/* ---- Slot type labels ---- */
export const SLOT_TYPE_LABELS: Record<string, string> = {
  headline: "Headlines",
  cta: "CTAs",
  body: "Body text",
  stat: "Stats",
  feature_list: "Feature lists",
};
