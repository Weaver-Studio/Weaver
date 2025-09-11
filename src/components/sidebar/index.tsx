import ChatSidebar from "./ChatSidebar";

interface SidebarProps {
	type: "chat" | "workspace"
}

export default function Sidebar({ type }: SidebarProps) {
	switch (type) {
		case "chat":
			return (<ChatSidebar />)
		case "workspace":
			return (<></>)
	}
}