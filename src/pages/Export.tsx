import { PageHeader } from "@/components/PageHeader";

const ExportPage = () => {
  return (
    <div className="px-8 py-10 max-w-5xl">
      <PageHeader
        title="Code Export"
        description="Export tokens as CSS custom properties, Tailwind config, JSON, or TypeScript. Download individual components or the full starter kit."
      />
      <p className="text-sm font-body text-muted-foreground">Export system coming in Milestone 4.</p>
    </div>
  );
};

export default ExportPage;
