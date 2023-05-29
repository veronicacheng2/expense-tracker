import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/Layouts";
import IncomeForm from "../IncomeForm/IncomeForm";
import Item from "../Item/Item";

const Income = () => {
  const { getIncomes, getTotalIncomes, incomes } = useGlobalContext();
  useEffect(() => {
    getIncomes();
    getTotalIncomes();
  }, []);

  return (
    <IncomeStyled>
      <InnerLayout>
        <h1>Incomes</h1>
        <h2 className="total-income">
          Total Income: <span>{"$" + incomes.total}</span>
        </h2>
        <div className="income-content">
          <div className="form-container">
            <IncomeForm />
          </div>
          <div className="incomes">
            {incomes.allIncomes.map((income) => {
              const { _id } = income;
              return (
                <Item
                  key={_id}
                  id={_id}
                  {...income}
                  indicatorColor="var(--color-green)"
                />
              );
            })}
          </div>
        </div>
      </InnerLayout>
    </IncomeStyled>
  );
};

const IncomeStyled = styled.div`
  display: flex;
  overflow: auto;
  .total-income {
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
      color: var(--color-green);
      font-weight: 800;
      font-size: 2.5rem;
    }
  }
  .income-content {
    display: flex;
    gap: 2rem;
    .incomes {
      flex: 1;
    }
  }
`;

export default Income;
