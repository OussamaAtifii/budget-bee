import { Router } from 'express';
import PaymentMethodController from '../controllers/PaymentMethodController';

const paymentMethodRoute = Router();

paymentMethodRoute.get('/', PaymentMethodController.getAllPaymentMethods);

export default paymentMethodRoute;
