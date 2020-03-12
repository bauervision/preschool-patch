import React from 'react';

const Select = ({ name, data, onChange, onBlur, width, value }) => (
  <select
    name={name}
    className="InputStyle"
    onBlur={onBlur}
    onChange={(e) => onChange(e.target.value)}
    style={{ width }}
    value={value}>
    {data.map((elem) => <option key={elem} value={elem}>{elem}</option>)}
  </select>
);

export default Select;
