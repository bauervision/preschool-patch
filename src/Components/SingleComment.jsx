import React from 'react';
import moment from 'moment';

const SingleComment = ({ comment }) => {
  return (
    <div className="Flex AlignStart FullSize SocialMessage MarginBottomSocial ">
      <div>
        <img alt="profile pic" className="ImgFrameCircle MarginHSmall" src={comment.author.photoUrl} />
      </div>
      {/* Post Author and date */}
      <div className="Flex AlignItems">

        <div className="Col">
          <div className="CursiveFont">{comment.author.name}</div>

        </div>

        <div className="Col">

          <div
            className="LightPinkFill PaddingHSmall MarginHSmall TextLeft RoundBorder"
            style={{ fontSize: 16 }}
          >{comment.text}</div>

          <div style={{ fontSize: 14, color: 'grey' }}>{moment(comment.date).fromNow()}</div>
        </div>

      </div>


    </div>
  );
};
export default SingleComment;
