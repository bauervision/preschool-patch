import React from "react";
import { Ratings } from "./Components";

export const ProfileCard = ({ data, handleSelection }) => {
  // pull out data
  const {
    age,
    available,
    experience,
    rates,
    infants,
    kidTotal,
    name,
    rating,
    zipcode,
    photoUrl,


  } = data;

  const getSelection = () => {
    handleSelection(data);
  };

  return (
    <div className="Card" onClick={getSelection}>
      {/* Profile Pic */}
      <div className="Flex Col JustifyCenter AlignItems Buffer  " style={{ width: '30%' }}>
        <img alt="profile pic" className="Card_Pic" src={photoUrl} />
        <span>{name}</span>
      </div>

      {/* Data row 1*/}
      <div className="Flex Col Buffer " style={{ textAlign: "left", width: '30%' }}>

        <div className="textMargin">
          <Ratings rating={rating} />
        </div>

        {available && (
          <div className="textMargin">
            <span className="profileText"><strong>Currently Enrolling!</strong></span>

          </div>
        )}



        <div className="textMargin">
          <span className="profileText">Years of Experience:</span>
          <strong>{experience}</strong>
        </div>

        <div className="textMargin">
          <span className="profileText">Age:</span>
          <strong>{age}</strong>
        </div>

      </div>

      {/* Data row 2*/}
      <div className="Flex Col Buffer " style={{ textAlign: "left", width: '30%' }}>
        <div className="textMargin">
          <span className="profileText">Total Kids:</span>{" "}
          <strong>{kidTotal}</strong>
        </div>

        <div className="textMargin">
          <span className="profileText">Infants?:</span>{" "}
          <strong>{infants ? 'Yes!' : 'Not at this time'}</strong>
        </div>

        <div>
          <span className="profileText">Zipcode:</span>
          <strong>{zipcode}</strong>
        </div>
      </div>

      {/* Rates*/}
      <div className="Flex Col Buffer SimpleBorder " style={{ textAlign: "left", width: '10%' }}>

        <div className="Tooltip">
          <span className="TT_Text">Full-time, Part-time, and Drop-in rates</span>
          <div className="Price LargeFont PinkFont">${rates && rates.ft}</div>
          <div className="Price LargeFont PinkFont">${rates && rates.pt}</div>
          <div className="Price LargeFont PinkFont">${rates && rates.di}</div>

        </div>
      </div>
    </div>
  );
};
