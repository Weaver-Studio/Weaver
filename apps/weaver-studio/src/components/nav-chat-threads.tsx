import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { MessageSquare } from "lucide-react";

const chatThreads = [
  { id: 1, title: "Chat with AI about project A" },
  { id: 2, title: "Customer support inquiry" },
  { id: 3, title: "Brainstorming session" },
];

export function NavChatThreads() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Chats</SidebarGroupLabel>
      <SidebarMenu>
        {chatThreads.map((thread) => (
          <SidebarMenuItem key={thread.id}>
            <SidebarMenuButton>
              <MessageSquare className="h-4 w-4" />
              <span>{thread.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
