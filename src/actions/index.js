import { buildExUrl } from "./helpers";

let timer = null;

export const UPDATE_RATES = "UPDATE_RATES";

export const FROM_WALLET_CHANGED = "FROM_WALLET_CHANGED;";
export const TO_WALLET_CHANGED = "FROM_WALLET_CHANGED";

export const FROM_WALLET_VALUE_CHANGED = "FROM_WALLET_VALUE_CHANGED";
export const TO_WALLET_VALUE_CHANGED = "TO_WALLET_VALUE_CHANGED";

export const SET_CONVERTATION_DIRECTION = "SET_CONVERTATION_DIRECTION";

export const CONVERT = "CONVERT";
export const COMMIT_CONVERT = "COMMIT_CONVERT";

export const start = () => dispatch => {
  clearInterval(timer);
  timer = setInterval(() => dispatch(getRates()), 10000);

  dispatch(getRates());
};

export const getRates = () => (dispatch, getState) => {
  const state = getState();

  return (
    fetch(buildExUrl(state))
      .then(response => response.json())
      // workaround cause sometimes API wont raturn values for symbols same as base
      .then(json => {
        json.rates[state.wallets[state.fromWallet].currency] = 1;

        return json;
      })
      .then(json => {
        dispatch({
          type: UPDATE_RATES,
          payload: json
        });

        dispatch({ type: CONVERT });
      })
      .catch(error => console.log("An error occurred.", error))
  );
};

export const changeFromWallet = newIndex => dispatch => {
  dispatch({ type: FROM_WALLET_CHANGED, payload: newIndex });
  dispatch(getRates());
};

export const changeToWallet = newIndex => dispatch => {
  dispatch({ type: TO_WALLET_CHANGED, payload: newIndex });
  dispatch({ type: CONVERT });
};

export const inputChanged = (direction, value) => dispatch => {
  if (direction === "from") {
    dispatch({ type: FROM_WALLET_VALUE_CHANGED, payload: value });
    dispatch({ type: SET_CONVERTATION_DIRECTION, payload: "forward" });
  } else {
    dispatch({ type: TO_WALLET_VALUE_CHANGED, payload: value });
    dispatch({ type: SET_CONVERTATION_DIRECTION, payload: "backward" });
  }

  dispatch({ type: CONVERT });
};

export const commitConvert = () => dispatch =>
  dispatch({ type: COMMIT_CONVERT });
