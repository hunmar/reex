import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import configureStore from "./store/index";
import initialState from "./store/initialState";

import App from "./components/App";

import "./index.css";

ReactDOM.render(
  <Provider store={configureStore(initialState)}>
    <App />
  </Provider>,

  document.getElementById("root")
);
