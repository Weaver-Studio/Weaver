import { createFileRoute } from '@tanstack/react-router'
import TestPage from '@/pages/test-page'

export const Route = createFileRoute('/test')({
  component: TestPage,
})
