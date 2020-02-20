import React, { useState, Children } from 'react';
import ImageGallery from 'react-image-gallery';
import moment from 'moment';

import SingleComment from './SingleComment';
import { Like } from '../images';
import { Coloring, Kids } from '../images/photos';

const SocialPost = ({ data, userId, loggedInUser }) => {
  const [like, setLike] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const { photoUrl, name } = loggedInUser;
  // const myMessage = data.author === userId;

  // const time = moment(data.date).fromNow();
  return (
    <div className={'LightPinkBorder PaddingLite ThreeQuarters MarginBottom'} >
      {/* Post Author and date */}
      <div className="Flex AlignItems">
        <div className="CursiveFont PinkFont MediumFont">{name}</div>
        <div className="" style={{ fontSize: 14, color: 'grey', marginLeft: 10 }}>a few minutes ago</div>
      </div>

      {/* Post Data */}
      <div className="Flex AlignItems Buffer">
        {/* Author Pic */}
        <img alt="profile pic" className="ImgFrame" src={photoUrl} />
        {/* Post Message */}
        <div style={{ fontSize: 20, padding: 8 }}>
            Updated pics from today! The kids are having a brilliant time at Preschool Patch! Now, onto lunch, rest time and more games!
        </div>
      </div>

      {/* Pictures if any */}
      <div className="Flex JustifyCenter AlignItems">
        <ImageGallery
          items={[{ original: Coloring }, { original: Kids }]}
          showThumbnails={false}
          showPlayButton={false}


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
