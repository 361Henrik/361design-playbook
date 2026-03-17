

## Findings: AI Context File & Design Skill

### What exists today

1. **`curated-lens-system.md`** (314 lines, root of project) — A **static, hand-written** single-file design system reference. It covers colors, typography, spacing, layout, components, patterns, and channel rules. However:
   - It is **not generated from the playbook data**. It's a separate static file that can drift out of sync.
   - It references outdated color values (e.g., "Deep Forest Green" for `--primary`, "Antique Bronze" for `--accent`) that don't match the current playbook tokens ("Deep Marine Blue", "Champagne Bronze").
   - It has no AI-specific instructions (no "you are a design assistant" preamble, no constraint framing).

2. **Playbook ZIP export** (`markdownExport.ts`) — Generates ~31 individual `.md` files in a folder structure. Great for browsing, but too many files for a single AI context window.

3. **No `CLAUDE.md` or `Gemini.md`** exists anywhere in the project.

### What's missing

| Gap | Impact |
|-----|--------|
| No auto-generated single-file AI context | `curated-lens-system.md` drifts from playbook data |
| No AI preamble/instructions | Claude/Gemini don't know they're constrained to the design system |
| No export option on the Export page | Users can't download it from the UI |
| Stale color values in the static file | AI gets wrong tokens |

### Recommendation

**Add a "Generate AI Context File" feature to the Export page** that:

1. Serializes the entire playbook into a **single consolidated Markdown file** (generated from the same `allPlaybookPages` data, not static).
2. Prepends an **AI instruction preamble** that tells the AI:
   - "You are a design-constrained coding assistant for The Curated Lens."
   - "Only use the tokens, components, and patterns documented below."
   - "When the playbook is silent, ask — do not invent."
   - "Never use arbitrary Tailwind values outside the defined token scale."
3. Offers the download as `CLAUDE.md` (for Claude Projects / `.claude/` convention) or as a generic `design-system.md`.

This replaces the static `curated-lens-system.md` with a dynamically generated version that always matches the playbook.

### Should there be a "Claude design skill" inside the app?

**No — leave that to the IDE.** Here's why:

- The app already has a **Design Copilot** (the in-app AI assistant) that answers questions about the design system. That's the in-app skill.
- A "Claude design skill" means giving Claude (in Cursor, Windsurf, or Claude Projects) the design system context so it **writes code** that follows the playbook. That's an IDE concern, not an app concern.
- The right approach is: **this app exports the file, the IDE consumes it.** The app is the authoring tool; the IDE is the execution environment.
- The Export page already says "Upload this into your IDE as the design system source of truth" — we just need to make that file AI-optimized.

### Implementation plan

**`src/data/markdownExport.ts`** — Add a new function `generateAIContextFile()` that:
- Writes an AI instruction preamble (10-15 lines of constraints)
- Iterates through `allPlaybookPages` and serializes each using the existing `serializePage()` function
- Concatenates everything into one string with section dividers
- Returns the full string

**`src/pages/Export.tsx`** — Add a third card in the Playbook tab:
- "AI Context File" card with a download button
- Downloads as `CLAUDE.md` (single file, no ZIP needed)
- Brief description: "Single-file design system context for AI coding assistants (Claude, Cursor, Gemini)."

**Delete `curated-lens-system.md`** — Replace it with the generated version so it can't drift.

### Files to edit

| File | Change |
|------|--------|
| `src/data/markdownExport.ts` | Add `generateAIContextFile()` function |
| `src/pages/Export.tsx` | Add AI Context File download card |
| `curated-lens-system.md` | Delete (replaced by generated output) |

