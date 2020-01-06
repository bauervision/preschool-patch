import React, { useState } from "react";

import { Edit } from "../images";

const EditField = ({ title, placeholder, type, forLabel, onChange, value }) => {
  const [newValue, setNewValue] = useState(value);

  const handleUpdate = () => {
    onChange(newValue);
  };

  return (
    <div
      className="Flex Col JustifyCenter"
      style={{
        padding: 2
      }}
    >
      <div style={{ textAlign: "left" }}>
        <label htmlFor={forLabel} className="InputTextLabel">
          {title}:
        </label>
      </div>

      <div className="Flex Row AlignItems">
        <div>
          <button onClick={handleUpdate}>
            <img src={Edit} alt="edit" />
          </button>
        </div>
        <input
          className="InputStyle"
          placeholder={placeholder}
          type={type}
          name={forLabel}
          value={value}
          onChange={e => setNewValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default EditField;
