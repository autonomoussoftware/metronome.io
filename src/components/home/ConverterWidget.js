import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

import DollarValue from '../common/DollarValue'
import EthValue from '../common/EthValue'
import MetValue from '../common/MetValue'

function ConverterWidget(props) {
  const { currentPrice, availableEth, availableMet, symbol } = props

  return (
    <div className="option option-convert">
      <h4>CONVERTER</h4>
      <div className="prices">
        <div className="row">
          <div className="col-12 col-sm-5 col-lg-12 col-xl-5">
            <label>Price per MET:</label>
          </div>
          <div className="col-12 col-sm-7 col-lg-12 col-xl-7">
            <div className="price met-price">
              <DollarValue>{currentPrice}</DollarValue>
            </div>
            <div className="price eth-price">
              <EthValue>{currentPrice}</EthValue>
            </div>
          </div>
        </div>
      </div>
      <div className="buy-info">
        <div className="row">
          <div className="col-12 col-sm-7 col-lg-12 col-xl-7">
            <label>Remaining MET:</label>
          </div>
          <div className="col-12 col-sm-5 col-lg-12 col-xl-5">
            <MetValue>{availableMet}</MetValue>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-7 col-lg-12 col-xl-7">
            <label>Remaining {symbol}:</label>
          </div>
          <div className="col-12 col-sm-5 col-lg-12 col-xl-5">
            <EthValue>{availableEth}</EthValue>
          </div>
        </div>
      </div>
      <div className="buy-links">
        <a className="btn btn-buy" href="/converter/">
          CONVERT MET &raquo;
        </a>
        <a className="btn btn-info" href="/buy/">
          INFO +
        </a>
      </div>
    </div>
  )
}

ConverterWidget.propTypes = {
  currentPrice: PropTypes.string.isRequired,
  availableEth: PropTypes.string.isRequired,
  availableMet: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired
}

function mapStateToProps(state) {
  return {
    ...state.converter.status,
    symbol: state.config.chains[state.chain.active].symbol
  }
}

export default connect(mapStateToProps)(ConverterWidget)
