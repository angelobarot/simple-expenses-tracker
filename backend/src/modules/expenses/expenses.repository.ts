import { Injectable } from '@nestjs/common';
import { slonik, sql } from '@config/db';
import { z } from 'zod';
import { IExpenses } from '@expenses/expenses.entity';

const expensesObject = z.object({
  id: z.number(),
  user_id: z.number(),
  date: z.date(),
  type: z.string(),
  amount: z.number(),
});

@Injectable()
export class ExpensesRepository {
  /**
   * Get records
   */
  async get(userId: number) {
    const query = sql.type(
      expensesObject,
    )`SELECT user_id, date, type, amount FROM expenses WHERE ${sql.identifier(['user_id'])} = ${userId}`;

    return (await slonik).query(query);
  }

  async getCurrentRecord(userId: number) {
    const query = sql.type(
      expensesObject,
    )`SELECT id, user_id, date, type, amount FROM expenses
    WHERE date = CURRENT_DATE AND ${sql.identifier(['user_id'])} = ${userId}`;

    return (await slonik).query(query);
  }

  /**
   * Get current record based on the current date and type of the user
   */
  async getCurrentRecordPerType(userId: number, type: string) {
    const query = sql.type(
      expensesObject,
    )`SELECT user_id, date, type, amount FROM expenses
    WHERE date = CURRENT_DATE AND ${sql.identifier(['type'])} = ${type} AND ${sql.identifier(['user_id'])} = ${userId}`;

    return (await slonik).query(query);
  }

  async getAverageByUserId(userId: number) {
    /**
     * Get the average amount of expenses based on type
     */
    const query = sql.type(expensesObject)`SELECT type, AVG(amount) AS amount
    FROM expenses
    WHERE ${sql.identifier(['user_id'])} = ${userId}
    GROUP BY type`;

    return (await slonik).query(query);
  }

  async getAveragePerWeekByUserId(userId: number) {
    /**
     * Get the average amount of expenses based on type from the current week.
     * Current week starts at Monday and ends at Sunday.
     */
    const query = sql.type(expensesObject)`SELECT type, AVG(amount) AS amount
    FROM expenses
    WHERE EXTRACT(WEEK FROM date) = EXTRACT(WEEK FROM CURRENT_DATE)
    AND EXTRACT(YEAR FROM date) = EXTRACT(YEAR FROM CURRENT_DATE)
    AND ${sql.identifier(['user_id'])} = ${userId}
    GROUP BY type`;

    return (await slonik).query(query);
  }

  async add(expenses: IExpenses) {
    /**
     * Get current date in YYYY-MM-DD format
     */
    const currentDate = new Date().toLocaleDateString('en-CA', {
      timeZone: 'Asia/Manila',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    const query = sql.type(
      expensesObject,
    )`INSERT INTO expenses (${sql.identifier(['user_id'])}, ${sql.identifier(['date'])}, ${sql.identifier(['type'])} ,${sql.identifier(['amount'])})
    VALUES (${sql.join([expenses.userId, currentDate, expenses.type, expenses.amount], sql.fragment`, `)}) RETURNING user_id, date, type, amount`;

    return (await slonik).query(query);
  }
}
