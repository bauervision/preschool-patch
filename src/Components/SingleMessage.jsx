import React from 'react';
import moment from 'moment';

const SingleMessage = ({ data, userId }) => {
  const myMessage = data.author === userId;
  return (
    <div className={` ${myMessage ? 'TextRight' : 'TextLeft'} MarginTopSmall MarginHSmall`}>
      <div className="" style={{ fontSize: 14, color: 'grey', marginLeft: 10 }}>{moment(data.date).fromNow()}</div>
      <div className={`MessageBorder ${!myMessage ? 'MessageBubble TextLeft' : 'TextRight'}`}>
        <div style={{ fontSize: 20, padding: 8 }}>{data.message}</div>
      </div>
    </div>
  );
};
export default SingleMessage;
