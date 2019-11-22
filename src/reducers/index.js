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

    case SET_CONVERTATION_DIRECTION:
      return {
        ...state,
        direction: action.payload
      };

    case COMMIT_CONVERT:
      let newState = { ...state, fromWalletValue: 0, toWalletValue: 0 };

      getFromWallet(newState).balance = +(
        getFromWalletBalance(newState) - state.fromWalletValue
      ).toFixed(2);
      getToWallet(newState).balance = +(
        getToWalletBalance(newState) + state.toWalletValue
      ).toFixed(2);

      return newState;

    default:
      return state;
  }
};
