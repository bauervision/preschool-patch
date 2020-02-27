import React, { useState } from 'react';

import DropDownItem from './DropDownItem';

import './DropDown.css';
/**
 * DropDown takes a few props that are passed to its child DropDownItem
 * @param {*} alternate Would you like to see alternating colors?
 * @param {*} data Controls what is displayed within the dropdown.
 * @param {*} icon If present, button will default to what is passed here.
 * @param {*} needsClick Do you want it to open on click?
 * @param {*} rounded Would you like whole drop down rounded?
 * @param {*} title What is displayed on the button?
 * @param {*} width Size of both the button and the dropdown IF same width is true, otherwise only the dropdown content will use this parameter
 * @param {*} sameWidth Would you like to see alternating colors?
 */
const DropDown = ({
  title,
  data,
  width,
  alternate,
  rounded,
  needsClick,
  sameWidth,
  icon,
  iconWidth,
  transparent
}) => {
  const [clicked, setClicked] = useState(true);

  return (
    <div className={` ${needsClick ? 'click-drop' : 'dropdown'} buffer`}>
      {/* Just to keep the conditional rendering easier to read
    let's break this out into the 2 main versions
    If we want the clickable version... */}
      {needsClick ? (
        <div
          className={`${!clicked ? 'dropbtn-clicked' : 'dropbtn'} ${rounded
            && (clicked ? 'dropbtn-round' : 'dropbtn-clicked-round')} ${icon
            && transparent
            && 'transparent'}`}
          style={{ width: sameWidth ? width : 'auto' }}
          onClick={() => setClicked(!clicked)}
        >
          {/* If we pass an icon use it, otherwise use the title */}
          {icon ? (
            <img
              src={icon}
              alt="icon"
              style={{ width: iconWidth || 'auto' }}
              className={`${
                !clicked ? !transparent && 'filter-white' : 'filter-grey'
              } `}
            />
          ) : (
            title
          )}
        </div>
      ) : (
        //  Otherwise, the hover version
        <div
          className={`dropbtn ${rounded && 'dropbtn-round'} ${(icon && transparent) && 'transparent'}`}
          style={{ width }}
        >
          {/* If we pass an icon use it, otherwise use the title */}
          {icon ? (
            <img
              src={icon}
              alt="icon"
              style={{ width: iconWidth || 'auto' }}
              className={`${!transparent ? 'filter-white' : 'filter-pink'} `}
            />
          ) : (
            title
          )}
        </div>
      )}

      {/* Finally handle when the dropdown renders */}
      {needsClick ? (
        <div
          className={` ${
            !clicked ? 'dropdown-content-click' : 'dropdown-content'
          }  ${rounded && 'dropdown-content-round'}`}
          style={{ width }}
        >
          {data.map((item) => (
            <DropDownItem key={item.name} item={item} alternate={alternate} rounded={rounded} />
          ))}
        </div>
      ) : (
        <div
          className={` ${
            needsClick
              ? !clicked
                ? 'dropdown-content-click'
                : ''
              : 'dropdown-content'
          }  ${rounded && 'dropdown-content-round'}`}
          style={{ width }}
        >
          {data.map((item) => (
            <DropDownItem key={item.name} item={item} alternate={alternate} rounded={rounded} />
          ))}
        </div>
      )}
    </div>
  );
};
export default DropDown;
