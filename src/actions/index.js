let timer = null;

export const start = () => dispatch => {
  clearInterval(timer);
  timer = setInterval(() => dispatch(getRates()), 1000);
  //   dispatch({ type: TIMER_START });
  dispatch(getRates());
};

export const getRates = () => dispatch => {
  //   dispatch(requestPosts());
  return fetch("https://api.exchangeratesapi.io/latest?symbols=USD,GBP")
    .then(
      response => response.json(),
      error => console.log("An error occurred.", error)
    )
    .then(json => {
      //   dispatch(receivedPosts(json));

      dispatch({
        type: "SIMPLE_ACTION",
        payload: JSON.stringify(json)
      });
    });
};
