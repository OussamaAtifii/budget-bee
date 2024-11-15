import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { Textarea } from '@/components/ui/textarea'

import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon, Pencil } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import useAxios from '@/hooks/useAxios'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { transactionSchema } from '@/schemas/transactionSchema'
import { DialogDescription } from '@radix-ui/react-dialog'

const UpdateTransactionModal = ({ transactionId, onSuccess }) => {
  const [open, setOpen] = useState(false)
  const [transaction, setTransaction] = useState({})
  const [categories, setCategories] = useState([])
  const [paymentMethods, setPaymentMethods] = useState([])

  const axios = useAxios()
  const form = useForm({
    resolver: zodResolver(transactionSchema),
    values: {
      amount: transaction?.amount?.toString() || '',
      categoryId: transaction?.categoryId?.toString() || '',
      typeId: transaction?.typeId?.toString() || '',
      paymentMethodId: transaction?.paymentMethodId?.toString() || '',
      description: transaction?.description || '',
      date: transaction ? new Date(transaction.date) : new Date(),
    },
  })

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get('/category')
        setCategories(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    const getpaymentMethods = async () => {
      try {
        const response = await axios.get('/payment-method')
        setPaymentMethods(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    getCategories()
    getpaymentMethods()
  }, [axios])

  useEffect(() => {
    const getTransaction = async () => {
      try {
        const response = await axios.get(`/transaction/${transactionId}`)
        setTransaction(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    getTransaction()
  }, [axios, transactionId])

  const onSubmit = async (transactionData) => {
    const transactionDataFormatted = {
      amount: Number(transactionData.amount),
      categoryId: Number(transactionData.categoryId),
      typeId: Number(transactionData.typeId),
      paymentMethodId: Number(transactionData.paymentMethodId),
      description: transactionData.description,
      date: new Date(transactionData.date),
    }

    try {
      const response = await axios.put(
        `/transaction/${transactionId}`,
        transactionDataFormatted
      )
      console.log(response)
      form.reset()
      setOpen(false)
      onSuccess()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        type="button"
        className="hover:cursor-pointer w-full text-left flex gap-1 items-center"
      >
        <Pencil className="size-4" /> Update
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Tansaction</DialogTitle>
          <DialogDescription className="hidden">
            Update transaction
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            type="button"
                            variant={'outline'}
                            className={cn(
                              ' pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={transaction.categoryId.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="paymentMethodId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method</FormLabel>
                    <Select
                      name={field.name}
                      onValueChange={field.onChange}
                      defaultValue={transaction.paymentMethodId.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a payment method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {paymentMethods.map((paymentMethod) => (
                          <SelectItem
                            key={paymentMethod.id}
                            value={paymentMethod.id.toString()}
                          >
                            {paymentMethod.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="typeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={transaction.typeId.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Expense</SelectItem>
                        <SelectItem value="2">Income</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        value={transaction.description}
                        placeholder="Add a description about this transaction"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="w-full mt-4">UPDATE TRANSACTION</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateTransactionModal
