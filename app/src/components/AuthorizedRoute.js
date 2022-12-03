import { Navigate } from "react-router-dom";

import { isUserLoggedIn } from "utils/token";

import * as routes from "constants/routes";

const AuthorizedRoute = ({ children }) => {
  const isLoggedIn = isUserLoggedIn();

  return isLoggedIn ? children : <Navigate to={routes.SIGN_IN} replace />;
};

export default AuthorizedRoute;
