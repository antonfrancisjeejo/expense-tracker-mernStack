import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { Button } from "@material-ui/core";
import app from "../Firebase/base";
import firebase from "firebase";
import { Header } from "../Header/Header";
import "./Login.css";
import { GlobalContext } from "../../context/GlobalState";

function Login({ history }) {
  const handleLogin = useCallback(
    async (event) => {
      let id;
      try {
        var provider = new firebase.auth.GoogleAuthProvider();
        await app
          .auth()
          .signInWithPopup(provider)
          .then((response) => (id = response.user.uid));
        history.push(`/home/${id}`);
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );
  const { currentUser } = useContext(GlobalContext);

  if (currentUser) {
    return <Redirect to={`/home/${currentUser.uid}`} />;
  }

  return (
    <div className="buttonContainer">
      <Header />
      <Button className="button" color="secondary" onClick={handleLogin}>
        Login with Google
      </Button>
    </div>
  );
}

export default withRouter(Login);
