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
    messageData: null,
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
        defaultMessage.messageData = [];
        defaultMessage.messagesId = UUID();
        defaultMessage.to = currentSelection && currentSelection.id;
        defaultMessage.toName = currentSelection && currentSelection.name;
        defaultMessage.toUrl = currentSelection && currentSelection.photoUrl;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSelection]);


    const [activeThreadId, setActiveThreadId] = useState(null); // messagesId
    const [activeThreadName, setActiveThreadName] = useState(null); // fromName or toName
    const [activeThread, setActiveThread] = useState([]); // messageData
    const [newMessage, setNewMessage] = useState('');
    const [sendToNewContact, setSendToNewContact] = useState(false);
    const [brandNewContact, setBrandNewContact] = useState(false);

    // handle default threadId
    useEffect(() => {
        // if we have a currentSelection, then we're trying to send a new message
        if ((currentSelection && Object.entries(currentSelection).length > 0)) {
            // use default message
            setActiveThreadId(defaultMessage.from)
        } else {
            // we arent selected on a new contact to message, so load up the first unread message
            const foundUnread = myMessages.findIndex((elem) => elem.lastMessage.author !== userId);
            if (foundUnread !== -1) {
                setActiveThreadId(myMessages[foundUnread].from);
            } else {
                // we didnt find an unread message, so load nothing and let the user select one
                setActiveThreadId(null);
            }

        }
    }, [currentSelection, myMessages, userId]);

    // handle default thread name
    useEffect(() => {
        if ((currentSelection && Object.entries(currentSelection).length > 0)) {
            setActiveThreadName(currentSelection.name);
        } else {
            // we arent selected on a new contact to message, so load up the first unread message
            const foundUnread = myMessages.findIndex((elem) => elem.lastMessage.author !== userId);
            if (foundUnread !== -1) {

                // if I started the thread, display who i sent it to, otherwise display who it came from
                const threadDisplayName = myMessages[foundUnread].from === userId ? myMessages[foundUnread].to : myMessages[foundUnread].from;
                setActiveThreadName(threadDisplayName);
            } else {
                // we didnt find an unread message, so load nothing and let the user select one
                setActiveThreadName(null);
            }
        }
    }, [currentSelection, myMessages, userId])


    useEffect(() => {
        setSendToNewContact(currentSelection && (Object.entries(currentSelection).length > 0));
    }, [currentSelection])


    // handle incoming myMessages and sort the data for the left column
    useEffect(() => {
        // sort by date, earliest at the top
        myMessages.sort((a, b) => moment(b.lastMessage.date).diff(a.lastMessage.date))
    }, [myMessages]);

    // set the active messages data
    useEffect(() => {
        // if we want to send a new message to a new contact
        if (sendToNewContact) {
            Object.entries(myMessages).find(([key, value]) => {
                const threadId = value.from === userId ? value.to : value.from;
                if (threadId === currentSelection.id) {
                    setActiveThreadId(value.from);
                    setActiveThread(value.messageData);
                    setActiveThreadName(value.from === userId ? value.toName : value.fromName)
                } else {
                    setBrandNewContact(true)
                    setActiveThreadId(defaultMessage.from);
                    setActiveThread(defaultMessage.messageData);
                    setActiveThreadName(defaultMessage.toName)
                }
            })


        } else if (myMessages) {
            // eslint-disable-next-line no-unused-vars
            Object.entries(myMessages).find(([key, value]) => {
                // check to see if thread was started by us
                const threadId = value.from === userId ? value.to : value.from;
                if (threadId === activeThreadId) {
                    setActiveThreadId(value.from);
                    setActiveThread(value.messageData);
                    setActiveThreadName(value.from === userId ? value.toName : value.fromName);
                } else {
                    // havent found activeThreadId, or not selected yet
                    // check to see if currentSelection is loaded
                    if (threadId === currentSelection && currentSelection.id) {
                        setActiveThreadId(value.from);
                        setActiveThread(value.messageData);
                        setActiveThreadName(value.from === userId ? value.toName : value.fromName);
                    }

                    if (value.lastMessage.author !== userId) {
                        setActiveThreadId(value.from);
                        setActiveThread(value.messageData);
                        setActiveThreadName(value.from === userId ? value.toName : value.fromName);
                    }

                }

            })
        }

    });


    const handleNewMessage = () => {

        const messageData = {
            author: userId,
            message: newMessage,
            date: now,
        }

        // get and set current active message data
        // this is the message thread we are currently writing in
        const updatedMessages = [...activeThread];

        updatedMessages.push(messageData);
        // setActiveThread(updatedMessages)

        // now we need to update the whole myMessages array with the new messageData
        // grab the current active thread
        let updatedCurrentThread = {};
        let messageId = UUID();


        if (sendToNewContact) {

            // is the currentSelection found wihtin MyMessages?
            const foundNewCntact = myMessages.findIndex((elem) => (elem.from || elem.to) === currentSelection.id);
            if (foundNewCntact === -1) { // not found! Then this is a true new contact
                // we need a new set
                updatedCurrentThread = defaultMessage;
                messageId = UUID();
                updatedCurrentThread.messagesId = messageId;
                console.log(loggedInUser);
                console.log("hitting DB as a new contact");
                // store this new uuid into this users messages array
                database.ref(`users/${userId}/public/messages`).set([messageId]);
                // and into the receiptants array so they will see it
                database.ref(`leaders/${updatedCurrentThread.to}/public/messages`).set([messageId]);

            } else {
                // this is a contact we selected on from profile page and wanted to re-contact
                console.log("Re-Contacting", updatedCurrentThread.toName)
            }

        } else if (myMessages.length > 0) {

            updatedCurrentThread = myMessages.find((elem) => ((elem.from === userId) ? (elem.from === activeThreadId) : (elem.to === activeThreadId)));
            // since we have valid myMessages, just use the id we have
            messageId = activeThreadId;
            console.log(updatedCurrentThread, myMessages, activeThreadId)
        }
        // update the messageData array
        updatedCurrentThread.messageData = updatedMessages;

        // setup lastMessage object
        updatedCurrentThread.lastMessage = {
            date: now,
            author: userId
        }

        // push to DB
        handleMessageUpdates(messageId, updatedCurrentThread);

        setNewMessage('') // clear out the text box
    }


    const switchMessage = (newId, newName) => {
        setActiveThreadId(newId);
        setActiveThreadName(newName);
        // if we've clicked on a previous message, obv we no longer are sending to a new contact
        setSendToNewContact(false);

    }

    console.log("activeThread", activeThread);

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

                                {(sendToNewContact || (activeThread && activeThread.length > 0)) ? (
                                    <>
                                        {/* Display all the messages if any */}
                                        {activeThread.map((elem, index) =>

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
