import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link, createFileRoute } from '@tanstack/react-router'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';


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



export const Route = createFileRoute('/auth/register/')({

  component: RegisterComponent,
})



function RegisterComponent() {
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
  return <div className="flex p-4 flex-col w-full h-full">
    <h3 className="text-xl my-2 text-slate-700 font-semibold">Please sign up!</h3>
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='w-full ' type="submit">Sign up!</Button>
      </form>
    </Form>
    <p className="text-sm w-full py-2 text-left">Already have an account? <Link className=' text-primary underline hover:underline-offset-2' to='/auth/login'>Click to sign in.</Link></p>

  </div>
}