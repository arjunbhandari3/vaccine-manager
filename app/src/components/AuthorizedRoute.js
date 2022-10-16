import { Navigate, Outlet } from "react-router-dom";

import { isUserLoggedIn } from "utils/token";

import * as routes from "constants/routes";

const AuthorizedRoute = () => {
  const isLoggedIn = isUserLoggedIn();

  return isLoggedIn ? <Outlet /> : <Navigate to={routes.SIGN_IN} />;
};

export default AuthorizedRoute;
