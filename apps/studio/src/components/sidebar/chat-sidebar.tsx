import { useState } from "react";
import { Link, useLocation, useRouter } from "@tanstack/react-router";
import { Button } from "@weaver/ui/components/ui/button";
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
} from "@weaver/ui/components/ui/sidebar";
import { Bot } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@weaver/backend/convex/_generated/api";
import { type Id } from "@weaver/backend/convex/_generated/dataModel";
import { useChatStore } from "@studio/state/chat-store";
import { ThreadMetadata } from "@studio/types/chat";
import { ThreadListItem } from "./thread-list-item";
import { ThreadListSkeleton } from "./sidebar-skeletons";
import { EmptyState } from "./empty-state";
import { usePrefetchThreadMessages } from "@studio/hooks/usePrefetchThreadMessages";

const ChatSidebarContent = () => {
  const paths = useRouter().routesByPath;
  const currentPath = useLocation().pathname;

  const recentThreadsData = useQuery(api.threads.getRecentThreads, {});
  const { setRecentThreads } = useChatStore();
  const [hoveredThreadId, setHoveredThreadId] = useState<Id<"threads"> | null>(null);

  const prefetchMessages = usePrefetchThreadMessages(hoveredThreadId);

  useEffect(() => {
    if (recentThreadsData) {
      setRecentThreads(recentThreadsData);
    }
  }, [recentThreadsData, setRecentThreads]);

  const activeThreadId = useRouter().state.location.currentRouteId === '/chat/$threadId'
    ? useRouter().state.location.params.threadId
    : null;

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

          {recentThreadsData === undefined && (
            <ThreadListSkeleton />
          )}

          {recentThreadsData !== undefined && recentThreadsData.length === 0 && (
            <SidebarMenuItem>
              <EmptyState message="No recent chats" />
            </SidebarMenuItem>
          )}

          {recentThreadsData !== undefined && recentThreadsData.map((thread) => (
            <ThreadListItem
              key={thread.id}
              thread={thread}
              isActive={activeThreadId === thread.id}
              onHover={setHoveredThreadId}
            />
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
};

export default ChatSidebarContent;
