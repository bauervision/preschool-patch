import React from "react";

const SingleMessage = ({ data }) => {

    return (
        <div className="Flex Col SimpleBorder Margins">
            <div className="PinkFont CursiveFont">{data.date}</div>
            <div>{data.message}</div>
            <div>{data.liked}</div>
            <div>{data.unread}</div>
        </div>
    )
}
export default SingleMessage;