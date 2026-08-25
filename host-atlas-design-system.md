# HostAtlas Design Playbook

> Human-readable companion to `design-system/hostatlas.contract.json`. The JSON contract wins if another page in this repository is stale.

## 1. Governing workflow

Every request follows: **User Flow → UX → UI → Layout → Frontend approval → Backend**.

Identify `surface` before styling:

- `helmut` — guest-facing traveler PWA
- `olga` — operator and authoring workbench
- `marketing` — a named website or campaign with its own imported design system

If the surface or design-system identifier is missing, the verdict is `BLOCKED`. Never combine surface palettes.

## 2. Shared character

Calm, editorial, premium, and restrained. Playfair Display provides editorial authority; Lexend provides readable body and interface text. Use weights 400, 500, or 600 only.

Across HostAtlas: no blue, no gradients, no glass, neon, 3D, generic AI decoration, bouncing motion, or hover scaling.

## 3. Helmut — `ATLAS · Helmut`

Mobile-first guest experience for outdoor use, mature travelers, and patchy signal.

| Token | Hex | Role |
|---|---|---|
| Forest | `#1B3D2F` | structure, route, focus |
| Warm White | `#FBF9F5` | primary canvas |
| Off-white | `#F3F0EA` | secondary surface and neutral map differentiation |
| Near Black | `#191926` | text, marker ring, icon |
| Antique Bronze | `#C69B5B` | selected state and accent, maximum 8% |

Rules:

- Minimum target 48px; map hit areas 52px.
- Primary guest copy 18px.
- Provide loading, offline, reconnect, and recovery states.
- Navigation is labelled; maps remain readable in sunlight.
- Operator logo, imagery, and voice may appear. HostAtlas product branding and guest-facing “AI” language do not.
- Operator identity does not change Helmut colors, fonts, spacing, map grammar, or accessibility.
- Terracotta is not a Helmut token.

## 4. Olga — `ATLAS · Olga`

Desktop-first operational UI. Dense, calm, and explicit about system state.

| Token | Hex | Role |
|---|---|---|
| Base Canvas | `#F6F3EE` | primary surface |
| Warm Stone | `#E8E2D9` | secondary surface |
| Deep Charcoal | `#1A1F1A` | primary text |
| Muted | `#6E6A5E` | secondary text |
| Deep Green | `#1F4A3A` | structure |
| Terracotta | `#C35C3C` | interaction on cream only |
| Champagne Bronze | `#C9A962` | accent and CTA on green only |
| Warm Border | `#CCC4B8` | borders |

Rules:

- Minimum control target 44px.
- Terracotta signals interaction; it is never text, map color, or structural fill.
- Bronze is never body text on a light surface.
- Authoring must expose approval, version, restore/kill, audit, multilingual/audio jobs, and cost state.
- Provide default, focus, active, disabled, loading, empty, error, and success states where relevant.
- Do not import Helmut’s low-density guest layout into the operator workbench.

## 5. Marketing

Marketing is not a fixed third palette. Require the exact imported design system and audience brief for that website or campaign. Missing inputs produce `BLOCKED`; never guess colors or fonts.

Preserve editorial authority, constrained prose, meaningful imagery, and a clear conversion hierarchy.

## 6. Components and imagery

- Use tokens only and preserve the selected surface’s roles.
- Text belongs beside or outside imagery. If contrast is insufficient, change crop, placement, text density, or image; use a solid token-backed text panel when necessary.
- Imagery follows three layers: Hero (emotion and place), Experience (understated human presence), Product in Use (device is secondary).
- Every interaction requires a visible focus state and non-color signal.

## 7. Review and handoff

Allowed verdicts: `BLOCKED`, `NOT_APPROVED`, `CLEAN`.

Handoff includes project, component, exact revision, viewport, surface, design-system identifier, approved states, and unresolved warnings. Never include credentials, client content, private comments, or expiring asset URLs.

*Version 3.0.0 · Reconciled 2026-08-11*
