let timer = null;

export const UPDATE_RATES = "UPDATE_RATES";
export const FROM_WALLET_CHANGED = "FROM_WALLET_CHANGED;";
export const TO_WALLET_CHANGED = "FROM_WALLET_CHANGED";

export const start = () => dispatch => {
  clearInterval(timer);
  timer = setInterval(() => dispatch(getRates()), 10000);
  //   dispatch({ type: TIMER_START });
  dispatch(getRates());
};

export const getRates = () => (dispatch, getState) => {
  //   dispatch(requestPosts());
  const state = getState();

  return fetch(
    `https://api.exchangeratesapi.io/latest?symbols=USD,GBP,EUR&base=${
      state.wallets[state.fromWallet].currency
    }`
  )
    .then(
      response => response.json(),
      error => console.log("An error occurred.", error)
    )
    .then(json => {
      //   dispatch(receivedPosts(json));

      dispatch({
        type: UPDATE_RATES,
        payload: json
      });
    });
};

export const changeFromWallet = newIndex => dispatch => {
  dispatch({ type: FROM_WALLET_CHANGED, payload: newIndex });
  dispatch(getRates());
};

export const changeToWallet = newIndex => dispatch => {
  dispatch({ type: TO_WALLET_CHANGED, payload: newIndex });
};
