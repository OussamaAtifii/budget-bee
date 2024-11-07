import { Request, Response } from 'express';
import Category from '../models/Category';
import PaymentMethod from '../models/PaymentMethod';

class PaymentMethodController {
  static async getAllPaymentMethods(req: Request, res: Response) {
    try {
      const paymentMethods = await PaymentMethod.getPaymentMethods();
      res.status(200).json(paymentMethods);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal server error while fetching payment methods data',
      });
    }
  }
}

export default PaymentMethodController;
