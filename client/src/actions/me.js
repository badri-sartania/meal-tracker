import axios from "axios";

import { api, Role } from "../config";
import { wrap } from "../utils/promise";

export const fetchMe = () => dispatch => {
  return wrap(dispatch)({
    type: "FETCH_ME_REQUEST",
    payload: axios.get(api.url("/me"))
  });
};

export const editMe = user => dispatch => {
  wrap(dispatch)({
    type: "EDIT_ME_REQUEST",
    payload: axios.put(api.url(`/me`), user)
  });

  if (user.role === Role.Admin || user.role === Role.Manager) {
    dispatch({
      type: "EDIT_USER_REQUEST_FULFILLED",
      payload: { data: user }
    });
  }
};
