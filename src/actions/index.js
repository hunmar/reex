import { createAction } from "redux-actions";

import { buildExUrl, fixSelfConvertation } from "./helpers";

let timer = null;

export const UPDATE_RATES = createAction("UPDATE_RATES");

export const SET_CONVERTATION_DIRECTION = createAction(
  "SET_CONVERTATION_DIRECTION"
);

export const CONVERT = createAction("CONVERT");
export const COMMIT_CONVERT = createAction("COMMIT_CONVERT");

export const FROM_WALLET_CHANGED = createAction("FROM_WALLET_CHANGED");
export const TO_WALLET_CHANGED = createAction("TO_WALLET_CHANGED");

export const FROM_WALLET_VALUE_CHANGED = createAction(
  "FROM_WALLET_VALUE_CHANGED"
);
export const TO_WALLET_VALUE_CHANGED = createAction("TO_WALLET_VALUE_CHANGED");

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
      .then(json => fixSelfConvertation(state, json))
      .then(json => {
        dispatch(UPDATE_RATES(json));
        dispatch(CONVERT());
      })
      .catch(error => console.log("An error occurred.", error))
  );
};

export const changeFromWallet = newIndex => dispatch => {
  dispatch(FROM_WALLET_CHANGED(newIndex));
  dispatch(getRates());
};

export const changeToWallet = newIndex => dispatch => {
  dispatch(TO_WALLET_CHANGED(newIndex));
  dispatch(CONVERT());
};

export const inputChanged = (direction, value) => dispatch => {
  if (direction === "from") {
    dispatch(FROM_WALLET_VALUE_CHANGED(value));
    SET_CONVERTATION_DIRECTION("forward");
  } else {
    dispatch(TO_WALLET_VALUE_CHANGED(value));
    SET_CONVERTATION_DIRECTION("backward");
  }

  dispatch(CONVERT());
};

export const commitConvert = () => dispatch => dispatch(COMMIT_CONVERT());
