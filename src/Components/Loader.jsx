import React from 'react';
import { Corner } from '../images';

const Loader = () => (
  <div className="Flex Col JustifyCenter AlignItems">
    <img
      src={Corner}
      alt='corner'
      className='filter-pink Rotate Alert'
      style={{ width: 50, height: 'auto', zIndex: 0, paddingRight: 10 }}
    />
  </div>
);

export default Loader;
