export const wrap = dispatch => (...args) => {
  dispatch({
    type: "RESET_ERROR"
  });

  return dispatch(...args).catch(error => {
    dispatch({
      type: "SET_ERROR",
      payload: error
    });
    throw error;
  });
};
