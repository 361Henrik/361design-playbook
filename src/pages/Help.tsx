import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { OnboardingTour } from "@/components/OnboardingTour";
import { RotateCcw, Upload, Library, Palette, ShieldCheck, PanelTop, Download } from "lucide-react";

const quickstartSteps = [
  { step: "Upload a source", description: "Go to Sources and upload a brand PDF, style guide, or Figma export.", href: "/sources", icon: Upload },
  { step: "Review drafts", description: "Visit the Library to approve, reject, or resolve extracted entries.", href: "/library", icon: Library },
  { step: "Browse tokens", description: "Explore Colors, Typography, Spacing, and more.", href: "/tokens/colors", icon: Palette },
  { step: "Set guardrails", description: "Define enforcement rules for consistency.", href: "/guardrails", icon: ShieldCheck },
  { step: "Compose in Studio", description: "Build layouts with Channel Kits.", href: "/studio", icon: PanelTop },
  { step: "Export", description: "Generate production-ready specs and code.", href: "/export", icon: Download },
];

const glossary = [
  { term: "Token", definition: "A named design decision (color, spacing, font size, motion curve) stored as a reusable value." },
  { term: "Guideline", definition: "A written rule or recommendation for how to apply design decisions consistently." },
  { term: "Component", definition: "A reusable UI element defined with props, variants, and usage rules." },
  { term: "Guardrail", definition: "An automated check that validates whether usage conforms to the design system." },
  { term: "Kit", definition: "A channel-specific bundle of tokens, components, tone modifiers, and guardrail profiles." },
  { term: "Variant", definition: "A content alternative for a specific slot type (headline, body, CTA) within a template." },
  { term: "Template", definition: "A layout composition within a Kit that defines slot positions and component structure." },
  { term: "Canonical", definition: "The authoritative version of a library entry, marked as the single source of truth." },
  { term: "Voice Token", definition: "A linguistic rule (brand pillar, prohibited pattern, CTA style) that governs written content." },
  { term: "Slot", definition: "A named placeholder in a template where content variants are inserted." },
  { term: "Source", definition: "An uploaded document (PDF, style guide, Figma export) from which design entries are extracted." },
  { term: "Library Entry", definition: "A single piece of design knowledge extracted from a source, with status tracking and version history." },
];

const faqItems = [
  { q: "My uploaded source shows 'failed'", a: "Check the file format — we support PDF, images, and text files. Try re-uploading. If the issue persists, contact your workspace admin." },
  { q: "Search returns low-relevance results", a: "The library needs more approved entries to improve relevance. Try broader search terms, or upload additional source material." },
  { q: "I see a 'conflict' status on a library entry", a: "Two sources produced contradicting entries. Open the entry in the Library, review both versions, and resolve by approving the correct one." },
  { q: "How do I change a token value?", a: "For voice tokens, edit them directly on the Voice page. For visual tokens, update the source material and re-extract, or edit the library entry." },
  { q: "Exports look different from the Studio preview", a: "Studio uses template renderers for preview. Exported code may need framework-specific adjustments. Check the export format settings." },
];

export default function Help() {
  const [tourOpen, setTourOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="px-space-5 md:px-space-8 py-space-8 max-w-content space-y-space-8">
      <div className="flex items-start justify-between">
        <PageHeader title="Help" description="Quickstart guides, glossary, and answers to common questions." />
        <Button variant="outline" size="sm" onClick={() => setTourOpen(true)} className="shrink-0 mt-1">
          <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
          Restart tour
        </Button>
      </div>

      {/* Quickstart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-display">Quickstart</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3">
            {quickstartSteps.map((s, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-xs font-mono text-muted-foreground w-4 shrink-0 pt-0.5">{i + 1}.</span>
                <s.icon className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <button onClick={() => navigate(s.href)} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                    {s.step}
                  </button>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {/* Glossary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-display">Glossary</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-3">
            {glossary.map((g) => (
              <div key={g.term}>
                <dt className="text-sm font-medium text-foreground">{g.term}</dt>
                <dd className="text-xs text-muted-foreground mt-0.5">{g.definition}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-display">FAQ</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-sm text-left">{item.q}</AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <OnboardingTour forceOpen={tourOpen} onClose={() => setTourOpen(false)} />
    </div>
  );
}
