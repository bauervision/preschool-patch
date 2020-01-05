import React, { useState } from "react";

import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";

import { BasicInput, PasswordInput, Error, PageLogo } from "./Components";

import { RegisterUser } from "./helpers/auth";

export const CreateAccount = ({ pageUpdate, loggedInUser, handleLogin }) => {
  // handle local state
  const [emailError, setEmailError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);
  const [loginError, setLoginError] = useState(null);
  const [email, setEmailLogin] = useState("");
  const [password, setPasswordLogin] = useState("");
  const [name, setNameLogin] = useState("");
  const [phone, setPhoneLogin] = useState("");
  const [zipcode, setZipcodeLogin] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState("password");

  const validEmailRegex = RegExp(
    // eslint-disable-next-line
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

  const handleSubmitNew = async e => {
    e.preventDefault();
    const newUserData = {
      email,
      password,
      displayName: name
    };

    let status = await RegisterUser(newUserData);

    console.log(status);
    if (status && !status.successful) {
      const errorMessage = status.error.message;
      setLoginError(errorMessage);
    } else if (status) {
      // otherwise we had a successful login
      handleLogin(status);
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

  return (
    <div className="CreateAccount">
      <div>
        <Header pageUpdate={pageUpdate} isCreate loggedInUser={loggedInUser} />

        <PageLogo title="Create a Patch Leader Account" />

        <form onSubmit={handleSubmitNew}>
          <div className="Flex Col JustifyCenter AlignItems">
            <h3>Thank you becoming a Preschool Patch Community Leader!!</h3>
            <p>
              Complete this form to begin the process. Upon completion, you will
              be able to customize your profile and appear in local searches.
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
                <div className="FakeButton">Enter Valid Email and Password</div>
              ) : (
                <button type="submit" className="RegisterButton">
                  Register
                </button>
              )}
            </div>
            {loginError && <Error errorMessage={loginError} />}
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};
