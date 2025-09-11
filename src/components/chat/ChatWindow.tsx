import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Mic, Paperclip, Search, ArrowUp, Settings, ChevronDown, Bot } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useNavigate, useRouter } from "@tanstack/react-router"

export default function ChatWindow() {
	const navigate = useNavigate()
	const router = useRouter()
	const pathname = router.state.location.pathname
	const inThread = pathname.startsWith("/chat/")
	const compose = (router.state.location.search as any)?.compose as string | undefined

	const [messages, setMessages] = useState<Msg[]>(demo)
	const [value, setValue] = useState("")
	const composerRef = useRef<HTMLTextAreaElement | null>(null)
	const suggestions = [
		"Summarize a link",
		"Draft a product spec",
		"Plan a weekend trip",
		"Explain this code",
	]

	useEffect(() => {
		if (compose && !value) {
			setValue(compose)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [compose])

	const onSend = () => {
		if (!value.trim()) return
		// If we're not in a thread route yet, create a local draft and navigate with the typed text
		if (!inThread) {
			const id = `local_${Date.now()}`
			navigate({ to: "/chat/$threadId", params: { threadId: id }, search: { compose: value.trim() } })
			return
		}
		const next: Msg = { id: String(Date.now()), role: "user", text: value.trim() }
		setMessages((m) => [...m, next, { id: String(Date.now() + 1), role: "assistant", text: "Thanks! I'll process that." }])
		setValue("")
	}

	return (
		<div className="relative flex flex-1 min-h-0 flex-col overflow-hidden">

			{/* Glass pane wrapper */}
			<div className="relative z-10 flex h-full flex-1 min-h-0 flex-col overflow-hidden rounded-3xl bg-white/5 p-0 backdrop-blur-2xl shadow-2xl dark:bg-black/10">
				{/* Header */}
				<div className="flex items-center justify-between px-6 py-4 shadow-[inset_0_-1px_0_rgba(255,255,255,0.05)]">
					<div className="flex items-center gap-3">
						<div className="size-2 rounded-full bg-green-400 shadow-sm" />
						<span className="text-sm font-medium text-foreground/90">AI Assistant</span>
					</div>
					<div className="flex items-center gap-1.5">
						<Tooltip>
							<TooltipTrigger asChild>
								<Button size="icon" variant="ghost" className="h-8 w-8 text-foreground/70 hover:bg-white/10 focus-visible:outline-none">
									<Mic className="size-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent>Voice</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button size="icon" variant="ghost" className="h-8 w-8 text-foreground/70 hover:bg-white/10 focus-visible:outline-none">
									<Search className="size-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent>Search</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button size="icon" variant="ghost" className="h-8 w-8 text-foreground/70 hover:bg-white/10 focus-visible:outline-none">
									<Settings className="size-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent>Settings</TooltipContent>
						</Tooltip>
						<span className="ml-2 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-foreground/80 shadow-sm backdrop-blur-sm">SGERSE</span>
					</div>
				</div>

				{/* Messages */}
				<div className="flex-1 min-h-0 overflow-auto px-6 py-8 pb-40">
					<div className="mx-auto w-full max-w-3xl space-y-5">
						{messages.map((m) => (
							<Bubble key={m.id} role={m.role} text={m.text} />
						))}
						{messages.length <= 1 && (
							<div className="mx-auto mt-4 w-full max-w-3xl">
								<div className="flex flex-wrap gap-2">
									{suggestions.map((s) => (
										<button
											key={s}
											onClick={() => setValue(s)}
											className="rounded-full bg-white/5 px-3 py-1.5 text-xs text-foreground/80 hover:bg-white/10"
										>
											{s}
										</button>
									))}
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Composer (floating) */}
				<div className="pointer-events-none absolute inset-x-0 bottom-6 z-20 px-6">
					{/* subtle halo */}
					<div className="absolute inset-x-8 -top-6 bottom-0 -z-10 rounded-full bg-[radial-gradient(60%_60%_at_50%_100%,_oklch(0.28_0.08_320/_0.3),transparent_70%)] blur-3xl" />
					<div className="pointer-events-auto mx-auto flex w-full max-w-3xl items-center gap-3 rounded-3xl bg-white/10 p-3 shadow-2xl backdrop-blur-2xl">
						<Button size="icon" variant="ghost" className="h-9 w-9 text-foreground/70 hover:bg-white/10 focus-visible:ring-0 focus-visible:ring-offset-0">
							<Search className="size-4" />
						</Button>
						<Button size="icon" variant="ghost" className="h-9 w-9 text-foreground/70 hover:bg-white/10 focus-visible:ring-0 focus-visible:ring-offset-0">
							<Paperclip className="size-4" />
						</Button>
						<div className="hidden sm:flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[11px] text-foreground/80 shadow-sm backdrop-blur-sm">
							<span>Gemini 2.5 Flash</span>
							<ChevronDown className="size-3 opacity-70" />
						</div>
						<textarea
							ref={composerRef}
							value={value}
							onChange={(e) => {
								setValue(e.target.value)
								const el = composerRef.current
								if (el) {
									el.style.height = "0px"
									el.style.height = Math.min(el.scrollHeight, 160) + "px"
								}
							}}
							onInput={(e) => {
								const el = e.currentTarget
								el.style.height = "0px"
								el.style.height = Math.min(el.scrollHeight, 160) + "px"
							}}
							rows={1}
							placeholder="Type your message here..."
							className="flex-1 max-h-40 min-h-[40px] resize-none bg-transparent text-base text-foreground placeholder:text-foreground/50 focus:outline-none"
							onKeyDown={(e) => {
								if (e.key === "Enter" && !e.shiftKey) {
									e.preventDefault()
									onSend()
								}
							}}
						/>
						<Button onClick={onSend} size="icon" className="h-10 w-10 rounded-full bg-[linear-gradient(180deg,_oklch(0.76_0.17_95/_0.98),_oklch(0.68_0.15_95/_0.98))] text-black shadow-xl hover:brightness-110 hover:scale-105 transition-all focus-visible:ring-0 focus-visible:ring-offset-0">
							<ArrowUp className="size-4" />
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

function Bubble({ role, text }: { role: Msg["role"]; text: string }) {
    const isUser = role === "user"
    if (!isUser) {
        return (
            <div className="flex items-start gap-3">
                <div className="mt-0.5 flex size-8 items-center justify-center rounded-full bg-white/10 text-yellow-400 shadow-inner">
                    <Bot className="size-4" />
                </div>
                <div className="max-w-[80%] rounded-2xl bg-white/10 px-4 py-3 text-sm text-foreground/90 shadow">
                    {text}
                </div>
            </div>
        )
    }
    return (
        <div className="flex justify-end">
				<div className="max-w-[80%] rounded-2xl bg-[linear-gradient(135deg,_oklch(0.92_0.15_95/_0.95),_oklch(0.86_0.14_95/_0.9))] px-4 py-3 text-sm text-black shadow-lg backdrop-blur-sm">
                {text}
            </div>
        </div>
    )
}

type Msg = { id: string; role: "user" | "assistant"; text: string }

const demo: Msg[] = [
	{ id: "m1", role: "assistant", text: "Ask me anything. I can draft, summarize, explain code, plan, and more." },
]
