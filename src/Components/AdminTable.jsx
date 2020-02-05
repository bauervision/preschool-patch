import React, { useState, useEffect } from 'react';
import { Checked, Unchecked } from "../images"

const AdminTable = ({ data, headerData, handleSelection }) => {


    // handle incoming myMessages and sort the data for the left column
    useEffect(() => {
        // sort by date, earliest at the top
        data.table.sort((a, b) => a.name - b.name)
    }, [data]);


    return (

        <table >
            <thead>
                <tr>
                    {headerData.map((header) => (
                        <th key={header}>
                            {header}
                        </th>

                    ))}
                </tr>
            </thead>


            {/* Create the rows of data */}
            <tbody>

                {data.table.map((value, index) => (
                    <tr key={value.name + index} onClick={() => handleSelection(value)}>

                        {/* Now grab the data elements for each column */}
                        {Object.keys(value).map(function (key) {
                            return (

                                <td key={key + index.toString()} >
                                    {value[key]}
                                </td>

                            );
                        })}

                    </tr>
                ))}
            </tbody>

        </table>
    )

}
export default AdminTable;