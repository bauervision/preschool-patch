/* eslint-disable no-unused-vars */
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
import { Admin } from "./Admin";

import { f, database } from "./config";

import moment from 'moment';

const App = () => {

  const [patchData, setPatchData] = useState([]); // all user data for admin
  const [currentPage, setPage] = useState(0);
  const [leaderData, setLeaderData] = useState({});// raw data from DB
  const [clientData, setClientData] = useState([]);// raw data from DB
  const [selection, setSelection] = useState({ id: 'none' }); // whose profile are we viewing?
  const [loggedInUser, setLoggedInUser] = useState(null); // logged in user data
  const [userId, setUserId] = useState("");
  const [isLeader, setIsLeader] = useState(false); // set based on who logs in
  const [toast, setToast] = useState({ value: false, message: 'Welcome Back!' });

  const [kidTotal, setKidTotal] = useState([{ name: "Child's name", age: 2 }]);
  const [myMessages, setMyMessages] = useState([]);

  /* On Mount, fetch data, check login */
  useEffect(() => {
    handleLoginCheck();
    // eslint-disable-next-line
  }, [loggedInUser]);


  /* On Mount, fetch ALL leader data */
  useEffect(() => {
    getLeaderData();
  }, [isLeader]);


  // call on mount
  // useEffect(() => {
  //   console.log("index myMessages has changed", myMessages)
  //   if (myMessages) {
  //     myMessages.forEach((id) => {
  //       database.ref(`messages/${id.messagesId}/messageData`).on('child_added', (snap) => {
  //         const data = snap.val();

  //         if (id.messageData.length !== data.length) {
  //           // new message found
  //           const newMessage = data[data.length - 1]
  //           const updatedMessages = [...myMessages];
  //           const index = updatedMessages.findIndex((elem) => elem.messagesId === id.messagesId)
  //           if (index !== -1) {
  //             updatedMessages[index].messageData.push(newMessage);
  //             console.log(updatedMessages)
  //             setMyMessages(updatedMessages)
  //           } else {
  //             console.log("found id in messages")
  //           }
  //         }
  //       })
  //     })
  //   }
  // }, [myMessages]);


  // check login status
  const handleLoginCheck = () => {
    // console.log('handleLoginCheck')
    f.auth().onAuthStateChanged((user) => {
      if (user) {
        // make sure we arent already logged in
        if (!loggedInUser) {
          getUserData(user);
          updateSuccess(true, "Welcome!")

        } else {
          // console.log("logged in!")
        }

      } else {
        // logged out
        handleLogOut();
      }
    });
  };

  const getUserData = (user) => {
    // setuserId right away
    setUserId(user.uid);

    // which type of user is logged in?
    let admin = false;
    // check to see if we are an admin
    database.ref(`admin/${user.uid}`).once("value", (snapshot) => {
      if (snapshot.val()) {
        const adminUser = snapshot.val();

        if (adminUser) {
          admin = true;
          setLoggedInUser(adminUser.public);

          // get our messages
          const messageEntries = adminUser.public.messages;
          const hasMessages = (messageEntries && messageEntries.length > 0);
          const pullMessages = messageEntries.length !== myMessages.length;

          if (hasMessages && pullMessages) {

            messageEntries.forEach((messageId) => {
              getMessageData(messageId);
            })
          }

          // now get all patch user data
          let data = {
            table: [],
            all: []
          };
          // first get the leaders
          database.ref('leaders').on("value", (snapshot) => {
            if (snapshot.val()) {
              const leaders = snapshot.val();
              Object.entries(leaders).forEach(([key, value]) => {
                // we dont't need all the values for admin table
                const newEntry = {
                  name: value.public.name,
                  isLeader: value.public.isLeader.toString(),
                  kidTotal: value.public.kidTotal,
                  messageThreads: (value.public.messages && value.public.messages.length) || 0,
                  phone: value.public.phone,
                  email: value.private.email,
                  zipcode: value.public.zipcode,
                }
                data.table.push(newEntry);
                // but we do need all when we select a row from the table
                data.all.push(value)
              })
            }
          });

          // now get the users
          database.ref('users').on("value", (snapshot) => {
            if (snapshot.val()) {
              const users = snapshot.val();
              Object.entries(users).forEach(([key, value]) => {
                // we dont't need all the values for admin purposes
                const newEntry = {
                  name: value.public.name,
                  isLeader: value.public.isLeader.toString(),
                  kidTotal: (value.public.children && value.public.children.length) || 0,
                  messageThreads: (value.public.messages && value.public.messages.length) || 0,
                  phone: value.public.phone,
                  email: value.private.email,
                  zipcode: value.public.zipcode,
                }
                data.table.push(newEntry);
                data.all.push(value)
              })
            }
          });


          setPatchData(data);
          setPage(7);
        }
      }
    });

    // if we aren't an admin, then handle users and leaders
    if (!admin) {
      const leader = Object.keys(leaderData).find((elem) => elem === user.uid);

      if (leader) {
        setIsLeader(true);
      }

      database.ref(`${leader ? 'leaders' : 'users'}/${user.uid}`).on("value", (snapshot) => {
        if (snapshot.val()) {
          const curUser = snapshot.val();

          setLoggedInUser(curUser.public);

          // regardless of whether the user is a teacher,a parent
          // we need to get the message data

          /* curUser.public.messages is an array of ids which point to
          the messages array, which holds all of the message data specifics */
          const messageEntries = curUser.public.messages;

          if (messageEntries && messageEntries.length > 0) {
            const hasMessages = (messageEntries && messageEntries.length > 0);
            const pullMessages = hasMessages && (messageEntries && messageEntries.length !== myMessages.length);
            if (hasMessages && pullMessages) {

              messageEntries.forEach((messageId) => {
                // check to see if this id is already in our messages
                const foundId = myMessages.some((elem) => elem.messagesId === messageId);
                if (!foundId) {
                  getMessageData(messageId);
                }
              })
            }
          }


          // if we logged in a leader, check to see if we have any clients
          if (leader) {
            if (curUser.public.clients && curUser.public.clients.length > 0) {
              const clientEntries = curUser.public.clients;
              clientEntries.forEach((clientId) => {
                getClientData(clientId);
              })
            }
            setPage(5); // leader has logged in, skip to client admin
          }
        }
      });

    }
  }


  const handleMessageUpdates = (activeMessagesID, updatedCurrentMessages) => {
    // push to DB
    database.ref(`messages/${activeMessagesID}`).set(updatedCurrentMessages);
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
            id: user.uid,
            infants: newUserData.infants,
            isLeader: true,
            kidTotal: 0,
            messages: ["None"],
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
            enrollment: { submitted: false },
            id: user.uid,
            isLeader: false,
            children: newUserData.children,
            messages: ["None"],
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

  const handleLogOut = () => {
    setLoggedInUser(null);
    setUserId(null);
    setIsLeader(false);
    // setMyMessages(null);
    setSelection(null);
    updateSuccess(true, "Logged Out")
  }


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

  const getLeaderData = () => {
    // grab ref to the data
    const leaderData = database.ref("leaders");
    // now get the data stored there, and use "on value" to make the data live
    leaderData.on("value", (snapshot) => {
      if (snapshot.val()) {
        setLeaderData(snapshot.val());
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
        const found = tempClients.some((item) => item.clientId === clientId);
        // as long as we havent already added them, add them
        if (!found) {
          tempClients.push(newClient)
          setClientData(tempClients);
        }
      }
    });
  };


  const getMessageData = (messageId) => {
    // what is the current value of myMessages?
    const tempMessages = myMessages;

    // grab ref to the data
    database.ref(`messages/${messageId}`).on("value", (snapshot) => {
      if (snapshot.val()) {
        // grab the data
        const data = snapshot.val();

        // have we already added this particular message set?
        const found = tempMessages.some((item) => item.messagesId === messageId);
        // as long as we havent already added them, add them
        if (!found) {
          // push a new element into the message array
          tempMessages.push(data)

        } else {
          // otherwise we have found the messageId,so update state with new value
          // grab where this message id is within myMessages
          const index = tempMessages.findIndex((elem) => elem.messagesId === messageId);
          // update it with new data
          tempMessages[index] = data;

        }

        tempMessages.sort((a, b) => moment(b.lastMessage.date).diff(a.lastMessage.date))
        setMyMessages(tempMessages);
      }
    });
  };


  /* Page Router */
  const onPage = (page) => {

    // if (selection && (page !== 6 || page !== 3)) {
    //   setSelection(null)
    // }

    // reset window scroll position with each page change
    window.scrollTo(0, 0);

    switch (page) {
      case 7:
        return (
          <Admin
            pageUpdate={handlePageUpdate}
            loggedInUser={loggedInUser}
            handleLogOut={handleLogOut}
            updateSuccess={updateSuccess}
            userId={userId}
            myMessages={myMessages && myMessages}
            isLeader={isLeader}
            handleMessageUpdates={handleMessageUpdates}
            patchData={patchData}

          />
        );
      case 6:
        return (
          <Messages
            pageUpdate={handlePageUpdate}
            loggedInUser={loggedInUser}
            handleLogOut={handleLogOut}
            updateSuccess={updateSuccess}
            clientData={clientData && clientData}
            userId={userId}
            myMessages={myMessages && myMessages}
            isLeader={isLeader}
            handleMessageUpdates={handleMessageUpdates}
            currentSelection={selection}
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
            userId={userId}
            myMessages={myMessages && myMessages}
            isLeader={isLeader}
            handleMessageUpdates={handleMessageUpdates}
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
            clientData={clientData}
            myMessages={myMessages && myMessages}
            launchToast={toast}
            userId={userId}
          />
        );
      case 3:
        return (
          <ProfilePage
            pageUpdate={handlePageUpdate}
            data={selection}
            loggedInUser={loggedInUser}
            clientData={clientData}
            myMessages={myMessages && myMessages}
            isLeader={isLeader}
          />
        );
      case 2:
        return (
          <CreateAccount
            pageUpdate={handlePageUpdate}
            leaderData={leaderData}
            handleLogin={handleLogin}
            loggedInUser={loggedInUser}
            isLeader={isLeader}
            clientData={clientData}
            myMessages={myMessages && myMessages}
          />
        );
      case 1:
        return (
          <Login
            pageUpdate={handlePageUpdate}
            leaderData={leaderData}
            handleLogin={handleLogin}
            handleLogOut={handleLogOut}
            loggedInUser={loggedInUser}
            kidTotal={kidTotal}
            addNewChildInfo={addNewChildInfo}
            clientData={clientData}
          />
        );
      default:
        return (
          <PublicLanding
            pageUpdate={handlePageUpdate}
            leaderData={leaderData}
            handleMemberSelection={handleMemberSelection}
            handleLogin={handleLogin}
            handleLogOut={handleLogOut}
            loggedInUser={loggedInUser}
            launchToast={toast}
            isLeader={isLeader}
            clientData={clientData}
            myMessages={myMessages && myMessages}
            userId={userId}

          />
        );
    }
  };


  // BIG TODO:  add in proper routing so page doesnt update on refresh so bad
  return (
    <div className="App FixedBG ">
      {/* Handle which page to load based on state page value */}
      {onPage(currentPage)}
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
