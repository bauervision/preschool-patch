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

    const now = moment().toDate().getTime();
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
    const [submitEnrollment, setSubmitEnrollment] = useState()
    const [activeThreadId, setActiveThreadId] = useState(null); // messagesId
    const [activeThreadName, setActiveThreadName] = useState(null); // fromName or toName
    const [activeThread, setActiveThread] = useState([]); // messageData
    const [newMessage, setNewMessage] = useState('');
    const [sendToSelectedContact, setSendToSelectedContact] = useState(false);
    const [childrenWarning, setChildrenWarning] = useState(false);

    useEffect(() => {
        setSubmitEnrollment((loggedInUser.enrollment?.submitted) || false)
    }, [loggedInUser, submitEnrollment])

    // check to see if we are trying to connect with someone from their profile page
    useEffect(() => {
        setSendToSelectedContact(currentSelection !== null);
    }, [currentSelection])

    // set the active messages data
    useEffect(() => {

        // if we want to send a new message to a new contact
        if (sendToSelectedContact) {

            if (activeMessages) {

                // next check to see if that user has messages already
                const foundSelectionThreadId = activeMessages.findIndex((thread) => thread.messagesId === activeThreadId);
                if (foundSelectionThreadId !== -1) {
                    // we've found the current selection in activeMessages
                    setActiveThreadId(activeMessages[foundSelectionThreadId].messagesId);
                    setActiveThread(activeMessages[foundSelectionThreadId].messageData);
                    setActiveThreadName(activeMessages[foundSelectionThreadId].from === userId ? activeMessages[foundSelectionThreadId].toName : activeMessages[foundSelectionThreadId].fromName);
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
                    setActiveThread(activeThreadId)
                }

            } else {
                // nothing is selected so see if there are any unread messages
                const foundUnreadThreadId = activeMessages.findIndex((thread) => thread.lastMessage.author !== userId);
                if (foundUnreadThreadId !== -1) {
                    setActiveThreadId(activeMessages[foundUnreadThreadId].messagesId);
                    setActiveThread(activeMessages[foundUnreadThreadId].messageData);
                    setActiveThreadName(activeMessages[foundUnreadThreadId].from === userId ? activeMessages[foundUnreadThreadId].toName : activeMessages[foundUnreadThreadId].fromName);

                }
            }
        }

    }, [sendToSelectedContact, activeMessages, userId, activeThreadId, currentSelection, myMessages]);


    const handleNewMessage = () => {

        const newMessageData = {
            author: userId,
            message: newMessage,
            date: now,
        }

        // get and set current active message data
        // this is the message thread we are currently writing in

        let updatedThread = [];
        // if we have activeMessages, then we'll want to add new message to it
        if (activeThread) {
            updatedThread = [...activeThread];
        }

        updatedThread.push(newMessageData);

        // now we need to update the whole myMessages array with the new messageData
        // grab the current active thread
        let updatedCurrentThread = {};
        // this is used for sending to the DB only
        let sendToDBMessageId = '';

        /* Handle Updating DB with new message data */

        // messaging someone we've selected on from another page
        if (sendToSelectedContact) {

            // do we have prior messages?
            if (activeMessages) {
                const foundNewCntact = activeMessages.findIndex((elem) => ((elem.from === currentSelection.id) || (elem.to === currentSelection.id)));

                if (foundNewCntact === -1) { // not found! Then this is a true new contact
                    // we need a new message thread
                    updatedCurrentThread = defaultMessage;
                    sendToDBMessageId = UUID();
                    updatedCurrentThread.messagesId = sendToDBMessageId;

                    // add to the messages array
                    const updatedMessagesArray = loggedInUser.messages || [];
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
                    sendToDBMessageId = activeMessages[foundNewCntact].messagesId; //  just use the id we have
                }
            } else {
                // no prior messages, this is the very first contact
                // we need a new message thread
                updatedCurrentThread = defaultMessage;
                // and a fresh ID
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
        updatedCurrentThread.messageData = updatedThread;

        // setup lastMessage object
        updatedCurrentThread.lastMessage = { date: now, author: userId };

        // push to DB
        handleMessageUpdates(sendToDBMessageId, updatedCurrentThread);

        /* finally handle local state update of messages! */

        // do we already have activeMessages?
        if (activeMessages) {
            const updateAllMessages = [...activeMessages];
            const index = updateAllMessages.findIndex((elem) => elem.messagesId === sendToDBMessageId);
            if (index !== -1) {
                // fully update this thread with all original values, plus updated messageData and lastMessage
                const updatedThread = { ...updateAllMessages[index], messageData: updatedCurrentThread.messageData, lastMessage: updatedCurrentThread.lastMessage };
                // now update this particular thread within the entire messages array
                updateAllMessages[index] = updatedThread;
                setActiveMessages(updateAllMessages)
            }
        } else {
            // we don't because this is the very first message being sent
            setActiveMessages([updatedCurrentThread])
            setActiveThread(updatedCurrentThread.messageData);
            setActiveThreadId(updatedCurrentThread.messagesId)
        }

        setNewMessage('') // clear out the text box
    }

    const switchMessage = (newId, newName) => {
        setActiveThreadId(newId);
        setActiveThreadName(newName);
        // if we've clicked on a previous message, obv we no longer are sending to a new contact
        setSendToSelectedContact(false);
    }


    const handleSubmitEnrollment = () => {

        const stateEnrollment = submitEnrollment;
        // make sure user has children assigned first
        if (!loggedInUser.children) {
            setChildrenWarning(true)
        } else {
            setSubmitEnrollment(!submitEnrollment);
        }

        // now hit DB with updates
        const submittedToId = activeMessages[0].fromName === activeThreadName ? activeMessages[0].from : activeMessages[0].to;

        // first setup our enrollment status, if we're enrolling versus revoking
        const enrollment = !stateEnrollment ? {
            accepted: false,
            dateSubmitted: now,
            submitted: true,
            submittedTo: submittedToId,
            submittedToName: activeThreadName
        } : { submitted: false };

        database.ref(`users/${userId}/public/enrollment`).set(enrollment);

        // set our info into the teachers client data

        // first setup our enrollment status as long the user hasnt revoked it
        const clientData = {
            accepted: false,
            active: false,
            children: loggedInUser.children || [],
            dateSubmitted: now,
            clientId: userId,
            joinedOn: 'NA',
            submitted: true,
            name: loggedInUser.name,
            photoUrl: loggedInUser.photoUrl
        };

        let clientList = [];
        // grab teachers client list, so we can append of create it
        database.ref(`leaders/${submittedToId}/public/clients`).once('value', (snap) => {
            clientList = snap.val();
            // if we have a list, then we need to adjust it
            if (clientList) {
                // see if client list current has this client
                const index = clientList.findIndex((elem) => elem.name === loggedInUser.name);


                // we want to enroll
                if (!stateEnrollment) {
                    // we didnt find this client already
                    if (index === -1) {
                        clientList.push(clientData);
                    }
                } else {

                    // we want to revoke enrollment, make sure we've found this client
                    if (index !== -1) {
                        clientList.splice(index, 1);
                    }
                }

            } else {
                // otherwise, teacher has no clients yet, we need to set it as an array with its first element
                clientList = [clientData]
            }

            // finally push the new client to the teacher so they will know about it
            database.ref(`leaders/${submittedToId}/public/clients`).set(clientList);
        });


    }

    // handle conditional render
    const showingThread = sendToSelectedContact || (activeThread?.length > 0);
    const showEnrollmentButton = !isLeader && showingThread;

    const myTeacher = !isLeader && (loggedInUser.enrollment.accepted && (loggedInUser.enrollment.submittedToName === activeThreadName));

    const showEnrollmentDetails = (showEnrollmentButton && !loggedInUser.enrollment.accepted) && (myTeacher);
    const disableEnrollment = (showEnrollmentButton && submitEnrollment) && (!myTeacher);


    return (
        <div>
            <div>
                <Header pageUpdate={pageUpdate} loggedInUser={loggedInUser} isLeader={isLeader} isMessages />

                <div className="CursiveFont SuperFont TextLeft Buffer " style={{ marginLeft: 30 }}>Messenger</div>

                {/* Client Data*/}
                <div className="SeeThru" >

                    {/* Message Columns */}
                    <div className="Flex Between Buffer ">

                        {/*  Left side Message Notifcations */}
                        <div className="Padding CursiveFont LargeFont PinkFont" style={{ width: '30%' }}>

                            {activeMessages && (<div>All Messages </div>)}

                            <div className={`OverFlow ${activeMessages && 'LightPinkBorder'} `}>
                                {(activeMessages?.length > 0 ? (activeMessages.map((elem) => {

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
                                <div className="Flex AlignItems MessageClientHeader Padding">

                                    <div className="CursiveFont LargeFont WhiteFont" >My Clients</div>

                                    {/* Buttons to switch between clients */}
                                    <div className="Flex AlignItems JustifyCenter">
                                        {clientData?.map((client) => {

                                            const message = activeMessages.find((elem) => ((elem.to === client.clientId) || (elem.from === client.clientId)))

                                            return (
                                                <div
                                                    className={`SocialMessageBtn Flex AlignItems JustifyCenter ${client.clientId === activeThreadId ? 'SocialMessageBtn_Active' : 'SocialMessageBtn_UnActive'}`}
                                                    key={client.clientData.name}
                                                    type="button"
                                                    onClick={() => {
                                                        setActiveThreadId(message.messagesId);
                                                        setActiveThreadName(client.clientData.name)
                                                    }} >
                                                    <img style={{ width: 70, borderRadius: 50 }} src={client.clientData.photoUrl} alt='client pic' />
                                                </div>
                                            )
                                        })}
                                    </div>

                                </div>
                            )}

                            {/* Message Data */}
                            <div className="MessageFrame" >
                                {activeThread && (
                                    <div className="Flex AlignItems Between">

                                        <div className="Flex AlignItems">
                                            {/* Enrollment Button */}
                                            {(showingThread && showEnrollmentButton) &&
                                                <button
                                                    type="button" disabled={disableEnrollment}
                                                    title={`${submitEnrollment ?
                                                        'Revoking Enrollment will remove the request from this teacher' :
                                                        'Submitting Enrollment will notify the teacher that you have selected her!'}`}
                                                    onClick={handleSubmitEnrollment}>
                                                    {`${submitEnrollment ? 'Revoke Enrollment' : 'Submit For Enrollment'}`}
                                                </button>
                                            }

                                            <div className="CursiveFont LargeFont PinkFont Padding">{activeThreadName}</div>

                                        </div>

                                        {!isLeader && (
                                            <>
                                                {(!loggedInUser.enrollment.accepted && disableEnrollment) && (<div style={{ marginLeft: 20 }}>
                                                    <div>{`Enrollment has been submitted to ${loggedInUser.enrollment.submittedToName}`}</div>
                                                    <div>You can only enroll with one teacher at a time</div>
                                                </div>)}

                                                {myTeacher &&
                                                    <div className="Padding">
                                                        <div>You are actively enrolled with this teacher!</div>
                                                    </div>}
                                            </>
                                        )}



                                    </div>
                                )}


                                {/* Handle Warnings for Enrollment */}
                                {showEnrollmentDetails &&
                                    <div>She has been notified of your choice andy you will receive an email when she has accepted your enrollment</div>}


                                {childrenWarning && (<div className="PinkBorder">
                                    <div>You need to assign children in your profile first! </div>
                                    <div>Only add the children you want enrolled, then come back and submit enrollment</div>
                                </div>)}


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
                                    (<div>{!activeMessages ? (
                                        <div className="Flex Col JustifyCenter">
                                            <span className="Buffer"><strong >No conversations found.</strong></span>

                                            {isLeader ? (
                                                <>
                                                    <span>In order to generate interest, be sure that you update your profile page,</span>
                                                    <span>post pictures of your home, and of course set that you are Enrolling!</span>

                                                    <br />
                                                    <span>You should also share your profile page on different social media pages</span>
                                                </>
                                            ) : (
                                                    <span>Reach out to a local Patch Leader and setup a meet and greet!</span>
                                                )}


                                        </div>
                                    )
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
