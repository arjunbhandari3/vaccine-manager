import "tests/mocks/matchMedia";

import {
  compose,
  applyMiddleware,
  legacy_createStore as createStore,
} from "redux";
import React from "react";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import promise from "redux-promise-middleware";
import { render } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";

import reducers from "redux/reducers/rootReducer";

const enhancer = compose(...[applyMiddleware(thunk, promise)]);

const renderWithStore = (
  component,
  initialEntries = ["/"],
  {
    initialState,
    store = createStore(reducers, initialState, enhancer),
    ...renderOptions
  } = {}
) => {
  return render(
    <Provider store={store}>
      <Router initialEntries={initialEntries}>{component}</Router>
    </Provider>,
    renderOptions
  );
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { renderWithStore as render };
