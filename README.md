# 361 Design Playbook

The living design-system playbook for **Host Atlas** (product design system) and **361 AI Development** (delivery & build studio). It is both the system of record for what the brands look like and a working toolset: an AI design copilot, document extraction into a governed library, guardrail checks, channel-kit studio, and multi-format exports.

## Structure

- **Host Atlas** — foundations (color, type, spacing, motion, voice, logo), interaction behavior, components, maps, patterns, and the Cartographic icon set.
- **361 AI Development** — brand & voice, offer/pitch system, documentation templates (spec/ADR/runbook), delivery assets, prototype kit, and the Mechanical icon set.
- **Tools** — Studio, Export, Copilot, Sources, Library, Handbook, Changelog, Settings.

Canonical written specs live in [`host-atlas-design-system.md`](host-atlas-design-system.md) and [`361-delivery-system.md`](361-delivery-system.md). Brand facts used in code (names, palette, typography) live in [`src/brand/constants.ts`](src/brand/constants.ts) — change them there, not inline.

## Stack

Vite · React 18 · TypeScript · Tailwind CSS · shadcn/ui · Supabase (Postgres, Auth, Storage, Edge Functions) · TanStack Query

## Development

```sh
npm install
npm run dev        # start dev server
npm run build      # production build
npm run lint       # eslint
npm test           # vitest
```

Environment variables (see `.env`): `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID`.

## Backend

Supabase migrations live in `supabase/migrations/`; edge functions in `supabase/functions/` (design-copilot, design-review, extract-source, search-library, weekly-digest). Functions call the Lovable AI Gateway and require a valid user JWT.
