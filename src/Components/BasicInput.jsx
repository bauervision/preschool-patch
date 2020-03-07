import React from 'react';

const BasicInput = ({
  title,
  type,
  forLabel,
  onChange,
  value,
  isFile,
  placeholder
}) => {
  const handleChange = (e) => {
    if (isFile) {
      e.preventDefault();
    }

    // if we are setting a file, pass both the file and file value
    onChange(isFile ? (e.target.files[0], e.target.value) : e.target.value);
  };
  return (
    <div
      className="Flex Col "
      style={{
        padding: 2
      }}
    >
      <div className="TextLeft">
        <label htmlFor={forLabel} className="InputTextLabel">
          {title}:
        </label>
      </div>

      <input
        className="InputStyle"
        placeholder={placeholder}
        type={type}
        name={forLabel}
        value={value}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};

export default BasicInput;
