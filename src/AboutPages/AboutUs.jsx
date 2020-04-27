import React from 'react';

import Header from '../Components/Header';
import { Footer } from '../Components/Footer';


import { Logo, Elegant } from '../images';
import { Us } from '../images/photos';


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
              <p>We started Preschool Patch because we felt that there was a need to offer a better option for preschool services, and we wanted
                to provide valuable stay at home moms with an opportunity to earn sustainable income.  By encouraging a class size limit of around 5,
                not only do we believe that we keep the work manageable, but also we promote a healthy learning environment for the children.
              <br/>
              <br/>
                Thank you for visiting our page and expressing interest in our business, we hope that you find a warm place in our patch and that
                we can begin continue to grow together!
              </p>


              <img src={Us} alt="family" className="responsive" style={{ width: '25%' }}/>
            </div>


          </div>


        </div>

        <img src={Elegant} alt="decorative" className="filter-green Margins" />

      </div>

      <div className="Buffer">
        <img src={Logo} alt="logo" style={{ width: 600, height: 'auto' }} />
      </div>

      <Footer />
    </div>
  );
};
export default AboutUs;
