import { Link, useSearchParams } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { categories, getComponentsByCategory } from "@/data/componentRegistry";
import { ArrowRight } from "lucide-react";

const ComponentsPage = () => {
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get("category");

  return (
    <div className="px-space-5 md:px-space-8 py-space-8 max-w-content">
      <PageHeader
        title="Component Catalog"
        description="A browsable registry of approved components, each with live previews, usage guidance, and exportable code."
      />

      {!activeCategory ? (
        /* Category grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => {
            const count = getComponentsByCategory(cat.id).length;
            return (
              <Link key={cat.id} to={`/components?category=${cat.id}`}>
                <Card className="h-full hover:border-primary/30 transition-colors duration-ui cursor-pointer group">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{cat.icon}</span>
                      <Badge variant="secondary" className="font-mono text-[10px]">
                        {count}
                      </Badge>
                    </div>
                    <CardTitle className="text-base group-hover:text-primary transition-colors duration-ui">
                      {cat.label}
                    </CardTitle>
                    <CardDescription className="text-xs leading-reading">
                      {cat.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      ) : (
        /* Category detail */
        <CategoryView categoryId={activeCategory} />
      )}
    </div>
  );
};

function CategoryView({ categoryId }: { categoryId: string }) {
  const category = categories.find((c) => c.id === categoryId);
  const items = getComponentsByCategory(categoryId);

  if (!category) {
    return <p className="text-sm font-body text-muted-foreground">Category not found.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm font-body">
        <Link to="/components" className="text-muted-foreground hover:text-foreground transition-colors">
          Components
        </Link>
        <span className="text-muted-foreground/50">/</span>
        <span className="text-foreground font-medium">{category.label}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((comp) => (
          <Link key={comp.id} to={`/components/${comp.id}`}>
            <Card className="h-full hover:border-primary/30 transition-colors duration-ui cursor-pointer group">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm group-hover:text-primary transition-colors duration-ui flex items-center justify-between">
                  {comp.name}
                  <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
                </CardTitle>
                <CardDescription className="text-xs leading-reading">
                  {comp.description.slice(0, 120)}{comp.description.length > 120 ? "…" : ""}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="rounded border bg-background p-4 flex items-center justify-center min-h-[80px] overflow-hidden">
                  <div className="scale-75 pointer-events-none">
                    {comp.preview()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ComponentsPage;
