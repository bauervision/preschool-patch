import React, { useState, useEffect } from "react";

import { ProfileCard } from "./ProfileCard";
import { Header } from "./Header";
import { Footer } from "./Footer";

import { Logo } from "./images";

export const PublicLanding = ({ pageUpdate, data, handleMemberSelection }) => {
  // handle local state
  const [filteredData, setFilteredData] = useState(data);
  const [filterAvail, setFilterAvail] = useState(false);
  const [filterAcceptingInfants, setFilterInfants] = useState(false);

  /* On Mount, fetch data */
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  // handleFilters
  const filterAvailable = e => {
    const checked = e.target.checked;
    setFilterAvail(checked);

    if (checked) {
      const update = filteredData.filter(
        elem => elem.public.available === "yes"
      );
      setFilteredData(update);
    } else {
      // not filtering available, but might be filtering infants
      if (filterAcceptingInfants) {
        const update = filteredData.filter(
          elem => elem.public.infants === "yes"
        );
        setFilteredData(update);
      } else {
        setFilteredData(data);
      }
    }
  };

  const filterInfants = e => {
    const checked = e.target.checked;
    setFilterInfants(checked);

    if (checked) {
      const update = filteredData.filter(elem => elem.public.infants === "yes");
      setFilteredData(update);
    } else {
      // we're not filtering infants, but we still might be filtering avail
      if (filterAvail) {
        const update = data.filter(elem => elem.public.available === "yes");
        setFilteredData(update);
      } else {
        setFilteredData(data);
      }
    }
  };

  const handleSelection = memberData => {
    // Pass current selection up to parent in order to render profile page
    handleMemberSelection(memberData);
  };

  // jump to pages
  const loginPressed = () => pageUpdate(1);
  const newAccountPressed = () => pageUpdate(2);

  return (
    <div className="PublicLanding">
      <Header pageUpdate={pageUpdate} isHome />

      <div style={{ marginBottom: 20 }}>
        <img src={Logo} alt="logo" />
        <div style={{ margin: 20 }}>
          Find a local preschool teacher for your child!
        </div>

        {/* Filter Criteria */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          {/* Filter data by zipcode */}
          <div>
            <input
              placeholder="Enter Zipcode"
              style={{ width: 100 }}
              className="InputStyle"
            />
          </div>

          <label>
            Show Only Available
            <input type="checkbox" onChange={e => filterAvailable(e)} />
          </label>

          <label>
            Accepting Infants
            <input type="checkbox" onChange={e => filterInfants(e)} />
          </label>
        </div>
      </div>

      {/* Content */}
      <div className="PublicLanding_Content">
        {filteredData.map((elem, index) => (
          <ProfileCard
            key={elem.public.name}
            data={elem}
            handleSelection={handleSelection}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
};
