import React from "react";
import { NavLink } from "react-router-dom";

import { APP_TITLE } from "constants/common";
import { removeUserDataFromLocalStorage } from "utils/token";

export const Navbar = (props) => {
  const Styling = (isActive = false) => {
    return { color: isActive ? "#176bb9" : "gray" };
  };

  const handleClick = () => {
    removeUserDataFromLocalStorage();
  };

  return (
    <div className="navbar">
      <div>
        <h1 className="logo">{APP_TITLE}</h1>
      </div>
      <div className="nav-items">
        <NavLink
          style={Styling}
          to={"/vaccines/add-vaccine"}
          className="add-vaccine-btn"
        >
          Add Vaccine
        </NavLink>
        <NavLink style={Styling} to={"/vaccines"}>
          Vaccines
        </NavLink>
        <NavLink style={Styling} to="/login" onClick={handleClick}>
          Logout
        </NavLink>
      </div>
    </div>
  );
};
