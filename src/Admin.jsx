import React, { useState } from "react";

import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { AdminTable } from "./Components";
import { DetailViewAdmin } from './Components';
import { Logo, Elegant } from "./images";


export const Admin = ({ pageUpdate, loggedInUser, patchData }) => {

    const [selection, setSelection] = useState(null);

    // basic header entries
    const adminHeader = ["Name", "isLeader", "Enrolled", "Messages", "Phone", "Email", "Zipcode"];

    // handle some basic overview information
    const totalUsers = patchData.table.filter((elem) => elem.isLeader === 'false').length;
    const totalLeaders = patchData.table.filter((elem) => elem.isLeader === 'true').length;
    const activeLeaders = patchData.table.filter((elem) => (elem.isLeader === 'true' && (elem.kidTotal !== 0))).length;
    const activeUsers = patchData.table.filter((elem) => (elem.isLeader === 'false' && (elem.kidTotal !== 0))).length;

    // now let's start doing some calucations
    let initialValue = 0;
    const totalActiveEnrollments = patchData.table.filter((elem) => elem.isLeader === 'true').reduce((a, c) => a + c.kidTotal, initialValue);

    // anyone who has payoutData has received money from us
    const earners = patchData.all.filter((elem) => elem.private.payoutData);
    let totalRevenue = 0;
    let totalEarned = 0;
    let totalPaid = 0;
    // figure out the data
    earners.forEach((elem) => {
        let init = 0;
        const earnerIncome = elem.private.payoutData.reduce((a, c) => a + c.revenue, init)
        totalRevenue += earnerIncome;

        let init2 = 0;
        const earnerEarned = elem.private.payoutData.reduce((a, c) => a + c.earned, init2)
        totalEarned += earnerEarned;

        let init3 = 0;
        const earnerPaid = elem.private.payoutData.reduce((a, c) => a + c.amount, init3)
        totalPaid += earnerPaid;

    })


    const handleRowSelection = (memberData) => {
        // incoming selection will only contain simple table data, so find this user in all data
        const selectedMember = patchData.all.find((elem) => elem.private.email === memberData.email)
        setSelection(selectedMember);
    }



    return (
        <div>
            <div>
                <Header pageUpdate={pageUpdate} isAdmin loggedInUser={loggedInUser} isLeader={true} />

                {/* Top Left Title */}
                <div className="CursiveFont SuperFont TextLeft Buffer " style={{ marginLeft: 30 }}>Administration</div>

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
                            <div className="Flex JustifyCenter SimpleBorder">
                                <div className="CursiveFont LargeFont Padding">Total Earned: <strong>${totalEarned} </strong></div>
                                <div className="CursiveFont LargeFont Padding">Total Paid: <strong>${totalPaid} </strong></div>
                                <div className="CursiveFont LargeFont Padding">Total Revenue: <strong className="PinkFont">${totalRevenue} </strong></div>
                            </div>

                            <div className="CursiveFont LargeFont PinkFont Padding">Active Enrollments: <strong>{totalActiveEnrollments} </strong></div>

                            <div>Total Active Leaders: <strong>{activeLeaders} / {totalLeaders}</strong>  -  Total Active Users: <strong>{activeUsers} / {totalUsers}</strong></div>

                        </div>

                        <div className="MarginTop">
                            {/* Client Table Data */}
                            {patchData.table.length > 0 ? (
                                <AdminTable data={patchData} headerData={adminHeader} handleSelection={handleRowSelection} />
                            ) : (
                                    <div className="SimpleBorder">
                                        <div className="PinkFont CursiveFont LargeFont">Sorry, no clients yet!</div>
                                        <p>{"As soon as a parent selects you as their child's teacher, you will see them show up here."}</p>
                                    </div>
                                )}

                        </div>


                        <div className="Flex JustifyCenter PinkBorder MarginTop">
                            {selection ? (
                                <DetailViewAdmin data={selection} />
                            ) : (
                                    <div>Make a selection from the table to view specific details</div>
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
