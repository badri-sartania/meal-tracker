import axios from "axios";

import { api } from "../config";
import { wrap } from "../utils/promise";

export const registerUser = user => dispatch => {
  return wrap(dispatch)({
    type: "AUTHENTICATE_REQUEST",
    payload: axios.post(api.url("/signup"), user)
  });
};

export const loginUser = user => dispatch => {
  return wrap(dispatch)({
    type: "AUTHENTICATE_REQUEST",
    payload: axios.post(api.url("/signin"), user)
  });
};

export const setCurrentUser = decoded => {
  return {
    type: "SET_CURRENT_USER",
    payload: decoded
  };
};

export const logoutUser = () => dispatch => {
  dispatch({
    type: "LOGOUT_USER"
  });
};
