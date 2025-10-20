import { createFileRoute } from "@tanstack/react-router";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@weaver/ui/components/ui/avatar";
import { Button } from "@weaver/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@weaver/ui/components/ui/card";
import { Input } from "@weaver/ui/components/ui/input";
import SidebarLayout from "../components/sidebar/sidebar-layout";

export const Route = createFileRoute("/chat")({
  component: Chat,
});

const dummyMessages = [
  {
    _id: "1",
    author: "John Doe",
    body: "Hey, how are you?",
    avatar: "https://github.com/shadcn.png",
  },
  {
    _id: "2",
    author: "Jane Doe",
    body: "I'm good, thanks! How about you?",
    avatar: "https://github.com/shadcn.png",
  },
  {
    _id: "3",
    author: "John Doe",
    body: "I'm doing great, thanks for asking!",
    avatar: "https://github.com/shadcn.png",
  },
];

function Chat() {
  return (
    <SidebarLayout>
      <div className="flex h-screen items-center justify-center">
        <Card className="h-[80vh] w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Chat</CardTitle>
          </CardHeader>
          <CardContent className="h-[calc(100%-150px)] overflow-y-auto">
            <div className="flex flex-col gap-4">
              {dummyMessages.map((message) => (
                <div className="flex items-start gap-2" key={message._id}>
                  <Avatar>
                    <AvatarImage src={message.avatar} />
                    <AvatarFallback>{message.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="font-semibold">{message.author}</p>
                    <p>{message.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-center gap-2">
              <Input placeholder="Type a message..." />
              <Button>Send</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </SidebarLayout>
  );
}
