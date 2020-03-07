import React, { useState, useEffect } from 'react';

import { ProfileCard } from './ProfileCard';
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';
import { Toast, Loader } from './Components';

import { Logo, Elegant, Corner } from './images';

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
  const [filteredData, setFilteredData] = useState(null);
  const [filterAvail, setFilterAvail] = useState(false);
  const [filterAcceptingInfants, setFilterInfants] = useState(false);
  const [showTeacher, setShowTeacher] = useState(false);
  const [loadingLeaders, setLoadingLeaders] = useState(true);

  useEffect(() => {
    if (filteredData) {
      setLoadingLeaders(false);
    }
  }, [filteredData]);

  /* On Mount, fetch data, check login */
  useEffect(() => {
    // incoming data is an obj, so lets convert it to a useable array
    if (leaderData) {
      const leadersArray = Object.entries(leaderData);
      const newData = [];
      leadersArray.forEach((elem) => { newData.push(elem[1].public); });
      setFilteredData(newData);
    }
  }, [leaderData]);

  useEffect(() => {
    if (loggedInUser) {
      setShowTeacher(false);
    }
  }, [loggedInUser]);

  // handleFilters
  const filterAvailable = (e) => {
    const { checked } = e.target;
    setFilterAvail(checked);

    if (checked) {
      const update = filteredData.filter(
        (elem) => elem.available === true
      );
      setFilteredData(update);
    } else if (filterAcceptingInfants) {
      const update = leaderData.filter(
        (elem) => elem.infants === true
      );
      setFilteredData(update);
    } else {
      // not filtering anything so revert to original leader data
      setFilteredData(leaderData);
    }
  };

  const filterInfants = (e) => {
    const { checked } = e.target;
    setFilterInfants(checked);

    if (checked) {
      const update = filteredData.filter((elem) => elem.infants === true);
      setFilteredData(update);
    } else if (filterAvail) {
      const update = leaderData.filter((elem) => elem.available === true);
      setFilteredData(update);
    } else {
      // no filters so
      setFilteredData(leaderData);
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

      {/* Top Left Title */}
      {loggedInUser
      && <div className="CursiveFont SuperFont TextLeft Buffer HideMobile">Preschool Patch</div>
      }

      {/* Initial Public display */}
      {!loggedInUser && (
        <>
          <div className="Flex AlignItems JustifyCenter Buffer ">

            <img
              src={Logo}
              alt="logo"
              className="Logo HideMobile"

            />

            <div className="HowItWorks PinkFill RoundBorder MarginTopMobile Mobile3" >
              <h3>How It Works</h3>


              <div className="Flex Row AlignItems JustifyCenter ">
                {showTeacher ? (
                  <div className="Flex Row AlignItems">
                    <button type="button" onClick={() => setShowTeacher(false)} style={{ border: 'solid' }}> As a Parent</button>
                    <div><strong>As a Teacher</strong></div>
                  </div>
                ) : (
                  <div className=" Flex Row AlignItems">
                    <div><strong>As a Parent</strong></div>
                    <button type="button" onClick={() => { setShowTeacher(true); }} style={{ border: 'solid' }}>As a Teacher</button>
                  </div>
                )}

                <img src={Corner} alt='corner' className='filter-white Rotate Flower' />
              </div>
            </div>
          </div>


          <div className="Flex Col JustifyCenter Buffer ">

            <div className="Tab SeeThru  PaddingTop">
              <div className="CursiveFont SuperFont ">Simple Steps </div>
              {/* How it Works: Steps */}
              {showTeacher ? (
                <div className="Step CursiveFont">
                  <div className="Step_Child">Sign-up as a Patch Leader</div>
                  <div className="Step_Child" >Enroll students</div>
                  <div className="Step_Child">Get paid at the end of the week!</div>

                </div>
              ) : (
                <div className="Step CursiveFont">

                  <div className="Step_Child">Search Local Patches</div>
                  <div className="Step_Child">Enroll your child</div>
                  <div className="Step_Child">
              Pay Weekly, Bi-Weekly, <br /> or Monthly for service!
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
                      <ul style={{ textAlign: 'left' }}>
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
                  <div className="Buffer">
                    {"Preschool Patch offers a small group setting designed to elevate your child's education and social interactions in a warm, inviting, and safe space."}
                    <br />
                    <br />
            Max class size of 5 means that your child will not be just a
            number, but a nurtured student.
                  </div>
                )}
              </div>
            </div>

          </div>

          <div>
            <img src={Elegant} alt="decorative" className="responsive filter-green Margins" />
          </div>


        </>
      )}

      {/* Show loader if data is still coming in */}
      {loadingLeaders ? (
        <Loader />
      ) : (
        <div className="Flex Col JustifyCenter  SeeThru MarginTopMobileLarge">

          {/* If we're not a teacher, then show search options */}
          {!showTeacher ? (
            <>
              <div className="CursiveFont SuperFont Buffer PinkFont ">
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

          <div className="PublicLanding_Container JustifyCenter BoxShadow ">
            {filteredData?.length !== 0 ? (
                filteredData?.map((elem) => {
                  return (
                    <ProfileCard
                      key={elem.name}
                      data={elem}
                      handleSelection={handleSelection}
                    />
                  );
                })) : (
              <div style={{ padding: 40 }}>
                <h3>{'No Patch Leaders yet. :('}</h3>
                <div>Maybe you can be the first.....?</div>
                <div>
                  <button onClick={() => pageUpdate(2)}>Become a Patch Leader!</button>
                </div>
              </div>
            )}
          </div>


        </div>
      )}

      <div>
        <img src={Elegant} alt="decorative" className="responsive filter-green Margins" />
      </div>

      <div className="CursiveFont RedicFont Margins PinkFont">Love Learning Early!</div>

      <Footer />

      <Toast showToast={launchToast.value} message={launchToast.message} />

    </div>
  );
};
