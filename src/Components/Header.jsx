import React from "react";

import { Home, Profile } from "../images";

import { SignUserOut } from "../helpers/auth";

export const Header = ({
  pageUpdate,
  isHome,
  isLogin,
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
      <div className="Header_Align">
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
              {/* TODO: add additonal check for when logged in user is already a leader */}
              {(!isCreate && !myProfile) && (
                <div>
                  <button onClick={() => pageUpdate(2)}>
                    Become a Patch Leader!
            </button>
                </div>
              )}

              {/* If we are on MyProfile page, we need to show button to go to client admin */}
              {myProfile ? (
                <div>
                  <button onClick={() => pageUpdate(5)}>
                    Client Admin
            </button>
                </div>
              ) : (
                  <div>
                    <img
                      src={Profile}
                      alt="Profile icon"
                      className="Header_Logo"
                      onClick={() => pageUpdate(4)}
                      style={{ border: "solid" }}
                    />
                  </div>
                )}


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
      </div>

      {/* This is the bottom row header detail */}
      {loggedInUser && (
        <div style={{ color: "white", textAlign: "right" }}>
          <button className="Header_MessageBtn">
            <div>{messages}</div>
            <div />
          </button>
          {`| Patch Leader: ${loggedInUser.name}`}
        </div>
      )}
    </header>
  );
};
