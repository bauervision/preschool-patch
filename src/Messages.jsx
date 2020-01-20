import React, { useState, useEffect } from "react";

import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { SingleMessage, EditField, MessageNotification } from "./Components";

import { Logo, Elegant } from "./images";

import { database } from './config';

export const Messages = ({ pageUpdate, loggedInUser, clientData, myMessages, userId, isLeader }) => {
    const [activeClientId, setActiveClient] = useState((myMessages[0] && myMessages[0].from) || {}); // the first messager is default message
    const [activeClientName, setActiveClientName] = useState((clientData[0] && clientData[0].clientData.name) || '');
    const [activeMessages, setActiveMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        Object.entries(myMessages).find(([key, value]) => {

            if (value.from === activeClientId) {
                setActiveMessages(value.messageData);
            }
        })
    }, [activeClientId, myMessages]);


    const handleNewMessage = () => {

        const messageData = {
            author: userId,
            message: newMessage,
            date: '1/17/2020',
            liked: false,
            unread: false
        }

        const updatedMessages = [...activeMessages];

        updatedMessages.push(messageData);

        // database.ref(`messages/${messageId}`).set(updatedMessages)
        //     .then(() => {
        //         setNewMessage('')
        //     });
    }

    return (
        <div>
            <div>
                <Header pageUpdate={pageUpdate} isAdmin loggedInUser={loggedInUser} isLeader={true} isMessages />

                <div className="CursiveFont SuperFont TextLeft Buffer " style={{ marginLeft: 30 }}>Messenger</div>

                {/* Client Data*/}
                <div
                    className="SeeThru PaddingBottom"

                >
                    {/* My Messages */}
                    <div className="Buffer MarginTop">

                        <div className="CursiveFont SuperFont PinkFont">My Messages</div>

                        {/* Message Columns */}
                        <div className="Flex Between Buffer">
                            <div style={{ width: '30%' }}>All Messages
                            {(myMessages.length > 0 ? (myMessages.map((elem, index) => <MessageNotification key={elem.from} name={elem.fromName} url={elem.fromUrl} />)) : (
                                    <div>No Messages yet!</div>
                                ))}

                            </div>


                            <div style={{ width: '70%' }}>
                                {/* Buttons to switch between clients */}
                                <div className="Flex AlignItems JustifyCenter ">
                                    {clientData && clientData.map((client) => (
                                        <button
                                            key={client.clientData.name}
                                            type="button"
                                            onClick={() => {
                                                setActiveClient(client.clientId);
                                                setActiveClientName(client.clientData.name)
                                            }} >{client.clientData.name}</button>
                                    ))}
                                </div>

                                {/* Message Data */}
                                <div className="MarginTop SimpleBorder" >
                                    <div className="CursiveFont LargeFont PinkFont">{activeClientName}</div>
                                    {(activeMessages.length > 0 ? (activeMessages.map((elem, index) => <SingleMessage key={index.toString()} data={elem} userId={userId} />)) : (
                                        <div>No Messages yet!</div>
                                    ))}


                                    {activeMessages.length > 0 && (
                                        <>
                                            <EditField
                                                isTextArea
                                                isMessage
                                                small
                                                title=""
                                                placeholder="What would you like to say?"
                                                type="text"
                                                forLabel="NewMessage"
                                                onChange={setNewMessage}
                                                value={newMessage}
                                            />

                                            <button
                                                type="button"
                                                onClick={handleNewMessage} >Send
                                        </button>
                                        </>
                                    )}


                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                <img src={Elegant} alt="decorative" className="filter-green Margins" />

            </div>

            <div className="Buffer">
                <img src={Logo} alt="logo" style={{ width: 600, height: 'auto' }} />
            </div>

            <Footer />
        </div>
    );
};
