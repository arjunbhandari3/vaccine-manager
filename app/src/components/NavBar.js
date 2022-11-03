import React from "react";
import { NavLink } from "react-router-dom";

import { handleError } from "utils/error";
import * as authService from "services/auth";

import * as routes from "constants/routes";
import { APP_TITLE } from "constants/common";

export const Navbar = (props) => {
  const Styling = (isActive = false) => {
    return { color: isActive ? "#176bb9" : "gray" };
  };

  const handleLogout = async () => {
    try {
      await authService.signOut();
      window.location.href = routes.SIGN_IN;
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="navbar">
      <h1 className="logo">{APP_TITLE}</h1>
      <div className="nav-items">
        <NavLink style={Styling} to={routes.HOME}>
          Vaccines
        </NavLink>
        <NavLink style={Styling} to={routes.SIGN_IN} onClick={handleLogout}>
          Logout
        </NavLink>
      </div>
    </div>
  );
};
