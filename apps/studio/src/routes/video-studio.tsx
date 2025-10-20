import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/video-studio')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/video-studio"!</div>
}
