import React from 'react';
import moment from 'moment';
import { Corner, Submitted, Enrolled } from '../images';

const MessageNotification = ({ name, url, lastMessage, activeId, switchMessage, showAsUnread, submitted, accepted }) => (

  <>
    {/* Desktop Version */}
    <div className="HideMobile">
      <div className={`${showAsUnread ? 'NotifyBtn_Unread' : 'NotifyBtn'} `} onClick={() => switchMessage(activeId, name)}>
        <img src={url} alt="profilePic" />
        {/* Handle Enrollment Icons */}

        {submitted && <img className='filter-pink Alert' src={Submitted} alt="enrollment icon" style={{ width: 40, paddingLeft: 10 }}/>}
        {accepted && <img className='filter-pink Alert' src={Enrolled} alt="enrollment icon" style={{ width: 40, paddingLeft: 10 }}/>}
        <div className="Flex Col" style={{ width: '80%' }}>
          <div className='Col CursiveFont ' style={{ fontSize: 24 }}>{name}</div>
          <div>{moment(lastMessage.date).fromNow()}</div>
        </div>

        <div className="Flex Col" >
          {showAsUnread && (
            <div className="Flex Col JustifyCenter AlignItems">
              <img src={Corner} alt='corner' className='filter-pink Rotate Alert' style={{ width: 50, height: 'auto', zIndex: 0, paddingRight: 10 }} />
            </div>
          )}
        </div>
      </div >
    </div>

    {/* Mobile Version */}
    <div className="ShowMobile">
      <div className={` ${showAsUnread ? 'NotifyBtn_Unread' : 'NotifyBtn'} `} onClick={() => switchMessage(activeId, name, true)}>
        <img src={url} alt="profilePic" className="responsive"/>
        {/* Handle Enrollment Icons */}

        {submitted && <img className='filter-pink Alert' src={Submitted} alt="enrollment icon" style={{ width: 40, paddingLeft: 10 }}/>}
        {accepted && <img className='filter-pink Alert' src={Enrolled} alt="enrollment icon" style={{ width: 40, paddingLeft: 10 }}/>}
        <div className="Flex Col">
          <div className='Col CursiveFont '>{name}</div>
          <div className="Raleway" style={{ fontSize: 10 }}>{moment(lastMessage.date).fromNow()}</div>
        </div>

        <div className="Flex Col" >
          {showAsUnread && (
            <div className="Flex Col JustifyCenter AlignItems">
              <img src={Corner} alt='corner' className='filter-pink Rotate Alert' style={{ width: 20, height: 'auto', zIndex: 0, paddingRight: 10 }} />
            </div>
          )}
        </div>
      </div >
    </div>
  </>
);

export default MessageNotification;
