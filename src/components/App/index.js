import React, { Component } from "react";
import { connect } from "react-redux";

import { Button } from "antd";

import Wallet from "../Wallet";
import Rate from "../Rate";

// import logo from "./logo.svg";
import "./App.css";

import { start, commitConvert } from "../../actions";

const mapDispatchToProps = dispatch => ({
  start: () => dispatch(start()),

  commitConvert: () => dispatch(commitConvert())
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

        <Wallet walletIndex={this.props.fromWallet} direction="from"></Wallet>
        <div className="separator">
          <Rate></Rate>
          <Button type="primary" icon="sync" onClick={this.props.commitConvert}>
            Convert!
          </Button>
        </div>
        <Wallet walletIndex={this.props.toWallet} direction="to"></Wallet>
      </div>
    );
  }

  componentDidMount() {
    this.props.start();
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
