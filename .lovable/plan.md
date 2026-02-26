

# Tone of Voice System for Curated Lens

A structured voice and copy system that mirrors how the existing design system handles visual tokens (colors, typography, spacing) -- treating language as a designable, auditable layer with the same rigor.

---

## Information Architecture

Three interconnected layers, mirroring the visual system hierarchy:

```text
voice_tokens          (= design tokens: the atomic primitives)
  |
copy_patterns         (= components: composable templates tied to UI)
  |
channel_kits          (= layout sections: assembled context for delivery)
```

### Where it lives in the UI

- **New sidebar group item**: "Voice" under the Tokens group (between Icons and Components), navigating to `/tokens/voice`
- **Sub-pages** accessible via tabs on the Voice page:
  - **Pillars** -- the voice token primitives
  - **Copy Patterns** -- per-component copy guidance
  - **Channel Kits** -- assembled guidance per delivery surface
- This mirrors how Colors/Typography/Spacing each have their own page under the Tokens group

---

## 1. Voice Tokens (the primitives)

Voice tokens are the atomic building blocks of how the brand speaks. They are stored in `voice_tokens` and rendered on a dedicated page with the same card-based layout as color/typography tokens.

### Database table: `voice_tokens`

```text
voice_tokens
  id              UUID PK DEFAULT gen_random_uuid()
  workspace_id    UUID NOT NULL
  token_type      TEXT NOT NULL
                  -- 'pillar' | 'prohibited_pattern' | 'cta_style' | 'grammar_rule'
  name            TEXT NOT NULL        -- e.g. "Confident, Not Aggressive"
  description     TEXT                 -- explanation of what this means in practice
  dos             TEXT[] DEFAULT '{}'  -- example phrases that embody this
  donts           TEXT[] DEFAULT '{}'  -- example phrases that violate this
  severity        TEXT DEFAULT 'error' -- 'error' | 'warning' (for guardrail checks)
  sort_order      INTEGER DEFAULT 0
  created_by      UUID
  created_at      TIMESTAMPTZ DEFAULT now()
  updated_at      TIMESTAMPTZ DEFAULT now()
```

### Token types explained

| Type | Purpose | Example |
|------|---------|---------|
| `pillar` | Core voice attributes (3-5 max) | "Confident, Not Aggressive" -- We state things directly. We don't hedge with "maybe" or "just". We also don't command or pressure. |
| `prohibited_pattern` | Specific language anti-patterns | "No Urgency Scarcity" -- Never use "Limited time!", "Don't miss out!", "Only X left!" |
| `cta_style` | Rules for call-to-action phrasing | "Verb-First, Calm Authority" -- CTAs start with a verb, 1-3 words, no exclamation marks. "Explore" not "Click here!!!" |
| `grammar_rule` | Mechanical style choices | "Sentence Case Headlines" -- All headlines use sentence case. No Title Case. No ALL CAPS except legal. |

### UI rendering

Same card layout as `TokensColors.tsx` and `TokensTypography.tsx`:
- Each token as a bordered card with name, description, and a `DosDonts` component (already exists)
- Grouped by `token_type` with section headers
- `CopyButton` for the token name (for referencing in reviews)

### RLS policies

- SELECT: workspace members
- INSERT/UPDATE: editors and admins (same pattern as `library_entries`)
- DELETE: admins only

---

## 2. Copy Patterns (per-component guidance)

Copy patterns tie voice tokens to specific UI components. They answer "what should a button/card/form say and how?"

### Database table: `copy_patterns`

```text
copy_patterns
  id              UUID PK DEFAULT gen_random_uuid()
  workspace_id    UUID NOT NULL
  component_id    TEXT NOT NULL        -- maps to componentRegistry id (e.g. "button-primary")
  element         TEXT NOT NULL        -- 'label' | 'heading' | 'description' | 'placeholder' | 'error_message' | 'empty_state'
  guidance        TEXT NOT NULL        -- the rule: "1-3 words, verb-first, no exclamation marks"
  good_examples   TEXT[] DEFAULT '{}'  -- ["Explore", "Get Started", "View Details"]
  bad_examples    TEXT[] DEFAULT '{}'  -- ["Click Here!!!", "Submit", "GO NOW"]
  voice_token_ids UUID[] DEFAULT '{}' -- references to voice_tokens that apply
  sort_order      INTEGER DEFAULT 0
  created_by      UUID
  created_at      TIMESTAMPTZ DEFAULT now()
  updated_at      TIMESTAMPTZ DEFAULT now()
```

### Relationship to components

`component_id` maps to the existing `ComponentEntry.id` from `componentRegistry.tsx`. This is a soft reference (not an FK) since the component registry is a hardcoded TypeScript array, not a database table.

A single component can have multiple copy patterns (one per element type). For example, `card-primary` might have patterns for `heading`, `description`, and `empty_state`.

### UI rendering

- Displayed as a tab on the Voice page ("Copy Patterns")
- Grouped by component category (Buttons, Cards, Forms, etc.) -- reusing the `categories` array from `componentRegistry.tsx`
- Each pattern shows the component name, element type, guidance text, and good/bad examples in the `DosDonts` format
- Links to the component detail page for visual reference

### RLS policies

Same as `voice_tokens`.

---

## 3. Channel Kits (assembled delivery context)

Channel kits package voice tokens and copy patterns into context-specific guidance for a delivery surface.

### Database table: `channel_kits`

```text
channel_kits
  id              UUID PK DEFAULT gen_random_uuid()
  workspace_id    UUID NOT NULL
  name            TEXT NOT NULL        -- "Web App", "Landing Page", "Social Post", "Email"
  description     TEXT                 -- when/why to use this kit
  tone_modifiers  TEXT[] DEFAULT '{}'  -- adjustments from baseline: ["More conversational", "Shorter sentences"]
  max_heading_length  INTEGER          -- character limit for headings in this channel
  max_body_length     INTEGER          -- character limit for body copy
  cta_rules       TEXT                 -- channel-specific CTA guidance
  sample_copy     JSONB DEFAULT '[]'  -- [{element, text, notes}] -- example full-page copy set
  voice_token_ids UUID[] DEFAULT '{}' -- which pillars are emphasized/de-emphasized
  sort_order      INTEGER DEFAULT 0
  created_by      UUID
  created_at      TIMESTAMPTZ DEFAULT now()
  updated_at      TIMESTAMPTZ DEFAULT now()
```

### Predefined starter kits (seeded on first use)

| Kit | Tone modifier | Heading limit | CTA style |
|-----|--------------|---------------|-----------|
| Web App | Functional, precise | 40 chars | Verb-first, 1-3 words |
| Landing Page | Editorial, aspirational | 60 chars | Verb-first, can be longer (up to 5 words) |
| Social Post | Warm, concise | 80 chars | Soft CTA, no hard sell |
| Email | Respectful, informative | 50 chars | Single CTA per email, verb-first |

### UI rendering

- Third tab on the Voice page ("Channel Kits")
- Each kit as a large card showing: name, description, tone modifiers as badges, character limits, CTA rules, and sample copy
- "Preview" section showing sample copy rendered in the component styles

### RLS policies

Same as `voice_tokens`.

---

## 4. Guardrails Integration

### New guardrail rules (added to `guardrailRules.ts`)

```text
voice-no-urgency-scarcity (error)
  "Never use urgency or scarcity language: 'Limited time', 'Don't miss out', 'Only X left'"

voice-no-exclamation-cta (error)
  "CTA labels must not contain exclamation marks"

voice-sentence-case (warning)
  "Headlines should use sentence case, not Title Case or ALL CAPS"

voice-cta-length (warning)
  "CTA labels should be 1-3 words, verb-first"

voice-no-filler (warning)
  "Avoid filler words: 'just', 'simply', 'actually', 'basically'"
```

These rules are checked by the Design Copilot and Design Review functions alongside the existing 24 visual rules.

### What is NOT allowed (guardrails for the system itself)

1. **No generic copywriting advice** -- The system stores brand-specific voice rules, not "how to write good copy." There is no AI copy generator.
2. **No free-text generation** -- The Voice page is a reference system, not a content creation tool. Users look up guidance; they don't type prompts and get copy back.
3. **No channel kits without a component anchor** -- Every piece of copy guidance must trace back to either a voice token or a component pattern. No floating advice.
4. **No overriding visual guardrails** -- Voice tokens cannot contradict visual tokens (e.g., a voice token cannot specify a font or color).
5. **No unbounded token creation** -- Pillars are capped at 5 per workspace. This prevents voice sprawl.

---

## 5. Copilot and Review Integration

### Design Copilot

The `design-copilot` edge function's system prompt and context injection will be updated to include:
- Active voice tokens as additional context blocks (same format as library entries)
- Copy patterns for referenced components
- Channel kit guidance when the user mentions a specific channel

The copilot can then cite voice tokens in its References section, e.g., `[3] Voice Token: "Confident, Not Aggressive"`.

### Design Review

The `design-review` edge function will include voice tokens and copy patterns in its audit context. When reviewing a document that contains UI copy, it can flag violations against voice guardrails alongside visual guardrails.

---

## 6. MVP Scope

### Include in MVP

- `voice_tokens` table with RLS + migration
- Voice Tokens page at `/tokens/voice` with pillar, prohibited pattern, CTA style, and grammar rule sections
- Do/Don't rendering using the existing `DosDonts` component
- 5 new voice guardrail rules in `guardrailRules.ts`
- Seed data: 3 pillars, 2 prohibited patterns, 2 CTA style rules, 2 grammar rules (hardcoded defaults matching the existing brand aesthetic -- "calm, architectural, intelligent")
- Sidebar navigation update
- CommandSearch update

### Defer to next iteration

- `copy_patterns` table and UI (requires mapping to component registry, more complex)
- `channel_kits` table and UI (requires sample copy authoring)
- Copilot/Review context injection (voice tokens need to exist first)
- Voice token CRUD UI (start read-only with seed data; add edit forms later)
- Pillar cap enforcement (simple count check, add when CRUD exists)

---

## Technical Details

### Files to Create/Modify

| File | Action |
|------|--------|
| Migration SQL | Create `voice_tokens` table + RLS policies; seed default tokens |
| `src/pages/tokens/TokensVoice.tsx` | New page rendering voice tokens with DosDonts |
| `src/data/guardrailRules.ts` | Add 5 voice guardrail rules + new `voice` category |
| `src/App.tsx` | Add `/tokens/voice` route |
| `src/components/AppSidebar.tsx` | Add "Voice" to tokenNav |
| `src/components/CommandSearch.tsx` | Add Voice page to search index |

### Data seeded on migration

The migration will insert default voice tokens matching the existing brand personality ("calm, architectural, intelligent, editorial authority, controlled luxury"):

**Pillars**: "Confident, Not Aggressive", "Precise, Not Cold", "Curated, Not Exclusive"

**Prohibited patterns**: "No Urgency/Scarcity Language", "No Filler Words"

**CTA style**: "Verb-First, Calm Authority", "No Exclamation Marks"

**Grammar rules**: "Sentence Case Headlines", "Oxford Comma Always"

