import React, { useState } from 'react';

import moment from 'moment';

import { EditField, SimpleImage, KidSection, PatchLogo, Toast } from './Components';
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';


import { f, storage, database } from './config';

import { Coloring, Kids, Table, Working } from './images/photos';
import { Add, Elegant } from './images';

const galleryImages = [Coloring, Kids, Table, Working];

export const MyProfilePage = ({ pageUpdate, loggedInUser, updateSuccess, isLeader, myMessages, launchToast, userId }) => {
  const now = moment().toDate().getTime();

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
      lastUpdate: loggedInUser.lastUpdate,
      name: loggedInUser.name,
      patchName: loggedInUser.patchName,
      photoUrl: loggedInUser.photoUrl,
      phone: loggedInUser.phone,
      zipcode: loggedInUser.zipcode
    };
  } else {
    // basic user
    userData = {
      aboutMe: loggedInUser.aboutMe,
      lastUpdate: loggedInUser.lastUpdate,
      name: loggedInUser.name,
      phone: loggedInUser.phone,
      zipcode: loggedInUser.zipcode,
      children: loggedInUser.children,
      photoUrl: loggedInUser.photoUrl,
    };
  }


  const [updatedAboutMe, setAboutMe] = useState(userData.aboutMe || 'Looking forward to the first day of Preschool Patch!!');
  const [updatedAge, setAge] = useState(userData.age);
  const [updatedAvailable, setAvailable] = useState(userData.available);
  const [updatedExperience, setExperience] = useState(userData.experience);
  const [updatedPatchName, setPatchName] = useState(userData.patchName);
  const [updatedGalleryDesription, setGalleryDescription] = useState(userData.gallery && userData.gallery.description);
  const [updatedGalleryFeatures, setGalleryFeatures] = useState(userData.gallery && userData.gallery.features);
  const [updatedFTRates, setFTRates] = useState(userData.rates && userData.rates.ft);
  const [updatedPTRates, setPTRates] = useState(userData.rates && userData.rates.pt);
  const [updatedDIRates, setDIRates] = useState(userData.rates && userData.rates.di);
  const [updatedInfants, setInfants] = useState(userData.infants);
  const [updatedChildren, setUpdatedChildren] = useState(userData.children || []);
  const [updatedName, setName] = useState(userData.name);
  const [updatedPhotoUrl, setPhotoUrl] = useState(userData.photoUrl);
  const [updatedPhone, setUpdatedPhone] = useState(userData.phone);
  const [updatedZipcode, setUpdatedZipcode] = useState(userData.zipcode);


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
        id: userId, // and this
        isLeader: true,
        infants: updatedInfants,
        lastUpdate: now,
        messages: loggedInUser?.messages || [],
        name: updatedName,
        patchName: updatedPatchName,
        phone: updatedPhone,
        photoUrl: updatedPhotoUrl,
        zipcode: updatedZipcode,
      };
    } else {
      updatedData = {
        // be sure to verify that we don't overwrite any values in the DB that we didnt update
        aboutMe: updatedAboutMe,
        children: updatedChildren,
        photoUrl: updatedPhotoUrl,
        enrollment: loggedInUser.enrollment, // like this
        id: userId, // and this
        isLeader: false,
        lastUpdate: now,
        messages: loggedInUser?.messages || [], // and these
        name: updatedName,
        phone: updatedPhone,
        zipcode: updatedZipcode,
      };
    }


    // now that we have updated data, push it up to our database
    database
      .ref(`${isLeader ? 'leaders' : 'users'}/${userId}/public`)
      .set(updatedData)
      .then(() => {
        updateSuccess(true, 'Save Successful!');
      });
  };

  // TODO update gallery images
  const handleGalleryUpdate = (files) => {
    console.log(files);
  };

  const handleGalleryFeatureUpdate = (string) => {
    const featureArray = string.split(',');
    setGalleryFeatures(featureArray);
  };

  // let's push up the new profile pic into storage, and then save the download url
  const handleProfilePicUpdate = (file) => {
    // userId will be a part of the file path so grab it first
    const UID = f.auth().currentUser.uid;

    const uploadTask = storage
      .ref(`public/${UID}/profilePic/${file.name}`)
      .put(file);

    uploadTask.on(
      'state_changed',
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
          .ref(`public/${UID}/profilePic/`)
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
    const thisKid = { ...kids[index], name };
    kids[index] = thisKid;
    // update state
    setUpdatedChildren(kids);
  };

  const handleSetBirthYear = (year, index) => {
    const kids = [...updatedChildren];
    const thisKid = { ...kids[index], year: Number(year) };
    kids[index] = thisKid;
    setUpdatedChildren(kids);
  };

  const handleSetChildInterest = (interest, index) => {
    const kids = [...updatedChildren];
    // if user selects None, this will remove the child from the list
    if (interest === 'None') {
      kids.splice(index, 1);
    } else if ((interest !== 'Select Service...') && (interest !== 'None')) {
      const thisKid = { ...kids[index], enrollment: interest };
      kids[index] = thisKid;
    }
    setUpdatedChildren(kids);
  };

  const handleSetBirthDay = (day, index) => {
    const kids = [...updatedChildren];
    const thisKid = { ...kids[index], day: Number(day) };
    kids[index] = thisKid;
    setUpdatedChildren(kids);
  };

  const handleSetBirthMonth = (month, index) => {
    const kids = [...updatedChildren];
    // if user selects None, this will remove the child from the list
    if (month !== 'Select Month...') {
      const thisKid = { ...kids[index], month };
      kids[index] = thisKid;
    }
    setUpdatedChildren(kids);
  };

  const addNewChildInfo = (e) => {
    e.preventDefault();
    const newKid = { name: '', year: '', enrollment: '', month: '', day: '' };
    const updatedInfo = updatedChildren;
    if (updatedInfo.length <= 4) {
      updatedInfo.push(newKid);
      setUpdatedChildren([...updatedInfo]);
    }
  };


  /* handle conditional rendering */

  const enrolledKids = loggedInUser.enrollment?.accepted;
  // in case user removed a child by mistake, we'll show the undo
  const removedChild = enrolledKids && (userData.children.length !== updatedChildren.length);
  // if the user has removed all of their previously enrolled children
  const removeEnrollment = enrolledKids && (updatedChildren.length === 0);

  const lastDataUpdate = moment(loggedInUser.lastUpdate).fromNow();


  return (
    <div>
      <div>
        <Header pageUpdate={pageUpdate} myProfile loggedInUser={loggedInUser} isLeader={isLeader} myMessages={myMessages} userId={userId} />

        <div className="CursiveFont SuperFont TextLeft Buffer " style={{ marginLeft: 30 }}>My Profile Page</div>

        {/* Profile Page Data */}
        <div className="Flex  WhiteFill SimpleBorder Margins JustifyCenter" >
          <div>
            <form onSubmit={(e) => handleDataUpdate(e)} >
              <div className="Flex MobileRowToCol AlignItems JustifyCenter">
                <img
                  className="BoxShadow ProfilePic"
                  alt="profile pic"
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
                    <div>
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
                    <EditField
                      title="Patch Name"
                      placeholder={updatedPatchName || 'Enter a Patch Name!'}
                      type="text"
                      forLabel="PatchName"
                      onChange={setPatchName}
                      value={updatedPatchName}
                    />
                  </div>
                </div>)}


              </div>

              <div className="Buffer PinkFont">Last Update: {lastDataUpdate}</div>
              <div className="CursiveFont LargeFont Buffer PinkFont">My Data</div>
              <div className="Flex MobileRowToCol AlignItems SimpleBorder JustifyCenter">
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


              </div>

              {/* Kid section */}
              {!isLeader && (
                <div>
                  <div className="CursiveFont LargeFont Buffer PinkFont">My Children</div>
                  <div className="Flex Col AlignItems JustifyCenter SimpleBorder">

                    <div className="PinkFont MarginBottom">
                      <div> Assign only the children you want to enroll in classes here. </div>
                      <div> Be sure to verify that your prospective teacher can accomodate your children. </div>
                    </div>

                    {/* Render out the kids */}
                    {updatedChildren?.map((kid, index) => (
                      // User still has children enrolled
                      <KidSection
                        key={kid.name + index.toString()}
                        location={index}
                        name={kid.name}
                        year={kid.year}
                        month={kid.month}
                        day={kid.day}
                        interest={kid.enrollment}
                        handleSetChildName={handleSetChildName}
                        handleSetChildInterest={handleSetChildInterest}
                        handleSetBirthYear={handleSetBirthYear}
                        handleSetBirthMonth={handleSetBirthMonth}
                        handleSetBirthDay={handleSetBirthDay}

                      />
                    ))}

                    {removedChild && (
                      <div className={`Flex Col ${removeEnrollment && 'PinkBorder MarginTop'}`}>
                        {removeEnrollment && (
                          <>
                            <span className="PinkFont MediumFont">You have removed all enrolled children</span>
                            <span><strong>{`This will effectively delete your current enrollment with ${loggedInUser.enrollment.submittedToName}. `}</strong></span>
                            <span>If you change your mind later, you will have to re-submit your enrollment request.</span>
                          </>

                        )}

                        {removedChild && (
                          <button title='Return your children to their previous state' type="button" onClick={() => setUpdatedChildren(loggedInUser.children)}>Restore</button>

                        )}
                      </div>
                    )}


                    {/* Add new Kid Info */}
                    {updatedChildren.length <= 4 ? (
                      <>
                        <button id={updatedChildren.length} className="Add" type='button' onClick={(e) => addNewChildInfo(e)}>
                          <div> Add Additonal Child?</div>
                          <img src={Add} alt="Add new child info" />
                        </button>

                        {updatedChildren.length > 0
                          && <div >
                            <div> Set Enrollment Level to None to remove a child from the list </div>

                          </div>
                        }
                      </>
                    )
                      // Once we hit our kid limit, disable adding more
                      : (
                        <div className="PinkFont">
                          5 is the max for any single Preschool Patch!
                        </div>
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
                <div className="CursiveFont LargeFont Buffer PinkFont">{isLeader ? 'About Me' : 'Important Info about my children'}</div>
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

              {/* Update Photo Gallery */}
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

              {/* Photo Gallery */}
              {isLeader && (<>

                <div className="SimpleBorder Buffer WhiteFill">
                  {galleryImages.map((elem, index) => (
                    <SimpleImage key={`gallery${index}`} image={elem} alt={`gallery${index}`} />
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

      <div>
        <img src={Elegant} alt="decorative" className="filter-green Margins responsive" />
      </div>
      <PatchLogo />
      <Footer />
      <Toast showToast={launchToast.value} message={launchToast.message} />

    </div>
  );
};
