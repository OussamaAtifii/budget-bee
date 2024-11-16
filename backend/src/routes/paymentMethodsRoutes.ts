import { Router } from 'express';
import PaymentMethodController from '../controllers/PaymentMethodController';

const paymentMethodRoute = Router();

// Get all payment methods
paymentMethodRoute.get('/', PaymentMethodController.getAllPaymentMethods);

export default paymentMethodRoute;
