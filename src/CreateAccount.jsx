import React from "react";

import { Header } from "./Header";
import { Footer } from "./Footer";

export const CreateAccount = ({ pageUpdate, loggedInUser }) => {
  // const returnHome = () => pageUpdate(0);
  return (
    <div className="CreateAccount">
      <div>
        <Header pageUpdate={pageUpdate} isCreate loggedInUser={loggedInUser} />

        <h1>Create Account</h1>
        <div>Find a local preschool teacher for your child!</div>
        <input />
      </div>

      <Footer />
    </div>
  );
};
