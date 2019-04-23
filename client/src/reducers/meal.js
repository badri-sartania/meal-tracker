const initialState = {
  isFetching: false,
  meals: [],
  mealToEdit: {},
  displayedFilters: {}
};

export default function(state = initialState, action) {
  let updatedMeals;

  switch (action.type) {
    case "FETCH_MEALS_REQUEST_PENDING":
      return {
        ...state,
        isFetching: true,
        meals: []
      };
    case "FETCH_MEALS_REQUEST_FULFILLED":
      return {
        ...state,
        isFetching: false,
        meals: action.payload.data || []
      };
    case "FETCH_MEALS_REQUEST_REJECTED":
      return {
        ...state,
        isFetching: false,
        meals: []
      };
    case "DELETE_MEALS_REQUEST_PENDING":
      return {
        ...state,
        isFetching: true
      };
    case "DELETE_MEALS_REQUEST_FULFILLED":
      updatedMeals = state.meals.filter(
        meal => action.payload.data.indexOf(meal.id) < 0
      );
      return {
        ...state,
        isFetching: false,
        meals: updatedMeals
      };
    case "DELETE_MEALS_REQUEST_REJECTED":
      return {
        ...state,
        isFetching: false
      };
    case "CREATE_MEAL_REQUEST_PENDING":
    case "FETCH_MEAL_REQUEST_PENDING":
    case "EDIT_MEAL_REQUEST_PENDING":
    case "DELETE_MEAL_REQUEST_PENDING":
      return {
        ...state,
        isFetching: true,
        mealToEdit: {}
      };
    case "FETCH_MEAL_REQUEST_FULFILLED":
      updatedMeals = state.meals.map(meal => {
        if (meal.id !== action.payload.data.id) {
          return meal;
        }
        return { ...meal, ...action.payload.data };
      });
      return {
        ...state,
        isFetching: false,
        meals: updatedMeals,
        mealToEdit: action.payload.data
      };
    case "EDIT_MEAL_REQUEST_FULFILLED":
      updatedMeals = state.meals.map(meal => {
        if (meal.id !== action.payload.data.id) {
          return meal;
        }
        return { ...meal, ...action.payload.data };
      });

      return {
        ...state,
        isFetching: false,
        meals: updatedMeals,
        mealToEdit: {}
      };
    case "CREATE_MEAL_REQUEST_FULFILLED":
      return {
        ...state,
        isFetching: false,
        meals: [...state.meals, action.payload.data]
      };
    case "DELETE_MEAL_REQUEST_FULFILLED":
      updatedMeals = state.meals.filter(
        meal => meal.id !== action.payload.data.id
      );
      return {
        ...state,
        isFetching: false,
        meals: updatedMeals
      };
    case "CREATE_MEAL_REQUEST_REJECTED":
    case "FETCH_MEAL_REQUEST_REJECTED":
    case "EDIT_MEAL_REQUEST_REJECTED":
    case "DELETE_MEAL_REQUEST_REJECTED":
      return {
        ...state,
        isFetching: false,
        mealToEdit: {}
      };
    case "DISPLAY_MEAL_FILTER":
      return {
        ...state,
        displayedFilters: {
          ...state.displayedFilters,
          ...action.payload
        }
      };
    default:
      return state;
  }
}
