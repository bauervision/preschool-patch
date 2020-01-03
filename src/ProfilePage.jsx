import React from "react";
import { Footer } from "./Footer";

export const ProfilePage = ({ pageUpdate, data }) => {
  // pull out public data
  const {
    public: {
      aboutMe,
      age,
      assisted,
      available,
      experience,
      ftRate,
      infants,
      kidTotal,
      name,
      rating
    }
  } = data;

  const getPictureId = name => {
    switch (name) {
      case "Mike":
        return 50;
      case "Beth":
        return 29;
      case "Brianna":
        return 45;
      default:
        return 10;
    }
  };

  const handleContact = () => pageUpdate(1);
  const returnHome = () => pageUpdate(0);

  return (
    <div>
      <div>
        <header>
          <button onClick={returnHome}>Home</button>
        </header>

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
            src={`https://i.pravatar.cc/200?img=${getPictureId(name)}`}
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
