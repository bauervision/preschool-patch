import React, { useState, useEffect } from "react";

import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { SingleMessage, EditField, MessageNotification } from "./Components";

import { Logo, Elegant } from "./images";

import { database } from './config';
import moment from 'moment';

export const Messages = ({ pageUpdate, loggedInUser, clientData, myMessages, userId, isLeader }) => {

    const [activeClientId, setActiveClient] = useState((clientData[0] && clientData[0].clientData.id) || ''); // the first messager is default message
    const [activeClientName, setActiveClientName] = useState((clientData[0] && clientData[0].clientData.name) || '');
    const [activeMessages, setActiveMessages] = useState([]);
    const [activeMessagesID, setActiveMessagesID] = useState('')
    const [newMessage, setNewMessage] = useState('');

    // handle incoming myMessages and sort the data for the left column
    useEffect(() => {
        // sort by date, earliest at the top
        myMessages.sort((a, b) => moment(b.lastMessage).diff(a.lastMessage))

    }, [myMessages]);

    // set the active messages data
    useEffect(() => {
        Object.entries(myMessages).find(([key, value]) => {

            if (value.from === activeClientId) {
                setActiveMessagesID(value.messagesId);
                console.log("value.messagesId", value.messagesId)
                setActiveMessages(value.messageData);
            }
        })
    }, [activeClientId, myMessages]);


    const handleNewMessage = () => {

        const messageData = {
            author: userId,
            message: newMessage,
            date: moment().format('MM/DD/YYYY'),
            liked: false,
            unread: 0 // sorting later with numbers is easier
        }

        // get and set current active message data
        // this is the message thread we are currently writing in
        const updatedMessages = [...activeMessages];
        updatedMessages.push(messageData);

        // now we need to update the whole myMessages array with the new messageData
        // grab the current active thread
        console.log("activeClientId", activeClientId)
        console.log("myMessages", myMessages)
        const updatedCurrentMessages = myMessages.find((elem) => elem.from = activeClientId);
        // update the mssageData array
        updatedCurrentMessages.messageData = updatedMessages;
        console.log(updatedCurrentMessages)

        // database.ref(`messages/${activeMessagesID}`).set(updatedMessages)
        //     .then(() => {
        //         setNewMessage('') // clear out the text box
        //     });
    }


    const switchMessage = (newId, newName) => {
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
                                {(myMessages.length > 0 ? (myMessages.map((elem) =>
                                    <MessageNotification
                                        key={elem.from}
                                        name={elem.fromName}
                                        url={elem.fromUrl}
                                        lastDate={elem.lastMessage}
                                        unread={elem.unread}
                                        activeId={elem.from}
                                        activeName={elem.fromName}
                                        switchMessage={switchMessage}
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
