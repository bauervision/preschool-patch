import React from 'react';

/**
 * DropDownItem renders out the customizations for how the DropDown can be rendered and some additional functionality
 * @param {*} param0
 */
const DropDownItem = ({ alternate, rounded, item }) => (
  <div
    className={` dropdown-content-item ${alternate
        && 'alternate'} ${rounded && 'dropdown-content-item-round'}`}
    key={item.name}
    onClick={() => item.method(true)} // method is either editing, or deleting
  >
    <div className="flex between">
      <div>{item.name}</div>
    </div>
  </div>
);

export default DropDownItem;
