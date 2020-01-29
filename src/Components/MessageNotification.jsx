import React from "react";
import { Corner } from "../images";
const MessageNotification = ({ name, url, lastMessage, unread, activeId, switchMessage, showAsUnread }) => (
    <div className={`${showAsUnread ? 'NotifyBtn_Unread' : 'NotifyBtn'} `} onClick={() => switchMessage(activeId, name)}>

        <img src={url} alt="profilePic" />
        <div className='Col CursiveFont ' style={{ width: '80%', fontSize: 24 }}>{name}</div>
        <div className="Flex Col" >
            {showAsUnread ? (
                <div className="Flex Col JustifyCenter AlignItems">
                    <img src={Corner} alt='corner' className='filter-pink Rotate Alert' style={{ width: 50, height: 'auto', zIndex: 0, paddingRight: 10 }} />
                </div>
            ) : (
                    <div>
                        <p>Last Message</p>
                        <p>{lastMessage.date}</p>
                    </div>
                )}
        </div>

    </div >
);

export default MessageNotification;