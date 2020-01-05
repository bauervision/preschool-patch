import React from "react";

import { FacebookIcon, InstagramIcon } from "../images";

export const Footer = () => {
  return (
    <>
      {/* Prefooter */}
      <div className="PreFooter">
        <div>
          <h4>About Preschool Patch</h4>
          <div>About Us</div>
          <div>Terms of Use</div>
          <div>Privacy Policy</div>
        </div>
        <div>
          <h4>Help</h4>
          <div>Contact</div>
          <div>Safety</div>
          <div>FAQs</div>
        </div>
        <div className="PreFooter_Social">
          <button
            className="Social"
            onClick={() =>
              (window.location.href =
                "https://www.facebook.com/preschoolpatchchesapeake/")
            }
          >
            <img src={FacebookIcon} alt="facebook icon" />
          </button>
          <button
            className="Social"
            onClick={() =>
              (window.location.href =
                "https://www.instagram.com/preschoolpatch/")
            }
          >
            <img src={InstagramIcon} alt="instagram icon" />
          </button>
        </div>
      </div>
      <footer className="Footer">
        <p>
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
