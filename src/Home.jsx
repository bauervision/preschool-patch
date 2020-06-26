import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
// import axios from 'axios';

import { database } from './config';
import ProfileCard from './ProfileCard';
import Header from './Components/Header';
import { Footer } from './Components/Footer';
import { Toast, Loader, EditField, PatchLogo } from './Components';

import { Elegant, IvyHeart, LoginPatch } from './images';


const Home = ({
  handleMemberSelection,
  handleLogOut,
  loggedInUser,
  launchToast,
  isLeader,
  myMessages,
  userId,
  history,
  emailVerified,
  redirect
}) => {
  // handle local state
  const [leaderData, setLeaderData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [filterAvail, setFilterAvail] = useState(false);
  const [filterAcceptingInfants, setFilterInfants] = useState(false);
  const [filterZip, setFilterZip] = useState(false);
  const [showTeacher, setShowTeacher] = useState(false);
  const [loadingLeaders, setLoadingLeaders] = useState(true);
  const [userZip, setUserZip] = useState('');

  // const getZip = async () => {
  //   axios
  //     .get('https://ipinfo.io?token=dda6c95f86991f')
  //     .then((response) => {
  //       // handle success
  //       setUserZip(response.data.postal);
  //     })
  //     .catch((error) => {
  //       // handle error
  //       console.log(error);
  //     })
  //     .finally(() => {
  //       // always executed
  //     });
  // };

  /* make sure we fetch leader data for searching */
  useEffect(() => {
    if (!filteredData) {
      setLoadingLeaders(true);
      database.ref('leaders').once('value', (snapshot) => {
        if (snapshot.val()) {
          const leadersArray = Object.entries(snapshot.val());
          const newData = [];
          leadersArray.forEach((elem) => { if (elem[1].public.active) { newData.push(elem[1].public); } });
          setLeaderData(newData);
          setFilteredData(newData);
        }
      });
    } else {
      setLoadingLeaders(false);
    }

    // also let's get the zipcode for the current user while we're in mount
    // TODO: getZip();
  }, [filteredData]);


  // handle initial login re-directs
  useEffect(() => {
    // if we have a redirect, than this is the '/' route which means we want to push the user
    // to a desired location upon initial login
    if (redirect) {
      history.push(redirect.to);
    }
  }, [history, redirect]);

  useEffect(() => {
    if (loggedInUser) {
      setShowTeacher(false);
    }
  }, [loggedInUser]);

  // handleFilters
  const filterAvailable = () => {
    const checked = !filterAvail;
    setFilterAvail(checked);

    if (checked) {
      const update = filteredData.filter(
        (elem) => elem.available === true
      );
      setFilteredData(update);
    } else if (filterAcceptingInfants) {
      const update = filteredData.filter(
        (elem) => elem.infants === true
      );
      setFilteredData(update);
    } else {
      // not filtering anything so revert to original leader data
      setFilteredData(leaderData);
    }
  };

  const filterInfants = () => {
    const checked = !filterAcceptingInfants;
    setFilterInfants(checked);

    if (checked) {
      const update = filteredData.filter((elem) => elem.infants === true);
      setFilteredData(update);
    } else if (filterAvail) {
      const update = filteredData.filter((elem) => elem.available === true);
      setFilteredData(update);
    } else {
      // no filters so
      setFilteredData(leaderData);
    }
  };

  const handleZipFilter = () => {
    const update = filteredData.filter((elem) => elem.zipcode === Number(userZip));
    setFilteredData(update);
  };


  const filterZipcode = () => {
    const checked = !filterZip;
    setFilterZip(checked);

    if (checked) {
      if (userZip) {
        handleZipFilter();
      }
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
        isHome
        loggedInUser={loggedInUser}
        handleLogOut={handleLogOut}
        isLeader={isLeader}
        myMessages={myMessages && myMessages}
        userId={userId}
        emailVerified={emailVerified}
      />

      {/* Top Left Title if we're logged in*/}
      {loggedInUser
      && <div className="CursiveFont SuperFont TextLeft Buffer HideMobile">Preschool Patch</div>
      }

      {/* Initial Public display */}
      {!loggedInUser && (
        <>
          <div className="Flex AlignItems JustifyCenter Buffer ">

            <div className="HideMobile">
              <PatchLogo/></div>


          </div>


          <div className="Flex Col JustifyCenter Buffer MarginTopMobileHome">

            <div className="Tab SeeThru">


              <div>
                <img src={IvyHeart} alt="ivy" className="Padding MarginTopMobileHome" style={{ width: '30em' }}/>
              </div>


              {/* How it Works: Details */}
              <div className="Flex Col JustifyCenter AlignItems GreenFill TabBottom">

                <div className="Buffer Raleway MediumFont">
                  {"Preschool Patch offers a small group setting designed to elevate your child's education and social interactions in a warm, inviting, and safe space."}
                  <br />
                  <br />
            Max class size of 5 means that your child will not be just a
            number, but a nurtured student.
                </div>

                <button className="Margins TeacherButton TextCenter" type="button"onClick={() => history.push('/createAccount')}>
                          Do you want to be a Teacher?
                </button>

              </div>
            </div>

          </div>

          <div>
            <img src={Elegant} alt="decorative" className="responsive filter-green Margins" />
          </div>


        </>
      )}

      {/* Show loader if data is still coming in */}
      {loggedInUser ? (
        <>
          {loadingLeaders ? (
            <Loader />
          ) : (
            <div className="Flex Col JustifyCenter  SeeThru ">

              {/* If we're not a teacher, then show search options */}
              {!showTeacher ? (
                <>
                  <div className="CursiveFont SuperFont Buffer PinkFont ">
                Find a local preschool teacher!
                  </div>

                  {/* Filter data by zipcode */}
                  <div className="Flex JustifyCenter AlignItems MobileRowToCol">
                    <div className="Flex AlignItems MediumFont">
                Show only Teachers in your zipcode?
                      <EditField
                        isCheck
                        type="checkbox"
                        forLabel="Available"
                        onChange={(e) => filterZipcode(e)}
                        value={filterZip}
                      />
                    </div>
                    {filterZip
                && (
                  <div className="">
                    <div className="LargeFont PinkFont MarginTiny">{userZip}</div>
                    <input
                      placeholder="Enter your Zipcode"
                      style={{ width: 200 }}
                      className="InputStyle"
                      onChange={(e) => setUserZip(e.target.value)}
                      maxLength="5"
                    />
                    <button type="button" onClick={handleZipFilter}>Update</button>
                  </div>)
                    }
                  </div>

                  <div className="Flex JustifyCenter AlignItems Padding">
                    <div className="Flex AlignItems Padding">
                      <label className="MediumFont"> Show Only Available Teachers?</label>
                      <EditField
                        isCheck
                        type="checkbox"
                        forLabel="Available"
                        onChange={() => filterAvailable()}
                        value={filterAvail}
                      />
                    </div>
                    <div className="Flex AlignItems Padding">
                      <label className="MediumFont">Teachers Accepting Infants?</label>
                      <EditField
                        isCheck
                        type="checkbox"
                        forLabel="Available"
                        onChange={() => filterInfants()}
                        value={filterAcceptingInfants}
                      />
                    </div>

                  </div>
                </>
              ) : (
                <div className="CursiveFont SuperFont Buffer">
                Explore some example profiles of our most successful Patches!
                </div>
              )}
              {filteredData?.length > 0
            && <div className="MediumFont">{filteredData?.length} teachers found</div>}

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
                      <button onClick={() => history.push('/createAccount')}>Become a Patch Leader!</button>
                    </div>
                  </div>
                )}
              </div>


            </div>
          )}

        </>
      ) : (
        <>
          <div className="Flex JustifyCenter AlignItems Col">
            <h2>Please Login to view our database of Preschool Patch Teachers!</h2>
            <button className="ImageButton" type="button" onClick={() => history.push('/login')}>
              <img src={LoginPatch} alt="login to view teachers" style={{ width: 400, height: 'auto' }}/>
            </button>

          </div>

        </>
      )}


      <div>
        <img src={Elegant} alt="decorative" className="responsive filter-green Margins" />
      </div>

      <div className="CursiveFont RedicFont PinkFont" style={{ marginBottom: '1.3em' }}>Love Learning Early!</div>

      <Footer />

      <Toast showToast={launchToast.value} message={launchToast.message} />

    </div>
  );
};
export default withRouter(Home);
