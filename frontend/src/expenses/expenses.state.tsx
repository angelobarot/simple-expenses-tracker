import { Expense, expensesApi } from "@Api/expenses.api";
import { usersApi } from "@Api/users.api";
import { useMutation, useQuery } from "react-query";

export function useExpensesState(userId: number) {
  const getUserExpensesQuery = useQuery(["get-user-expenses"], async () => {
    return await usersApi.getUserExpenses(userId);
  }, {
    cacheTime: 0
  });

  const saveUserExpenseMutation = useMutation({
    mutationFn: async (expense: Expense) => {
      await expensesApi.save(userId, expense)
    }
  })

  return {
    getUserExpensesQuery,
    saveUserExpenseMutation
  };
}
