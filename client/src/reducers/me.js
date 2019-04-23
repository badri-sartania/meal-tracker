const initialState = {
  isFetching: false,
  meUser: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "FETCH_ME_REQUEST_PENDING":
    case "EDIT_ME_REQUEST_PENDING":
      return {
        ...state,
        isFetching: true,
        meUser: {}
      };
    case "FETCH_ME_REQUEST_FULFILLED":
    case "EDIT_ME_REQUEST_FULFILLED":
      return {
        ...state,
        isFetching: false,
        meUser: action.payload.data || {}
      };
    case "FETCH_ME_REQUEST_REJECTED":
    case "EDIT_ME_REQUEST_REJECTED":
      return {
        ...state,
        isFetching: false,
        meUser: {}
      };
    default:
      return state;
  }
}
