import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import React, { StrictMode } from "react";

import "antd/dist/antd.css";

import App from "./App";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);
