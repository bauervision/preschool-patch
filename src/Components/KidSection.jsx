import React, { useState } from 'react';

import { Select } from './index';

const KidSection = ({
  location,
  name,
  year,
  month,
  day,
  interest,
  handleSetChildName,
  handleSetBirthYear,
  handleSetBirthMonth,
  handleSetBirthDay,
  handleSetChildInterest
}) => {
  const [kidName, setKidName] = useState(name);
  const [kidByear, setKidByear] = useState(year);
  const [kidBmonth, setKidBmonth] = useState(month);
  const [kidBday, setKidBday] = useState(day);
  const [kidInterest, setInterest] = useState(interest);

  const handleName = () => handleSetChildName(kidName, location);
  const handleYear = () => handleSetBirthYear(kidByear, location);

  const handleBirthMonth = (value) => {
    setKidBmonth(value);
    handleSetBirthMonth(value, location);
  };

  const handleBirthDay = () => handleSetBirthDay(kidBday, location);

  const handleInterest = (value) => {
    setInterest(value);
    handleSetChildInterest(value, location);
  };

  return (
    <div className="Flex MobileRowToCol">

      {/* Name Input */}
      <div
        className="Flex Col">
        <div className="TextLeft">
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


      {/* Birth Month Input */}
      <div
        className="Flex Col "
        style={{
          padding: 2
        }}
      >
        <div style={{ textAlign: 'left' }}>
          <label htmlFor={`Child${location}Age`} className="InputTextLabel">
                        Birth Month:
          </label>
        </div>

        <Select
          data={['Select Month...', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']}
          name={`Child${location}BirthMonth`}
          width={130}
          onChange={handleBirthMonth}
          value={kidBmonth}
        />
      </div>

      {/* Birth Day Input */}
      <div
        className="Flex Col "
        style={{
          padding: 2
        }}
      >
        <div style={{ textAlign: 'left' }}>
          <label htmlFor={`Child${location}BirthDay`} className="InputTextLabel">
                        Birth Day:
          </label>
        </div>

        <input
          style={{ width: 50 }}
          className="InputStyle"
          type="number"
          name={`Child${location}BirthDay`}
          value={kidBday}
          onBlur={handleBirthDay}
          onChange={(e) => setKidBday(e.target.value)}
        />
      </div>

      {/* Year Input */}
      <div
        className="Flex Col "
        style={{
          padding: 2
        }}
      >
        <div style={{ textAlign: 'left' }}>
          <label htmlFor={`Child${location}Year`} className="InputTextLabel">
                        Year:
          </label>
        </div>

        <input
          style={{ width: 50 }}
          className="InputStyle"
          type="number"
          name={`Child${location}BirthYear`}
          value={kidByear}
          onBlur={handleYear}
          onChange={(e) => setKidByear(e.target.value)}
        />
      </div>

      {/* Enrollment Level Input */}
      <div
        className="Flex Col "
        style={{
          padding: 2
        }}
      >
        <div style={{ textAlign: 'left' }}>
          <label htmlFor="EnrollSelect" className="InputTextLabel">
                        Enrollment Level:
          </label>
        </div>

        <Select
          data={['Select Service...', 'Full-Time', 'Part-Time', 'Drop-In', 'None']}
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
