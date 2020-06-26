import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Header from './Components/Header';
import { Footer } from './Components/Footer';
import { SocialPost, NewPost, Toast, PatchLogo } from './Components';

import { Elegant, MiniFlower, MiniFlowerFlip } from './images';
import { database } from './config';


export const TeacherSocialPage = ({ emailVerified, pageUpdate, loggedInUser, isLeader, myMessages, userId, handlePostUpdates, socialPosts, updateSuccess, launchToast }) => {
  // const [userData, setUserData] = useState(null);
  const [updatedPosts, setUpdatedPosts] = useState(null);
  const [thisPatchName, setThisPatchName] = useState(null);


  // grab the patch name of our patch based on if we're the leader or not
  useEffect(() => {
    // brand new users will have their public data still attached for whatever reason
    // TODO: figure out and remove the reason
    console.log(loggedInUser);

    const patchName = loggedInUser?.isLeader ? loggedInUser?.patchName : loggedInUser?.enrollment.patchName;

    setThisPatchName(patchName);

    const patchId = loggedInUser?.isLeader ? loggedInUser?.id : loggedInUser?.enrollment.submittedTo;

    // if we dont have posts to view
    if (!updatedPosts) {
      // then we also wont have a logged in user
      const pathId = window.location.pathname.split('/');
      // grab ref to the data
      database.ref(`social/${loggedInUser ? patchId : pathId[2]}`).on('value', (snapshot) => {
        if (snapshot.val()) {
        // grab the data
          const data = snapshot.val();
          setUpdatedPosts(data);
        }
      });
    }
  }, [loggedInUser, updatedPosts]);

  /* Handle local state post updating  */
  useEffect(() => {
    // if incoming social posts have changed, re-set state
    if (socialPosts?.length > 0) { socialPosts.sort((a, b) => moment(b.date).diff(a.date)); }
    setUpdatedPosts(socialPosts);
  }, [socialPosts]);

  const handleNewPost = (post) => {
    // if we have posts already update them otherwise start a new array
    const update = updatedPosts?.length > 0 ? [...updatedPosts, post] : [post];
    // push to parent
    handlePostUpdates(update);
  };

  const handleSocialPostUpdating = (updatedPost, deleted, index) => {
    const update = [...updatedPosts];
    if (deleted) {
      // we want to delete a comment entirely
      update.splice(index, 1);
      updateSuccess(true, 'Post Successfully Removed!');
    } else {
      // we're just updating the post
      update[index] = updatedPost;
    }
    setUpdatedPosts(update);
    // now push to DB
    handlePostUpdates(update);
  };

  return (
    <div>
      <div>
        <Header pageUpdate={pageUpdate} isSocial loggedInUser={loggedInUser} isLeader={isLeader} myMessages={myMessages} userId={userId} emailVerified={emailVerified}/>

        {/* Top Left Title */}
        <div className="CursiveFont SuperFont TextLeft Buffer HideMobile" style={{ marginLeft: 30 }}>Preschool Patch</div>

        {/* Page Data*/}
        <div className="Flex AlignItems SeeThru Evenly TabSocial">

          {/* Page Title */}
          <div className="Flex Col JustifyCenter AlignItems FullSize">


            <div className="Flex AlignItems Buffer MarginTopMobileHome">
              <img src={MiniFlower} alt="flower left" style={{ height: 100, width: 'auto' }} className="HideMobile"/>
              <div className="CursiveFont SuperFont PinkFont">{thisPatchName}</div>
              <img src={MiniFlowerFlip} alt="flower right" style={{ height: 100, width: 'auto' }} className="HideMobile"/>
            </div>


            <div className="SimpleBorder MarginBottom" >

              {/* Handle new post functionality */}
              <NewPost loggedInUser={loggedInUser} userId={userId} handleNewPost={handleNewPost}/>

            </div>
            {/* Render out the posts in this account */}
            {updatedPosts?.length > 0 ? updatedPosts.map((post, index) => <SocialPost
              key={post.date}
              index={index}
              post={post}
              loggedInUser={loggedInUser}
              userId={userId}
              updatePost={handleSocialPostUpdating}
            />)
              : (<div className="Buffer PaddingBoost FullSize PinkBorder" style={{ padding: 60 }}>No Posts yet! Show something awesome about your preschool!!</div>)}

          </div>
        </div>

        <img src={Elegant} alt="decorative" className="filter-green Margins responsive" />
      </div>
      <PatchLogo />
      <Footer />

      <Toast showToast={launchToast.value} message={launchToast.message} />
    </div>
  );
};
