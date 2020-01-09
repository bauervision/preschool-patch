import React from "react";

import { Checked, Unchecked } from "../images";

const EditField = ({
  title,
  placeholder,
  type,
  forLabel,
  onChange,
  value,
  isTextArea,
  isCheck,
  isFile,
  multiple
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
      <div style={{ textAlign: "left" }}>
        <label htmlFor={forLabel} className="InputTextLabel">
          {title}:
        </label>
      </div>

      <div className="Flex Row AlignItems JustifyCenter">
        {isTextArea ? (
          <textarea
            name={forLabel}
            rows="8"
            cols="70"
            onChange={(e) => onChange(e.target.value)}
            value={value}
          />
        ) : (
            <>
              {isCheck ? (
                <button className="CheckBox " type="button" onClick={onChange}>
                  <img src={value ? Checked : Unchecked} alt="checkbox" />
                </button>
              ) : (
                  <>
                    {isFile ? (
                      <input
                        className="InputStyle Buffer"
                        placeholder={placeholder}
                        type={type}
                        name={forLabel}
                        value={value}
                        multiple
                        onChange={(e) => onChange(multiple ? e.target.files : e.target.files[0])}
                      />
                    ) : (
                        <input
                          className="InputStyle Buffer"
                          placeholder={placeholder}
                          type={type}
                          name={forLabel}
                          value={value}
                          onChange={(e) => onChange(e.target.value)}
                        />
                      )}
                  </>
                )}
            </>
          )}
      </div>
    </div>
  );
};

export default EditField;
