import { useMutation } from "convex/react";
import { api } from "@weaver/backend/convex/_generated/api";
import { streamChat } from "@studio/api/llm-client";
import { useRef, useState } from "react";
import type { Id } from "@weaver/backend/convex/_generated/dataModel";

interface UseChatStreamingOptions {
  createMessage: (message: { threadId: Id<"threads">; content: string }) => Promise<void>;
  token: string | undefined;
  onComplete?: ({ threadId, aiText }: { threadId: Id<"threads">; aiText: string }) => void;
  onError?: (error: Error) => void;
}

interface StartStreamingOptions {
  threadId: Id<"threads">;
  userMessage: string;
  model: string;
  thinkingLevel: string;
}

export function useChatStreaming({
  createMessage,
  token,
  onComplete,
  onError
}: UseChatStreamingOptions) {
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const abortControllerRef = useRef<AbortController | null>(null);

  const start = async ({
    threadId,
    userMessage,
    model,
    thinkingLevel,
  }: StartStreamingOptions) => {
    if (!token) {
      const error = new Error("Auth token is required for streaming");
      onError?.(error);
      return;
    }

    try {
      // Save user message
      await createMessage({ threadId, content: userMessage });

      setIsStreaming(true);
      setStreamingText("");
      abortControllerRef.current = new AbortController();

      const response = await streamChat({
        token,
        message: userMessage,
        model,
        thinkingLevel,
        signal: abortControllerRef.current.signal,
      });

      if (response.body === null) {
        throw new Error("Response body is null");
      }

      const textDecoder = new TextDecoder();
      const reader = response.body.getReader();
      let accumulatedText = "";

      while (true) {
        if (abortControllerRef.current?.signal.aborted) {
          console.log("Stream aborted");
          break;
        }

        const { done, value } = await reader.read();
        if (done) {
          // Save accumulated text if any
          if (accumulatedText.trim().length > 0) {
            await createMessage({ threadId, content: accumulatedText });
          }
          break;
        }

        const chunk = textDecoder.decode(value);
        accumulatedText += chunk;
        setStreamingText(accumulatedText);
      }

      // Call onComplete callback if provided
      onComplete?.({ threadId, aiText: accumulatedText });

    } catch (error) {
      console.error("Error during streaming:", error);
      onError?.(error as Error);
    } finally {
      setIsStreaming(false);
      setStreamingText("");
      abortControllerRef.current = null;
    }
  };

  const abort = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsStreaming(false);
      setStreamingText("");
      abortControllerRef.current = null;
    }
  };

  const reset = () => {
    setIsStreaming(false);
    setStreamingText("");
    abortControllerRef.current = null;
  };

  return {
    isStreaming,
    start,
    abort,
    streamingText,
    reset,
  };
}