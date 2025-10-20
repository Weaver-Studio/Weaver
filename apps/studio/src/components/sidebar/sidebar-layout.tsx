import { useLocation } from "@tanstack/react-router";
import { SidebarProvider } from "@weaver/ui/components/ui/sidebar";
import type React from "react";
import AppSidebar from "./app-sidebar";

function SidebarLayout({ children }: { children: React.ReactNode }) {
  const pathname = useLocation().pathname;
  return (
    <SidebarProvider>
      <AppSidebar path={pathname} />
      {children}
    </SidebarProvider>
  );
}

export default SidebarLayout;
