import { usersApi } from "@Api/users.api";
import { useQuery } from "react-query";
import { useState } from "react";
import { expensesApi } from "@Api/expenses.api";

export function useDashboardState() {
  const [selectedUser, setSelectedUser] = useState<number>(0);

  const getUsersQuery = useQuery(["get-users"], async () => {
    return await usersApi.getUsers();
  });

  const getAverageExpensesQuery = useQuery(
    ["get-average-expenses"],
    async () => {
      return await expensesApi.getAverageExpenses(selectedUser);
    },
    {
      enabled: selectedUser > 0
    }
  );

  const getAverageExpensesPerWeekQuery = useQuery(
    ["get-average-expenses-per-week"],
    async () => {
      return await expensesApi.getAverageExpensesPerWeek(selectedUser);
    },
    {
      enabled: selectedUser > 0
    }
  );

  return {
    getUsersQuery,
    getAverageExpensesQuery,
    getAverageExpensesPerWeekQuery,
    selectedUser,
    setSelectedUser,
  };
}
