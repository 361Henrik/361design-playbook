# 361 Design Playbook

Canonical design-governance source for ThreeSixtyONE products and delivery work.

## Packages

- `HostAtlas Design Playbook` — separate contracts for Helmut, Olga, and project-selected Marketing surfaces.
- `Client Delivery` — reusable visual and communication rules for proposals, workshops, reports, and handoffs.

The packages are deliberately separate. Product-specific tokens belong to HostAtlas; client-delivery assets must not inherit them unless a client brief explicitly selects that design system.

## Source of truth

- Machine-readable contracts: `design-system/*.contract.json`
- Human guidance: `host-atlas-design-system.md` and `361-delivery-system.md`
- Proof sheets for MagicPath: `proof-assets/`
- Executable validation: `npm run validate:design`

## Verification

```bash
npm ci
npm run verify
```

The validator blocks cross-surface token leakage, legacy bronze values, Inter as a prescribed product font, blue map styling, and gradient guidance.
