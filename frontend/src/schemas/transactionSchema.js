import { z } from 'zod'

export const transactionSquema = z.object({
  amount: z.string({ required_error: 'Amount is required' }),
  categoryId: z.string({ required_error: 'Category is required' }),
  typeId: z.string({ required_error: 'Type is required' }),
  paymentMethodId: z.string({ required_error: 'Payment method is required' }),
  date: z.date({ required_error: 'Date is required' }),
  description: z.string().optional(),
})
