/* ------------------------------------------------------------------ */
/*  Markdown Export Engine                                              */
/*  Serializes playbook data objects into structured Markdown files     */
/* ------------------------------------------------------------------ */

import type { PlaybookPage, ContentBlock } from "@/playbook/types";
import { playbookMeta } from "@/playbook/_meta";
import { allPlaybookPages, getPlaybookAudit } from "@/playbook";

/* ── Block serializers ── */

function serializeText(block: Extract<ContentBlock, { type: "text" }>): string {
  const lines: string[] = [];
  if (block.heading) lines.push(`## ${block.heading}\n`);
  lines.push(block.body);
  return lines.join("\n");
}

function serializePrincipleList(block: Extract<ContentBlock, { type: "principle-list" }>): string {
  const lines: string[] = [];
  if (block.heading) lines.push(`## ${block.heading}\n`);
  if (block.description) lines.push(`${block.description}\n`);
  for (const item of block.items) {
    lines.push(`### ${item.title}\n`);
    lines.push(item.description);
    lines.push("");
  }
  return lines.join("\n");
}

function serializeDoDont(block: Extract<ContentBlock, { type: "do-dont" }>): string {
  const lines: string[] = [];
  if (block.heading) lines.push(`## ${block.heading}\n`);
  else lines.push("## Do / Don't\n");

  lines.push("### ✓ Do\n");
  for (const d of block.dos) lines.push(`- ${d}`);
  lines.push("");
  lines.push("### ✗ Don't\n");
  for (const d of block.donts) lines.push(`- ${d}`);
  return lines.join("\n");
}

function serializeSpecTable(block: Extract<ContentBlock, { type: "spec-table" }>): string {
  const lines: string[] = [];
  if (block.heading) lines.push(`## ${block.heading}\n`);
  if (block.description) lines.push(`${block.description}\n`);

  const hasNotes = block.rows.some((r) => r.notes);
  if (hasNotes) {
    lines.push("| Item | Value | Notes |");
    lines.push("|------|-------|-------|");
    for (const row of block.rows) {
      lines.push(`| ${row.label} | ${row.value} | ${row.notes || "—"} |`);
    }
  } else {
    lines.push("| Item | Value |");
    lines.push("|------|-------|");
    for (const row of block.rows) {
      lines.push(`| ${row.label} | ${row.value} |`);
    }
  }
  return lines.join("\n");
}

function serializeRuleList(block: Extract<ContentBlock, { type: "rule-list" }>): string {
  const lines: string[] = [];
  if (block.heading) lines.push(`## ${block.heading}\n`);
  const prefix = block.variant === "dont" ? "✗" : block.variant === "do" ? "✓" : "→";
  for (const item of block.items) {
    lines.push(`- ${prefix} ${item}`);
  }
  return lines.join("\n");
}

function serializeTokenRef(block: Extract<ContentBlock, { type: "token-reference" }>): string {
  const lines: string[] = [];
  if (block.heading) lines.push(`## ${block.heading}\n`);
  lines.push("| Token | Value | Description |");
  lines.push("|-------|-------|-------------|");
  for (const t of block.tokens) {
    lines.push(`| ${t.name} | ${t.value} | ${t.description || "—"} |`);
  }
  return lines.join("\n");
}

function serializeColorSwatch(block: Extract<ContentBlock, { type: "color-swatch" }>): string {
  const lines: string[] = [];
  if (block.heading) lines.push(`## ${block.heading}\n`);
  lines.push("| Color | Value | Description |");
  lines.push("|-------|-------|-------------|");
  for (const c of block.colors) {
    lines.push(`| ${c.name} | ${c.value} | ${c.description || "—"} |`);
  }
  return lines.join("\n");
}

function serializeLayerStack(block: Extract<ContentBlock, { type: "layer-stack" }>): string {
  const lines: string[] = [];
  if (block.heading) lines.push(`## ${block.heading}\n`);
  if (block.description) lines.push(`${block.description}\n`);
  for (const layer of block.layers) {
    lines.push(`### Layer ${layer.number} — ${layer.title}\n`);
    lines.push(layer.description);
    lines.push("");
    for (const item of layer.items) {
      lines.push(`- ${item}`);
    }
    lines.push("");
  }
  return lines.join("\n");
}

function serializeCategoryList(block: Extract<ContentBlock, { type: "category-list" }>): string {
  const lines: string[] = [];
  if (block.heading) lines.push(`## ${block.heading}\n`);
  lines.push("| Category | Description | Default |");
  lines.push("|----------|-------------|---------|");
  for (const c of block.categories) {
    lines.push(`| ${c.name} | ${c.description} | ${c.defaultVisible ? "ON" : "OFF"} |`);
  }
  return lines.join("\n");
}

function serializeScenario(block: Extract<ContentBlock, { type: "scenario" }>): string {
  const lines: string[] = [];
  if (block.heading) lines.push(`## ${block.heading}\n`);
  for (const s of block.scenarios) {
    lines.push(`### ${s.title}${s.type ? ` (${s.type})` : ""}\n`);
    if (s.corridor) lines.push(`**Corridor:** ${s.corridor}\n`);
    lines.push(s.description);
    lines.push("");
    lines.push("**Key Characteristics:**\n");
    for (const f of s.features) {
      lines.push(`- ${f}`);
    }
    lines.push("");
  }
  return lines.join("\n");
}

/* ── Component spec serializer ── */

function serializeComponentSpec(block: Extract<ContentBlock, { type: "component-spec" }>): string {
  const lines: string[] = [];
  if (block.heading) lines.push(`## ${block.heading}\n`);
  for (const comp of block.components) {
    lines.push(`### ${comp.name}\n`);
    lines.push(comp.description);
    lines.push("");
    if (comp.anatomy) {
      lines.push(`**Anatomy:** ${comp.anatomy}\n`);
    }
    if (comp.accessibilityNotes) {
      lines.push(`**Accessibility:** ${comp.accessibilityNotes}\n`);
    }
    if (comp.responsiveNotes) {
      lines.push(`**Responsive:** ${comp.responsiveNotes}\n`);
    }
    if (comp.dos.length > 0) {
      lines.push("**✓ Do:**\n");
      for (const d of comp.dos) lines.push(`- ${d}`);
      lines.push("");
    }
    if (comp.donts.length > 0) {
      lines.push("**✗ Don't:**\n");
      for (const d of comp.donts) lines.push(`- ${d}`);
      lines.push("");
    }
    if (comp.code) {
      lines.push("**Code:**\n");
      lines.push("```tsx");
      lines.push(comp.code);
      lines.push("```");
      lines.push("");
    }
  }
  return lines.join("\n");
}

/* ── Channel kit serializer ── */

function serializeChannelKit(block: Extract<ContentBlock, { type: "channel-kit" }>): string {
  const lines: string[] = [];
  if (block.heading) lines.push(`## ${block.heading}\n`);
  for (const kit of block.kits) {
    lines.push(`### ${kit.name}\n`);
    lines.push(`> ${kit.description}\n`);
    lines.push("| Constraint | Value |");
    lines.push("|-----------|-------|");
    lines.push(`| Tone | ${kit.toneModifiers.join(", ")} |`);
    lines.push(`| Max heading | ${kit.maxHeadingLength} chars |`);
    lines.push(`| Max body | ${kit.maxBodyLength ? `${kit.maxBodyLength} chars` : "No limit"} |`);
    lines.push(`| CTA rules | ${kit.ctaRules} |`);
    lines.push(`| Headline size | ${kit.typographyOverrides.maxHeadlineSize} |`);
    lines.push(`| Body size | ${kit.typographyOverrides.bodySize} |`);
    lines.push(`| Spacing | ${kit.spacingProfile} |`);
    lines.push(`| Color emphasis | ${kit.colorEmphasis} |`);
    lines.push("");
    lines.push(`**Allowed components:** ${kit.allowedComponents.join(", ")}\n`);
    for (const t of kit.templates) {
      lines.push(`#### Template: ${t.name}\n`);
      lines.push(t.description);
      lines.push("");
      lines.push(`**Layout:** ${t.layoutSpec}\n`);
      lines.push(`**Copy:** ${t.copySpec}\n`);
      if (t.code) {
        lines.push("```tsx");
        lines.push(t.code);
        lines.push("```");
        lines.push("");
      }
    }
  }
  return lines.join("\n");
}

/* ── Block dispatcher ── */

function serializeBlock(block: ContentBlock): string {
  switch (block.type) {
    case "text": return serializeText(block);
    case "principle-list": return serializePrincipleList(block);
    case "do-dont": return serializeDoDont(block);
    case "spec-table": return serializeSpecTable(block);
    case "rule-list": return serializeRuleList(block);
    case "token-reference": return serializeTokenRef(block);
    case "color-swatch": return serializeColorSwatch(block);
    case "layer-stack": return serializeLayerStack(block);
    case "category-list": return serializeCategoryList(block);
    case "scenario": return serializeScenario(block);
    case "component-spec": return serializeComponentSpec(block);
    case "channel-kit": return serializeChannelKit(block);
    case "spacing-visual": return serializeSpacingVisual(block);
    case "icon-grid": return serializeIconGrid(block);
    default: return "";
  }
}

/* ── Page serializer ── */

export function serializePage(page: PlaybookPage): string {
  const lines: string[] = [];

  lines.push(`# ${page.page}`);
  lines.push("");
  lines.push(`> ${page.description}`);
  lines.push("");

  for (const block of page.content) {
    lines.push(serializeBlock(block));
    lines.push("");
  }

  if (page.openQuestions.length > 0) {
    lines.push("## Open Questions\n");
    for (const q of page.openQuestions) {
      lines.push(`- ⚠️ ${q}`);
    }
    lines.push("");
  }

  lines.push(`---\n*Status: ${page.status} · Section: ${page.section}*`);

  return lines.join("\n");
}

/* ── README generator ── */

export function generatePlaybookReadme(): string {
  const audit = getPlaybookAudit();
  const sections = new Map<string, PlaybookPage[]>();
  for (const page of allPlaybookPages) {
    if (!sections.has(page.section)) sections.set(page.section, []);
    sections.get(page.section)!.push(page);
  }

  const lines: string[] = [];
  lines.push(`# ${playbookMeta.brand} — Design Playbook`);
  lines.push("");
  lines.push(`> ${playbookMeta.description}`);
  lines.push("");
  lines.push(`**Version:** ${playbookMeta.version}  `);
  lines.push(`**Last updated:** ${playbookMeta.lastUpdated}  `);
  lines.push(`**Pages:** ${audit.total} (${audit.complete} complete, ${audit.draft} draft, ${audit.incomplete} incomplete)`);
  lines.push("");
  lines.push("## Contents\n");

  let folderIdx = 1;
  for (const [section, pages] of sections) {
    const folderName = `${String(folderIdx).padStart(2, "0")}-${section.toLowerCase().replace(/\s+/g, "-")}`;
    lines.push(`### ${folderName}/\n`);
    for (const page of pages) {
      const filename = page.slug.split("/").pop()!.replace(/\s+/g, "-") + ".md";
      const status = page.status === "complete" ? "✅" : page.status === "draft" ? "📝" : "⚠️";
      lines.push(`- ${status} [${page.page}](${folderName}/${filename})`);
    }
    lines.push("");
    folderIdx++;
  }

  if (audit.openQuestions.length > 0) {
    lines.push("## Open Questions\n");
    for (const q of audit.openQuestions) {
      lines.push(`- **${q.section} → ${q.page}:** ${q.question}`);
    }
    lines.push("");
  }

  lines.push("## How to Use This Playbook\n");
  lines.push("1. Upload the entire folder to your IDE as a reference context.");
  lines.push("2. The IDE should consult these files for fonts, colors, spacing, components, layout rules, interaction guidance, and patterns.");
  lines.push("3. When the playbook is silent on a topic, the IDE should ask — not invent.");
  lines.push("4. Open Questions (marked ⚠️) indicate areas that need human decisions before implementation.");

  return lines.join("\n");
}

/* ── Open Questions aggregator ── */

export function generateOpenQuestionsFile(): string {
  const audit = getPlaybookAudit();
  const lines: string[] = [];
  lines.push("# Open Questions\n");
  lines.push("> Known gaps and ambiguities in the design system that need human decisions.\n");

  if (audit.openQuestions.length === 0) {
    lines.push("No open questions at this time. All sections are complete.");
  } else {
    for (const q of audit.openQuestions) {
      lines.push(`## ${q.section} → ${q.page}\n`);
      lines.push(`- ${q.question}`);
      lines.push("");
    }
  }

  return lines.join("\n");
}

/* ── File map for ZIP ── */

export interface ExportFile {
  path: string;
  content: string;
}

const sectionFolderMap: Record<string, string> = {
  Principles: "01-principles",
  Tokens: "02-tokens",
  Components: "03-components",
  Patterns: "04-patterns",
  "Channel Kits": "04b-channel-kits",
  Maps: "05-maps",
  Guardrails: "06-guardrails",
  Guidelines: "07-guidelines",
};

function slugToFilename(slug: string): string {
  const last = slug.split("/").pop() || slug;
  return last.replace(/\s+/g, "-") + ".md";
}

export function generateAllExportFiles(selectedSlugs?: string[]): ExportFile[] {
  const pages = selectedSlugs
    ? allPlaybookPages.filter((p) => selectedSlugs.includes(p.slug))
    : allPlaybookPages;

  const files: ExportFile[] = [];

  // README
  files.push({ path: "README.md", content: generatePlaybookReadme() });

  // Open Questions
  files.push({ path: "08-handoff/open-questions.md", content: generateOpenQuestionsFile() });

  // Pages
  for (const page of pages) {
    const folder = sectionFolderMap[page.section] || "99-other";
    const filename = slugToFilename(page.slug);
    files.push({ path: `${folder}/${filename}`, content: serializePage(page) });
  }

  return files;
}
