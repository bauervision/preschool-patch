import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';
import { SocialPost, NewPost, Toast } from './Components';

import { Logo, Elegant, MiniFlower, MiniFlowerFlip } from './images';


export const TeacherSocialPage = ({ pageUpdate, loggedInUser, isLeader, myMessages, userId, handlePostUpdates, socialPosts, updateSuccess, launchToast }) => {
  const [updatedPosts, setUpdatedPosts] = useState(socialPosts);
  const [thisPatchName, setThisPatchName] = useState(null);


  // grab the patch name of our patch based on if we're the leader or not
  useEffect(() => {
    const patchName = loggedInUser?.isLeader ? loggedInUser.patchName : loggedInUser.enrollment.patchName;
    setThisPatchName(patchName);
  }, [loggedInUser]);

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
        <Header pageUpdate={pageUpdate} isSocial loggedInUser={loggedInUser} isLeader={isLeader} myMessages={myMessages} userId={userId}/>

        {/* Top Left Title */}
        <div className="CursiveFont SuperFont TextLeft Buffer " style={{ marginLeft: 30 }}>Preschool Patch</div>

        {/* Page Data*/}
        <div className="Flex AlignItems SeeThru Evenly TabSocial">

          {/* Page Title */}
          <div className="Flex Col JustifyCenter AlignItems">


            <div className="Flex AlignItems Buffer">
              <img src={MiniFlower} alt="flower left" style={{ height: 100, width: 'auto' }} />
              <div className="CursiveFont SuperFont PinkFont ">{thisPatchName}</div>
              <img src={MiniFlowerFlip} alt="flower right" style={{ height: 100, width: 'auto' }} />
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

        <img src={Elegant} alt="decorative" className="filter-green Margins" />
      </div>
      <div className="Buffer">
        <img src={Logo} alt="logo" style={{ width: 600, height: 'auto' }} />
      </div>
      <Footer />

      <Toast showToast={launchToast.value} message={launchToast.message} />
    </div>
  );
};
