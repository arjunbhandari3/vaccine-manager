import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "pages/Layout";
import SignUp from "pages/auth/SignUp";
import SignIn from "pages/auth/SignIn";
import { NotFound } from "pages/NotFound";
import { Vaccines } from "pages/vaccine/Vaccines";
import { AddVaccine } from "pages/vaccine/AddVaccine";
import { EditVaccine } from "pages/vaccine/EditVaccine";
import AuthorizedRoute from "components/AuthorizedRoute";

import * as routes from "constants/routes";

export const AppRouter = (props) => {
  return (
    <Routes>
      <Route path={routes.HOME} element={<Navigate to={routes.SIGN_IN} />} />
      <Route path={routes.SIGN_IN} element={<SignIn />} />
      <Route path={routes.SIGN_UP} element={<SignUp />} />
      {/* <Route path={routes.HOME} element={<AuthorizedRoute />}> */}
      <Route path={routes.HOME} element={<Layout />}>
        <Route path={routes.VACCINES} element={<Vaccines />} />
        <Route path={routes.ADD_VACCINE} element={<AddVaccine />} />
        <Route path="/vaccines/:id/edit-vaccine" element={<EditVaccine />} />
      </Route>
      {/* </Route> */}
      <Route path={routes.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
};
