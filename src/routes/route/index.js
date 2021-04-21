import React, { useEffect } from "react";
import { Route as ReactDOMRoute, Redirect } from "react-router-dom";
import { useAuth } from "../../hooks/Auth";

const Route = ({ isPrivate = false, component: Component, ...rest }) => {
  const { user } = useAuth();

  useEffect(() => {
    console.log("USER", user);
  }, [user]);

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? "" : "/dashboard",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
