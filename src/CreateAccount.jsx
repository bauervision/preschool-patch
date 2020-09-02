import React from 'react';

import { Link, withRouter } from 'react-router-dom';
import Header from './Components/Header';
import { Footer } from './Components/Footer';

import { PatchLogo } from './Components';

import { Elegant } from './images';

import FirebaseUI from './Components/FirebaseUI';

import { f } from './config';

const CreateAccount = ({
  loggedInUser,
  handleLogin,
  newMessageAlert,
  isLeader,
  myMessages,
}) => {
  // handle local state


  const handleLoginAfterFirebase = (user) => {
    handleLogin(user, true);
  };


  const uiConfigNewTeacher = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      f.auth.FacebookAuthProvider.PROVIDER_ID,
      f.auth.GoogleAuthProvider.PROVIDER_ID,
      f.auth.EmailAuthProvider.PROVIDER_ID

    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: (user) => handleLoginAfterFirebase(user)
    }
  };


  return (
    <div>
      <div>
        <Header
          isCreate
          loggedInUser={loggedInUser}
          isLeader={isLeader}
          myMessages={myMessages && myMessages}
          newMessageAlert={newMessageAlert}
        />

        <div className="CursiveFont SuperFont TextLeft Buffer HideMobile" style={{ marginLeft: 30 }}>Create Leader Account</div>


        <div
          className="Flex Col SeeThru RoundBorder SimpleBorder AlignItems JustifyCenter Margins MarginTopMobileLarge"

        >

          <div className="Flex Col JustifyCenter AlignItems RoundBorder WhiteFill PinkFont Margins">
            <div className="CursiveFont SuperFont">FT Earning Potential</div>
            <ul className="TextLeft MediumFont">
              <li>{'$40   - Daily rate'}</li>
              <li>{'6     - FT students enrolled'}</li>
              <li> {'5     - days a week'} </li>
              <li> {'$1,200  - weekly'} </li>
              <li > {'$4,800 - monthly'} </li>
            </ul>
          </div>

          <div className="Flex Col JustifyCenter AlignItems Buffer FullSize GreenFill RoundBorder Margins">
            <div className="CursiveFont LargeFont">Additional Revenue Options</div>

            <ul className="TextLeft">
              <li>{'$45   - Part Time rate ( students enrolled between 3 to 4 days a week)'}
              </li>
              <li>
                {
                  '$50   - Drop-in rate ( students who attend 1 to 2 days a week, or as needed)'
                }
              </li>
            </ul>
          </div>

          <br />


          <div className="Flex Col JustifyCenter AlignItems RoundBorder BoxShadow WhiteFill">

            <div>
              <div className="Margins SmallFont">By Signing in, you agree to our:
                <br/>
                <Link to="/terms">Terms of Use</Link> and <Link to="/privacyPolicy">Privacy Policy.</Link>
              </div>
              <FirebaseUI uiConfig={uiConfigNewTeacher} isNewUser={true}/>
            </div>

            <div className="Flex Col JustifyCenter AlignItems" >

              <p>
      Realize that the above rates are just examples! <br />
      Depending on your location, experience, and how marketable you are
      to prospective families, <br />
      those rates can be as high as you are willing to push them!
              </p>
            </div>


          </div>
        </div>


      </div>

      <img src={Elegant} alt="decorative" className="filter-green responsive" />

      <PatchLogo />

      <Footer />
    </div>
  );
};
export default withRouter(CreateAccount);
