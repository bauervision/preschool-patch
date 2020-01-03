import React from "react";

import { Home } from "./images";

export const Header = ({ pageUpdate, isHome, isLogin, isCreate }) => {
  return (
    <header className="Header">
      <div>
        {/* Show Home Icon, if we're not on home page' */}
        {!isHome && (
          <img
            src={Home}
            className="Header_Logo"
            onClick={() => pageUpdate(0)}
          />
        )}
        <div>
          <input placeholder="Search" className="InputStyle" />
          {!isCreate && (
            <button onClick={() => pageUpdate(2)}>
              Become a Patch Leader!
            </button>
          )}
          {!isLogin && <button onClick={() => pageUpdate(1)}>Login</button>}
        </div>
      </div>
    </header>
  );
};
