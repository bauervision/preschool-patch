import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { Home, MessageIcon, Enrolled, Table, Pay } from '../images';

import { SignUserOut } from '../helpers/auth';

const defaultImageUrl = 'https://firebasestorage.googleapis.com/v0/b/preschoolpatch-f04be.appspot.com/o/public%2Favatar.png?alt=media&token=b5f43a4b-4e65-4e4a-b096-54a69de16490';

const Header = ({
  myProfile,
  isHome,
  isLeader,
  isLogin,
  isSocial,
  isAdmin,
  isMessages,
  isPayment,
  loggedInUser,
  myMessages,
  userId,
  history,
  emailVerified
}) => {
  const [newMessageAlert, setNewMessageAlert] = useState(false);


  useEffect(() => {
    if (myMessages?.length > 0) {
      const foundUnread = myMessages.some((elem) => elem.lastMessage.author !== userId);
      setNewMessageAlert(foundUnread);
    }
  }, [myMessages, userId]);

  const LogOut = () => {
    history.push('/');
    SignUserOut();
  };


  // if we aren't a leader, check to see if we're enrolled, if we are a leader, show our social page link
  const currentlyEnrolled = (!isLeader ? (loggedInUser?.enrollment?.accepted || false) : true);

  return (
    <header className={'Header LightShadow '}>
      <div className="Flex AlignItems JustifyCenter">

        {!loggedInUser && (
          <div className="Header_Logo ShowMobile">
            <div className="CursiveFont TextLeft WhiteFont ">Preschool Patch</div>
          </div>
        )}


        {/* Show Home Icon, if we're not on home page' */}
        {!isHome && (
          <Link to="/" title="Return to Home page">
            <img
              src={Home}
              alt="Home icon"
            />
          </Link>
        )}


        {/* If we are not logged in, the only option we should see on the header is to signup */}
        {!loggedInUser ? (
          <>
            {!isLogin && <Link className='HeaderButton' to="/login">Login / Signup</Link>}
          </>
        ) : (
        // we are now logged in
          <>

            {/* Show Teachers Social page Icon, if we're not already there */}
            {(!isSocial && currentlyEnrolled) && (
              <Link
                to={`/teacherSocial/${loggedInUser.isLeader ? loggedInUser.id : loggedInUser.enrollment?.submittedTo}`}
                className="Header_MessageBtn">
                <img
                  src={Enrolled}
                  alt="Enrolled Home Icon"
                  className="filter-white"
                  title="Go to your social page"
                />
              </Link>
            )}

            {/* Show Payment page Icon, if we're not already there */}
            {(!isPayment && currentlyEnrolled && !isLeader) && (
              <Link to={`/payments/${userId}`} className="Header_MessageBtn">
                <img
                  src={Pay}
                  alt="Payments Home Icon"
                  className="filter-white"
                  title="Go to your payments page"
                />
              </Link>
            )}

            {/* TODO: need to figure out how to best handle converting parent accounts to teacher accounts */}
            {/* Only show this button if we arent a leader, and not on the create page */}
            {/* {(isHome && !isLeader) && (
              <div className="HideMobile">
                <Link className='HeaderButton' to="/createAccount" >
                    Become a Patch Leader!
                </Link>
              </div>
            )} */}

            {/* Not on the Messages page */}
            {(!isMessages && emailVerified) && (
              <Link
                className="Header_MessageBtn"
                to={`/messages/${userId}`}
                title="Go to your messages">
                <img className={`${newMessageAlert ? 'filter-pink' : ' filter-darkgreen'}`} src={MessageIcon} alt="message icon" />
              </Link>
            )}


            {/* Not on MyProfile page */}
            {!myProfile && (
              <Link
                className={`SocialMessageBtnHeader Flex AlignItems JustifyCenter ${!emailVerified && 'greyBorder'}`}
                key={loggedInUser?.name}
                to={`/myProfile/${userId}`}
                title={!emailVerified ? 'Remember to verify your email!' : 'Your Profile'}>
                <img style={{ width: 50, borderRadius: 50 }} src={loggedInUser?.photoUrl || defaultImageUrl} alt='client pic' />
              </Link>
            )}

            {(!isAdmin && isLeader) && <Link className="Header_MessageBtn" to="/clientAdmin" title="Client Admin">
              <img src={Table} alt='client admin' className="filter-white"/></Link>}

            {/* If we are logged in, always show logout */}
            <button className='HeaderButton' onClick={LogOut} title="Log out from Preschool Patch">Logout</button>

          </>
        )}


      </div >
      {loggedInUser && !emailVerified && (
        <div className="TextRight">Email not verified: Messaging is disabled</div>
      )}
    </header >
  );
};
export default withRouter(Header);
