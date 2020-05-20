import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import Format from "../../utils/Format";

const Transaction = ({ transaction }) => {
  const { deleteTransaction, currentUser } = useContext(GlobalContext);
  const sign = transaction.amount < 0 ? "-" : "+";
  return (
    <div>
      <li className={transaction.amount < 0 ? "minus" : "plus"}>
        {transaction.text}
        <span>
          {sign}${Format(Math.abs(transaction.amount))}
        </span>
        <button
          onClick={() => deleteTransaction(currentUser.uid, transaction._id)}
          className="delete-btn"
        >
          x
        </button>
      </li>
    </div>
  );
};

export default Transaction;
