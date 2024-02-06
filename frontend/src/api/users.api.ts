import axios from '@Common/axios'
import { Expense } from '@Api/expenses.api'

interface User {
  id: number
}

export interface Expenses extends Expense {
  id: number
  userId: number
  date: Date
}

export class UsersApi {
  async getUsers(): Promise<User[]> {
    const users = await axios.get('/users')

    return users.data
  }

  async getUserExpenses(userId: number): Promise<Expenses[]> {
    const expenses = await axios.get(`/users/${userId}/expenses`)

    return expenses.data
  }
}

export const usersApi = new UsersApi()