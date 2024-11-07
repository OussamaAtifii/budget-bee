import express from 'express';
import userRouter from './routes/userRoutes';
import transactionRouter from './routes/transactionRoutes';
import categoriesRouter from './routes/categoriesRoute';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import paymentMethodRoute from './routes/paymentMethodsRoutes';

const app = express();
const port = 3000;

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/user', userRouter);
app.use('/transaction', transactionRouter);
app.use('/category', categoriesRouter);
app.use('/payment-method', paymentMethodRoute);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
