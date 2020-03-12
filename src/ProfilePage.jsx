import React from 'react';

import { Header } from './Components/Header';
import { Footer } from './Components/Footer';
import { Ratings } from './Components';

import { DecorFlat, Logo, Elegant, NoPic } from './images';
import LightBox from './Components/LightBox';

export const ProfilePage = ({ pageUpdate, data, loggedInUser }) => {
  // pull out public data
  const {
    aboutMe,
    age,
    available,
    experience,
    gallery,
    rates,
    infants,
    kidTotal,
    name,
    rating,
    photoUrl

  } = data;

  const herName = name.replace(/ .*/, '');
  const buttonLabel = loggedInUser ? (`Contact ${herName}`) : (`Login to contact ${herName}`);

  return (
    <div>
      <div className="MarginTopMobile">
        <Header pageUpdate={pageUpdate} loggedInUser={loggedInUser} />

        <div className="CursiveFont SuperFont TextLeft Buffer HideMobile" style={{ marginLeft: 30 }}>Profile Page</div>

        {/* Profile Pic and Data Section*/}
        <div className="MarginTop">
          <div className="Flex MobileRowToCol JustifyCenter AlignItems SeeThru RoundBorder SimpleBorder Margins BoxShadow MarginTopMobileHome" >


            {/* Data Row */}
            <div className="Buffer MobileHalfToFull">
              <div className="Flex Col JustifyCenter">
                <div>
                  <img
                    className="Card_Pic"
                    alt="profile pic"
                    src={photoUrl}
                  />
                </div>
                <div className="CursiveFont SuperFont PinkFont" >{name}</div>
                <Ratings rating={rating} />
              </div>

              <div className="Flex Col JustifyCenter">
                {/* Data */}

                <div className="MarginTopSmall">

                  <div className="textMargin">
                    <span className="Price SuperFont FullSize PinkFill">{available && 'Enrolling!'}</span>
                  </div>


                  <div className="textMargin">
                    <span className="profileText">Years of Experience:</span>
                    <strong className="profileText PinkFont">{experience}</strong>
                  </div>

                  <div className="textMargin">
                    <span className="profileText">Total Kids Enrolled:</span>{' '}
                    <strong className="profileText PinkFont">{kidTotal || 0}</strong>
                  </div>

                  <div className="textMargin">
                    <span className="profileText">Infants?:</span>{' '}
                    <strong className="profileText PinkFont">{infants ? 'Yes!' : 'Not at this time'}</strong>
                  </div>


                  <div className="textMargin">
                    <span className="profileText">Age:</span>
                    <strong className="profileText PinkFont">{age}</strong>
                  </div>


                </div>

                {/* Rates */}
                <div className="Flex JustifyCenter HideMobile">
                  <div className="MarginHSmall "> Full-time<span className="Price LargeFont PinkFont MarginHSmall">${rates && rates.ft}</span></div>
                  <div className="MarginHSmall">Part-Time<span className="Price LargeFont PinkFont MarginHSmall">${rates && rates.pt}</span></div>
                  <div className="MarginHSmall">Drop-In<span className="Price LargeFont PinkFont MarginHSmall">${rates && rates.di}</span></div>
                </div>

              </div>

            </div>

            {/* About Me Row */}
            <div className="Flex Col JustifyStart WhiteFill MobileHalfToFull">
              <div className="CursiveFont SuperFont">About Me</div>
              <p className="MediumFont PinkFont Raleway SimpleBorder">{aboutMe}</p>

              {/* Contact Button: If loggedInUser, otherwise notify to login*/}
              <button
                onClick={() => pageUpdate(!loggedInUser ? 1 : 6)}
                className="CursiveFont LargeFont">
                {buttonLabel}
              </button>

            </div>


          </div>
        </div>

        <img src={Elegant} alt="decorative" className="filter-green Margins responsive" />
        {/* Photo Gallery Section */}
        <div
          className="Flex Col AlignItems PinkFill SimpleBorder Margins" >

          <div className="CursiveFont LargeFont Buffer">Gallery</div>

          <div className="MediumFont Raleway">
            {`" ${gallery && gallery.description} "`}
          </div>

          {/* Photo Gallery if any*/}
          {gallery.images && <div className="SimpleBorder WhiteFill Margins">
            <LightBox images={gallery.images} />
          </div>
          }

          {/* If no images uploaded yet for their profile... */}
          {!gallery.images && (
            <div className="RoundBorder GreyFont WhiteFill PaddingLite Margins" title="No photos uploaded yet">
              <img src={NoPic} alt="no photos" className="filter-grey HalfSize"/></div>
          )}

          {/* Special Features */}
          <div>
            <div className="CursiveFont LargeFont Buffer ">Special Features of my Preschool</div>
            <ul className="TextLeft Padding" >
              {gallery && gallery.features.map((feature) => (
                <li key={feature} className="MediumFont Raleway">{feature}</li>
              ))}
            </ul>

            <img src={DecorFlat} alt="decorative" className='filter-white responsive HideMobile' />
          </div>
        </div>
      </div>

      <div className="Buffer">
        <img src={Logo} alt="logo" className="responsive" />
      </div>

      <Footer />
    </div>
  );
};
