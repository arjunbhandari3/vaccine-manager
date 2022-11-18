import React from "react";

import { handleError } from "utils/error";
import * as authService from "services/auth";

import { APP_TITLE } from "constants/common";

const Navbar = (props) => {
  const handleLogout = async () => {
    try {
      await authService.signOut();
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="navbar">
      <h1 className="logo">{APP_TITLE}</h1>
      <div className="nav-items">
        <ul>
          <li className="nav-item cursor-pointer" onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
