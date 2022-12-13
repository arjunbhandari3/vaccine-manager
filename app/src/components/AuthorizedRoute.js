import { Navigate, useLocation } from "react-router-dom";

import { isUserLoggedIn } from "utils/token";

import * as routes from "constants/routes";

const AuthorizedRoute = ({ children }) => {
  const location = useLocation();
  const isLoggedIn = isUserLoggedIn();

  if (!isLoggedIn) {
    return (
      <Navigate
        to={{ pathname: routes.SIGN_IN, state: { from: location } }}
        replace
      />
    );
  }

  return children;
};

export default AuthorizedRoute;
