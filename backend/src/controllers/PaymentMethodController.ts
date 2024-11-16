import { NextFunction, Request, Response } from 'express';
import PaymentMethod from '../models/PaymentMethod';

class PaymentMethodController {
  static async getAllPaymentMethods(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const paymentMethods = await PaymentMethod.getPaymentMethods();
      res.status(200).json(paymentMethods);
    } catch (error) {
      next(error);
    }
  }
}

export default PaymentMethodController;
