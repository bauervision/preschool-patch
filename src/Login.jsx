import React, { useState } from "react";

import { Header } from "./Header";
import { Footer } from "./Footer";

import { RegisterUser, LoginUserEmailPassword } from "./helpers/auth";

export const Login = ({ pageUpdate, handleLogin }) => {
  // handle local state
  const [emailError, setEmailError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);
  const [email, setEmailLogin] = useState("");
  const [password, setPasswordLogin] = useState("");
  const [userType, setUserType] = useState(null);

  // const returnHome = () => pageUpdate(0);

  const handleSubmitLogin = e => {
    e.preventDefault();
    let user = LoginUserEmailPassword(email, password);
  };

  const validEmailRegex = RegExp(
    // eslint-disable-next-line
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

  const handleSubmitNew = e => {
    e.preventDefault();
    const newUser = RegisterUser(email, password);
    handleLogin(newUser);
  };

  const setEmail = email => {
    const error = validEmailRegex.test(email) ? "" : "Email is not valid!";
    setEmailError(error);
    setEmailLogin(email);
  };

  const setPassword = password => {
    const error = password.length < 6;
    setPasswordError(error);
    setPasswordLogin(password);
  };

  const validateForm = () => {
    return !emailError && passwordError;
  };

  return (
    <div className="Login">
      <div>
        <Header pageUpdate={pageUpdate} isLogin />

        <h2>Login Page</h2>
        <div className="LoginBox">
          <div>
            <button onClick={() => setUserType(1)}>Existing User</button>
            <button onClick={() => setUserType(0)}>New User</button>
          </div>

          {userType !== null && (
            <>
              {userType === 0 ? (
                // New User
                <form onSubmit={handleSubmitNew}>
                  <h3>Thank you for Joining Preschool Patch!!</h3>
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
                    <button type="submit">Login</button>
                  )}
                </form>
              ) : (
                // Existing User
                <form onSubmit={handleSubmitLogin}>
                  <h3>Welcome Back!</h3>
                  <div>
                    <input
                      className={`InputStyle ${emailError && "Red"}`}
                      placeholder="Enter your Email"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <input
                      className={`InputStyle ${passwordError && "Red"}`}
                      placeholder="Enter your Password"
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>

                  {emailError || passwordError ? (
                    <div>Enter Valid Email and Password</div>
                  ) : (
                    <button type="submit">Login</button>
                  )}
                </form>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};
