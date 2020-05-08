import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalState";
import "./TransactionList.css";
import Transaction from "../Transaction/Transaction";

const TransactionList = () => {
  const { transactions, getTransactions } = useContext(GlobalContext);

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.map((transaction) => {
          return (
            <Transaction key={transaction._id} transaction={transaction} />
          );
        })}
      </ul>
    </>
  );
};

export default TransactionList;
