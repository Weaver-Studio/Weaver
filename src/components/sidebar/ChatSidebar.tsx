import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Sparkles } from "lucide-react"
import { useNavigate, useRouter } from "@tanstack/react-router"

export default function ChatSidebar() {
    const navigate = useNavigate()
    const router = useRouter()
    const pathname = router.state.location.pathname
    const activeId = pathname.startsWith("/chat/") ? pathname.split("/")[2] : undefined

    return (
        <aside className="relative hidden h-svh w-72 shrink-0 px-3 py-4 md:flex">
            {/* No sidebar background per request */}

            <div className="relative z-10 flex h-full w-full flex-col gap-2">
                {/* Header */}
                <div className="flex items-center justify-between px-1 pb-2">
                    <div className="flex items-center gap-2 text-sm font-semibold tracking-tight">
                        <Sparkles className="size-4 text-yellow-400/80" />
                        <span className="text-foreground/90">T3.chat</span>
                    </div>
                </div>

                {/* New Chat */
                }
                <Button
                    onClick={() => {
                        const id = `local_${Date.now()}`
                        navigate({ to: "/chat/$threadId", params: { threadId: id } })
                    }}
                    className="w-full rounded-xl bg-[linear-gradient(180deg,_oklch(0.76_0.17_95/_0.95),_oklch(0.68_0.15_95/_0.95))] text-black shadow-lg hover:brightness-110 focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                    <Plus className="mr-2 size-4" />
                    New Chat
                </Button>

                {/* Search */}
                <div className="relative mt-2">
                    <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-foreground/60" />
                    <Input placeholder="Search your threads..." className="h-9 rounded-lg pl-9 bg-white/5 border-none text-foreground/80 placeholder:text-foreground/50 focus-visible:ring-0 focus-visible:ring-offset-0" />
                </div>

                {/* Threads */}
                <div className="mt-2 flex-1 overflow-auto">
                    <div className="pl-2 text-[11px] font-semibold uppercase tracking-wide text-foreground/50">Last 30 Days</div>
                    <div className="mt-2 space-y-1">
                        {mockThreads.map((t) => {
                            const active = activeId === t.id
                            return (
                                <button
                                    key={t.id}
                                    onClick={() => navigate({ to: "/chat/$threadId", params: { threadId: t.id } })}
                                    className={`w-full h-9 rounded-xl px-3 text-left text-sm font-medium transition-colors ${active ? "bg-white/10 text-white" : "text-foreground/90 hover:bg-white/10"}`}
                                >
                                    <span className="truncate block">{t.title}</span>
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-2">
                    <div className="mx-1 mb-1 mt-1 flex items-center gap-2 rounded-xl bg-white/5 p-2 shadow-md backdrop-blur-sm">
                        <div className="relative">
                            <div className="size-7 rounded-full bg-white/10 shadow-inner" />
                            <span className="absolute -bottom-0.5 -right-0.5 block size-2 rounded-full bg-green-500" />
                        </div>
                        <div className="flex min-w-0 flex-col leading-tight">
                            <span className="truncate text-xs font-medium text-foreground/90">Solomon</span>
                            <span className="truncate text-[10px] text-foreground/60">Free</span>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}

const mockThreads = [
    { id: "1", title: "Research: LLM routing strategies" },
    { id: "2", title: "Debug: embeddings drift investigation" },
    { id: "3", title: "Write spec for Chat Studio MVP" },
]
