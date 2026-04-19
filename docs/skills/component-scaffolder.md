---
name: component-scaffolder
description: Scaffolds complete, on-brand Curated Lens UI components from a single description. Use this skill whenever the user asks to "build", "create", "make", or "scaffold" any UI component — cards, buttons, forms, hero sections, nav, data tables, stat blocks, split layouts, or any other interface element. Also triggers when the user says "I need a [component name]" or "give me the code for [UI element]". Always loads the full component spec from components.md before generating. Produces complete TSX with correct tokens, spacing, typography, and Do/Don't rules already applied — never a bare skeleton.
---

# Component Scaffolder

Your job: produce complete, immediately usable TSX components that are fully on-brand from the first output. The user should never need to fix tokens, fonts, or spacing after receiving your scaffold.

## Workflow

1. Identify which component(s) are being requested
2. Read `/docs/design/components.md` for the component's full spec, anatomy, and Do/Don't rules
3. Also read `/docs/design/senior-ux.md` if the component is guest-facing (Helmut PWA)
4. **If the component includes icons, read `/docs/design/icon-system.md` and run the AI Icon Selection Protocol before writing any icon code**
5. Scaffold the complete component with all tokens, accessibility attributes, and responsive classes applied
6. Run the token pre-flight check from `design-token-enforcer` before outputting
7. Output the component + a short "What's applied" summary

---

## Component Catalogue

Use this to identify which spec to load:

| User says... | Load spec for... |
|-------------|------------------|
| card, panel, content block | Cards & Panels |
| button, CTA, action | Buttons & CTAs |
| input, form, field, select, checkbox, switch | Forms |
| table, badge, stat, metric, separator | Data Display |
| hero, section, layout, split | Layout Sections |
| nav, tabs, breadcrumb, navigation | Navigation |
| timeline, journey, onboarding steps | Narrative Pattern |
| icon, marker, POI | Icon System → load `/docs/design/icon-system.md` (+ map-system.md for markers) |

---

## AI Icon Selection Protocol

**Trigger:** Any component that includes an icon container — outcome cards, feature cards, deliverable blocks, proposal sections, workshop cards.

**Never use emoji as icons.** Emoji bypass the design system. Always use Lucide React.

### Step 1 — Select the container variant

| Variant | When | Classes | Icon color |
|---------|------|---------|------------|
| **Primary** (default) | Outcome cards, deliverables, features on cream surface | `w-10 h-10 rounded-lg bg-deep-green flex items-center justify-center flex-shrink-0` | `text-accent` (Bronze #C9A962) |
| **Secondary** | Supporting content, supplementary cards | `w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center flex-shrink-0` | `text-foreground` |
| **CTA** | Action cards only — contact, download, start. Max 1 per section | `w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0` | `text-primary-foreground` |

### Step 2 — Select the icon via semantic matching

Read the card title and description. Match the dominant concept:

**Methodology / Knowledge**
- methodology, framework, structure, process → `Layers`
- knowledge, learning, education, training, understand → `BookOpen`
- safety, trust, protection, compliance, risk, trygghet → `Shield`
- strategy, planning, direction, vision → `Compass`
- clarity, transparent, clear → `Eye`

**AI / Technology**
- AI, artificial intelligence, model, LLM, automation → `Brain`
- data, analytics, metrics, measurement → `BarChart3`
- speed, efficiency, live, real-time, sanntid, praksis → `Zap`
- search, find, discover, tydelig, "hva nå" → `Search`
- integration, connect, API, workflow → `GitMerge`
- code, technical, engineering → `Code2`

**Business / Consulting**
- outcome, result, deliverable, achievement → `CheckCircle2`
- use case, case study, example, scenario → `FileText`
- roadmap, next steps, hva nå, videre → `Map`
- tools, toolkit, resources, rammeverk, verktøy → `Briefcase`
- decision, evaluation, assessment, basis, veikartet → `Scale`
- investment, ROI, value, revenue → `TrendingUp`
- team, collaboration, people, organization → `Users`
- workshop, session, facilitation, meeting → `Presentation`

**Communication / Content**
- communication, report, document → `FileText`
- presentation, pitch, deck → `Monitor`
- feedback, review, comment → `MessageSquare`

**Travel / Curated Lens**
- location, place, destination, POI → `MapPin`
- journey, route, travel, cruise → `Navigation`
- story, narrative, editorial → `BookOpen`
- experience, moment, highlight → `Sparkles`

### Step 3 — Fallback (no match)
1. Tangible output or document → `FileText`
2. Process or method → `Layers`
3. Result or success → `CheckCircle2`
4. People or relationships → `Users`
5. Absolute last resort → `Dot`

### Locked icon assignments — Workshop361 outcome cards
These are fixed. Never change them:
| Card | Icon |
|------|------|
| Metodisk trygghet | `Shield` |
| 2–3 gjennomarbeidede use cases | `FileText` |
| Input til KI-veikartet | `Scale` |
| KI i praksis — live | `Zap` |
| Tydelig "hva nå" | `Search` |
| Verktøy for videre arbeid | `Briefcase` |

### TSX pattern

```tsx
import { Shield } from 'lucide-react'

{/* Primary container — default */}
<div className="w-10 h-10 rounded-lg bg-deep-green flex items-center justify-center flex-shrink-0">
  <Shield className="text-accent" size={20} strokeWidth={1.5} aria-hidden="true" />
</div>
```

**Icon hard rules:**
- NEVER emoji as icons
- NEVER filled variants — stroke only, strokeWidth 1.5 default (2 for CTA)
- NEVER color outside the 3 approved container variants
- NEVER icon size below 16px or above 24px inside containers
- NEVER icon without a container wrapper
- NEVER more than one CTA (Terracotta) container per section
- ALWAYS `aria-hidden="true"` on decorative icons
- ALWAYS pair icon + text label

---

## Scaffold Output Format

Always output in this order:

### 1. Component code
Complete TSX. Include:
- Correct imports (shadcn/ui components, Lucide icons)
- All design tokens applied as semantic Tailwind classes
- Responsive classes (`grid-cols-1 md:grid-cols-2` etc.)
- Accessibility attributes (aria-label, role, htmlFor, focus-visible)
- Minimum 44px touch targets on all interactive elements
- `max-w-prose` on all paragraph text

### 2. What's applied (brief, bullet list)
3–5 bullets explaining the key design decisions — tokens used, icon selection reasoning, accessibility choices, responsive behavior.

### 3. Variants (if relevant)
If the component has common variants, show them concisely.

---

## Non-negotiables (apply to every scaffold)

**Typography**
- Headlines: always `font-display` (Playfair Display)
- Body/UI: always `font-body` (Lexend)
- Never `font-sans`, never weight 300/light

**Colors**
- Backgrounds: `bg-background`, `bg-card`, `bg-muted` only — no colored fills
- Interaction: `bg-primary` (Terracotta) for buttons and active states
- Accent: `text-accent` / `border-accent` for bronze highlights only
- Text: `text-foreground` (charcoal) and `text-muted-foreground`

**Spacing**
- Use named scale (`p-4`, `gap-6`, `mt-8`) — no arbitrary bracket values
- Section padding: `pt-20` minimum for hero sections
- Paragraph text: always `max-w-prose`

**Motion**
- Hover: `transition-opacity duration-300 ease-out hover:opacity-90`
- Never: `hover:scale-*`, `animate-bounce`, gradients

**Accessibility**
- Buttons: minimum `h-11` (44px), `focus-visible:ring-2 focus-visible:ring-ring`
- Forms: always pair `<Label>` with `<Input>` via `htmlFor` / `id`
- Images: always `alt` text

---

## Example Scaffold: Outcome Card Grid

When user asks: *"build me the workshop outcome cards"*

```tsx
import { Shield, FileText, Scale, Zap, Search, Briefcase } from 'lucide-react'

const outcomes = [
  { icon: Shield, title: 'Metodisk trygghet', description: 'Klar forståelse av hva KI kan og ikke kan' },
  { icon: FileText, title: '2–3 gjennomarbeidede use cases', description: 'Ikke ideer — konkrete, visualiserte case' },
  { icon: Scale, title: 'Input til KI-veikartet', description: 'Direkte brukbart som beslutningsgrunnlag' },
  { icon: Zap, title: 'KI i praksis — live', description: 'Deltakerne ser KI brukt i sanntid' },
  { icon: Search, title: 'Tydelig "hva nå"', description: 'Alle vet hva som skjer videre' },
  { icon: Briefcase, title: 'Verktøy for videre arbeid', description: 'Rammeverket dere kan bruke selv' },
]

export function OutcomeCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {outcomes.map(({ icon: Icon, title, description }) => (
        <div key={title} className="bg-background rounded-lg border border-border p-5 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-deep-green flex items-center justify-center">
            <Icon className="text-accent" size={20} strokeWidth={1.5} aria-hidden="true" />
          </div>
          <h3 className="font-display text-base font-medium text-foreground leading-snug">
            {title}
          </h3>
          <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-prose">
            {description}
          </p>
        </div>
      ))}
    </div>
  )
}
```

**What's applied:**
- Icons selected via AI semantic map: Shield (safety/methodology), FileText (concrete output), Scale (decision basis), Zap (live/real-time), Search (clarity/next step), Briefcase (tools/framework)
- Primary icon container: Deep Green bg + Bronze stroke — never emoji
- Playfair Display headlines, Lexend body throughout
- `max-w-prose` on description text
- Responsive: 1 col mobile → 2 col sm → 3 col lg
