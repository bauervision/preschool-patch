import React from "react";
import moment from "moment";

const SingleMessage = ({ data, userId }) => {

    const myMessage = data.author === userId;

    return (
        <div className={`Flex Col Buffer ${myMessage ? 'TextRight' : 'TextLeft'} `}>
            <div className="" style={{ fontSize: 14, color: 'grey', marginLeft: 10 }}>{moment(data.date).fromNow()}</div>
            <div className={`MessageBorder TextLeft ${!myMessage && 'MessageBubble'}`}>
                <div style={{ fontSize: 24, padding: 10 }}>{data.message}</div>
            </div>
        </div>
    )
}
export default SingleMessage;