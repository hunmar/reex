import { handleActions } from "redux-actions";

import {
  UPDATE_RATES,
  FROM_WALLET_CHANGED,
  TO_WALLET_CHANGED,
  FROM_WALLET_VALUE_CHANGED,
  TO_WALLET_VALUE_CHANGED,
  SET_CONVERTATION_DIRECTION,
  CONVERT,
  COMMIT_CONVERT
} from "../actions";

import {
  getCurrentExchangeRate,
  getFromWallet,
  getToWallet,
  getFromWalletBalance,
  getToWalletBalance
} from "../selectors";

export default handleActions(
  {
    [UPDATE_RATES]: (state, action) => ({ ...state, ex: action.payload }),

    [CONVERT]: (state, action) => {
      if (state.direction === "forward") {
        const maxFromValue = Math.min(
          state.fromWalletValue,
          getFromWalletBalance(state)
        );

        return {
          ...state,
          fromWalletValue: +maxFromValue.toFixed(2),
          toWalletValue: +(
            maxFromValue * getCurrentExchangeRate(state)
          ).toFixed(2)
        };
      } else {
        const fromWalletBalance = getFromWalletBalance(state);
        const maxToValue = fromWalletBalance * getCurrentExchangeRate(state);
        let acceptableValue = state.toWalletValue;

        if (state.toWalletValue > maxToValue) {
          acceptableValue = maxToValue;
        }

        return {
          ...state,
          fromWalletValue: +(
            acceptableValue / getCurrentExchangeRate(state)
          ).toFixed(2),
          toWalletValue: +acceptableValue.toFixed(2)
        };
      }
    },

    [FROM_WALLET_CHANGED]: (state, action) => ({
      ...state,
      fromWallet: action.payload
    }),

    [TO_WALLET_CHANGED]: (state, action) => ({
      ...state,
      toWallet: action.payload
    }),

    [FROM_WALLET_CHANGED]: (state, action) => ({
      ...state,
      fromWallet: action.payload
    }),

    [FROM_WALLET_VALUE_CHANGED]: (state, action) => ({
      ...state,
      fromWalletValue: action.payload
    }),

    [TO_WALLET_VALUE_CHANGED]: (state, action) => ({
      ...state,
      toWalletValue: action.payload
    }),

    [SET_CONVERTATION_DIRECTION]: (state, action) => ({
      ...state,
      direction: action.payload
    }),

    [COMMIT_CONVERT]: (state, action) => {
      let newState = { ...state, fromWalletValue: 0, toWalletValue: 0 };

      getFromWallet(newState).balance = +(
        getFromWalletBalance(newState) - state.fromWalletValue
      ).toFixed(2);

      getToWallet(newState).balance = +(
        getToWalletBalance(newState) + state.toWalletValue
      ).toFixed(2);

      return newState;
    }
  },

  {}
);
