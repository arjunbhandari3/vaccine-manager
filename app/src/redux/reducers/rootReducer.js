import { combineReducers } from "redux";

import { vaccineReducer } from "./vaccineReducer";

export const rootReducer = combineReducers({ vaccine: vaccineReducer });
