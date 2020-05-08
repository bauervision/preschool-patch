import React from 'react';

import Header from '../Components/Header';
import { Footer } from '../Components/Footer';


import { Logo, Elegant } from '../images';
import { PatchLogo } from '../Components';


const Safety = ({ pageUpdate, loggedInUser }) => {
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
              <div className="CursiveFont SuperFont PinkFont">Safety</div>

            </div>

            <div className="MarginTop">
              <div className="MediumFont Margins">Ultimately the parent is responsible for who they decide to enroll their child with,
                <br/>
              and the teacher is responsible for who they accept an enrollment for in their business.</div>
              <br/><br/>
              <div className="MediumFont Margins">
                Key things you can do to protect yourself is to require Meet and Greets before beginning any enrollments.
                <br/><br/>
                This will allow parents to verify the in-home preschool conditions,
                <br/><br/>
                and give teachers the opportunity to evaluate any possible behaviorial challenges which may affect their ability to provide quality instruction.
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
export default Safety;
