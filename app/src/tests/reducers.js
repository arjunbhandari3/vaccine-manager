import { initialState } from "tests/constants";
import {
  GET_ALL_VACCINES_PENDING,
  GET_ALL_VACCINES_REJECTED,
  GET_ALL_VACCINES_FULFILLED,
  GET_VACCINE_COUNT_FULFILLED,
} from "redux/constants/constants";

export default function reducers(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_VACCINES_FULFILLED:
      return {
        ...state,
        data: {
          ...state.data,
          vaccine: {
            ...state.data.vaccine,
            vaccines: action.payload.data,
          },
        },
        ui: {
          ...state.ui,
          vaccine: {
            ...state.ui.vaccine,
            isVaccinesLoading: false,
          },
        },
      };

    case GET_ALL_VACCINES_PENDING:
      return {
        ...state,
        ui: {
          ...state.ui,
          vaccine: {
            ...state.ui.vaccine,
            isVaccinesLoading: true,
          },
        },
      };

    case GET_ALL_VACCINES_REJECTED:
      return {
        ...state,
        ui: {
          ...state.ui,
          vaccine: {
            ...state.ui.vaccine,
            isVaccinesLoading: false,
          },
        },
      };

    case GET_VACCINE_COUNT_FULFILLED:
      return {
        ...state,
        data: {
          ...state.data,
          vaccine: {
            ...state.data.vaccine,
            vaccineCount: action.payload.data,
          },
        },
      };

    default:
      return state;
  }
}
