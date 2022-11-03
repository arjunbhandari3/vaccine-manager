import { combineReducers } from "redux";

import { vaccineReducer } from "./vaccineReducer";

const uiReducer = combineReducers({ vaccine: vaccineReducer });

export default uiReducer;
