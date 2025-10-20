import { Link, useLocation, useRouter } from "@tanstack/react-router";
import { Button } from "@weaver/ui/components/ui/button";
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@weaver/ui/components/ui/sidebar";
import {
  Home,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  VideoIcon,
  Workflow,
} from "lucide-react";

const HomeSidebarContent = () => {
  const currentPath = useLocation().pathname;
  const paths = useRouter().routesByPath;

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
            <SidebarMenuButton
              asChild
              isActive={paths["/"].fullPath === currentPath}
            >
              <Link to="/">
                <Home size={16} />
                Home
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={paths["/dashboard"].fullPath === currentPath}
            >
              <Link to="/dashboard">
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={paths["/chat"].fullPath === currentPath}
            >
              <Link to="/chat">
                <MessageSquare size={16} />
                Chat
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={paths["/image-studio"].fullPath === currentPath}
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
              isActive={paths["/video-studio"].fullPath === currentPath}
            >
              <Link to="/video-studio">
                <VideoIcon size={16} />
                Video Studio
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={paths["/workflow"].fullPath === currentPath}
            >
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

export default HomeSidebarContent;
