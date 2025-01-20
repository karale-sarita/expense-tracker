/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link, createFileRoute } from '@tanstack/react-router'
import { FaFacebook, FaGoogle, FaGithub } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { initate_google_login } from '@/apis/auth';

import { useMutation } from '@tanstack/react-query';
import supabase from '../../../utils/supabase';


const formSchema: any = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }).max(45, {
    message: "Email must be at least 45 characters.",
  }),
  password: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }).max(16, {
    message: "Email must be at least 16 characters.",
  })
})


export const Route = createFileRoute('/auth/login/')({
  component: LoginComponent,
})



function LoginComponent() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })
  function onSubmit(e: any) {
    console.log(e);

  }
  const { mutate: signInWithGoogle, isLoading } = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      console.log('User successfully signed in!');
    },
    onError: (error) => {
      console.error('Error during Google login:', error);
    },
  });

  return <div className="flex p-4 flex-col w-full h-full">
    <h3 className="text-xl my-2 text-slate-700 font-semibold">Please log in!</h3>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <p className="text-sm w-full py-2 text-right"><Link className=' text-primary underline hover:underline-offset-2' to='/auth/register'>Forget password</Link></p>
        <Button className='w-full ' type="submit">Sign In!</Button>
      </form>
    </Form>
    <p className="text-sm w-full py-2 text-left">Doesn't have an account? <Link className=' text-primary underline hover:underline-offset-2' to='/auth/register'>Click to sign up.</Link></p>
    <div className="flex py-3 items-center w-full">
      <div className="bg-slate-300 w-full h-0.5 rounded-full"></div>
      <div className="px-2 whitespace-nowrap text-xs">sign in with</div>
      <div className="bg-slate-300 w-full h-0.5 rounded-full"></div>

    </div>
    <div className="w-full flex gap-3">
      <Button variant='outline' className='w-full text-blue-700'><FaFacebook className='w-5 h-auto' /></Button>
      <Button onClick={_ => {
        signInWithGoogle()
      }} variant='outline' className='w-full text-red-400'><FaGoogle className='w-5 h-auto' /></Button>
      <Button variant='outline' className='w-full text-slate-800'><FaGithub className='w-5 h-auto' /></Button>
    </div>

  </div>
}