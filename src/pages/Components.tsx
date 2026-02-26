import { PageHeader } from "@/components/PageHeader";

const ComponentsPage = () => {
  return (
    <div className="px-8 py-10 max-w-5xl">
      <PageHeader
        title="Component Catalog"
        description="A browsable registry of approved components, each with live previews, usage guidance, and exportable code."
      />
      <p className="text-sm font-body text-muted-foreground">Component catalog coming in Milestone 3.</p>
    </div>
  );
};

export default ComponentsPage;
