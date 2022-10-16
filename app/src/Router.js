import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import SignUp from "pages/auth/SignUp";
import SignIn from "pages/auth/SignIn";
import { NotFound } from "pages/NotFound";

import * as routes from "constants/routes";

export const AppRouter = (props) => {
  return (
    <Routes>
      <Route path={routes.HOME} element={<Navigate to={routes.SIGN_IN} />} />
      <Route path={routes.SIGN_IN} element={<SignIn />} />
      <Route path={routes.SIGN_UP} element={<SignUp />} />
      <Route path={routes.NOT_FOUND} element={<NotFound />}></Route>
    </Routes>
  );
};
