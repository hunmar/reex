export const getFromWallet = state => state.wallets[state.fromWallet];
export const getFromWalletCurrency = state => getFromWallet(state).currency;
export const getFromWalletBalance = state => getFromWallet(state).balance;

export const getToWallet = state => state.wallets[state.toWallet];
export const getToWalletCurrency = state => getToWallet(state).currency;
export const getToWalletBalance = state => getToWallet(state).balance;

export const getCurrentExchangeRate = state =>
  state.ex.rates[getToWalletCurrency(state)];
