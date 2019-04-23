import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./auth";
import mealReducer from "./meal";
import userReducer from "./user";
import meReducer from "./me";
import errorReducer from "./error";

const appReducer = combineReducers({
  auth: authReducer,
  meal: mealReducer,
  user: userReducer,
  me: meReducer,
  error: errorReducer,
  form: formReducer
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT_USER") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
