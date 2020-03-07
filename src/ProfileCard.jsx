import React from 'react';
import { Ratings } from './Components';

export const ProfileCard = ({ data, handleSelection }) => {
  // pull out data
  const {
    available,
    experience,
    rates,
    infants,
    name,
    rating,
    photoUrl,
  } = data;

  const getSelection = () => {
    handleSelection(data);
  };

  return (
    <div className="Card Flex Col" onClick={getSelection}>

      {/* Pic, Name and Rating */}
      <div className="Flex AlignItems JustifyCenter SmallBuffer">
        <img alt="profile pic" className="Card_Pic" src={photoUrl} />
        <div className="MarginHSmall Flex JustifyCenter Col">
          <div className="MarginTopSmall CursiveFont SuperFont PinkFont TextCenter" >{name}</div>
          <div className="textMargin">
            <Ratings rating={rating} />
          </div>
        </div>

      </div>

      {/* Data row 1*/}
      <div className=" Flex AlignItems JustifyCenter">

        <div className="textMargin">
          <span className="MediumFont">Years of Experience with Children:</span>
          <strong className="PinkFont">{experience}</strong>
        </div>

        {infants && (
          <div className="textMargin">
            <span className="MediumFont">Infants?:</span>{' '}
            <strong className="PinkFont">{ 'Yes!' }</strong>
          </div>
        )}
      </div>


      {/* Rates*/}
      <div className="Flex JustifyCenter AlignItems">
        <div className="MarginHSmall"> Full-time<span className="Price LargeFont PinkFont MarginHSmall">${rates && rates.ft}</span></div>
        <div className="MarginHSmall">Part-Time<span className="Price LargeFont PinkFont MarginHSmall">${rates && rates.pt}</span></div>
        <div className="MarginHSmall">Drop-In<span className="Price LargeFont PinkFont MarginHSmall">${rates && rates.di}</span></div>
      </div>

      {/* Show Ribbon if they are enrolling */}
      {available && (
        <div className="ribbon ribbon-top-left"><span>Enrolling</span></div>
      )}
    </div>
  );
};
