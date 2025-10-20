import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@weaver/ui/components/ui/sidebar";

function AppSidebar() {
  return (
    <Sidebar className="">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>Weaver Studio</SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent />
      <SidebarFooter>
        <SidebarFooter />
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
