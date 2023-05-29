import React from "react";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { dateFormat } from "../../utils/dateFormat";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Chart = () => {
  const { incomes, expenses } = useGlobalContext();

  const data = {
    labels: incomes.allIncomes.map((income) => dateFormat(income.date)),
    datasets: [
      {
        label: "Income",
        data: [...incomes.allIncomes.map((income) => income.amount)],
        backgroundColor: "green",
        tension: 0.1,
      },
      {
        label: "Expenses",
        data: [...expenses.allExpenses.map((expense) => expense.amount)],
        backgroundColor: "red",
        tension: 0.1,
      },
    ],
  };

  return (
    <ChartStyled>
      <Line data={data} />
    </ChartStyled>
  );
};

const ChartStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: var(--box-shadow);
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 20px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Chart;
