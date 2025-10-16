import { createFileRoute } from '@tanstack/react-router'
import Home from '@studio/pages/Home'

export const Route = createFileRoute('/')({
  component: Home,
})