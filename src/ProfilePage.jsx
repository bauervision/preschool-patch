import React, { useState } from 'react';

import { withRouter } from 'react-router-dom';
import Header from './Components/Header';
import { Footer } from './Components/Footer';
import { Ratings, Loader } from './Components';

import { DecorFlat, Logo, Elegant, NoPic, Contact } from './images';
import LightBox from './Components/LightBox';

import { database } from './config';

const ProfilePage = (props) => {
  const [profileData, setProfileData] = useState(null);
  // make sure we grab data if page loses it during refresh
  if (!profileData) {
    if (!props.data) {
    // we lost data on refresh so grab the id from the url
      const pathId = window.location.pathname.split('/');
      // and fetch this users data directly
      database.ref(`leaders/${pathId[2]}`).once('value', (snapshot) => {
        if (snapshot.val() !== null) {
          const data = snapshot.val();
          setProfileData(data.public);
        }
      });
    } else {
    // we have valid data from the page we came here from
      setProfileData(props.data);
    }
  }


  const { loggedInUser, history, emailVerified } = props;

  const herName = profileData?.name.replace(/ .*/, '');
  const buttonLabel = loggedInUser ? herName : (`Login to contact ${herName}`);


  return (

    <div>
      <div className="MarginTopMobile">
        <Header loggedInUser={loggedInUser} emailVerified={emailVerified}/>

        <div className="CursiveFont SuperFont TextLeft Buffer HideMobile" style={{ marginLeft: 30 }}>Profile Page</div>

        {!profileData ? (<Loader/>) : (
          <>
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
                        src={profileData?.photoUrl}
                      />
                    </div>
                    <div className="CursiveFont SuperFont PinkFont" >{profileData?.name}</div>
                    <Ratings rating={profileData?.rating} />
                  </div>

                  <div className="Flex Col JustifyCenter">
                    {/* Data */}

                    <div className="MarginTopSmall">

                      <div className="textMargin">
                        <div className="Price SuperFont FullSize PinkFill">{profileData?.available && 'Enrolling!'}</div>
                      </div>

                      <div className="textMargin">
                        <span className="profileText">Years of Experience:</span>
                        <strong className="profileText PinkFont">{profileData?.experience}</strong>
                      </div>

                      <div className="textMargin">
                        <span className="profileText">Total Kids Enrolled:</span>{' '}
                        <strong className="profileText PinkFont">{profileData?.kidTotal || 0}</strong>
                      </div>

                      <div className="textMargin">
                        <span className="profileText">Infants?:</span>{' '}
                        <strong className="profileText PinkFont">{profileData?.infants ? 'Yes!' : 'Not at this time'}</strong>
                      </div>

                      <div className="textMargin">
                        <span className="profileText">Age:</span>
                        <strong className="profileText PinkFont">{profileData?.age}</strong>
                      </div>

                    </div>

                    {/* Rates */}
                    <div className="Flex JustifyCenter HideMobile">
                      <div className="MarginHSmall "> Full-time<span className="Price LargeFont PinkFont MarginHSmall">${profileData?.rates && profileData?.rates.ft}</span></div>
                      <div className="MarginHSmall">Part-Time<span className="Price LargeFont PinkFont MarginHSmall">${profileData?.rates && profileData?.rates.pt}</span></div>
                      <div className="MarginHSmall">Drop-In<span className="Price LargeFont PinkFont MarginHSmall">${profileData?.rates && profileData?.rates.di}</span></div>
                    </div>
                  </div>

                </div>

                {/* About Me Row */}
                <div className="Flex Col JustifyStart WhiteFill MobileHalfToFull">
                  <div className="CursiveFont SuperFont">About Me</div>
                  <p className="MediumFont PinkFont Raleway SimpleBorder">{profileData?.aboutMe }</p>

                  {/* Contact Button: If loggedInUser and email verified, otherwise notify to login,*/}
                  <div className="FullSize">
                    {!emailVerified ? (
                      <div>Verify email to enable messaging this teacher</div>
                    ) : (
                      <button
                        disabled={!loggedInUser }// disable if logged in user hasnt yet verified email
                        onClick={() => {
                          if (loggedInUser && emailVerified) {
                            history.push('/messages');
                          } else if (!loggedInUser) {
                            history.push('/login');
                          }
                        }}
                        className="transparent NoMargin"
                        title={(loggedInUser && emailVerified) ? 'Message this teacher' : 'Verify your email first!'}
                      >
                        <div
                          className="Flex AlignItems JustifyCenter CursiveFont MediumFont PinkBorder RoundBorder PaddingLite"
                          style={{ borderLeft: 'none', borderRight: 'none', fontSize: '2em' }}>


                          {(loggedInUser && emailVerified) ? (
                            <>
                              <div>Contact</div>
                              <img src={Contact} alt="contact"/>
                              {buttonLabel}
                            </>
                          ) : (
                            <div> { buttonLabel }</div>
                          )}


                        </div>
                      </button>
                    )}

                  </div>

                </div>


              </div>
            </div>

            <img src={Elegant} alt="decorative" className="filter-green Margins responsive" />
            {/* Photo Gallery Section */}
            <div
              className="Flex Col AlignItems PinkFill SimpleBorder Margins" >

              <div className="CursiveFont SuperFont Buffer" title="The name of this teacher's preschool. Each teacher can set their own name">{profileData?.patchName || 'Un-named patch'}</div>

              <div className="MediumFont Raleway">
                {`" ${profileData?.gallery?.description} "`}
              </div>

              {/* Photo Gallery if any*/}
              {profileData?.gallery?.images && <div className="SimpleBorder WhiteFill Margins">
                <LightBox images={profileData?.gallery.images} />
              </div>
              }

              {/* If no images uploaded yet for their profile... */}
              {!profileData?.gallery.images && (
                <div className="RoundBorder GreyFont WhiteFill PaddingLite Margins" title="No photos uploaded yet">
                  <img src={NoPic} alt="no photos" className="filter-grey HalfSize"/></div>
              )}

              {/* Special Features */}
              <div>
                <div className="CursiveFont LargeFont Buffer ">Special Features of my Preschool</div>
                <ul className="TextLeft Padding" >
                  {profileData?.gallery?.features.map((feature) => (
                    <li key={feature} className="MediumFont Raleway">{feature}</li>
                  ))}
                </ul>

                <img src={DecorFlat} alt="decorative" className='filter-white responsive HideMobile' />
              </div>
            </div>


          </>
        )}
      </div>
      <div className="Buffer">
        <img src={Logo} alt="logo" className="responsive" />
      </div>

      <Footer />
    </div>


  );
};
export default withRouter(ProfilePage);
