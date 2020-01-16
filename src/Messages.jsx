import React, { useState, useEffect } from "react";

import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { SingleMessage } from "./Components";

import { Logo, Elegant } from "./images";


export const Messages = ({ pageUpdate, loggedInUser, clientData, isLeader }) => {
    const [activeClient, setActiveClient] = useState(clientData[0].clientId);
    const [activeMessages, setActiveMessages] = useState([]);

    const { messages } = loggedInUser;




    useEffect(() => {
        Object.entries(messages).find(([key, value]) => {
            if (key === activeClient) {
                console.log(value.messageData)
                setActiveMessages(value.messageData);
            }

        })
    }, [activeClient, activeMessages, messages]);



    return (
        <div>
            <div>
                <Header pageUpdate={pageUpdate} isAdmin loggedInUser={loggedInUser} isLeader={true} />

                <div className="CursiveFont SuperFont TextLeft Buffer " style={{ marginLeft: 30 }}>Messenger</div>

                {/* Client Data*/}
                <div
                    className="Flex AlignItems SeeThru "
                    style={{
                        justifyContent: "space-evenly",

                    }}
                >
                    {/* My Messages */}
                    <div className="Flex Col Buffer MarginTop">
                        <div>
                            <div className="CursiveFont SuperFont PinkFont">My Messages</div>
                        </div>

                        {/* Buttons to switch between clients */}
                        <div className="Flex ">
                            {clientData && clientData.map((client) => (
                                <button
                                    key={client.clientData.name}
                                    type="button"
                                    onClick={() => setActiveClient(client.clientId)} >{client.clientData.name}</button>
                            ))}
                        </div>

                        {/* Message Data */}
                        <div className="MarginTop SimpleBorder">


                            {activeMessages && activeMessages.map((elem, index) => {

                                return (
                                    <SingleMessage key={index.toString()} data={elem} />
                                )
                            })}

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
