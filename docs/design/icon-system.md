# Icon System — Host Atlas
**AI-Driven Icon Selection Protocol v1.0**

This document is the source of truth for all icon decisions. It is designed to be loaded by AI tools (Claude, Cowork, IDE copilots) so that every icon chosen is semantically correct and on-brand — no manual emoji picking, no guesswork.

---

## Library

**Lucide React** — already in `package.json` via shadcn.  
Import: `import { IconName } from 'lucide-react'`

**Never use:** emoji, icon fonts, filled icons, multicolor icons.

---

## Step 1 — Select the Container Variant

Before choosing an icon, decide which container it lives in:

| Variant | When to use | Container classes | Icon color |
|---------|------------|-------------------|------------|
| **Primary** (default) | Outcome cards, key deliverables, main features on cream surface | `w-10 h-10 rounded-lg bg-deep-green` | `text-accent` (Bronze) |
| **Secondary** | Supporting content, supplementary cards on cream/warm-stone | `w-10 h-10 rounded-lg bg-card border border-border` | `text-foreground` (Charcoal) |
| **CTA** | Action cards only — contact, download, start. Max 1 per section | `w-10 h-10 rounded-full bg-primary` | `text-primary-foreground` (Cream) |

---

## Step 2 — Select the Icon via Semantic Map

Read the card title and description. Match the **dominant concept** to an icon:

### Methodology / Knowledge
| Concept keywords | Lucide icon |
|-----------------|-------------|
| methodology, framework, structure, process | `Layers` |
| knowledge, learning, education, training, understand | `BookOpen` |
| safety, trust, protection, compliance, risk, trygghet | `Shield` |
| strategy, planning, roadmap, direction, vision | `Compass` |
| clarity, transparent, clear | `Eye` |

### AI / Technology
| Concept keywords | Lucide icon |
|-----------------|-------------|
| AI, artificial intelligence, model, LLM, automation | `Brain` |
| data, analytics, metrics, measurement | `BarChart3` |
| speed, efficiency, live, real-time, sanntid, praksis | `Zap` |
| search, find, discover, investigate, tydelig | `Search` |
| integration, connect, API, workflow | `GitMerge` |
| code, technical, engineering, build | `Code2` |

### Business / Consulting
| Concept keywords | Lucide icon |
|-----------------|-------------|
| outcome, result, deliverable, achievement | `CheckCircle2` |
| use case, case study, example, scenario | `FileText` |
| roadmap, next steps, hva nå, videre | `Map` |
| tools, toolkit, resources, rammeverk, verktøy | `Briefcase` |
| decision, evaluation, assessment, basis, veikartet | `Scale` |
| investment, ROI, value, revenue | `TrendingUp` |
| team, collaboration, people, organization | `Users` |
| workshop, session, facilitation, meeting | `Presentation` |

### Communication / Content
| Concept keywords | Lucide icon |
|-----------------|-------------|
| communication, report, document, write | `FileText` |
| presentation, pitch, deck, slide | `Monitor` |
| feedback, review, comment | `MessageSquare` |
| share, distribute, publish | `Share2` |

### Travel / Host Atlas
| Concept keywords | Lucide icon |
|-----------------|-------------|
| location, place, destination, POI | `MapPin` |
| journey, route, itinerary, travel | `Navigation` |
| story, narrative, editorial, article | `BookOpen` |
| experience, moment, highlight | `Sparkles` |

---

## Step 3 — Fallback (no match found)

1. Card is about a tangible output or document → `FileText`
2. Card is about a process or method → `Layers`
3. Card is about a result or success → `CheckCircle2`
4. Card is about people or relationships → `Users`
5. Absolute last resort → `Dot` (neutral — never emoji)

---

## TSX Pattern

```tsx
import { Shield } from 'lucide-react'

{/* Primary container */}
<div className="w-10 h-10 rounded-lg bg-deep-green flex items-center justify-center flex-shrink-0">
  <Shield className="text-accent" size={20} strokeWidth={1.5} aria-hidden="true" />
</div>

{/* Secondary container */}
<div className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center flex-shrink-0">
  <Shield className="text-foreground" size={20} strokeWidth={1.5} aria-hidden="true" />
</div>

{/* CTA container — action cards only */}
<div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
  <Shield className="text-primary-foreground" size={18} strokeWidth={2} aria-hidden="true" />
</div>
```

---

## Hard Rules

- **NEVER** use emoji as icons — they bypass the design system
- **NEVER** use filled icon variants — stroke only, strokeWidth 1.5 default
- **NEVER** apply color outside the 3 approved container variants
- **NEVER** use icon size below 16px or above 24px inside containers
- **NEVER** put an icon directly on a card without a container wrapper
- **NEVER** use more than one CTA (Terracotta) container per section
- **ALWAYS** add `aria-hidden="true"` to decorative icons
- **ALWAYS** pair icon + label — never icon alone

---

## The 6 Workshop Outcome Cards — Reference Icons

These are the locked icon assignments for the Workshop361 outcome cards. Use these exact icons whenever these cards appear.

| Card title | Concept | Icon |
|-----------|---------|------|
| Metodisk trygghet | safety, trust, methodology | `Shield` |
| 2–3 gjennomarbeidede use cases | use case, document, concrete output | `FileText` |
| Input til KI-veikartet | roadmap input, decision basis | `Scale` |
| KI i praksis — live | speed, live, real-time | `Zap` |
| Tydelig "hva nå" | clarity, next steps, search | `Search` |
| Verktøy for videre arbeid | tools, resources, framework | `Briefcase` |
