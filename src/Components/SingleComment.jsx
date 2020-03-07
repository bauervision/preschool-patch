import React from 'react';
import moment from 'moment';

const SingleComment = ({ comment }) => (
  <div className="Flex FullSize SocialMessage MarginBottomSocial MobileRowToColumn">

    <div>
      <img alt="profile pic" className="ImgFrameCircle MarginHSmall" src={comment.author.photoUrl} />
      <div className="CursiveFont MobileFont">{comment.author.name.replace(/ .*/, '')}</div>
    </div>
    {/* Post Author and date */}
    <div className="Col">
      <div className="LightPinkFill PaddingHSmall MarginHSmall TextLeft RoundBorder MobileFont" >{comment.text}</div>
      <div className="MobileFontSmall">{moment(comment.date).fromNow()}</div>
    </div>

  </div>
);

export default SingleComment;
