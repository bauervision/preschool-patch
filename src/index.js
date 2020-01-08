import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.scss";
import { PublicLanding } from "./PublicLanding";
import { CreateAccount } from "./CreateAccount";
import { Login } from "./Login";
import { ProfilePage } from "./ProfilePage";
import { MyProfilePage } from "./MyProfilePage";

import { f, database } from "./config";

const App = () => {

  const [currentPage, setPage] = useState(0);
  const [data, setData] = useState({});
  const [selection, setSelection] = useState({});
  const [loggedInUser, setLoggedInUser] = useState({});

  /* On Mount, fetch data, check login */

  useEffect(() => {
    handleLoginCheck();
    // eslint-disable-next-line
  }, [data]);

  // check login status
  const handleLoginCheck = () => {
    f.auth().onAuthStateChanged((user) => {
      if (user) {
        // logged in
        if (data) {
          const curUser = Object.keys(data && data).find(
            (item) => item === user.uid
          );
          if (curUser) {
            setLoggedInUser(data[curUser].public);
          }
        }
      } else {
        // logged out
        setLoggedInUser(null);
      }
    });
  };

  const handlePageUpdate = (page) => setPage(page);

  const handleMemberSelection = (member) => {
    setSelection(member);
    handlePageUpdate(3);
  };

  // this method handles existing logins and new basic users
  const handleLogin = (user, newUserData, isLeader) => {
    // if we logged in a new user
    if (newUserData) {
      // create new user data with what we do know about the user, as well as some defaults
      let newUser = {};
      if (isLeader) {
        newUser = {
          private: {
            email: newUserData.email,
            joined: user.metadata.creationTime,
            lastLogin: user.metadata.lastSignInTime
          },
          public: {
            aboutMe:
              "I am brand new to Preschool Patch!  I will update my profile ASAP.",
            age: newUserData.age,
            assisted: "no",
            available: "yes",
            bgCheckWilling: newUserData.backgroundCheck,
            bgCheckComplete: "no",
            enrolling: "yes",
            experience: newUserData.experience,
            infants: newUserData.infants,
            isLeader: true,
            kidTotal: 0,
            name: newUserData.displayName,
            phone: newUserData.phoneNumber,
            photoUrl: newUserData.photoUrl,
            rating: 0,
            rates: {
              ft: 35,
              pt: 45,
              di: 60
            },
            zipcode: newUserData.zipcode
          }
        };
        console.log("New leader to create!", newUser);
        // since we are a leader and now logged in, go ahead and set myself as the selection
        setSelection(newUser);
      } else {
        newUser = {
          private: {
            email: newUserData.email,
            joined: user.metadata.creationTime,
            lastLogin: user.metadata.lastSignInTime
          },
          public: {
            aboutMe:
              "I am brand new to Preschool Patch!  I will update my profile ASAP.",
            looking: "yes",
            kidTotal: 1,
            name: newUserData.displayName,
            zipcode: newUserData.zipcode
          }
        };
      }

      // now that we have some essential data in place, store this user into the database
      // make sure we check to see if we are storing a leader, or simply a user in doing so
      database
        .ref(`${isLeader ? "leaders" : "users"}/${user.uid}`)
        .set(newUser)
        .then(() => {
          setLoggedInUser(newUser);
        });

      // repull data before jumping to a new page
      database
        .ref(`${isLeader ? "leaders" : "users"}/${user.uid}`)
        .once("value")
        .then(() => {
          // if we successfully logged in, jump to MyProfile Page, which is the home page for Patch Leaders
          // othwise head to landing page
          handlePageUpdate(isLeader ? 4 : 0);
        });
    } else {
      // this was an existing user login so pull the user from our data and set them as the loggedInUser

      const curUser = Object.keys(data).find((item) => item === user.uid);
      setLoggedInUser(curUser);
      // if we successfully logged in, jump to Public Landing Page
      handlePageUpdate(0);
    }
  };

  const handleLogOut = () => {
    setLoggedInUser(null);
  };

  /* Page Router */
  const onPage = (page) => {
    // reset window scroll position with each page change
    window.scrollTo(0, 0);

    switch (page) {
      case 4:
        return (
          <MyProfilePage
            pageUpdate={handlePageUpdate}
            data={loggedInUser}
            handleLogOut={handleLogOut}
          />
        );
      case 3:
        return (
          <ProfilePage
            pageUpdate={handlePageUpdate}
            data={selection}
            loggedInUser={loggedInUser}
          />
        );
      case 2:
        return (
          <CreateAccount
            pageUpdate={handlePageUpdate}
            data={data}
            handleLogin={handleLogin}
            loggedInUser={loggedInUser}
          />
        );
      case 1:
        return (
          <Login
            pageUpdate={handlePageUpdate}
            data={data}
            handleLogin={handleLogin}
            handleLogOut={handleLogOut}
            loggedInUser={loggedInUser}
          />
        );
      default:
        return (
          <PublicLanding
            pageUpdate={handlePageUpdate}
            data={data}
            handleMemberSelection={handleMemberSelection}
            handleLogin={handleLogin}
            handleLogOut={handleLogOut}
            loggedInUser={loggedInUser}
          />
        );
    }
  };

  /* On Mount, fetch data */
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    // grab ref to the data
    const userData = database.ref("leaders");
    // now get the data stored there
    userData.once("value").then((snapshot) => {
      if (snapshot.val()) {
        setData(snapshot.val());
      }
    });
  };

  return (
    <div className="App FixedBG">
      {/* Handle which page to load based on state page value */}
      {onPage(currentPage)}
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
