

# Applied Layer: Channel Kits + Variants + Studio

Evolves the existing `/channel-kits` page into a three-part "Applied" layer that shows the design system in use -- moving from static previews to an interactive playground where users compose real layouts, swap content variants, and validate against guardrails before exporting.

---

## 1. Information Architecture Changes

### Current sidebar structure (System group)
```text
Components | Guidelines | Guardrails | Export | Channel Kits | Sources | ...
```

### New sidebar structure
```text
Components | Guidelines | Guardrails | Export | Studio | Sources | ...
```

"Channel Kits" is renamed to **Studio** (icon: `PanelTop`). The page gets three tabs:

| Tab | What it does |
|-----|-------------|
| **Kits** | Browse and inspect kit presets (replaces current channel tabs) |
| **Variants** | Browse reusable content examples tagged by token category and component |
| **Studio** | The playground: pick kit, pick template, swap variants, fill content, run guardrails, export |

The `/channel-kits` route is kept as a redirect to `/studio` for backward compatibility.

---

## 2. Data Model

Six new database tables. All use `workspace_id` for multi-tenancy and standard RLS.

### 2a. `kits`
A Kit is a preset that bundles constraints for a channel/context.

```text
kits
  id                UUID PK DEFAULT gen_random_uuid()
  workspace_id      UUID NOT NULL
  name              TEXT NOT NULL              -- "Web App", "Travel Landing Page"
  slug              TEXT NOT NULL              -- URL-safe identifier
  description       TEXT
  channel           TEXT NOT NULL              -- 'web_app' | 'landing_page' | 'social' | 'email' | 'custom'
  token_overrides   JSONB DEFAULT '{}'         -- optional: e.g. {"colors": {"accent": "#..."}}
  layout_constraints JSONB DEFAULT '{}'        -- maxHeadingLength, maxBodyLength, spacingProfile, etc.
  component_subset  TEXT[] DEFAULT '{}'        -- component IDs from registry that are allowed
  guardrail_profile TEXT[] DEFAULT '{}'        -- guardrail rule IDs that are enforced (subset or all)
  tone_modifiers    TEXT[] DEFAULT '{}'        -- voice adjustments: ["Functional", "Precise"]
  sort_order        INTEGER DEFAULT 0
  is_default        BOOLEAN DEFAULT false      -- seed kits are default, user kits are not
  created_by        UUID
  created_at        TIMESTAMPTZ DEFAULT now()
  updated_at        TIMESTAMPTZ DEFAULT now()
```

### 2b. `kit_rules`
Junction table linking kits to specific guardrail rule overrides (severity changes per kit).

```text
kit_rules
  id              UUID PK DEFAULT gen_random_uuid()
  kit_id          UUID NOT NULL FK -> kits.id ON DELETE CASCADE
  rule_id         TEXT NOT NULL              -- matches guardrailRules[].id
  severity_override TEXT                     -- 'error' | 'warning' | 'disabled'
  notes           TEXT                       -- why this rule is different for this kit
  created_at      TIMESTAMPTZ DEFAULT now()
  UNIQUE(kit_id, rule_id)
```

### 2c. `templates`
A template is a layout blueprint tied to a kit.

```text
templates
  id              UUID PK DEFAULT gen_random_uuid()
  kit_id          UUID NOT NULL FK -> kits.id ON DELETE CASCADE
  workspace_id    UUID NOT NULL
  name            TEXT NOT NULL              -- "Dashboard", "Hero Section"
  description     TEXT
  component_jsx   TEXT NOT NULL              -- the React/Tailwind code (string)
  layout_spec     TEXT                       -- markdown layout documentation
  copy_spec       TEXT                       -- markdown copy documentation
  slot_schema     JSONB DEFAULT '[]'         -- [{slot_id, label, type, max_length, default_value}]
  sort_order      INTEGER DEFAULT 0
  is_default      BOOLEAN DEFAULT false
  created_by      UUID
  created_at      TIMESTAMPTZ DEFAULT now()
  updated_at      TIMESTAMPTZ DEFAULT now()
```

`slot_schema` defines replaceable content zones in the template (headline, body, CTA label, stat values). This is what the Studio uses for variant swapping and content filling.

### 2d. `variants`
A variant is a reusable content example -- a specific headline, a CTA label, a stat block -- tagged by category and linked to components.

```text
variants
  id              UUID PK DEFAULT gen_random_uuid()
  workspace_id    UUID NOT NULL
  name            TEXT NOT NULL              -- "Calm authority headline"
  slot_type       TEXT NOT NULL              -- 'headline' | 'body' | 'cta' | 'stat' | 'feature_list'
  content         JSONB NOT NULL             -- {text: "Design with purpose", meta: {char_count: 19}}
  component_ids   TEXT[] DEFAULT '{}'        -- which components this pairs well with
  voice_token_ids UUID[] DEFAULT '{}'        -- which voice_tokens this exemplifies
  sort_order      INTEGER DEFAULT 0
  created_by      UUID
  created_at      TIMESTAMPTZ DEFAULT now()
  updated_at      TIMESTAMPTZ DEFAULT now()
```

### 2e. `variant_tags`
Flexible tagging for variants (maps to the existing `tag_vocabulary`).

```text
variant_tags
  id              UUID PK DEFAULT gen_random_uuid()
  variant_id      UUID NOT NULL FK -> variants.id ON DELETE CASCADE
  tag_name        TEXT NOT NULL              -- from tag_vocabulary
  created_at      TIMESTAMPTZ DEFAULT now()
  UNIQUE(variant_id, tag_name)
```

### 2f. `variant_assets`
Optional media attached to variants (e.g. a hero image for an image slot).

```text
variant_assets
  id              UUID PK DEFAULT gen_random_uuid()
  variant_id      UUID NOT NULL FK -> variants.id ON DELETE CASCADE
  file_url        TEXT NOT NULL
  file_type       TEXT NOT NULL              -- 'image/png', 'image/svg+xml', etc.
  alt_text        TEXT
  created_at      TIMESTAMPTZ DEFAULT now()
```

### RLS (all tables)
- SELECT: `is_workspace_member(auth.uid(), workspace_id)` (or via join for junction tables)
- INSERT/UPDATE: editors and admins
- DELETE: admins only
- Service role: full INSERT/UPDATE for seed data

---

## 3. Relationship to Existing Data

```text
kits ──1:N──> templates          (a kit has multiple layout templates)
kits ──1:N──> kit_rules          (a kit overrides specific guardrail severities)
variants ──1:N──> variant_tags   (flexible tagging via tag_vocabulary)
variants ──1:N──> variant_assets (optional attached media)
templates.slot_schema ──soft──> variants.slot_type  (Studio matches slots to variants)
variants.component_ids ──soft──> componentRegistry   (soft reference, not FK)
variants.voice_token_ids ──FK──> voice_tokens.id     (which voice tokens apply)
```

---

## 4. MVP Scope

### Include
1. **Database migration**: Create all 6 tables + RLS + seed 4 default kits (web app, landing page, social, email) with their templates (migrated from current `channelKits.tsx` hardcoded data)
2. **Studio page** (`/studio`) with 3 tabs:
   - **Kits tab**: Card grid showing all kits with constraint summaries, click to inspect details
   - **Variants tab**: Filterable list of variants grouped by `slot_type`, with tag chips
   - **Studio tab**: The playground (pick kit -> pick template -> preview with content slots -> run guardrails -> export)
3. **Seed data**: Migrate the 6 existing templates into the `templates` table; create ~12 starter variants (3 headlines, 3 CTAs, 3 body texts, 3 stat blocks)
4. **Guardrail runner in Studio**: Client-side check of the current template + content against the kit's guardrail profile, showing pass/fail badges
5. **Export from Studio**: Layout spec + code + copy spec (reuse existing `downloadFile` utility)
6. **Backward compatibility**: `/channel-kits` redirects to `/studio`

### Defer
- Variant CRUD UI (start with seed data, add forms later)
- Kit CRUD UI (start with seed kits, add creation later)
- `variant_assets` upload flow (start text-only)
- Token override preview (applying `token_overrides` to CSS variables in the preview frame)
- Real-time slot editing in the preview (start with form fields, not inline editing)
- AI-assisted content suggestions for slots

---

## 5. Studio Playground UI

```text
+--------------------------------------------------+
| Kit: [Web App v]  Template: [Dashboard v]        |
+--------------------------------------------------+
| Constraint bar: badges from kit.layout_constraints|
+--------------------------------------------------+
| +------------------+  +------------------------+ |
| | Content Slots    |  | Preview Frame          | |
| |                  |  |                        | |
| | Headline: [___]  |  |  (live rendered        | |
| | Body: [______]   |  |   template with        | |
| | CTA: [___]       |  |   slot values)         | |
| | Stat 1: [___]    |  |                        | |
| |                  |  |                        | |
| | [Swap Variant v] |  |                        | |
| +------------------+  +------------------------+ |
+--------------------------------------------------+
| Guardrail Results: 29/29 passed  [Export v]      |
+--------------------------------------------------+
```

- Left panel: Form fields for each slot defined in `template.slot_schema`. Each slot has a dropdown to pick a matching variant (filtered by `slot_type`).
- Right panel: Live preview rendered using the existing template components, with slot values injected.
- Bottom bar: Guardrail check results (client-side, using `guardrailRules` filtered by `kit.guardrail_profile`) + export dropdown.
- Viewport toggle (desktop/tablet/mobile) carries over from the current channel kits page.

---

## 6. Technical Details

### Files to Create

| File | Purpose |
|------|---------|
| Migration SQL | Create 6 tables + RLS + seed kits/templates/variants |
| `src/pages/Studio.tsx` | Main page with Kits/Variants/Studio tabs |
| `src/components/studio/KitsTab.tsx` | Kit browser with card grid |
| `src/components/studio/VariantsTab.tsx` | Variant browser with filters |
| `src/components/studio/StudioPlayground.tsx` | The interactive playground |
| `src/components/studio/SlotEditor.tsx` | Content slot form with variant picker |
| `src/components/studio/GuardrailRunner.tsx` | Client-side guardrail check display |

### Files to Modify

| File | Change |
|------|--------|
| `src/App.tsx` | Add `/studio` route, redirect `/channel-kits` to `/studio` |
| `src/components/AppSidebar.tsx` | Rename "Channel Kits" to "Studio", update URL and icon |
| `src/components/CommandSearch.tsx` | Update search entry |

### Migration from hardcoded data
The existing `src/data/channelKits.tsx` remains as a fallback/reference but the Studio page reads from the database. The seed migration inserts the same 4 kits and 6 templates. The `component` render function stays in code (templates reference a `component_jsx` string for export, but the live preview uses a lookup map keyed by template ID that maps to the existing React components).

### Template rendering strategy
Since database-stored JSX can't be executed directly, the MVP uses a **registry approach**: a TypeScript map (`TEMPLATE_RENDERERS`) maps template IDs to React component functions. The `component_jsx` field in the database is used only for code export. When a user creates custom templates (deferred), they would use the slot-based system with pre-built layout shells rather than arbitrary JSX.

### Slot system
Each template's `slot_schema` defines named content zones:
```text
[
  { slot_id: "headline", label: "Headline", type: "text", max_length: 40, default_value: "Overview" },
  { slot_id: "cta_primary", label: "Primary CTA", type: "text", max_length: 15, default_value: "Create report" },
  { slot_id: "stat_1_value", label: "Stat 1 Value", type: "text", max_length: 10, default_value: "2,847" }
]
```

The Studio playground renders the template component and passes slot values as props. Template components accept a `slots` prop object.

