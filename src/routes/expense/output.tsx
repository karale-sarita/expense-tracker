import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/expense/output')({
  component: () => <div>Hello /expense/output!</div>
})