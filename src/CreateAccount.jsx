import React from "react";

export const CreateAccount = ({ pageUpdate }) => {
  const returnHome = () => pageUpdate(0);
  return (
    <div className="CreateAccount">
      <div>
        <header>
          <button onClick={returnHome}>Home</button>
        </header>

        <h1>Create Account</h1>
        <div>Find a local preschool teacher for your child!</div>
        <input />
      </div>
    </div>
  );
};
