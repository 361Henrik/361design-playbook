interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-10">
      <h1 className="font-display text-3xl font-medium tracking-headline leading-section text-primary">
        {title}
      </h1>
      {description && (
        <p className="mt-3 font-body text-base leading-reading text-muted-foreground max-w-prose">
          {description}
        </p>
      )}
    </div>
  );
}
