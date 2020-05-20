import React, { createContext, useReducer, useEffect, useState } from "react";
import axios from "axios";
import AppReducer from "./AppReducer";
import app from "../components/Firebase/base";

const initialState = {
  transactions: [],
  error: null,
  loading: true,
};

export const GlobalContext = createContext(initialState);

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
  }, []);

  if (pending) {
    return <>Loading...</>;
  }

  const getTransactions = async (id) => {
    try {
      const res = await axios.get(
        `https://expense-tracker-1306.herokuapp.com/api/v1/transactions/${id}`
      );
      dispatch({
        type: "GET_TRANSACTIONS",
        payload: res.data.data.transactions,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err,
      });
    }
  };

  async function deleteTransaction(userId, id) {
    try {
      await axios.patch(
        `https://expense-tracker-1306.herokuapp.com/api/v1/transactions/${userId}/${id}`
      );
      dispatch({
        type: "DELETE_TRANSACTION",
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err,
      });
    }
  }

  async function addTransaction(transaction) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "https://expense-tracker-1306.herokuapp.com/api/v1/transactions",
        transaction,
        config
      );
      dispatch({
        type: "ADD_TRANSACTION",
        payload: res.data.data.transactions[0],
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error,
      });
    }
  }
  async function updateTransaction(id, transaction) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      await axios.patch(
        `https://expense-tracker-1306.herokuapp.com/api/v1/transactions/${id}`,
        transaction,
        config
      );
      dispatch({
        type: "ADD_TRANSACTION",
        payload: transaction,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error,
      });
    }
  }
  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        deleteTransaction,
        getTransactions,
        addTransaction,
        updateTransaction,
        currentUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
