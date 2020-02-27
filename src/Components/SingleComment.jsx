import React from 'react';
import moment from 'moment';

const SingleComment = ({ comment }) => {
  return (
    <div className="Flex AlignStart FullSize SocialMessage MarginBottomSocial MaxSocial">
      <div>
        <img alt="profile pic" className="ImgFrameCircle MarginHSmall" src={comment.author.photoUrl} />
      </div>
      {/* Post Author and date */}
      <div className="Flex AlignItems">

        <div className="Col">
          <div className="CursiveFont">{comment.author.name}</div>
          <div className="" style={{ fontSize: 14, color: 'grey', marginLeft: 10 }}>{moment(comment.date).fromNow()}</div>
        </div>

        <div className='LightPinkFill PaddingHSmall MarginHSmall TextLeft' style={{ fontSize: 16, borderRadius: 20 }}>{comment.text}</div>

      </div>


    </div>
  );
};
export default SingleComment;
