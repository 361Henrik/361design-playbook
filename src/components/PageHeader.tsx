interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-space-8">
      <h1 className="font-display text-h1 tracking-headline leading-heading text-foreground">
        {title}
      </h1>
      {description && (
        <p className="mt-space-3 font-body text-body-lg leading-reading text-foreground max-w-prose">
          {description}
        </p>
      )}
    </div>
  );
}
