import React from "react";

const BasicInput = ({ title, type, forLabel, onChange, value }) => (
  <div
    className="Flex Col "
    style={{
      padding: 2
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
