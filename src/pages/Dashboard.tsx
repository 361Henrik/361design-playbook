import { PageHeader } from "@/components/PageHeader";
import { Palette, Type, Ruler, LayoutGrid, Zap, Hexagon } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  { title: "Colors", description: "Deep Forest Green, Warm White, Antique Bronze — exact values and usage ratios.", icon: Palette, href: "/tokens/colors" },
  { title: "Typography", description: "Playfair Display headlines, Inter body — weights, line-heights, and discipline.", icon: Type, href: "/tokens/typography" },
  { title: "Spacing", description: "Section padding, headline gaps, paragraph spacing ranges.", icon: Ruler, href: "/tokens/spacing" },
  { title: "Layout", description: "Content widths, column control, panel pairings.", icon: LayoutGrid, href: "/tokens/layout" },
  { title: "Motion", description: "UI transitions, hero loops, and prohibited patterns.", icon: Zap, href: "/tokens/motion" },
  { title: "Icons", description: "Thin stroke, geometric, no fills, no gradients.", icon: Hexagon, href: "/tokens/icons" },
];

const Dashboard = () => {
  return (
    <div className="px-8 py-10 max-w-5xl">
      <PageHeader
        title="Design System Hub"
        description="The single source of truth for Curated Lens. Browse tokens, components, and guidelines — all enforced with brand guardrails."
      />

      <section>
        <h2 className="font-display text-xl font-medium tracking-headline leading-section text-foreground mb-6">
          Token Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              to={cat.href}
              className="group block rounded-md border border-border bg-card p-5 transition-colors duration-ui hover:border-primary/30"
            >
              <cat.icon className="h-5 w-5 text-accent mb-3" strokeWidth={1.5} />
              <h3 className="font-display text-base font-medium tracking-headline text-card-foreground">
                {cat.title}
              </h3>
              <p className="mt-1.5 text-sm font-body leading-reading text-muted-foreground">
                {cat.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
