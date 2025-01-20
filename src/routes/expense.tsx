import { getSupabaseUser } from '@/utils/auth'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/expense')({
  beforeLoad: async () => {
    const { data } = await getSupabaseUser()

    if (!data.user) {
      throw redirect({
        to: '/auth/login',
      })
    }

  },
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
