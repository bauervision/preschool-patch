import React, { useState } from "react";

export const SignUp = ({ handleSubmitNew, setEmail, setPassword }) => {
  const [page, setPage] = useState(0);
  const [emailError, setEmailError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);
  const [email, setEmailLogin] = useState("");
  const [password, setPasswordLogin] = useState("");

  return (
    <div>
      <form onSubmit={handleSubmitNew}>
        <h3>Thank you for Joining Preschool Patch!!</h3>
        <p>
          There is just a few small steps to complete in order to register with
          Preschool Patch. Thank you for your patience.
        </p>
        <div>
          <input
            className={`InputStyle ${emailError && "Red"}`}
            placeholder="Register Your Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div>
          <input
            className={`InputStyle ${passwordError && "Red"}`}
            placeholder="Set a new Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        {emailError || passwordError ? (
          <div>Enter Valid Email and Password</div>
        ) : (
          <>
            {/* If we have completed the form, we can submit */}
            {page === 3 ? (
              <button type="submit">Login</button>
            ) : (
              // Otherwise, just advance to next page
              <button type="next" onClick={() => setPage(page + 1)}>
                Next
              </button>
            )}
          </>
        )}
      </form>
    </div>
  );
};
