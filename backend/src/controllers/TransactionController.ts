import { Request, Response } from 'express';
import { transactionSquema } from '../schemas/TransactionSchema';
import { z } from 'zod';
import Transaction from '../models/Transaction';

class TransactionController {
  static async create(req: Request, res: Response) {
    const transactionData = req.body;

    // TODO: get the logged in user id from the request
    const userId = Number(req.session.user?.id);
    console.log(userId);

    try {
      const validatedTransaction = transactionSquema.parse({
        userId,
        ...transactionData,
      });

      const createdTransaction = await Transaction.createTransaction({
        userId,
        ...validatedTransaction,
      });

      res.status(201).json({
        message: 'Transaction created successfully',
        transaction: createdTransaction,
      });
    } catch (error) {
      console.log(error);

      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message);
        return res.status(400).json({ error: errorMessages });
      }

      return res
        .status(500)
        .json({ error: 'Internal server error while creating transaction' });
    }
  }

  static async getTransactionsById(req: Request, res: Response) {
    const userId = Number(req.session.user?.id);
    console.log(userId);

    try {
      const transactions = await Transaction.getUserTransactions(userId);
      return res.status(200).json(transactions);
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ error: 'Internal server error while fetching transaction' });
    }
  }

  static async getMonthlyTransactions(req: Request, res: Response) {
    const userId = Number(req.session.user?.id);
    console.log(userId);

    try {
      const transactions = await Transaction.getMonthlyTransactions(userId);
      console.log(transactions);
      return res.status(200).json(transactions);
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ error: 'Internal server error while fetching transaction' });
    }
  }

  static async getUserTransactions(req: Request, res: Response) {}
  static async updateTransaction(req: Request, res: Response) {}

  static async deleteTransaction(req: Request, res: Response) {
    const userId = Number(req.session.user?.id);
    const transactionId = Number(req.params.id);

    try {
      const transaction = await Transaction.getTransactionById(transactionId);

      if (!transaction) {
        return res.status(400).json({ error: 'Transaction not found' });
      }

      await Transaction.deleteTransaction(transactionId);
    } catch (error) {
      console.log(error);

      res
        .status(500)
        .json({ error: 'Internal server error while deleting transaction' });
    }
  }
}

export default TransactionController;
