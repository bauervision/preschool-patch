import React, { useState, useEffect } from "react";
import { default as UUID } from "uuid/v1";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { SingleMessage, EditField, MessageNotification } from "./Components";

import { Logo, Elegant } from "./images";

import moment from 'moment';
import { database } from "./config";

const defaultMessage = {
    from: null,
    fromName: null,
    fromUrl: null,
    lastMessage: {
        author: null,
        date: null
    },
    messageData: [],
    messagesId: null,
    to: null,
    toName: null,
    toUrl: null
};

export const Messages = ({ pageUpdate, loggedInUser, clientData, myMessages, userId, isLeader, handleMessageUpdates, currentSelection }) => {

    const now = moment().format('MM/DD/YYYY');
    // mount
    useEffect(() => {
        defaultMessage.from = userId;
        defaultMessage.fromName = loggedInUser.name;
        defaultMessage.fromUrl = loggedInUser.photoUrl;
        defaultMessage.lastMessage.author = userId;
        defaultMessage.lastMessage.date = now;
        defaultMessage.messageData = [{ author: userId, date: now, message: '' }];
        defaultMessage.messagesId = null;
        defaultMessage.to = currentSelection && currentSelection.id;
        defaultMessage.toName = currentSelection && currentSelection.name;
        defaultMessage.toUrl = currentSelection && currentSelection.photoUrl;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSelection]);

    const figureOutMessengerId = () => {
        // if the user is a leader, set first client as default message

        if (myMessages[0]) {

            return myMessages[0].from === userId ? myMessages[0].to : myMessages[0].from;
        }
        return 'unknown';

    }

    const figureOutMessengerName = () => {

        if (myMessages[0]) {
            return myMessages[0].from === userId ? myMessages[0].toName : myMessages[0].fromName;
        }
        return 'unknown';

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
        // if we have myMessages, display them
        if (myMessages) {
            // eslint-disable-next-line no-unused-vars
            Object.entries(myMessages).find(([key, value]) => {
                if (value.from === activeThreadId) {
                    setActiveMessagesID(value.messagesId);
                    setActiveMessages(value.messageData);

                }
                setActiveMessagesID(value.messagesId);
                setActiveMessages(value.messageData);
            })
        } else if (currentSelection) {
            setActiveMessagesID(currentSelection.id);
            setActiveMessages(defaultMessage.messageData);
        }

    }, [activeThreadId, currentSelection, myMessages, userId]);


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
        updatedMessages.push(messageData);
        setActiveMessages(updatedMessages)

        // now we need to update the whole myMessages array with the new messageData
        // grab the current active thread
        let updatedCurrentThread = {};
        let messageId = '';
        // we have current set of messages
        if (myMessages.length > 0) {
            updatedCurrentThread = myMessages.find((elem) => elem.from === activeThreadId);
            // since we have valid myMessages, just use the id we have
            messageId = activeMessagesID;

        } else if (Object.entries(currentSelection).length > 0) {
            // we need a new set
            updatedCurrentThread = defaultMessage;
            messageId = UUID();
            updatedCurrentThread.messagesId = messageId;
            // store this new uuid into this users messages array
            database.ref(`users/${userId}/public/messages`).set([messageId]);
            // and into the receiptants array so they will see it
            database.ref(`leaders/${updatedCurrentThread.to}/public/messages`).set([messageId]);
        }

        // update the messageData array
        updatedCurrentThread.messageData = updatedMessages;

        // setup lastMessage object
        updatedCurrentThread.lastMessage = {
            date: now,
            author: userId
        }

        handleMessageUpdates(messageId, updatedCurrentThread);

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

                                    <div className="CursiveFont LargeFont" >My Clients</div>

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

                                {((currentSelection && Object.entries(currentSelection).length > 0) || (activeMessages.length > 0)) ? (
                                    <>
                                        {/* Display all the messages if any */}
                                        {activeMessages.map((elem, index) =>

                                            <SingleMessage
                                                key={index.toString()}
                                                data={elem}
                                                userId={userId}
                                            />

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

                                    </>
                                ) :
                                    // No current selection, and no active messages
                                    (<div>{!myMessages ? 'Reach out to a Patch Teacher to start a conversation!'
                                        : 'Select a message to view it'}</div>)
                                }




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
