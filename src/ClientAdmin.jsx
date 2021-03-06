import React, { useState, useEffect } from 'react';

import { withRouter } from 'react-router-dom';
import Header from './Components/Header';
import { Footer } from './Components/Footer';
import { Toast, Ratings, SimpleTable, DetailViewClient } from './Components';


import { Corner, Logo, Elegant } from './images';
import { database } from './config';

const ClientAdmin = ({ emailVerified, loggedInUser, myMessages, loadingClients, clientData, handleMemberSelection, userId, launchToast, updateSuccess }) => {
  const [clientState, setClientState] = useState([]);
  const [clientDataState, setClientDataState] = useState([]);
  const [selection, setSelection] = useState(null);

  // pull out public data
  const { clients, rating } = loggedInUser && loggedInUser;

  // handle any children updates from our clients: they may have added, or removed some
  useEffect(() => {
    if (loggedInUser) {
      if (clients) {
        const updatedClients = [...clients];
        // check to make sure that we have an update list of children for each client
        updatedClients.forEach((client) => {
          // now check the receiptants array
          database.ref(`users/${client.clientId}/public/children`).once('value', (snap) => {
            const data = snap.val();
            if (client.children.length !== data.length) {
              // if children has updated
              client.children = data;
            }
          });
        });
        setClientState(updatedClients);
      }
    }
  }, [clients, loggedInUser]);

  // store client data right away into state as long as we've logged in
  useEffect(() => {
    if (loggedInUser) {
      setClientDataState(clientData);
    }
  }, [clientData, loggedInUser]);


  const handleRowSelection = (memberData) => {
    const selectedClient = clientDataState.find((elem) => elem.clientData.name === memberData.parent);
    setSelection(selectedClient);
  };

  // handle whether we accept or reject an enrollment request
  const handleEnrollment = (accepted, updatedClientData, updatedClient) => {
    // then update our data as well
    if (accepted) {
      // first
      updateSuccess(true, 'Congrats! You have a new Client!');
    } else {
      updateSuccess(true, 'Please email a reason to the parent');
    }

    setClientDataState(updatedClientData);
    setClientState(updatedClient);
  };

  // basic header entries for the client table
  const clientHeader = ['Student Name', 'Age', 'Parent Name', 'Contact Number', 'Enrollment', 'Active'];

  return (
    <div>
      <div>
        <Header isAdmin loggedInUser={loggedInUser} isLeader={true} myMessages={myMessages} userId={userId} emailVerified={emailVerified}/>

        <div className="CursiveFont SuperFont TextLeft Buffer " style={{ marginLeft: 30 }}>Client Admin</div>

        {/* Client Data*/}
        <div
          className="Flex AlignItems SeeThru MarginTopMobileHome"

        >

          {/* My Clients */}
          <div className="Flex Col Buffer MarginTop ">
            <div>
              <div className="CursiveFont SuperFont PinkFont">My Clients</div>
              <Ratings rating={rating}/>
            </div>


            {loadingClients ? (
              <div className="Flex Col JustifyCenter AlignItems">
                <img src={Corner} alt='corner' className='filter-pink Rotate Alert' style={{ width: 50, height: 'auto', zIndex: 0, paddingRight: 10 }} />
              </div>
            ) : (
              <>
                <div className="MarginTop">
                  {/* Client Table Data */}
                  {(clientDataState?.length > 0) ? (
                    <SimpleTable data={clientDataState} headerData={clientHeader} handleSelection={handleRowSelection} />
                  ) : (
                    <div className="SimpleBorder MarginBottom">
                      <div className="PinkFont CursiveFont LargeFont">Sorry, no clients yet!</div>
                      <p>{"As soon as a parent selects you as their child's teacher, you will see them show up here."}</p>
                    </div>
                  )}

                </div>

                {clientState.length > 0 && (
                  <div className={`Flex JustifyCenter  MarginTop ${selection ? 'PinkBorder' : ''}`}>
                    {selection ? (
                      <DetailViewClient
                        enrollmentData={clientState}
                        selection={selection}
                        handleEnrollment={handleEnrollment}
                        handleSelection={handleMemberSelection}
                        userId={userId} />
                    ) : (
                      <div>Make a selection from the table to view specific details about the client</div>
                    )}

                  </div>
                )}

              </>
            )}


          </div>


        </div>

        <img src={Elegant} alt="decorative" className="filter-green Margins responsive" />

      </div>

      <div className="Buffer">
        <img src={Logo} alt="logo" className="responsive" />
      </div>

      <Footer />
      <Toast showToast={launchToast.value} message={launchToast.message} />
    </div>
  );
};
export default withRouter(ClientAdmin);
