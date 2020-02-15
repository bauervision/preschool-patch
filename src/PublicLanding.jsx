/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";

import { ProfileCard } from "./ProfileCard";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { Toast } from "./Components";

import { Logo, Elegant, Corner } from "./images";

export const PublicLanding = ({
  pageUpdate,
  leaderData,
  handleMemberSelection,
  handleLogOut,
  loggedInUser,
  launchToast,
  isLeader,
  myMessages,
  userId
}) => {
  // handle local state
  // const [leaderData, setLeaderData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterAvail, setFilterAvail] = useState(false);
  const [filterAcceptingInfants, setFilterInfants] = useState(false);
  const [showTeacher, setShowTeacher] = useState(true);


  /* On Mount, fetch data, check login */
  useEffect(() => {
    // incoming data is an obj, so lets convert it to a useable array
    if (leaderData) {
      const leadersArray = Object.entries(leaderData);
      let newData = [];
      leadersArray.forEach((elem) => { newData.push(elem[1].public) })
      // setLeaderData(newData);
      setFilteredData(newData);
    }


  }, [leaderData]);


  // handleFilters
  const filterAvailable = (e) => {
    const checked = e.target.checked;
    setFilterAvail(checked);

    if (checked) {
      const update = filteredData.filter(
        (elem) => elem.available === true
      );
      setFilteredData(update);
    } else {
      // not filtering available, but might be filtering infants
      if (filterAcceptingInfants) {
        const update = leaderData.filter(
          (elem) => elem.infants === true
        );
        setFilteredData(update);
      } else {
        // not filtering anything so revert to original leader data
        setFilteredData(leaderData);
      }
    }
  };

  const filterInfants = (e) => {
    const checked = e.target.checked;
    setFilterInfants(checked);

    if (checked) {
      const update = filteredData.filter((elem) => elem.infants === true);
      setFilteredData(update);
    } else {
      // we're not filtering infants, but we still might be filtering avail
      if (filterAvail) {
        const update = leaderData.filter((elem) => elem.available === true);
        setFilteredData(update);
      } else {
        // no filters so
        setFilteredData(leaderData);
      }
    }
  };

  const handleSelection = (memberData) => {
    // Pass current selection up to parent in order to render profile page
    handleMemberSelection(memberData);
  };


  return (
    <div className="PublicLanding">
      <Header
        pageUpdate={pageUpdate}
        isHome
        loggedInUser={loggedInUser}
        handleLogOut={handleLogOut}
        isLeader={isLeader}
        myMessages={myMessages && myMessages}
        userId={userId}
      />

      <div className="Flex AlignItems  Buffer " style={{ marginTop: 80 }}>
        <img
          src={Logo}
          alt="logo"
          className="Logo"
          style={{ width: 600, height: "auto" }}
        />
        <div
          className="Flex Col AlignItems PinkFill RoundBorder LargeBuffer"
          style={{ marginLeft: 100 }}>

          <div>
            <h3>How It Works</h3>
          </div>
          <div className="Flex Row AlignItems JustifyCenter ">
            {showTeacher ? (
              <>
                <div>As a Teacher</div>
                <button
                  type="button" onClick={() => {
                    setShowTeacher(false);


                  }}>
                  As a Parent
                </button>
              </>
            ) : (
                <>
                  <button type="button" onClick={() => setShowTeacher(true)}>
                    As a Teacher
                </button>
                  <div>As a Parent</div>
                </>
              )}

            <img src={Corner} alt='corner' className='filter-white Rotate' style={{ width: 100, height: 'auto', zIndex: 0 }} />
          </div>
        </div>
      </div>


      <div >
        <div className="Flex Col JustifyCenter Buffer ">

          <div className="Tab SeeThru  PaddingTop">
            <div className="CursiveFont SuperFont ">Simple Steps </div>
            {/* How it Works: Steps */}
            {showTeacher ? (
              <div className="Flex JustifyCenter">
                <div className="Flex Col AlignItems Buffer SimpleBorder PinkFill CursiveFont LargeFont">
                  <div className="Buffer ">Sign-up as a Patch Leader</div>
                </div>

                <div className="Flex  Col AlignItems Buffer SimpleBorder PinkFill CursiveFont LargeFont">
                  <div className="Buffer ">Enroll students</div>
                </div>

                <div className="Flex  Col AlignItems Buffer SimpleBorder PinkFill CursiveFont LargeFont">
                  <div className="Buffer ">Get paid at the end of the week!</div>
                </div>
              </div>
            ) : (
                <div className="Flex JustifyCenter">
                  <div className="Flex JustifyCenter Col AlignItems Buffer SimpleBorder PinkFill CursiveFont LargeFont">
                    <div className="Buffer ">Search Local Patches</div>
                  </div>

                  <div className="Flex JustifyCenter Col AlignItems Buffer SimpleBorder PinkFill CursiveFont LargeFont">
                    <div className="Buffer ">Enroll your child</div>
                  </div>

                  <div className="Flex JustifyCenter Col AlignItems Buffer SimpleBorder PinkFill CursiveFont LargeFont">
                    <div className="Buffer ">
                      Pay Weekly, Bi-Weekly, <br /> or Monthly for service!
                </div>
                  </div>
                </div>
              )}

            {/* How it Works: Details */}
            <div className="Flex JustifyCenter AlignItems GreenFill TabBottom">
              {showTeacher ? (
                <div className="Flex Col JustifyCenter AlignItems Buffer">
                  <p>
                    After you signup, your profile will be added to our database
                    and will show up in local searches.
                  <br />
                    <br />
                  </p>
                  <div>
                    <div className="CursiveFont LargeFont">Keys to success: </div>
                    <ul style={{ textAlign: "left" }}>
                      <li>
                        Convert a space in your home to a warm preschool
                        environment, take pictures and upload them to your profile
                        to impress prospective clients. This is the best thing you
                        can do to create interest in your business!
                    </li>
                      <li>
                        Complete a simple background check. It costs $20 and
                        offers some valuable peace of mind for parents.
                    </li>
                      <li>
                        Post your profile on local Social Media Mom pages to
                        further spread the word about your availability!
                    </li>
                      <li>
                        Create Social Media pages for your business and update
                        them regularly.
                    </li>
                    </ul>
                  </div>
                </div>
              ) : (
                  <p style={{ marginTop: 50, marginBottom: 50 }}>
                    Preschool Patch offers a small group setting designed to elevate
                    your child's education and social interactions in a warm,
                    inviting, and safe space.
                <br />
                    <br />
                    Max class size of 5 means that your child will not be just a
                    number, but a nurtured student.
              </p>
                )}
            </div>
          </div>

        </div>

        <img src={Elegant} alt="decorative" className="filter-green Margins" />

        {/* Filter Criteria */}
        <div className="Flex Col JustifyCenter  SeeThru">
          {!showTeacher ? (
            <>
              <div className="CursiveFont SuperFont Buffer PinkFont">
                Find a local preschool teacher for your child!
              </div>

              {/* Filter data by zipcode */}
              <div>
                <input
                  placeholder="Enter Zipcode"
                  style={{ width: 100 }}
                  className="InputStyle"
                />
              </div>

              <label>
                Show Only Available
                <input type="checkbox" onChange={(e) => filterAvailable(e)} />
              </label>

              <label>
                Accepting Infants
                <input type="checkbox" onChange={(e) => filterInfants(e)} />
              </label>
            </>
          ) : (
              <div className="CursiveFont SuperFont Buffer">
                Explore some example profiles of our most successful Patches!
            </div>
            )}
          {/* Content */}
          <div className="PublicLanding_Container JustifyCenter BoxShadow ">
            {filteredData.length !== 0 ? (
              filteredData.map((elem) => {
                return (
                  <ProfileCard
                    key={elem.name}
                    data={elem}
                    handleSelection={handleSelection}
                  />
                );
              })
            ) : (
                <div style={{ padding: 40 }}>
                  <h3>{"No Patch Leaders yet. :("}</h3>
                  <div>Maybe you can be the first.....?</div>
                  <div>
                    <button onClick={() => pageUpdate(2)}>
                      Become a Patch Leader!
                  </button>
                  </div>
                </div>
              )}
          </div>


        </div>

        <img src={Elegant} alt="decorative" className="filter-green Margins" />

        <div className="CursiveFont RedicFont Margins PinkFont">Love Learning Early!</div>

      </div>
      <Footer />

      <Toast showToast={launchToast.value} message={launchToast.message} />

    </div>
  );
};
