import { EmptyState } from "@studio/components/sidebar/empty-state";
import { ThreadListSkeleton } from "@studio/components/sidebar/sidebar-skeletons";
import { ThreadListItem } from "@studio/components/sidebar/thread-list-item";
import { usePrefetchThreadMessages } from "@studio/hooks/usePrefetchThreadMessages";
import { groupThreadsByDate } from "@studio/lib/time";
import { useChatStore } from "@studio/state/chat-store";
import { Link, useLocation, useRouter } from "@tanstack/react-router";
import { api } from "@weaver/backend/convex/_generated/api";
import type { Id } from "@weaver/backend/convex/_generated/dataModel";
import { useSession } from "@weaver/shared/lib/auth-client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@weaver/ui/components/ui/avatar";
import { Button } from "@weaver/ui/components/ui/button";
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@weaver/ui/components/ui/sidebar";
import { useQuery } from "convex/react";
import { Bot, Settings } from "lucide-react";
import { useEffect, useState } from "react";

function ChatSidebarContent() {
  const recentThreadsData = useQuery(api.threads., {});
  const { data } = useSession();
  const { setRecentThreads } = useChatStore();
  const router = useRouter();
  const location = useLocation();

  const [hoveredThreadId, setHoveredThreadId] = useState<Id<"threads"> | null>(
    null
  );

  // Prefetch messages on hover
  usePrefetchThreadMessages(hoveredThreadId);

  // Sync fetched threads with chat store
  useEffect(() => {
    if (recentThreadsData) {
      setRecentThreads(recentThreadsData);
    }
  }, [recentThreadsData, setRecentThreads]);

  // Determine active thread ID from router state
  const activeThreadId =
    router.state.location.currentRouteId === "/chat/$threadId"
      ? router.state.location.params.threadId
      : null;

  // Group threads when data is available
  const groupedThreads = recentThreadsData
    ? groupThreadsByDate(recentThreadsData)
    : {};

  const groupings = ["Today", "Yesterday", "This Week", "This Month", "Older"];

  return (
    <>
      {/* Header */}
      <SidebarHeader className="p-4">
        <h1 className="font-semibold text-xl">Weaver Studio</h1>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="p-2">
        <SidebarMenu>
          {/* New Chat Button */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={location.pathname === "/chat"}>
              <Link to="/chat">
                <Bot size={16} />
                <span>New Chat</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Loading State */}
          {recentThreadsData === undefined && <ThreadListSkeleton />}

          {/* Empty State */}
          {recentThreadsData && recentThreadsData.length === 0 && (
            <SidebarMenuItem>
              <EmptyState message="No recent chats" />
            </SidebarMenuItem>
          )}

          {/* Grouped Thread Lists */}
          {recentThreadsData &&
            recentThreadsData.length > 0 &&
            groupings.map((groupName: string) => {
              const threads = groupedThreads[groupName];
              if (!threads || threads.length === 0) return null;

              return (
                <SidebarGroup key={groupName}>
                  <SidebarGroupLabel>{groupName}</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {threads.map((thread) => (
                        <ThreadListItem
                          isActive={activeThreadId === thread.id}
                          key={thread.id}
                          onHover={setHoveredThreadId}
                          thread={thread}
                        />
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              );
            })}
        </SidebarMenu>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="h-fit">
        <SidebarMenuButton className="flex h-fit flex-row items-center justify-between gap-2 p-0 pb-1">
          <div className="flex items-start gap-2">
            <Avatar className="h-11 w-11">
              <AvatarImage src={data?.user.image || undefined} />
              <AvatarFallback>{data?.user.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col pt-1">
              <span className="font-semibold text-base">
                {data?.user.name || "User"}
              </span>
              <span className="text-neutral-400 text-sm">
                {data?.user.email || ""}
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
    </>
  );
}

export default ChatSidebarContent;
