import thunk from "redux-thunk";
import { persistStore } from "redux-persist";
import promise from "redux-promise-middleware";
import {
  compose,
  applyMiddleware,
  legacy_createStore as createStore,
} from "redux";

import rootReducer from "./reducers/rootReducer";

import { PRODUCTION } from "constants/common";

const enhancers = [applyMiddleware(thunk, promise)];

if (
  process.env.REACT_APP_ENV !== PRODUCTION &&
  window.__REDUX_DEVTOOLS_EXTENSION__
) {
  enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}

const store = createStore(rootReducer, compose(...enhancers));

const persistor = persistStore(store);

export { store, persistor };
