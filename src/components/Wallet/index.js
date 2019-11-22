import React, { Component } from "react";

import { connect } from "react-redux";

import { Carousel, InputNumber } from "antd";

import "./Wallet.css";

import { changeFromWallet, changeToWallet, inputChanged } from "../../actions";

const mapDispatchToProps = (dispatch, props) => ({
  change: newIndex =>
    dispatch(
      props.direction === "from"
        ? changeFromWallet(newIndex)
        : changeToWallet(newIndex)
    ),
  inputChanged: (direction, value) => dispatch(inputChanged(direction, value))
});

const mapStateToProps = (state, props) => ({
  wallets: state.wallets,
  walletValue:
    props.direction === "from" ? state.fromWalletValue : state.toWalletValue
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

  getPrefix() {
    return this.props.direction === "from" ? "−" : "+";
  }

  render() {
    return (
      <React.Fragment>
        <Carousel
          ref={this.carouselRef}
          dotPosition={"top"}
          beforeChange={(from, to) => this.handleChange(to)}
          swipeToSlide={true}
          customPaging={index => (
            <span>{this.props.wallets[index].currency}</span>
          )}
        >
          {this.props.wallets.map((wallet, index) => (
            <div key={index}>
              <div className="wallet">
                <span className="wallet__balance">{`${wallet.balance}`}</span>
                <div className="wallet__input" data-prefix={this.getPrefix()}>
                  <InputNumber
                    defaultValue={0}
                    precision={2}
                    min={0}
                    value={this.props.walletValue}
                    onChange={value =>
                      this.props.inputChanged(this.props.direction, value)
                    }
                  ></InputNumber>
                </div>
              </div>
            </div>
            //   U want give — U will revieve
            //   u will give — U want give
          ))}
        </Carousel>
      </React.Fragment>
    );
  }

  componentDidMount() {
    this.carouselRef.current.goTo(this.props.walletIndex, true);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
