import React from "react";

import { Flower } from "../images";

const PageHeader = ({ isLogin, title, handleUserTypeSwitch, userType }) => (
  <div className="Flex JustifyCenter AlignItems Buffer">
    <img src={Flower} alt="logo" style={{ height: 200, width: "auto" }} />
    <h2 style={{ margin: 20 }}>{title}</h2>

    {/* Handle Buttons if this is the Login Page */}
    {isLogin && (
      <>
        {userType === 1 ? (
          <div>Existing User </div>
        ) : (
          <button onClick={() => handleUserTypeSwitch(1)}>Existing User</button>
        )}

        {userType === 0 ? (
          <div>New User </div>
        ) : (
          <button onClick={() => handleUserTypeSwitch(0)}>New User</button>
        )}
      </>
    )}
  </div>
);

export default PageHeader;
