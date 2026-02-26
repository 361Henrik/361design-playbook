

# Curated Lens – Design System Hub

## Product Vision
An internal web app that serves as the single source of truth for the Curated Lens design system. Upload sources, extract structured design rules, browse tokens and components, enforce brand guardrails, and export production-ready code — all in an interface that itself embodies the design system's calm, architectural, editorial aesthetic.

---

## Phase 1: MVP (Core Foundation)

### 1. Design System Applied to the App Itself
The hub's own UI will use the Curated Lens design tokens — Warm White background, Deep Forest Green anchors, Playfair Display headlines, Inter body, restrained bronze accents. The app is a living example of the system.

### 2. Design Tokens Center
A dedicated tokens area organized into categories:
- **Colors** — Deep Forest Green, Warm White, Warm Off-White, Near Black, Antique Bronze with exact hex values, usage ratios (60/30/8), and Do/Don't guidance ("Bronze is jewelry, never paint")
- **Typography** — Playfair Display headlines (weight 500, line-height 1.05/1.1, letter-spacing -0.01em) and Inter body (weight 400, nav/CTA 500, line-height 1.6–1.75)
- **Spacing** — Top padding 120–160px, headline gap 32–40px, paragraph gap 56–72px
- **Layout** — Max content width 52ch, controlled columns, panel pairings (Primary/Anchor context)
- **Motion** — UI transitions 300–400ms, hero loops 8–20s, prohibited patterns listed
- **Icons** — Thin stroke 1.5–2px, geometric, no fills, no gradients

Each token shows: name, value, usage guidance, Do/Don't warnings, and a live preview swatch.

### 3. Component Catalog
A browsable registry with categories:
- **Foundations** — Color swatches, typography scale, spacing scale, icon set
- **Navigation** — Header, sidebar, breadcrumbs
- **Buttons & CTAs** — Primary, secondary, text-link (no bouncing/scaling hover effects)
- **Cards & Panels** — Primary Context (white) and Anchor Context (green) panel variants
- **Layout Sections** — Hero sections, content blocks, split layouts
- **Forms** — Inputs, selects, textareas (following typography rules)
- **Data Display** — Tables, lists, stat blocks

Each component page shows: purpose, anatomy diagram, props/variants, Do/Don't examples, accessibility notes, responsive behavior, and a live interactive preview.

### 4. Guardrails & Enforcement Engine
A validation system that checks designs and code against the PDF rules:
- **Color guardrails** — Warn if bronze exceeds accent usage, flag gradients, flag unapproved near-whites
- **Typography guardrails** — Warn on weight 300, flag non-Playfair headlines, flag non-Inter body
- **Layout guardrails** — Warn on paragraphs wider than 52ch, flag full-width text blocks
- **Motion guardrails** — Flag parallax, bouncing buttons, scaling animations
- **Imagery guardrails** — Flag corporate stock imagery patterns
- **Consistency guardrails** — Flag mixed typographic hierarchies, multiple hero images per section

Guardrails appear as inline warnings throughout the app (token pages, component previews, export) and as a dedicated "System Health" dashboard.

### 5. Code Export
- Export tokens as: CSS custom properties, Tailwind config, JSON, TypeScript constants
- Export individual components as copy-paste React + Tailwind code
- Download a starter kit zip with: tokens, core components, example pages, and setup docs

### 6. Authentication & Roles
- Email-based auth via Supabase (small team, 1-5 people)
- Three roles: Admin (full edit), Editor (create/update entries), Viewer (read-only)
- Simple role management in settings

---

## Phase 2: V1 (Library & Ingestion)

### 7. Source Upload & Ingestion Pipeline
- Upload PDFs, images, markdown files, and URLs as "Sources"
- AI-powered extraction (via Lovable AI): parse uploaded documents and extract tokens, guidelines, components, and patterns into structured library entries
- Each extracted entry includes: title, type (token/guideline/component/pattern/example), tags, summary, extracted rules, and related items
- Manual review & approval step before entries go live

### 8. AI-Powered Semantic Search
- Embedding-based search across all library entries using Lovable AI
- Natural language queries: "What color should I use for accents?" → returns bronze rules
- Filter by type, tags, and categories
- Search results ranked by relevance with highlighted snippets

### 9. Versioning & History
- All tokens, components, and guidelines are versioned
- View change history with diffs (before/after)
- Revert to previous versions
- Changelog view showing recent updates across the system

---

## Phase 3: V2 (Governance & Advanced)

### 10. Approval Workflow
- Propose changes to tokens/components/guidelines
- Review queue for admins
- Approve/reject with comments
- Merge approved changes into the live system

### 11. Advanced Export & Integration
- Generate a full Next.js App Router starter project (downloadable zip)
- Figma token sync documentation
- API endpoint for programmatic token access

### 12. Usage Analytics
- Track which tokens and components are most viewed/exported
- Identify unused or rarely-referenced guidelines
- Dashboard for system adoption metrics

---

## Sitemap & Navigation

```
/ .......................... Dashboard (system overview, recent changes, health score)
/tokens .................... Tokens hub
  /tokens/colors ........... Color tokens + Do/Don't
  /tokens/typography ....... Type scale + rules
  /tokens/spacing .......... Spacing scale
  /tokens/layout ........... Layout rules + widths
  /tokens/motion ........... Motion tokens + prohibited list
  /tokens/icons ............ Icon system rules
/components ................ Component catalog
  /components/:category .... Category listing
  /components/:category/:id  Component detail page
/guidelines ................ Brand guidelines (essence, avoidance list, imagery philosophy)
/guardrails ................ System health dashboard + all active warnings
/library ................... Library entries (V1: searchable, filterable)
/sources ................... Uploaded sources (V1)
/export .................... Code export & starter kit download
/settings .................. User management, roles
```

Persistent left sidebar navigation with categories. Top bar shows search and user menu.

---

## Core Data Model

- **Sources** — id, title, file_url, type (pdf/image/markdown/url), uploaded_by, created_at
- **Library Entries** — id, title, type (token/guideline/component/pattern/example), tags[], summary, content (rich text), rules[], related_entry_ids[], source_id, version, created_by, created_at, updated_at
- **Tokens** — id, category (color/typography/spacing/motion/layout/icon), name, value, css_variable, tailwind_key, usage_guidance, do_examples[], dont_examples[], version
- **Components** — id, name, category, description, anatomy, props_schema, do_examples[], dont_examples[], accessibility_notes, responsive_notes, preview_code, export_code, version
- **Guardrail Rules** — id, name, category, rule_type (error/warning), description, check_logic, applies_to (token/component/layout)
- **Users** — managed by Supabase Auth
- **User Roles** — id, user_id, role (admin/editor/viewer)
- **Versions** — id, entity_type, entity_id, version_number, diff, changed_by, changed_at

---

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS + TypeScript (Lovable stack)
- **UI Components**: shadcn/ui as baseline, restyled to match Curated Lens system
- **Backend**: Lovable Cloud (Supabase) — database, auth, file storage, edge functions
- **AI**: Lovable AI (Gemini) for document extraction and semantic search
- **Fonts**: Google Fonts — Playfair Display + Inter
- **Icons**: Lucide (thin stroke, geometric — aligns with the icon system requirements)
- **Code Export**: Client-side zip generation for starter kit downloads

---

## Key User Flows

1. **Browse tokens** → Navigate to /tokens/colors → See swatches, values, ratios, Do/Don't → Copy CSS variable or Tailwind class
2. **Browse components** → Navigate to /components → Pick category → View component detail with live preview → Copy React code
3. **Check guardrails** → Visit /guardrails → See all active rules and any violations → Fix flagged issues
4. **Export code** → Go to /export → Choose format (CSS/Tailwind/JSON/TS) → Download tokens or full starter kit
5. **Upload source (V1)** → Go to /sources → Upload PDF → AI extracts entries → Review & approve → Entries appear in library
6. **Search (V1)** → Use global search → Type natural language query → See ranked results across tokens, components, guidelines

---

## MVP Component List

- AppShell (sidebar + top bar + content area)
- Sidebar navigation with categories
- Token card (swatch/preview + name + value + copy button)
- Token detail page (full guidance, Do/Don't panels)
- Do/Don't comparison panel (green check vs red X side-by-side)
- Component card (thumbnail + name + category)
- Component detail page (preview + anatomy + props + code)
- Live component preview renderer
- Code block with syntax highlighting and copy
- Color swatch (with hex, HSL, contrast info)
- Typography specimen (showing all scale levels)
- Spacing visualizer (visual blocks showing spacing tokens)
- Panel pairing demo (Primary Context / Anchor Context)
- Guardrail warning badge (inline warning with rule reference)
- System health dashboard (summary of all guardrail checks)
- Export format selector + download button
- Search bar with filters
- Auth pages (login, simple user settings)
- Role badge and permission gates

---

## Guardrail Enforcement Strategy

Guardrails are implemented as a rules engine with two layers:

1. **Static rules** (coded validations): Check token values, color ratios, typography weights, layout widths against the PDF's exact constraints. These run when viewing token/component pages and during export.

2. **UI warnings** (visual indicators): Inline warning badges appear next to any token or component that violates a rule. The /guardrails dashboard aggregates all violations. Warnings are categorized as Error (hard violation) or Caution (soft guidance).

Example rules:
- `color.bronze.usage > 8%` → Error: "Bronze must stay under 8% visible area"
- `typography.headline.weight === 300` → Error: "Never use weight 300"
- `layout.paragraph.maxWidth > 52ch` → Warning: "Max paragraph width is 48–52 characters"
- `motion.transition.type === 'bounce'` → Error: "Bouncing transitions are prohibited"
- `color.gradient.exists` → Error: "Gradients are not permitted"

---

## Build Sequence

**Milestone 1 — Foundation (Week 1)**
- Set up Lovable Cloud (Supabase) with auth and database schema
- Implement the Curated Lens design tokens as CSS variables and Tailwind config
- Build the app shell (sidebar, navigation, routing) using the design system itself
- Load Playfair Display + Inter fonts

**Milestone 2 — Tokens Center (Week 2)**
- Build all token category pages (colors, typography, spacing, layout, motion, icons)
- Create token cards with live previews, values, and copy-to-clipboard
- Add Do/Don't comparison panels with the PDF's exact guidance
- Pre-populate all tokens from the PDF

**Milestone 3 — Component Catalog (Week 3)**
- Build the component registry with categories and detail pages
- Create live preview renderer for each component
- Add code export per component (copy-paste React + Tailwind)
- Implement the Panel Pairing demo (Primary/Anchor context)

**Milestone 4 — Guardrails & Export (Week 4)**
- Implement the guardrail rules engine with all PDF constraints
- Build the system health dashboard
- Add inline warning badges throughout token and component pages
- Build the export page: token formats (CSS, Tailwind, JSON, TS) + starter kit zip

**Milestone 5 — Ingestion & Search (V1)**
- Build source upload (PDF, images, markdown) with Supabase Storage
- Create AI extraction edge function using Lovable AI
- Build the library entries system with tagging and relationships
- Implement semantic search with embeddings

**Milestone 6 — Versioning & Governance (V1-V2)**
- Add version tracking to tokens, components, and guidelines
- Build history/diff views
- Implement approval workflows (V2)

---

## Risks & Decisions Needed

1. **AI extraction accuracy**: The AI will extract rules from uploaded PDFs, but results will need human review. Are you comfortable with a mandatory review step before entries go live?

2. **Starter kit format**: You mentioned Next.js App Router preference, but Lovable builds React/Vite. The export will generate downloadable Next.js code (as files), but the hub itself runs on React/Vite. Is that acceptable?

3. **Embedding storage**: Semantic search requires storing vector embeddings. We'll use Supabase's pgvector extension. This is well-supported but adds database complexity.

4. **Component previews**: Live previews require rendering actual React components in an isolated context. We'll use iframe sandboxing for safety. Complex components (e.g., forms with state) may need simplified preview versions.

5. **Font licensing**: Playfair Display and Inter are both Google Fonts (free). No licensing issues, but confirming you're okay with Google Fonts CDN delivery.

