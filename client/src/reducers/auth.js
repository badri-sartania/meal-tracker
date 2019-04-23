import jwt_decode from "jwt-decode";

import { isEmpty } from "../utils/json";

const initialState = {
  isFetching: false,
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "AUTHENTICATE_REQUEST_PENDING":
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        user: {}
      };
    case "AUTHENTICATE_REQUEST_FULFILLED":
      const { token } = action.payload.data;
      localStorage.setItem("jwtToken", token);
      const user = jwt_decode(token);

      return {
        ...state,
        isFetching: false,
        isAuthenticated: !isEmpty(user),
        user
      };
    case "AUTHENTICATE_REQUEST_REJECTED":
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        user: {}
      };
    case "SET_CURRENT_USER":
      return {
        ...state,
        isFetching: false,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case "LOGOUT_USER":
      localStorage.removeItem("jwtToken");
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        user: {}
      };
    default:
      return state;
  }
}
