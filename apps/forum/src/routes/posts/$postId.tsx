import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useMutation } from 'convex/react'
import { api } from '@weaver/backend/convex/_generated/api'
import { Id } from '@weaver/backend/convex/_generated/dataModel'
import { z } from 'zod'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { useForm } from '@tanstack/react-form'
import { Button } from '@weaver/ui/components/ui/button'
import { Textarea } from '@weaver/ui/components/ui/textarea'
import { Label } from '@weaver/ui/components/ui/label'

export const Route = createFileRoute('/posts/$postId')({
  component: PostPage,
})

function PostPage() {
  const { postId } = Route.useParams()
  const post = useQuery(api.posts.getPost, { postId: postId as Id<'posts'> })
  const comments = useQuery(api.comments.getComments, { postId: postId as Id<'posts'> })
  const addComment = useMutation(api.comments.addComment)

  const form = useForm({
    defaultValues: {
      content: '',
    },
    onSubmit: async ({ value }) => {
      await addComment({ postId: postId as Id<'posts'>, content: value.content })
    },
    validatorAdapter: zodValidator,
  })

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="mb-8">{post.content}</p>

      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <div className="grid gap-4">
        {comments?.map((comment) => (
          <div key={comment._id} className="border p-4 rounded">
            <p>{comment.content}</p>
            <p className="text-sm text-gray-500">by {comment.author?.name}</p>
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          void form.handleSubmit()
        }}
        className="mt-8"
      >
        <form.Field
          name="content"
          validators={{
            onChange: z.string().min(1, 'Comment cannot be empty'),
          }}
        >
          {(field) => (
            <div>
              <Label htmlFor={field.name}>Add a comment</Label>
              <Textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.touchedErrors ? (
                <em>{field.state.meta.touchedErrors}</em>
              ) : null}
            </div>
          )}
        </form.Field>
        <Button type="submit" disabled={!form.state.isValid} className="mt-4">
          Add Comment
        </Button>
      </form>
    </div>
  )
}
