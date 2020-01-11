import React from "react";

import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { Ratings, SimpleImage } from "./Components";

import { Coloring, Kids, Table, Working } from "./images/photos";
import { DecorFlat, Logo, Elegant } from "./images";

const galleryImages = [Coloring, Kids, Table, Working];
export const ProfilePage = ({ pageUpdate, data, loggedInUser }) => {
  // pull out public data
  const {
    aboutMe,
    age,
    available,
    experience,
    gallery,
    rates,
    infants,
    kidTotal,
    name,
    rating,
    photoUrl

  } = data;

  const handleContact = () => {
    console.log(`Send message to ${name}`)
  }

  return (
    <div>
      <div>
        <Header pageUpdate={pageUpdate} />

        <div className="CursiveFont SuperFont TextLeft Buffer " style={{ marginLeft: 30 }}>Profile Page</div>

        {/* Profile Pic and Data Section*/}
        <div className="MarginTop">
          <div
            className="Flex AlignItems SeeThru RoundBorder SimpleBorder Margins"
            style={{
              justifyContent: "space-evenly",

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
                  className="CursiveFont SuperFont PinkFont"
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
                    <strong className="Price LargeFont PinkFont">${rates && rates.ft}</strong>
                  </div>


                  <div className="textMargin">
                    <span className="profileText">Part Time:{' '} </span>
                    <strong className="Price LargeFont PinkFont">${rates && rates.pt}</strong>
                  </div>

                  <div className="textMargin">
                    <span className="profileText">Drop-In: {' '}</span>
                    <strong className="Price LargeFont PinkFont">${rates && rates.di}</strong>
                  </div>

                </div>

              </div>

            </div>

            {/* About Me Row */}
            <div className="Flex Col JustifyStart SimpleBorder WhiteFill" style={{ width: '60%' }}>
              <div className="CursiveFont SuperFont">About Me</div>
              <p>{aboutMe}</p>

              {/* Contact Button: If loggedInUser, otherwise notify to login*/}
              {loggedInUser ? (
                <button onClick={handleContact} className="CursiveFont LargeFont">{`Contact ${name}`}</button>) : (
                  <button onClick={() => pageUpdate(1)} className="CursiveFont LargeFont">{`Login to Contact ${name}`}</button>
                )}
            </div>


          </div>
        </div>
        <img src={Elegant} alt="decorative" className="filter-green Margins" />
        {/* Photo Gallery Section */}
        <div
          className="Flex Col AlignItems PinkFill"
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

          <p>
            {`" ${gallery && gallery.description} "`}
          </p>
          {/* Photo Gallery */}
          <div className="SimpleBorder Buffer WhiteFill">

            {galleryImages.map((elem, index) => (
              <SimpleImage key={'gallery' + index} image={elem} alt={'gallery' + index} />
            ))}

          </div>

          <div>


            <div className="CursiveFont LargeFont Buffer ">Special Features of my Preschool</div>
            <ul style={{ textAlign: 'left' }}>
              {gallery && gallery.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            <img src={DecorFlat} alt="decorative" className='filter-white' style={{ width: 300, height: 'auto' }} />
          </div>
        </div>
      </div>

      <div className="Buffer">
        <img src={Logo} alt="logo" style={{ width: 600, height: 'auto' }} />
      </div>

      <Footer />
    </div>
  );
};
