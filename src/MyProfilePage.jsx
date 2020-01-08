import React, { useState, useEffect } from "react";

import { EditField } from "./Components";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";

import { Success } from "./images";

import { f, storage, database } from "./config";

export const MyProfilePage = ({ pageUpdate, data }) => {
  // pull out public data
  const {
    aboutMe,
    age,
    assisted,
    available,
    experience,
    rates,
    infants,
    kidTotal,
    name,
    photoUrl
  } = data;

  const [userId, setUserId] = useState(0);
  const [updatedAboutMe, setAboutMe] = useState(aboutMe);
  const [updatedAge, setAge] = useState(age);
  const [updatedAssisted, setAssisted] = useState(assisted);
  const [updatedAvailable, setAvailable] = useState(available);
  const [updatedExperience, setExperience] = useState(experience);
  const [updatedFTRates, setFTRates] = useState(rates && rates.ft);
  const [updatedPTRates, setPTRates] = useState(rates && rates.pt);
  const [updatedDIRates, setDIRates] = useState(rates && rates.di);
  const [updatedInfants, setInfants] = useState(infants);
  const [updatedKidTotal, setKidTotal] = useState(kidTotal);
  const [updatedName, setName] = useState(name);
  const [updatedPhotoUrl, setPhotoUrl] = useState(photoUrl);
  const [updating, setUpdating] = useState(false);

  /* On Mount, fetch uid */
  useEffect(() => {
    console.log("Mounted", data);
    const userId = f.auth().currentUser.uid;
    setUserId(userId);
  }, [data]);

  const handleDataUpdate = (e) => {
    e.preventDefault();

    // set update to current data before sending up
    const updatedData = {
      aboutMe: updatedAboutMe,
      age: updatedAge,
      assisted: updatedAssisted,
      available: updatedAvailable,
      experience: updatedExperience,
      rates: {
        ft: updatedFTRates,
        pt: updatedPTRates,
        di: updatedDIRates
      },
      infants: updatedInfants,
      kidTotal: updatedKidTotal,
      name: updatedName,
      photoUrl: updatedPhotoUrl
    };

    console.log(updatedData);

    // now that we have updated data, push it up to our database
    database
      .ref(`leaders/${userId}/public`)
      .set(updatedData)
      .then(() => {
        // do something now that the data has been set
        setUpdating(true);
      });
  };

  // let's push up the new profile pic into storage, and then save the download url
  const handlePhotoUpdate = (file) => {
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
            console.log("Download url: ", url);
            setPhotoUrl(url);
          });
      }
    );
  };

  return (
    <div className="CreateAccount Col Flex JustifyCenter">
      <div>
        <Header pageUpdate={pageUpdate} myProfile />

        <h1 className="CursiveFont" style={{ color: "white" }}>
          My Profile Page
        </h1>

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
                  <div className="CursiveFont LargeFont">{updatedName}</div>
                  <EditField
                    isFile
                    title="Update Profile Pic"
                    type="file"
                    forLabel="profilePic"
                    onChange={handlePhotoUpdate}
                  />
                </div>
              </div>

              <h3 className="CursiveFont">My Data</h3>
              <div className="Flex Row AlignItems SimpleBorder">
                <EditField
                  title="Full Name"
                  placeholder={name}
                  type="text"
                  forLabel="Name"
                  onChange={setName}
                  value={updatedName}
                />

                <EditField
                  title="Age"
                  placeholder={age}
                  type="number"
                  forLabel="Age"
                  onChange={setAge}
                  value={updatedAge}
                />
                <EditField
                  title="Years of Experience"
                  placeholder={experience}
                  type="number"
                  forLabel="experience"
                  onChange={setExperience}
                  value={updatedExperience}
                />

                <EditField
                  title="Current student count"
                  placeholder={kidTotal}
                  type="number"
                  forLabel="kidTotal"
                  onChange={setKidTotal}
                  value={updatedKidTotal}
                />
              </div>

              <div>
                <h3 className="CursiveFont">My Rates</h3>
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
              </div>

              <div>
                <h3 className="CursiveFont">My Status</h3>
                <div className="Flex Row AlignItems JustifyCenter SimpleBorder">
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
                    title="Currently Assisted?"
                    type="checkbox"
                    forLabel="assisted"
                    onChange={() => setAssisted(!updatedAssisted)}
                    value={updatedAssisted}
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
              </div>

              <div>
                <h3 className="CursiveFont">About Me</h3>
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
              <div>
                <button type="submit" className="RegisterButton">
                  Submit Changes
                </button>
                {updating && (
                  <div>
                    <img src={Success} alt="Success" />
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
