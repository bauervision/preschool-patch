import React from 'react';

import { Checked, Unchecked } from '../images';

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
  isFile
}) => {
  return (
    <div className="Flex Col JustifyCenter" >
      <div style={{ textAlign: (isTextArea || isFile) ? 'center' : 'left' }}>
        {title
        && <label htmlFor={forLabel} className="InputTextLabel">
          {title}:
        </label>
        }
      </div>

      <div className="Flex Row AlignItems JustifyCenter FullSize">

        {/* We want a textarea input */}
        {isTextArea && (
          <textarea
            name={forLabel}
            onChange={(e) => onChange(e.target.value)}
            value={value}
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
            onChange={(e) => onChange(e.target.files[0])}
          />
        )}
        {(!isInput && !isTextArea && !isFile && !isCheck)
          && <input
            className="Flex FullSize InputStyle Buffer"
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
