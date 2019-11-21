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

export default (state = {}, action) => {
  switch (action.type) {
    case UPDATE_RATES:
      return { ...state, ex: action.payload };

    case FROM_WALLET_CHANGED:
      return { ...state, fromWallet: action.payload };

    case TO_WALLET_CHANGED:
      return { ...state, toWallet: action.payload };

    case FROM_WALLET_VALUE_CHANGED:
      return {
        ...state,
        fromWalletValue: action.payload
      };

    case TO_WALLET_VALUE_CHANGED:
      return {
        ...state,
        toWalletValue: action.payload
      };

    case CONVERT:
      if (state.direction === "forward") {
        return {
          ...state,
          toWalletValue: +(
            state.fromWalletValue * getCurrentExchangeRate(state)
          ).toFixed(2)
        };
      } else {
        return {
          ...state,
          fromWalletValue: +(
            state.toWalletValue / getCurrentExchangeRate(state)
          ).toFixed(2)
        };
      }

    case SET_CONVERTATION_DIRECTION:
      return {
        ...state,
        direction: action.payload
      };

    case COMMIT_CONVERT:
      let newState = { ...state, fromWalletValue: 0, toWalletValue: 0 };

      getFromWallet(newState).balance =
        getFromWalletBalance(newState) - state.fromWalletValue;
      getToWallet(newState).balance =
        getToWalletBalance(newState) + state.toWalletValue;

      return newState;

    default:
      return state;
  }
};
