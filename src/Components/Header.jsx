import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

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

  function getScrollPosition({ element, useWindow }) {
    const target = element ? element.current : document.body;
    const position = target.getBoundingClientRect();

    return useWindow
      ? { x: window.scrollX, y: window.scrollY }
      : { x: position.left, y: position.top };
  }

  function useScrollPosition(effect, deps, element, useWindow, wait) {
    const position = useRef(getScrollPosition({ useWindow }));

    let throttleTimeout = null;

    const callBack = () => {
      const currPos = getScrollPosition({ element, useWindow });
      effect({ prevPos: position.current, currPos });
      position.current = currPos;
      throttleTimeout = null;
    };

    useLayoutEffect(() => {
      const handleScroll = () => {
        if (wait) {
          if (throttleTimeout === null) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            throttleTimeout = setTimeout(callBack, wait);
          }
        } else {
          callBack();
        }
      };

      window.addEventListener('scroll', handleScroll);

      return () => window.removeEventListener('scroll', handleScroll);
    }, deps);
  }

  const [hideOnScroll, setHideOnScroll] = useState(true);

  useScrollPosition(({ prevPos, currPos }) => {
    // we dont want to scroll the header away on the messenger
    if (!isMessages) {
      const isShow = currPos.y > prevPos.y;
      const atTop = currPos.y === 0;
      if ((isShow || atTop) !== hideOnScroll) setHideOnScroll(isShow);
    }
  }, [hideOnScroll]);


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
    <header className={`Header LightShadow ${!hideOnScroll && 'HeaderHide'}`}>
      <div className="Flex AlignItems JustifyCenter">

        {!loggedInUser && (
          <div className="Header_Logo ShowMobile">
            <div className="CursiveFont TextLeft WhiteFont ">Preschool Patch</div>
          </div>
        )}


        {/* Show Home Icon, if we're not on home page' */}
        {!isHome && (
          <Link to="/">
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
              <Link to={`/teacherSocial/${loggedInUser.enrollment.patchName}`}>
                <img
                  src={Enrolled}
                  alt="Enrolled Home Icon"
                  className="filter-white"
                  onClick={() => pageUpdate(8)}
                  title="Go to your teachers social page"
                />
              </Link>
            )}

            {/* Only show this button if we arent a leader, and not on the create page */}
            {(isHome && !isLeader) && (
              <div className="HideMobile">
                <Link className='HeaderButton' to="/createAccount" >
                    Become a Patch Leader!
                </Link>
              </div>
            )}

            {/* Not on the Messages page */}
            {!isMessages && (
              <Link className="Header_MessageBtn" type="button" to={`/messages/${userId}`}>
                <img className={`${newMessageAlert ? 'filter-pink' : ' filter-darkgreen'}`} src={MessageIcon} alt="message icon" style={{ width: 30, height: 'auto' }} />
              </Link>
            )}


            {/* Not on MyProfile page */}
            {!myProfile && (
              <Link
                className="SocialMessageBtnHeader Flex AlignItems JustifyCenter"
                key={loggedInUser && loggedInUser.name}
                type="button"
                to={`/myProfile/${userId}`} >
                <img style={{ width: 50, borderRadius: 50 }} src={loggedInUser && loggedInUser.photoUrl} alt='client pic' />
              </Link>
            )}

            {(!isAdmin && isLeader) && <Link className='HeaderButton' to="/clientAdmin">Client Admin</Link>}

            {/* If we are logged in, always show logout */}
            <button className='HeaderButton' onClick={LogOut}>Logout</button>

          </>
        )}


      </div >
    </header >
  );
};
