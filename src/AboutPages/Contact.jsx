import React, { useState } from 'react';

import Axios from 'axios';

import Header from '../Components/Header';
import { Footer } from '../Components/Footer';


import { Elegant } from '../images';
import ContactForm from './ContactForm';
import { PatchLogo } from '../Components';


const Contact = ({ pageUpdate, loggedInUser }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleFormData = (formData) => {
    const data = {
      email: formData.email,
      message: formData.comments,
      firstName: formData.firstName,
      lastName: formData.lastName
    };

    Axios.post('https://us-central1-preschoolpatch-f04be.cloudfunctions.net/submit', data)
      .then((res) => {
        setSubmitted(true);
        return null;
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
              <div className="CursiveFont SuperFont PinkFont">Contact Us</div>

            </div>

            <div className="MarginTop">
              {submitted ? (
                <div className="CursiveFont LargeFont PinkFont">
                  Thank you for reaching out!<br/><br/>
                   Someone will be in contact with you within 24 hours</div>

              ) : (
                <>
                  <div>Questions regarding our service please complete the following form</div>
                  <ContactForm handleFormData={handleFormData}/>
                </>
              )}

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
export default Contact;
