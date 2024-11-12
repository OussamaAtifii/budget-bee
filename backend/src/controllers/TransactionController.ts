import { Request, Response } from 'express';
import {
  transactionSchema,
  updateTransactionSchema,
} from '../schemas/TransactionSchema';
import { z } from 'zod';
import Transaction from '../models/Transaction';
import { AppError, NotFoundError } from '../errors/AppError';

class TransactionController {
  static async create(req: Request, res: Response) {
    const transactionData = req.body;

    const userId = Number(req.session.user?.id);
    console.log(userId);

    try {
      const validatedTransaction = transactionSchema.parse({
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

  static async getTransactionById(req: Request, res: Response) {
    const transactionId = Number(req.params.id);

    try {
      const transaction = await Transaction.getTransactionById(transactionId);
      return res.status(200).json(transaction);
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

  static async getYearlyExpensesByCategory(req: Request, res: Response) {
    const userId = Number(req.session.user?.id);
    console.log(userId);

    try {
      const transactions = await Transaction.getYearlyExpensesByCategory(
        userId
      );
      console.log(transactions);
      return res.status(200).json(transactions);
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ error: 'Internal server error while fetching transaction' });
    }
  }

  static async getUserTransactions(req: Request, res: Response) {
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

  static async getTotals(req: Request, res: Response) {
    const userId = Number(req.session.user?.id);
    console.log(userId);

    try {
      const totals = await Transaction.getTotals(userId);
      return res.status(200).json(totals);
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ error: 'Internal server error while fetching transaction' });
    }
  }

  // TODO: Validate that the transaction belongs to the user
  static async updateTransaction(req: Request, res: Response) {
    const userId = Number(req.session.user?.id);
    const transactionId = Number(req.params.id);
    const transactionData = req.body;

    try {
      const validatedTransaction =
        updateTransactionSchema.parse(transactionData);
      const existsTransaction = await Transaction.getTransactionById(
        transactionId
      );

      if (!existsTransaction) {
        throw new NotFoundError('Transaction not found');
      }

      if (validatedTransaction) {
        const updatedTransaction = await Transaction.updateTransaction(
          transactionId,
          validatedTransaction
        );

        res.status(200).json({
          message: 'Transaction updated successfully',
          transaction: updatedTransaction,
        });
      }
    } catch (error) {
      console.log(error);

      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message);
        return res.status(400).json({ error: errorMessages });
      }

      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ error: error.message });
      }

      return res
        .status(500)
        .json({ error: 'Internal server error while updating transaction' });
    }
  }

  // TODO: Validate that the transaction belongs to the user
  static async deleteTransaction(req: Request, res: Response) {
    const userId = Number(req.session.user?.id);
    const transactionId = Number(req.params.id);

    try {
      const transaction = await Transaction.getTransactionById(transactionId);

      if (!transaction) {
        return res.status(400).json({ error: 'Transaction not found' });
      }

      await Transaction.deleteTransaction(transactionId);
      return res
        .status(200)
        .json({ message: 'Transaction deleted successfully' });
    } catch (error) {
      console.log(error);

      res
        .status(500)
        .json({ error: 'Internal server error while deleting transaction' });
    }
  }
}

export default TransactionController;
