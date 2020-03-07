import React from 'react';

import { Flower, FlowerFlip } from '../images';

const PageHeader = ({ isLogin, title, handleUserTypeSwitch, userType }) => (
  <div className="Flex JustifyCenter AlignItems ">

    <div className="HideMobile">
      <img src={Flower} alt="flower left" style={{ height: 200, width: 'auto' }} />
      <h2 style={{ margin: 20, fontSize: 32 }} className="CursiveFont">
        {title}
      </h2>

    </div>

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
    <div className="HideMobile">
      <img src={FlowerFlip} alt="flower right" style={{ height: 200, width: 'auto' }} />
    </div>

  </div>
);

export default PageHeader;
