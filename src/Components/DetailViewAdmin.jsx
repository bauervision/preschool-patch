import React from "react";
import { Ratings } from "../Components";

const DetailViewAdmin = ({ data }) => {
    const {
        private: { lastLogin, joined, email, payoutData },
        public: { age, available, experience, infants, kidTotal, phone, photoUrl, rates, rating, name, isLeader } } = data;

    let init = 0;
    const earnerRevenue = (payoutData && payoutData.reduce((a, c) => a + c.revenue, init)) || 0;
    let init2 = 0;
    const earnerTotal = (payoutData && payoutData.reduce((a, c) => a + c.earned, init2)) || 0;
    let init3 = 0;
    const earnerPaid = (payoutData && payoutData.reduce((a, c) => a + c.amount, init3)) || 0;

    return (
        <>
            {/* Profile Pic */}
            <div className="Flex Col JustifyCenter AlignItems Buffer ">
                <img alt="profile pic" className="Card_Pic" src={photoUrl} />
                <span>{name}</span>
            </div>

            {/* Data row 1*/}
            <div className="Flex Col Buffer " style={{ textAlign: "left" }}>

                {isLeader && (
                    <div className="textMargin">
                        <Ratings rating={rating} />
                    </div>

                )}

                <div className="textMargin">
                    <span className="profileText">Email:</span>
                    <strong>{email}</strong>
                </div>
                <div className="textMargin">
                    <span className="profileText">Joined On:</span>
                    <strong>{joined}</strong>
                </div>
                <div className="textMargin">
                    <span className="profileText">Last Login:</span>
                    <strong>{lastLogin}</strong>
                </div>

                {isLeader && (
                    <>
                        <div className="textMargin">
                            <span className="profileText">Total Earnings:</span>
                            <strong>{earnerTotal}</strong>
                        </div>
                        <div className="textMargin">
                            <span className="profileText">Total Paid:</span>
                            <strong>{earnerPaid}</strong>
                        </div>

                        <div className="textMargin">
                            <span className="profileText">Total Revenue:</span>
                            <strong>{earnerRevenue}</strong>
                        </div>

                        <div className="textMargin">
                            <span className="profileText">Total Kids Enrolled:</span>
                            <strong>{kidTotal}</strong>
                        </div>

                        <div className="textMargin">
                            <span className="profileText">Age:</span>
                            <strong>{age}</strong>
                        </div>

                        <div className="textMargin">
                            <span className="profileText">Years of Experience:</span>
                            <strong>{experience}</strong>
                        </div>

                        <div className="textMargin">
                            <span className="profileText">Available?:</span>
                            <strong>{available.toString()}</strong>
                        </div>

                        <div className="textMargin">
                            <span className="profileText">Accepting Infants?:</span>
                            <strong>{infants.toString()}</strong>
                        </div>
                    </>
                )}

                <div className="textMargin">
                    <span className="profileText">Phone:</span>
                    <strong>{phone}</strong>
                </div>



            </div>
        </>
    );
};
export default DetailViewAdmin;