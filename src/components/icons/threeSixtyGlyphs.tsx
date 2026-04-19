/**
 * 361 AI Development — custom mechanical glyphs.
 * 24px artboard, 1.75px stroke, square linecaps, rounded joins, currentColor.
 * Metaphors: build, flow, system, agent, prompt, ship, version, signal.
 */
import type { SVGProps } from "react";

type GlyphProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (props: SVGProps<SVGSVGElement>, size: number) => ({
  xmlns: "http://www.w3.org/2000/svg",
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "square" as const,
  strokeLinejoin: "round" as const,
  ...props,
});

export const AgentGlyph = ({ size = 24, ...p }: GlyphProps) => (
  <svg {...base(p, size)}>
    <rect x="6" y="4" width="12" height="10" rx="2" />
    <circle cx="9.5" cy="9" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="14.5" cy="9" r="0.9" fill="currentColor" stroke="none" />
    <path d="M12 14v3" />
    <path d="M8 20h8" />
  </svg>
);

export const PromptGlyph = ({ size = 24, ...p }: GlyphProps) => (
  <svg {...base(p, size)}>
    <path d="M5 6h11" />
    <path d="M5 11h14" />
    <path d="M5 16h8" />
    <path d="M16 19l3-3-3-3" />
  </svg>
);

export const PipelineGlyph = ({ size = 24, ...p }: GlyphProps) => (
  <svg {...base(p, size)}>
    <rect x="3" y="9" width="6" height="6" rx="1" />
    <rect x="15" y="9" width="6" height="6" rx="1" />
    <path d="M9 12h6" />
    <path d="M11.5 10l2 2-2 2" strokeLinecap="round" />
  </svg>
);

export const RunGlyph = ({ size = 24, ...p }: GlyphProps) => (
  <svg {...base(p, size)}>
    <path d="M7 5l11 7-11 7V5z" />
  </svg>
);

export const EvalGlyph = ({ size = 24, ...p }: GlyphProps) => (
  <svg {...base(p, size)}>
    <path d="M4 6h16" />
    <path d="M4 12h10" />
    <path d="M4 18h6" />
    <path d="M16 16l2 2 4-4" strokeLinecap="round" />
  </svg>
);

export const HandoffGlyph = ({ size = 24, ...p }: GlyphProps) => (
  <svg {...base(p, size)}>
    <circle cx="6" cy="12" r="2.5" />
    <circle cx="18" cy="12" r="2.5" />
    <path d="M8.5 12h7" />
    <path d="M14 9.5l1.5 2.5-1.5 2.5" strokeLinecap="round" />
  </svg>
);

export const ShipGlyph = ({ size = 24, ...p }: GlyphProps) => (
  <svg {...base(p, size)}>
    <rect x="4" y="7" width="16" height="10" rx="1" />
    <path d="M4 11h16" />
    <path d="M9 7V4h6v3" />
  </svg>
);

export const BranchGlyph = ({ size = 24, ...p }: GlyphProps) => (
  <svg {...base(p, size)}>
    <circle cx="6" cy="6" r="2" />
    <circle cx="6" cy="18" r="2" />
    <circle cx="18" cy="9" r="2" />
    <path d="M6 8v8" />
    <path d="M6 12c0-3 4-3 8-3" />
  </svg>
);

export const QueueGlyph = ({ size = 24, ...p }: GlyphProps) => (
  <svg {...base(p, size)}>
    <rect x="3" y="9" width="4" height="6" rx="0.5" />
    <rect x="10" y="9" width="4" height="6" rx="0.5" />
    <rect x="17" y="9" width="4" height="6" rx="0.5" />
  </svg>
);

export const SignalGlyph = ({ size = 24, ...p }: GlyphProps) => (
  <svg {...base(p, size)}>
    <path d="M4 16c2-3 2-7 0-10" strokeLinecap="round" />
    <path d="M8 16c4-4 4-10 0-14" strokeLinecap="round" />
    <circle cx="12" cy="14" r="1.2" fill="currentColor" stroke="none" />
    <path d="M12 14v6" />
  </svg>
);

export const VersionGlyph = ({ size = 24, ...p }: GlyphProps) => (
  <svg {...base(p, size)}>
    <circle cx="12" cy="12" r="8" />
    <path d="M12 8v4l2.5 2.5" strokeLinecap="round" />
  </svg>
);

export const NodeGlyph = ({ size = 24, ...p }: GlyphProps) => (
  <svg {...base(p, size)}>
    <circle cx="12" cy="12" r="3" />
    <circle cx="4" cy="6" r="1.5" />
    <circle cx="20" cy="6" r="1.5" />
    <circle cx="4" cy="18" r="1.5" />
    <circle cx="20" cy="18" r="1.5" />
    <path d="M5 7l4.5 3.5" />
    <path d="M19 7l-4.5 3.5" />
    <path d="M5 17l4.5-3.5" />
    <path d="M19 17l-4.5-3.5" />
  </svg>
);

export const threeSixtyGlyphs = [
  { name: "Agent", Glyph: AgentGlyph, use: "AI agents, autonomous services" },
  { name: "Prompt", Glyph: PromptGlyph, use: "Prompt templates, instructions" },
  { name: "Pipeline", Glyph: PipelineGlyph, use: "Multi-step processing flows" },
  { name: "Run", Glyph: RunGlyph, use: "Execution, trigger, start" },
  { name: "Eval", Glyph: EvalGlyph, use: "Evaluation, scoring, QA" },
  { name: "Handoff", Glyph: HandoffGlyph, use: "Service or agent transfer" },
  { name: "Ship", Glyph: ShipGlyph, use: "Deploy, release, deliver" },
  { name: "Branch", Glyph: BranchGlyph, use: "Variant, version path" },
  { name: "Queue", Glyph: QueueGlyph, use: "Backlog, in-progress lanes" },
  { name: "Signal", Glyph: SignalGlyph, use: "Event, notification, telemetry" },
  { name: "Version", Glyph: VersionGlyph, use: "Build, release timestamp" },
  { name: "Node", Glyph: NodeGlyph, use: "System node, service, primitive" },
];
