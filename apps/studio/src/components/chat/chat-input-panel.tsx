import { Button } from "@weaver/ui/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@weaver/ui/components/ui/select";
import { Textarea } from "@weaver/ui/components/ui/textarea";
import { useEffect, useRef, useState } from "react";

type ChatInputPanelProps = {
  onSendMessage: (
    message: string,
    model: string,
    thinkingLevel: string
  ) => void;
  isLoading: boolean;
};

export function ChatInputPanel({
  onSendMessage,
  isLoading,
}: ChatInputPanelProps) {
  const [inputValue, setInputValue] = useState("");
  const [model, setModel] = useState("claude-3-opus");
  const [thinkingLevel, setThinkingLevel] = useState("genius");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue, model, thinkingLevel);
      setInputValue("");
    }
  };

  return (
    <div className="border-t bg-background p-4">
      <div className="relative">
        <Textarea
          className="max-h-60 min-h-[40px] w-full resize-none pr-16"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Type your message..."
          ref={textareaRef}
          rows={1}
          value={inputValue}
        />
        <Button
          className="absolute top-4 right-4"
          disabled={!inputValue.trim() || isLoading}
          onClick={handleSend}
          type="submit"
        >
          Send
        </Button>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="flex gap-2">
          <Select onValueChange={setModel} value={model}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
              <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
              <SelectItem value="gemini-1.5-pro">Gemini 1.5 Pro</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={setThinkingLevel} value={thinkingLevel}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Thinking Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="genius">Genius</SelectItem>
              <SelectItem value="expert">Expert</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
