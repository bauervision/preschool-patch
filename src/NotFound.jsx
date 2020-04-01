import React from 'react';

import Header from './Components/Header';
import { Footer } from './Components/Footer';


import { Logo, Elegant } from './images';


export const NotFound = () => {
  return (
    <div>
      <div>
        <Header />

        {/* Top Left Title */}
        <div className="CursiveFont SuperFont TextLeft Buffer " style={{ marginLeft: 30 }}>404: Page Not Found</div>

        {/* Page Data*/}
        <div className="Flex AlignItems SeeThru Evenly" >


          {/* Page Title */}
          <div className="Flex Col Buffer MarginTop">
            <div>
              <div className="CursiveFont SuperFont PinkFont">Oops!</div>
            </div>
            <div className="Margins">
              <h3>That page does not exist!</h3>
              <p>Make sure that the path name is spelled correctly and try again</p>
            </div>
          </div>


        </div>

        <img src={Elegant} alt="decorative" className="filter-green Margins responsive" />

      </div>

      <div className="Buffer">
        <img src={Logo} alt="logo" className="responsive" />
      </div>

      <Footer />
    </div>
  );
};
