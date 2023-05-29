import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/Layouts";
import { dollar } from "../../utils/Icons";
import Chart from "../Chart/Chart";
import History from "../History/History";

const Dashboard = () => {
  const {
    incomes,
    expenses,
    recentHistory,
    getIncomes,
    getTotalIncomes,
    getExpenses,
    getTotalExpenses,
  } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
    getTotalExpenses();
    getTotalIncomes();
  }, []);
  return (
    <DashboardStyled>
      <InnerLayout>
        <h1>All Transactions</h1>
        <div className="stats-con">
          <div className="chart-con">
            <Chart />
            <div className="amount-con">
              <div className="income">
                <h2>Total Income</h2>
                <p>
                  {dollar} {incomes.total}
                </p>
              </div>
              <div className="expense">
                <h2>Total Expense</h2>
                <p>
                  {dollar} {expenses.total}
                </p>
              </div>
              <div className="balance">
                <h2>Total Balance</h2>
                <p totalIncome={incomes.total} totalExpense={expenses.total}>
                  {dollar} {incomes.total - expenses.total}
                </p>
              </div>
            </div>
          </div>
          <div className="history-con">
            <History />
            <h2 className="salary-title">
              Min <span>Salary</span> Max
            </h2>
            <div className="salary-item">
              <p>
                {Math.min(...incomes.allIncomes.map((income) => income.amount))}
              </p>
              <p>
                {Math.max(...incomes.allIncomes.map((income) => income.amount))}
              </p>
            </div>
            <h2 className="expense-title">
              Min <span>Expense</span> Max
            </h2>
            <div className="expense-item">
              <p>
                {Math.min(
                  ...expenses.allExpenses.map((income) => income.amount)
                )}
              </p>
              <p>
                {Math.max(
                  ...expenses.allExpenses.map((income) => income.amount)
                )}
              </p>
            </div>
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
};

const DashboardStyled = styled.div`
  .stats-con {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2rem;
    .chart-con {
      grid-column: 1/4;
      height: 400px;
      .amount-con {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
        margin-top: 2rem;
        .income,
        .expense {
          grid-column: span 2;
        }
        .income,
        .expense,
        .balance {
          background: #fcf6f9;
          border: 2px solid #fff;
          box-shadow: var(--box-shadow);
          border-radius: 20px;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          p {
            font-size: 2.5rem;
            font-weight: 700;
          }
        }
        .balance {
          grid-column: 2/4;
          p {
            color: ${(props) =>
              props.totalIncome > props.totalExpense
                ? "red"
                : "var(--color-green)"};
          }
        }
      }
    }
    .history-con {
      grid-column: 4/-1;
      h2 {
        margin: 1rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .salary-title,
      .expense-title {
        font-size: 1.2rem;
        span {
          font-size: 1.8rem;
        }
      }

      .salary-item,
      .expense-item {
        background: #fcf6f9;
        border: 2px solid #fff;
        box-shadow: var(--box-shadow);
        border-radius: 20px;
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      p {
        font-weight: 600;
        font-size: 1.6rem;
      }
    }
  }
`;

export default Dashboard;
