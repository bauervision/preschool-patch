import React, { useState, useEffect } from "react";

import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { Toast } from "./Components";
import { Ratings, SimpleTable, DetailViewClient } from "./Components";

import { Corner, Logo, Elegant } from "./images";
import { database } from "./config";

export const ClientAdmin = ({ pageUpdate, loggedInUser, myMessages, loadingClients, clientData, handleMemberSelection }) => {

    const [clientState, setClientState] = useState([]);
    const [clientDataState, setClientDataState] = useState([]);
    const [selection, setSelection] = useState(null);
    const [toast, setToast] = useState(false);

    // pull out public data
    const { clients, rating } = loggedInUser && loggedInUser;

    useEffect(() => {
        if (loggedInUser) {

            let updatedClients = [...clients];
            // check to make sure that we have an update list of children for each client
            updatedClients.forEach((client) => {
                // now check the receiptants array
                database.ref(`users/${client.clientId}/public/children`).once('value', (snap) => {
                    const data = snap.val();
                    if (client.children.length !== data.length) {
                        // if children has updated
                        console.log("Children has updated")
                        client.children = data;
                    }
                })
            })
            setClientState(updatedClients)
        }

    }, [clients, loggedInUser]);

    useEffect(() => {
        if (loggedInUser) {
            setClientDataState(clientData)
        }

    }, [clientData, loggedInUser])

    // basic header entries
    const clientHeader = ["Student Name", "Age", "Parent Name", "Contact Number", "Enrollment", "Active"];

    const handleRowSelection = (memberData) => {
        const selectedClient = clientDataState.find((elem) => elem.clientData.name === memberData.parent)
        setSelection(selectedClient);
    }

    const handleEnrollment = (accepted, updatedClientData, updatedClient) => {

        if (accepted) {
            // update state
            setClientDataState(updatedClientData)
            setClientState(updatedClient);
            setToast({ value: true, message: 'Congrats! You have a new Client!' });
            setTimeout(() => setToast({ value: false, message: '' }), 3000);
        } else {
            setClientDataState(updatedClientData)
            setClientState(updatedClient);
            setToast({ value: true, message: 'Please email a reason to the parent' });
            setTimeout(() => setToast({ value: false, message: '' }), 4000);
        }

    }

    const handleSelection = (memberData) => {
        // Pass current selection up to parent in order to render profile page
        handleMemberSelection(memberData);
    };

    return (
        <div>
            <div>
                <Header pageUpdate={pageUpdate} isAdmin loggedInUser={loggedInUser} isLeader={true} myMessages={myMessages} />

                <div className="CursiveFont SuperFont TextLeft Buffer " style={{ marginLeft: 30 }}>Client Admin</div>

                {/* Client Data*/}
                <div
                    className="Flex AlignItems SeeThru "
                    style={{
                        justifyContent: "space-evenly",

                    }}
                >

                    {/* My Clients */}
                    <div className="Flex Col Buffer MarginTop">
                        <div>
                            <div className="CursiveFont SuperFont PinkFont">My Clients</div>
                            <Ratings rating={rating} />
                        </div>


                        {loadingClients ? (
                            <div className="Flex Col JustifyCenter AlignItems">
                                <img src={Corner} alt='corner' className='filter-pink Rotate Alert' style={{ width: 50, height: 'auto', zIndex: 0, paddingRight: 10 }} />
                            </div>
                        ) : (
                                <>
                                    <div className="MarginTop">
                                        {/* Client Table Data */}
                                        {(clientDataState?.length > 0) ? (
                                            <SimpleTable data={clientDataState} headerData={clientHeader} handleSelection={handleRowSelection} />
                                        ) : (
                                                <div className="SimpleBorder MarginBottom">
                                                    <div className="PinkFont CursiveFont LargeFont">Sorry, no clients yet!</div>
                                                    <p>{"As soon as a parent selects you as their child's teacher, you will see them show up here."}</p>
                                                </div>
                                            )}

                                    </div>

                                    {clientState.length > 0 && (
                                        <div className="Flex JustifyCenter PinkBorder MarginTop">
                                            {selection ? (
                                                <DetailViewClient
                                                    enrollmentData={clientState}
                                                    selection={selection}
                                                    handleEnrollment={handleEnrollment}
                                                    handleSelection={handleSelection}
                                                    pageUpdate={pageUpdate} />
                                            ) : (
                                                    <div>Make a selection from the table to view specific details about the client</div>
                                                )}

                                        </div>
                                    )}

                                </>
                            )}




                    </div>



                </div>

                <img src={Elegant} alt="decorative" className="filter-green Margins" />

            </div>

            <div className="Buffer">
                <img src={Logo} alt="logo" style={{ width: 600, height: 'auto' }} />
            </div>

            <Footer />

            <Toast showToast={toast.value} message={toast.message} />
        </div>
    );
};
