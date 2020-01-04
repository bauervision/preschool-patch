import React, { useState } from "react";

import { Header } from "./Header";
import { Footer } from "./Footer";
// import { SignUp } from "./SignUp";
import { RegisterUser, LoginUserEmailPassword } from "./helpers/auth";

export const Login = ({ pageUpdate, handleLogin }) => {
  // handle local state
  const [emailError, setEmailError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);
  const [loginError, setLoginError] = useState(null);
  const [email, setEmailLogin] = useState("");
  const [password, setPasswordLogin] = useState("");
  const [name, setNameLogin] = useState("");
  const [phone, setPhoneLogin] = useState("");
  const [zipcode, setZipcodeLogin] = useState("");
  const [userType, setUserType] = useState(null);

  // const returnHome = () => pageUpdate(0);

  const handleSubmitLogin = async e => {
    e.preventDefault();
    let status = await LoginUserEmailPassword(email, password);
    console.log("Log in status = ", status);
    // if status is false then we got an error
    if (!status.successful) {
      const errorMessage =
        status.error.message + " Try again with a different email?";
      setLoginError(errorMessage);
    } else {
      // otherwise we had a successful login
    }
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

  return (
    <div className="Login">
      <div>
        <Header pageUpdate={pageUpdate} isLogin />

        <h2>Login Page</h2>
        <div className="LoginBox">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {userType === 1 ? (
              <div>Existing User </div>
            ) : (
              <button onClick={() => setUserType(1)}>Existing User</button>
            )}

            {userType === 0 ? (
              <div>New User </div>
            ) : (
              <button onClick={() => setUserType(0)}>New User</button>
            )}
          </div>

          {userType !== null && (
            <>
              {userType === 0 ? (
                // New User
                <form onSubmit={handleSubmitNew}>
                  <h3>Thank you for Joining Preschool Patch!!</h3>
                  <p>
                    This will create your basic account so you can submit
                    requests to local Patch Leaders.
                  </p>
                  <p>
                    If you are interested in becoming a Patch Leader, you will
                    need to complete a different form found above.
                  </p>

                  <div>
                    <label for="name">Full Name:</label>
                    <input
                      className="InputStyle"
                      type="text"
                      name="name"
                      value={name}
                      onChange={e => setNameLogin(e.target.value)}
                    />
                  </div>

                  <div>
                    <label for="email">Email:</label>
                    <input
                      className={`InputStyle ${emailError && "Red"}`}
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <label for="phone">Phone:</label>
                    <input
                      className="InputStyle"
                      type="text"
                      name="phone"
                      value={phone}
                      onChange={e => setPhoneLogin(e.target.value)}
                    />
                  </div>

                  <div>
                    <label for="postal-code">Zipcode:</label>
                    <input
                      className="InputStyle"
                      type="number"
                      name="postal-code"
                      value={zipcode}
                      onChange={e => setZipcodeLogin(e.target.value)}
                    />
                  </div>

                  <div>
                    <label for="password">Set a password:</label>
                    <input
                      className={`InputStyle ${passwordError && "Red"}`}
                      placeholder="Minimum of 6 characters"
                      type="password"
                      //value={password}
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

                  {loginError && <div>{loginError}</div>}
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
