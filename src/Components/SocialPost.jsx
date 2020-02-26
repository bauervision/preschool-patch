import React, { useState } from 'react';
import moment from 'moment';
import LightBox from './LightBox';

import SingleComment from './SingleComment';
import { Like } from '../images';


const SocialPost = ({ post, userId, loggedInUser }) => {
  const [like, setLike] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const { author: { photoUrl, name }, text, images, date } = post;


  // const myMessage = data.author === userId;

  return (
    <div className={'LightPinkBorder Padding FullSize MarginBottom SeeThru BoxShadow'} >
      {/* Post Author and date */}
      <div className="Flex AlignItems">
        <div className="CursiveFont PinkFont MediumFont">{name}</div>
        <div className="" style={{ fontSize: 14, color: 'grey', marginLeft: 10 }}>{moment(date).fromNow()}</div>
      </div>

      {/* Post Data */}
      <div className="Flex AlignItems Buffer  SocialMessage">
        {/* Author Pic */}
        <img alt="profile pic" className="ImgFrame" src={photoUrl} />
        {/* Post Message */}
        <div className="FullSize TextCenter" >
          {text}
        </div>
      </div>

      {/* Pictures if any */}
      <div className="margin-bottom">
        <LightBox
          images={images}
        />
      </div>

      {/* Like or Comment Area */}
      <div className="SimpleBorderSmall Flex AlignItems">
        <button className='SocialActionBtn Flex AlignItems' type="button" onClick={() => setLike(!like)}>
          <img className={`${like ? 'filter-pink' : 'filter-grey'}`} src={Like} alt="like button"/> Like
        </button>

        <button className='SocialActionBtn' type="button" onClick={() => setShowComments(!showComments)}>
          {`${showComments ? 'Hide Comments' : 'Comment'}`}
        </button>
      </div>

      {/* Comments if any, and if shown */}
      {showComments && (
        <SingleComment />
      )}


    </div>
  );
};
export default SocialPost;
