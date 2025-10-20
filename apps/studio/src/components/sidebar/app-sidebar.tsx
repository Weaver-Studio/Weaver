import { useSidebarStore } from "@studio/state/store";
import { Link, useRouterState } from "@tanstack/react-router";
import { useSession } from "@weaver/shared/lib/auth-client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@weaver/ui/components/ui/avatar";
import { Button } from "@weaver/ui/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@weaver/ui/components/ui/sidebar";
import { Authenticated } from "convex/react";
import {
  Bot,
  Home,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Settings,
  VideoIcon,
  Workflow,
} from "lucide-react";

const DefaultSidebar = () => {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  return (
    <>
      <SidebarHeader>
        <Button asChild className="font-semibold text-lg" variant="link">
          <Link to="/">Weaver Studio</Link>
        </Button>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={currentPath === "/"}>
              <Link to="/">
                <Home size={16} />
                Home
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={currentPath === "/dashboard"}>
              <Link to="/dashboard">
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={currentPath === "/chat"}>
              <Link to="/chat">
                <MessageSquare size={16} />
                Chat
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={currentPath === "/image-studio"}
            >
              <Link to="/image-studio">
                <ImageIcon size={16} />
                Image Studio
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={currentPath === "/video-studio"}
            >
              <Link to="/video-studio">
                <VideoIcon size={16} />
                Video Studio
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={currentPath === "/workflow"}>
              <Link to="/workflow">
                <Workflow size={16} />
                Workflows
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </>
  );
};

const ChatSidebar = () => {
  const router = useRouterState();
  const currentPath = router.location.pathname;

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
            <SidebarMenuButton asChild isActive={currentPath === "/chat"}>
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

function AppSidebar() {
  const { sidebarState } = useSidebarStore();
  const { data } = useSession();

  return (
    <Authenticated>
      <Sidebar>
        {sidebarState === "default" && <DefaultSidebar />}
        {sidebarState === "chat" && <ChatSidebar />}
        <SidebarFooter className="h-fit">
          <SidebarMenuButton className="flex h-fit flex-row items-center justify-between gap-2 p-0 pb-1">
            <div className="flex items-start gap-2">
              <Avatar className="h-11 w-11">
                <AvatarImage src={data?.user.image as string} />
                <AvatarFallback>{data?.user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col pt-1">
                <span className="font-semibold text-base">
                  {data?.user.name}
                </span>
                <span className="text-neutral-400 text-sm">
                  {data?.user.email}
                </span>
              </div>
            </div>
            <Button asChild size="icon" variant="ghost">
              <Link to="/settings">
                <Settings size={16} />
              </Link>
            </Button>
          </SidebarMenuButton>
        </SidebarFooter>
      </Sidebar>
    </Authenticated>
  );
}

export default AppSidebar;
