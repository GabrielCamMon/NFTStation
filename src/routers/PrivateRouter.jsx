import React from "react";
import { Route, Redirect } from "react-router-dom";
import Navigation from "@/components/Navigation";

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={(props) =>
      isAuthenticated ? (
        <div>
          <Navigation />
          <Component {...props} />
        </div>
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

export default PrivateRoute;
