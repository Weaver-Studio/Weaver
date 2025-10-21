import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/chat/$thread-id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/chat/$thread-id"!</div>
}
