import { PageHeader } from "@/components/PageHeader";
import { Circle, Square, Triangle, Star, ArrowRight, Search, Menu, X, Plus, Minus, Check, ChevronDown } from "lucide-react";

const icons = [
  { name: "Circle", icon: Circle },
  { name: "Square", icon: Square },
  { name: "Triangle", icon: Triangle },
  { name: "Star", icon: Star },
  { name: "Arrow Right", icon: ArrowRight },
  { name: "Search", icon: Search },
  { name: "Menu", icon: Menu },
  { name: "Close", icon: X },
  { name: "Plus", icon: Plus },
  { name: "Minus", icon: Minus },
  { name: "Check", icon: Check },
  { name: "Chevron Down", icon: ChevronDown },
];

const TokensIcons = () => {
  return (
    <div className="px-8 py-10 max-w-5xl">
      <PageHeader
        title="Icon System"
        description="Thin stroke (1.5–2px), geometric, no fills, no gradients. Lucide icons aligned with the system's architectural sensibility."
      />

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {icons.map(({ name, icon: Icon }) => (
          <div key={name} className="flex flex-col items-center gap-2 p-4 rounded-md border border-border bg-card">
            <Icon className="h-6 w-6 text-foreground" strokeWidth={1.5} />
            <span className="text-xs font-body text-muted-foreground">{name}</span>
          </div>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="font-display text-xl font-medium tracking-headline leading-section text-foreground mb-4">
          Rules
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-md border-2 border-primary/20 bg-card">
            <p className="text-sm font-body font-medium text-primary mb-2">✓ Do</p>
            <p className="text-sm font-body leading-reading text-muted-foreground">
              Use thin-stroke (1.5–2px) geometric icons. Keep them clean, minimal, and consistent with the editorial tone.
            </p>
          </div>
          <div className="p-5 rounded-md border-2 border-destructive/20 bg-card">
            <p className="text-sm font-body font-medium text-destructive mb-2">✗ Don't</p>
            <p className="text-sm font-body leading-reading text-muted-foreground">
              No filled icons, no gradients on icons, no decorative icon styles. Icons should be functional, not ornamental.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TokensIcons;
