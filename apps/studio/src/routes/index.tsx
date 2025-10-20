import { createFileRoute } from "@tanstack/react-router";
import SidebarLayout from "../components/sidebar/sidebar-layout";

export const Route = createFileRoute("/")({
  component: () => <SidebarLayout>Home</SidebarLayout>,
});
