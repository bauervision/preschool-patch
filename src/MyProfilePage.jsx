import React, { useState, useRef } from 'react';

import moment from 'moment';

import { withRouter } from 'react-router-dom';
import { EditField, KidSection, PatchLogo, Toast, SimpleImage } from './Components';
import Header from './Components/Header';
import { Footer } from './Components/Footer';


import { f, storage, database } from './config';

import { Add, Elegant, Corner, Cancel, Accept } from './images';


const MyProfilePage = ({ loggedInUser, history, isLeader, myMessages, userId }) => {
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
  const [updatedGalleryImages, setGalleryImages] = useState(userData.gallery?.images);
  const [updatedGalleryDesription, setGalleryDescription] = useState(userData.gallery?.description);
  const [updatedGalleryFeatures, setGalleryFeatures] = useState(userData.gallery?.features);
  const [updatedFTRates, setFTRates] = useState(userData.rates && userData.rates.ft);
  const [updatedPTRates, setPTRates] = useState(userData.rates && userData.rates.pt);
  const [updatedDIRates, setDIRates] = useState(userData.rates && userData.rates.di);
  const [updatedInfants, setInfants] = useState(userData.infants);
  const [updatedChildren, setUpdatedChildren] = useState(userData.children || []);
  const [updatedName, setName] = useState(userData.name);
  const [updatedPhotoUrl, setPhotoUrl] = useState(userData.photoUrl);
  const [updatedPhone, setUpdatedPhone] = useState(userData.phone);
  const [updatedZipcode, setUpdatedZipcode] = useState(userData.zipcode);

  const [newFiles, setNewFiles] = useState(null);
  const [thumbArray, setThumbArray] = useState([]);
  const [imageUrlArray, setImageUrlArray] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);

  const [toast, setToast] = useState({ value: false, message: 'Welcome Back!' });


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
          images: updatedGalleryImages
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
        setToast({ value: true, message: 'Save Success!' });
        setTimeout(() => setToast({ value: false, message: '' }), 3000);
      });
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


  const filesref = useRef(null);

  // upload the file to storage and grab the download link
  const imageUpload = (file) => {
    const update = [...imageUrlArray];
    const storageRef = storage.ref(`public/${userId}/images/${file.name}`);

    return new Promise(((resolve, reject) => {
      // Upload file
      const task = storageRef.put(file);
      // TODO Update progress bar
      task.on('state_changed',
        (snapshot) => { },
        (err) => { reject(err); },
        () => {
          // complete
          storage
            .ref(`public/${userId}/images/`)
            .child(file.name)
            .getDownloadURL()
            .then((url) => {
              const newImage = {
                image: url
              };
              update.push(newImage);
              setImageUrlArray(update);
              resolve(task);
            });
        }
      );
    })).then(() => {
      // now that this single image promise has completed, return the updated array to pass to finalizePost
      return update;
    });
  };

  const finalizePost = (imageArray) => {
    setGalleryImages(imageArray);
    setUploading(false);
    // handle clean up
    setNewFiles(null);
    if (filesref.current) {
      filesref.current.value = null;
    }
  };

  const handleSubmitPost = async () => {
    // as long as we actually select files
    if (newFiles) {
      // trigger the loader
      setUploading(true);

      /* files will be in a File List array, so convert them first to a normal array and then
      upload each to storage with promises*/
      const data = await Promise.all(Array.from(newFiles).map(imageUpload));
      // because it is an array of promises, image array data will be inside another array, so merge it into 1
      const merged = [].concat(...data);
      // combine the image data with the rest of the post data and submit it
      finalizePost(merged);
    } else {
      // we didnt select files, so just post
      finalizePost();
    }
  };


  // this simple component will handle when the user changes their mind about a pic to upload, and removes it
  const HoverableThumbnail = ({ file, index }) => {
    const [hover, setHover] = useState(false);

    const handleRemove = () => {
      // grab current list of thumbnails to upload
      const updatedList = newFiles;
      updatedList.splice(index, 1);
      setNewFiles(updatedList);
      // and update the thumbs
      const updatedThumbs = [...thumbArray];
      updatedThumbs.splice(index, 1);
      setThumbArray(updatedThumbs);

      // TODO clean up the files loaded in textref
      // console.log(textref.current.value);
    };

    return (
      <div key={file.name} className={'UploadImageRowProfile'} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        {hover && <span className="RemoveUpload Flex AlignItems JustifyCenter">
          <button type='button' title="Remove this image from the upload" onClick={handleRemove}>X</button></span>}
        <img className="HalfSize"src={file} alt="thumbnail"/>
      </div>
    );
  };


  const handleNewFiles = (files) => {
    const arrayFiles = Array.from(files);
    const thumbs = arrayFiles.map((file) => ({ thumb: URL.createObjectURL(file) }));
    setNewFiles(arrayFiles);
    setThumbArray(thumbs);
  };

  const confirmDelete = () => {
    // user has confirmed they want to be deleted so we set their active property to false
    const updatedUser = { ...loggedInUser, active: false };
    // database.ref(`${loggedInUser.isLeader ? 'leaders' : 'users'}/${userId}/public`).set(updatedUser);

    // if this was a leader, we need to loop through all of their clients and reset their enrollments
    if (loggedInUser.isLeader) {
      updatedUser.clients.forEach((client) => {
        // database.ref(`users/${client.clientId}/public/enrollment`).set({ submitted: false });
        // and remove this person from their messages
        // const messageIdArray = loggedInUser.messages;
        console.log(client);
      });
    }

    // TODO: now we need to delete / archive? the messages and social page content

    // const user = f.auth().currentUser;

    // user.delete().then(() => {
    //   // User deleted.
    //   // finally push user back to home page
    //   history.push('/');
    // }).catch((error) => {
    //   // An error happened.
    //   console.log(error);
    //   history.push('/');
    // });
  };

  return (
    <div>
      <div>
        <Header myProfile loggedInUser={loggedInUser} isLeader={isLeader} myMessages={myMessages} userId={userId} />

        <div className="CursiveFont SuperFont TextLeft Buffer HideMobile" style={{ marginLeft: 30 }}>My Profile Page</div>

        {/* Profile Page Data */}
        <div className="Flex  WhiteFill SimpleBorder Margins JustifyCenter MarginTopMobileHome" >
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

                  <div className="Flex MobileRowToCol AlignItems JustifyCenter ">
                    <div className="Flex MobileColToRow Margins">
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
                    <div className="Margins MobileNoMargin">
                      <EditField
                        title="Patch Name"
                        placeholder={updatedPatchName || 'Enter a Patch Name!'}
                        type="text"
                        forLabel="PatchName"
                        onChange={setPatchName}
                        value={updatedPatchName}
                      />
                    </div>
                  </div>
                </div>)}

                <div className={deleteAccount ? 'PinkBorder RoundBorder Padding' : ''}>
                  {!deleteAccount
                  && <button type="button" onClick={() => setDeleteAccount(!deleteAccount)}>{deleteAccount ? 'Cancel Delete' : 'Delete Account'}</button>}
                  {deleteAccount && (
                    <div>
                      <div className="PinkFont  MediumFont"> Are you Sure?</div>
                      <div>This cannot be undone.</div>
                      <button title={ 'Remove my account'} className="transparent NoMargin" type='button' onClick={confirmDelete}><img src={Accept} alt="accept change"/></button>
                      <button title={'Cancel Removal' } className="transparent NoMargin" type='button' onClick={() => setDeleteAccount(!deleteAccount)}><img src={Cancel} alt="deny change"/></button>
                    </div>
                  )}
                </div>

              </div>

              <div className="Buffer PinkFont">Last Update: {lastDataUpdate}</div>
              <hr/>

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
                  <div className="Flex MobileRowToCol AlignItems JustifyCenter SimpleBorder">
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
                <div className="CursiveFont LargeFont Buffer PinkFont ">{isLeader ? 'About Me' : 'Important Info about my children'}</div>
                <textarea
                  className="ThreeQuarters"
                  name="aboutMe"
                  onChange={(e) => setAboutMe(e.target.value)}
                  value={updatedAboutMe}
                  rows={4}
                />


              </div>

              {/* Update Photo Gallery */}
              {isLeader && (
                <div>
                  <div className="CursiveFont LargeFont Buffer PinkFont">Home Gallery</div>

                  <textarea
                    className="ThreeQuarters"
                    placeholder="Enter a simple description for your home preschool"
                    name="aboutMe"
                    onChange={(e) => setGalleryDescription(e.target.value)}
                    value={updatedGalleryDesription}
                    rows={4}
                  />


                </div>)}

              {/* Photo Gallery */}
              {isLeader && (<>
                <div className="Flex Col JustifyCenter AlignItems PaddingLite">
                  <div className="Flex TextLeft Flex JustifyCenter Col">
                    <span className="InputTextLabel HideMobile" >Limit of 10 Images</span>
                    <span className="InputTextLabel ShowMobile" >Limit 10</span>
                    <input
                      ref={filesref}
                      className="InputStyle"
                      placeholder="Select a File"
                      type="file"
                      name="files"
                      multiple
                      onChange={(e) => handleNewFiles(e.target.files)}
                    />
                  </div>

                  { newFiles
                  && <div className="SimpleBorder Buffer WhiteFill">
                    {/* Thumbnail images prior to upload */}
                    <div className="UploadImageContainer">
                      { thumbArray.map((file, index) => (
                        <HoverableThumbnail key={index.toString()} file={file.thumb} index={index}/>))}
                    </div>

                  </div>
                  }

                  {updatedGalleryImages && (
                    <div className="SimpleBorder Buffer WhiteFill">
                      {updatedGalleryImages.map((elem, index) => (
                        <SimpleImage key={`gallery${index}`} image={elem.image} alt={`gallery${index}`} />
                      ))}
                    </div>
                  )}


                  {!uploading ? (<>{newFiles && <button type="button" style={{ margin: 0 }} onClick={handleSubmitPost}>Upload New Pics</button>} </>) : (
                    <div className="Flex Col JustifyCenter AlignItems">
                      <img src={Corner} alt='corner' className='filter-green Rotate Alert' style={{ width: 50, height: 'auto', zIndex: 0, paddingRight: 10 }} />
                    </div>
                  )}

                </div>


                <div>
                  <div className="CursiveFont LargeFont Buffer PinkFont">Home Features</div>
                  <p>NOTE: To add multiple bullet points to your features list, simply add a comma! This will signify a new item in your list.</p>

                  <textarea
                    className="ThreeQuarters"
                    placeholder="Enter a simple description for a feature in your home preschool"
                    name="features"
                    onChange={(e) => handleGalleryFeatureUpdate(e.target.value)}
                    value={updatedGalleryFeatures}
                    rows={4}
                  />


                  <div className="CursiveFont LargeFont Buffer ">Special Features of my Preschool</div>
                  <div className=" HalfSize MarginAuto">
                    <ul className="TextLeft">
                      {updatedGalleryFeatures && updatedGalleryFeatures.map((feature) => (
                        <li key={feature} className="Raleway">{feature}</li>
                      ))}
                    </ul>
                  </div>

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
      <Toast showToast={toast.value} message={toast.message} />

    </div>
  );
};

export default withRouter(MyProfilePage);
