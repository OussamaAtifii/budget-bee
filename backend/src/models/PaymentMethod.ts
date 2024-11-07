import { eq } from 'drizzle-orm';
import { db } from '../db';
import { paymentMethods } from '../db/schema';

class PaymentMethod {
  static async getPaymentMethods() {
    const paymentMethodsData = await db.select().from(paymentMethods);
    return paymentMethodsData;
  }
}

export default PaymentMethod;
