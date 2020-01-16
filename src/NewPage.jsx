import React from "react";

import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { Ratings, SimpleTable } from "./Components";

import { Logo, Elegant } from "./images";


export const NewPage = ({ pageUpdate, loggedInUser, data }) => {


    return (
        <div>
            <div>
                <Header pageUpdate={pageUpdate} isAdmin loggedInUser={loggedInUser} isLeader={true} />

                {/* Top Left Title */}
                <div className="CursiveFont SuperFont TextLeft Buffer " style={{ marginLeft: 30 }}>Page Name</div>

                {/* Page Data*/}
                <div
                    className="Flex AlignItems SeeThru "
                    style={{
                        justifyContent: "space-evenly",

                    }}
                >


                    {/* Page Title */}
                    <div className="Flex Col Buffer MarginTop">
                        <div>
                            <div className="CursiveFont SuperFont PinkFont">My Messages</div>

                        </div>

                        <div className="MarginTop">
                            <div>Message Data here</div>
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
