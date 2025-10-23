import { cn } from "@weaver/ui/lib/utils";

interface EmptyStateProps {
  message: string;
  className?: string;
}

export function EmptyState({ message, className }: EmptyStateProps) {
  return (
    <div className={cn("flex items-center justify-center h-full", className)}>
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}