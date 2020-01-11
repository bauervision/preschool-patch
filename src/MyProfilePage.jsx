import React, { useState, useEffect } from "react";

import { EditField, SimpleImage } from "./Components";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";

import { f, storage, database } from "./config";

import { Coloring, Kids, Table, Working } from "./images/photos";
const galleryImages = [Coloring, Kids, Table, Working];

export const MyProfilePage = ({ pageUpdate, loggedInUser, updateSuccess, isLeader }) => {
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
    photoUrl,
    phone,
    zipcode
  } = loggedInUser;

  const [userId, setUserId] = useState(0);
  const [updatedAboutMe, setAboutMe] = useState(aboutMe);
  const [updatedAge, setAge] = useState(age);
  const [updatedAvailable, setAvailable] = useState(available);
  const [updatedExperience, setExperience] = useState(experience);
  const [updatedGalleryDesription, setGalleryDescription] = useState(gallery && gallery.description);
  const [updatedGalleryFeatures, setGalleryFeatures] = useState(gallery && gallery.features);
  const [updatedFTRates, setFTRates] = useState(rates && rates.ft);
  const [updatedPTRates, setPTRates] = useState(rates && rates.pt);
  const [updatedDIRates, setDIRates] = useState(rates && rates.di);
  const [updatedInfants, setInfants] = useState(infants);
  const [updatedKidTotal, setKidTotal] = useState(kidTotal);
  const [updatedName, setName] = useState(name);
  const [updatedPhotoUrl, setPhotoUrl] = useState(photoUrl);


  /* On Mount, fetch uid */
  useEffect(() => {

    const userId = f.auth().currentUser.uid;
    setUserId(userId);
  }, []);

  const handleDataUpdate = (e) => {
    e.preventDefault();

    // set update to current data before sending up
    const updatedData = {
      aboutMe: updatedAboutMe,
      age: updatedAge,
      available: updatedAvailable,
      experience: updatedExperience,
      gallery: {
        description: updatedGalleryDesription,
        features: updatedGalleryFeatures,
        // TODO: files
      },
      rates: {
        ft: updatedFTRates,
        pt: updatedPTRates,
        di: updatedDIRates
      },
      infants: updatedInfants,
      kidTotal: updatedKidTotal,
      name: updatedName,
      photoUrl: updatedPhotoUrl,

    };


    // now that we have updated data, push it up to our database
    database
      .ref(`leaders/${userId}/public`)
      .set(updatedData)
      .then(() => {
        updateSuccess(true, "Save Successful!")

      });
  };

  const handleGalleryUpdate = (files) => {
    console.log(files)
  }

  const handleGalleryFeatureUpdate = (string) => {
    const featureArray = string.split(',');
    setGalleryFeatures(featureArray)
  }

  // let's push up the new profile pic into storage, and then save the download url
  const handleProfilePicUpdate = (file) => {
    // userId will be a part of the file path so grab it first
    const userId = f.auth().currentUser.uid;

    const uploadTask = storage
      .ref(`public/${userId}/profilePic/${file.name}`)
      .put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
        // setUploadProgress(progress);
      },
      (error) => {
        // error
        console.log(error);
      },
      () => {
        // complete
        storage
          .ref(`public/${userId}/profilePic/`)
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            setPhotoUrl(url);
          });
      }
    );
  };

  return (
    <div>
      <div>
        <Header pageUpdate={pageUpdate} myProfile loggedInUser={loggedInUser} />

        <div className="CursiveFont SuperFont TextLeft Buffer " style={{ marginLeft: 30 }}>My Profile Page</div>

        {/* Profile Page Data */}
        <div
          className="Flex Row WhiteFill"
          style={{
            justifyContent: "space-evenly",
            margin: 20,
            marginRight: 40,
            border: "solid",
            borderWidth: 1,
            borderColor: "green",
            borderRadius: 50,
            padding: 30
          }}
        >
          <div>
            <form onSubmit={(e) => handleDataUpdate(e)}>
              <div className="Flex Row AlignItems JustifyCenter">
                <img
                  className="BoxShadow"
                  alt="profile pic"
                  style={{
                    margin: 30,
                    borderRadius: 25,
                    width: 200,
                    height: "auto"
                  }}
                  src={updatedPhotoUrl}
                />
                <div>
                  <div className="CursiveFont LargeFont PinkFont">{updatedName}</div>
                  <EditField
                    isFile
                    title="Update Profile Pic"
                    type="file"
                    forLabel="profilePic"
                    onChange={handleProfilePicUpdate}
                  />
                </div>


                {isLeader && (<div>

                  <div className="Flex Row AlignItems JustifyCenter ">
                    <EditField
                      isCheck
                      title="Currently Enrolling"
                      type="checkbox"
                      forLabel="Enrolling"
                      onChange={() => setAvailable(!updatedAvailable)}
                      value={updatedAvailable}
                    />



                    <EditField
                      isCheck
                      title="Accepting Infants?"
                      type="checkbox"
                      forLabel="assisted"
                      onChange={() => setInfants(!updatedInfants)}
                      value={updatedInfants}
                    />
                  </div>
                </div>)}


              </div>

              <div className="CursiveFont LargeFont Buffer PinkFont">My Data</div>
              <div className="Flex Row AlignItems SimpleBorder">
                <EditField
                  title="Full Name"
                  placeholder={name}
                  type="text"
                  forLabel="Name"
                  onChange={setName}
                  value={updatedName}
                />

                {isLeader ? (
                  <EditField
                    title="Age"
                    placeholder={age}
                    type="number"
                    forLabel="Age"
                    onChange={setAge}
                    value={updatedAge}
                  />
                ) : (
                    <EditField
                      title="Phone"
                      placeholder={phone}
                      type="text"
                      forLabel="Phone"
                      onChange={setAge}
                      value={phone}
                    />
                  )}

                {isLeader ? (
                  <EditField
                    title="Years of Experience"
                    placeholder={experience}
                    type="number"
                    forLabel="experience"
                    onChange={setExperience}
                    value={updatedExperience}
                  />
                ) : (
                    <EditField
                      title="Zipcode"
                      placeholder={zipcode}
                      type="number"
                      forLabel="zipcode"
                      onChange={setExperience}
                      value={zipcode}
                    />
                  )}
                <EditField
                  title={isLeader ? "Current Student Count" : "Number of enrolling children"}
                  placeholder={kidTotal}
                  type="number"
                  forLabel="kidTotal"
                  onChange={setKidTotal}
                  value={updatedKidTotal}
                />
              </div>

              {!isLeader && (<div className="Margins">

                <div className="CursiveFont LargeFont Buffer PinkFont">Looking For...</div>
                <div className="Flex Row AlignItems JustifyCenter SimpleBorder">
                  <EditField
                    isCheck
                    title="Full Time"
                    type="checkbox"
                    forLabel="Fulltime"
                    // onChange={() => setAvailable(!updatedAvailable)}
                    value={true}
                  />

                  <EditField
                    isCheck
                    title="Part-Time or Drop-In"
                    type="checkbox"
                    forLabel="partTime"
                    // onChange={() => setInfants(!updatedInfants)}
                    value={false}
                  />
                </div>
              </div>)}


              {isLeader && (
                <div>
                  <div className="CursiveFont LargeFont Buffer PinkFont">My Rates</div>
                  <div className="Flex Row AlignItems JustifyCenter SimpleBorder">
                    <EditField
                      title="Full Time Rate"
                      placeholder={age}
                      type="number"
                      forLabel="Age"
                      onChange={setFTRates}
                      value={updatedFTRates}
                    />
                    <EditField
                      title="Part Time Rate"
                      placeholder={age}
                      type="number"
                      forLabel="Age"
                      onChange={setPTRates}
                      value={updatedPTRates}
                    />
                    <EditField
                      title="Drop-In Rate"
                      placeholder="Enter you preferred Drop-in rate"
                      type="number"
                      forLabel="Age"
                      onChange={setDIRates}
                      value={updatedDIRates}
                    />
                  </div>
                </div>)}



              <div>
                <div className="CursiveFont LargeFont Buffer PinkFont">About Me</div>
                <EditField
                  isTextArea
                  title=""
                  placeholder={aboutMe}
                  type="text"
                  forLabel="aboutMe"
                  onChange={setAboutMe}
                  value={updatedAboutMe}
                />
              </div>

              {isLeader && (
                <div>
                  <div className="CursiveFont LargeFont Buffer PinkFont">Home Gallery</div>
                  <EditField
                    isTextArea
                    small
                    title="Description"
                    placeholder="Enter a simple description for your home preschool"
                    type="text"
                    forLabel="aboutMe"
                    onChange={setGalleryDescription}
                    value={updatedGalleryDesription}
                  />
                  <EditField
                    isFile
                    multiple
                    title="Upload Pictures"
                    type="file"
                    forLabel="homeGallery"
                    onChange={handleGalleryUpdate}
                  />
                </div>)}

              {isLeader && (<>
                {/* Photo Gallery */}
                <div className="SimpleBorder Buffer WhiteFill">
                  {galleryImages.map((elem, index) => (
                    <SimpleImage key={'gallery' + index} image={elem} alt={'gallery' + index} />
                  ))}

                </div>

                <div>
                  <div className="CursiveFont LargeFont Buffer PinkFont">Home Features</div>
                  <p>NOTE: To add multiple bullet points to your features list, simply add a comma! This will signify a new item in your list.</p>

                  <EditField
                    isTextArea
                    small
                    title=""
                    placeholder="Enter a simple description for a feature in your home preschool"
                    type="text"
                    forLabel="Features"
                    onChange={handleGalleryFeatureUpdate}
                    value={updatedGalleryFeatures}
                  />

                  <div className="CursiveFont LargeFont Buffer ">Special Features of my Preschool</div>
                  <ul style={{ textAlign: 'left' }}>
                    {updatedGalleryFeatures && updatedGalleryFeatures.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>


                </div>
              </>)}

              <div>
                <button type="submit" className="RegisterButton">
                  Submit Changes
                </button>

              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
