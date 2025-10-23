import { SidebarMenuItem, SidebarMenuSkeleton } from "@weaver/ui/components/ui/sidebar";

export function ThreadListSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <SidebarMenuItem key={i}>
          <SidebarMenuSkeleton showIcon={true} />
        </SidebarMenuItem>
      ))}
    </>
  );
}