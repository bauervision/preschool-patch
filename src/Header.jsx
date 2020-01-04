import React from "react";

import { Home, Profile } from "./images";

import { SignUserOut } from "./helpers/auth";

export const Header = ({
  pageUpdate,
  isHome,
  isLogin,
  myProfile,
  isCreate,
  loggedInUser
}) => {
  const LogOut = () => {
    SignUserOut();
    pageUpdate(0);
  };

  return (
    <header className="Header">
      <div className="Header_Align">
        <div>
          <input placeholder="Search" className="InputStyle" />
        </div>
        {!isCreate && (
          <div>
            <button onClick={() => pageUpdate(2)}>
              Become a Patch Leader!
            </button>
          </div>
        )}
        {!loggedInUser ? (
          <div>
            {myProfile || isCreate ? (
              <button onClick={LogOut}>Logout</button>
            ) : (
              <>
                {!isLogin && (
                  <button onClick={() => pageUpdate(1)}>Login</button>
                )}
              </>
            )}
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
    </header>
  );
};
