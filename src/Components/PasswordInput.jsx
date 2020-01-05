import React from "react";

import { ShowPassword } from "../images";

const PasswordInput = ({
  handlePasswordVisibility,
  setPassword,
  password,
  passwordType,
  passwordError
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 2,
        width: 300
      }}
    >
      <div style={{ textAlign: "left" }}>
        <label for="password" className="InputTextLabel">
          Password:
        </label>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ position: "relative" }}>
          <button
            type="button"
            onClick={handlePasswordVisibility}
            className="TogglePassword"
          >
            <img src={ShowPassword} alt="show password" />
          </button>

          <input
            className={`InputStyle ${passwordError && "Red"}`}
            placeholder="Enter your Password"
            type={passwordType}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
export default PasswordInput;
