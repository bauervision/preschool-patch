import React from 'react';
import moment from 'moment';

const SingleMessage = ({ data, userId, lastMessage }) => {
  const myMessage = data.author === userId;
  // if the other person has marked the message as read, then display "seen"
  const seen = (myMessage && lastMessage) && (data.seen !== userId);

  return (
    <div className={` ${myMessage ? 'TextRight' : 'TextLeft'} MarginTopSmall MarginHSmall`}>
      <div className="" style={{ fontSize: 14, color: 'grey', marginLeft: 10 }}>{moment(data.date).fromNow()}</div>
      <div className={`MessageBorder ${!myMessage ? 'MessageBubble TextLeft' : 'TextRight'}`}>
        <div style={{ fontSize: 20, padding: 8 }}>{data.message}</div>
      </div>
      {seen && <div className="PinkFont" style={{ fontSize: 12, padding: 5 }}>Seen</div>}
    </div>
  );
};
export default SingleMessage;
