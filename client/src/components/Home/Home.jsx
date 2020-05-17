import React from "react";
import { Header } from "../Header/Header";
import Balance from "../Balance/Balance";
import IncomeExpenses from "../IncomeExpenses/IncomeExpenses";
import TransactionList from "../TransactionList/TransactionList";
import AddTransaction from "../AddTransaction/AddTransaction";
import "../../App.css";

const Home = () => {
  return (
    <div className="container">
      <Header />
      <Balance />
      <IncomeExpenses />
      <TransactionList />
      <AddTransaction />
    </div>
  );
};

export default Home;
