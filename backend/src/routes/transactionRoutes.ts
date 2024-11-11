import { Router } from 'express';
import TransactionController from '../controllers/TransactionController';
import authMiddleware from '../middlewares/authMiddleware';

const transactionRouter = Router();

transactionRouter.use(authMiddleware);

transactionRouter.get('/user', TransactionController.getUserTransactions);
transactionRouter.get('/monthly', TransactionController.getMonthlyTransactions);
transactionRouter.get(
  '/yearly',
  TransactionController.getYearlyExpensesByCategory
);
transactionRouter.get('/:id', TransactionController.getTransactionById);

transactionRouter.post('/create', TransactionController.create);

transactionRouter.delete('/:id', TransactionController.deleteTransaction);
transactionRouter.put('/:id', TransactionController.updateTransaction);

export default transactionRouter;
