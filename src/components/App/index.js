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
        <main className="App-main">
          <Wallet walletIndex={this.props.fromWallet} direction="from"></Wallet>
          <div className="separator">
            <Button
              type="primary"
              icon="sync"
              onClick={this.props.commitConvert}
            >
              Convert!
            </Button>
            <Rate></Rate>
          </div>
          <Wallet walletIndex={this.props.toWallet} direction="to"></Wallet>
        </main>
      </div>
    );
  }

  componentDidMount() {
    this.props.start();
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
