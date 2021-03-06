import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Checked, Unchecked } from '../images';

const SimpleTable = ({ data, headerData, handleSelection, isParent, showPayments }) => {
  const [childData, setChildData] = useState([]);


  const getChildAge = (year, month, day) => {
    if (year && month && day) {
      const momentBirthday = moment(`${year.toString()}-${month}-${day.toString()}`);
      return moment().diff(momentBirthday, 'years', false);
    }
    return 'Unknown';
  };

  // grab current data and format table data
  const setNewEntries = () => {
    const childUpdate = [];
    if (data) {
      // if a teacher
      if (!isParent) {
      // for each parent in client data...
        data.forEach((parent) => {
        // loop through each child and create a new entry
          if (parent.clientData?.children.length > 0) {
            parent.clientData.children.forEach((child) => {
              const childAge = getChildAge(child.year, child.month, child.day);
              const newEntry = {
                name: child.name,
                age: childAge,
                parent: parent.clientData.name,
                phone: parent.clientData.phone,
                enrollment: child.enrollment,
                active: parent.clientData.enrollment.accepted
              };
              // push this child onto array
              childUpdate.push(newEntry);
            });
          }
        });
      } else {
        // is a parent
        data.forEach((item) => {
          const childAge = getChildAge(item.year, item.month, item.day);

          let newEntry = {};
          if (showPayments) {
            newEntry = {
              date: moment(item.date).format('MM/DD/YYYY'),
              amount: `$${item.amount}`,
            };
          } else {
            newEntry = {
              name: item.name,
              age: childAge,
              enrollment: item.enrollment,
              weekly: item.weekly,
              payment: item.payment
            };
          }

          // push this child onto array
          childUpdate.push(newEntry);
        });
      }

      setChildData(childUpdate);
    }
  };

  useEffect(() => {
    setNewEntries();
    // eslint-disable-next-line
    }, [data]);

  return (

    <table >
      <thead>
        <tr >
          {headerData.map((header) => (
            <th key={header}>
              {header}
            </th>

          ))}
        </tr>
      </thead>


      {/* Create the rows of data */}
      <tbody>

        {childData && childData.map((value, index) => (
          <tr key={value.name + index} onClick={() => handleSelection && handleSelection(value)}>

            {/* Now grab the data elements for each column */}
            {Object.keys(value).map((key, oIndex) => {
              return (

                <td key={oIndex} >

                  {key === 'active' ? (
                    <div className="Tooltip">
                      <span className="TT_Text">Set Student status</span>
                      <img src={value[key] === true ? Checked : Unchecked} alt="checkbox" />

                    </div>
                  ) : (value[key])}

                </td>

              );
            })}

          </tr>
        ))}
      </tbody>

    </table>
  );
};
export default SimpleTable;
