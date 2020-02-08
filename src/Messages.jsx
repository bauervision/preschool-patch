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
    // mount setup default message
    useEffect(() => {
        defaultMessage.from = userId;
        defaultMessage.fromName = loggedInUser.name;
        defaultMessage.fromUrl = loggedInUser.photoUrl;
        defaultMessage.lastMessage.author = userId;
        defaultMessage.lastMessage.date = now;
        defaultMessage.messageData = [];
        defaultMessage.messagesId = 'default';
        defaultMessage.to = currentSelection && currentSelection.id;
        defaultMessage.toName = currentSelection && currentSelection.name;
        defaultMessage.toUrl = currentSelection && currentSelection.photoUrl;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSelection]);

    const [activeMessages, setActiveMessages] = useState(myMessages); // messagesId
    const [submitEnrollment, setSubmitEnrollment] = useState(loggedInUser.enrollment.submitted || false)
    const [activeThreadId, setActiveThreadId] = useState(null); // messagesId
    const [activeThreadName, setActiveThreadName] = useState(null); // fromName or toName
    const [activeThread, setActiveThread] = useState([]); // messageData
    const [newMessage, setNewMessage] = useState('');
    const [sendToNewContact, setSendToNewContact] = useState(false);


    // handle default threadId
    useEffect(() => {
        // if we have a currentSelection, then we came from Profile page
        if (sendToNewContact) {
            // use default message if we have no prior messages
            if (!activeMessages) {
                setActiveThreadId(defaultMessage.messagesId)
            } else {
                // otherwise, we do have prior messages so check to see if we have already messaged our selection
                const foundUnread = activeMessages.findIndex((elem) => ((elem.to === currentSelection.id) || (elem.from === currentSelection.id)));
                if (foundUnread !== -1) {
                    setActiveThreadId(activeMessages[foundUnread].messagesId);
                } else {
                    // we didnt find an unread message, so load nothing and let the user select one
                    setActiveThreadId(null);
                }

            }


        } else {
            // we arent selected on a new contact to message, so load up the first unread message
            if (activeMessages) {
                const foundUnread = activeMessages.findIndex((elem) => elem.lastMessage.author !== userId);
                if (foundUnread !== -1) {
                    setActiveThreadId(activeMessages[foundUnread].messagesId);
                } else {
                    // we didnt find an unread message, so load nothing and let the user select one
                    setActiveThreadId(null);
                }
            }


        }
    }, [sendToNewContact, activeMessages, userId, activeThreadId, currentSelection]);

    // handle default thread name
    useEffect(() => {
        if (sendToNewContact) {
            setActiveThreadName(currentSelection.name);
        } else {
            // we arent selected on a new contact to message, so load up the first unread message
            if (activeMessages) {
                const foundUnread = activeMessages.findIndex((elem) => elem.lastMessage.author !== userId);
                if (foundUnread !== -1) {
                    // if I started the thread, display who i sent it to, otherwise display who it came from
                    const threadDisplayName = activeMessages[foundUnread].from === userId ? activeMessages[foundUnread].to : activeMessages[foundUnread].from;
                    setActiveThreadName(threadDisplayName);
                } else {
                    // we didnt find an unread message, so load nothing and let the user select one
                    setActiveThreadName(null);
                }
            }
        }
    }, [currentSelection, activeMessages, sendToNewContact, userId])

    // check to see if we are trying to connect with someone from their profile page
    useEffect(() => {
        setSendToNewContact(currentSelection && currentSelection.id !== 'none');
    }, [currentSelection])

    // set the active messages data
    useEffect(() => {
        // if we want to send a new message to a new contact
        if (sendToNewContact) {

            if (activeMessages) {
                // next check to see if that user has messages already
                const foundSelectionThreadId = activeMessages.findIndex((thread) => (thread.from === currentSelection.id) || (thread.to === currentSelection.id));
                if (foundSelectionThreadId !== -1) {
                    // we've found the current selection in activeMessages
                    setActiveThreadId(activeMessages[foundSelectionThreadId].messagesId);
                    setActiveThread(activeMessages[foundSelectionThreadId].messageData);
                    setActiveThreadName(activeMessages[foundSelectionThreadId].from === userId ? activeMessages[foundSelectionThreadId].toName : activeMessages[foundSelectionThreadId].fromName);
                } else {
                    // we don't have any prior messages so this is a brand new contact
                    setActiveThreadId(defaultMessage.messagesId);
                    setActiveThread(defaultMessage.messageData);
                    setActiveThreadName(defaultMessage.toName)
                }
            } else {
                // we don't have any prior messages so this is a brand new contact
                setActiveThreadId(defaultMessage.messagesId);
                setActiveThread(defaultMessage.messageData);
                setActiveThreadName(defaultMessage.toName)
            }


        } else if (activeMessages) {

            // load up whatever message thread we have selected first
            if (activeThreadId) {
                const foundActiveThreadId = activeMessages.findIndex((thread) => thread.messagesId === activeThreadId);
                if (foundActiveThreadId !== -1) {
                    setActiveThreadId(activeMessages[foundActiveThreadId].messagesId);
                    setActiveThread(activeMessages[foundActiveThreadId].messageData);
                    setActiveThreadName(activeMessages[foundActiveThreadId].from === userId ? activeMessages[foundActiveThreadId].toName : activeMessages[foundActiveThreadId].fromName);
                } else {
                    // activeId wasn't found?  Really?
                }

            } else {
                // nothing is selected so handle default behavior

                // first check to see if there are any unread messages
                const foundUnreadThreadId = activeMessages.findIndex((thread) => thread.lastMessage.author !== userId);
                if (foundUnreadThreadId !== -1) {
                    setActiveThreadId(activeMessages[foundUnreadThreadId].messagesId);
                    setActiveThread(activeMessages[foundUnreadThreadId].messageData);
                    setActiveThreadName(activeMessages[foundUnreadThreadId].from === userId ? activeMessages[foundUnreadThreadId].toName : activeMessages[foundUnreadThreadId].fromName);

                } else {
                    // nothing unread, so display nothing
                }
            }
        }

    }, [sendToNewContact, activeMessages, userId, activeThreadId, currentSelection]);


    const handleNewMessage = () => {

        const newMessageData = {
            author: userId,
            message: newMessage,
            date: now,
        }

        // get and set current active message data
        // this is the message thread we are currently writing in

        let updatedMessages = [];
        // if we have activeMessages, then we'll want to add new message to it
        if (activeThread) {
            updatedMessages = [...activeThread];
        }

        updatedMessages.push(newMessageData);

        // now we need to update the whole myMessages array with the new messageData
        // grab the current active thread
        let updatedCurrentThread = {};
        // this is used for sending to the DB only
        let sendToDBMessageId = '';

        if (sendToNewContact) {

            // do we have prior messages?
            if (activeMessages) {
                const foundNewCntact = activeMessages.findIndex((elem) => (elem.from || elem.to) === currentSelection.id);
                if (foundNewCntact === -1) { // not found! Then this is a true new contact
                    // we need a new message thread
                    updatedCurrentThread = defaultMessage;
                    sendToDBMessageId = UUID();
                    updatedCurrentThread.messagesId = sendToDBMessageId;

                    // add to the messages array
                    const updatedMessagesArray = loggedInUser.messages;
                    updatedMessagesArray.push(sendToDBMessageId);
                    database.ref(`users/${userId}/public/messages`).set(updatedMessagesArray);

                    // now check the receiptants array
                    database.ref(`leaders/${updatedCurrentThread.to}/public/messages`).once('value', (snap) => {
                        const data = snap.val();
                        // if not null, then they already have messages, so append to them
                        if (data) {
                            const updatedMessagesArray = data;
                            updatedMessagesArray.push(sendToDBMessageId);
                            database.ref(`leaders/${updatedCurrentThread.to}/public/messages`).set(updatedMessagesArray);
                        } else {
                            // otherwise, this is the receipiants first message as well, so create the array
                            database.ref(`leaders/${updatedCurrentThread.to}/public/messages`).set([sendToDBMessageId]);
                        }
                    });


                } else {
                    // found in activeMessages: this is a contact we selected on from profile page and wanted to re-contact
                    sendToDBMessageId = activeMessages && activeMessages[foundNewCntact].messagesId; //  just use the id we have
                }
            } else {
                // no prior messages, this is the very first contact
                // we need a new message thread
                updatedCurrentThread = defaultMessage;
                sendToDBMessageId = UUID();
                updatedCurrentThread.messagesId = sendToDBMessageId;

                // handle setting new message array for future contacts
                database.ref(`users/${userId}/public/messages`).set([sendToDBMessageId]);


                // now check the receiptants array
                database.ref(`leaders/${updatedCurrentThread.to}/public/messages`).once('value', (snap) => {
                    const data = snap.val();
                    // if not null, then they already have messages, so append to them
                    if (data) {
                        const updatedMessagesArray = data;
                        updatedMessagesArray.push(sendToDBMessageId);
                        database.ref(`leaders/${updatedCurrentThread.to}/public/messages`).set(updatedMessagesArray);
                    } else {
                        // otherwise, this is the receipiants first message as well, so create the array
                        database.ref(`leaders/${updatedCurrentThread.to}/public/messages`).set([sendToDBMessageId]);
                    }
                });

            }


        } else if (activeMessages.length > 0) {
            // messaging someone we've already connected with via messenger alone
            const found = activeMessages.findIndex((elem) => (elem.messagesId === activeThreadId));
            updatedCurrentThread = activeMessages[found] // since we have valid myMessages
            sendToDBMessageId = updatedCurrentThread.messagesId; // just use the id we have
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
        // since we've sent a message, this thread is no longer a new contact
        setSendToNewContact(false);
        setNewMessage('') // clear out the text box

        // finally handle local state update of messages!


        const updateAllMessages = myMessages && [...myMessages];

        const index = updateAllMessages && updateAllMessages.findIndex((elem) => elem.messagesId === sendToDBMessageId);

        if (index !== -1) {
            updateAllMessages[index] = updatedCurrentThread;
            setActiveMessages(updateAllMessages)
        }


    }

    const switchMessage = (newId, newName) => {
        setActiveThreadId(newId);
        setActiveThreadName(newName);
        // if we've clicked on a previous message, obv we no longer are sending to a new contact
        setSendToNewContact(false);
    }


    const handleSubmitEnrollment = () => {
        setSubmitEnrollment(!submitEnrollment);

        // now hit DB with updates

        const submittedToId = activeMessages[0].fromName === activeThreadName ? activeMessages[0].from : activeMessages[0].to;

        // first setup our enrollment status
        const enrollment = {
            accepted: false,
            dateSubmitted: now,
            submitted: true,
            submittedTo: submittedToId,
            submittedToName: activeThreadName
        }
        // database.ref(`users/${userId}/public/enrollment`).set(enrollment);

        // set our info into the teachers client data

        // first setup our enrollment status
        const clientData = {
            accepted: false,
            active: false,
            children: [{}], // TODO map all of the children this user has set in their profile
            dateSubmitted: now,
            clientId: userId,
            joinedOn: 'NA',
            submitted: true,
            name: loggedInUser.name,
            photoUrl: loggedInUser.photoUrl
        }

        let clientList = [];
        // grab teachers client list, so we can append of create it
        // database.ref(`leaders/${currentSelection.id}/public/clients`).once('value', (snap) => {
        //     clientList = snap.val();
        // });

        // if we have a list, then we need to append to it
        if (clientList) {
            clientList.push(clientData);
        } else {
            // otherwise, we need to set it as an array with its first element
            clientList = [clientData]
        }

        console.log(enrollment, clientList)
    }

    // handle conditional render
    const showingThread = (sendToNewContact || (activeThread && activeThread.length > 0));
    const showEnrollmentButton = showingThread && !loggedInUser.enrollment.submitted;

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
                                {(myMessages && myMessages.length > 0 ? (myMessages.map((elem) => {

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
                                <div className="Flex AlignItems">
                                    {(showingThread && showEnrollmentButton) &&
                                        <button
                                            type="button"
                                            title={`${submitEnrollment ?
                                                'Revoking Enrollment will remove the request from this teacher' :
                                                'Submitting Enrollment will notify the teacher that you have selected her!'}`}
                                            onClick={handleSubmitEnrollment}>
                                            {`${submitEnrollment ? 'Revoke Enrollment' : 'Submit For Enrollment'}`}
                                        </button>
                                    }

                                    <div className="CursiveFont LargeFont PinkFont">{activeThreadName}</div>
                                </div>
                                {submitEnrollment && (<div> You will receive an email when she has accepted your enrollment </div>)}

                                {showingThread ? (
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
