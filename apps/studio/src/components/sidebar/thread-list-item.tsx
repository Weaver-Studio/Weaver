import { useState, useEffect } from "react";
import { SidebarMenuButton, SidebarMenuItem } from "@weaver/ui/components/ui/sidebar";
import { MessageSquare } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { formatRelativeTime } from "@studio/lib/time";
import type { Id } from "@weaver/backend/convex/_generated/dataModel";
import { ThreadMetadata } from "@studio/types/chat";

interface ThreadListItemProps {
  thread: ThreadMetadata;
  isActive: boolean;
  onHover: (threadId: Id<"threads"> | null) => void;
}

export function ThreadListItem({ thread, isActive, onHover }: ThreadListItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) {
      onHover(thread.id);
    } else {
      onHover(null);
    }
  }, [isHovered, thread.id, onHover]);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link to="/chat/$threadId" params={{ threadId: thread.id }}>
          <MessageSquare size={16} />
          <div className="flex flex-col">
            <span className="truncate">{thread.title}</span>
            <span className="text-xs text-muted-foreground">
              {formatRelativeTime(thread.updatedAt)}
            </span>
          </div>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}