import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/home/dashboard')({
  component: () => <div>Hello /home/dashboard!</div>
})