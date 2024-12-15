/* eslint-disable react/react-in-jsx-scope */
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/expense')({
  component: () => <div className='w-screen h-screen overflow-auto'>
    <Outlet />
  </div>
})