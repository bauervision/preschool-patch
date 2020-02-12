import React, { useState } from 'react';

import { Select } from './index';

const KidSection = ({
    location,
    name,
    age,
    interest,
    handleSetChildName,
    handleSetChildAge,
    handleSetChildInterest
}) => {
    const [kidName, setKidName] = useState(name);
    const [kidAge, setKidAge] = useState(age);
    const [kidInterest, setInterest] = useState(interest);

    const handleName = () => {
        handleSetChildName(kidName, location);
    }

    const handleAge = () => {
        handleSetChildAge(kidAge, location)
    }

    const handleInterest = (value) => {
        setInterest(value)
        handleSetChildInterest(value, location)
    }

    return (
        <div className="Flex">

            {/* Name Input */}
            <div
                className="Flex Col "
                style={{
                    padding: 2
                }}
            >
                <div style={{ textAlign: "left" }}>
                    <label htmlFor={`Child${location + 1}Name`} className="InputTextLabel">
                        {`Child ${location + 1} Name`}:
                    </label>
                </div>

                <input
                    className="InputStyle"
                    placeholder="Please Enter a name"
                    type="text"
                    name={`Child${location + 1}Name`}
                    value={kidName}
                    onBlur={handleName}
                    onChange={(e) => setKidName(e.target.value)}
                />
            </div>

            {/* Age Input */}
            <div
                className="Flex Col "
                style={{
                    padding: 2
                }}
            >
                <div style={{ textAlign: "left" }}>
                    <label htmlFor={`Child${location}Age`} className="InputTextLabel">
                        Age:
                    </label>
                </div>

                <input
                    className="InputStyle"
                    placeholder="Enter the child's age"
                    type="number"
                    name={`Child${location}Age`}
                    value={kidAge}
                    onBlur={handleAge}
                    onChange={(e) => setKidAge(e.target.value)}
                />
            </div>

            {/* Enrollment Level Input */}
            <div
                className="Flex Col "
                style={{
                    padding: 2
                }}
            >
                <div style={{ textAlign: "left" }}>
                    <label htmlFor="EnrollSelect" className="InputTextLabel">
                        Enrollment Level:
                           </label>
                </div>

                <Select
                    data={["Select Service...", "Full-Time", "Part-Time", "Drop-In", "None"]}
                    name={`Child${location}Interest`}
                    width={130}
                    onChange={handleInterest}
                    value={kidInterest}
                />

            </div>

        </div>
    );
};

export default KidSection;