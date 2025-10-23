import { useQuery } from "convex/react";
import { api } from "@weaver/backend/convex/_generated/api";
import type { Id } from "@weaver/backend/convex/_generated/dataModel";

export function usePrefetchThreadMessages(threadId: Id<"threads">> | null) {
  return useQuery(
    threadId ? api.messages.getMsgByThreadId : undefined,
    threadId ? { threadId, paginationOpts: { numItems: 50, cursor: null } } : undefined
  );
}