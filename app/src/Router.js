import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "pages/Home";
import NotFound from "pages/NotFound";
import SignUp from "pages/auth/SignUp";
import SignIn from "pages/auth/SignIn";
import AuthorizedRoute from "components/AuthorizedRoute";

import * as routes from "constants/routes";

const AppRouter = () => {
  return (
    <Routes>
      <Route path={routes.SIGN_IN} element={<SignIn />} />
      <Route path={routes.SIGN_UP} element={<SignUp />} />

      <Route
        path={routes.HOME}
        element={
          <AuthorizedRoute>
            <Home />
          </AuthorizedRoute>
        }
      />

      <Route path={routes.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
