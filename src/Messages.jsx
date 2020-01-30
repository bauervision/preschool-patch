import React, { useState, useEffect } from "react";

import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { SingleMessage, EditField, MessageNotification } from "./Components";

import { Logo, Elegant } from "./images";

import { database } from './config';
import moment from 'moment';

export const Messages = ({ pageUpdate, loggedInUser, clientData, myMessages, userId, isLeader, handleMessageUpdates }) => {

    const figureOutMessengerId = () => {
        // if the user is a leader, set first client as default message
        if (isLeader) {
            return (clientData[0] && clientData[0].clientData.id) || '';
        } else {
            // otherwise default to the first message in myMessages
            return (myMessages && myMessages[0].from) || '';
        }
    }

    const figureOutMessengerName = () => {
        // if the user is a leader, set first client as default message
        if (isLeader) {
            return (clientData[0] && clientData[0].clientData.name) || '';
        } else {
            // otherwise default to the first message in myMessages
            const name = myMessages[0].from === userId ? myMessages[0].toName : myMessages[0].fromName;
            return name || '';

        }
    }


    const [activeThreadId, setActiveThreadId] = useState(figureOutMessengerId());
    const [activeThreadName, setActiveThreadName] = useState(figureOutMessengerName());
    const [activeMessages, setActiveMessages] = useState([]);
    const [activeMessagesID, setActiveMessagesID] = useState('')
    const [newMessage, setNewMessage] = useState('');

    // handle incoming myMessages and sort the data for the left column
    useEffect(() => {
        // sort by date, earliest at the top
        myMessages.sort((a, b) => moment(b.lastMessage.date).diff(a.lastMessage.date))
    }, [myMessages]);

    // set the active messages data
    useEffect(() => {
        Object.entries(myMessages).find(([key, value]) => {
            if (value.from === activeThreadId) {
                setActiveMessagesID(value.messagesId);
                setActiveMessages(value.messageData);
            }
        })
    }, [activeThreadId, myMessages, userId]);


    const handleNewMessage = () => {

        const now = moment().format('MM/DD/YYYY');
        const messageData = {
            author: userId,
            message: newMessage,
            date: now,
        }

        // get and set current active message data
        // this is the message thread we are currently writing in
        const updatedMessages = [...activeMessages];
        // update the current last message to being read
        updatedMessages[updatedMessages.length - 1].unread = 0;

        console.log(updatedMessages[updatedMessages.length - 1])
        updatedMessages.push(messageData);
        setActiveMessages(updatedMessages)

        // now we need to update the whole myMessages array with the new messageData
        // grab the current active thread
        const updatedCurrentMessages = myMessages.find((elem) => elem.from === activeThreadId);

        // update the messageData array
        updatedCurrentMessages.messageData = updatedMessages;

        // setup lastMessage object
        updatedCurrentMessages.lastMessage = {
            date: now,
            author: userId
        }

        handleMessageUpdates(activeMessagesID, updatedCurrentMessages);

        setNewMessage('') // clear out the text box

    }


    const switchMessage = (newId, newName) => {
        setActiveThreadId(newId);
        setActiveThreadName(newName)
    }

    return (
        <div>
            <div>
                <Header pageUpdate={pageUpdate} isAdmin loggedInUser={loggedInUser} isLeader={true} isMessages />

                <div className="CursiveFont SuperFont TextLeft Buffer " style={{ marginLeft: 30 }}>Messenger</div>

                {/* Client Data*/}
                <div className="SeeThru PaddingBottom" >

                    {/* Message Columns */}
                    <div className="Flex Between Buffer ">

                        {/*  Left side Message Notifcations */}
                        <div className="Padding CursiveFont LargeFont PinkFont" style={{ width: '30%' }}>All Messages

                             <div className="OverFlow LightPinkBorder" >
                                {(myMessages.length > 0 ? (myMessages.map((elem) => {

                                    // if the last message isn't from us, then it's from them, so mark it unread
                                    const showAsUnread = elem.lastMessage.author !== userId;
                                    // we need to determine if this is our message thread, or someone elses
                                    // so if from is me...

                                    // display message with the 'To' data
                                    const messageFromId = (elem.from === userId) ? elem.to : elem.from;
                                    const messageFromName = (elem.from === userId) ? elem.toName : elem.fromName;
                                    const messageFromUrl = (elem.from === userId) ? elem.toUrl : elem.fromUrl;


                                    return (
                                        <MessageNotification
                                            key={messageFromId}
                                            name={messageFromName}
                                            url={messageFromUrl}
                                            lastMessage={elem.lastMessage}
                                            activeId={messageFromId}
                                            switchMessage={switchMessage}
                                            showAsUnread={showAsUnread}
                                        />
                                    )
                                }
                                )) : (
                                        <div>No Messages yet!</div>
                                    ))}
                            </div>


                        </div>


                        {/* Right Side Client Messages */}
                        <div className="Flex Col" style={{ width: '70%' }}>

                            {/* If we are a leader, show the buttons */}
                            {isLeader && (
                                <div className="Flex AlignItems GreenFill Padding">

                                    <div className="CursiveFont LargeFont" >Client Messages</div>

                                    {/* Buttons to switch between clients */}
                                    <div className="Flex AlignItems JustifyCenter">
                                        {clientData && clientData.map((client) => (
                                            <div
                                                className={`SocialMessageBtn Flex AlignItems JustifyCenter ${client.clientId === activeThreadId ? 'SocialMessageBtn_Active' : 'SocialMessageBtn_UnActive'}`}
                                                key={client.clientData.name}
                                                type="button"
                                                onClick={() => {
                                                    setActiveThreadId(client.clientId);
                                                    setActiveThreadName(client.clientData.name)
                                                }} >
                                                <img style={{ width: 70, borderRadius: 50 }} src={client.clientData.photoUrl} alt='client pic' />
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            )}



                            {/* Message Data */}
                            <div className="MarginTop PinkBorder" >
                                <div className="CursiveFont LargeFont PinkFont">{activeThreadName}</div>
                                {(activeMessages && activeMessages.length > 0 ?
                                    (activeMessages.map((elem, index) =>
                                        <SingleMessage
                                            key={index.toString()}
                                            data={elem}
                                            userId={userId} />))
                                    : (<div>No Messages yet!</div>)
                                )}


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
                                {/* </>
                                )} */}


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
