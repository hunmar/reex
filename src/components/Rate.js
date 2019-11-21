import React, { Component } from "react";

import { connect } from "react-redux";

// import { Carousel, InputNumber } from "antd";

// import "./Rate.css";

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = state => ({
  rate: state.ex.rates[state.wallets[state.toWallet].currency],
  fromCurrency: state.wallets[state.fromWallet].currency,
  toCurrency: state.wallets[state.toWallet].currency
});

/**
 * @class Rate
 * @extends {Component}
 */
class Rate extends Component {
  render() {
    const { rate, fromCurrency, toCurrency } = this.props;

    return <div>{`1 ${fromCurrency} = ${rate} ${toCurrency}`}</div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rate);
