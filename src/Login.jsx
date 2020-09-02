import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';

import Header from './Components/Header';
import { Footer } from './Components/Footer';

// Components
import { PageLogo, PatchLogo } from './Components';

import { Elegant } from './images';
import { f } from './config';
import FirebaseUI from './Components/FirebaseUI';


const Login = ({ history, handleLogin, handleNewLogin }) => {
  const handleNewLoginAfterFirebase = (user) => {
    handleNewLogin(user, false);
    history.push('/home');
  };

  const handleLoginAfterFirebase = (user) => {
    handleLogin(user, false);
    history.push('/home');
  };
  // Configure FirebaseUI.
  const uiConfigReturningUser = {
  // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/home',
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

  const uiConfigNewUser = {
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
      signInSuccessWithAuthResult: (user) => handleNewLoginAfterFirebase(user)
    }
  };

  // handle local state


  const [userType, setUserType] = useState(null);
  const [choice, setChoice] = useState(0); // 0: no choice, 1: parent, 2: teacher


  const handleUserTypeSwitch = (ut) => {
    setUserType(ut);
  };


  return (
    <div >
      <div>

        <Header isLogin />

        <div className="CursiveFont SuperFont TextLeft Buffer " style={{ marginLeft: 30 }}>Login / Sign-up!</div>

        {/* Login Box */}
        <div className="MarginTop">
          <div
            className="Flex Col SeeThru RoundBorder SimpleBorder AlignItems JustifyCenter ThreeQuarters MarginAuto"
          >
            <div>
              <PageLogo
                isLogin
                title=""
                handleUserTypeSwitch={handleUserTypeSwitch}
                userType={userType}
              />
            </div>


            {userType !== null && (
              <>
                {userType === 0 ? (
                // New User
                  <>

                    {/* Are we wanting to be a Parent, or a Leader? */}
                    <div className="Flex Col AlignItems JustifyCenter ">

                      <div className="CursiveFont PinkFont LargeFont">Please Select Account Type</div>

                      <div className="Col">
                        <button
                          type="button" onClick={() => setChoice(1)}>
                          Are you a Parent?
                        </button>

                        <button type="button"onClick={() => history.push('/createAccount')}>
                          Do you want to be a Teacher?
                        </button>

                      </div>


                    </div>

                    {/* Display the proper form based on their choice */}
                    {/* New User Enrolling */}
                    {choice === 1 && (
                      <>
                        <div className="Margins SmallFont">By Signing in, you agree to our:
                          <br/>
                          <Link to="/terms">Terms of Use</Link> and <Link to="/privacyPolicy">Privacy Policy.</Link>
                        </div>
                        <FirebaseUI uiConfig={uiConfigNewUser} isNewUser={true}/>
                      </>
                    )}

                  </>
                ) : (
                // Existing User
                  <>
                    <FirebaseUI uiConfig={uiConfigReturningUser} isNewUser={false}/>

                  </>
                )}
              </>
            )}
          </div>
        </div>


      </div>

      <img src={Elegant} alt="decorative" className="filter-green Margins responsive" />
      <PatchLogo />

      <Footer />

    </div >
  );
};
export default withRouter(Login);
