import React, { useEffect, useState } from 'react';

import Header from './Components/Header';
import { Footer } from './Components/Footer';
import { SimpleTable } from './Components';

import { Logo, Elegant } from './images';
import { database } from './config';

const Payments = ({ loggedInUser }) => {
  const [rates, setRates] = useState(null);
  const { enrollment, children } = loggedInUser;

  // on mount, if this is a parent, grab the current rates from the teacher
  useEffect(() => {
    if (!loggedInUser.isLeader) {
      database.ref(`leaders/${enrollment.submittedTo}/public/rates`).once('value', (snap) => {
        const data = snap.val();
        if (data) {
          setRates(data);
        }
      });
    }
  }, [enrollment.submittedTo, loggedInUser.isLeader]);

  const getChildPaymentAmount = (child) => {
    // convert each enrollment string into is corresponding 2 letter idenfifier
    const getEnrollmentRate = (enrollmentLevel) => {
      switch (enrollmentLevel) {
        case 'Full-Time': return 'ft';
        case 'Part-Time': return 'pt';
        default: return 'di';
      }
    };
    return child.weekly * getEnrollmentRate(child.enrollment);
  };

  // basic header entries for the client table
  const headerData = ['Student Name', 'Age', 'Enrollment', 'Weekly Attendance'];
  // const paymentAmount = children[0]

  return (
    <div>
      <div>
        <Header isPayment loggedInUser={loggedInUser} isLeader={loggedInUser.isLeader} />

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
                <>
                  {/* Parent Account */}
                  <div>Based on your current enrollments:</div>

                  <SimpleTable data={children} headerData={headerData} isParent/>

                  <div>Your current payment is: </div>
                  {/* Paypal payment button */}
                  <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
                    <input type="hidden" name="cmd" value="_donations" />
                    <input type="hidden" name="business" value="E882Y4AK9RYR2" />
                    <input type="hidden" name="currency_code" value="USD" />
                    <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                    <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
                  </form>
                </>
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
export default Payments;
