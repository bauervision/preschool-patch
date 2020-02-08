import React from "react";
import { Ratings } from "../Components";
import { Checked, Unchecked } from "../images";

const DetailViewAdmin = ({ data }) => {
    const {
        private: { lastLogin, joined, email, payoutData },
        public: { age, available, enrollment, experience, infants, kidTotal, pageLink, phone, photoUrl, rates, rating, name, isLeader, children, zipcode } } = data;

    let init = 0;
    const earnerRevenue = (payoutData && payoutData.reduce((a, c) => a + c.revenue, init)) || 0;
    let init2 = 0;
    const earnerTotal = (payoutData && payoutData.reduce((a, c) => a + c.earned, init2)) || 0;
    let init3 = 0;
    const earnerPaid = (payoutData && payoutData.reduce((a, c) => a + c.amount, init3)) || 0;

    return (
        <div className="Flex Col">

            <div className="Flex  AlignItems">
                {/* Profile Pic */}
                <div className="Flex Col JustifyCenter AlignItems Buffer ">
                    <img alt="profile pic" className="AdminPic" src={photoUrl} />
                    <div className="PinkFont CursiveFont LargeFont">{name}</div>
                </div>

                {/* Data row 1*/}
                <div className="Flex Col AlignItems Buffer TextLeft" >

                    {isLeader && (
                        <div className="textMargin">
                            <Ratings rating={rating} />
                        </div>

                    )}

                    <div className="textMargin">
                        <span className="profileText">Email: </span>
                        <strong>{email}</strong>
                    </div>
                    <div className="textMargin">
                        <span className="profileText">Joined On: </span>
                        <strong>{joined}</strong>
                    </div>
                    <div className="textMargin">
                        <span className="profileText">Last Login: </span>
                        <strong>{lastLogin}</strong>
                    </div>
                    <div className="textMargin">
                        <span className="profileText">Phone: </span>
                        <strong>{phone}</strong>
                    </div>
                    <div className="textMargin">
                        <span className="profileText">Zipcode: </span>
                        <strong>{zipcode}</strong>
                    </div>

                </div>

                {/* Data row Earnings*/}
                <div className="Flex Col AlignItems Buffer ">
                    {isLeader && (
                        <div className="TextRight">
                            <div className="textMargin">
                                <span className="profileText">Total Earnings: </span>
                                <strong className="Price MediumFont PinkFont">${earnerTotal}</strong>
                            </div>
                            <div className="textMargin">
                                <span className="profileText">Total Paid: </span>
                                <strong className="Price MediumFont PinkFont">${earnerPaid}</strong>
                            </div>

                            <div className="textMargin">
                                <span className="profileText">Total Revenue: </span>
                                <strong className="Price MediumFont PinkFont">${earnerRevenue}</strong>
                            </div>

                            <div className="textMargin">
                                <span className="profileText">Total Kids Enrolled: </span>
                                <strong className="Price MediumFont PinkFont">{kidTotal}</strong>
                            </div>

                            <div className="textMargin">
                                <span className="profileText">Age: </span>
                                <strong className="Price MediumFont PinkFont">{age}</strong>
                            </div>

                            <div className="textMargin">
                                <span className="profileText">Years of Experience: </span>
                                <strong className="Price MediumFont PinkFont">{experience}</strong>
                            </div>


                        </div>
                    )}





                </div>

            </div>

            {/* Bottom row */}
            <div className="Flex Col JustifyCenter AlignItems">
                {isLeader ? (
                    <div className="Flex Col JustifyCenter AlignItems">

                        <div className="textMargin">
                            <span className="profileText">Rates: </span>
                            <strong className=" MediumFont PinkFont">{rates.ft} . {rates.pt} . {rates.di}</strong>
                        </div>


                        <div className="Flex JustifyCenter AlignItems">
                            <div className="textMargin  Flex AlignItems">
                                <span className="profileText">Available?:</span>
                                <img src={available ? Checked : Unchecked} alt="checkbox" />
                            </div>

                            <div className="textMargin  Flex AlignItems">
                                <span className="profileText">Accepting Infants?:</span>
                                <img src={infants ? Checked : Unchecked} alt="checkbox" />
                            </div>

                            <button type="button" onClick={() => alert(`Go to ${pageLink}`)}>Go to Social Page</button>

                            <button type="button" onClick={() => alert(`Messaging ${name}`)}>{`Message ${name}`}</button>
                        </div>
                    </ div>
                ) : (
                        <div className="Flex  JustifyCenter AlignItems">
                            <div className="textMargin  Flex AlignItems Padding">
                                <span className="profileText">Children Enrolled: </span>
                                <strong className="Price MediumFont PinkFont">{(children && children.length) || 0}</strong>
                            </div>

                            <div className="textMargin  Flex AlignItems Padding">
                                <span className="profileText">Enrolled With: </span>
                                <strong className="CursiveFont MediumFont PinkFont">{enrollment.submittedToName || "No one yet"}</strong>
                            </div>
                        </div>
                    )}

            </div>

            <div>
                <button className="FakeButton" type="button" onClick={() => alert(`Disabling ${name}`)}>Disable Account</button>
            </div>

        </div>
    );
};
export default DetailViewAdmin;