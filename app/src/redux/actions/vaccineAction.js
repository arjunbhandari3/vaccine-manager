import { createAction } from "redux-actions";

import * as vaccineService from "services/vaccine";

import { GET_ALL_VACCINES, GET_VACCINE_COUNT } from "../constants/constants";

export const getAllVaccines = createAction(
  GET_ALL_VACCINES,
  vaccineService.getAllVaccines
);

export const getVaccineCount = createAction(
  GET_VACCINE_COUNT,
  vaccineService.getVaccineCount
);
