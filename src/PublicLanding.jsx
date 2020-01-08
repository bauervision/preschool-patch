/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";

import { ProfileCard } from "./ProfileCard";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";

import { Logo } from "./images";

// import { Coloring, Kids, Table, Working } from "./images/photos";
// const images = [
//   { src: { Coloring }, info: "First Image" },
//   { src: { Kids }, info: "Second Image" },
//   { src: { Table }, info: "Third Image" },
//   { src: { Working }, info: "Fourth Image" }
// ];

export const PublicLanding = ({
  pageUpdate,
  data,
  handleMemberSelection,
  handleLogin,
  handleLogOut,
  loggedInUser
}) => {
  // handle local state
  const [filteredData, setFilteredData] = useState(data);
  const [filterAvail, setFilterAvail] = useState(false);
  const [filterAcceptingInfants, setFilterInfants] = useState(false);
  const [showTeacher, setShowTeacher] = useState(true);

  /* On Mount, fetch data, check login */
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  // handleFilters
  const filterAvailable = (e) => {
    const checked = e.target.checked;
    setFilterAvail(checked);

    if (checked) {
      const update = filteredData.filter(
        (elem) => elem.public.available === "yes"
      );
      setFilteredData(update);
    } else {
      // not filtering available, but might be filtering infants
      if (filterAcceptingInfants) {
        const update = filteredData.filter(
          (elem) => elem.public.infants === "yes"
        );
        setFilteredData(update);
      } else {
        setFilteredData(data);
      }
    }
  };

  const filterInfants = (e) => {
    const checked = e.target.checked;
    setFilterInfants(checked);

    if (checked) {
      const update = filteredData.filter((elem) => elem.public.infants === "yes");
      setFilteredData(update);
    } else {
      // we're not filtering infants, but we still might be filtering avail
      if (filterAvail) {
        const update = data.filter((elem) => elem.public.available === "yes");
        setFilteredData(update);
      } else {
        setFilteredData(data);
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
        messages={3}
      />

      <div className="Flex AlignItems  Buffer " style={{ marginTop: 80 }}>
        <img
          src={Logo}
          alt="logo"
          className="Logo"
          style={{ width: 600, height: "auto" }}
        />
        <div
          className="Flex Col AlignItems  GreenFill"
          style={{ marginLeft: 100, borderRadius: 100 }}
        >
          <div>
            <h3>How It Works</h3>
          </div>
          <div className="Flex Row AlignItems JustifyCenter ">
            {showTeacher ? (
              <>
                <div>As a Teacher</div>
                <button type="button" onClick={() => setShowTeacher(false)}>
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
          </div>
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <div className="Flex Col JustifyCenter Buffer ">
          <div className="CursiveFont SuperFont">Simple Steps </div>
          {/* How it Works: Steps */}
          {showTeacher ? (
            <div className="Flex JustifyCenter">
              <div className="Flex Col AlignItems Buffer SimpleBorder WhiteFill">
                <div className="Buffer ">Sign-up as a Patch Leader</div>
              </div>

              <div className="Flex  Col AlignItems Buffer SimpleBorder WhiteFill">
                <div className="Buffer ">Enroll students</div>
              </div>

              <div className="Flex  Col AlignItems Buffer SimpleBorder WhiteFill">
                <div className="Buffer ">Get paid at the end of the week!</div>
              </div>
            </div>
          ) : (
              <div className="Flex JustifyCenter">
                <div className="Flex JustifyCenter Col AlignItems Buffer SimpleBorder WhiteFill">
                  <div className="Buffer ">Search Local Patches</div>
                </div>

                <div className="Flex JustifyCenter Col AlignItems Buffer SimpleBorder WhiteFill">
                  <div className="Buffer ">Enroll your child</div>
                </div>

                <div className="Flex JustifyCenter Col AlignItems Buffer SimpleBorder WhiteFill">
                  <div className="Buffer ">
                    Pay Weekly, Bi-Weekly, <br /> or Monthly for service!
                </div>
                </div>
              </div>
            )}

          {/* How it Works: Details */}
          <div className="Flex JustifyCenter AlignItems Buffer GreenFill">
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

        {/* Filter Criteria */}
        <div className="Flex Col JustifyCenter Buffer WhiteFill">
          {!showTeacher ? (
            <>
              <div className="CursiveFont SuperFont Buffer">
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
          <div className="PublicLanding_Content BoxShadow ">
            {Object.keys(filteredData).length !== 0 ? (
              Object.keys(filteredData).map((key) => {
                return (
                  <ProfileCard
                    key={filteredData[key].public.name}
                    data={filteredData[key]}
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
      </div>
      <Footer />
    </div>
  );
};
