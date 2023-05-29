import { createContext, useState, useContext, useReducer } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8000/api/v1";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const initialIncomes = {
    allIncomes: [],
    total: 0,
  };

  const initialExpenses = {
    allExpenses: [],
    total: 0,
  };

  const incomeReducer = (state, action) => {
    switch (action.type) {
      case "GET":
        return { allIncomes: [...action.data], total: state.total };
      case "SUM":
        return { allIncomes: state.allIncomes, total: action.data };
      default:
        return state;
    }
  };

  const expenseReducer = (state, action) => {
    switch (action.type) {
      case "GET":
        return { allExpenses: [...action.data], total: state.total };
      case "SUM":
        return { allExpenses: state.allExpenses, total: action.data };
      default:
        return state;
    }
  };

  const [incomes, dispatchIncomes] = useReducer(incomeReducer, initialIncomes);
  const [expenses, dispatchExpenses] = useReducer(
    expenseReducer,
    initialExpenses
  );
  const [error, setError] = useState(null);

  const addIncome = async (income) => {
    try {
      await axios.post(`${BASE_URL}/incomes`, income);
      getIncomes();
      getTotalIncomes();
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const addExpense = async (expense) => {
    try {
      await axios.post(`${BASE_URL}/expenses`, expense);
      getExpenses();
      getTotalExpenses();
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const getIncomes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/incomes`);
      dispatchIncomes({ type: "GET", data: response.data });
      getTotalIncomes();
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const getExpenses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/expenses`);
      dispatchExpenses({ type: "GET", data: response.data });
      getTotalExpenses();
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const getTotalIncomes = async () => {
    const response = await axios.get(`${BASE_URL}/total-incomes`);
    if (response.data.total.length !== 0) {
      dispatchIncomes({
        type: "SUM",
        data: response.data.total[0].totalAmount,
      });
    } else {
      dispatchExpenses({ type: "SUM", data: 0 });
    }
  };

  const getTotalExpenses = async () => {
    const response = await axios.get(`${BASE_URL}/total-expenses`);
    if (response.data.total.length !== 0) {
      dispatchExpenses({
        type: "SUM",
        data: response.data.total[0].totalAmount,
      });
    } else {
      dispatchExpenses({ type: "SUM", data: 0 });
    }
  };

  const deleteIncomes = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/incomes/${id}`);
      getIncomes();
      getTotalIncomes();
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const deleteExpenses = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/expenses/${id}`);
      getExpenses();
      getTotalExpenses();
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const recentHistory = () => {
    const history = [...incomes.allIncomes, ...expenses.allExpenses];
    history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return history.slice(0, 5);
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        getTotalIncomes,
        incomes,
        deleteIncomes,
        addExpense,
        getExpenses,
        getTotalExpenses,
        deleteExpenses,
        expenses,
        recentHistory,
        error,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
