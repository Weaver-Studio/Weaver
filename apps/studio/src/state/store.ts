import { create } from "zustand";

type SidebarState = "default" | "chat";

interface SidebarStore {
  sidebarState: SidebarState;
  setSidebarState: (state: SidebarState) => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  sidebarState: "default",
  setSidebarState: (state) => set({ sidebarState: state }),
}));
