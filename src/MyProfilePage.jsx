import React, { useState } from "react";

import { EditField } from "./Components";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";

export const MyProfilePage = ({ pageUpdate, data }) => {
  // pull out public data
  const {
    aboutMe,
    age,
    assisted,
    available,
    experience,
    ftRate,
    infants,
    kidTotal,
    name,
    photoUrl
  } = data && data;

  const [updatedAge, setAge] = useState(age);
  const [enrolling, setEnrolling] = useState(available);

  const handleEnrollingToggle = () => {
    console.log(!enrolling);
    setEnrolling(!enrolling);
  };
  const handleDataUpdate = () => {};

  const rates = { ft: 40, pt: 50, di: 60 };

  return (
    <div className="CreateAccount Col Flex JustifyCenter">
      <div>
        <Header pageUpdate={pageUpdate} myProfile />

        <h1 className="CursiveFont" style={{ color: "white" }}>
          My Profile Page
        </h1>

        {/* Profile Pic */}
        <div
          className="Flex Row"
          style={{
            backgroundColor: "white",
            justifyContent: "space-evenly",
            margin: 20,
            marginRight: 40,
            border: "solid",
            borderWidth: 1,
            borderColor: "green",
            borderRadius: 50,
            padding: 30
          }}
        >
          <div>
            <form>
              <div className="Flex Row AlignItems JustifyCenter">
                <img
                  className="BoxShadow"
                  alt="profile pic"
                  style={{
                    margin: 30,
                    borderRadius: 25,
                    width: 200,
                    height: 200
                  }}
                  src={photoUrl}
                />
                <EditField
                  title="Update Profile Pic"
                  type="file"
                  forLabel="profilePic"
                  // onChange={setAge}
                  //value={photoUrl}
                />
              </div>

              <div className="Flex Row AlignItems SimpleBorder">
                <EditField
                  title="Full Name"
                  placeholder={name}
                  type="text"
                  forLabel="Name"
                  //onChange={setAge}
                  value={name}
                />

                <EditField
                  title="Age"
                  placeholder={age}
                  type="number"
                  forLabel="Age"
                  onChange={setAge}
                  value={updatedAge}
                />
                <EditField
                  title="Years of Experience"
                  placeholder={experience}
                  type="number"
                  forLabel="experience"
                  //onChange={setAge}
                  value={experience}
                />

                <EditField
                  title="Current student count"
                  placeholder={kidTotal}
                  type="number"
                  forLabel="kidTotal"
                  //onChange={setAge}
                  value={kidTotal}
                />
              </div>

              <div>
                <h3 style={{ textAlign: "left" }} className="CursiveFont">
                  My Rates
                </h3>
                <div className="Flex Row AlignItems JustifyCenter SimpleBorder">
                  <EditField
                    title="Full Time Rate"
                    placeholder={age}
                    type="number"
                    forLabel="Age"
                    onChange={setAge}
                    value={rates.ft}
                  />
                  <EditField
                    title="Part Time Rate"
                    placeholder={age}
                    type="number"
                    forLabel="Age"
                    onChange={setAge}
                    value={rates.pt}
                  />
                  <EditField
                    title="Drop-In Rate"
                    placeholder={age}
                    type="number"
                    forLabel="Age"
                    onChange={setAge}
                    value={rates.di}
                  />
                </div>
              </div>

              <div>
                <h3 style={{ textAlign: "left" }} className="CursiveFont">
                  My Status
                </h3>
                <div className="Flex Row AlignItems JustifyCenter SimpleBorder">
                  <EditField
                    isCheck
                    title="Currently Enrolling"
                    type="checkbox"
                    forLabel="Enrolling"
                    onChange={handleEnrollingToggle}
                    value={enrolling}
                  />

                  <EditField
                    isCheck
                    title="Currently Assisted?"
                    type="checkbox"
                    forLabel="assisted"
                    // onChange={setAge}
                    value={assisted}
                  />

                  <EditField
                    isCheck
                    title="Accepting Infants?"
                    type="checkbox"
                    forLabel="assisted"
                    // onChange={setAge}
                    value={infants}
                  />
                </div>
              </div>

              <div>
                <h3 className="CursiveFont">About Me</h3>
                <EditField
                  isTextArea
                  title=""
                  placeholder={aboutMe}
                  type="text"
                  forLabel="aboutMe"
                  //onChange={setAge}
                  value={aboutMe}
                />
              </div>
              <button type="submit" className="RegisterButton">
                Submit Changes
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
