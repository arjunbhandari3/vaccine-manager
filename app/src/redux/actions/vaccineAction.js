import { createAction } from "redux-actions";

import * as vaccineService from "services/vaccine";

import { GET_ALL_VACCINES } from "../constants/constants";

export const getAllVaccines = createAction(
  GET_ALL_VACCINES,
  vaccineService.getAllVaccines
);
