import { cn } from "@weaver/ui/lib/utils";
import { ChatMessage } from "@studio/types/chat";

interface StreamingMessageViewProps {
  userMessage?: string;
  streamingText?: string;
  isStreaming?: boolean;
  className?: string;
}

export function StreamingMessageView({
  userMessage,
  streamingText,
  isStreaming,
  className,
}: StreamingMessageViewProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {userMessage && (
        <div className="mb-4 rounded-lg bg-muted p-4">
          <p>{userMessage}</p>
        </div>
      )}
      {isStreaming && (
        <div className="mb-4 rounded-lg bg-muted p-4">
          <p>{streamingText || "Thinking..."}</p>
        </div>
      )}
    </div>
  );
}