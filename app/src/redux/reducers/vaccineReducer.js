import { GET_ALL_VACCINES_FULFILLED } from "redux/constants/constants";

const INITIAL_STATE = {
  vaccines: [],
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
    case GET_ALL_VACCINES_FULFILLED:
      return {
        ...state,
        vaccines: action.payload,
      };
    default:
      return state;
  }
};
