import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalProvider from "./context/GlobalState";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
  return (
    <GlobalProvider>
      <Router>
        <div>
          <Switch>
            <Route path="/" exact component={Login} />
            <PrivateRoute exact path="/home/:id" component={Home} />
          </Switch>
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;
