import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ children, loggedInUser }) => {
  return (
    <Route
      render={({ location }) => (loggedInUser ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location }
          }}
        />
      ))
      }
    />
  );
};
export default PrivateRoute;
