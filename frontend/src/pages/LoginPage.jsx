import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userLoginSchema } from '@/schemas/userSchema'
import { Link, useNavigate } from 'react-router-dom'
import useAxios from '@/hooks/useAxios'

const LoginPage = () => {
  const axios = useAxios()
  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(userLoginSchema),
  })

  const onSubmit = async (userData) => {
    try {
      console.log(userData)
      const response = await axios.post('/user/login', userData)
      console.log(response.data)
      window.localStorage.setItem('email', response.data.email)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const handleDefaultCredentials = async () => {
    try {
      const response = await axios.post('/user/login', {
        email: 'default@default.com',
        password: '12345678',
      })
      console.log(response.data)
      window.localStorage.setItem('email', response.data.email)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Welcome Back!</CardTitle>
          <CardDescription className="font-semibold">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Add your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full mt-4">LOG IN</Button>
            </form>
          </Form>
          <div className="flex flex-col gap-1 text-gray-700">
            <Link to="/register" className="text-sm hover:underline">
              {"Don't have an account? Register"}
            </Link>
            <a
              onClick={handleDefaultCredentials}
              className="text-sm hover:underline cursor-pointer"
            >
              Set default credentials
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage
