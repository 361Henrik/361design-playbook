import { Progress } from "@/components/ui/progress";
import { Loader2, AlertCircle, FileWarning } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReviewProgressProps {
  status: string;
  pagesProcessed?: number | null;
  totalPages?: number | null;
  errorMessage?: string | null;
  onRetry?: () => void;
  onForceExtract?: () => void;
}

export function ReviewProgress({ status, pagesProcessed, totalPages, errorMessage, onRetry, onForceExtract }: ReviewProgressProps) {
  const progressPercent = totalPages && pagesProcessed ? Math.round((pagesProcessed / totalPages) * 100) : 0;

  if (status === "failed") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center max-w-md mx-auto">
        <AlertCircle className="h-10 w-10 text-destructive mb-3" />
        <h3 className="font-display text-lg font-medium text-foreground mb-1">Extraction Failed</h3>
        <p className="text-sm font-body text-muted-foreground mb-4">{errorMessage || "An unknown error occurred."}</p>
        {onRetry && (
          <Button variant="outline" onClick={onRetry} size="sm">Retry</Button>
        )}
      </div>
    );
  }

  if (status === "not_relevant") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center max-w-md mx-auto">
        <FileWarning className="h-10 w-10 text-amber-500 mb-3" />
        <h3 className="font-display text-lg font-medium text-foreground mb-1">Low Relevance</h3>
        <p className="text-sm font-body text-muted-foreground mb-4">
          {errorMessage || "This doesn't appear to be a design document."}
        </p>
        {onForceExtract && (
          <Button variant="outline" onClick={onForceExtract} size="sm">Force Extraction</Button>
        )}
      </div>
    );
  }

  // Processing / pending / partial
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center max-w-sm mx-auto">
      <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
      <h3 className="font-display text-lg font-medium text-foreground mb-2">
        {status === "reviewing" ? "Running guardrail audit…" : "Extracting document…"}
      </h3>
      {totalPages && totalPages > 1 && (
        <>
          <p className="text-sm font-body text-muted-foreground mb-3">
            Page {pagesProcessed || 0} of {totalPages}
          </p>
          <Progress value={progressPercent} className="w-full h-2" />
        </>
      )}
      <p className="text-xs font-body text-muted-foreground mt-3">This may take a moment</p>
    </div>
  );
}
