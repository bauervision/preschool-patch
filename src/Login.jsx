import React, { useState } from "react";

import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";

// Components
import { BasicInput, PasswordInput, Error, PageLogo } from "./Components";
import { Kids } from "./images/photos";

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

    // if we didn't get a user back, then there was an error
    if (!status.user) {
      const errorMessage = status.error.message;
      setLoginError(errorMessage);
    } else {
      // otherwise we had a successful login
      handleLogin(status.user);
    }
  };

  const validEmailRegex = RegExp(
    // eslint-disable-next-line
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

  const handleSubmitNew = async e => {
    e.preventDefault();

    const newUserData = {
      email,
      password,
      displayName: name,
      phoneNumber: phone,
      zipcode: zipcode
    };

    let status = await RegisterUser(email, password);
    console.log(status);
    if (!status.user) {
      const errorMessage = status.error.message;
      setLoginError(errorMessage);
    } else if (status) {
      // otherwise we had a successful login
      handleLogin(status.user, newUserData);
    }
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

  const handleUserTypeSwitch = userType => {
    setUserType(userType);
    setLoginError(null);
  };

  return (
    <div className="Login">
      <div>
        <Header pageUpdate={pageUpdate} isLogin />

        <PageLogo
          isLogin
          title="Login"
          handleUserTypeSwitch={handleUserTypeSwitch}
          userType={userType}
        />

        <div className="">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          ></div>

          {userType !== null && (
            <>
              {userType === 0 ? (
                // New User
                <form onSubmit={handleSubmitNew}>
                  <div className="Flex Col JustifyCenter AlignItems">
                    <h3>Thank you for Joining Preschool Patch!!</h3>
                    <p>
                      This will create your basic account so you can submit
                      requests to local Patch Leaders.
                    </p>
                    <p>
                      If you are interested in becoming a Patch Leader, you will
                      need to complete a different form found above.
                    </p>
                    <div className="Flex Col LoginForm BoxShadow">
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

                      {emailError || passwordError ? (
                        <div className="FakeButton">
                          Enter Valid Email and Password
                        </div>
                      ) : (
                        <button type="submit" className="RegisterButton">
                          Register
                        </button>
                      )}
                    </div>
                    {loginError && <Error errorMessage={loginError} />}
                  </div>
                </form>
              ) : (
                // Existing User
                <form onSubmit={handleSubmitLogin}>
                  <div className="Flex Col JustifyCenter AlignItems">
                    <h3>Welcome Back!</h3>
                    <div className="Flex Col LoginForm BoxShadow">
                      <BasicInput
                        title="Email"
                        type="email"
                        forLabel="email"
                        onChange={setEmail}
                        value={email}
                      />

                      <PasswordInput
                        handlePasswordVisibility={handlePasswordVisibility}
                        setPassword={setPassword}
                        password={password}
                        passwordType={passwordType}
                        passwordError={passwordError}
                      />

                      {emailError || passwordError ? (
                        <div className="FakeButton">
                          Enter Valid Email and Password
                        </div>
                      ) : (
                        <button type="submit">Login</button>
                      )}
                    </div>
                    {loginError && (
                      <div className="LoginError">{loginError}</div>
                    )}
                  </div>
                </form>
              )}
            </>
          )}

          <img src={Kids} alt="Working" className="Login_Imagery BoxShadow" />
        </div>
      </div>

      <Footer />
    </div>
  );
};
