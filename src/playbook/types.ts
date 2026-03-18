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

export interface ComponentSpecBlock {
  type: "component-spec";
  heading?: string;
  components: {
    name: string;
    description: string;
    anatomy?: string;
    accessibilityNotes?: string;
    responsiveNotes?: string;
    dos: string[];
    donts: string[];
    code: string;
  }[];
}

export interface SpacingVisualBlock {
  type: "spacing-visual";
  heading?: string;
  steps: { token: string; px: number; description?: string }[];
}

export interface IconGridBlock {
  type: "icon-grid";
  heading?: string;
  groups: { category: string; icons: { name: string; lucideId: string }[] }[];
}

export interface AppliedExampleBlock {
  type: "applied-example";
  heading?: string;
  description?: string;
  variant: "spacing-card" | "layout-page" | "interaction-states" | "signifiers" | "motion-sequence" | "color-usage" | "icon-usage";
}

export interface ChannelKitBlock {
  type: "channel-kit";
  heading?: string;
  kits: {
    name: string;
    description: string;
    toneModifiers: string[];
    maxHeadingLength: number;
    maxBodyLength: number | null;
    ctaRules: string;
    allowedComponents: string[];
    typographyOverrides: { maxHeadlineSize: string; bodySize: string };
    spacingProfile: string;
    colorEmphasis: string;
    templates: {
      name: string;
      description: string;
      layoutSpec: string;
      copySpec: string;
      code: string;
    }[];
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
  | ScenarioBlock
  | ComponentSpecBlock
  | ChannelKitBlock
  | SpacingVisualBlock
  | IconGridBlock;

export interface PlaybookPage {
  section: string;
  page: string;
  slug: string;
  description: string;
  content: ContentBlock[];
  status: PlaybookStatus;
  openQuestions: string[];
}
