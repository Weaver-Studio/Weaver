import { Link, useLocation, useRouter } from "@tanstack/react-router";
import { Button } from "@weaver/ui/components/ui/button";
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@weaver/ui/components/ui/sidebar";
import { Bot } from "lucide-react";

const ChatSidebarContent = () => {
  const paths = useRouter().routesByPath;
  const currentPath = useLocation().pathname;

  return (
    <>
      <SidebarHeader>
        <Button asChild className="font-semibold text-lg" variant="link">
          <Link to="/chat">Chat</Link>
        </Button>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={paths["/chat"].fullPath === currentPath}
            >
              <Link to="/chat">
                <Bot size={16} />
                New Chat
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </>
  );
};

export default ChatSidebarContent;
