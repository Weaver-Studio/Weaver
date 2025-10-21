import { customFetch } from "@studio/api/cutom-fetch";
import { ChatInputPanel } from "@studio/components/chat/chat-input-panel";
import SidebarLayout from "@studio/components/sidebar/sidebar-layout";
import WelcomeMessage from "@studio/components/welcome-message";
import { useSession } from "@weaver/shared/lib/auth-client";
import { useState } from "react";

function Chat() {
  const { data } = useSession();
  const [text, setText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  async function newChat({
    data,
    inputValue,
    model,
    thinkingLevel,
  }: {
    data: any;
    inputValue: string;
    model: string;
    thinkingLevel: string;
  }) {
    setIsLoading(true);
    setText("");
    const response = await customFetch({
      token: data?.session?.token as string,
      method: "POST",
      path: "chat",
      body: JSON.stringify({ message: inputValue, model, thinkingLevel }),
    });

    const textDecoder = new TextDecoder();

    if (response.body === null) {
      console.log("null");
      setIsLoading(false);
      return;
    }
    const reader = response.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        console.log("done", done);
        setIsLoading(false);
        return;
      }
      setText((prevtext) => prevtext + textDecoder.decode(value));
    }
  }

  const handleSendMessage = (
    message: string,
    model: string,
    thinkingLevel: string
  ) => {
    newChat({
      data,
      inputValue: message,
      model,
      thinkingLevel,
    });
  };

  const handlePromptClick = (prompt: string) => {
    // For now, let's use default model and thinking level for prompts
    handleSendMessage(prompt, "claude-3-opus", "genius");
  };

  return (
    <SidebarLayout>
      <div className="flex h-screen w-full flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          {text || isLoading ? (
            <div className="flex flex-col gap-4">
              <div className="mb-4 rounded-lg bg-muted p-4">
                <p>
                  {text}
                  {isLoading && !text ? "Thinking..." : ""}
                </p>
              </div>
            </div>
          ) : (
            <WelcomeMessage onPromptClick={handlePromptClick} />
          )}
        </div>
        <ChatInputPanel
          isLoading={isLoading}
          onSendMessage={handleSendMessage}
        />
      </div>
    </SidebarLayout>
  );
}

export default Chat;
<ChatInputPanel isLoading={isLoading} onSendMessage={handleSendMessage} />;
</div>
    </SidebarLayout>
  )
}

export default Chat;
