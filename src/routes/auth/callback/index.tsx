import instance from '@/apis/instance';
import LoginUser from '@/components/illustrations/login_user';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/callback/')({
  component: CallbackComponent,
})



function CallbackComponent() {
  const params = Route.useSearch<any>()
  // @ts-ignore
  const _query = useQuery({ queryKey: ['todos',params], queryFn: async()=>instance.get('/auth/callback_for_google',{
    params
  })})

  
  return <div className="flex p-2 flex-col w-full h-full">
    <img src="/icons/energy.png" alt="logo" className='w-10 h-10 -rotate-45' />
    <h3 className="text-xl my-4 text-slate-700 font-semibold">Verifying the login . . . </h3>
    <div className="p-6 max-w-48 text- text-emerald-400">
      <LoginUser />
    </div>
  </div>
}