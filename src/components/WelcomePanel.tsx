import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronRight, Upload, Library, Palette, Sparkles, PanelTop, Download } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const STORAGE_KEY = "welcome_panel_collapsed";

const fallbackActions = [
  { label: "Upload a source", href: "/sources", icon: Upload },
  { label: "Review drafts", href: "/library", icon: Library },
  { label: "Browse tokens", href: "/tokens/colors", icon: Palette },
  { label: "Open Copilot", href: "/copilot", icon: Sparkles },
  { label: "Explore Studio", href: "/studio", icon: PanelTop },
  { label: "Export starter kit", href: "/export", icon: Download },
];

const howItWorks = [
  "Upload sources (brand PDFs, style guides, Figma exports)",
  "Review extracted entries in the Library",
  "Browse and refine design tokens",
  "Set guardrails to enforce brand rules",
  "Compose layouts in Studio with Channel Kits",
  "Export production-ready specs and code",
];

interface WelcomePanelProps {
  onStartTour: () => void;
  onboardingCompleted: boolean;
}

function getInitialCollapsed(onboardingCompleted: boolean): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) return stored === "true";
  } catch {}
  // No explicit user preference — use onboarding state
  return onboardingCompleted;
}

export function WelcomePanel({ onStartTour, onboardingCompleted }: WelcomePanelProps) {
  const [collapsed, setCollapsed] = useState(() => getInitialCollapsed(onboardingCompleted));
  const navigate = useNavigate();

  const handleToggle = (open: boolean) => {
    const isCollapsed = !open;
    setCollapsed(isCollapsed);
    try { localStorage.setItem(STORAGE_KEY, String(isCollapsed)); } catch {}
  };

  return (
    <Collapsible open={!collapsed} onOpenChange={handleToggle} className="border-b border-sidebar-border">
      <CollapsibleTrigger className="flex items-center justify-between w-full px-5 py-3 text-[11px] uppercase tracking-widest text-sidebar-foreground/50 font-body font-medium hover:text-sidebar-foreground/70 transition-colors">
        <span>Welcome</span>
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
      </CollapsibleTrigger>

      <CollapsibleContent className="px-5 pb-4 space-y-4">
        {/* Welcome paragraph */}
        <p className="text-[11px] leading-relaxed text-sidebar-foreground/60 font-body">
          {onboardingCompleted
            ? "Welcome back to Curated Lens — your design system's single source of truth."
            : "Curated Lens is your design system's single source of truth — a system of record for what the brand looks like, and a system of judgment for how it should behave."}
        </p>

        {/* Full content for first-run users only */}
        {!onboardingCompleted && (
          <>
            {/* How it works */}
            <div>
              <p className="text-[10px] uppercase tracking-widest text-sidebar-foreground/40 font-body font-medium mb-1.5">How it works</p>
              <ol className="space-y-0.5">
                {howItWorks.map((step, i) => (
                  <li key={i} className="text-[11px] text-sidebar-foreground/55 font-body flex gap-2">
                    <span className="text-sidebar-foreground/30 font-mono text-[10px] w-3 shrink-0">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Start here */}
            <div>
              <p className="text-[10px] uppercase tracking-widest text-sidebar-foreground/40 font-body font-medium mb-1.5">Start here</p>
              <div className="space-y-0.5">
                {fallbackActions.map((action) => (
                  <button
                    key={action.href}
                    onClick={() => navigate(action.href)}
                    className="flex items-center gap-2 w-full text-[11px] text-sidebar-foreground/60 hover:text-sidebar-foreground font-body py-0.5 transition-colors"
                  >
                    <action.icon className="h-3 w-3 shrink-0" strokeWidth={1.5} />
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Method */}
            <p className="text-[11px] leading-relaxed text-sidebar-foreground/50 font-body italic border-t border-sidebar-border pt-3">
              The operating principle is restraint. Tokens define the boundaries. Components compose within them. Guardrails enforce consistency.
            </p>
          </>
        )}

        {/* Take the tour */}
        <button
          onClick={onStartTour}
          className="text-[11px] text-primary/70 hover:text-primary font-body transition-colors"
        >
          {onboardingCompleted ? "Retake the tour →" : "Take the tour →"}
        </button>
      </CollapsibleContent>
    </Collapsible>
  );
}
