import React from "react";

import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { Ratings } from "./Components";

import { Coloring, Kids, Table, Working } from "./images/photos";
const galleryImages = [Coloring, Kids, Table, Working];
export const ProfilePage = ({ pageUpdate, data }) => {
  // pull out public data
  const {
    aboutMe,
    age,
    available,
    experience,
    rates,
    infants,
    kidTotal,
    name,
    rating,
    photoUrl

  } = data;

  const handleContact = () => pageUpdate(1);

  return (
    <div>
      <div>
        <Header pageUpdate={pageUpdate} />

        <div className="CursiveFont SuperFont">Profile Page</div>

        {/* Profile Pic and Data Section*/}
        <div
          className="Flex AlignItems SeeThru"
          style={{
            justifyContent: "space-evenly",
            flexDirection: "row",
            margin: 5,
            marginBottom: 0,
            border: "solid",
            borderWidth: 1,
            borderColor: "pink",
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            padding: 30
          }}
        >
          <img
            alt="profile pic"
            style={{ borderRadius: 25, width: 200, height: 200 }}
            src={photoUrl}
          />

          {/* Data Row */}
          <div className="Buffer" style={{ width: '40%' }}>
            <div>
              <div
                className="CursiveFont SuperFont"
              >{name}</div>
              <Ratings rating={rating} />
            </div>

            <div className="Flex Between">
              {/* Data */}

              <div style={{ textAlign: 'left', marginTop: 20 }}>

                <div className="textMargin">
                  <span className="profileText">{available && 'Currently Enrolling!'}</span>

                </div>


                <div className="textMargin">
                  <span className="profileText">Years of Experience:</span>
                  <strong>{experience}</strong>
                </div>

                <div className="textMargin">
                  <span className="profileText">Total Kids Enrolled:</span>{" "}
                  <strong>{kidTotal}</strong>
                </div>

                <div className="textMargin">
                  <span className="profileText">Infants?:</span>{" "}
                  <strong>{infants ? 'Yes!' : 'Not at this time'}</strong>
                </div>


                <div className="textMargin">
                  <span className="profileText">Age:</span>
                  <strong>{age}</strong>
                </div>





              </div>

              {/* Rates */}
              <div style={{ textAlign: 'left' }}>
                <div className="textMargin">
                  <span className="profileText">Full Time: {' '}</span>
                  <strong className="Price LargeFont">${rates.ft}</strong>
                </div>


                <div className="textMargin">
                  <span className="profileText">Part Time:{' '} </span>
                  <strong className="Price LargeFont">${rates.pt}</strong>
                </div>

                <div className="textMargin">
                  <span className="profileText">Drop-In: {' '}</span>
                  <strong className="Price LargeFont">${rates.di}</strong>
                </div>


              </div>

            </div>

          </div>

          {/* About Me Row */}
          <div className="Flex Col JustifyStart SimpleBorder WhiteFill" style={{ width: '60%' }}>
            <div className="CursiveFont SuperFont">About Me</div>
            <p>{aboutMe}</p>
            {/* Contact Button */}
            <button onClick={handleContact}>{`Contact ${name}`}</button>
          </div>
        </div>

        {/* Photo Gallery Section */}
        <div
          className="Flex Col AlignItems GreenFill"
          style={{
            margin: 5,
            marginTop: 0,
            border: "solid",
            borderWidth: 1,
            borderColor: "green",
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            padding: 30
          }}>
          <div className="CursiveFont LargeFont Buffer">Gallery</div>

          {/* Photo Gallery */}
          <div className="SimpleBorder Buffer WhiteFill">
            {galleryImages.map((elem, index) => (
              <img key={'gallery' + index} src={elem} alt={'gallery' + index} style={{ width: 300, height: 'auto' }} />
            ))}

          </div>

          <div>
            <p>
              I worked hard setting up a warm environment for my preschoolers.
            </p>

            <div className="CursiveFont LargeFont Buffer SimpleBorder">Special Features</div>
            <ul style={{ textAlign: 'left' }}>
              <li>Fenced in backyard</li>
              <li>Large Backyard Playset for recess</li>
              <li>Separate room for rest time</li>
              <li>Separate Playroom</li>

            </ul>
          </div>
        </div>
      </div>



      <Footer />
    </div>
  );
};
