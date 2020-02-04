import React, { useState, useEffect, useRef } from "react";
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


    // handle default threadId
    useEffect(() => {
        // if we have a currentSelection, then we're trying to send a new message
        if ((currentSelection && Object.entries(currentSelection).length > 0)) {
            // use default message
            setActiveThreadId(defaultMessage.messagesId)
        } else {
            // we arent selected on a new contact to message, so load up the first unread message
            const foundUnread = myMessages.findIndex((elem) => elem.lastMessage.author !== userId);
            if (foundUnread !== -1) {
                setActiveThreadId(myMessages[foundUnread].messagesId);
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

    // check to see if we are trying to connect with someone from their profile page
    useEffect(() => {
        setSendToNewContact(currentSelection && (Object.entries(currentSelection).length > 0));
    }, [currentSelection])




    // handle incoming myMessages and sort the data for the left column
    useEffect(() => {
        console.log("myMessages has updated")
        // sort by date, earliest at the top
        myMessages.sort((a, b) => moment(b.lastMessage.date).diff(a.lastMessage.date))
    }, [myMessages]);

    const prevMessages = useRef(myMessages);
    const prevThread = useRef(activeThreadId);

    // set the active messages data
    useEffect(() => {
        console.log(prevMessages, myMessages)
        if (prevThread.current !== activeThreadId) {
            // if we want to send a new message to a new contact
            if (sendToNewContact) {
                console.log("We've selected someone from profile page!")

                // next check to see if we're coming from profile page, and that user has messages
                const foundSelectionThreadId = myMessages.findIndex((thread) => (thread.from === currentSelection.id) || (thread.to === currentSelection.id));
                if (foundSelectionThreadId !== -1) {
                    // we've found the current selection in myMessages
                    setActiveThreadId(myMessages[foundSelectionThreadId].messagesId);
                    setActiveThread(myMessages[foundSelectionThreadId].messageData);
                    setActiveThreadName(myMessages[foundSelectionThreadId].from === userId ? myMessages[foundSelectionThreadId].toName : myMessages[foundSelectionThreadId].fromName);
                } else {
                    // we don't have any prior messages so this is a brand new contact
                    console.log("brand new contact")
                    setActiveThreadId(defaultMessage.messagesId);
                    setActiveThread(defaultMessage.messageData);
                    setActiveThreadName(defaultMessage.toName)
                }


            } else if (myMessages) {

                // load up whatever message thread we have selected first
                if (activeThreadId) {
                    const foundActiveThreadId = myMessages.findIndex((thread) => thread.messagesId === activeThreadId);
                    if (foundActiveThreadId !== -1) {
                        setActiveThreadId(myMessages[foundActiveThreadId].messagesId);
                        setActiveThread(myMessages[foundActiveThreadId].messageData);
                        setActiveThreadName(myMessages[foundActiveThreadId].from === userId ? myMessages[foundActiveThreadId].toName : myMessages[foundActiveThreadId].fromName);
                    } else {
                        // activeId wasn't found?  Really?
                    }

                } else {
                    // nothing is selected so handle default behavior

                    // first check to see if there are any unread messages
                    const foundUnreadThreadId = myMessages.findIndex((thread) => thread.lastMessage.author !== userId);
                    if (foundUnreadThreadId !== -1) {
                        setActiveThreadId(myMessages[foundUnreadThreadId].messagesId);
                        setActiveThread(myMessages[foundUnreadThreadId].messageData);
                        setActiveThreadName(myMessages[foundUnreadThreadId].from === userId ? myMessages[foundUnreadThreadId].toName : myMessages[foundUnreadThreadId].fromName);

                    } else {
                        // nothing unread, so display nothing
                    }
                }
            } else {
                // we don't have my Messages?
                console.log("myMessages is null?")
            }
            // prevMessages.current = myMessages;
        }
    }, [sendToNewContact, myMessages, userId, activeThreadId, currentSelection.id]);


    const handleNewMessage = () => {

        const newMessageData = {
            author: userId,
            message: newMessage,
            date: now,
        }

        // get and set current active message data
        // this is the message thread we are currently writing in
        const updatedMessages = [...activeThread];
        updatedMessages.push(newMessageData);

        // now we need to update the whole myMessages array with the new messageData
        // grab the current active thread
        let updatedCurrentThread = {};
        // this is used for sending to the DB only
        let sendToDBMessageId = '';

        if (sendToNewContact) {
            // is the currentSelection found within MyMessages?
            const foundNewCntact = myMessages.findIndex((elem) => (elem.from || elem.to) === currentSelection.id);
            if (foundNewCntact === -1) { // not found! Then this is a true new contact
                // we need a new message thread
                updatedCurrentThread = defaultMessage;
                sendToDBMessageId = UUID();
                updatedCurrentThread.messagesId = sendToDBMessageId;
                console.log("hitting DB as a new contact");

                // handle setting new message ids into users messages array
                if (!loggedInUser.messages) {
                    console.log("This is the users very first message")
                    // set this users messages array
                    database.ref(`users/${userId}/public/messages`).set([sendToDBMessageId]);

                } else {
                    console.log("This is not the users very first contact")
                    // add to the messages array
                    const updatedMessagesArray = loggedInUser.messages;
                    updatedMessagesArray.push(sendToDBMessageId);
                    database.ref(`users/${userId}/public/messages`).set(updatedMessagesArray);

                }

                // now check the receiptants array
                database.ref(`leaders/${updatedCurrentThread.to}/public/messages`).once('value', (snap) => {
                    const data = snap.val();
                    // if not null, then they already have messages, so append to them
                    if (data) {
                        console.log("not leaders' first message, so update their array", data);
                        const updatedMessagesArray = data;
                        updatedMessagesArray.push(sendToDBMessageId);
                        database.ref(`leaders/${updatedCurrentThread.to}/public/messages`).set(updatedMessagesArray);
                    } else {
                        // otherwise, this is the receipiants first message as well, so create the array
                        database.ref(`leaders/${updatedCurrentThread.to}/public/messages`).set([sendToDBMessageId]);
                    }
                });


            } else {
                // this is a contact we selected on from profile page and wanted to re-contact
                sendToDBMessageId = myMessages[foundNewCntact].messagesId; //  just use the id we have
            }

        } else if (myMessages.length > 0) {
            // messaging someone we've already connected with via messenger alone
            const found = myMessages.findIndex((elem) => (elem.messagesId === activeThreadId));
            updatedCurrentThread = myMessages[found] // since we have valid myMessages
            sendToDBMessageId = updatedCurrentThread.messagesId; // just use the id we have
        } else {
            // what are we doing here?
        }

        // update the messageData array
        updatedCurrentThread.messageData = updatedMessages;

        // setup lastMessage object
        updatedCurrentThread.lastMessage = {
            date: now,
            author: userId
        }

        // push to DB
        handleMessageUpdates(sendToDBMessageId, updatedCurrentThread);
        setNewMessage('') // clear out the text box
    }

    const switchMessage = (newId, newName) => {
        console.log("switch to messagesId", newId)
        setActiveThreadId(newId);
        setActiveThreadName(newName);
        // if we've clicked on a previous message, obv we no longer are sending to a new contact
        setSendToNewContact(false);
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
                                    const messageFromName = (elem.from === userId) ? elem.toName : elem.fromName;
                                    const messageFromUrl = (elem.from === userId) ? elem.toUrl : elem.fromUrl;

                                    return (
                                        <MessageNotification
                                            key={elem.messagesId}
                                            name={messageFromName}
                                            url={messageFromUrl}
                                            lastMessage={elem.lastMessage}
                                            activeId={elem.messagesId}
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
