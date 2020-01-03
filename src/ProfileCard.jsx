import React from "react";
// import { storage } from "./config";

export const ProfileCard = ({ data, img, handleSelection }) => {
  // pull out public data
  const {
    public: {
      age,
      assisted,
      available,
      experience,
      ftRate,
      infants,
      kidTotal,
      name,
      rating,
      zipcode
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

  const getSelection = () => {
    handleSelection(data);
  };

  return (
    <div className="Card" onClick={getSelection}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: 5,
          marginRight: 40
        }}
      >
        <img
          alt="profile pic"
          style={{ borderRadius: 50 }}
          src={`https://i.pravatar.cc/100?img=${getPictureId(name)}`}
        />
        <span>{name}</span>
      </div>

      <div style={{ textAlign: "left", margin: 5 }}>
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
      </div>

      <div style={{ textAlign: "left", margin: 5 }}>
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

        <div>
          <span className="profileText">Zipcode:</span>
          <strong>{zipcode}</strong>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          border: "solid",
          borderRadius: 10,
          borderWidth: 2,
          padding: 5,
          width: 100
        }}
      >
        <div>
          <div className="profileText">FT Rate:</div>
          <strong style={{ fontSize: 30, color: "blue" }}>${ftRate}</strong>
        </div>
      </div>
    </div>
  );
};
