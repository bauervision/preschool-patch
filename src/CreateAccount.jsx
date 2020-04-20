import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import Header from './Components/Header';
import { Footer } from './Components/Footer';

import { BasicInput, PasswordInput, Error, PatchLogo } from './Components';

import { RegisterUser } from './helpers/auth';
import { Elegant } from './images';
// import { f, storage } from "./config";

export const CreateAccount = ({
  loggedInUser,
  handleLogin,
  newMessageAlert,
  isLeader,
  myMessages }) => {
  // handle local state
  const [emailError, setEmailError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);
  const [loginError, setLoginError] = useState(null);
  const [email, setEmailLogin] = useState('');
  const [password, setPasswordLogin] = useState('');
  const [name, setNameLogin] = useState('');
  const [age, setAge] = useState(18);
  const [phone, setPhoneLogin] = useState('');
  const [zipcode, setZipcodeLogin] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState('password');
  // Leader specific data
  const [experience, setExperience] = useState(0);
  const [background, setBackground] = useState(true);
  const [infants, setInfants] = useState(false);

  const validEmailRegex = RegExp(
    // eslint-disable-next-line
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

  // eslint-disable-next-line
  const handleSubmitNew = async e => {

    e.preventDefault();
    const newUserData = {
      age,
      email,
      password,
      displayName: name,
      phoneNumber: phone,
      zipcode,
      experience,
      backgroundCheck: background,
      infants,
      photoUrl:
        'https://firebasestorage.googleapis.com/v0/b/preschoolpatch-f04be.appspot.com/o/public%2Favatar.png?alt=media&token=b5f43a4b-4e65-4e4a-b096-54a69de16490'
    };

    const status = await RegisterUser(email, password);

    if (!status.user) {
      const errorMessage = status.error.message;
      setLoginError(errorMessage);
    } else {
      // otherwise we had a successful login
      handleLogin(status.user, newUserData, true);
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

  return (
    <div>
      <div>
        <Header
          isCreate
          loggedInUser={loggedInUser}
          isLeader={isLeader}
          myMessages={myMessages && myMessages}
          newMessageAlert={newMessageAlert}
        />

        <div className="CursiveFont SuperFont TextLeft Buffer " style={{ marginLeft: 30 }}>Create Leader Account</div>

        <div
          className="Flex Col SeeThru RoundBorder SimpleBorder AlignItems JustifyCenter Margins"

        >
          <div className="Flex Col JustifyCenter AlignItems Tab PinkFill FullSize" >
            <div className="CursiveFont SuperFont">What you get as a Patch Leader</div>

            <ul className="TextLeft">
              <li>{'Great earning potential by working from home!'}</li>
              <li>{'Free public profile that presents your school to local families'}</li>
              <li>{' Free access to Preschool Patch Mentors to help you become successful'}</li>
              <li>{'Free curriculum guidelines'}</li>
              <li>{'Free seasonal activity examples'}</li>
              <li>{"Free app that allows you to communicate with your student's parents"}</li>
            </ul>
          </div>


          <div className="Flex Col JustifyCenter AlignItems RoundBorder WhiteFill PinkFont Margins">
            <div className="CursiveFont SuperFont">Typical Earning Potential</div>

            <ul className="TextLeft">
              <li>{'$35   - Average price for a Full time student ( per day )'}</li>
              <li>{'3     - number of FT students enrolled ( recommended )'}</li>
              <li> {'5     - days a week'} </li>
              <li> {'$525  - weekly'} </li>
              <li> {'$2100 - monthly'} </li>
            </ul>
          </div>

          <div className="Flex Col JustifyCenter AlignItems Buffer FullSize GreenFill RoundBorder Margins">
            <div className="CursiveFont SuperFont">Additional Revenue Options</div>

            <ul className="TextLeft">
              <li>
                {
                  '$45   - Part Time rate ( students enrolled between 3 to 4 days a week)'
                }
              </li>
              <li>
                {
                  '$55   - Drop-in rate ( students who attend 1 to 2 days a week, or as needed)'
                }
              </li>
            </ul>
          </div>

          <br />

          <div className="Flex Col JustifyCenter AlignItems" >
            <div className="CursiveFont SuperFont">Are you ready to earn an extra $2000+ a month?!!</div>
            <p>
              Realize that the above rates are just examples! <br />
              Depending on your location, experience, and how marketable you are
              to prospective families, <br />
              those rates can be as high as you are willing to push them!
            </p>
          </div>


          <div className="Flex Col JustifyCenter AlignItems RoundBorder BoxShadow WhiteFill">
            <form onSubmit={handleSubmitNew}>
              <div className="Flex Col JustifyCenter AlignItems">
                <div className="CursiveFont PinkFont SuperFont PaddingTop">Preschool Patch Leader Registration Form</div>
                <p>
                  Upon completion, you will be able to customize your profile
                  and appear in local searches.
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
                    title="Age"
                    type="tenumberxt"
                    forLabel="age"
                    onChange={setAge}
                    value={age}
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

                  {/* Leader specific data */}
                  <BasicInput
                    title="Years of Children Experience"
                    type="number"
                    forLabel="experience"
                    onChange={setExperience}
                    value={experience}
                  />

                  <BasicInput
                    title="Willing to get a Background Check?"
                    type="checkbox"
                    forLabel="background"
                    onChange={setBackground}
                    value={background}
                  />

                  <BasicInput
                    title="Accepting Infants?"
                    type="checkbox"
                    forLabel="infants"
                    onChange={setInfants}
                    value={infants}
                  />

                  <PasswordInput
                    handlePasswordVisibility={handlePasswordVisibility}
                    setPassword={setPassword}
                    password={password}
                    passwordType={passwordType}
                    passwordError={passwordError}
                  />

                  <div className="Margins SmallFont">By clicking "Register," you agree to our:
                    <br/>
                    <Link to="/terms">Terms of Use</Link> and <Link to="/privacyPolicy">Privacy Policy.</Link>
                  </div>

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

            <div className="PinkFill Margins BoxShadow RoundBorder PaddingBoost">
              * <strong>Please Note!</strong> While a background check is{' '}
              <strong>not required</strong> to become a Preschool Patch leader,
              <br />
              it does help potential families feel at ease leaving their
              children with you and is <strong>highly recommended</strong>
            </div>

          </div>
        </div>
      </div>

      <img src={Elegant} alt="decorative" className="filter-green responsive" />

      <PatchLogo />

      <Footer />
    </div>
  );
};
