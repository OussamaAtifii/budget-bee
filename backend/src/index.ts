import express from 'express';
import userRouter from './routes/userRoutes';
import transactionRouter from './routes/transactionRoutes';
import categoriesRouter from './routes/categoriesRoute';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import paymentMethodRoute from './routes/paymentMethodsRoutes';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware';

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://budget-bee.oussamaati.dev'],
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

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

function callSelf() {
  setInterval(async () => {
    try {
      await fetch(`http://localhost:${PORT}`);
      console.log('Autocall done');
    } catch (error) {
      console.error('Error in autocall:', error);
    }
  }, 5 * 60 * 1000);
}

callSelf();
