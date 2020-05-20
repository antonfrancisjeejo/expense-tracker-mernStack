import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { Redirect } from "react-router-dom";
import Format from "../../utils/Format";
import app from "../Firebase/base";
import "./Balance.css";

const Balance = () => {
  const { transactions } = useContext(GlobalContext);
  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  function handleLogout() {
    app
      .auth()
      .signOut()
      .then(function () {
        return <Redirect to="/" />;
      })
      .catch(function (error) {
        alert(error);
      });
  }
  return (
    <>
      <h4>Your Balance</h4>
      <h1>${Format(total)}</h1>
      <button className="btn1" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};

export default Balance;
