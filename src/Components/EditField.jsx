import React, { useState } from "react";

import { Checked, Unchecked } from "../images";

const EditField = ({
  title,
  placeholder,
  type,
  forLabel,
  onChange,
  value,
  isTextArea,
  isCheck
}) => {
  const [newValue, setNewValue] = useState(value);

  const handleUpdate = () => {
    onChange(newValue);
  };

  return (
    <div
      className="Flex Col JustifyCenter"
      style={{
        padding: 2,
        marginLeft: isCheck ? 40 : 0,
        marginRight: isCheck ? 40 : 0
      }}
    >
      <div style={{ textAlign: "left" }}>
        <label htmlFor={forLabel} className="InputTextLabel">
          {title}:
        </label>
      </div>

      <div className="Flex Row AlignItems JustifyCenter">
        {isTextArea ? (
          <textarea name={forLabel} rows="8" cols="70">
            {value}
          </textarea>
        ) : (
          <>
            {isCheck ? (
              <button className="CheckBox " type="button" onClick={onChange}>
                <img src={value ? Checked : Unchecked} alt="checkbox" />
              </button>
            ) : (
              <input
                className="InputStyle Buffer"
                placeholder={placeholder}
                type={type}
                name={forLabel}
                value={value}
                onChange={e => setNewValue(e.target.value)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EditField;
