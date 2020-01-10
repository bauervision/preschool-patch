import React from "react";

import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { Ratings, SimpleImage } from "./Components";

import { Coloring, Kids, Table, Working } from "./images/photos";
import { DecorFlat, Logo, Elegant } from "./images";

const galleryImages = [Coloring, Kids, Table, Working];
export const ClientAdmin = ({ pageUpdate, loggedInUser }) => {
    // pull out public data
    const {
        aboutMe,
        age,
        available,
        experience,
        gallery,
        rates,
        infants,
        kidTotal,
        name,
        rating,
        photoUrl

    } = loggedInUser;



    return (
        <div>
            <div>
                <Header pageUpdate={pageUpdate} />

                <div className="CursiveFont SuperFont TextLeft Buffer " style={{ marginLeft: 30 }}>Client Admin</div>

                {/* Client Data*/}
                <div
                    className="Flex AlignItems SeeThru RoundBorder SimpleBorder "
                    style={{
                        justifyContent: "space-evenly",

                    }}
                >


                    {/* Data Row */}
                    <div className="Buffer" style={{ width: '40%' }}>
                        <div>
                            <div
                                className="CursiveFont SuperFont PinkFont"
                            >My Clients</div>
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
