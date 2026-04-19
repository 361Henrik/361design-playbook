# 361 AI Development — Delivery System

> Source of truth for offers, documentation, prototypes, and delivery assets shipped under the 361 mark. Shares foundations with Host Atlas; diverges in icon weight, density, and accent rules.

---

## 1. Philosophy

Direct. Mechanical. Legible at 200% zoom. Built for slides, documents, and prototypes that ship under client review.

- No marketing gloss.
- No decorative imagery.
- One idea per surface.

---

## 2. Shared Foundations

361 uses the same color tokens, typography, and spacing scale as Host Atlas. See `host-atlas-design-system.md` §2, §6, §7.

The differences live in icons, accent rules, and density.

---

## 3. Color Use in Delivery

- Charcoal is the default for all type and strokes.
- Base Canvas is the default background.
- Warm Stone is used for cards, callouts, pricing blocks.
- Deep Green is used only for cover slides, section dividers, and high-contrast title surfaces.
- **One accent per artifact**: Terracotta (action) OR Bronze (highlight). Never both on the same slide or page.

---

## 4. Icon System — Mechanical Set

- Stroke: **1.75px** (heavier than Host Atlas to hold its own at slide scale).
- Caps: **square**. Joins: rounded.
- Sizes: 16, 20, 24, 32.
- Color: Charcoal default; one accent per artifact.
- Custom workflow glyphs: Agent · Prompt · Pipeline · Run · Eval · Handoff · Ship · Branch · Queue · Signal · Version · Node.
- Use on edges and nodes in workflow diagrams (24px). Inside badges (16px).

**Prohibited**: mixing Mechanical and Cartographic in the same artifact; using Mechanical icons on map markers or inside Host Atlas product UI.

---

## 5. Offer & Pitch System

Templates: Cover · Problem framing · Approach · Pricing · Case study · Title patterns.

Universal slide rules:
- One idea per slide.
- Maximum 40 words of body text per slide.
- Mechanical icons only.
- One accent per slide.
- No drop shadows, no gradients, no stock photography.

---

## 6. Documentation System

Templates:
- **Spec doc**: Summary · Goals · Non-goals · Decisions · Open questions · Appendix.
- **Decision log (ADR)**: Status · Context · Decision · Consequences · Date. Numbered (ADR-001, ADR-002…).
- **Runbook**: Trigger · Preconditions · Steps · Verification · Rollback. Each step is one imperative sentence.
- **Inline diagrams**: Mechanical icons, single-color Charcoal, one Terracotta highlight allowed for the focal node.

Single H1 per document. H2/H3 only. No heading deeper than H3.

---

## 7. Delivery Assets

- **Workflow diagram**: linear left-to-right, Pipeline + Run + Ship glyphs on transitions.
- **Service blueprint**: three swimlanes — User · Frontstage · Backstage. Touchpoints as Node glyphs; handoffs as Handoff glyphs.
- **System map**: nodes and edges, clustered by responsibility. Single-color Charcoal; one Bronze highlight for focal cluster.
- **Status visual**: three-state badge — Planned (outline) · In progress (Terracotta dot) · Shipped (Bronze check). No percentage bars.

---

## 8. Prototype Kit

Primitives: Frame · Block · Label callout · State stack · Annotation.

Annotation rule: if a screen needs more than three annotations to be understood, redesign the screen.

---

## 9. Voice

- Direct, declarative sentences. State the work, then the outcome.
- Numerals over words for counts and timelines.
- Lead with the decision; the rationale follows.
- Plain language. Define jargon on first use.

Prohibited: marketing superlatives, hedging, empty connectors, emoji, decorative punctuation.

---

## 10. Pre-ship Checklist

1. Cover / title set in Playfair Display.
2. Body copy in Lexend, ≥14pt for screens, ≥11pt for documents.
3. Every diagram uses Mechanical glyphs only.
4. No more than one accent color in any single view.
5. All numbers are numerals; all dates are ISO (YYYY-MM-DD).
6. No "lorem ipsum", no placeholder text.
7. No Host Atlas product chrome inside a 361 deliverable.

---

*Version 1.0.0 · Last updated 2026-04-19*
