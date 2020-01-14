import React, { useState, useEffect } from 'react';
import { Checked, Unchecked } from "../images"

const SimpleTable = ({ data }) => {

    const [childData, setChildData] = useState([]);

    // basic header entries
    const headerData = ["Student Name", "Parent Name", "Contact Number", "Enrollment", "Active"];


    useEffect(() => {
        setNewEntries();
        // eslint-disable-next-line
    }, [data]);

    // grab current data and format table data
    const setNewEntries = () => {
        let childData = [];
        if (data) {
            // for each parent in client data...
            data.forEach((parent) => {

                // loop through each child and create a new entry
                parent.children.forEach((child) => {
                    const newEntry = {
                        name: child.name,
                        parent: parent.name,
                        phone: parent.phone,
                        enrollment: child.enrollment,
                        active: child.status
                    };
                    // push this child onto array
                    childData.push(newEntry);

                })

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
                    <tr key={value.name + index} >

                        {/* Now grab the data elements for each column */}
                        {Object.keys(value).map(function (key) {
                            return (

                                <td key={key} >

                                    {key === 'active' ? (
                                        <div className="Tooltip">
                                            <span className="TT_Text">Set Student status</span>
                                            <img src={value[key] === true ? Checked : Unchecked} alt="checkbox" />

                                        </div>
                                    ) : (
                                            <>
                                                {key === 'parent' ? (
                                                    <div className="Tooltip">
                                                        <span className="TT_Text">Message Parent</span>
                                                        <button>{value[key]}</button>
                                                    </div>
                                                ) : (
                                                        value[key]
                                                    )}
                                            </>

                                        )}

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