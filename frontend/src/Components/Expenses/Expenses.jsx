import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/Layouts";
import ExpenseForm from "../ExpenseForm/ExpenseForm";
import Item from "../Item/Item";

const Expenses = () => {
  const { getExpenses, getTotalExpenses, expenses } = useGlobalContext();
  useEffect(() => {
    getExpenses();
    getTotalExpenses();
    console.log(expenses);
  }, []);

  return (
    <ExpenseStyled>
      <InnerLayout>
        <h1>Expenses</h1>
        <h2 className="total-expense">
          Total Expense: <span>{"$" + expenses.total}</span>
        </h2>
        <div className="expense-content">
          <div className="form-container">
            <ExpenseForm />
          </div>
          <div className="expenses">
            {expenses.allExpenses.map((expense) => {
              const { _id } = expense;
              return (
                <Item key={_id} id={_id} {...expense} indicatorColor="red" />
              );
            })}
          </div>
        </div>
      </InnerLayout>
    </ExpenseStyled>
  );
};

const ExpenseStyled = styled.div`
  display: flex;
  overflow: auto;
  .total-expense {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fcf6f9;
    border: 2px solid #fff;
    box-shadow: var(--box-shadow);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.5rem;
    span {
      color: red;
      font-weight: 800;
      font-size: 2.5rem;
    }
  }
  .expense-content {
    display: flex;
    gap: 2rem;
    .expenses {
      flex: 1;
    }
  }
`;

export default Expenses;
