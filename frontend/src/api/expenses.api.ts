import axios from '@Common/axios'

export enum ExpenseType {
  COFFEE = 'coffee',
  ALCOHOL = 'alcohol',
  FOOD = 'food'
}

export interface Expense {
  type: ExpenseType
  amount: number
}

export class ExpensesApi {
  async getAverageExpenses(userId: number): Promise<Expense[]> {
    const expenses = await axios.get(`/expenses/average?userId=${userId}`)

    return expenses.data
  }

  async getAverageExpensesPerWeek(userId: number): Promise<Expense[]> {
    const expenses = await axios.get(`/expenses/average-per-week?userId=${userId}`)

    return expenses.data
  }

  async save(userId: number, expense: Expense) {
    const result = await axios.post('/expenses', {
      userId,
      type: expense.type,
      amount: expense.amount
    })

    return result.data
  }
}

export const expensesApi = new ExpensesApi()