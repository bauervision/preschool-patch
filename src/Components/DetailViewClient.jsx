import React from "react";
import moment from 'moment';
import { database } from "../config";
import { Checked, Unchecked } from "../images";

const DetailViewClient = ({ selection, enrollmentData, handleEnrollment, handleSelection, pageUpdate }) => {

    const { clientData: { children, enrollment, email, phone, photoUrl, name, zipcode } } = selection;


    const decideEnrollment = (accepted) => {

        const rightNow = moment().toDate().getTime();
        const userId = selection.clientId;
        const leaderId = enrollment.submittedTo;

        if (accepted) {
            // setup new enrollment value for the user
            const acceptedEnrollmentUser = {
                accepted: true, // <-
                dateAccepted: rightNow,// <-
                dateSubmitted: enrollment.dateSubmitted,
                submitted: true,// <-
                submittedTo: enrollment.submittedTo,
                submittedToName: enrollment.submittedToName
            }

            // push to user's DB
            database.ref(`users/${userId}/public/enrollment`).set(acceptedEnrollmentUser);

            // find this particular client
            const updateClientData = [...enrollmentData];
            const index = updateClientData.findIndex((elem) => elem.clientId === selection.clientId)

            // now setup and update our DB
            const acceptedClientData = {
                accepted: true, // set new data
                active: true, // <-
                children: updateClientData[index].children,
                clientId: updateClientData[index].clientId,
                dateSubmitted: updateClientData[index].dateSubmitted,
                joinedOn: rightNow, // <-
                name: updateClientData[index].name,
                photoUrl: updateClientData[index].photoUrl,
                submitted: updateClientData[index].submitted
            }
            // update
            updateClientData[index] = acceptedClientData;

            // finally push the new client to the teacher so they will know about it
            database.ref(`leaders/${leaderId}/public/clients`).set(updateClientData);

            // now pass up to parent for updating state and displaying the toast
            const updatedSelection = selection;
            updatedSelection.enrollment = acceptedEnrollmentUser;

            handleEnrollment(true, updateClientData, updatedSelection);
        } else {
            // we have rejected the enrollment

            handleEnrollment(false);
        }

    }

    // we want to dis-enroll the parent and the children
    const handleRemoval = () => {
        console.log("Unenroll ", selection)
    }

    const messageClient = () => {
        handleSelection(selection);
        pageUpdate(6)
    }

    return (
        <div className="Flex Col">

            {/* Profile Pic and core data */}
            <div className="Flex  AlignItems">
                {/* Profile Pic */}
                <div className="Flex Col JustifyCenter AlignItems Buffer ">
                    <img alt="profile pic" className="AdminPic" src={photoUrl} />
                    <div className="PinkFont CursiveFont LargeFont">{name}</div>
                </div>

                {/* Data row 1*/}
                <div className="Flex Col AlignItems Buffer TextLeft" >
                    <div className="textMargin">
                        <span className="profileText">Email: </span>
                        <strong>{email}</strong>
                    </div>
                    <div className="textMargin">
                        <span className="profileText">Phone: </span>
                        <strong>{phone}</strong>
                    </div>
                    <div className="textMargin">
                        <span className="profileText">Zipcode: </span>
                        <strong>{zipcode}</strong>
                    </div>
                    <div className="textMargin">
                        <span className='profileText'>Enrolled: </span>
                        <strong className={!enrollment.accepted && 'PinkFont'}>{(enrollment.accepted && moment(enrollment.dateAccepted).fromNow()) || "Not yet!"}</strong>
                    </div>
                </div>
            </div>

            {/* Show all children enrolled */}
            <div>
                <span className="CursiveFont MediumFont">{!enrollment.accepted ? 'Wants to Enroll the Following:' : 'Enrolled Children'} </span>
                {children.map((child) => (
                    <div key={child.name} className="textMargin Padding">
                        <span className="profileText Padding">Name:  <strong>{child.name}</strong>  </span>
                        <span className="profileText Padding"> Age: <strong>{child.age}</strong></span>
                        <span className="profileText Padding">{child.enrollment} </span>
                    </div>
                ))}
            </div>

            {/* Accept Client*/}
            <div className="Flex Col AlignItems " >

                {!enrollment.accepted && (
                    <div className="PinkBorder">
                        {/* if not yet accepted, show accept/reject buttons */}
                        <span className="profileText">Accept Client Enrollment: </span>
                        <div>
                            <button title="Accept the client's enrollment request!" className="CheckBox " type="button" onClick={() => decideEnrollment(true)}>
                                <img src={Checked} alt="checkbox" />
                            </button>

                            <button title="Deny the client's enrollment request" className="CheckBox " type="button" onClick={() => decideEnrollment(false)}>
                                <img src={Unchecked} alt="checkbox" />
                            </button>
                        </div>
                    </div>

                )}

            </div>

            {/* Buttons at the bottom */}
            <div className="Flex JustifyCenter AlignItems ">
                <button type="button" onClick={messageClient}>{`Message ${name}`}</button>

                {/* Once enrolled, we may want to remove the enrollment */}
                {enrollment.accepted && (
                    <button
                        title="Remove the enrollment for this parent."
                        type="button"
                        onClick={handleRemoval}>
                        Remove Enrollment
                    </button>
                )}
            </div>

        </div >
    );
};
export default DetailViewClient;