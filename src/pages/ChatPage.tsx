import ChatWindow from '@/components/chat/ChatWindow'
import Sidebar from '@/components/sidebar'

export default function ChatPage() {
    return (
        <div className="relative flex h-full min-h-0 overflow-hidden">
            <Sidebar type="chat" />
            <ChatWindow />
        </div>
    )
}

