import React from "react";

import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";

export const ProfilePage = ({ pageUpdate, data }) => {
  // pull out public data
  const {
    public: {
      aboutMe,
      age,
      assisted,
      available,
      experience,
      // ftRate,
      infants,
      kidTotal,
      name,
      rating,
      photoUrl
    }
  } = data;

  const handleContact = () => pageUpdate(1);
  // const returnHome = () => pageUpdate(0);

  return (
    <div>
      <div>
        <Header pageUpdate={pageUpdate} />

        <h1>Profile Page</h1>

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
            <div className="textMargin">
              <span className="profileText">Age:</span>
              <strong>{age}</strong>
            </div>

            <div className="textMargin">
              <span className="profileText">Currently Enrolling:</span>
              <strong>{available}</strong>
            </div>

            <div className="textMargin">
              <span className="profileText">Years of Experience:</span>
              <strong>{experience}</strong>
            </div>

            <div className="textMargin">
              <span className="profileText">Preschool Rating:</span>
              <strong>{rating}</strong>
            </div>

            <div className="textMargin">
              <span className="profileText">Total Kids:</span>{" "}
              <strong>{kidTotal}</strong>
            </div>
            <div className="textMargin">
              <span className="profileText">Assisted?</span>{" "}
              <strong>{assisted}</strong>
            </div>
            <div className="textMargin">
              <span className="profileText">Infants?:</span>{" "}
              <strong>{infants}</strong>
            </div>
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
        <p>{aboutMe}</p>
        {/* Contact Button */}
        <button onClick={handleContact}>{`Contact ${name}`}</button>
      </div>

      <Footer />
    </div>
  );
};
