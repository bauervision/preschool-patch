import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';
import { SocialPost, NewPost } from './Components';

import { Logo, Elegant } from './images';


export const TeacherSocialPage = ({ pageUpdate, loggedInUser, isLeader, myMessages, userId, handlePostUpdates, loadingSocial, socialPosts }) => {
  const [updatedPosts, setUpdatedPosts] = useState(socialPosts);
  // grab the patch name of our patch based on if we're the leader or not
  const thisPatchName = !loggedInUser.isLeader ? loggedInUser.enrollment.patchName : loggedInUser.patchName;


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

  return (
    <div>
      <div>
        <Header pageUpdate={pageUpdate} isSocial loggedInUser={loggedInUser} isLeader={isLeader} myMessages={myMessages} userId={userId}/>

        {/* Top Left Title */}
        <div className="CursiveFont SuperFont TextLeft Buffer " style={{ marginLeft: 30 }}>Preschool Patch</div>

        {/* Page Data*/}
        <div className="Flex AlignItems SeeThru Evenly">

          {/* Page Title */}
          <div className="Flex Col JustifyCenter AlignItems">
            <div className="CursiveFont SuperFont PinkFont MarginBottom">{thisPatchName}</div>

            <div className="SimpleBorder MarginBottom" >

              {/* Handle new post functionality */}
              <NewPost loggedInUser={loggedInUser} userId={userId} handleNewPost={handleNewPost}/>

            </div>
            {/* Render out the posts in this account */}
            {updatedPosts?.length > 0 ? updatedPosts.map((post) => <SocialPost key={post.date} post={post} loggedInUser={loggedInUser}/>)
              : (<div className="Buffer PaddingBoost FullSize PinkBorder" style={{ padding: 60 }}>No Posts yet! Show something awesome about your preschool!!</div>)}

          </div>
        </div>

        <img src={Elegant} alt="decorative" className="filter-green Margins" />
      </div>
      <div className="Buffer">
        <img src={Logo} alt="logo" style={{ width: 600, height: 'auto' }} />
      </div>
      <Footer />
    </div>
  );
};
