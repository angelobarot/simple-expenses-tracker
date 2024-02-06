import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DashboardPage } from "@Dashboard/dashboard.page";
import { ExpensesPage } from "./expenses/expenses.page";
import { Layout } from "@Components/layout";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export function AppRoutes() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/user/:userId/expenses" element={<ExpensesPage />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </Router>
  );
}
