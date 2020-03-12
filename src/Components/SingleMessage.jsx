import React from 'react';
import moment from 'moment';

const SingleMessage = ({ data, userId, lastMessage, seen }) => {
  const myMessage = data.author === userId;
  // if the other person has marked the message as read, then display "seen"
  const isSeen = myMessage && lastMessage && seen;

  return (
    <div className={` ${myMessage ? 'TextRight' : 'TextLeft'} MarginTopSmall MarginHSmall`}>
      <div className="" style={{ fontSize: 10, color: 'grey', marginLeft: 10 }}>{moment(data.date).fromNow()}</div>
      <div className={`MessageBorder ${!myMessage ? 'MessageBubble TextLeft' : 'TextRight'}`}>
        <div className="MediumFont MobileMessagesPadding">{data.message}</div>
      </div>

      {(lastMessage && myMessage) && (
        <div className={`  ${isSeen ? 'PinkFont' : 'GreyFont'}`} >{isSeen ? 'Seen' : 'Sent'}</div>
      )}

    </div>
  );
};
export default SingleMessage;
