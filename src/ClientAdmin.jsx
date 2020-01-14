import React from "react";

import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { Ratings, SimpleTable } from "./Components";

import { Logo, Elegant } from "./images";


export const ClientAdmin = ({ pageUpdate, loggedInUser, data }) => {
    // pull out public data
    const { rating } = loggedInUser;

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


                    {/* Data Row */}
                    <div className="Flex Col Buffer">
                        <div>
                            <div className="CursiveFont SuperFont PinkFont">My Clients</div>
                            <Ratings rating={rating} />
                        </div>

                        <SimpleTable data={data && data} />


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
