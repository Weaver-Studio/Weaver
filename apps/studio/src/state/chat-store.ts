import type { ChatMessage, ThreadMetadata } from "@studio/types/chat";
import type { Id } from "@weaver/backend/convex/_generated/dataModel";
import { create } from "zustand";

type chatStore = {
  model: string;
  messages: ChatMessage[];
  currentThreadId: Id<"threads"> | null;
  warmedThreadId: Id<"threads"> | null;
  recentThreads: ThreadMetadata[];
  setModel: (model: string) => void;
  addMessage: (message: ChatMessage) => void;
  clearMessages: () => void;
  setCurrentThread: (threadId: Id<"threads"> | null) => void;
  setWarmedThread: (threadId: Id<"threads"> | null) => void;
  setRecentThreads: (threads: ThreadMetadata[]) => void;
  initializeWarmedThread: (
    mutationFn: () => Promise<Id<"threads">>
  ) => Promise<Id<"threads">>;
};

export const useChatStore = create<chatStore>((set) => ({
  model: "",
  messages: [],
  currentThreadId: null,
  warmedThreadId: null,
  recentThreads: [],
  setModel: (model: string) => set({ model }),
  addMessage: (message: ChatMessage) =>
    set((state) => ({ messages: [...state.messages, message] })),
  clearMessages: () => set({ messages: [] }),
  setCurrentThread: (threadId: Id<"threads"> | null) =>
    set({ currentThreadId: threadId }),
  setWarmedThread: (threadId: Id<"threads"> | null) =>
    set({ warmedThreadId: threadId }),
  setRecentThreads: (threads: ThreadMetadata[]) =>
    set({ recentThreads: threads }),
  initializeWarmedThread: async (mutationFn: () => Promise<Id<"threads">>) => {
    const threadId = await mutationFn();
    set({ warmedThreadId: threadId });
    return threadId;
  },
}));
