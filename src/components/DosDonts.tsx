interface DosDontsProps {
  dos: string[];
  donts: string[];
}

export function DosDonts({ dos, donts }: DosDontsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-5 rounded-md border-2 border-primary/20 bg-card">
        <p className="text-sm font-body font-medium text-primary mb-3">✓ Do</p>
        <ul className="space-y-2">
          {dos.map((item, i) => (
            <li key={i} className="text-sm font-body leading-reading text-muted-foreground">
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="p-5 rounded-md border-2 border-destructive/20 bg-card">
        <p className="text-sm font-body font-medium text-destructive mb-3">✗ Don't</p>
        <ul className="space-y-2">
          {donts.map((item, i) => (
            <li key={i} className="text-sm font-body leading-reading text-muted-foreground">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
