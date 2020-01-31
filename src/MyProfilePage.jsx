import React, { useState, useEffect } from "react";

import { EditField, SimpleImage, KidSection, PatchLogo } from "./Components";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";

import { f, storage, database } from "./config";

import { Coloring, Kids, Table, Working } from "./images/photos";
import { Add, Elegant } from './images';
const galleryImages = [Coloring, Kids, Table, Working];

export const MyProfilePage = ({ pageUpdate, loggedInUser, updateSuccess, isLeader, myMessages }) => {

  // Depending on if this is a leader, or a user, we need to grab and setup our page data
  let userData = {};

  if (isLeader) {
    userData = {
      aboutMe: loggedInUser.aboutMe,
      age: loggedInUser.age,
      available: loggedInUser.available,
      experience: loggedInUser.experience,
      gallery: loggedInUser.gallery,
      rates: loggedInUser.rates,
      infants: loggedInUser.infants,
      kidTotal: loggedInUser.kidTotal,
      name: loggedInUser.name,
      photoUrl: loggedInUser.photoUrl,
      phone: loggedInUser.phone,
      zipcode: loggedInUser.zipcode
    }
  } else {
    // basic user
    userData = {
      aboutMe: loggedInUser.aboutMe,
      name: loggedInUser.name,
      phone: loggedInUser.phone,
      zipcode: loggedInUser.zipcode,
      children: loggedInUser.children,
      photoUrl: loggedInUser.photoUrl,
    }
  }


  const [userId, setUserId] = useState(0);
  const [updatedAboutMe, setAboutMe] = useState(userData.aboutMe || 'Hello!');
  const [updatedAge, setAge] = useState(userData.age);
  const [updatedAvailable, setAvailable] = useState(userData.available);
  const [updatedExperience, setExperience] = useState(userData.experience);
  const [updatedGalleryDesription, setGalleryDescription] = useState(userData.gallery && userData.gallery.description);
  const [updatedGalleryFeatures, setGalleryFeatures] = useState(userData.gallery && userData.gallery.features);
  const [updatedFTRates, setFTRates] = useState(userData.rates && userData.rates.ft);
  const [updatedPTRates, setPTRates] = useState(userData.rates && userData.rates.pt);
  const [updatedDIRates, setDIRates] = useState(userData.rates && userData.rates.di);
  const [updatedInfants, setInfants] = useState(userData.infants);
  const [updatedKidTotal, setKidTotal] = useState(userData.kidTotal);
  const [updatedChildren, setUpdatedChildren] = useState(userData.children);
  const [updatedName, setName] = useState(userData.name);
  const [updatedPhotoUrl, setPhotoUrl] = useState(userData.photoUrl);
  const [updatedPhone, setUpdatedPhone] = useState(userData.phone);
  const [updatedZipcode, setUpdatedZipcode] = useState(userData.zipcode);


  /* On Mount, fetch uid */
  useEffect(() => {
    const userId = f.auth().currentUser.uid;
    setUserId(userId);
  }, []);

  const handleDataUpdate = (e) => {
    e.preventDefault();

    // set update to current data before sending up
    let updatedData = {};

    if (isLeader) {
      updatedData = {
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
    } else {
      updatedData = {
        name: updatedName,
        phoneNumber: updatedPhone,
        zipcode: updatedZipcode,
        children: updatedChildren,
        photoUrl: updatedPhotoUrl,
      }

    }

    // now that we have updated data, push it up to our database
    database
      .ref(`${isLeader ? 'leaders' : 'users'}/${userId}/public`)
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

  const handleSetChildName = (name, index) => {
    // get kid
    const kids = [...updatedChildren];
    const thisKid = kids[index];
    // update their data
    thisKid.name = name;
    kids[index] = thisKid;
    // update state
    setUpdatedChildren(kids)
  }

  const handleSetChildAge = (age, index) => {
    const kids = [...updatedChildren];
    const thisKid = kids[index];
    thisKid.age = Number(age);
    kids[index] = thisKid;
    setUpdatedChildren(kids)
  }

  const handleSetChildInterest = (interest, index) => {
    const kids = [...updatedChildren];
    const thisKid = kids[index];
    thisKid.enrollment = interest;
    kids[index] = thisKid;
    setUpdatedChildren(kids)
  }

  const addNewChildInfo = (e) => {
    e.preventDefault();
    const newKid = { name: '', age: '', enrollment: '' }
    const updatedInfo = updatedChildren;
    if (updatedInfo.length <= 4) {
      updatedInfo.push(newKid)
      setUpdatedChildren([...updatedInfo])
    }
  }


  return (
    <div>
      <div>
        <Header pageUpdate={pageUpdate} myProfile loggedInUser={loggedInUser} isLeader={isLeader} myMessages={myMessages} />

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
              <div className="Flex Row AlignItems SimpleBorder JustifyCenter">
                <EditField
                  title="Full Name"
                  placeholder={userData.name}
                  type="text"
                  forLabel="Name"
                  onChange={setName}
                  value={updatedName}
                />

                {isLeader && (

                  <EditField
                    title="Age"
                    placeholder={userData.age}
                    type="number"
                    forLabel="Age"
                    onChange={setAge}
                    value={updatedAge}
                  />
                )}

                <EditField
                  title="Phone"
                  placeholder={userData.phone}
                  type="text"
                  forLabel="Phone"
                  onChange={setUpdatedPhone}
                  value={updatedPhone}
                />


                {isLeader && (
                  <EditField
                    title="Years of Experience"
                    placeholder={userData.experience}
                    type="number"
                    forLabel="experience"
                    onChange={setExperience}
                    value={updatedExperience}
                  />
                )}

                <EditField
                  title="Zipcode"
                  placeholder={userData.zipcode}
                  type="number"
                  forLabel="zipcode"
                  onChange={setUpdatedZipcode}
                  value={updatedZipcode}
                />

                {isLeader && (
                  <EditField
                    title="Current Student Count"
                    placeholder={userData.kidTotal}
                    type="number"
                    forLabel="kidTotal"
                    onChange={setKidTotal}
                    value={updatedKidTotal}
                  />
                )}

              </div>

              {/* Kid section */}
              {!isLeader && (
                <div>
                  <div className="CursiveFont LargeFont Buffer PinkFont">My Children</div>
                  <div className="Flex Col AlignItems JustifyCenter SimpleBorder">


                    {updatedChildren && updatedChildren.map((kid, index) => (
                      <KidSection
                        key={kid.name + index.toString()}
                        location={index}
                        name={kid.name}
                        age={kid.age}
                        interest={kid.enrollment}
                        handleSetChildAge={handleSetChildAge}
                        handleSetChildName={handleSetChildName}
                        handleSetChildInterest={handleSetChildInterest}
                      />
                    ))}

                    {/* Add new Kid Info */}
                    {updatedChildren && updatedChildren.length <= 4 ? (
                      <button id={updatedChildren.length} className="Add" type='button' onClick={(e) => addNewChildInfo(e)}>
                        <div> Add Additonal Child?</div>
                        <img src={Add} alt="Add new child info" />
                      </button>

                    ) :
                      // Once we hit our kid limit, disable adding more
                      (
                        <div className="PinkFont">5 is the max for any single Preschool Patch!</div>
                      )}


                  </div>
                </div>
              )}




              {/* Rates */}
              {isLeader && (
                <div>
                  <div className="CursiveFont LargeFont Buffer PinkFont">My Rates</div>
                  <div className="Flex Row AlignItems JustifyCenter SimpleBorder">
                    <EditField
                      title="Full Time Rate"
                      placeholder={userData.rates.ft}
                      type="number"
                      forLabel="FT"
                      onChange={setFTRates}
                      value={updatedFTRates}
                    />
                    <EditField
                      title="Part Time Rate"
                      placeholder={userData.rates.pt}
                      type="number"
                      forLabel="PT"
                      onChange={setPTRates}
                      value={updatedPTRates}
                    />
                    <EditField
                      title="Drop-In Rate"
                      placeholder="Enter you preferred Drop-in rate"
                      type="number"
                      forLabel="DI"
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
                  placeholder={userData.aboutMe}
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

      <img src={Elegant} alt="decorative" className="filter-green Margins" />
      <PatchLogo />
      <Footer />
    </div>
  );
};
