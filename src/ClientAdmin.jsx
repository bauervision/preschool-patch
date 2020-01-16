import React from "react";

import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { Ratings, SimpleTable } from "./Components";

import { Logo, Elegant } from "./images";


export const ClientAdmin = ({ pageUpdate, loggedInUser, clientData }) => {
    // pull out public data
    const { rating } = loggedInUser;

    // basic header entries
    const clientHeader = ["Student Name", "Parent Name", "Contact Number", "Enrollment", "Active"];

    return (
        <div>
            <div>
                <Header pageUpdate={pageUpdate} isAdmin loggedInUser={loggedInUser} isLeader={true} />

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

                        <div className="MarginTop">
                            {/* Client Table Data */}
                            {clientData.length > 0 ? (
                                <SimpleTable data={clientData} headerData={clientHeader} />
                            ) : (
                                    <div className="SimpleBorder">
                                        <div className="PinkFont CursiveFont LargeFont">Sorry, no clients yet!</div>
                                        <p>{"As soon as a parent selects you as their child's teacher, you will see them show up here."}</p>
                                    </div>
                                )}

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
