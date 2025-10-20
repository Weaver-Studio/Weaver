import { Link, useRouter } from "@tanstack/react-router";
import { useSession } from "@weaver/shared/lib/auth-client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@weaver/ui/components/ui/avatar";
import { Button } from "@weaver/ui/components/ui/button";
import {
  Sidebar,
  SidebarFooter,
  SidebarMenuButton,
} from "@weaver/ui/components/ui/sidebar";
import { Authenticated } from "convex/react";
import { Settings } from "lucide-react";
import ChatSidebarContent from "./chat-sidebar";
import HomeSidebarContent from "./home-sidebar";

function AppSidebar({ path }: { path: string }) {
  const paths = useRouter().routesByPath;
  const { data } = useSession();

  return (
    <Authenticated>
      <Sidebar>
        {path === paths["/"]?.fullPath && <HomeSidebarContent />}
        {path === paths["/chat"]?.fullPath && <ChatSidebarContent />}
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
