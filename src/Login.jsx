import React, { useState } from 'react';

import { Header } from './Components/Header';
import { Footer } from './Components/Footer';

// Components
import { BasicInput, PasswordInput, Error, PageLogo, PatchLogo, KidSection } from './Components';

// import { SignUp } from "./SignUp";
import { RegisterUser, LoginUserEmailPassword } from './helpers/auth';
import { Add, Elegant } from './images';

export const Login = ({ pageUpdate, handleLogin }) => {
  // handle local state
  const [emailError, setEmailError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);
  const [loginError, setLoginError] = useState(null);
  const [email, setEmailLogin] = useState('');
  const [password, setPasswordLogin] = useState('');
  const [name, setNameLogin] = useState('');
  const [phone, setPhoneLogin] = useState('');
  const [zipcode, setZipcodeLogin] = useState('');
  const [userType, setUserType] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState('password');
  const [choice, setChoice] = useState(0); // 0: no choice, 1: parent, 2: teacher
  const [kidTotal, setKidTotal] = useState([]);

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const status = await LoginUserEmailPassword(email, password);

    // if we didn't get a user back, then there was an error
    if (!status.user) {
      const errorMessage = status.error.message;
      setLoginError(errorMessage);
    } else {
      // otherwise we had a successful login
      handleLogin(status.user);
      pageUpdate(0);
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
      name,
      phone,
      zipcode,
      children: kidTotal,
      photoUrl:
        'https://firebasestorage.googleapis.com/v0/b/preschoolpatch-f04be.appspot.com/o/public%2Favatar.png?alt=media&token=b5f43a4b-4e65-4e4a-b096-54a69de16490'

    };


    const status = await RegisterUser(email, password);

    if (!status.user) {
      const errorMessage = status.error.message;
      setLoginError(errorMessage);
    } else if (status) {
      // otherwise we had a successful login
      handleLogin(status.user, newUserData);
    }
  };

  const setEmail = (e) => {
    const error = validEmailRegex.test(e) ? '' : 'Email is not valid!';
    setEmailError(error);
    setEmailLogin(e);
  };

  const setPassword = (pw) => {
    const error = pw.length < 6;
    setPasswordError(error);
    setPasswordLogin(pw);
  };

  const handlePasswordVisibility = () => {
    setPasswordType(!showPassword ? 'text' : 'password');
    setShowPassword(!showPassword);
  };

  const handleUserTypeSwitch = (ut) => {
    setUserType(ut);
    setLoginError(null);
  };

  const handleSetChildName = (n, index) => {
    // get kid
    const kids = [...kidTotal];
    const thisKid = kids[index];
    // update their data
    thisKid.name = n;
    kids[index] = thisKid;

    // update state
    setKidTotal(kids);
  };

  const handleSetChildAge = (age, index) => {
    const kids = [...kidTotal];
    const thisKid = kids[index];
    thisKid.age = Number(age);
    kids[index] = thisKid;
    setKidTotal(kids);
  };

  const addNewChildInfo = (e) => {
    e.preventDefault();
    const newKid = { name: '', age: '', enrollment: '' };
    const updatedInfo = [...kidTotal];
    if (updatedInfo.length <= 4) {
      updatedInfo.push(newKid);
      setKidTotal([...updatedInfo]);
    }
  };

  const handleSetChildInterest = (interest, index) => {
    const kids = [...kidTotal];
    const thisKid = kids[index];
    thisKid.enrollment = interest;
    kids[index] = thisKid;
    setKidTotal(kids);
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
                    {/* New User Enrolling */}
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


                            {/* Kid section */}
                            <div className="Flex Col AlignItems SimpleBorder JustifyCenter" style={{ width: 570 }}>

                              <div className="PinkFont CursiveFont LargeFont">Children Info</div>

                              {kidTotal && kidTotal.map((kid, index) => (
                                <KidSection
                                  key={kid.name + index.toString()}
                                  location={index}
                                  name={kid.name}
                                  age={kid.age}
                                  interest={kid.enrollment}
                                  handleSetChildAge={handleSetChildAge}
                                  handleSetChildName={handleSetChildName}
                                  handleSetChildInterest={handleSetChildInterest}
                                />
                              ))}

                              {/* Add new Kid Info */}
                              {kidTotal.length <= 4 ? (
                                <button id={kidTotal.length} className="Add" type='button' onClick={(e) => addNewChildInfo(e)}>
                                  <div> Add Additonal Child?</div>
                                  <img src={Add} alt="Add new child info" />
                                </button>

                              )
                                // Once we hit our kid limit, disable adding more
                                : (
                                  <div className="PinkFont">5 is the max for any single Preschool Patch!</div>
                                )}


                            </div>


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

                          <div className="Flex Col JustifyCenter AlignItems">

                            <p>
                              Note; Once your account has been created, you will be able to update your account
                              and add details concerning any children you are looking to enroll.
                            </p>
                          </div>
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
