import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const slides = [
  {
    title: "Your design system, governed",
    body: "Curated Lens is where brand decisions become enforceable rules. It is not a component library alone — it is a system of record and a system of judgment.",
    cta: "Go to Dashboard",
    href: "/",
  },
  {
    title: "Tokens define. Guardrails enforce.",
    body: "Design tokens capture every visual decision — colors, typography, spacing, motion. Guardrails automatically check that usage stays within bounds.",
    cta: "Browse tokens",
    href: "/tokens/colors",
  },
  {
    title: "Upload. Extract. Approve.",
    body: "Upload brand documents and style guides. The system extracts design entries, flags conflicts, and queues drafts for your review.",
    cta: "Upload a source",
    href: "/sources",
  },
  {
    title: "Design-aware conversation",
    body: "Copilot answers questions grounded in your approved library — not generic advice. Use review sessions to audit code against your system.",
    cta: "Open Copilot",
    href: "/copilot",
  },
  {
    title: "Design in action",
    body: "Channel Kits bundle constraints for specific contexts. Studio lets you compose layouts, swap content variants, run guardrails, and export production specs.",
    cta: "Explore Studio",
    href: "/studio",
  },
];

interface OnboardingTourProps {
  forceOpen?: boolean;
  onClose?: () => void;
  onTourComplete?: () => void;
}

export function OnboardingTour({ forceOpen, onClose, onTourComplete }: OnboardingTourProps) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [dontShow, setDontShow] = useState(false);
  const [checked, setChecked] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Check onboarding_completed on mount
  useEffect(() => {
    if (!user || forceOpen !== undefined) return;
    (async () => {
      const { data } = await supabase
        .from("profiles")
        .select("onboarding_completed")
        .eq("id", user.id)
        .single();
      if (data && !(data as any).onboarding_completed) {
        setOpen(true);
      }
      setChecked(true);
    })();
  }, [user, forceOpen]);

  // Handle forceOpen prop
  useEffect(() => {
    if (forceOpen !== undefined) {
      setOpen(forceOpen);
      if (forceOpen) setCurrent(0);
    }
  }, [forceOpen]);

  const markCompleted = async () => {
    if (!user) return;
    await supabase
      .from("profiles")
      .update({ onboarding_completed: true } as any)
      .eq("id", user.id);
  };

  const handleSkip = async () => {
    await markCompleted();
    setOpen(false);
    onClose?.();
    onTourComplete?.();
  };

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      setOpen(false);
      onClose?.();
    }
  };

  const handleNext = () => {
    if (current < slides.length - 1) setCurrent(current + 1);
  };

  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const handleCta = async () => {
    if (isLast || dontShow) await markCompleted();
    setOpen(false);
    onClose?.();
    if (isLast) onTourComplete?.();
    navigate(slides[current].href);
  };

  const handleFinish = async () => {
    await markCompleted();
    setOpen(false);
    onClose?.();
    onTourComplete?.();
  };

  if (!checked && forceOpen === undefined) return null;

  const slide = slides[current];
  const isLast = current === slides.length - 1;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg p-0 gap-0 border-border">
        {/* Skip button */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-10 text-xs text-muted-foreground hover:text-foreground transition-colors z-10"
        >
          Skip
        </button>

        {/* Slide content */}
        <div className="px-10 pt-14 pb-8 text-center space-y-4">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
            {current + 1} / {slides.length}
          </p>
          <h2 className="font-display text-xl font-medium tracking-tight text-foreground">
            {slide.title}
          </h2>
          <p className="text-sm text-muted-foreground font-body leading-relaxed max-w-sm mx-auto">
            {slide.body}
          </p>
          <div className="pt-2">
            <Button onClick={handleCta} size="sm">
              {slide.cta}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <div className="px-10 pb-6 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={current === 0}
            className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          {/* Dots */}
          <div className="flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  i === current ? "bg-primary" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>

          {isLast ? (
            <button
              onClick={handleFinish}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Done
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Next
            </button>
          )}
        </div>

        {/* Don't show again toggle on last slide */}
        {isLast && (
          <div className="px-10 pb-6 flex items-center justify-center gap-2 border-t border-border pt-4">
            <Switch
              id="dont-show"
              checked={dontShow}
              onCheckedChange={setDontShow}
              className="scale-75"
            />
            <Label htmlFor="dont-show" className="text-[11px] text-muted-foreground cursor-pointer">
              Don't show again
            </Label>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
