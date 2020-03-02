import React, { useState } from 'react';
import moment from 'moment';
import { database } from '../config';
import { Checked, Unchecked } from '../images';

const DetailViewClient = ({ selection, enrollmentData, handleEnrollment, handleSelection, pageUpdate, userId }) => {
  const [unEnrolling, setUnEnrolling] = useState(false);

  const { clientData: { children, enrollment, email, phone, photoUrl, name, zipcode } } = selection;

  const selClientId = selection.clientId;

  const decideEnrollment = (accepted) => {
    const rightNow = moment().toDate().getTime();

    // find this particular client
    let updateClientData = [...enrollmentData];
    let selectionEnrollment = {};

    // handle decisions on the data
    if (accepted) {
      // setup new enrollment value for the user
      selectionEnrollment = { ...enrollment, accepted: true, dateAccepted: rightNow, submitted: true };
      const index = updateClientData.findIndex((elem) => elem.clientId === selection.clientId);
      // now setup and update our DB
      const acceptedClientData = { ...updateClientData[index], accepted: true, active: true, joinedOn: rightNow };
      // update
      updateClientData[index] = acceptedClientData;
    } else {
      // we have rejected the enrollment
      // reset users enrollment status
      selectionEnrollment = { submitted: false };
      // find this particular client from the leader
      updateClientData = [...enrollmentData];
      const index = updateClientData.findIndex((elem) => elem.clientId === selection.clientId);
      // remove them permanently
      updateClientData.splice(index, 1);
    }

    // hit both BD endpoints to update the data
    database.ref(`users/${selClientId}/public/enrollment`).set(selectionEnrollment);
    database.ref(`leaders/${userId}/public/clients`).set(updateClientData);

    // now pass up to parent for updating state and displaying the toast
    // first update the clientData.enrollment
    const updatedEnrollment = { ...selection.clientData, enrollment: selectionEnrollment };
    // then update the selection object with the new clientData
    const updatedSelection = { ...selection, clientData: updatedEnrollment };
    handleEnrollment(accepted, updateClientData, updatedSelection);
  };

  // we want to dis-enroll the parent and the children
  const handleRemoval = () => {
    // reset users enrollment status
    database.ref(`users/${selClientId}/public/enrollment`).set({ submitted: false });

    // now find this client in our data, and remove them
    const updateClientData = [...enrollmentData];
    const index = updateClientData.findIndex((elem) => elem.clientId === selection.clientId);
    updateClientData.splice(index, 1);

    // finally push the new client to the teacher so they will know about it
    database.ref(`leaders/${userId}/public/clients`).set(updateClientData);
  };

  const messageClient = () => {
    handleSelection(selection);
    pageUpdate(6);
  };


  const getChildAge = (year, month, day) => {
    if (year && month && day) {
      const momentBirthday = moment(`${year.toString()}-${month}-${day.toString()}`);
      return moment().diff(momentBirthday, 'years', false);
    }
    return 'Unknown';
  };

  return (
    <div className="Flex Col">

      {/* Profile Pic and core data */}
      <div className="Flex JustifyCenter AlignItems">
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
            <strong className={!enrollment.accepted && 'PinkFont'}>{(enrollment.accepted && moment(enrollment.dateAccepted).fromNow()) || 'Not yet!'}</strong>
          </div>
        </div>
      </div>

      {/* Show all children enrolled */}
      <div>
        <span className="CursiveFont LargeFont">{!enrollment.accepted ? 'Wants to Enroll the Following:' : 'Enrolled Children'} </span>
        {children.map((child) => {
          const childAge = getChildAge(child.year, child.month, child.day);
          const birthDay = child.month && child.day ? (`${child.month}/${child.day}`) : 'Unknown';
          return (
            <div key={child.name} className="textMargin Padding">
              <span className="profileText Padding">Name:  <strong>{child.name}</strong>  </span>
              <span className="profileText Padding"> Age: <strong>{childAge}</strong></span>
              <span className="profileText Padding"> Birthday: <strong>{birthDay}</strong></span>
              <span className="profileText Padding">{child.enrollment} </span>
            </div>
          );
        })}
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
            className={`${unEnrolling && 'PinkBorder'}`}
            title="Remove the enrollment for this parent."
            type="button"
            onClick={() => setUnEnrolling(!unEnrolling)}>
            {`${!unEnrolling ? 'Remove Enrollment' : 'Cancel'}`}
          </button>
        )}
      </div>

      {unEnrolling && (
        <div className="Flex Col JustifyCenter AlignItems">
          <span>Unenrolling this parent will completely remove their account from your record.</span>
          <span>To re-enroll, the parent will have to re-submit another enrollment request to you.</span>
          <span>Please be sure you want to do this.</span>

          <button
            className="HalfSize"
            title="Confirm unenrollment for this parent."
            type="button"
            onClick={handleRemoval}>
                        I understand, Remove
          </button>
        </div>

      )}

    </div >
  );
};
export default DetailViewClient;
