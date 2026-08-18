/**
 * Icon System — Host Atlas
 * AI-DRIVEN ICON SELECTION PROTOCOL v1.0
 *
 * Source of truth for all icon decisions across:
 * - Workshop outcome cards
 * - Proposal deliverable blocks
 * - Consulting summary sections
 * - Cowork artifacts
 * - Helmut PWA (map markers excluded — see map-system.md)
 *
 * Library: lucide-react (ships with shadcn — already in package.json)
 * Never use emoji. Never use icon fonts. Never use filled icons.
 */

// ─────────────────────────────────────────────────────────────
// CONTAINER VARIANTS
// AI must select the correct container before selecting the icon.
// ─────────────────────────────────────────────────────────────

export const iconContainerVariants = {
  /**
   * DEFAULT — use for all standard outcome/deliverable/feature cards
   * Surface: Base Canvas (#F6F3EE) or Warm Stone (#E8E2D9)
   */
  primary: {
    container: 'w-10 h-10 rounded-lg bg-deep-green flex items-center justify-center flex-shrink-0',
    iconClass: 'text-accent', // Champagne Bronze #C9A962
    iconSize: 20,
    strokeWidth: 1.5,
    when: 'Default. Primary outcomes, key deliverables, main features.',
  },

  /**
   * SECONDARY — use when cards sit on a deep green surface
   * Surface: Deep Green (#1F4A3A) panels
   */
  secondary: {
    container: 'w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center flex-shrink-0',
    iconClass: 'text-deep-green', // Deep Charcoal on Warm Stone
    iconSize: 20,
    strokeWidth: 1.5,
    when: 'Supporting or secondary content on cream/warm-stone surfaces.',
  },

  /**
   * CTA — use ONLY for action-driving cards (download, contact, start)
   * Max ONE per section. Never for informational cards.
   */
  cta: {
    container: 'w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0',
    iconClass: 'text-primary-foreground', // Cream white
    iconSize: 18,
    strokeWidth: 2,
    when: 'CTA cards only — contact, download, start, register. One per section.',
  },
} as const

// ─────────────────────────────────────────────────────────────
// AI ICON SELECTION PROTOCOL
//
// When building any card, block, or section with an icon:
// 1. Read the card's TITLE and DESCRIPTION
// 2. Match the CONCEPT to the semantic map below
// 3. Use the EXACT Lucide icon name listed
// 4. If no match — use the FALLBACK rules at the bottom
// ─────────────────────────────────────────────────────────────

export const iconSemanticMap = [
  // ── METHODOLOGY / KNOWLEDGE / LEARNING ──────────────────────
  { concepts: ['methodology', 'framework', 'structure', 'process', 'system', 'approach'], icon: 'Layers' },
  { concepts: ['knowledge', 'learning', 'education', 'training', 'understand', 'insight'], icon: 'BookOpen' },
  { concepts: ['safety', 'trust', 'security', 'protection', 'compliance', 'risk'], icon: 'Shield' },
  { concepts: ['strategy', 'planning', 'roadmap', 'direction', 'vision', 'goal'], icon: 'Compass' },
  { concepts: ['clarity', 'simplicity', 'clean', 'transparent', 'clear'], icon: 'Eye' },

  // ── AI / TECHNOLOGY / DATA ───────────────────────────────────
  { concepts: ['ai', 'artificial intelligence', 'machine learning', 'model', 'llm', 'automation'], icon: 'Brain' },
  { concepts: ['data', 'analytics', 'metrics', 'measurement', 'tracking'], icon: 'BarChart3' },
  { concepts: ['speed', 'efficiency', 'fast', 'quick', 'performance', 'live', 'real-time', 'sanntid'], icon: 'Zap' },
  { concepts: ['search', 'find', 'discover', 'explore', 'investigate', 'research'], icon: 'Search' },
  { concepts: ['integration', 'connect', 'api', 'pipeline', 'workflow', 'automation'], icon: 'GitMerge' },
  { concepts: ['code', 'technical', 'developer', 'engineering', 'build'], icon: 'Code2' },

  // ── BUSINESS / CONSULTING / OUTCOMES ────────────────────────
  { concepts: ['outcome', 'result', 'deliverable', 'output', 'achievement'], icon: 'CheckCircle2' },
  { concepts: ['use case', 'case study', 'example', 'scenario', 'application'], icon: 'FileText' },
  { concepts: ['roadmap', 'plan', 'next steps', 'hva nå', 'what next', 'videre'], icon: 'Map' },
  { concepts: ['tools', 'toolkit', 'resources', 'framework', 'rammeverk', 'verktøy'], icon: 'Briefcase' },
  { concepts: ['decision', 'choice', 'evaluation', 'assessment', 'basis'], icon: 'Scale' },
  { concepts: ['investment', 'cost', 'roi', 'value', 'revenue', 'financial'], icon: 'TrendingUp' },
  { concepts: ['team', 'collaboration', 'people', 'organization', 'group'], icon: 'Users' },
  { concepts: ['workshop', 'session', 'facilitation', 'meeting', 'gathering'], icon: 'Presentation' },

  // ── COMMUNICATION / CONTENT ───────────────────────────────────
  { concepts: ['communication', 'message', 'report', 'document', 'write', 'content'], icon: 'FileText' },
  { concepts: ['presentation', 'pitch', 'deck', 'slide', 'visual'], icon: 'Monitor' },
  { concepts: ['feedback', 'review', 'comment', 'response'], icon: 'MessageSquare' },
  { concepts: ['share', 'distribute', 'publish', 'broadcast'], icon: 'Share2' },

  // ── TRAVEL / HOST ATLAS SPECIFIC ───────────────────────────
  { concepts: ['location', 'place', 'destination', 'point of interest', 'poi'], icon: 'MapPin' },
  { concepts: ['journey', 'route', 'itinerary', 'travel', 'cruise', 'rail'], icon: 'Navigation' },
  { concepts: ['story', 'narrative', 'editorial', 'article', 'content'], icon: 'BookOpen' },
  { concepts: ['experience', 'moment', 'memory', 'highlight'], icon: 'Sparkles' },
] as const

// ─────────────────────────────────────────────────────────────
// FALLBACK RULES (when no concept match is found)
// ─────────────────────────────────────────────────────────────

export const iconFallbackRules = [
  {
    rule: 'If the card is about a tangible output or document → FileText',
    icon: 'FileText',
  },
  {
    rule: 'If the card is about a process or method → Layers',
    icon: 'Layers',
  },
  {
    rule: 'If the card is about a result or success → CheckCircle2',
    icon: 'CheckCircle2',
  },
  {
    rule: 'If the card is about people or relationships → Users',
    icon: 'Users',
  },
  {
    rule: 'Absolute last resort → Dot (neutral, never emoji)',
    icon: 'Dot',
  },
]

// ─────────────────────────────────────────────────────────────
// READY-TO-USE TSX PATTERN
// Copy this pattern into any card component.
// Replace ICON_NAME with the result of the AI selection above.
// ─────────────────────────────────────────────────────────────

export const iconPatternExample = `
import { ICON_NAME } from 'lucide-react'

{/* Primary container (default) */}
<div className="w-10 h-10 rounded-lg bg-deep-green flex items-center justify-center flex-shrink-0">
  <ICON_NAME className="text-accent" size={20} strokeWidth={1.5} aria-hidden="true" />
</div>

{/* Secondary container (on cream surface, supporting content) */}
<div className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center flex-shrink-0">
  <ICON_NAME className="text-foreground" size={20} strokeWidth={1.5} aria-hidden="true" />
</div>

{/* CTA container (action cards only, one per section) */}
<div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
  <ICON_NAME className="text-primary-foreground" size={18} strokeWidth={2} aria-hidden="true" />
</div>
`

// ─────────────────────────────────────────────────────────────
// HARD RULES — NEVER VIOLATE
// ─────────────────────────────────────────────────────────────

export const iconHardRules = [
  'NEVER use emoji as icons — they bypass the design system entirely',
  'NEVER use filled icon variants — stroke only, strokeWidth 1.5 default',
  'NEVER apply color outside the approved 3 container variants',
  'NEVER use icon size below 16px or above 24px inside containers',
  'NEVER put an icon directly on a card without a container wrapper',
  'NEVER use more than one CTA (Terracotta circle) container per section',
  'ALWAYS add aria-hidden="true" to decorative icons',
  'ALWAYS pair icon + text — never icon alone without a label',
] as const
