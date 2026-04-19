

# Rebrand & Restructure: Host Atlas + 361 AI Development

## A. New Architecture

The hub splits into **two top-level domains**, each with its own visual identity and purpose. Tools (Studio, Export, Copilot, Sources, Library, Changelog, Handbook, Settings, Help) become a third utility rail at the bottom — they serve both domains.

```text
HOST ATLAS  (the product)
├── Foundations
│   ├── Colors
│   ├── Typography
│   ├── Spacing
│   ├── Layout
│   ├── Motion
│   ├── Voice
│   └── Logo System
├── Interaction
│   ├── CTA System
│   ├── Signifiers & Clarity
│   ├── Interaction States
│   ├── Feedback & Micro-interactions
│   ├── Motion & Transitions
│   ├── Semantic Colour
│   ├── Depth & Surfaces
│   └── Dark Mode Principles
├── Components
│   ├── Buttons / Cards / Forms / Data Display / Layout / Navigation
├── Maps  (Host Atlas's signature surface)
│   ├── Principles · Structure · Visual Style
│   ├── Interaction · Navigation Logic
│   ├── Experience Design · Examples
├── Patterns
│   ├── Narrative Patterns
│   └── Image System
└── Icons — Host Atlas Set  (product/map taxonomy)

361 AI DEVELOPMENT  (delivery & build studio)
├── Brand & Voice
│   ├── 361 Identity (logo, palette, type)
│   └── Voice for offers, decks, docs
├── Offer & Pitch System
│   ├── Slide templates · Pricing blocks
│   ├── Case-study layout
│   └── Cover/title patterns
├── Documentation System
│   ├── Spec doc template
│   ├── Decision log · ADR style
│   └── Inline diagram conventions
├── Delivery Assets
│   ├── Workflow diagrams (build → ship)
│   ├── Service blueprints
│   ├── System maps
│   └── Status / progress visuals
├── Prototype Kit
│   ├── Reusable demo screens
│   ├── Wireframe primitives
│   └── Annotation system
├── Guardrails (delivery)
│   └── Quality bar for offers/docs/prototypes
└── Icons — 361 Set  (workflow / AI / build taxonomy)

TOOLS  (shared utility rail)
Studio · Export · Copilot · Sources · Library · Handbook · Changelog · Settings · Help
```

## B. Migration Plan

**Rename**
- All "The Curated Lens" / "Curated Lens" → "Host Atlas" in: sidebar header, `index.html` title/meta, `Auth.tsx`, `playbookMeta.brand`, channel-kit email/social headers, principles/operator-branding copy, cards copy.
- "Design System Hub" sub-label → "Host Atlas · Design System".
- `playbook/principles/operator-branding.ts`: rewrite around Host Atlas as the product brand; "operator expression" stays as a concept but framed as Host Atlas's adaptation layer.

**Move (into Host Atlas)**
- All `tokens/*`, `behavior/*`, `maps/*`, `components/*`, `image-system`, `narrative-patterns`, `guardrails` → grouped under Host Atlas in sidebar.

**Move (into 361 AI Development)**
- `ChannelKits` (currently dormant under Studio redirect) → reframed as **Offer & Pitch System** templates.
- Parts of `Guidelines` that are about delivery/writing → **Documentation System**.
- Parts of `Sources` related to internal references → keep in Tools, but surface a 361 view.

**Remove / Deprecate**
- "Curated Lens Signature" vs "Operator Expression" dual-mode framing in `TokensColors.tsx` (collapse to single Host Atlas system; operator overrides become a sub-note).
- Redundant "Brand Guidelines" principles page that just restates avoidance list (fold into Host Atlas overview).
- Duplicate map-route legacy entries already redirected.

**Create (new pages)**
- `/host-atlas` — domain overview/landing.
- `/361` — domain overview/landing.
- `/361/brand` — 361 identity (logo, palette, type, voice).
- `/361/offers` — offer/pitch system (cover, problem, approach, pricing, case study).
- `/361/docs` — documentation templates (spec, ADR, runbook).
- `/361/delivery` — workflow diagrams, service blueprints, status visuals.
- `/361/prototype-kit` — wireframe primitives + annotation system.
- `/361/icons` — 361 icon set spec.
- `/host-atlas/icons` — Host Atlas icon set spec (replaces current `/tokens/icons`).

## C. Icon System — Two Sets, One Grammar

Current icons fail because everything is generic Lucide at one weight, with no taxonomy and no distinction between product and delivery use. The fix is **two intentional sets that share a grammar but diverge in metaphor and weight**.

**Shared grammar (both sets)**
- 24px artboard, 20px live area, 2px safe margin.
- Geometric, single-line construction. No fills except inside map-marker disks.
- Corner radius: 1px on terminals, 2px on enclosures. No sharp 90° miters.
- Optical alignment to a 4px sub-grid; circular forms sit on the grid, not inscribed in it.
- Single-color rendering via `currentColor`. Never multi-tone.
- Sizes: 16 (inline / dense lists), 20 (controls), 24 (default), 32 (cards/empty states). No other sizes.

**Host Atlas set — "Cartographic"**
- **Stroke 1.5px**, rounded caps & joins.
- Metaphors drawn from cartography, place, observation: pin, route, layer, viewfinder, aperture, compass, terrain.
- Used in: product UI, maps, POI taxonomy, navigation, content cards.
- Map markers keep the existing 3-layer rule (ring + white disk + outline icon).
- Color: `text-foreground` in UI; **Champagne Bronze** only for nav rail and brand surfaces; never bronze inside content bodies.
- Source: Lucide subset (curated whitelist of ~60) + ~12 custom POI icons already specified.

**361 AI Development set — "Mechanical"**
- **Stroke 1.75px**, square caps, rounded joins. Slightly heavier to read at slide/document scale.
- Metaphors drawn from build, flow, system: node, edge, branch, queue, agent, prompt, ship, version, signal.
- Used in: offers, decks, documentation, workflow diagrams, prototype annotations.
- Color: Deep Charcoal default; one accent permitted per artifact (Terracotta for action, Bronze for highlight). Never both.
- Source: Lucide subset + custom workflow/AI glyphs (agent, prompt, eval, run, pipeline, handoff).

**Shared rules (consistency)**
| Rule | Host Atlas | 361 AI Dev |
|---|---|---|
| Stroke | 1.5px | 1.75px |
| Caps | round | square |
| Use in cards | left of title, 16/20px | inside badge, 16px |
| Use in workflows | n/a | on edges & nodes, 24px |
| Use in maps | mandatory taxonomy | prohibited |
| Use in offers | prohibited | mandatory |
| Color tokens | foreground / bronze (nav only) | charcoal / one accent |
| Custom icons | POI taxonomy | Workflow taxonomy |

**Why two sets instead of one**: Host Atlas icons live inside dense product UI and must recede; 361 icons live on slides and in docs and must hold their own at 200% zoom. One stroke weight cannot serve both.

## D. Implementation Steps (after approval)

1. **Global rename pass** — Curated Lens → Host Atlas in `AppSidebar`, `index.html`, `Auth.tsx`, `playbookMeta`, `channelKits.tsx`, principles copy, card copy. Update memories.
2. **Sidebar restructure** — replace flat `Foundations / Interaction / System / Tools` with collapsible `HOST ATLAS / 361 AI DEVELOPMENT / TOOLS`. Move Maps under Host Atlas.
3. **New domain landing pages** — `/host-atlas` and `/361` with section overviews.
4. **Create 361 section scaffolding** — Brand, Offer & Pitch, Documentation, Delivery Assets, Prototype Kit, Guardrails, Icons (each as a real page, not placeholder).
5. **Icon system rebuild**
   - Split `TokensIcons` into `host-atlas/icons` (cartographic spec, POI taxonomy, map-marker rules) and `361/icons` (mechanical spec, workflow taxonomy, slide/doc rules).
   - Author the ~12 custom 361 glyphs as inline SVG components (agent, prompt, pipeline, run, eval, handoff, ship, branch, queue, signal, version, node).
   - Tighten the Lucide whitelist per set.
6. **Refactor `TokensColors.tsx`** — drop the dual-mode "Signature vs Operator" framing; present one Host Atlas palette with a small "operator overrides" note.
7. **Reframe `operator-branding.ts`** — Host Atlas is the product brand; operator expression is an adaptation layer, not a co-equal mode.
8. **Reframe `ChannelKits` → Offer & Pitch System** under 361.
9. **Update routing** in `App.tsx` for new paths; add redirects from old `/tokens/icons` and `/channel-kits`.
10. **Refresh `curated-lens-design-system.md`** → `host-atlas-design-system.md`, plus a new `361-delivery-system.md`.

