import { combineReducers } from "redux";

import { vaccineReducer } from "./vaccineReducer";

const dataReducer = combineReducers({ vaccine: vaccineReducer });

export default dataReducer;
