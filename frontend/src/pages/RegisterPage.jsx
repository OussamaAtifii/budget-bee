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
import { userRegisterSchema } from '@/schemas/userSchema'
import useAxios from '@/hooks/useAxios'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Spinner from '@/components/Spinner'

const RegisterPage = () => {
  const axios = useAxios()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(userRegisterSchema),
  })

  const onSubmit = async (userData) => {
    try {
      setLoading(true)
      const response = await axios.post('/user/register', userData)
      console.log(response.data)
      window.localStorage.setItem('email', response.data.email)
      navigate('/')
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Create Your Account!
          </CardTitle>
          <CardDescription className="font-semibold">
            Join us to manage your budget and track spending.
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full mt-4">
                {loading ? (
                  <>
                    <Spinner /> Loading
                  </>
                ) : (
                  'LOG IN'
                )}
              </Button>
            </form>
          </Form>
          <div className="flex flex-col gap-1 text-gray-700">
            <Link to="/login" className="text-sm hover:underline">
              Already have an account? Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default RegisterPage
