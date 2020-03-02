import React from 'react';

import { ShowPassword } from '../images';

const PasswordInput = ({
  handlePasswordVisibility,
  setPassword,
  password,
  passwordType,
  passwordError
}) => {
  return (
    <div className="Flex Col JustifyCenter ">
      {/* Label */}
      <div style={{ textAlign: 'left' }}>
        <label htmlFor="password" className="InputTextLabel">
          Password:
        </label>
      </div>

      {/* Button */}
      <div className="Flex">
        <div style={{ position: 'relative' }}>
          {/* Toggle Visibility Button */}
          <button
            type="button"
            onClick={handlePasswordVisibility}
            className="TogglePassword"
            title="Show your password"
          >
            <img src={ShowPassword} alt="show password" />
          </button>

          <input
            className={`InputStyle ${passwordError && 'Red'}`}
            style={{ width: 350 }}
            placeholder="Enter your Password"
            type={passwordType}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
export default PasswordInput;
