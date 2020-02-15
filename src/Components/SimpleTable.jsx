import React, { useState, useEffect } from 'react';
import moment from 'moment'
import { Checked, Unchecked } from "../images"

const SimpleTable = ({ data, headerData, handleSelection }) => {

    const [childData, setChildData] = useState([]);

    useEffect(() => {
        setNewEntries();
        // eslint-disable-next-line
    }, [data]);

    const getChildAge = (year, month, day) => {
        const momentBirthday = moment(`${year.toString()}-${month}-${day.toString()}`);
        return moment().diff(momentBirthday, 'years', false);

    }

    // grab current data and format table data
    const setNewEntries = () => {
        let childData = [];
        if (data) {
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
                        childData.push(newEntry);

                    })
                }


            });

            setChildData(childData)
        }

    }


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
                    <tr key={value.name + index} onClick={() => handleSelection(value)}>

                        {/* Now grab the data elements for each column */}
                        {Object.keys(value).map(function (key) {

                            return (

                                <td key={key} >

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
    )

}
export default SimpleTable;