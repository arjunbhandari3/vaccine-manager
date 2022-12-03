import { Button } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PoweroffOutlined } from "@ant-design/icons";

import { handleError } from "utils/error";
import * as authService from "services/auth";
import { showSuccessNotification } from "utils/notification";

import * as routes from "constants/routes";
import { APP_TITLE, SUCCESS, SUCCESSFULLY_SIGNED_OUT } from "constants/common";

const Navbar = (props) => {
  const navigate = useNavigate();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await authService.signOut();

      navigate(routes.SIGN_IN, { replace: true });

      showSuccessNotification(SUCCESS, SUCCESSFULLY_SIGNED_OUT);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="navbar">
      <h1 className="logo">{APP_TITLE}</h1>
      <div className="nav-items">
        <ul>
          <Button
            type="primary"
            icon={<PoweroffOutlined />}
            loading={isLoggingOut}
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            Logout
          </Button>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
