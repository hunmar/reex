export const buildExUrl = state => {
  const symbols = state.wallets.reduce((acc, wallet, index) => {
    if (index !== state.fromWallet) {
      acc.push(wallet.currency);
    }

    return acc;
  }, []);

  return `https://api.exchangeratesapi.io/latest?symbols=${symbols.join(
    ","
  )}&base=${state.wallets[state.fromWallet].currency}`;
};
