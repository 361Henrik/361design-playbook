

## Apply the Design Playbook Across All Pages

### Audit Summary

After reviewing the codebase, here are the systematic gaps between the playbook and the actual implementation:

| Gap | Where | Playbook says | Current code does |
|-----|-------|--------------|-------------------|
| Touch targets | All forms (Auth, Settings, Copilot) | 44-48px min height | Default 40px inputs/buttons |
| Page padding | Every page | `space-8` (64px) sections, `space-5` (24px) blocks | Arbitrary `px-8 py-10`, `p-6`, inconsistent |
| PageHeader component | Shared | `text-h1` token (36px) | `text-3xl` (arbitrary) |
| Form labels | Auth, Settings | `text-label` role (13px/500) | `text-xs` (12px/400) |
| Links/captions | Auth, Help | `text-caption` role (12px) + `hover:text-bronze` | `text-xs text-muted-foreground` |
| Entry animations | All pages | 300ms ease-out fade/slide | None on most pages |
| Card titles | Settings, Help, Dashboard | `font-display text-h3` | `text-base` (arbitrary) |
| Form spacing | Auth, Settings | `space-5` between fields, `space-2` label-to-input | `space-y-4`, `space-y-3` |
| Auth page | `/auth` | Layered cream form panel, editorial layout | Generic white panel, small inputs |
| App header bar | AppShell | `bg-card` with `space-5` padding | `px-6` arbitrary |
| Help page | `/help` | `max-w-content` (1100px) | `max-w-4xl` (arbitrary) |

### Implementation Plan

**Phase 1 — Shared foundations (affects everything)**

**`src/components/PageHeader.tsx`**
- Heading: `text-h1` (36px, Playfair, -0.01em) instead of `text-3xl`
- Description: `text-body-lg` (18px) instead of `text-base`
- Bottom margin: `mb-space-8` (64px) instead of `mb-10`

**`src/components/AppShell.tsx`**
- Header padding: `px-space-5` instead of `px-6`
- Add subtle entry animation to `<main>`: `animate-in fade-in duration-300`

**Global input/button sizing (CSS layer in `index.css`)**
- Add base layer rules for `input`, `textarea`, `select` → `min-h-[48px]` and `text-body` (16px)
- Primary buttons default to `h-12` (48px)
- This enforces senior-first touch targets everywhere without editing every page

**Phase 2 — Auth page (`src/pages/Auth.tsx`)**
- Form panel: `bg-card` surface, inner card container with `border border-border rounded-lg`
- Labels: `text-label font-body` (13px/500)
- Inputs: explicit `h-12 text-body font-body`
- Button: `size="lg"` (48px)
- Field spacing: `space-y-space-5` (24px), label-to-input: `space-y-space-2` (8px)
- Links: `text-caption hover:text-bronze`
- Left panel: `text-display` for headline, `leading-hero`, `space-8` vertical rhythm
- Add entry animation on form panel: `animate-in fade-in slide-in-from-right-4 duration-300`
- Mobile: left panel becomes compact `py-space-7` header band

**Phase 3 — Dashboard (`src/pages/Dashboard.tsx`)**
- Container: `max-w-content` (1100px) instead of `max-w-5xl`
- Section gaps: `mb-space-8` (64px) instead of `mb-10`
- Section headings: `text-h2` already used — good
- Card padding: `p-space-4` (16px) — already close
- StatCard value: use `text-h1` instead of `text-2xl`

**Phase 4 — Settings (`src/pages/Settings.tsx`)**
- Container: `max-w-content` instead of `max-w-5xl`
- Section spacing: `space-y-space-8` instead of `space-y-8`
- Card titles: `text-h3 font-display` instead of `text-base`
- Input heights: `h-12` for tag inputs and role selectors
- Button: `size="lg"` for primary actions

**Phase 5 — Help (`src/pages/Help.tsx`)**
- Container: `max-w-content` (1100px) instead of `max-w-4xl`
- Padding: `px-space-8 py-space-8` instead of `p-6`
- Card titles: `text-h3 font-display`
- Step labels: `text-body font-body` instead of `text-sm`
- Glossary terms: `text-label` (13px/500) instead of `text-sm font-medium`

**Phase 6 — Token pages, Components, Guardrails, Copilot**
- Container: `max-w-content` instead of `max-w-5xl` across all pages
- Consistent `px-space-8 py-space-8` padding
- Section headings use `text-h2` token (most already do)
- Card headings use `text-h3` token

### What stays the same
- All business logic, routing, data fetching
- Component library (shadcn/ui)
- Color palette and CSS custom properties
- Sidebar and navigation structure
- Playbook data layer

### Files to edit
| File | Scope |
|------|-------|
| `src/index.css` | Add base layer rules for input/button min-height |
| `src/components/PageHeader.tsx` | Typography tokens |
| `src/components/AppShell.tsx` | Spacing, entry animation |
| `src/pages/Auth.tsx` | Full redesign per playbook |
| `src/pages/Dashboard.tsx` | Spacing, container, typography tokens |
| `src/pages/Settings.tsx` | Spacing, typography, input sizing |
| `src/pages/Help.tsx` | Spacing, container, typography tokens |
| `src/pages/tokens/TokensColors.tsx` | Container width |
| `src/pages/tokens/TokensTypography.tsx` | Container width |
| `src/pages/tokens/TokensSpacing.tsx` | Container width |
| `src/pages/tokens/TokensLayout.tsx` | Container width |
| `src/pages/tokens/TokensMotion.tsx` | Container width |
| `src/pages/tokens/TokensIcons.tsx` | Container width |
| `src/pages/tokens/TokensVoice.tsx` | Container width |
| `src/pages/Components.tsx` | Container width |
| `src/pages/Guardrails.tsx` | Container, typography |
| `src/pages/Copilot.tsx` | Input sizing |
| `src/pages/Export.tsx` | Container width |
| `src/pages/Guidelines.tsx` | Container width |
| `src/pages/Library.tsx` | Container width |
| `src/pages/Sources.tsx` | Container width |
| `src/pages/Changelog.tsx` | Container width |
| `src/pages/Studio.tsx` | Container width |
| `src/pages/ResetPassword.tsx` | Input sizing, typography |

