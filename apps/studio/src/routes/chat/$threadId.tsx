import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState, useRef } from 'react'
import { useQuery, useMutation } from 'convex/react'
import { api } from '@weaver/backend/convex/_generated/api'
import type { Id } from '@weaver/backend/convex/_generated/dataModel'
import { useSession } from '@weaver/shared/lib/auth-client'
import { ChatInputPanel } from '@studio/components/chat/chat-input-panel'
import { ChatLayout } from '@studio/components/chat/chat-layout'
import { StreamingMessageView } from '@studio/components/chat/streaming-message-view'
import { SidebarLayout } from '@studio/components/sidebar/sidebar-layout'
import { EmptyState } from '@studio/components/sidebar/empty-state'
import { useChatStore } from '@studio/state/chat-store'
import { useChatStreaming } from '@studio/hooks/useChatStreaming'

export const Route = createFileRoute('/chat/$threadId')({
  component: ThreadPage,
})

function ThreadPage() {
  const { threadId } = Route.useParams()
  const typedThreadId = threadId as Id<'threads'>
  const { data: sessionData } = useSession()
  const messages = useQuery(api.messages.getMsgByThreadId, {
    threadId: typedThreadId,
    paginationOpts: { numItems: 50, cursor: null }
  })
  const createMessageMutation = useMutation(api.messages.create)
  const { setCurrentThread } = useChatStore()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [userMessage, setUserMessage] = useState<string>('')

  useEffect(() => {
    setCurrentThread(typedThreadId)
  }, [typedThreadId, setCurrentThread])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const { isStreaming, streamingText, start } = useChatStreaming({
    createMessage: createMessageMutation,
    token: sessionData?.session?.token,
    onError: (error) => {
      console.error('Streaming error:', error)
    },
  })

  const handleSendMessage = async (
    message: string,
    model: string,
    thinkingLevel: string
  ) => {
    try {
      setUserMessage(message)
      await createMessageMutation({ threadId: typedThreadId, content: message })
      await start({
        threadId: typedThreadId,
        userMessage: message,
        model,
        thinkingLevel,
      })
      setUserMessage('')
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  const disableSend = isStreaming || !sessionData?.session?.token

  return (
    <SidebarLayout>
      <ChatLayout
        input={<ChatInputPanel onSendMessage={handleSendMessage} isLoading={disableSend} />}
      >
        {messages === undefined ? (
          <EmptyState message="Loading messages..." />
        ) : messages === null ? (
          <EmptyState message="Failed to load messages. Please try again." />
        ) : (
          <div className="flex flex-col gap-4">
            {[...messages.page].reverse().map((message) => (
              <div key={message._id} className="mb-4 rounded-lg bg-muted p-4">
                <p>{message.content}</p>
              </div>
            ))}
            <StreamingMessageView
              userMessage={userMessage}
              streamingText={streamingText}
              isStreaming={isStreaming}
            />
            <div ref={messagesEndRef} />
          </div>
        )}
      </ChatLayout>
    </SidebarLayout>
  )
}
