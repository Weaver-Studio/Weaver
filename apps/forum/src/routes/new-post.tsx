import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/new-post')({
  component: NewPost,
})

function NewPost() {
  return <div>New Post Page</div>
}
