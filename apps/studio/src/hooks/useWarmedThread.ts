import { useQuery, useMutation } from "convex/react";
import { api } from "@weaver/backend/convex/_generated/api";
import { useChatStore } from "@studio/state/chat-store";

export function useWarmedThread() {
  const warmedThreadId = useQuery(api.threads.getWarmedThread);
  const initializeWarmedThreadMutation = useMutation(
    api.threads.initializeWarmedThread
  );
  const swapWarmedThreadMutation = useMutation(api.threads.swapWarmedThread);
  const { warmedThreadId: storedWarmedThreadId, setWarmedThread } =
    useChatStore();

  const ensureWarmedThread = async () => {
    if (warmedThreadId) {
      return warmedThreadId;
    }

    if (!storedWarmedThreadId) {
      try {
        const threadId = await initializeWarmedThreadMutation();
        setWarmedThread(threadId);
        return threadId;
      } catch (error) {
        console.error("Failed to initialize warmed thread:", error);
        throw error;
      }
    }

    return storedWarmedThreadId;
  };

  const swap = async (oldThreadId: string) => {
    try {
      const newThreadId = await swapWarmedThreadMutation({ oldThreadId });
      setWarmedThread(newThreadId);
      return newThreadId;
    } catch (error) {
      console.error("Failed to swap warmed thread:", error);
      throw error;
    }
  };

  return {
    warmedThreadId: warmedThreadId || storedWarmedThreadId,
    ensureWarmedThread,
    swap,
  };
}