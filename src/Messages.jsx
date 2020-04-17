import React, { useState, useEffect, useRef } from 'react';
import { default as UUID } from 'uuid/v1';
import moment from 'moment';
import Header from './Components/Header';
import { SingleMessage, MessageNotification } from './Components';

import { Send, Return } from './images';

import { database } from './config';

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

export const Messages = ({ emailVerified, pageUpdate, loggedInUser, clientData, myMessages, userId, isLeader, handleMessageUpdates, currentSelection }) => {
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
  const [submitEnrollment, setSubmitEnrollment] = useState();
  const [activeThreadId, setActiveThreadId] = useState(null); // messagesId
  const [activeThreadName, setActiveThreadName] = useState(null); // fromName or toName
  const [activeThread, setActiveThread] = useState([]); // messageData
  const [newMessage, setNewMessage] = useState('');
  const [sendToSelectedContact, setSendToSelectedContact] = useState(false);
  const [childrenWarning, setChildrenWarning] = useState(false);
  const [silenceNotifications, setSilence] = useState(false);
  const [seenLastMessage, setSeenLast] = useState(false);
  const [showLeftMobile, setShowLeftMobile] = useState(true);// left side is shown by default

  // handle scrolling to last message
  const messagesRef = useRef(null);

  const scrollToBottom = () => {
    messagesRef.current.scrollIntoView({
      block: 'nearest',
    });
  };

  // monitor the state of the last message
  useEffect(() => {
    // once there is an activeThread, find the index of it within all the messages
    const index = activeMessages.findIndex((elem) => elem.messagesId === activeThreadId);
    if (index !== -1) {
      // if the last message was written by me...
      const myMessage = activeMessages[index].lastMessage.author === userId;

      // but the last "seen" person was them...
      const lastSeen = activeMessages[index].lastMessage.seen !== userId;
      if (myMessage && lastSeen) {
        // they have seen our message without responding so set state to true
        setSeenLast(true);
      }
    }
  }, [activeMessages, activeThread, activeThreadId, userId]);

  // when do we scroll to last message
  useEffect(() => {
    if (activeThread.length > 4) { // 4 will need to be adjusted if the message window size updates
      scrollToBottom();
    }
  }, [activeThread.length]);

  // handle when we submit enrollments
  useEffect(() => {
    setSubmitEnrollment((loggedInUser.enrollment?.submitted) || false);
  }, [loggedInUser, submitEnrollment]);

  // check to see if we are trying to connect with someone from their profile page
  useEffect(() => {
    setSendToSelectedContact(currentSelection !== null);
  }, [currentSelection]);

  // handle default threadId
  useEffect(() => {
    // if we have a currentSelection, then we came from Profile page
    if (sendToSelectedContact) {
      // use default message if we have no prior messages
      if (!activeMessages) {
        setActiveThreadId(defaultMessage.messagesId);
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
    } else if (activeMessages) {
      const foundUnread = activeMessages.findIndex((elem) => elem.lastMessage.author !== userId);
      if (foundUnread !== -1) {
        setActiveThreadId(activeMessages[foundUnread].messagesId);
      } else {
        // we didnt find an unread message, so load nothing and let the user select one
        setActiveThreadId(null);
      }
    }
  }, [activeMessages, userId, activeThreadId, currentSelection, sendToSelectedContact]);


  // // if we want to turn off the unread notifications, without having to send a response
  useEffect(() => {
    if (silenceNotifications) {
      // loop through all messages and find the ones that are "unread"
      const update = [...activeMessages];
      update.forEach((elem) => {
        if (elem.lastMessage.author !== userId) {
          // if true, add our ID to the read value
          elem.lastMessage.seen = userId;
          // now update DB with this new message state
          database.ref(`messages/${elem.messagesId}`).set(elem);
        }
      });
      // update state
      setActiveMessages(update);
      setSilence(false);
    }
  }, [activeMessages, silenceNotifications, userId]);

  // handle default thread name
  useEffect(() => {
    if (sendToSelectedContact) {
      setActiveThreadName(currentSelection.name);
    } else if (activeMessages) {
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
  }, [currentSelection, activeMessages, userId, sendToSelectedContact]);

  // set the active messages data
  useEffect(() => {
    // if we want to send a new message to a new contact
    if (sendToSelectedContact) {
      setShowLeftMobile(false);
      if (activeMessages) {
        // next check to see if that user has messages already
        const foundSelectionThreadId = activeMessages.findIndex((thread) => (thread.from === currentSelection.id) || (thread.to === currentSelection.id));
        if (foundSelectionThreadId !== -1) {
          // we've found the current selection in activeMessages
          setActiveThreadId(activeMessages[foundSelectionThreadId].messagesId);

          if (activeMessages[foundSelectionThreadId].lastMessage.author !== userId) {
            activeMessages[foundSelectionThreadId].lastMessage.read = userId; // signal we've read the thread
          }
          setActiveThread(activeMessages[foundSelectionThreadId].messageData);
          setActiveThreadName(activeMessages[foundSelectionThreadId].from === userId ? activeMessages[foundSelectionThreadId].toName : activeMessages[foundSelectionThreadId].fromName);
        } else {
          // we don't have any prior messages so this is a brand new contact
          setActiveThreadId(defaultMessage.messagesId);
          setActiveThread(defaultMessage.messageData);
          setActiveThreadName(defaultMessage.toName);
        }
      } else {
        // we don't have any prior messages so this is a brand new contact
        setActiveThreadId(defaultMessage.messagesId);
        setActiveThread(defaultMessage.messageData);
        setActiveThreadName(defaultMessage.toName);
      }
    } else if (activeMessages) {
      // load up whatever message thread we have selected first
      if (activeThreadId) {
        const foundActiveThreadId = activeMessages.findIndex((thread) => thread.messagesId === activeThreadId);
        if (foundActiveThreadId !== -1) {
          setActiveThreadId(activeMessages[foundActiveThreadId].messagesId);
          setActiveThread(activeMessages[foundActiveThreadId].messageData);
          setActiveThreadName(activeMessages[foundActiveThreadId].from === userId ? activeMessages[foundActiveThreadId].toName : activeMessages[foundActiveThreadId].fromName);
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
    if (newMessage !== '') {
      const newMessageData = {
        author: userId,
        message: newMessage,
        date: now,
      };

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

      /* Handle Updating DB with new message ids */

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
            database.ref(`leaders/${currentSelection.id}/public/messages`).once('value', (snap) => {
              const data = snap.val();
              // if not null, then they already have messages, so append to them
              if (data) {
                const updateData = data;
                updateData.push(sendToDBMessageId);
                database.ref(`leaders/${currentSelection.id}/public/messages`).set(updateData);
              } else {
              // otherwise, this is the receipiants first message as well, so create the array
                database.ref(`leaders/${currentSelection.id}/public/messages`).set([sendToDBMessageId]);
              }
            });
          } else {
          // found in activeMessages: this is a contact we selected on from profile page and wanted to re-contact
            updatedCurrentThread = activeMessages[foundNewCntact];
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
        updatedCurrentThread = activeMessages[found]; // since we have valid myMessages
        sendToDBMessageId = updatedCurrentThread.messagesId; // just use the id we have
      }

      // update the messageData array
      updatedCurrentThread.messageData = updatedThread;

      // setup lastMessage object
      updatedCurrentThread.lastMessage = { date: now, author: userId, seen: userId };
      // push to DB
      handleMessageUpdates(sendToDBMessageId, updatedCurrentThread);

      /* finally handle local state update of messages! */

      // do we already have activeMessages?
      if (activeMessages) {
        const updateAllMessages = [...activeMessages];
        const index = updateAllMessages.findIndex((elem) => elem.messagesId === sendToDBMessageId);
        if (index !== -1) {
        // fully update this thread with all original values, plus updated messageData and lastMessage
          const threadUpdate = { ...updateAllMessages[index], messageData: updatedCurrentThread.messageData, lastMessage: updatedCurrentThread.lastMessage };
          // now update this particular thread within the entire messages array
          updateAllMessages[index] = threadUpdate;
          setActiveMessages(updateAllMessages);
        }
      } else {
      // we don't because this is the very first message being sent
        setActiveMessages([updatedCurrentThread]);
        setActiveThread(updatedCurrentThread.messageData);
        setActiveThreadId(updatedCurrentThread.messagesId);
      }

      setNewMessage(''); // clear out the text box
    }
  };

  const switchMessage = (newId, newName, showRight) => {
    setActiveThreadId(newId);
    setActiveThreadName(newName);
    // if we've clicked on a previous message, obv we no longer are sending to a new contact
    setSendToSelectedContact(false);
    // finally if we are on mobile we need to toggle left and right columns
    // showRight will always be true if passed
    if (showRight) {
      setShowLeftMobile(!showRight); // invert it to hide the left column
    }
  };


  const handleSubmitEnrollment = () => {
    const enrolling = !submitEnrollment;
    // make sure user has children assigned first
    if (!loggedInUser.children) {
      setChildrenWarning(true);
    } else {
      setSubmitEnrollment(enrolling);

      // now hit DB with updates

      // first find the id of current thread within activeMessages
      const index = activeMessages.findIndex((message) => message.messagesId === activeThreadId);
      const submittedToId = activeMessages[index].fromName === activeThreadName ? activeMessages[index].from : activeMessages[index].to;

      let patchName = '';
      // we need to query the DB to pull the patchName from the leader
      database.ref(`leaders/${submittedToId}/public/`).on('value', (snapshot) => {
        // if we found the user then snapshot will be valid
        if (snapshot.val()) {
          const data = snapshot.val();
          patchName = data.patchName;
        }
      });

      // first setup our enrollment status, if we're enrolling versus revoking
      const enrollment = enrolling ? {
        accepted: false,
        dateSubmitted: now,
        submitted: true,
        submittedTo: submittedToId,
        submittedToName: activeThreadName,
        patchName,
      } : { submitted: false };

      console.log(enrollment);
      database.ref(`users/${userId}/public/enrollment`).set(enrollment);

      // set our info into the teachers client data
      // first setup our enrollment status as long the user hasnt revoked it
      const enrollmentStatus = {
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
          if (enrolling) {
            // we didnt find this client already
            if (index === -1) {
              clientList.push(enrollmentStatus);
            }
          } else if (index !== -1) {
            clientList.splice(index, 1);
          }
        } else {
          // otherwise, teacher has no clients yet, we need to set it as an array with its first element
          clientList = [enrollmentStatus];
        }

        // push the new client to the teacher so they will know about it
        database.ref(`leaders/${submittedToId}/public/clients`).set(clientList);

        // finally send parent back to home page
        if (!enrolling) {
          // IF they were actively enrolled
          if (loggedInUser.enrollment.accepted || false) {
            pageUpdate(0);
          }
        }
      });
    }
  };

  // handle conditional render
  const showingThread = sendToSelectedContact || (activeThread?.length > 0);
  const showEnrollmentButton = !isLeader && showingThread;
  const myTeacher = !isLeader && (loggedInUser.enrollment.submitted && (loggedInUser.enrollment.submittedToName === activeThreadName));
  const showEnrollmentDetails = (showEnrollmentButton && !loggedInUser.enrollment.accepted) && (myTeacher);
  const disableEnrollment = (showEnrollmentButton && submitEnrollment) && (!myTeacher);
  const messageWindowHeight = isLeader ? 450 : 500;
  const unReadMessages = activeMessages.some((elem) => (elem.lastMessage.author !== userId));

  return (
    <div>
      <div>
        <Header pageUpdate={pageUpdate} loggedInUser={loggedInUser} isLeader={isLeader} isMessages emailVerified={emailVerified}/>

        <div className="CursiveFont SuperFont TextLeft Buffer" style={{ marginLeft: 30 }}>Messenger</div>

        {/* Message Data*/}
        <div className="SeeThru" >

          {/* Message Columns */}
          <div className="Flex Between ">


            {/*  Left side Message Notifcations Hidden on Mobile*/}
            <div className="CursiveFont LargeFont PinkFont HideMobile" style={{ width: '30%' }}>

              {activeMessages.length > 0 && (<div>All Messages </div>)}
              { unReadMessages && <button type='button' onClick={() => setSilence(true)}>Clear All Unread Notifications</button>}


              <div className={'OverFlow '}>
                {(activeMessages?.length > 0 ? (activeMessages.map((elem) => {
                  // we aren't the last one listed as seen, then they have seen the message
                  const seen = elem.lastMessage.seen !== userId;
                  // we aren't the last one to send a message, then we have an unread/unresponded message
                  const unread = elem.lastMessage.author !== userId;
                  const showAsUnread = unread && !seen;

                  // we need to determine if this is our message thread, or someone elses
                  const messageFromName = (elem.from === userId) ? elem.toName : elem.fromName;
                  const messageFromUrl = (elem.from === userId) ? elem.toUrl : elem.fromUrl;
                  const messageFromID = (elem.from === userId) ? elem.to : elem.from;

                  // handle enrollment submissions
                  const submittedTo = !isLeader && loggedInUser.enrollment.submittedTo;
                  const submittedEnrollmentTo = submittedTo === messageFromID;
                  const accepted = !isLeader && submittedEnrollmentTo && (loggedInUser.enrollment.accepted || false);

                  return (
                    <MessageNotification
                      key={elem.messagesId}
                      name={messageFromName}
                      url={messageFromUrl}
                      lastMessage={elem.lastMessage}
                      activeId={elem.messagesId}
                      switchMessage={switchMessage}
                      showAsUnread={showAsUnread}
                      submitted={submittedEnrollmentTo && !accepted}
                      accepted={accepted}
                    />
                  );
                }
                )) : (
                  <div>No Messages yet!</div>
                ))}
              </div>


            </div>

            {/*  Left side Message Notifcations SHOWN on Mobile*/}
            <div className=" CursiveFont LargeFont PinkFont ShowMobile">

              {showLeftMobile && (
                <>
                  {activeMessages.length > 0 && (<div >All Messages </div>)}
                  { unReadMessages && <button type='button' onClick={() => setSilence(true)}>Clear All Unread Notifications</button>}


                  <div className={'OverFlow Flex Col'} style={{ height: '90vh' }}>
                    {(activeMessages?.length > 0 ? (activeMessages.map((elem) => {
                      // we aren't the last one listed as seen, then they have seen the message
                      const seen = elem.lastMessage.seen !== userId;
                      // we aren't the last one to send a message, then we have an unread/unresponded message
                      const unread = elem.lastMessage.author !== userId;
                      const showAsUnread = unread && !seen;

                      // we need to determine if this is our message thread, or someone elses
                      const messageFromName = (elem.from === userId) ? elem.toName : elem.fromName;
                      const messageFromUrl = (elem.from === userId) ? elem.toUrl : elem.fromUrl;
                      const messageFromID = (elem.from === userId) ? elem.to : elem.from;

                      // handle enrollment submissions
                      const submittedTo = !isLeader && loggedInUser.enrollment.submittedTo;
                      const submittedEnrollmentTo = submittedTo === messageFromID;
                      const accepted = !isLeader && submittedEnrollmentTo && (loggedInUser.enrollment.accepted || false);

                      return (
                        <MessageNotification
                          key={elem.messagesId}
                          name={messageFromName}
                          url={messageFromUrl}
                          lastMessage={elem.lastMessage}
                          activeId={elem.messagesId}
                          switchMessage={switchMessage}
                          showAsUnread={showAsUnread}
                          submitted={submittedEnrollmentTo && !accepted}
                          accepted={accepted}
                        />
                      );
                    }
                    )) : (
                      <div>No Messages yet!</div>
                    ))}
                  </div>

                </>
              )}
            </div>

            {/* Right Side Client Messages Hidden on Mobile */}
            <div className="Flex Col HideMobile" style={{ width: '70%' }}>

              {/* If we are a leader, show the buttons */}
              {isLeader && (
                <div className="Flex AlignItems MessageClientHeader Padding">

                  <div className="CursiveFont LargeFont WhiteFont" >My Clients</div>

                  {/* Buttons to switch between clients */}
                  <div className="Flex AlignItems JustifyCenter">
                    {clientData?.map((client) => {
                      const message = activeMessages.find((elem) => ((elem.to === client.clientId) || (elem.from === client.clientId)));
                      if (client.accepted) {
                        return (

                          <div
                            className={`SocialMessageBtn Flex AlignItems JustifyCenter ${client.clientId === activeThreadId ? 'SocialMessageBtn_Active' : 'SocialMessageBtn_UnActive'}`}
                            key={client.clientData.name}
                            type="button"
                            onClick={() => {
                              setActiveThreadId(message.messagesId);
                              setActiveThreadName(client.clientData.name);
                            }} >
                            <img style={{ width: 70, borderRadius: 50 }} src={client.clientData.photoUrl} alt='client pic' />
                          </div>


                        );
                      }
                      return null;
                    })}
                  </div>

                </div>
              )}

              {/* Message Data */}
              <div >
                {showingThread && (
                  <div className="Flex AlignItems Between PinkBorder">

                    <div className="Flex AlignItems">
                      {/* Enrollment Button */}
                      {(showingThread && showEnrollmentButton && !disableEnrollment)
                        && <button
                          type="button"
                          title={`${submitEnrollment
                            ? 'Revoking Enrollment will remove the request from this teacher'
                            : 'Submitting Enrollment will notify the teacher that you have selected her!'}`}
                          onClick={handleSubmitEnrollment}>
                          {`${submitEnrollment ? 'Revoke Enrollment' : 'Submit For Enrollment'}`}
                        </button>
                      }

                      <div className="CursiveFont LargeFont PinkFont Padding HideMobile">{activeThreadName}</div>
                    </div>

                    {!isLeader && (
                      <>
                        {(!loggedInUser.enrollment.accepted && disableEnrollment) && (<div className="PinkBorder" style={{ marginRight: 20 }}>
                          <div className="SmallFont">{`Enrollment has been submitted to ${loggedInUser.enrollment.submittedToName}`}</div>
                          <div className="SmallFont">You can only enroll with one teacher at a time</div>
                        </div>)}

                        {(loggedInUser.enrollment.accepted && myTeacher)
                           && < div className="Padding">
                             <div className="SmallFont">You are actively enrolled with this teacher!</div>
                           </div>}
                      </>
                    )}

                  </div>
                )}


                {/* Handle Warnings for Enrollment */}
                {showEnrollmentDetails
                  && <div>She has been notified of your choice and you will receive an email when she has accepted your enrollment</div>}


                {childrenWarning && (<div className="PinkBorder">
                  <div>You need to assign children in your profile first! </div>
                  <div>Only add the children you want enrolled, then come back and submit enrollment</div>
                </div>)}


                {/* Actual messages */}
                {showingThread ? (
                  <>
                    <div style={{ height: messageWindowHeight, overflowY: 'scroll' }}>
                      {/* Display all the messages if any */}
                      {activeThread.map((elem, index) => (<SingleMessage
                        key={index.toString()}
                        data={elem}
                        userId={userId}
                        lastMessage={(activeThread.length - 1) === index}
                        seen={seenLastMessage}
                      />)

                      )}
                      <div ref={messagesRef}/>
                    </div>

                    {/* Desktop Messenger */}
                    <div className="Flex FullSize AlignItems WhiteFill PinkBorder">
                      <input
                        className="Flex FullSize InputStyle Buffer"
                        placeholder="What would you like to say?"
                        type="text"
                        name="NewMessage"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      />
                      <button
                        title="Send Message"
                        className='transparent NoMargin'
                        style={{ marginRight: '2em' }}
                        type="button "
                        onClick={handleNewMessage} ><img src={Send} alt='send email' />
                      </button>
                    </div>


                  </>
                )
                // No current selection, and no active messages
                  : (
                    <>
                      {activeMessages.length < 1 ? (
                        <div className="Flex Col JustifyCenter" style={{ marginTop: '3vh' }}>
                          <div>
                            <span><strong >No conversations found.</strong></span>
                          </div>


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
                      ) : <div className="Buffer">Select a message to view it</div>}</>)
                }
              </div>
            </div>


            {/* Right Side Client Messages Shown on Mobile */}
            {!showLeftMobile && (
              <div className="Flex Col ShowMobile MobileMessagesRight" >


                {/* We need a fixed header on mobile */}
                <div
                  className="MobileMessageHeader WhiteFill FullSize PinkBorderBottom PaddingLite "
                  style={{ height: 45, paddingLeft: '2em', paddingRight: '2em' }}>

                  {/* Return Button Row*/}
                  <div className="Flex Between AlignItems">

                    {/* Return Button */}
                    <div onClick={() => setShowLeftMobile(true)}><img src={Return} alt="return to prev page" className="filter-pink"/></div>

                    {showingThread && (
                      < >
                        {/* Enrollment Button */}
                        {(showingThread && showEnrollmentButton && !disableEnrollment)
                        && <button
                          className="NoMargin"
                          type="button" disabled={disableEnrollment}
                          title={`${submitEnrollment
                            ? 'Revoking Enrollment will remove the request from this teacher'
                            : 'Submitting Enrollment will notify the teacher that you have selected her!'}`}
                          onClick={handleSubmitEnrollment}>
                          {`${submitEnrollment ? 'Revoke Enrollment' : 'Submit For Enrollment'}`}
                        </button>
                        }
                      </>

                    )}
                    <div className="CursiveFont LargeFont PinkFont ShowMobile NoMargins" style={{ marginRight: '3em' }}>{activeThreadName?.replace(/ .*/, '')}</div>
                  </div>

                  {/* If we are a leader, show the Client buttons */}
                  {isLeader && (
                    <div className="Flex AlignItems MessageClientHeader Padding">

                      <div className="CursiveFont LargeFont WhiteFont" >My Clients</div>

                      {/* Buttons to switch between clients */}
                      <div className="Flex AlignItems JustifyCenter">
                        {clientData?.map((client) => {
                          const message = activeMessages.find((elem) => ((elem.to === client.clientId) || (elem.from === client.clientId)));
                          if (client.accepted) {
                            return (

                              <div
                                className={`SocialMessageBtn Flex AlignItems JustifyCenter ${client.clientId === activeThreadId ? 'SocialMessageBtn_Active' : 'SocialMessageBtn_UnActive'}`}
                                key={client.clientData.name}
                                type="button"
                                onClick={() => {
                                  setActiveThreadId(message.messagesId);
                                  setActiveThreadName(client.clientData.name);
                                }} >
                                <img style={{ width: 70, borderRadius: 50 }} src={client.clientData.photoUrl} alt='client pic' />
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>

                    </div>
                  )}


                  {/* Handle Warnings for Enrollment */}
                  {showEnrollmentDetails
                  && <div>She has been notified of your choice and you will receive an email when she has accepted your enrollment</div>}


                  {childrenWarning && (<div className="PinkBorder">
                    <div>You need to assign children in your profile first! </div>
                    <div>Only add the children you want enrolled, then come back and submit enrollment</div>
                  </div>)}


                </div> {/* end mobile header */}

                {/* Actual messages*/}
                {showingThread ? (
                  <>
                    {/* Shown Desktop */}
                    <div className="HideMobile" style={{ height: messageWindowHeight, overflowY: 'scroll' }}>
                      {/* Display all the messages if any */}
                      {activeThread.map((elem, index) => (<SingleMessage
                        key={index.toString()}
                        data={elem}
                        userId={userId}
                        lastMessage={(activeThread.length - 1) === index}
                        seen={seenLastMessage}
                      />)

                      )}
                      <div ref={messagesRef}/>
                    </div>


                    {/* Shown Mobile */}
                    <div className="ShowMobile" style={{ marginTop: '5em', marginBottom: '9em', paddingLeft: '2em', paddingRight: '2em' }}>
                      {/* Display all the messages if any */}
                      {activeThread.map((elem, index) => (<SingleMessage
                        key={index.toString()}
                        data={elem}
                        userId={userId}
                        lastMessage={(activeThread.length - 1) === index}
                        seen={seenLastMessage}
                      />)

                      )}

                    </div>

                    {/* Mobile New Message Input */}
                    <div
                      className="ShowMobileFlex MobileMessages FullSize AlignItems WhiteFill PinkBorderTop "
                      style={{ paddingLeft: '3em', paddingRight: '3em' }}>
                      <input
                        className="Flex FullSize InputStyle Buffer"
                        placeholder="What would you like to say?"
                        type="text"
                        name="NewMessage"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      />
                      <button
                        style={{ paddingRight: '3em' }}
                        className='transparent NoMargin'
                        type="button "
                        onClick={handleNewMessage} ><img src={Send} alt='send email' />
                      </button>
                    </div>
                  </>
                )
                // No current selection, and no active messages
                  : (
                    <>
                      {activeMessages.length < 1 ? (
                        <div className="Flex Col JustifyCenter" style={{ marginTop: '3vh' }}>
                          <div>
                            <span><strong >No conversations found.</strong></span>
                          </div>


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
                      ) : <div className="Buffer">Select a message to view it</div>}</>)
                }
              </div>


            )}


          </div>

        </div>


      </div>


    </div >
  );
};
