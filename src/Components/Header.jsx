import React, { useState, useEffect } from "react";

import { Home, MessageIcon } from "../images";

import { SignUserOut } from "../helpers/auth";

export const Header = ({
  pageUpdate,
  myProfile,
  isHome,
  isLeader,
  isLogin,
  isCreate,
  isAdmin,
  isMessages,
  loggedInUser,
  myMessages,
  userId
}) => {

  const [newMessageAlert, setNewMessageAlert] = useState(false);


  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (myMessages && myMessages.length > 0) {
      const foundUnread = myMessages.some((elem) => elem.lastMessage.author !== userId);
      setNewMessageAlert(foundUnread)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  const LogOut = () => {
    SignUserOut();
    pageUpdate(0);
  };


  return (
    <header className="Header LightShadow">
      <div className="Flex AlignItems">


        <div>
          <input placeholder="Search" className="InputStyle" />
        </div>

        {/* We're not yet logged in */}
        {!loggedInUser ? (
          // If we are not logged in, the only option we should see on the header is to signup
          // IF we're not on the login page
          <>
            {!isLogin && (
              <div>
                <button className='HeaderButton' onClick={() => pageUpdate(1)}>Login / Signup</button>
              </div>
            )}
          </>

        ) : (
            // we are now logged in
            <>
              {/* Only show this button if we arent a leader, and not on the create page */}
              {(!isCreate && !isLeader) && (
                <div>
                  <button className='HeaderButton' onClick={() => pageUpdate(2)}>
                    Become a Patch Leader!
                </button>
                </div>
              )}

              {!isMessages && (
                <>
                  <button className="Header_MessageBtn" type="button" onClick={() => pageUpdate(6)}>


                    <img className={`${newMessageAlert ? 'filter-pink' : ' filter-darkgreen'}`} src={MessageIcon} alt="message icon" style={{ width: 30, height: 'auto' }} />
                  </button>
                  {" | "}
                </>
              )}


              {/* If we are on MyProfile page, we need to show button to go to client admin */}
              {!myProfile && (
                <>
                  <div style={{ color: 'white' }}>{isLeader && ("Patch Leader")}
                  </div>



                  <button className='HeaderButton' onClick={() => pageUpdate(4)}>
                    {loggedInUser && loggedInUser.name}
                  </button>
                </>

              )}

              {(isLeader && !isAdmin) && (
                <div>
                  {isAdmin ? (
                    <button className='HeaderButton' onClick={() => pageUpdate(4)}>
                      {loggedInUser && loggedInUser.name}
                    </button>
                  ) : (
                      <button className='HeaderButton' onClick={() => pageUpdate(5)}>
                        Client Admin
                      </button>
                    )
                  }

                </div>
              )
              }

              {/* If we are logged in, always show logout */}
              <div>
                <button className='HeaderButton' onClick={LogOut}>Logout</button>
              </div>






            </>
          )}

        {/* Show Home Icon, if we're not on home page' */}
        {!isHome && (
          <div>
            <img
              src={Home}
              alt="Home icon"
              className="Header_Logo"
              onClick={() => pageUpdate(0)}
            />
          </div>
        )}
      </div >


    </header >
  );
};
