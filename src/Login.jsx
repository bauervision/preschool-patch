import React, { useState } from "react";

import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";

// Components
import { BasicInput, PasswordInput, Error, PageLogo, PatchLogo } from "./Components";

// import { SignUp } from "./SignUp";
import { RegisterUser, LoginUserEmailPassword } from "./helpers/auth";
import { Elegant } from "./images";

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
  const [choice, setChoice] = useState(0); // 0: no choice, 1: parent, 2: teacher

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    let status = await LoginUserEmailPassword(email, password);

    // if we didn't get a user back, then there was an error
    if (!status.user) {
      const errorMessage = status.error.message;
      setLoginError(errorMessage);
    } else {
      // otherwise we had a successful login
      handleLogin(status.user);
      pageUpdate(0)
    }
  };

  const validEmailRegex = RegExp(
    // eslint-disable-next-line
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

  const handleSubmitNew = async (e) => {
    e.preventDefault();

    const newUserData = {
      email,
      password,
      displayName: name,
      phoneNumber: phone,
      zipcode: zipcode,
      photoUrl:
        "https://firebasestorage.googleapis.com/v0/b/preschoolpatch-f04be.appspot.com/o/public%2Favatar.png?alt=media&token=b5f43a4b-4e65-4e4a-b096-54a69de16490"

    };

    let status = await RegisterUser(email, password);

    if (!status.user) {
      const errorMessage = status.error.message;
      setLoginError(errorMessage);
    } else if (status) {
      // otherwise we had a successful login
      handleLogin(status.user, newUserData);
    }
  };

  const setEmail = (email) => {
    const error = validEmailRegex.test(email) ? "" : "Email is not valid!";
    setEmailError(error);
    setEmailLogin(email);
  };

  const setPassword = (password) => {
    const error = password.length < 6;
    setPasswordError(error);
    setPasswordLogin(password);
  };

  const handlePasswordVisibility = () => {
    setPasswordType(!showPassword ? "text" : "password");
    setShowPassword(!showPassword);
  };

  const handleUserTypeSwitch = (userType) => {
    setUserType(userType);
    setLoginError(null);
  };

  return (
    <div >
      <div>
        <Header pageUpdate={pageUpdate} isLogin />

        <div className="CursiveFont SuperFont TextLeft Buffer " style={{ marginLeft: 30 }}>Login / Sign-up!</div>

        {/* Login Box */}
        <div className="MarginTop">
          <div
            className="Flex Col SeeThru RoundBorder SimpleBorder AlignItems JustifyCenter" style={{ width: '50%', margin: 'auto' }}

          >
            <div>
              <PageLogo
                isLogin
                title=""
                handleUserTypeSwitch={handleUserTypeSwitch}
                userType={userType}
              />
            </div>


            {userType !== null && (
              <>
                {userType === 0 ? (
                  // New User
                  <>

                    {/* Are we wanting to be a Parent, or a Leader? */}
                    <div className="Flex Col AlignItems JustifyCenter ">

                      <div className="CursiveFont PinkFont LargeFont">Please Select Account Type</div>

                      <div className="Col">
                        <button
                          type="button" onClick={() => setChoice(1)}>
                          Are you a Parent?
                     </button>

                        <button type="button" onClick={() => pageUpdate(2)}>
                          Do you want to be a Teacher?
                    </button>

                      </div>



                    </div>

                    {/* Display the proper form based on their choice */}
                    {choice === 1 && (
                      <form onSubmit={handleSubmitNew}>
                        <div className="Flex Col JustifyCenter AlignItems">
                          <h3>Thank you for Joining Preschool Patch!!</h3>
                          <p>
                            This will create your basic account so you can search and submit
                            requests to local Patch Leaders.
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
                    )}

                  </>
                ) : (
                    // Existing User
                    <form onSubmit={handleSubmitLogin}>
                      <div className="Flex Col JustifyCenter AlignItems">
                        <div className="CursiveFont PinkFont LargeFont">Welcome Back!</div>
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
          </div>

        </div>

      </div>

      <img src={Elegant} alt="decorative" className="filter-green Margins" />



      <PatchLogo />
      <Footer />
    </div >
  );
};
