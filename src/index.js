import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.scss";
import { PublicLanding } from "./PublicLanding";
import { CreateAccount } from "./CreateAccount";
import { Login } from "./Login";
import { ProfilePage } from "./ProfilePage";
import { MyProfilePage } from "./MyProfilePage";

import { f, database } from "./config";

const defaultUser = {
  private: {
    email: "mike@bauer.com",
    joined: "04272019"
  },
  public: {
    aboutMe:
      "I am the web designer for this site.  I will not be teaching any classes as I am not female, feel free to hire my wife!",
    age: 43,
    assisted: "no",
    available: "no",
    experience: 10,
    ftRate: 50,
    infants: "no",
    kidTotal: 3,
    name: "Mike",
    rating: 3,
    zipcode: 23322
  }
};

const App = () => {
  const [currentPage, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [selection, setSelection] = useState(defaultUser);
  const [loggedInUser, setLoggedInUser] = useState({});

  /* On Mount, fetch data, check login */
  useEffect(() => {
    handleLoginCheck(selection);
  }, [selection]);

  // check login status
  const handleLoginCheck = selection => {
    f.auth().onAuthStateChanged(user => {
      if (user === selection) {
        // logged in
        console.log("Logged in!");
      } else {
        // logged out
        console.log("Logged OUT!");
        setLoggedInUser(null);
      }
    });
  };

  const handlePageUpdate = page => setPage(page);

  const handleMemberSelection = member => {
    setSelection(member);
    handlePageUpdate(3);
  };

  const handleLogin = user => {
    setLoggedInUser(user);
  };

  const handleLogOut = () => {
    setLoggedInUser(null);
  };

  /* Page Router */
  const onPage = page => {
    switch (page) {
      case 4:
        return (
          <MyProfilePage
            pageUpdate={handlePageUpdate}
            data={selection}
            loggedInUser={loggedInUser}
            handleLogOut={handleLogOut}
          />
        );
      case 3:
        return <ProfilePage pageUpdate={handlePageUpdate} data={selection} />;
      case 2:
        return <CreateAccount pageUpdate={handlePageUpdate} data={data} />;
      case 1:
        return (
          <Login
            pageUpdate={handlePageUpdate}
            data={data}
            handleLogin={handleLogin}
            handleLogOut={handleLogOut}
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
    const userData = database.ref("users");
    // now get the data stored there
    userData.once("value").then(snapshot => {
      if (snapshot.val()) {
        setData(snapshot.val());
      }
    });
  };

  return (
    <div className="App">
      {/* Handle which page to load based on state page value */}
      {onPage(currentPage)}
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
