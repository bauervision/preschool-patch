import React, { useState, useEffect, useRef } from "react";

import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { SingleMessage, EditField, MessageNotification } from "./Components";

import { Logo, Elegant } from "./images";

import { database } from './config';
import moment from 'moment';

export const Messages = ({ pageUpdate, loggedInUser, clientData, myMessages, userId, isLeader }) => {



    const [stateMessages, setStateMessages] = useState(myMessages);
    const [activeClientId, setActiveClient] = useState((clientData[0] && clientData[0].clientData.id) || ''); // the first messager is default message
    const [activeClientName, setActiveClientName] = useState((clientData[0] && clientData[0].clientData.name) || '');
    const [activeMessages, setActiveMessages] = useState([]);
    const [activeMessagesID, setActiveMessagesID] = useState('')
    const [newMessage, setNewMessage] = useState('');

    // const messagesRef = useRef(myMessages);
    // const stateMessagesRef = useRef(stateMessages);

    // useEffect(() => {
    //     if (messagesRef.current !== stateMessagesRef.current) {
    //         console.log("props and state is different")
    //         setStateMessages(messagesRef.current)
    //     } else {
    //         console.log("ELSE props is the same as state")
    //     }
    // }, [messagesRef, stateMessagesRef]);

    // store my messages right away into state, so that we can turn off 'unread' as they get read


    // handle incoming myMessages and sort the data for the left column
    useEffect(() => {
        // sort by date, earliest at the top
        stateMessages.sort((a, b) => moment(b.lastMessage).diff(a.lastMessage))

    }, [stateMessages]);

    // set the active messages data
    useEffect(() => {
        Object.entries(stateMessages).find(([key, value]) => {
            if (value.from === activeClientId) {
                setActiveMessagesID(value.messagesId);
                setActiveMessages(value.messageData);
            }
        })
    }, [activeClientId, stateMessages]);


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
        const updatedCurrentMessages = stateMessages.find((elem) => elem.from === activeClientId);

        // update the messageData array
        updatedCurrentMessages.messageData = updatedMessages;

        // setup lastMessage object
        updatedCurrentMessages.lastMessage = {
            date: now,
            author: userId
        }

        updatedCurrentMessages.unread = 1;

        // push to DB
        database.ref(`messages/${activeMessagesID}`).set(updatedCurrentMessages)
            .then(() => {
                setNewMessage('') // clear out the text box
            });
    }


    const switchMessage = (newId, newName) => {

        const currentThread = stateMessages.find((elem) => elem.from === newId);
        // when we switch to a message, if it is unread, toggle it
        currentThread.unread = currentThread.unread === 1 && 0; // now its been read
        setActiveClient(newId);
        setActiveClientName(newName)
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
                                {(stateMessages.length > 0 ? (stateMessages.map((elem) =>
                                    <MessageNotification
                                        key={elem.from}
                                        name={elem.fromName}
                                        url={elem.fromUrl}
                                        lastMessage={elem.lastMessage}
                                        unread={elem.unread}
                                        activeId={elem.from}
                                        activeName={elem.fromName}
                                        switchMessage={switchMessage}
                                        showAsUnread={elem.unread && (elem.from !== userId)}
                                    />)) : (
                                        <div>No Messages yet!</div>
                                    ))}
                            </div>


                        </div>


                        {/* Right Side Client Messages */}
                        <div className="Flex Col" style={{ width: '70%' }}>
                            <div className="Flex AlignItems GreenFill Padding">

                                <div className="CursiveFont LargeFont" >Client Messages</div>

                                {/* Buttons to switch between clients */}
                                <div className="Flex AlignItems JustifyCenter">
                                    {clientData && clientData.map((client) => (
                                        <div
                                            className={`SocialMessageBtn Flex AlignItems JustifyCenter ${client.clientId === activeClientId ? 'SocialMessageBtn_Active' : 'SocialMessageBtn_UnActive'}`}
                                            key={client.clientData.name}
                                            type="button"
                                            onClick={() => {
                                                setActiveClient(client.clientId);
                                                setActiveClientName(client.clientData.name)
                                            }} >
                                            <img style={{ width: 70, borderRadius: 50 }} src={client.clientData.photoUrl} alt='client pic' />
                                        </div>
                                    ))}
                                </div>

                            </div>


                            {/* Message Data */}
                            <div className="MarginTop PinkBorder" >
                                <div className="CursiveFont LargeFont PinkFont">{activeClientName}</div>
                                {(activeMessages && activeMessages.length > 0 ?
                                    (activeMessages.map((elem, index) => <SingleMessage key={index.toString()} data={elem} userId={userId} />))
                                    : (<div>No Messages yet!</div>)
                                )}


                                {/* {activeMessages && activeMessages.length > 0 && (
                                    <> */}
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
