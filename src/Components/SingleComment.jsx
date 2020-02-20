import React from 'react';
import moment from 'moment';

const SingleComment = ({ data, userId }) => {
  return (
    <div className='TextLeft'>
      {/* Post Author and date */}
      <div className="Flex AlignItems">
        <div className="CursiveFont">Sally Silly</div>
        <div className="" style={{ fontSize: 14, color: 'grey', marginLeft: 10 }}>a few minutes ago</div>
      </div>
      <div className="MessageBorder">
        <div style={{ fontSize: 20, padding: 8 }}>Awe so cute!</div>
      </div>
    </div>
  );
};
export default SingleComment;
