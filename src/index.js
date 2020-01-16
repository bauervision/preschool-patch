import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.scss";
import { PublicLanding } from "./PublicLanding";
import { CreateAccount } from "./CreateAccount";
import { Login } from "./Login";
import { ProfilePage } from "./ProfilePage";
import { MyProfilePage } from "./MyProfilePage";
import { ClientAdmin } from "./ClientAdmin";
import { Messages } from "./Messages";

import { f, database } from "./config";

const App = () => {

  const [currentPage, setPage] = useState(0);
  const [data, setData] = useState({});// raw data from DB
  const [clientData, setClientData] = useState([]);// raw data from DB
  const [selection, setSelection] = useState({}); // whose profile are we viewing?
  const [loggedInUser, setLoggedInUser] = useState({}); // logged in user data

  const [isLeader, setIsLeader] = useState(false); // set based on who logs in
  const [toast, setToast] = useState({ value: false, message: 'Welcome Back!' }); // set based on who logs in

  const [kidTotal, setKidTotal] = useState([{ name: "Child's name", age: 2 }]);

  const [myMessages, setMyPessages] = useState([]);

  /* On Mount, fetch data, check login */

  useEffect(() => {
    handleLoginCheck();
    // eslint-disable-next-line
  }, [data]);

  // check login status
  const handleLoginCheck = () => {
    f.auth().onAuthStateChanged((user) => {
      if (user) {
        getUserData(user);
        updateSuccess(true, "Welcome!")
      } else {
        // logged out
        setLoggedInUser(null);
        updateSuccess(true, "Logged Out")
      }
    });
  };

  const getUserData = (user) => {
    // which type of user is logged in?
    const id = Object.keys(data).find((elem) => elem === user.uid);

    // if we found a valid id, then this is a leader
    if (id) {
      setIsLeader(true)
    }

    database.ref(`${id ? 'leaders' : 'users'}/${user.uid}`).on("value", (snapshot) => {
      if (snapshot.val()) {
        const curUser = snapshot.val();
        setLoggedInUser(curUser.public);
        // now that we know who is logged in, if we logged in a leader, we need to grab client data
        if (id) {
          // now check to see if we have any clients
          if (curUser.public.clients) {
            const clientEntries = curUser.public.clients;
            clientEntries.forEach((clientId) => {
              getClientData(clientId);
            })
          }

        }
        handlePageUpdate(0);
      }
    });
  }

  const handlePageUpdate = (page) => setPage(page);

  const handleMemberSelection = (member) => {
    setSelection(member);
    handlePageUpdate(3);
  };

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
            assisted: false,
            available: true,
            bgCheckWilling: newUserData.backgroundCheck,
            bgCheckComplete: false,
            experience: newUserData.experience,
            gallery: {
              description: "My home is ready for preschool learning!",
              features: ["Warm and Inviting", "Fenced in backyard"],
              files: []
            },
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

        setIsLeader(true);

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
            isLeader: false,
            children: newUserData.children,
            name: newUserData.name,
            zipcode: newUserData.zipcode,
            photoUrl: newUserData.photoUrl,
            phone: newUserData.phone,
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
          handleLoginCheck();
        });


    } else {
      // we logged in existing
      handleLoginCheck();
    }

  };

  const handleLogOut = () => setLoggedInUser(null);


  const updateSuccess = (value, message) => {
    setToast({ value, message });
    setTimeout(() => setToast({ value: false, message: '' }), 3000);
  }


  const addNewChildInfo = () => {

    const newKid = { name: "Child's name", age: 2 }
    const updatedInfo = kidTotal;
    updatedInfo.push(newKid)

    setKidTotal(updatedInfo)
  }

  /* Page Router */
  const onPage = (page) => {
    // reset window scroll position with each page change
    window.scrollTo(0, 0);

    switch (page) {
      case 6:
        return (
          <Messages
            pageUpdate={handlePageUpdate}
            loggedInUser={loggedInUser}
            handleLogOut={handleLogOut}
            updateSuccess={updateSuccess}
            clientData={clientData}
          />
        );
      case 5:
        return (
          <ClientAdmin
            pageUpdate={handlePageUpdate}
            loggedInUser={loggedInUser}
            handleLogOut={handleLogOut}
            updateSuccess={updateSuccess}
            clientData={clientData}
          />
        );
      case 4:
        return (
          <MyProfilePage
            pageUpdate={handlePageUpdate}
            loggedInUser={loggedInUser}
            handleLogOut={handleLogOut}
            updateSuccess={updateSuccess}
            isLeader={isLeader}
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
            isLeader={isLeader}

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
            kidTotal={kidTotal}
            addNewChildInfo={addNewChildInfo}
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
            launchToast={toast}
            isLeader={isLeader}
          />
        );
    }
  };

  /* On Mount, fetch ALL leader data */
  useEffect(() => {
    getLeaderData();
  }, [isLeader]);

  const getLeaderData = () => {
    // grab ref to the data
    const leaderData = database.ref("leaders");
    // now get the data stored there, and use "on value" to make the data live
    leaderData.on("value", (snapshot) => {
      if (snapshot.val()) {
        setData(snapshot.val());
      }
    });
  };

  const getClientData = (clientId) => {
    // grab ref to the data
    const ref = database.ref(`users/${clientId}`);
    // now get the data stored there, and use "on value" to make the data live
    ref.on("value", (snapshot) => {
      if (snapshot.val()) {
        // grab the data
        const data = snapshot.val();
        // we need to format a new object in order to better handle data later
        const newClient = {
          clientId,
          clientData: data.public
        }
        // what is the current value of clientData?
        const tempClients = clientData;
        // have we already added this particular client?
        const found = tempClients.some(item => item.clientId === clientId);
        // as long as we havent already added them, add them
        if(!found){
          tempClients.push(newClient)
          setClientData(tempClients);
        }
      }
    });
  };

  return (
    <div className="App FixedBG ">
      {/* Handle which page to load based on state page value */}
      {onPage(currentPage)}
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
