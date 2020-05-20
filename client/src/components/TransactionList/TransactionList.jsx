import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalState";
import "./TransactionList.css";
import Transaction from "../Transaction/Transaction";

const TransactionList = () => {
  const { transactions, getTransactions, currentUser } = useContext(
    GlobalContext
  );

  useEffect(() => {
    getTransactions(currentUser.uid);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.map((transaction, index) => {
          return <Transaction key={index} transaction={transaction} />;
        })}
      </ul>
    </>
  );
};

export default TransactionList;
