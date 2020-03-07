import React, { useState, useEffect } from 'react';

import { Home, MessageIcon, Enrolled } from '../images';

import { SignUserOut } from '../helpers/auth';

export const Header = ({
  pageUpdate,
  myProfile,
  isHome,
  isLeader,
  isLogin,
  isSocial,
  isAdmin,
  isMessages,
  loggedInUser,
  myMessages,
  userId
}) => {
  const [newMessageAlert, setNewMessageAlert] = useState(false);

  useEffect(() => {
    if (myMessages?.length > 0) {
      const foundUnread = myMessages.some((elem) => elem.lastMessage.author !== userId);
      setNewMessageAlert(foundUnread);
    }
  }, [myMessages, userId]);

  const LogOut = () => {
    SignUserOut();
    pageUpdate(0);
  };

  // if we aren't a leader, check to see if we're enrolled, if we are a leader, show our social page link
  const currentlyEnrolled = (!isLeader ? (loggedInUser?.enrollment?.accepted || false) : true);

  return (
    <header className="Header LightShadow">
      <div className="Flex AlignItems JustifyCenter">

        <div className="Header_Logo">
          <div className="CursiveFont TextLeft WhiteFont ">Preschool Patch</div>
        </div>


        {/* Show Home Icon, if we're not on home page' */}
        {!isHome && (
          <div>
            <img
              src={Home}
              alt="Home icon"

              onClick={() => pageUpdate(0)}
            />
          </div>
        )}


        {/* We're not yet logged in */}
        {!loggedInUser ? (
          // If we are not logged in, the only option we should see on the header is to signup
          // IF we're not on the login page
          <>
            {!isLogin && (

              <button className='HeaderButton' onClick={() => pageUpdate(1)}>Login / Signup</button>

            )}
          </>

        ) : (
        // we are now logged in
          <>

            {/* Show Teachers Social page Icon, if we're not already there */}
            {(!isSocial && currentlyEnrolled) && (
              <div>
                <img
                  src={Enrolled}
                  alt="Enrolled Home Icon"
                  className="Header_Logo filter-white"
                  onClick={() => pageUpdate(8)}
                  title="Go to your teachers social page"
                />
              </div>
            )}

            {/* Only show this button if we arent a leader, and not on the create page */}
            {(isHome && !isLeader) && (
              <div>
                <button className='HeaderButton' onClick={() => pageUpdate(2)}>
                    Become a Patch Leader!
                </button>
              </div>
            )}

            {/* Not on the Messages page */}
            {!isMessages && (
              <button className="Header_MessageBtn" type="button" onClick={() => pageUpdate(6)}>
                <img className={`${newMessageAlert ? 'filter-pink' : ' filter-darkgreen'}`} src={MessageIcon} alt="message icon" style={{ width: 30, height: 'auto' }} />
              </button>
            )}


            {/* Not on MyProfile page */}
            {!myProfile && (
              <div
                className="SocialMessageBtnHeader Flex AlignItems JustifyCenter"
                key={loggedInUser && loggedInUser.name}
                type="button"
                onClick={() => pageUpdate(4)} >
                <img style={{ width: 50, borderRadius: 50 }} src={loggedInUser && loggedInUser.photoUrl} alt='client pic' />
              </div>
            )}

            {(!isAdmin && isLeader) && <button className='HeaderButton' onClick={() => pageUpdate(5)}>Client Admin</button>}

            {/* If we are logged in, always show logout */}
            <button className='HeaderButton' onClick={LogOut}>Logout</button>

          </>
        )}


      </div >
    </header >
  );
};
