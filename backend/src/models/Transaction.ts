import { and, asc, desc, eq, sql } from 'drizzle-orm';
import { db } from '../db';
import {
  categories,
  InsertTransaction,
  paymentMethods,
  SelectTransaction,
  transactions,
  types,
} from '../db/schema';

class Transaction {
  static async createTransaction(transactionData: InsertTransaction) {
    const date = new Date(transactionData.date);
    const day = date.getDate();
    const dayFormated = day < 10 ? `0${day}` : day;

    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const [transaction] = await db
      .insert(transactions)
      .values({
        ...transactionData,
        date: `${year}-${month}-${dayFormated}`,
      })
      .returning();

    return transaction;
  }

  static async getTransactionById(transactionId: number) {
    const [transaction] = await db
      .select()
      .from(transactions)
      .where(eq(transactions.id, transactionId));

    return transaction;
  }

  static async getUserTransactions(userId: number) {
    const transactionsData = await db
      .select({
        id: transactions.id,
        amount: transactions.amount,
        date: transactions.date,
        description: transactions.description,
        category: categories.name,
        type: types.name,
        paymentMethod: paymentMethods.name,
      })
      .from(transactions)
      .innerJoin(categories, eq(transactions.categoryId, categories.id))
      .innerJoin(types, eq(transactions.typeId, types.id))
      .innerJoin(
        paymentMethods,
        eq(transactions.paymentMethodId, paymentMethods.id)
      )
      .where(eq(transactions.userId, userId))
      .orderBy(desc(transactions.id));

    return transactionsData;
  }

  static async getMonthlyTransactions(userId: number) {
    const currentYear = new Date().getFullYear().toString();
    const monthsNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    // Realizamos la consulta original de transacciones por mes
    const monthlyReport = await db
      .select({
        month: sql`strftime('%m', transactions.date)`,
        expense: sql`SUM(CASE WHEN transactions.type_id = 1 THEN transactions.amount ELSE 0 END)`,
        income: sql`SUM(CASE WHEN transactions.type_id = 2 THEN transactions.amount ELSE 0 END)`,
      })
      .from(transactions)
      .where(
        and(
          eq(transactions.userId, userId),
          sql`${sql.raw(
            `strftime('%Y', transactions.date) = '${currentYear}'`
          )}`
        )
      )
      .groupBy(sql`strftime('%Y-%m', transactions.date)`)
      .orderBy(sql`strftime('%m', transactions.date)`);

    // Generamos una lista de todos los meses (1 a 12) con valores por defecto de 0
    const allMonths = Array.from({ length: 12 }, (_, i) => {
      const monthNumber = (i + 1).toString().padStart(2, '0'); // Formato '01', '02', etc.
      return {
        month: monthNumber,
        expense: 0,
        income: 0,
      };
    });

    // Combina los resultados de la consulta con los meses sin transacciones
    const completeReport = allMonths.map((monthData) => {
      const transactionData = monthlyReport.find(
        (data) => data.month === monthData.month
      );
      return transactionData ? transactionData : monthData;
    });

    // Agrega el nombre del mes a cada objeto
    const reportWithMonthNames = completeReport.map((data) => {
      return {
        ...data,
        month: monthsNames[parseInt(data.month as string) - 1],
      };
    });

    return reportWithMonthNames;
  }

  static async getYearlyExpensesByCategory(userId: number) {
    const currentYear = new Date().getFullYear().toString();

    const yearlyReport = await db
      .select({
        category: categories.name,
        expense: sql`SUM(transactions.amount)`,
      })
      .from(transactions)
      .innerJoin(categories, eq(transactions.categoryId, categories.id))
      .where(
        and(
          eq(transactions.userId, userId),
          eq(categories.type, 'expense'),
          sql`${sql.raw(
            `strftime('%Y', transactions.date) = '${currentYear}'`
          )}`
        )
      )
      .groupBy(categories.name);

    const reportWitColors = yearlyReport.map((report) => ({
      ...report,
      fill: `var(--color-${report.category
        .toLowerCase()
        .replace(/\s+/g, '_')})`,
    }));

    return reportWitColors;
  }

  static async getTotals(userId: number) {
    const [totals] = await db
      .select({
        totalExpense: sql`SUM(CASE WHEN transactions.type_id = 1 THEN transactions.amount ELSE 0 END)`,
        totalIncome: sql`SUM(CASE WHEN transactions.type_id = 2 THEN transactions.amount ELSE 0 END)`,
        dailyAvg: sql`
      SUM(CASE WHEN transactions.type_id = 1 THEN transactions.amount ELSE 0 END) / NULLIF(COUNT(DISTINCT DATE(transactions.date)), 0)
    `,
      })
      .from(transactions)
      .where(and(eq(transactions.userId, userId)));

    return totals;
  }

  static async deleteTransaction(transactionId: number) {
    await db.delete(transactions).where(eq(transactions.id, transactionId));
  }

  static async updateTransaction(
    transactionId: number,
    transactionData: Partial<Omit<SelectTransaction, 'id' | 'userId'>>
  ) {
    const date = new Date(transactionData.date as string);
    const day = date.getDate();
    const dayFormated = day < 10 ? `0${day}` : day;

    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const [updatedTransaction] = await db
      .update(transactions)
      .set({ ...transactionData, date: `${year}-${month}-${dayFormated}` })
      .where(eq(transactions.id, transactionId))
      .returning();

    return updatedTransaction;
  }
}

export default Transaction;
