import React from 'react';

import Header from '../Components/Header';
import { Footer } from '../Components/Footer';


import { Logo, Elegant } from '../images';
import { Us } from '../images/photos';
import { PatchLogo } from '../Components';


const AboutUs = ({ pageUpdate, loggedInUser }) => {
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
              <div className="CursiveFont SuperFont PinkFont">About Us</div>

            </div>

            <div className="MarginTop SmallFont">
              <div className="MediumFont Margins">
                We started Preschool Patch because we felt that there was a need to offer a better option for preschool services.
                <br/> <br/> We also wanted to provide valuable stay at home moms with an opportunity to earn sustainable income.
                <br/> <br/>
                By encouraging a class size limit of around 5, not only do we believe that we keep the work manageable, but also we promote a healthy learning environment for the children.

              </div>


              <img src={Us} alt="family" className="AboutPic"/>

              <div className="MediumFont Margins">
              Thank you for visiting our page and expressing interest in our business!
                <br/> <br/>
              We hope that you find a warm place in our patch where we all can grow together.
              </div>
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
export default AboutUs;
