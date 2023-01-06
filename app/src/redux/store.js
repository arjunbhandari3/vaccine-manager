import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import {
  compose,
  applyMiddleware,
  legacy_createStore as createStore,
} from "redux";

import rootReducer from "./reducers/rootReducer";

import { APP_ENVIRONMENT, PRODUCTION } from "constants/env";

const enhancers = [applyMiddleware(thunk, promise)];

if (APP_ENVIRONMENT !== PRODUCTION && window.__REDUX_DEVTOOLS_EXTENSION__) {
  enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}

const store = createStore(rootReducer, compose(...enhancers));

export default store;
