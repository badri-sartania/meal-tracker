const initialState = {
  isFetching: false,
  users: [],
  userToEdit: {}
};

export default function(state = initialState, action) {
  let updatedUsers;

  switch (action.type) {
    case "FETCH_USERS_REQUEST_PENDING":
      return {
        ...state,
        isFetching: true,
        users: []
      };
    case "FETCH_USERS_REQUEST_FULFILLED":
      return {
        ...state,
        isFetching: false,
        users: action.payload.data || []
      };
    case "FETCH_USERS_REQUEST_REJECTED":
      return {
        ...state,
        isFetching: false,
        users: []
      };
    case "DELETE_USERS_REQUEST_PENDING":
      return {
        ...state,
        isFetching: true
      };
    case "DELETE_USERS_REQUEST_FULFILLED":
      updatedUsers = state.users.filter(
        user => action.payload.data.indexOf(user.id) < 0
      );
      return {
        ...state,
        isFetching: false,
        users: updatedUsers
      };
    case "DELETE_USERS_REQUEST_REJECTED":
      return {
        ...state,
        isFetching: false
      };
    case "FETCH_USER_REQUEST_PENDING":
      return {
        ...state,
        isFetching: true,
        userToEdit: {}
      };
    case "CREATE_USER_REQUEST_PENDING":
    case "EDIT_USER_REQUEST_PENDING":
    case "DELETE_USER_REQUEST_PENDING":
      return {
        ...state,
        isFetching: true
      };
    case "CREATE_USER_REQUEST_FULFILLED":
      return {
        ...state,
        isFetching: false,
        users: [...state.users, action.payload.data]
      };
    case "FETCH_USER_REQUEST_FULFILLED":
      updatedUsers = state.users.map(user => {
        if (user.id !== action.payload.data.id) {
          return user;
        }
        return { ...user, ...action.payload.data };
      });
      return {
        ...state,
        isFetching: false,
        users: updatedUsers,
        userToEdit: action.payload.data || {}
      };
    case "EDIT_USER_REQUEST_FULFILLED":
      updatedUsers = state.users.map(user => {
        if (user.id !== action.payload.data.id) {
          return user;
        }
        return { ...user, ...action.payload.data };
      });

      return {
        ...state,
        isFetching: false,
        users: updatedUsers,
        userToEdit: {}
      };
    case "DELETE_USER_REQUEST_FULFILLED":
      updatedUsers = state.users.filter(
        user => user.id !== action.payload.data.id
      );
      return {
        ...state,
        isFetching: false,
        users: updatedUsers
      };
    case "CREATE_USER_REQUEST_REJECTED":
    case "FETCH_USER_REQUEST_REJECTED":
    case "EDIT_USER_REQUEST_REJECTED":
    case "DELETE_USER_REQUEST_REJECTED":
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
}
