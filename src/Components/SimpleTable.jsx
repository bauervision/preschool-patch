import React from 'react';
import { Checked, Unchecked } from "../images"

const SimpleTable = ({ data }) => {
    const { headerData, bodyData } = data;

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
                {bodyData.map((value, index) => (
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
                                                        <span className="TT_Text">Email Parent</span>
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