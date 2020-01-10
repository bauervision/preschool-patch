import React from 'react';

import { Elegant } from '../images';

const Toast = ({ message, showToast }) => (
    <div className={`Toast ${showToast && 'ShowToast'} PinkFill RoundBorder Padding `}>
        <div className="Flex JustifyCenter AlignItems Col">
            <div className="CursiveFont LargeFont">{message}</div>
            <img src={Elegant} alt="decorative" className="filter-white " style={{ width: 250, height: 'auto' }} />
        </div>

    </div>
)
export default Toast;