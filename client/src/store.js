import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import promiseMiddleware from "redux-promise-middleware";
import rootReducer from "./reducers";

const inititalState = {};

const store = createStore(
  rootReducer,
  inititalState,
  applyMiddleware(thunk, promiseMiddleware())
);

export default store;
