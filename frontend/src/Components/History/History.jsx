import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";

const History = () => {
  const { recentHistory } = useGlobalContext();
  const history = recentHistory();
  const color = (type) => (type === "expense" ? "red" : "var(--color-green)");
  return (
    <HistoryStyled>
      <h2>Recent History</h2>
      {history.map((item) => {
        return (
          <div className="history-item" key={item._id}>
            <p
              style={{
                color: color(item.type),
              }}
            >
              {item.title}
            </p>
            <p
              style={{
                color: color(item.type),
              }}
            >
              {item.type === "expense"
                ? `-$${item.amount}`
                : "+$" + item.amount}
            </p>
          </div>
        );
      })}
    </HistoryStyled>
  );
};

const HistoryStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .history-item {
    background: #fcf6f9;
    border: 2px solid #fff;
    box-shadow: var(--box-shadow);
    padding: 1rem;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export default History;
