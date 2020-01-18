import React from "react";

const SingleMessage = ({ data, userId }) => {

    const myMessage = data.author === userId;


    return (
        <div className={`Flex Col Buffer ${myMessage ? 'TextRight' : 'TextLeft'} `}>
            <div className="" style={{ fontSize: 14, color: 'grey', marginLeft: 10 }}>{data.date}</div>
            <div className="MessageBorder TextLeft">
                <div className={`${myMessage && 'PinkFont'}`}>{data.message}</div>
            </div>

            <div>{data.liked}</div>
            <div>{data.unread}</div>
        </div>
    )
}
export default SingleMessage;