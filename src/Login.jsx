import React, { useState } from "react";

import { Header } from "./Header";
import { Footer } from "./Footer";

// Components
import { BasicInput } from "./Components";
import { PasswordInput } from "./Components";
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
  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState("password");

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

  const handlePasswordVisibility = () => {
    setPasswordType(!showPassword ? "text" : "password");
    setShowPassword(!showPassword);
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
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center"
                    }}
                  >
                    <BasicInput
                      title="Full Name"
                      type="text"
                      forLabel="name"
                      onChange={setNameLogin}
                      value={name}
                    />

                    <BasicInput
                      title="Email"
                      type="email"
                      forLabel="email"
                      onChange={setEmail}
                      value={email}
                    />

                    <BasicInput
                      title="Phone"
                      type="text"
                      forLabel="phone"
                      onChange={setPhoneLogin}
                      value={phone}
                    />

                    <BasicInput
                      title="Zipcode"
                      type="number"
                      forLabel="postal-code"
                      onChange={setZipcodeLogin}
                      value={zipcode}
                    />

                    <PasswordInput
                      handlePasswordVisibility={handlePasswordVisibility}
                      setPassword={setPassword}
                      password={password}
                      passwordType={passwordType}
                      passwordError={passwordError}
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
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "green"
                    }}
                  >
                    <div style={{ border: "solid" }}>
                      <input
                        className={`InputStyle ${emailError && "Red"}`}
                        placeholder="Enter your Email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                    </div>

                    <PasswordInput
                      handlePasswordVisibility={handlePasswordVisibility}
                      setPassword={setPassword}
                      password={password}
                      passwordType={passwordType}
                      passwordError={passwordError}
                    />
                    {/* <div style={{ display: "flex" }}>
                      <div style={{ position: "relative" }}>
                        <button
                          type="button"
                          onClick={handlePasswordVisibility}
                          className="TogglePassword"
                        >
                          <img src={ShowPassword} alt="show password" />
                        </button>

                        <input
                          className={`InputStyle ${passwordError && "Red"}`}
                          placeholder="Enter your Password"
                          type={passwordType}
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                        />
                      </div>
                    </div> */}
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
