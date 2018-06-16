import { connect } from 'react-redux'
import BigNumber from 'bignumber.js'
import React, { Component } from 'react'

import MetValue from './MetValue'

class AuctionTokens extends Component {
  render () {
    const {
      auctionSupply,
      remainingPercentage,
      tokensRemaining
    } = this.props

    const tokensSold = BigNumber.max(
      new BigNumber(auctionSupply).minus(tokensRemaining),
      0
    ).toString()

    const divStyle = {
      width: `${remainingPercentage}%`
    }

    return (
      <div className="container__tokens">
        <div id="demo"></div>
        <span className="label__title">Auction Tokens Available</span>
        <div className="container__auction--inner">
          <div className="container__row">
            <div className="container__tokens-percentage">
              <div className="tokens-percentage">
                <div className="tokens__progress-bar" style={divStyle}>
                  <div className="tokens__progress-arrow">
                    <span className="arrow-up"></span>
                  </div>
                </div>
                <div style={divStyle} className="tokens__remainder-label">
                  <span className="tokens__remainder"><MetValue>{tokensSold}</MetValue> sold</span>
                </div>
              </div>
            </div>
            <div className="container__tokens-label">
              <h2><MetValue>{tokensRemaining}</MetValue></h2>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state.auction.status

export default connect(mapStateToProps)(AuctionTokens)
