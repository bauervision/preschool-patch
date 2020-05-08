import React from 'react';
import { withRouter } from 'react-router-dom';

import { Ratings } from './Components';

const ProfileCard = ({ data, handleSelection, history }) => {
  // pull out data
  const {
    available,
    experience,
    rates,
    id,
    infants,
    name,
    rating,
    photoUrl,
  } = data;

  const getSelection = () => {
    handleSelection(data);
    history.push(`/profile/${id}`);
  };

  return (
    <div
      className="Card Flex Col FullSize" onClick={getSelection} style={{
        backgroundColor: available && '#FF4C76'
      }}>

      {/* Pic, Name and Rating */}
      <div className="Flex AlignItems JustifyCenter SmallBuffer">
        <img alt="profile pic" className="Card_Pic" src={photoUrl} />
        <div className="MarginHSmall Flex JustifyCenter Col">
          <div className={`MarginTopSmall CursiveFont LargeFont TextCenter ${available ? 'WhiteFont' : 'PinkFont'} `}>{name}</div>
          <div className="textMargin">
            <Ratings rating={rating} />
          </div>
        </div>
      </div>

      {/* Data row 1*/}
      <div className=" Flex AlignItems JustifyCenter">
        <div className="textMargin">
          <span className={`SmallFont ${available && 'WhiteFont'}`}>Years of Experience with Children:</span>
          <strong className={available ? 'WhiteFont' : 'PinkFont'}>{experience}</strong>
        </div>
        {infants && (
          <div className="textMargin">
            <span className={`SmallFont ${available && 'WhiteFont'}`}>Infants?:</span>{' '}
            <strong className={available ? 'WhiteFont' : 'PinkFont'}>{ 'Yes!' }</strong>
          </div>
        )}
      </div>

      {/* Rates*/}
      <div className="Flex JustifyCenter HideMobile">
        <div className="MarginHSmall "> Full-time<span className="Price LargeFont PinkFont MarginHSmall">${rates?.ft}</span></div>
        <div className="MarginHSmall">Part-Time<span className="Price LargeFont PinkFont MarginHSmall">${rates?.pt}</span></div>
        <div className="MarginHSmall">Drop-In<span className="Price LargeFont PinkFont MarginHSmall">${rates?.di}</span></div>
      </div>

      <div className="Flex JustifyCenter ShowMobile">
        FT<span className={`Price LargeFont  MarginHSmall ${available ? 'WhiteFont' : 'PinkFont'}`}>${rates?.ft}</span>
        PT<span className={`Price LargeFont  MarginHSmall ${available ? 'WhiteFont' : 'PinkFont'}`}>${rates?.pt}</span>
        Drop-In<span className={`Price LargeFont  MarginHSmall ${available ? 'WhiteFont' : 'PinkFont'}`}>${rates?.di}</span>
      </div>

      {/* Show Ribbon if they are enrolling: only shown on desktop */}
      {available && <div className="ribbon ribbon-top-left mobile-top-left HideMobile"><span>Enrolling</span></div>}
    </div>
  );
};
export default withRouter(ProfileCard);
