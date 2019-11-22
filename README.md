# Revolut Exchange

[⚡️Demo](https://reex.now.sh)

App created with [Create React App](https://github.com/facebookincubator/create-react-app) which was replaced in the start scripts by **react-app-rewired** to make the use of the external components library easier

## How to run

```zsh
git clone git@github.com:hunmar/reex.git
cd reex
npm i
npm start
```

## Available features

- Regulary updated rates from [exchangeratesapi.io](exchangeratesapi.io)
- An opportunity to choose how much you want to spend (top input) or to get (bottom input)
- The limitation of your spending amount according to your account
- On-demand import of the components. Lower bundles’ sizes -> lower TTI -> Happy user 👬

## The ideas that should be tested and could be realised in the further iterations

- The user can save the amount they want to get in the bottom wallet and change the currency in the top one to see how much they need to exchange
- The automatic reset when the user changes the currency in any wallet

## Known issues

- The external components library which should be replaced by the new one designed for this very case
- No typescript
- Only one test written in this code
