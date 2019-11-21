import React, { Component } from "react";
import { connect } from "react-redux";

import { InputNumber } from "antd";

import Wallet from "./components/Wallet";
import Rate from "./components/Rate";

// import logo from "./logo.svg";
import "./App.css";

import { start } from "./actions";

const mapDispatchToProps = dispatch => ({
  start: () => dispatch(start())
});

const mapStateToProps = state => ({
  ...state
});

/**
 * @class App
 * @extends {Component}
 */
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Welcome to ReEx</h1>
        </header>

        <pre>{JSON.stringify(this.props)}</pre>

        <Wallet walletIndex={this.props.fromWallet} direction="from">
          <InputNumber
            defaultValue={0}
            precision={2}

            //   onChange={onChange}
          ></InputNumber>
        </Wallet>
        <Rate></Rate>
        <Wallet walletIndex={this.props.toWallet} direction="to">
          <InputNumber
            defaultValue={0}
            precision={2}

            //   onChange={onChange}
          ></InputNumber>
        </Wallet>
      </div>
    );
  }

  componentDidMount() {
    this.props.start();
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
