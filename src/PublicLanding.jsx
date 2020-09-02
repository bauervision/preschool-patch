import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';


import Header from './Components/Header';
import { Footer } from './Components/Footer';
import { PatchLogo } from './Components';

import { Elegant, IvyHeart } from './images';


const PublicLanding = ({
  handleLogOut,
  loggedInUser,
  isLeader,
  myMessages,
  userId,
  history,
  emailVerified,
  redirect
}) => {
  // if we have a logged in user then redirect them to the proper initial location
  useEffect(() => {
    if (loggedInUser) {
      history.push(redirect.to);
    }
  }, [history, loggedInUser, redirect, redirect.to]);


  return (
    <div className="PublicLanding">
      <Header
        isHome
        loggedInUser={loggedInUser}
        handleLogOut={handleLogOut}
        isLeader={isLeader}
        myMessages={myMessages && myMessages}
        userId={userId}
        emailVerified={emailVerified}
      />

      {/* Initial Public display */}
      {!loggedInUser && (
        <>
          <div className="Flex AlignItems JustifyCenter Buffer ">
            <div className="HideMobile">
              <PatchLogo/></div>
          </div>


          <div className="Flex Col JustifyCenter Buffer MarginTopMobileHome">

            <div className="Tab SeeThru">
              <div>
                <img src={IvyHeart} alt="ivy" className="Padding MarginTopMobileHome" style={{ width: '30em' }}/>
              </div>

              {/* How it Works: Details */}
              <div className="Flex Col JustifyCenter AlignItems GreenFill TabBottom">

                <div className="Buffer Raleway MediumFont">
                  {"Preschool Patch offers a small group setting designed to elevate your child's education and social interactions in a warm, inviting, and safe space."}
                  <br />
                  <br />
            Max class size of 5 means that your child will not be just a
            number, but a nurtured student.
                </div>
                <div className="Flex">
                  <button className="Margins TeacherButton TextCenter" type="button"onClick={() => history.push('/login')}>
                          Are you a Parent?
                  </button>

                  <button className="Margins TeacherButton TextCenter" type="button"onClick={() => history.push('/createAccount')}>
                          Do you want to be a Teacher?
                  </button>
                </div>

              </div>
            </div>

          </div>

        </>
      )}

      <div>
        <img src={Elegant} alt="decorative" className="responsive filter-green Margins" />
      </div>

      <div className="CursiveFont RedicFont PinkFont" style={{ marginBottom: '1.3em' }}>Love Learning Early!</div>

      <Footer />

    </div>
  );
};
export default withRouter(PublicLanding);
