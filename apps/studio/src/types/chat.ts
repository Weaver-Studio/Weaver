import type { Id } from "@weaver/backend/convex/_generated/dataModel";

export interface ThreadMetadata {
  id: Id<"threads">;
  title: string;
  updatedAt: bigint;
}

export interface ChatMessage {
  id: string;
  content: string;
  role?: "user" | "assistant";
  threadId?: Id<"threads">;
}