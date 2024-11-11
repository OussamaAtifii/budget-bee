import { z } from 'zod';

export const transactionSchema = z.object({
  amount: z.number({ required_error: 'Amount is required' }).positive(),
  categoryId: z
    .number({ required_error: 'Category is required' })
    .int()
    .positive(),
  paymentMethodId: z
    .number({ required_error: 'Payment method is required' })
    .int()
    .positive(),
  typeId: z.number({ required_error: 'Type is required' }).int().positive(),
  date: z.string({ required_error: 'Date is required' }),
  description: z.string().optional(),
});

export const updateTransactionSchema = transactionSchema.partial();
