import React from "react";
import { NavLink } from "react-router-dom";

import { removeUserDataFromLocalStorage } from "utils/token";

import * as routes from "constants/routes";
import { APP_TITLE } from "constants/common";

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
          to={routes.ADD_VACCINE}
          className="add-vaccine-btn"
        >
          Add Vaccine
        </NavLink>
        <NavLink style={Styling} to={routes.HOME}>
          Vaccines
        </NavLink>
        <NavLink style={Styling} to={routes.SIGN_IN} onClick={handleClick}>
          Logout
        </NavLink>
      </div>
    </div>
  );
};
