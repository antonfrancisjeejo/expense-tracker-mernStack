import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalState";
import axios from "axios";

import "./AddTransaction.css";

const AddTransaction = () => {
  const { addTransaction, currentUser, updateTransaction } = useContext(
    GlobalContext
  );
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);
  const [add, setAdd] = useState(0);

  useEffect(() => {
    getTransactions(currentUser.uid);
  }, [currentUser.uid]);

  const getTransactions = async (id) => {
    try {
      const res = await axios.get(
        `https://expense-tracker-1306.herokuapp.com/api/v1/transactions/${id}`
      );
      const hey = res.data.data;

      setAdd(Object.keys(hey).length);
    } catch (err) {
      alert(err);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const newTransaction = {
      _id: currentUser.uid,
      transactions: [
        {
          text,
          amount: Number(amount),
        },
      ],
    };
    if (add !== 3) {
      addTransaction(newTransaction);
    } else {
      const newTransaction = {
        text,
        amount: Number(amount),
      };
      updateTransaction(currentUser.uid, newTransaction);
    }
    setAmount(0);
    setText("");
  };

  return (
    <div>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            placeholder="Enter text..."
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            type="number"
            placeholder="Enter amount..."
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </div>
        <button className="btn" type="submit">
          Add transaction
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
