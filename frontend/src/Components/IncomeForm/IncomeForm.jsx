import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../../context/globalContext";
import Button from "../Button/Button";
import { plus } from "../../utils/Icons";

const IncomeForm = () => {
  const { addIncome } = useGlobalContext();
  const initialInputState = {
    title: "",
    amount: "",
    date: "",
    category: "",
    description: "",
  };
  const [inputState, setInputState] = useState(initialInputState);
  const { title, amount, date, category, description } = inputState;
  const handleInput = (name) => (e) => {
    setInputState((state) => ({ ...state, [name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addIncome(inputState);
    setInputState(initialInputState);
  };
  return (
    <IncomeFormStyled onSubmit={handleSubmit}>
      <div className="input-control">
        <input
          type="text"
          name="title"
          value={title}
          placeholder="Salary Title"
          onChange={handleInput("title")}
        />
      </div>
      <div className="input-control">
        <input
          type="text"
          name="amount"
          value={amount}
          placeholder="Salary Amount"
          onChange={handleInput("amount")}
        />
      </div>
      <div className="input-control">
        <DatePicker
          id="date"
          placeholderText="Enter A Date"
          selected={date}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => {
            setInputState((state) => ({ ...state, date }));
          }}
        />
      </div>
      <div className="selects input-control">
        <select
          name="category"
          id="categor"
          required
          value={category}
          onChange={handleInput("category")}
        >
          <option value="" disabled>
            Select Option
          </option>
          <option value="salary">Salary</option>
          <option value="freelancing">Freelancing</option>
          <option value="investments">Investments</option>
          <option value="stocks">Stocks</option>
          <option value="bitcoin">Bitcoin</option>
          <option value="bank">Bank Transfer</option>
          <option value="youtube">Youtube</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="input-control">
        <textarea
          name="description"
          id="description"
          rows={4}
          value={description}
          placeholder="Add A Reference"
          onChange={handleInput("description")}
        ></textarea>
      </div>
      <div className="submit-btn">
        <Button
          name="Add Income"
          icon={plus}
          bPad="0.8rem 1.6rem"
          bRad="30px"
          bg="var(--color-accent)"
          color="#fff"
        />
      </div>
    </IncomeFormStyled>
  );
};

const IncomeFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: var(--box-shadow);
    color: rgba(34, 34, 96, 0.9);
    &::placeholder {
      color: var(--primary-color3);
    }
  }
  .input-control {
    input {
      width: 100%;
    }
  }

  .selects {
    display: flex;
    justify-content: flex-end;
    select {
      color: var(--primary-color3);
      &:focus,
      &:active {
        color: rgba(34, 34, 96, 1);
      }
    }
  }

  .submit-btn {
    button {
      box-shadow: var(--box-shadow);
      &:hover {
        background: var(--color-green) !important;
      }
    }
  }
`;

export default IncomeForm;
