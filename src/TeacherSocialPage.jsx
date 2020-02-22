import React, { useState } from 'react';

import { Header } from './Components/Header';
import { Footer } from './Components/Footer';
import { SocialPost, NewPost } from './Components';

import { Logo, Elegant } from './images';
import { Coloring, Kids } from './images/photos';

const data = {
  posts: [
    {
      id: 'ABCD',
      postData: {
        text: '',
        images: [[{
          image: Coloring, caption: 'Kids Coloring' },
        { image: Kids, caption: 'Awe...kids' },
        { image: 'http://placeimg.com/640/360/people',
          caption: 'Cool person huh?'
        },
        ]],
        likes: [],
        comments: []
      } },
    {
      id: 'EFGH',
      postData: {
        text: '',
        images: [[
          { image: 'http://placeimg.com/640/360/nature',
            caption: 'Cool nature huh?'
          },
          { image: 'http://placeimg.com/640/360/arch',
            caption: 'Cool architecture huh?'
          },
          { image: 'https://placeimg.com/640/360/tech',
            caption: 'Cool tech for sure'
          },
          { image: 'https://placeimg.com/640/360/animals',
            caption: 'Awe....animal'
          }
        ]],
        likes: [],
        comments: []
      } }
  ],
};


export const TeacherSocialPage = ({ pageUpdate, loggedInUser, isLeader, myMessages, userId }) => {
  const [updatedPosts, setUpdatedPosts] = useState(data.posts);

  const { enrollment: { patchName } } = loggedInUser;

  const handleNewPost = (post) => {
    console.log(post);
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
            <div className="CursiveFont SuperFont PinkFont MarginBottom">{patchName}</div>

            {/* Handle new post functionality */}
            <NewPost photoUrl={loggedInUser.photoUrl} userId={userId} handleNewPost={handleNewPost}/>

            {/* Render out the posts in this account */}
            {updatedPosts.map((post) => <SocialPost key={post.id} post={post.postData} loggedInUser={loggedInUser}/>)}

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
