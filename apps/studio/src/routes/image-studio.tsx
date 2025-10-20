import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/image-studio')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/image-studio"!</div>
}
