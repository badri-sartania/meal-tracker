import axios from "axios";

import { api } from "../config";
import { wrap } from "../utils/promise";

export const fetchUsers = () => dispatch => {
  wrap(dispatch)({
    type: "FETCH_USERS_REQUEST",
    payload: axios.get(api.url("/users"))
  });
};

export const deleteUsers = ids => dispatch => {
  wrap(dispatch)({
    type: "DELETE_USERS_REQUEST",
    payload: axios.delete(api.url("/users"), { data: { ids } })
  });
};

export const fetchUser = id => dispatch => {
  wrap(dispatch)({
    type: "FETCH_USER_REQUEST",
    payload: axios.get(api.url(`/users/${id}`))
  });
};

export const editUser = (id, user) => dispatch => {
  return wrap(dispatch)({
    type: "EDIT_USER_REQUEST",
    payload: axios.put(api.url(`/users/${id}`), user)
  });
};

export const createUser = user => dispatch => {
  return wrap(dispatch)({
    type: "CREATE_USER_REQUEST",
    payload: axios.post(api.url("/users"), user)
  });
};

export const deleteUser = id => dispatch => {
  wrap(dispatch)({
    type: "DELETE_USER_REQUEST",
    payload: axios.delete(api.url(`/users/${id}`))
  });
};
