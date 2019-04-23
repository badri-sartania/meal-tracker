import axios from "axios";

import { api } from "../config";
import { wrap } from "../utils/promise";

export const fetchMeals = () => dispatch => {
  wrap(dispatch)({
    type: "FETCH_MEALS_REQUEST",
    payload: axios.get(api.url("/meals"))
  });
};

export const deleteMeals = ids => dispatch => {
  wrap(dispatch)({
    type: "DELETE_MEALS_REQUEST",
    payload: axios.delete(api.url("/meals"), { data: { ids } })
  });
};

export const fetchMeal = id => dispatch => {
  wrap(dispatch)({
    type: "FETCH_MEAL_REQUEST",
    payload: axios.get(api.url(`/meals/${id}`))
  });
};

export const editMeal = (id, meal) => dispatch => {
  wrap(dispatch)({
    type: "EDIT_MEAL_REQUEST",
    payload: axios.put(api.url(`/meals/${id}`), meal)
  });
};

export const createMeal = meal => dispatch => {
  wrap(dispatch)({
    type: "CREATE_MEAL_REQUEST",
    payload: axios.post(api.url("/meals"), meal)
  });
};

export const deleteMeal = id => dispatch => {
  wrap(dispatch)({
    type: "DELETE_MEAL_REQUEST",
    payload: axios.delete(api.url(`/meals/${id}`))
  });
};

export const displayMealFilter = (id, visible) => dispatch => {
  dispatch({
    type: "DISPLAY_MEAL_FILTER",
    payload: { [id]: visible }
  });
};
