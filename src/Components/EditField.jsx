import React from "react";

import { Checked, Unchecked } from "../images";

const EditField = ({
  title,
  placeholder,
  type,
  forLabel,
  onChange,
  value,
  isInput,
  isTextArea,
  isCheck,
  isFile,
  multiple,
  small
}) => {


  return (
    <div
      className="Flex Col JustifyCenter"
      style={{
        padding: 2,
        marginLeft: isCheck ? 40 : 0,
        marginRight: isCheck ? 40 : 0
      }}
    >
      <div style={{ textAlign: (isTextArea || isFile) ? "center" : "left" }}>
        <label htmlFor={forLabel} className="InputTextLabel">
          {title}:
        </label>
      </div>

      <div className="Flex Row AlignItems JustifyCenter">

        {/* We want a textarea input */}
        {isTextArea && (
          <textarea
            name={forLabel}
            rows={small ? "2" : "8"}
            // cols={!isMessage ? "70" : '120'}
            onChange={(e) => onChange(e.target.value)}
            value={value}
            style={{ width: "100%" }}

          />
        )}

        {/* We want a checkbox */}
        {isCheck && (
          <button className="CheckBox " type="button" onClick={onChange}>
            <img src={value ? Checked : Unchecked} alt="checkbox" />
          </button>
        )}

        {/* Finally handle File input and the default case*/}
        {isFile && (
          <input
            className="InputStyle Buffer"
            placeholder={placeholder}
            type={type}
            name={forLabel}
            value={value}
            multiple
            onChange={(e) => onChange(multiple ? e.target.files : e.target.files[0])}
          />
        )}
        {(!isInput && !isTextArea && !isFile && !isCheck) &&
          <input
            className="InputStyle Buffer"
            placeholder={placeholder}
            type={type}
            name={forLabel}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        }

      </div>
    </div>
  );
};

export default EditField;
