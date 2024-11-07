import { relations } from 'drizzle-orm';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  type: text('type').notNull(),
  budgetLimit: real('budget_limit').default(0),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  transactions: many(transactions),
}));

export type InsertCategory = typeof categories.$inferInsert;
export type SelectCategory = typeof categories.$inferSelect;

export const paymentMethods = sqliteTable('payment_methods', {
  id: integer('id').primaryKey(),
  name: text('name').unique().notNull(),
});

export type InsertPaymentMethod = typeof paymentMethods.$inferInsert;
export type SelectPaymentMethod = typeof paymentMethods.$inferSelect;

export const transactions = sqliteTable('transactions', {
  id: integer('id').primaryKey(),
  amount: integer('amount').notNull(),
  categoryId: integer('category_id').notNull(),
  paymentMethodId: integer('payment_method_id').notNull(),
  typeId: integer('type_id').notNull(),
  userId: integer('user_id').notNull(),
  date: text('date').notNull(),
  description: text('description'),
});

export const transactionsRelations = relations(transactions, ({ one }) => ({
  category: one(categories, {
    fields: [transactions.categoryId],
    references: [categories.id],
  }),
  type: one(types, {
    fields: [transactions.typeId],
    references: [types.id],
  }),
}));

export type InsertTransaction = typeof transactions.$inferInsert;
export type SelectTransaction = typeof transactions.$inferSelect;

export const types = sqliteTable('types', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
});

export type InsertType = typeof types.$inferInsert;
export type SelectType = typeof types.$inferSelect;
