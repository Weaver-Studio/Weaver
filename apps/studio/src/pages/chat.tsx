import { ChatInputPanel } from "@studio/components/chat/chat-input-panel";
import { ChatLayout } from "@studio/components/chat/chat-layout";
import { StreamingMessageView } from "@studio/components/chat/streaming-message-view";
import SidebarLayout from "@studio/components/sidebar/sidebar-layout";
import WelcomeMessage from "@studio/components/welcome-message";
import { useChatStore } from "@studio/state/chat-store";
import { useRouter } from "@tanstack/react-router";
import { api } from "@weaver/backend/convex/_generated/api";
import type { Id } from "@weaver/backend/convex/_generated/dataModel";
import { useSession } from "@weaver/shared/lib/auth-client";
import { useMutation } from "convex/react";
import { useEffect, useState } from "react";
import { useChatStreaming } from "@studio/hooks/useChatStreaming";
import { useWarmedThread } from "@studio/hooks/useWarmedThread";

function Chat() {
  const { data } = useSession();
  const router = useRouter();
  const { warmedThreadId, ensureWarmedThread, swap } = useWarmedThread();
  const createMessageMutation = useMutation(api.messages.create);
  const [text, setText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const { start } = useChatStreaming({
    createMessage: createMessageMutation,
    token: data?.session?.token,
    onComplete: async ({ threadId, aiText }) => {
      try {
        await router.navigate({
          to: "/chat/$threadId",
          params: { threadId },
        });
        swap(threadId);
      } catch (error) {
        console.error("Failed to navigate:", error);
        await router.navigate({
          to: "/chat/$threadId",
          params: { threadId },
        });
      }
    },
    onError: (error) => {
      console.error("Streaming error:", error);
      setIsLoading(false);
    },
  });

  useEffect(() => {
    ensureWarmedThread().catch((error) => {
      console.error("Failed to ensure warmed thread:", error);
    });
  }, [ensureWarmedThread]);

  const handleSendMessage = async (
    message: string,
    model: string,
    thinkingLevel: string
  ) => {
    try {
      const threadId = await ensureWarmedThread();
      setIsLoading(true);
      setText("");

      await createMessageMutation({ threadId, content: message });
      await start({
        threadId,
        userMessage: message,
        model,
        thinkingLevel,
      });
    } catch (error) {
      console.error("Failed to send message:", error);
      setIsLoading(false);
    }
  };

  const handlePromptClick = (prompt: string) => {
    // For now, let's use default model and thinking level for prompts
    handleSendMessage(prompt, "claude-3-opus", "genius");
  };

  return (
    <SidebarLayout>
      <ChatLayout
        input={<ChatInputPanel isLoading={isLoading} onSendMessage={handleSendMessage} />}
      >
        {text || isLoading ? (
          <StreamingMessageView
            streamingText={text}
            isStreaming={isLoading}
          />
        ) : (
          <WelcomeMessage onPromptClick={handlePromptClick} />
        )}
      </ChatLayout>
    </SidebarLayout>
  );
}

export default Chat;
