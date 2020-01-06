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

  const handleDataUpdate = () => {};

  const rates = { ft: 40, pt: 50, di: 60 };

  return (
    <div className="CreateAccount">
      <div>
        <Header pageUpdate={pageUpdate} myProfile />

        <h1>My Profile Page</h1>

        {/* Profile Pic */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            flexDirection: "row",
            margin: 5,
            marginRight: 40,
            border: "solid",
            borderWidth: 1,
            borderColor: "pink",
            borderRadius: 50,
            padding: 30
          }}
        >
          <img
            alt="profile pic"
            style={{ borderRadius: 25, width: 200, height: 200 }}
            src={photoUrl}
          />

          <div>
            <div>
              <h2 style={{ margin: 20, fontSize: 20 }}>{name}</h2>
            </div>

            <form>
              <EditField
                title="Age"
                placeholder={age}
                type="number"
                forLabel="Age"
                onChange={setAge}
                value={updatedAge}
              />

              <EditField
                title="Currently Enrolling"
                type="checkbox"
                forLabel="Enrolling"
                // onChange={setAge}
                value={available}
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

              <EditField
                title="Current student count"
                placeholder={kidTotal}
                type="number"
                forLabel="kidTotal"
                //onChange={setAge}
                value={kidTotal}
              />

              <EditField
                title="Currently Assisted?"
                type="checkbox"
                forLabel="assisted"
                // onChange={setAge}
                value={assisted}
              />

              <EditField
                title="Accepting Infants?"
                type="checkbox"
                forLabel="assisted"
                // onChange={setAge}
                value={infants}
              />

              <button type="submit" className="RegisterButton">
                Submit Changes
              </button>
            </form>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          margin: 5,
          marginRight: 40
        }}
      >
        <h3>About Me</h3>
        <EditField
          title="About Me"
          placeholder={aboutMe}
          type="text"
          forLabel="aboutMe"
          //onChange={setAge}
          value={aboutMe}
        />
      </div>

      <Footer />
    </div>
  );
};
