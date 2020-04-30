/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import './styles.scss';
import moment from 'moment';
import PublicLanding from './PublicLanding';
import CreateAccount from './CreateAccount';
import Login from './Login';
import ProfilePage from './ProfilePage';
import MyProfilePage from './MyProfilePage';
import ClientAdmin from './ClientAdmin';
import { Messages } from './Messages';
import { Admin } from './Admin';
import { TeacherSocialPage } from './TeacherSocialPage';
import ScrollToTop from './Components/ScrollToTop';
import { About, Contact, FAQ, Privacy, Safety, Terms } from './AboutPages';
import { NotFound } from './NotFound';
import Payments from './Payments';


import PrivateRoute from './authRoutes/PrivateRoute';

import { f, database } from './config';


const App = () => {
  const [patchData, setPatchData] = useState(null); // all user data for admin
  const [clientData, setClientData] = useState(null);// raw data from DB
  const [selection, setSelection] = useState(null); // whose profile are we viewing?
  const [loggedInUser, setLoggedInUser] = useState(null); // logged in user data
  const [userId, setUserId] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false);// make sure user has verified email before allowing things
  const [isLeader, setIsLeader] = useState(false); // set based on who logs in
  const [toast, setToast] = useState({ value: false, message: 'Welcome Back!' });

  const [kidTotal, setKidTotal] = useState([{ name: "Child's name", age: 2 }]);
  const [myMessages, setMyMessages] = useState([]);
  const [loadingClients, setLoadingClients] = useState(true);
  const [loadingSocial, setLoadingSocial] = useState(true);
  const [socialPosts, setSocialPosts] = useState(null);
  const [socialPostId, setSocialPostId] = useState(null);
  const [redirect, setRedirect] = useState({ to: '/' });


  // keep messages updated
  useEffect(() => {
    if (myMessages?.length > 0) {
      myMessages.forEach((id) => {
        // query each message string for updates
        database.ref(`messages/${id.messagesId}`).on('value', (snap) => {
          const data = snap.val();
          // we will be updating myMessages so grab it now
          const updatedMessages = [...myMessages];
          const index = updatedMessages.findIndex((elem) => elem.messagesId === id.messagesId);
          // if length is different, then a new message was added
          if (id.messageData.length !== data.messageData.length) {
            const newMessage = data[data.length - 1];

            if (index !== -1) {
              updatedMessages[index].messageData.push(newMessage);
              setMyMessages(updatedMessages);
            }
          }

          // now check to see if "seen" has changed
          if (id.lastMessage.seen !== data.lastMessage.seen) {
            if (index !== -1) {
              updatedMessages[index].lastMessage = data.lastMessage;
              setMyMessages(updatedMessages);
            }
          }
        });
      });
    }
  });


  /* Handle Loading Client Data */
  useEffect(() => {
    if (loggedInUser) {
      setIsLeader(loggedInUser.isLeader);

      // if we have clients
      if (loggedInUser.isLeader && loggedInUser.clients) {
        // once state matches DB
        if (clientData?.length === loggedInUser.clients.length) {
          // turn off the loader
          setLoadingClients(false);
        }
      } else {
        // we dont have any clients, so turn off the loader
        setLoadingClients(false);
      }
    }
  }, [clientData, isLeader, loggedInUser]);

  /* Handle Loading Social Data */
  useEffect(() => {
    if (loggedInUser) {
      // if not a leader, see if they have been accepted
      const enrolled = (!isLeader && loggedInUser.enrollment?.accepted) || false;

      if (isLeader || enrolled) {
        // once state matches DB
        if (!socialPosts) {
          // turn off the loader
          setLoadingSocial(false);
        }
      } else {
        // we dont have access to social feed
        setLoadingSocial(false);
      }
    }
  }, [isLeader, loggedInUser, socialPosts]);


  const getMessageData = (messageId) => {
    // what is the current value of myMessages?

    const tempMessages = myMessages || [];

    // grab ref to the data
    database.ref(`messages/${messageId}`).on('value', (snapshot) => {
      if (snapshot.val()) {
        // grab the data
        const data = snapshot.val();

        // have we already added this particular message set?
        const found = tempMessages?.some((item) => item.messagesId === messageId);
        // as long as we havent already added them, add them
        if (!found) {
          // push a new element into the message array
          tempMessages.push(data);
        } else {
          // otherwise we have found the messageId,so update state with new value
          // grab where this message id is within myMessages
          const index = tempMessages?.findIndex((elem) => elem.messagesId === messageId);
          // update it with new data
          tempMessages[index] = data;
        }
        tempMessages.sort((a, b) => moment(b.lastMessage.date).diff(a.lastMessage.date));
        setMyMessages(tempMessages);
      }
    });
  };


  const fetchMessages = (messageEntries) => {
    if (messageEntries?.length > 0) {
      messageEntries.forEach((messageId) => getMessageData(messageId));
    }
  };


  const handleMessageUpdates = (activeMessagesID, updatedCurrentMessages) => {
    // push to DB
    database.ref(`messages/${activeMessagesID}`).set(updatedCurrentMessages);
  };

  const fetchSocialActivity = (id) => {
    // grab ref to the data
    database.ref(`social/${id}`).on('value', (snapshot) => {
      if (snapshot.val()) {
        // grab the data
        const data = snapshot.val();
        setSocialPosts(data);
      }
    });
  };

  const handlePostUpdates = (posts) => {
    // push update to DB and update state which will trigger the re-render on social page
    database.ref(`social/${socialPostId}`).set(posts).then(() => setSocialPosts(posts));
  };


  const updateSuccess = (value, message) => {
    setToast({ value, message });
    setTimeout(() => setToast({ value: false, message: '' }), 3000);
  };

  const handleLogOut = () => {
    setRedirect({ to: '/' });
    setPatchData(null);
    setClientData(null);
    setLoggedInUser(null);
    setUserId('');
    setIsLeader(false);
    setMyMessages([]);// leave it reset as an array
    setSelection(null);
    updateSuccess(true, 'Logged Out');
    setLoadingClients(true);
  };

  const handleMemberSelection = (member) => setSelection(member);


  const getClientData = (clientId) => {
    // grab ref to the data
    const ref = database.ref(`users/${clientId}`);
    // now get the data stored there, and use "on value" to make the data live
    ref.on('value', (snapshot) => {
      if (snapshot.val()) {
        // grab the data
        const data = snapshot.val();
        // we need to format a new object in order to better handle data later
        const newClient = {
          clientId,
          clientData: data.public
        };

        // do we have current clientData?
        if (clientData) {
          // what is the current value of clientData?
          const tempClients = [...clientData];
          // have we already added this particular client?
          const found = tempClients.some((item) => item.clientId === clientId);
          // as long as we havent already added them, add them
          if (!found) {
            tempClients.push(newClient);
            setClientData(tempClients);
          }
        } else {
          // we dont, which means this is our first
          setClientData([newClient]);
        }
      }
    });
  };


  const getUserData = (user) => {
    // setuserId right away
    setUserId(user.uid);

    // which type of user is logged in?
    let admin = false;
    // check to see if we are an admin
    database.ref(`admin/${user.uid}`).once('value', (adminSnap) => {
      if (adminSnap.val()) {
        const adminUser = adminSnap.val();

        if (adminUser) {
          admin = true;
          setLoggedInUser(adminUser.public);

          // get our messages
          const messageEntries = adminUser.public.messages;
          fetchMessages(messageEntries);

          // now get all patch user data
          const data = {
            table: [],
            all: []
          };

          // first get the leaders
          database.ref('leaders').on('value', (leaderSnap) => {
            if (leaderSnap.val()) {
              const leaders = leaderSnap.val();
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
                };
                data.table.push(newEntry);
                // but we do need all when we select a row from the table
                data.all.push(value);
              });
            }
          });

          // now get the users
          database.ref('users').on('value', (userSnap) => {
            if (userSnap.val()) {
              const users = userSnap.val();
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
                };
                data.table.push(newEntry);
                data.all.push(value);
              });
            }
          });

          setPatchData(data);
          setRedirect({ to: '/admin' });
        }
      }
    });

    // if we aren't an admin, then handle users and leaders
    if (!admin) {
      let leader = false;

      // first let's find out if the user is a leader
      database.ref(`leaders/${user.uid}`).on('value', (snapshot) => {
        // if we found the user then snapshot will be valid
        if (snapshot.val()) {
          leader = true;
          const curUser = snapshot.val();
          setLoggedInUser(curUser.public);
          setSocialPostId(user.uid);// social postID will always be the leaders ID

          /* curUser.public.messages is an array of ids which point to
          the messages array, which holds all of the message data specifics */
          const messageEntries = curUser.public.messages;
          fetchMessages(messageEntries);

          // if a leader has a new client request, they need to redirect there first
          let unAcceptedClient = false;
          if (curUser.public.clients?.length > 0) {
            const clientEntries = curUser.public.clients;

            clientEntries.forEach((client) => {
              unAcceptedClient = !client.accepted;
              getClientData(client.clientId);
            });
          }

          fetchSocialActivity(user.uid);
          // if leader has new client requests go to client admin first
          if (unAcceptedClient) {
            setRedirect({ to: `/clientAdmin/${curUser.id}` });
          } else {
            // otherwise go to social page
            setRedirect({ to: `/teacherSocial/${user.uid}` });
          }
        }
      });

      if (!leader) {
        // the user wasnt a leader, so pull users
        database.ref(`users/${user.uid}`).on('value', (snapshot) => {
          if (snapshot.val()) {
            const curUser = snapshot.val();
            setLoggedInUser(curUser.public);

            /* curUser.public.messages is an array of ids which point to
            the messages array, which holds all of the message data specifics */
            const messageEntries = curUser.public.messages;
            fetchMessages(messageEntries);

            // check to see if this user is enrolled
            if (curUser.public.enrollment?.accepted) {
              // grab social feed which is the ID of the leader we're enrolled with
              setSocialPostId(curUser.public.enrollment.submittedTo);// social postID will always be the leaders ID
              fetchSocialActivity(curUser.public.enrollment.submittedTo);
              setRedirect({ to: `/teacherSocial/${curUser.public.enrollment.patchName}` });
            }
          }
        });
      }
    }
  };


  // check login status
  const handleLoginCheck = () => {
    f.auth().onAuthStateChanged((user) => {
      if (user) {
        // make sure we arent already logged in
        if (!loggedInUser) {
          getUserData(user);
          setEmailVerified(user.emailVerified);
          updateSuccess(true, 'Welcome!');
        }
      } else {
        // logged out
        handleLogOut();
      }
    });
  };


  useEffect(() => {
    handleLoginCheck();
    // eslint-disable-next-line
  }, [loggedInUser]);

  const handleLogin = (user, newUserData, isaLeader) => {
    if (!loggedInUser) {
      // if we logged in a new user
      if (newUserData) {
        // create new user data with what we do know about the user, as well as some defaults
        let newUser = {};
        if (isaLeader) {
          newUser = {
            private: {
              joined: user.metadata.creationTime,
              lastLogin: user.metadata.lastSignInTime
            },
            public: {
              aboutMe:
                'I am brand new to Preschool Patch!  I will update my profile ASAP.',
              active: true,
              age: newUserData.age,
              available: true,
              email: newUserData.email,
              bgCheckWilling: newUserData.backgroundCheck,
              bgCheckComplete: false,
              experience: newUserData.experience,
              gallery: {
                description: 'My home is ready for preschool learning!',
                features: ['Warm and Inviting', 'Fenced in backyard'],
                files: []
              },
              id: user.uid,
              infants: newUserData.infants,
              isLeader: true,
              kidTotal: 0,
              name: newUserData.displayName,
              patchName: 'My Preschool Patch',
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
        } else {
          newUser = {
            private: {
              joined: user.metadata.creationTime,
              lastLogin: user.metadata.lastSignInTime
            },
            public: {
              active: true,
              email: newUserData.email,
              enrollment: { submitted: false },
              id: user.uid,
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
          .ref(`${isaLeader ? 'leaders' : 'users'}/${user.uid}`)
          .set(newUser).then(() => {
            setLoggedInUser(newUser);
          });
      }
      // regardless of who logged in...
      handleLoginCheck(user);
    }
  };

  const addNewChildInfo = () => {
    const newKid = { name: "Child's name", age: 2 };
    const updatedInfo = kidTotal;
    updatedInfo.push(newKid);

    setKidTotal(updatedInfo);
  };


  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <Switch>

          {/* Create account for teachers */}
          <Route
            path="/createAccount"
            render={() => <CreateAccount
              handleLogin={handleLogin}
              loggedInUser={loggedInUser}
              isLeader={isLeader}
              clientData={clientData}
              myMessages={myMessages && myMessages}
            />}
          />

          <Route
            path="/profile/*"
            render={() => <ProfilePage
              data={selection}
              loggedInUser={loggedInUser}
              clientData={clientData}
              myMessages={myMessages && myMessages}
              isLeader={isLeader}
              emailVerified={emailVerified}
              handleLoginCheck={handleLoginCheck}
            />}
          />

          <PrivateRoute path = '/myProfile*' loggedInUser={loggedInUser} >
            <Route
              path="/myProfile*"
              render={() => <MyProfilePage
                loggedInUser={loggedInUser}
                handleLogOut={handleLogOut}
                updateSuccess={updateSuccess}
                isLeader={isLeader}
                clientData={clientData}
                myMessages={myMessages && myMessages}
                launchToast={toast}
                userId={userId}
                emailVerified={emailVerified}
              /> }
            />
          </PrivateRoute>

          <PrivateRoute path = '/clientAdmin*' loggedInUser={loggedInUser}>
            <Route
              path="/clientAdmin*"
              render={() => <ClientAdmin
                loggedInUser={loggedInUser}
                handleLogOut={handleLogOut}
                updateSuccess={updateSuccess}
                launchToast={toast}
                clientData={clientData}
                userId={userId}
                myMessages={myMessages && myMessages}
                isLeader={isLeader}
                handleMessageUpdates={handleMessageUpdates}
                loadingClients={loadingClients}
                handleMemberSelection={handleMemberSelection}
                emailVerified={emailVerified}
              />}
            />

          </PrivateRoute>

          <PrivateRoute path = '/messages*' loggedInUser={loggedInUser}>
            <Route
              path="/messages*"
              render={() => <Messages
                loggedInUser={loggedInUser}
                handleLogOut={handleLogOut}
                updateSuccess={updateSuccess}
                clientData={clientData && clientData}
                userId={userId}
                myMessages={myMessages && myMessages}
                isLeader={isLeader}
                handleMessageUpdates={handleMessageUpdates}
                currentSelection={selection}
                emailVerified={emailVerified}
              />}
            />
          </PrivateRoute>

          <PrivateRoute path = '/admin' loggedInUser={loggedInUser}>
            <Route
              path="/admin"
              render={() => <Admin
                loggedInUser={loggedInUser}
                handleLogOut={handleLogOut}
                updateSuccess={updateSuccess}
                userId={userId}
                myMessages={myMessages && myMessages}
                isLeader={isLeader}
                handleMessageUpdates={handleMessageUpdates}
                patchData={patchData}
              />}
            />
          </PrivateRoute>

          <PrivateRoute path = '/teacherSocial*' loggedInUser={loggedInUser}>
            <Route
              path="/teacherSocial*"
              render={() => <TeacherSocialPage
                loggedInUser={loggedInUser}
                handleLogOut={handleLogOut}
                updateSuccess={updateSuccess}
                launchToast={toast}
                clientData={clientData && clientData}
                userId={userId}
                myMessages={myMessages && myMessages}
                isLeader={isLeader}
                loadingSocial={loadingSocial}
                socialPosts={socialPosts}
                handlePostUpdates={handlePostUpdates}
                emailVerified={emailVerified}
              />}
            />
          </PrivateRoute>


          {/* <Route path="/passwordReset" exact component={PasswordReset} /> */}
          <Route path="/aboutUs" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/faq" component={FAQ} />
          <Route path="/privacyPolicy" component={Privacy} />
          <Route path="/safety" component={Safety} />
          <Route path="/terms" component={Terms} />

          <Route
            path="/login" render={() => <Login
              handleLogin={handleLogin}
              handleLogOut={handleLogOut}
              loggedInUser={loggedInUser}
              kidTotal={kidTotal}
              addNewChildInfo={addNewChildInfo}
              clientData={clientData}
            />}/>

          <PrivateRoute path = '/payments/*' loggedInUser={loggedInUser}>
            <Route
              path="/payments/*" render={() => <Payments
                handleLogin={handleLogin}
                handleLogOut={handleLogOut}
                loggedInUser={loggedInUser}
                clientData={clientData}
                emailVerified={emailVerified}
              />}/>
          </PrivateRoute>

          <Route
            path='/'
            exact
            render={() => <PublicLanding
              emailVerified={emailVerified}
              handleMemberSelection={handleMemberSelection}
              handleLogin={handleLogin}
              handleLogOut={handleLogOut}
              loggedInUser={loggedInUser}
              launchToast={toast}
              isLeader={isLeader}
              clientData={clientData}
              myMessages={myMessages && myMessages}
              userId={userId}
              redirect={redirect}

            />
            } />

          <Route component={NotFound}/>
        </Switch>
      </div>
    </Router>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App/>, rootElement);
