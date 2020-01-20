import React from "react";

const MessageNotification = ({ name, url }) => (
    <div className="Flex SimpleBorder AlignItems Between NotifyBtn Margins">
        <img src={url} alt="profilePic" style={{ width: 80, height: 'auto', borderRadius: 40 }} />
        <div className="PinkFont CursiveFont" style={{ fontSize: 24 }}>{name}</div>

    </div>
);

export default MessageNotification;