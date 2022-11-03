import {
  GET_ALL_VACCINES_FULFILLED,
  GET_ALL_VACCINES_PENDING,
  GET_ALL_VACCINES_REJECTED,
} from "redux/constants/constants";

const INITIAL_STATE = {
  isVaccinesLoading: false,
};

/**
 * Reducer for fetching vaccines
 *
 * @param {INITIAL_STATE} state
 * @param {Object} action
 *
 * @returns {Object}
 */
export const vaccineReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_VACCINES_PENDING:
      return {
        ...state,
        isVaccinesLoading: true,
      };

    case GET_ALL_VACCINES_FULFILLED:
    case GET_ALL_VACCINES_REJECTED:
      return {
        ...state,
        isVaccinesLoading: false,
      };
    default:
      return state;
  }
};
