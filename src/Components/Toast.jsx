import React from 'react';

import { Elegant } from '../images';

const Toast = ({ message, showToast }) => (
  <div className={`Toast ${showToast && 'ShowToast'} PinkFill RoundBorder Padding `}>
    <div className="Flex JustifyCenter AlignItems Col">
      <div className="CursiveFont LargeFont">{message}</div>
      <img src={Elegant} alt="decorative" className="filter-white responsive"/>
    </div>

  </div>
);
export default Toast;
