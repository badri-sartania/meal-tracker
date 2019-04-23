import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import axios from "axios";

import store from "./store";
import { api } from "./config";
import { setCurrentUser } from "./actions/authentication";

import App from "./containers/app";
import * as serviceWorker from "./serviceWorker";

if (localStorage.jwtToken) {
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
}

axios.interceptors.request.use(
  config => {
    if (!config.headers.Authorization) {
      const token = localStorage.jwtToken;
      if (token) {
        config.headers[api.tokenLabel] = api.tokenValue(token);
      }
    }

    return config;
  },
  error => Promise.reject(error)
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
