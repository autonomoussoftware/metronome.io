import smartRounder from 'smart-round'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

import MetValue from '../common/MetValue'

const smartRound = smartRounder(6, 0, 6)

function MarketWidget(props) {
  const {
    circulatingSupply,
    currentPriceEth,
    currentPrice,
    totalSupply
  } = props

  return (
    <div className="option option-market">
      <h4>MARKET PRICE</h4>
      <div className="prices">
        <div className="row">
          <div className="col-12 col-sm-5 col-lg-12 col-xl-5">
            <label>Price per MET:</label>
          </div>
          <div className="col-12 col-sm-7 col-lg-12 col-xl-7">
            <div className="price met-price">
              <span>${currentPrice} USD</span>
            </div>
            <div className="price eth-price">{currentPriceEth} ETH</div>
          </div>
        </div>
      </div>
      <div className="buy-info">
        <div className="row">
          <div className="col-12 col-sm-7 col-lg-12 col-xl-7">
            <label>Circulating Supply:</label>
          </div>
          <div className="col-12 col-sm-5 col-lg-12 col-xl-5">
            <MetValue>{circulatingSupply}</MetValue>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-7 col-lg-12 col-xl-7">
            <label>Total Supply:</label>
          </div>
          <div className="col-12 col-sm-5 col-lg-12 col-xl-5">
            <MetValue>{totalSupply}</MetValue>
          </div>
        </div>
      </div>
      <div className="buy-links">
        <a
          className="btn btn-buy"
          href="https://coinmarketcap.com/currencies/metronome/#markets"
        >
          TRADE MET &raquo;
        </a>
        <a
          className="btn btn-info"
          href="https://coinmarketcap.com/currencies/metronome/#markets"
        >
          INFO +
        </a>
      </div>
    </div>
  )
}

MarketWidget.propTypes = {
  circulatingSupply: PropTypes.string.isRequired,
  currentPriceEth: PropTypes.string.isRequired,
  currentPrice: PropTypes.string.isRequired,
  totalSupply: PropTypes.string.isRequired
}

function mapStateToProps(state) {
  const coinRate = state.rates[state.config.chains[state.chain.active].symbol]
  return {
    circulatingSupply: state.market.circulatingSupply,
    currentPriceEth: smartRound(state.rates.MET / coinRate),
    currentPrice: state.rates.MET.toFixed(4),
    totalSupply: state.market.totalSupply
  }
}

export default connect(mapStateToProps)(MarketWidget)
