import { createFileRoute, Outlet } from '@tanstack/react-router'
import { FaDragon } from 'react-icons/fa'



export const Route = createFileRoute('/auth')({
  component: AuthComponent
})


// <Outlet />

function AuthComponent() {
  return <div className="w-screen -z-0 overflow-auto bg-slate-100 h-screen relative items-center justify-center flex">
    <div className=" z-10 max-w-sm w-full h-full">
      <div className="flex gap-3 justify-center items-center text-white py-6 pt-14">
        <FaDragon className='text-current h-8 w-auto' /> <span className='text-3xl font-bold'>Some title</span>
      </div>
      <div className="rounded-xl p-2 w-full min-h-80 shadow-lg bg-slate-50">
        <Outlet />
      </div>
    </div>
    <div className='absolute top-0 left-0 bg-indigo-600 bg-[url("https://sliced-react.vercel.app/static/media/bg-main.c01700549d14526fd32c.png")] bg-cover h-2/3 w-full [clip-path:polygon(0%_0%,100%_0%,100%_50%,0%_100%)]'></div>
  </div>
}