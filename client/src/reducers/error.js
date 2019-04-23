import { getErrorData } from "../utils/json";

const initialState = {
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "SET_ERROR":
      return {
        ...state,
        error: getErrorData(action.payload)
      };
    case "RESET_ERROR":
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
}
