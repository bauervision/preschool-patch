import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
// import axios from 'axios';

import { database } from './config';
import ProfileCard from './ProfileCard';
import Header from './Components/Header';
import { Footer } from './Components/Footer';
import { Toast, Loader, EditField } from './Components';

import { Logo, Elegant, Corner, IvyHeart } from './images';


const PublicLanding = ({
  handleMemberSelection,
  handleLogOut,
  loggedInUser,
  launchToast,
  isLeader,
  myMessages,
  userId,
  history,
  redirect,
  emailVerified
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
    history.push(redirect.with);
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

            <img
              src={Logo}
              alt="logo"
              className="Logo HideMobile"

            />

            <div className="HowItWorks PinkFill RoundBorder MarginTopMobileHome Mobile3 Nunito" >
              {/* TODO all of this needs to be revamped */}
              <h3>How It Works</h3>


              <div className="Flex Row AlignItems JustifyCenter MarginBottom">
                {showTeacher ? (
                  <div className="Flex Row AlignItems MarginHSmall">
                    <div onClick={() => setShowTeacher(false)} className="cursor Hover WhiteBorder Padding RoundBorder"> As a Parent</div>
                    <div className="WhiteFill PinkFont MarginHSmall Padding RoundBorder"><strong>As a Teacher</strong></div>
                  </div>
                ) : (
                  <div className=" Flex Row AlignItems MarginHSmall">
                    <div className="WhiteFill PinkFont MarginHSmall Padding RoundBorder"><strong>As a Parent</strong></div>
                    <div onClick={() => { setShowTeacher(true); }} className="cursor Hover WhiteBorder Padding RoundBorder">As a Teacher</div>
                  </div>
                )}

                <img src={Corner} alt='corner' className='filter-white Rotate Flower' />
              </div>
            </div>
          </div>


          <div className="Flex Col JustifyCenter Buffer ">

            <div className="Tab SeeThru PaddingTop">

              {/* How it Works: Steps */}
              {showTeacher ? (
                <div className="Step Raleway">
                  <div className="Step_Child arrow_box">{'Sign-up as a Patch Leader'}</div>
                  <div className="Step_Child arrow_box" >{'Enroll students'}</div>
                  <div className="Step_Child arrow_box_end">{'Get paid!'}</div>

                </div>
              ) : (
                <div className="Step Raleway">

                  <div className="Step_Child arrow_box">{'Search Local Patches'}</div>
                  <div className="Step_Child arrow_box">{'Enroll your child'}</div>
                  <div className="Step_Child arrow_box_end">{'Relax!'} </div>

                </div>
              )}

              <div>
                <img src={IvyHeart} alt="ivy" className="Padding" style={{ width: '30em' }}/>
              </div>


              {/* How it Works: Details */}
              <div className="Flex JustifyCenter AlignItems GreenFill TabBottom">
                {showTeacher ? (
                  <div className="Flex Col JustifyCenter AlignItems Buffer">
                    <p className="Raleway">
            After you signup, your profile will be added to our database
            and will show up in local searches.
                      <br />
                      <br />
                    </p>
                    <div className="Flex Col AlignItems JustifyCenter">
                      <div className="CursiveFont LargeFont ">Keys to success: </div>
                      <ul className=" SimpleBorder TextLeft HalfSize">
                        <li>
                Convert a space in your home to a warm preschool
                environment, take pictures and upload them to your profile
                to impress prospective clients. This is the best thing you
                can do to create interest in your business!
                        </li>
                        {/* <li>
                Complete a simple background check. It costs $20 and
                offers some valuable peace of mind for parents.
                        </li> */}
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
                  <div className="Buffer Raleway MediumFont">
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
              <div className="Flex JustifyCenter AlignItems">
                <div className="Flex AlignItems">
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
                  <>
                    <div className="LargeFont PinkFont MarginTiny">{userZip}</div>
                    <input
                      placeholder="Enter your Zipcode"
                      style={{ width: 200 }}
                      className="InputStyle"
                      onChange={(e) => setUserZip(e.target.value)}
                      maxLength="5"
                    />
                    <button type="button" onClick={handleZipFilter}>Update</button>
                  </>)
                }
              </div>

              <div className="Flex JustifyCenter AlignItems Padding">
                <div className="Flex AlignItems Padding">
                  <label> Show Only Available Teachers?</label>
                  <EditField
                    isCheck
                    type="checkbox"
                    forLabel="Available"
                    onChange={() => filterAvailable()}
                    value={filterAvail}
                  />
                </div>
                <div className="Flex AlignItems Padding">
                  <label>Teachers Accepting Infants?</label>
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

      <div>
        <img src={Elegant} alt="decorative" className="responsive filter-green Margins" />
      </div>

      <div className="CursiveFont RedicFont PinkFont" style={{ marginBottom: '1.3em' }}>Love Learning Early!</div>

      <Footer />

      <Toast showToast={launchToast.value} message={launchToast.message} />

    </div>
  );
};
export default withRouter(PublicLanding);
