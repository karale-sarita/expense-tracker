import { getSupabaseUser } from '@/utils/auth'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  loader: async () => {
    const { data } = await getSupabaseUser()

    if (!data.user) {
      throw redirect({
        to: '/auth/login',
      })
    }
    else {
      throw redirect({
        to: '/expense/dashboard',
      })
    }

  },
  component: () => (
    <div className="w-full h-screen bg-cyan-300"></div>
  ),
})