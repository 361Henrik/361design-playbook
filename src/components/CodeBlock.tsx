import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "tsx" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative rounded-md border bg-muted/50 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/80">
        <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-body text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-ui"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-primary" strokeWidth={2} />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" strokeWidth={1.5} />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-foreground/90">
        <code>{code}</code>
      </pre>
    </div>
  );
}
