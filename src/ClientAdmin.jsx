import React from "react";

import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { Ratings, SimpleTable } from "./Components";

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
        clients
        // photoUrl

    } = loggedInUser;

    const data = {
        headerData: ["Student Name", "Parent Name", "Contact Number", "Enrollment", "Active"],
        bodyData: [
            { name: "Caleb", parent: "Dani Darling", phone: "456-0987", status: "Full-Time", active: true },
            { name: "Kalee", parent: "Dani Darling", phone: "456-0987", status: "Full-Time", active: true },
            { name: "Jaren", parent: "Suzy Smythe", phone: "234-0099", status: "Part-Time", active: true },
            { name: "Jess", parent: "Chloe Curls", phone: "221-3245", status: "Full-Time", active: false },
            { name: "Monika", parent: "Kim Kully", phone: "576-7869", status: "Drop-In", active: true },
            // ["Caleb", "Dani Darling", "456-0987", "Full-Time", true],
            // ["Calee", "Dani Darling", "456-0987", "Full-Time", true],
            // ["Jaren", "Suzy Smythe", "234-0099", "Part-Time", true],
            // ["Jess", "Chloe Curls", "221-3245", "Full-Time", false],
            // ["Monika", "Kim Kully", "576-7869", "Drop-In", true],

        ]
    }

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
                    <div className="Flex Col Buffer">
                        <div>
                            <div className="CursiveFont SuperFont PinkFont">My Clients</div>
                            <Ratings rating={rating} />
                        </div>

                        <SimpleTable data={data} />


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
