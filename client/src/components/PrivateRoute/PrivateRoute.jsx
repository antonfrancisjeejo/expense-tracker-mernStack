import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useContext(GlobalContext);
  return (
    <Route
      {...rest}
      render={(routeprops) =>
        currentUser ? <RouteComponent {...routeprops} /> : <Redirect to={"/"} />
      }
    />
  );
};

export default PrivateRoute;
