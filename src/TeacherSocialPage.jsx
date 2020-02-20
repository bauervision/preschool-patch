import React from 'react';

import { Header } from './Components/Header';
import { Footer } from './Components/Footer';
import { SocialPost } from './Components';

import { Logo, Elegant } from './images';


export const TeacherSocialPage = ({ pageUpdate, loggedInUser, data, isLeader, myMessages, userId }) => {
  const { enrollment: { patchName } } = loggedInUser;
  return (
    <div>
      <div>
        <Header pageUpdate={pageUpdate} isSocial loggedInUser={loggedInUser} isLeader={isLeader} myMessages={myMessages} userId={userId}/>

        {/* Top Left Title */}
        <div className="CursiveFont SuperFont TextLeft Buffer " style={{ marginLeft: 30 }}>Preschool Patch</div>

        {/* Page Data*/}
        <div
          className="Flex AlignItems SeeThru Evenly"

        >


          {/* Page Title */}
          <div className="Flex Col JustifyCenter AlignItems">
            <div className="CursiveFont SuperFont PinkFont MarginBottom">{patchName}</div>

            <SocialPost loggedInUser={loggedInUser}/>
            <SocialPost loggedInUser={loggedInUser}/>
            <SocialPost loggedInUser={loggedInUser}/>
            <SocialPost loggedInUser={loggedInUser}/>


          </div>


        </div>

        <img src={Elegant} alt="decorative" className="filter-green Margins" />

      </div>

      <div className="Buffer">
        <img src={Logo} alt="logo" style={{ width: 600, height: 'auto' }} />
      </div>

      <Footer />
    </div>
  );
};
