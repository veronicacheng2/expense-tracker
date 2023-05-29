import { dashboard, expenses, transactions, trend } from "./Icons";

export const menuItems = [
  {
    id: 1,
    title: "Dashboard",
    icon: dashboard,
    link: "/dashboard",
  },
  {
    id: 2,
    title: "View Transactions",
    icon: transactions,
    link: "/transactions",
  },
  {
    id: 3,
    title: "Incomes",
    icon: trend,
    link: "/transactions",
  },
  {
    id: 4,
    title: "Expenses",
    icon: expenses,
    link: "/transactions",
  },
];
