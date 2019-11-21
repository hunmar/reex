import React, { Component } from "react";

import { connect } from "react-redux";

import { Carousel } from "antd";

import "./Wallet.css";

import { changeFromWallet, changeToWallet } from "../actions";

const mapDispatchToProps = (dispatch, props) => ({
  change: newIndex =>
    dispatch(
      props.direction === "from"
        ? changeFromWallet(newIndex)
        : changeToWallet(newIndex)
    )
});

const mapStateToProps = state => ({
  wallets: state.wallets
});

/**
 * @class Wallet
 * @extends {Component}
 */
class Wallet extends Component {
  constructor(props) {
    super(props);

    this.carouselRef = React.createRef();
  }

  handleChange(newIndex) {
    this.props.change(newIndex);
  }

  render() {
    return (
      <React.Fragment>
        <Carousel
          ref={this.carouselRef}
          beforeChange={(fromt, to) => this.handleChange(to)}
          arrows={true}
          swipeToSlide={true}
          customPaging={index => (
            <span>{this.props.wallets[index].currency}</span>
          )}
        >
          {this.props.wallets.map((wallet, index) => (
            <div key={index}>
              <h3>
                {wallet.currency} — {wallet.balance}
              </h3>
            </div>
          ))}
        </Carousel>
        {this.props.children}
      </React.Fragment>
    );
  }

  componentDidMount() {
    this.carouselRef.current.goTo(this.props.walletIndex, true);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
