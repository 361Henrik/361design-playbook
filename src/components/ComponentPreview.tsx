import { ReactNode } from "react";

interface ComponentPreviewProps {
  children: ReactNode;
  label?: string;
  variant?: "light" | "dark";
}

export function ComponentPreview({ children, label, variant = "light" }: ComponentPreviewProps) {
  return (
    <div className="rounded-md border overflow-hidden">
      {label && (
        <div className="px-4 py-2 border-b bg-muted/40">
          <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
            {label}
          </span>
        </div>
      )}
      <div
        className={`p-8 flex items-center justify-center min-h-[120px] ${
          variant === "dark" ? "bg-primary text-primary-foreground" : "bg-background"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
