import React from "react";

import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { Ratings } from "./Components";

import { Logo, Elegant } from "./images";


export const ClientAdmin = ({ pageUpdate, loggedInUser }) => {
    // pull out public data
    const {
        // aboutMe,
        // age,
        // available,
        // experience,
        // gallery,
        // rates,
        // infants,
        // kidTotal,
        // name,
        rating,
        // photoUrl

    } = loggedInUser;



    return (
        <div>
            <div>
                <Header pageUpdate={pageUpdate} />

                <div className="CursiveFont SuperFont TextLeft Buffer " style={{ marginLeft: 30 }}>Client Admin</div>

                {/* Client Data*/}
                <div
                    className="Flex AlignItems SeeThru "
                    style={{
                        justifyContent: "space-evenly",

                    }}
                >


                    {/* Data Row */}
                    <div className="Buffer" style={{ width: '40%' }}>
                        <div>
                            <div
                                className="CursiveFont SuperFont PinkFont">My Clients</div>
                            <Ratings rating={rating} />
                        </div>

                        <div className="Flex Between">

                            {/* Data */}
                            <div style={{ textAlign: 'left', marginTop: 20 }}>



                            </div>

                        </div>

                    </div>



                </div>

                <img src={Elegant} alt="decorative" className="filter-green Margins" />
                {/* Photo Gallery Section */}
                <div
                    className="Flex Col AlignItems PinkFill"
                    style={{
                        margin: 5,
                        marginTop: 0,
                        border: "solid",
                        borderWidth: 1,
                        borderColor: "green",
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                        borderBottomLeftRadius: 50,
                        borderBottomRightRadius: 50,
                        padding: 30
                    }}>
                    <div className="CursiveFont LargeFont Buffer">Gallery</div>




                </div>
            </div>

            <div className="Buffer">
                <img src={Logo} alt="logo" style={{ width: 600, height: 'auto' }} />
            </div>

            <Footer />
        </div>
    );
};
