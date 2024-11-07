import { Router } from 'express';
import TransactionController from '../controllers/TransactionController';
import authMiddleware from '../middlewares/authMiddleware';

const transactionRouter = Router();

transactionRouter.use(authMiddleware);

transactionRouter.get('/user', TransactionController.getTransactionsById);
transactionRouter.get('/monthly', TransactionController.getMonthlyTransactions);

transactionRouter.post('/create', TransactionController.create);

transactionRouter.delete('/:id', TransactionController.deleteTransaction);

export default transactionRouter;
