import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

import AuctionMetAvailableSm from './AuctionMetAvailableSm'
import AuctionCounterSm from './AuctionCounterSm'
import DollarValue from '../common/DollarValue'
import EthValue from '../common/EthValue'

function AuctionWidget(props) {
  const { lastPurchasePrice, isAuctionActive, currentPrice } = props

  return (
    <div className="option option-buy">
      <h4>DAILY AUCTION</h4>
      <div className="prices">
        <div className="row">
          <div className="col-12 col-sm-5 col-lg-12 col-xl-5">
            <label>Price per MET:</label>
          </div>
          <div className="col-12 col-sm-7 col-lg-12 col-xl-7">
            <div className="price met-price">
              <DollarValue>
                {isAuctionActive ? currentPrice : lastPurchasePrice}
              </DollarValue>
            </div>
            <div className="price eth-price">
              <EthValue>
                {isAuctionActive ? currentPrice : lastPurchasePrice}
              </EthValue>
            </div>
          </div>
        </div>
      </div>
      <div className="buy-info">
        <div className="row">
          <div className="col-12 col-sm-7 col-lg-12 col-xl-7">
            <label>
              {isAuctionActive ? 'Time Available:' : 'Time Until Next Auction:'}
            </label>
          </div>
          <div className="col-12 col-sm-5 col-lg-12 col-xl-5">
            <AuctionCounterSm />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-7 col-lg-12 col-xl-7">
            <label>
              {isAuctionActive ? 'Available Supply:' : 'Next Starting Price:'}
            </label>
          </div>
          <div className="col-12 col-sm-5 col-lg-12 col-xl-5">
            <AuctionMetAvailableSm />
          </div>
        </div>
      </div>
      <div className="buy-links">
        <a className="btn btn-buy" href="/auction/">
          BUY MET &raquo;
        </a>
        <a className="btn btn-info" href="/buy/">
          INFO +
        </a>
      </div>
    </div>
  )
}

AuctionWidget.propTypes = {
  lastPurchasePrice: PropTypes.string.isRequired,
  isAuctionActive: PropTypes.bool.isRequired,
  currentPrice: PropTypes.string.isRequired
}

function mapStateToProps(state) {
  return state.auction.status
}

export default connect(mapStateToProps)(AuctionWidget)
