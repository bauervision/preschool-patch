import React, { useEffect, useState } from 'react';


import { withRouter } from 'react-router-dom';
import Header from './Components/Header';
import { Footer } from './Components/Footer';
import { SimpleTable } from './Components';

import { Logo, Elegant } from './images';
import { database } from './config';


const Payments = ({ loggedInUser, emailVerified }) => {
  const [rates, setRates] = useState(null);
  const [payments, setPayments] = useState(null);
  const [childrenUpdated, setChildrenUpdated] = useState([]);

  const { enrollment, children } = loggedInUser;


  // on mount, if this is a parent, grab the current rates from the teacher
  useEffect(() => {
    if (!loggedInUser.isLeader) {
      // grab the rates
      database.ref(`leaders/${enrollment?.submittedTo}/public/rates`).once('value', (snap) => {
        const data = snap.val();
        if (data) {
          setRates(data);
        }
      });

      // and grab our payment data
      database.ref(`users/${loggedInUser.id}/private/payoutData`).once('value', (snap) => {
        const data = snap.val();
        if (data) {
          setPayments(data);
        }
      });
    }
  }, [enrollment, loggedInUser.id, loggedInUser.isLeader]);


  // run through each child and generate the payment due.
  useEffect(() => {
    const updatedChildren = [...children];
    updatedChildren.forEach((child) => {
      const getEnrollmentRate = (level) => {
        switch (level) {
          case 'Full-Time': return rates?.ft;
          case 'Part-Time': return rates?.pt;
          default: return rates?.di;
        }
      };

      child.payment = child.weekly * getEnrollmentRate(child.enrollment);
    });

    setChildrenUpdated(updatedChildren);
  }, [children, rates]);


  const paymentDue = childrenUpdated.length > 0 ? childrenUpdated.reduce((acc, curValue) => acc.payment + curValue.payment) : 0;


  return (
    <div>
      <div>
        <Header isPayment loggedInUser={loggedInUser} isLeader={loggedInUser.isLeader} emailVerified={emailVerified}/>

        {/* Top Left Title */}
        <div className="CursiveFont SuperFont TextLeft Buffer " style={{ marginLeft: 30 }}>Preschool Patch</div>

        {/* Page Data*/}
        <div
          className="Flex AlignItems SeeThru "
          style={{
            justifyContent: 'space-evenly',

          }}
        >


          {/* Page Title */}
          <div className="Flex Col Buffer MarginTop">
            <div>
              <div className="CursiveFont SuperFont PinkFont">Payments</div>

            </div>

            <div className="Margins">
              {loggedInUser.isLeader ? (
                <>
                  {/* Leader account */}
                  <div>{"View recent payments you've received"}</div>
                  <div>Payments Shown Here </div>
                </>
              ) : (
                <div className="Flex Col JustifyCenter">
                  {/* Parent Account */}
                  <div className="CursiveFont LargeFont">Based on your current enrollments:</div>

                  <SimpleTable
                    data={childrenUpdated}
                    headerData={['Student Name', 'Age', 'Enrollment', 'Weekly Attendance', 'Payment Due']}
                    isParent
                  />

                  <div className="CursiveFont LargeFont Margins">
                    Your current payment due is: <span className="PinkFont MediumFont">${paymentDue}</span>
                  </div>

                  <div className="MarginSmall">In the Paypal window that opens, you can enter your payment amount above to make your weekly required payment.</div>

                  {/* Paypal payment button */}
                  <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
                    <input type="hidden" name="cmd" value="_donations" />
                    <input type="hidden" name="business" value="E882Y4AK9RYR2" />
                    <input type="hidden" name="currency_code" value="USD" />
                    <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                    <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
                  </form>

                  <div className="Margins Flex Col">
                    <div className="CursiveFont LargeFont">Recent Payments:</div>

                    <SimpleTable
                      data={payments}
                      headerData={['Date', 'Amount']}
                      isParent
                      showPayments
                    />

                  </div>
                </div>
              ) }


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
export default withRouter(Payments);
