import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyButtonProps {
  value: string;
  label?: string;
}

export function CopyButton({ value, label }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-body text-foreground hover:bg-secondary transition-colors duration-ui"
      title={`Copy ${label || value}`}
    >
      {copied ? (
        <Check className="h-3 w-3 text-primary" strokeWidth={2} />
      ) : (
        <Copy className="h-3 w-3" strokeWidth={1.5} />
      )}
      <code className="font-mono">{label || value}</code>
    </button>
  );
}
