import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.scss";
import { PublicLanding } from "./PublicLanding";
import { CreateAccount } from "./CreateAccount";
import { Login } from "./Login";
import { ProfilePage } from "./ProfilePage";

import { database } from "./config";

const App = () => {
  const [currentPage, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [selection, setSelection] = useState({});

  const handlePageUpdate = page => setPage(page);

  const handleMemberSelection = member => {
    setSelection(member);
    handlePageUpdate(3);
  };

  /* Which page do we render? */
  const onPage = page => {
    switch (page) {
      case 3:
        return <ProfilePage pageUpdate={handlePageUpdate} data={selection} />;
      case 2:
        return <CreateAccount pageUpdate={handlePageUpdate} data={data} />;
      case 1:
        return <Login pageUpdate={handlePageUpdate} data={data} />;
      default:
        return (
          <PublicLanding
            pageUpdate={handlePageUpdate}
            data={data}
            handleMemberSelection={handleMemberSelection}
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
