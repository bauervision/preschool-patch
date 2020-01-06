import React from "react";
// import { storage } from "./config";

export const ProfileCard = ({ data, img, handleSelection }) => {
  // pull out data
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
      zipcode,
      photoUrl
    }
  } = data;

  const getSelection = () => {
    handleSelection(data);
  };

  console.log(photoUrl);
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
        <img alt="profile pic" className="Card_Pic" src={photoUrl} />
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
        className=" Flex Col"
        style={{
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
          <strong style={{ fontSize: 30, color: "#0b4f6c" }}>${ftRate}</strong>
        </div>
      </div>
    </div>
  );
};
