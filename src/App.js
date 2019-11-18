import React, { Component } from "react";
import { connect } from "react-redux";

import { Carousel } from "antd";
import "antd/dist/antd.css";

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

        <Carousel>
          <div>
            <h3>USD</h3>
          </div>
          <div>
            <h3>GBP</h3>
          </div>
          <div>
            <h3>EUR</h3>
          </div>
        </Carousel>

        <Carousel>
          <div>
            <h3>USD</h3>
          </div>
          <div>
            <h3>GBP</h3>
          </div>
          <div>
            <h3>EUR</h3>
          </div>
        </Carousel>
      </div>
    );
  }

  componentDidMount() {
    this.props.start();
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
