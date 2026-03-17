import { Link, useParams } from "react-router-dom";
import { getComponentById, getCategoryById } from "@/data/componentRegistry";
import { ComponentPreview } from "@/components/ComponentPreview";
import { CodeBlock } from "@/components/CodeBlock";
import { DosDonts } from "@/components/DosDonts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const ComponentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const component = id ? getComponentById(id) : undefined;

  if (!component) {
    return (
      <div className="px-8 py-10 max-w-5xl">
        <p className="text-sm font-body text-muted-foreground">Component not found.</p>
        <Link to="/components" className="text-sm font-body text-primary hover:underline mt-2 inline-block">
          ← Back to catalog
        </Link>
      </div>
    );
  }

  const category = getCategoryById(component.category);

  return (
    <div className="px-8 py-10 max-w-5xl space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm font-body">
        <Link to="/components" className="text-muted-foreground hover:text-foreground transition-colors">
          Components
        </Link>
        <span className="text-muted-foreground/50">/</span>
        {category && (
          <>
            <Link
              to={`/components?category=${category.id}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {category.label}
            </Link>
            <span className="text-muted-foreground/50">/</span>
          </>
        )}
        <span className="text-foreground font-medium">{component.name}</span>
      </nav>

      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <h1 className="font-display text-3xl font-medium tracking-headline leading-section text-foreground">
            {component.name}
          </h1>
          {category && (
            <Badge variant="bronze" className="text-xs font-body">
              {category.label}
            </Badge>
          )}
        </div>
        <p className="font-body text-base leading-reading text-muted-foreground max-w-prose">
          {component.description}
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="preview" className="w-full">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="guidance">Guidance</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="mt-6 space-y-6">
          <ComponentPreview label="Live Preview">
            {component.preview()}
          </ComponentPreview>

          {component.anatomy && (
            <div className="space-y-2">
              <h3 className="font-display text-sm font-medium text-foreground">Anatomy</h3>
              <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose">
                {component.anatomy}
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="code" className="mt-6">
          <CodeBlock code={component.code} />
        </TabsContent>

        <TabsContent value="guidance" className="mt-6 space-y-8">
          <DosDonts dos={component.dos} donts={component.donts} />

          {component.accessibilityNotes && (
            <div className="space-y-2">
              <h3 className="font-display text-sm font-medium text-foreground">Accessibility</h3>
              <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose">
                {component.accessibilityNotes}
              </p>
            </div>
          )}

          {component.responsiveNotes && (
            <div className="space-y-2">
              <h3 className="font-display text-sm font-medium text-foreground">Responsive Behavior</h3>
              <p className="text-sm font-body leading-reading text-muted-foreground max-w-prose">
                {component.responsiveNotes}
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComponentDetailPage;
