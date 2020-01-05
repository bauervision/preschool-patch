import React from "react";

const BasicInput = ({ title, type, forLabel, onChange, value }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      padding: 2,
      width: 300
    }}
  >
    <div style={{ textAlign: "left" }}>
      <label for={forLabel} className="InputTextLabel">
        {title}:
      </label>
    </div>

    <input
      className="InputStyle"
      type={type}
      name={forLabel}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  </div>
);

export default BasicInput;
