import React from 'react';

import Header from '../Components/Header';
import { Footer } from '../Components/Footer';


import { Elegant } from '../images';
import { PatchLogo } from '../Components';


const FAQ = ({ pageUpdate, loggedInUser }) => {
  return (
    <div>
      <div>
        <Header pageUpdate={pageUpdate} isAdmin loggedInUser={loggedInUser} isLeader={true} />

        {/* Top Left Title */}
        <div className="CursiveFont SuperFont TextLeft Buffer " style={{ marginLeft: 30 }}>Preschool Patch</div>

        {/* Page Data*/}
        <div
          className="Flex AlignItems SeeThru "
          style={{
            justifyContent: 'space-evenly',

          }}
        >


          {/* Page Title */}
          <div className="Flex Col Buffer MarginTop">
            <div>
              <div className="CursiveFont SuperFont PinkFont">Frequently Asked Questions</div>

            </div>

            <div className="MarginTop">
              <div className="MediumFont Margins">Questions will be displayed here</div>
            </div>

          </div>


        </div>

        <img src={Elegant} alt="decorative" className="filter-green Margins responsive" />

      </div>

      <PatchLogo />

      <Footer />
    </div>
  );
};
export default FAQ;
