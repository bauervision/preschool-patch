import React from 'react';

import { FacebookIcon, InstagramIcon } from '../images';

export const Footer = () => {
  const handleWindowChange = (path) => {
    window.location.href = path;
  };

  return (
    <>
      {/* Prefooter */}
      <div className="PreFooter Flex JustifyCenter AlignItems">
        <div className="Flex Col">
          <a href="#AboutUs">About Us</a>
          <a href="#Terms of Use">Terms of Use</a>
          <a href="#Privacy Policy">Privacy Policy</a>
        </div>
        <div className="Flex Col">
          <a href="#Contact">Contact</a>
          <a href="#Safety">Safety</a>
          <a href="#FAW">FAQs</a>
        </div>


        <div className="HideMobile ">
          <button
            className="Social"
            onClick={() => handleWindowChange('https://www.facebook.com/preschoolpatchchesapeake/')
            }
          >
            <img src={FacebookIcon} alt="facebook icon" />
          </button>
          <button
            className="Social"
            onClick={() => handleWindowChange('https://www.instagram.com/preschoolpatch/')
            }
          >
            <img src={InstagramIcon} alt="instagram icon" />
          </button>
        </div>


      </div>

      <div className="ShowMobile PreFooter">
        <button
          className="Social"
          onClick={() => handleWindowChange('https://www.facebook.com/preschoolpatchchesapeake/')
          }
        >
          <img src={FacebookIcon} alt="facebook icon" />
        </button>
        <button
          className="Social"
          onClick={() => handleWindowChange('https://www.instagram.com/preschoolpatch/')
          }
        >
          <img src={InstagramIcon} alt="instagram icon" />
        </button>
      </div>


      <footer className="Footer">
        <p >
          Preschool Patch is the world's first and largest online destination
          for at-home preschool services. We connect families with local
          teachers who have turned their homes into warm, inviting, educational
          spaces. Preschool Patch does not employ any preschool provider or
          preschool seeker nor is it responsible for the conduct of any
          preschool provider or preschool seeker.Preschool Patch provides
          information and tools to help preschool seekers and preschool
          providers connect and make informed decisions.However, each individual
          is solely responsible for selecting an appropriate preschool provider
          or preschool seeker for themselves or their families and for complying
          with all applicable laws in connection with any employment
          relationship they establish.The information contained in member
          profiles, job posts and applications are supplied by preschool
          providers and preschool seekers themselves and is not information
          generated or verified by Preschool Patch.Preschool Patch does not
          engage in any conduct that requires a professional license.
        </p>
        <p>
          Preschool Patch and "Love Learning Early" are service marks or
          registered service marks of Preschool Patch, Inc.© 2020 - 2027
          Preschool Patch, Inc. All rights reserved.
        </p>
      </footer>
    </>
  );
};
