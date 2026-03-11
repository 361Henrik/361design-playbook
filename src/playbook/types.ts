/* ------------------------------------------------------------------ */
/*  Playbook Content Model — typed data for docs + Markdown export     */
/* ------------------------------------------------------------------ */

export type PlaybookStatus = "complete" | "draft" | "incomplete";

export interface TextBlock {
  type: "text";
  heading?: string;
  body: string;
}

export interface PrincipleItem {
  title: string;
  description: string;
}

export interface PrincipleListBlock {
  type: "principle-list";
  heading?: string;
  description?: string;
  items: PrincipleItem[];
}

export interface DoDontBlock {
  type: "do-dont";
  heading?: string;
  dos: string[];
  donts: string[];
}

export interface SpecRow {
  label: string;
  value: string;
  notes?: string;
}

export interface SpecTableBlock {
  type: "spec-table";
  heading?: string;
  description?: string;
  columns?: string[];
  rows: SpecRow[];
}

export interface RuleListBlock {
  type: "rule-list";
  heading?: string;
  variant: "do" | "dont" | "neutral";
  items: string[];
}

export interface TokenRefBlock {
  type: "token-reference";
  heading?: string;
  tokens: { name: string; value: string; description?: string }[];
}

export interface ColorSwatchBlock {
  type: "color-swatch";
  heading?: string;
  colors: { name: string; value: string; description?: string }[];
}

export interface LayerStackBlock {
  type: "layer-stack";
  heading?: string;
  description?: string;
  layers: { number: number; title: string; description: string; items: string[] }[];
}

export interface CategoryListBlock {
  type: "category-list";
  heading?: string;
  categories: { name: string; description: string; defaultVisible?: boolean }[];
}

export interface ScenarioBlock {
  type: "scenario";
  heading?: string;
  scenarios: {
    title: string;
    type?: string;
    corridor?: string;
    description: string;
    features: string[];
  }[];
}

export type ContentBlock =
  | TextBlock
  | PrincipleListBlock
  | DoDontBlock
  | SpecTableBlock
  | RuleListBlock
  | TokenRefBlock
  | ColorSwatchBlock
  | LayerStackBlock
  | CategoryListBlock
  | ScenarioBlock;

export interface PlaybookPage {
  section: string;
  page: string;
  slug: string;
  description: string;
  content: ContentBlock[];
  status: PlaybookStatus;
  openQuestions: string[];
}
