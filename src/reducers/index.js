import {
  UPDATE_RATES,
  FROM_WALLET_CHANGED,
  TO_WALLET_CHANGED
} from "../actions";

export default (state = {}, action) => {
  switch (action.type) {
    case UPDATE_RATES:
      return { ...state, ex: action.payload };
    case FROM_WALLET_CHANGED:
      return { ...state, fromWallet: action.payload };
    case TO_WALLET_CHANGED:
      return { ...state, toWallet: action.payload };
    default:
      return state;
  }
};
