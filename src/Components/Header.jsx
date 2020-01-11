import React from "react";

import { Home, Profile } from "../images";

import { SignUserOut } from "../helpers/auth";

export const Header = ({
  pageUpdate,
  isHome,
  isLeader,
  myProfile,
  isCreate,
  loggedInUser,
  messages
}) => {
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
          <div>
            <button onClick={() => pageUpdate(1)}>Login / Signup</button>
          </div>
        ) : (
            // we are now logged in
            <>

              {(!isCreate && !isLeader) && (
                <div>
                  <button className='HeaderButton' onClick={() => pageUpdate(2)}>
                    Become a Patch Leader!
                </button>
                </div>
              )}

              {/* If we are on MyProfile page, we need to show button to go to client admin */}
              {myProfile ? (
                // but only if we are a leader
                <>
                  {isLeader && (
                    <div>
                      <button className='HeaderButton' onClick={() => pageUpdate(5)}>
                        Client Admin
                </button>
                    </div>)}
                </>
              ) : (
                  <>
                    {/* on any page other than my profile... */}
                    {messages > 0 && (
                      <button className="Header_MessageBtn">
                        <div>{messages}</div>
                        <div />
                      </button>
                    )}

                    {" | "} {isLeader && ("Patch Leader")}

                    <button className='HeaderButton' onClick={() => pageUpdate(4)}>
                      {loggedInUser.name}
                    </button>

                  </>
                )}

              {/* If we are logged in, always show logout */}
              <div>
                <button className='HeaderButton' onClick={LogOut}>Logout</button>
              </div>

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
            </>
          )}
      </div >


    </header >
  );
};
