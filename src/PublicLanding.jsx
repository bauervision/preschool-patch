import React, { useState, useEffect } from "react";

import { ProfileCard } from "./ProfileCard";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";

import { Logo } from "./images";

//import { Coloring, Kids, Table, Working } from "./images/photos";
// const images = [
//   { src: { Coloring }, info: "First Image" },
//   { src: { Kids }, info: "Second Image" },
//   { src: { Table }, info: "Third Image" },
//   { src: { Working }, info: "Fourth Image" }
// ];

export const PublicLanding = ({
  pageUpdate,
  data,
  handleMemberSelection,
  handleLogin,
  handleLogOut,
  loggedInUser
}) => {
  // handle local state
  const [filteredData, setFilteredData] = useState(data);
  const [filterAvail, setFilterAvail] = useState(false);
  const [filterAcceptingInfants, setFilterInfants] = useState(false);

  /* On Mount, fetch data, check login */
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

  return (
    <div className="PublicLanding">
      <Header
        pageUpdate={pageUpdate}
        isHome
        loggedInUser={loggedInUser}
        handleLogOut={handleLogOut}
      />

      <div style={{ marginBottom: 20 }}>
        <div className="Flex AlignItems Buffer">
          <img
            src={Logo}
            alt="logo"
            className="Logo"
            style={{ width: 600, height: "auto" }}
          />
          <div style={{ margin: 20 }}>
            Find a local preschool teacher for your child!
          </div>
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
      <div className="PublicLanding_Content BoxShadow ">
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
