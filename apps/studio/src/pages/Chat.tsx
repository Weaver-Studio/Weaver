import { Avatar, AvatarFallback, AvatarImage } from "@studio/components/ui/avatar";
import { Button } from "@studio/components/ui/button";
import { Input } from "@studio/components/ui/input";
import { Paperclip, Send } from "lucide-react";

export default function ChatPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col gap-4">
          {/* Chat messages will go here */}
          <div className="flex items-start gap-4">
            <Avatar>
              <AvatarImage src="/avatars/bot.jpg" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div className="rounded-lg bg-muted p-4">
              <p>Hello! How can I help you today?</p>
            </div>
          </div>
          <div className="flex items-start gap-4 justify-end">
            <div className="rounded-lg bg-primary text-primary-foreground p-4">
              <p>I need help with my account.</p>
            </div>
            <Avatar>
              <AvatarImage src="/avatars/user.jpg" />
              <AvatarFallback>You</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
      <div className="p-4 border-t">
        <div className="relative">
          <Input placeholder="Type your message..." className="pr-16" />
          <div className="absolute top-1/2 right-2 -translate-y-1/2 flex gap-2">
            <Button variant="ghost" size="icon">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
