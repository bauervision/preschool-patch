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
  const [age, setAge] = useState(18);
  const [phone, setPhoneLogin] = useState("");
  const [zipcode, setZipcodeLogin] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  // Leader specific data
  const [experience, setExperience] = useState(0);
  const [background, setBackground] = useState(true);
  const [infants, setInfants] = useState(false);

  const validEmailRegex = RegExp(
    // eslint-disable-next-line
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

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
      photoUrl: ""
    };

    let status = await RegisterUser(email, password);
    console.log(status);
    if (!status.user) {
      const errorMessage = status.error.message;
      setLoginError(errorMessage);
    } else if (status) {
      // otherwise we had a successful login
      handleLogin(status.user, newUserData, true);
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

        <div
          className="Flex JustifyCenter AlignItems Buffer"
          style={{ backgroundColor: "green", color: "white" }}
        >
          <h2>What you get as a Patch Leader</h2>

          <ul style={{ textAlign: "left", marginTop: 50 }}>
            <li>Great earning potential by working from home!</li>
            <li>
              Free public profile that presents your school to local families
            </li>
            <li>
              Free access to Preschool Patch Mentors to help you become
              successful
            </li>
            <li>Free curriculum guidelines</li>
            <li>Free seasonal activity examples</li>
            <li>
              Free app that allows you to communicate with your student's
              parents
            </li>
          </ul>
        </div>
        <br />

        <div className="Flex JustifyCenter AlignItems Buffer">
          <h2>Typical Earning Potential</h2>

          <ul style={{ textAlign: "left", marginTop: 50 }}>
            <li>
              {" "}
              {"$35   - Average price for a Full time student ( per day )"}
            </li>
            <li>
              {" "}
              {"3     - number of FT students enrolled ( recommended )"}{" "}
            </li>
            <li> {"5     - days a week"} </li>
            <li> {"$525  - weekly"} </li>
            <li> {"$2100 - monthly"} </li>
          </ul>
        </div>

        <div
          className="Flex JustifyCenter AlignItems Buffer"
          style={{ backgroundColor: "green", color: "white" }}
        >
          <h2>Additional Revenue Options</h2>

          <ul style={{ textAlign: "left", marginTop: 50 }}>
            <li>
              {
                "$45   - Part Time rate ( students enrolled between 3 to 4 days a week)"
              }
            </li>
            <li>
              {
                "$55   - Drop-in rate ( students who attend 1 to 2 days a week, or as needed)"
              }
            </li>
          </ul>
        </div>

        <br />

        <h1>Are you ready to earn an extra $2000+ a month?!!</h1>
        <p>Realize that the above rates are just examples!</p>
        <p>
          Depending on your location, experience, and how marketable you are to
          prospective families, those rates can be as high as you are willing to
          push them!
        </p>
        <form onSubmit={handleSubmitNew}>
          <div className="Flex Col JustifyCenter AlignItems">
            <h3>Preschool Patch Leader Registration Form</h3>
            <p>
              Upon completion, you will be able to customize your profile and
              appear in local searches.
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

        <p>
          * <strong>Please Note!</strong> While a background check is{" "}
          <strong>not required</strong> to become a Preschool Patch leader, it
          will help potential families feel at ease leaving their children with
          you and is <strong>highly recommended</strong>
        </p>
        <br />

        <p>
          * While we limit no more than 5 children per Patch Leader, if you
          have, or can acquire an assistant, you may double that limit and still
          run a successful home business.
        </p>
      </div>

      <Footer />
    </div>
  );
};
