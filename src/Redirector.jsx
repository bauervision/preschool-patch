import React from 'react';
import { withRouter } from 'react-router-dom';


const Redirector = ({ redirect, history, loggedInUser }) => {
  if (loggedInUser) {
    history.push(redirect);
    return null;
  }

  return null;
};

export default withRouter(Redirector);
