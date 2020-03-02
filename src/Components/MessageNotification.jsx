import React from 'react';
import moment from 'moment';
import { Corner, Submitted, Enrolled } from '../images';

const MessageNotification = ({ name, url, lastMessage, activeId, switchMessage, showAsUnread, submitted, accepted }) => (

  <div className={`${showAsUnread ? 'NotifyBtn_Unread' : 'NotifyBtn'} `} onClick={() => switchMessage(activeId, name)}>
    <img src={url} alt="profilePic" />
    {/* Handle Enrollment Icons */}
    {submitted && <img className='filter-pink Alert' src={Submitted} alt="enrollment icon" style={{ width: 40, paddingLeft: 10 }}/>}
    {accepted && <img className='filter-pink Alert' src={Enrolled} alt="enrollment icon" style={{ width: 40, paddingLeft: 10 }}/>}
    <div className="Flex Col" style={{ width: '80%' }}>
      <div className='Col CursiveFont ' style={{ fontSize: 24 }}>{name}</div>
      <p>{moment(lastMessage.date).fromNow()}</p>
    </div>

    <div className="Flex Col" >
      {showAsUnread && (
        <div className="Flex Col JustifyCenter AlignItems">
          <img src={Corner} alt='corner' className='filter-pink Rotate Alert' style={{ width: 50, height: 'auto', zIndex: 0, paddingRight: 10 }} />
        </div>
      )}
    </div>

  </div >
);

export default MessageNotification;
