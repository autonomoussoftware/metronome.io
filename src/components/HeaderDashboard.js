import React, { Component } from 'react'

import AuctionCounter from './AuctionCounter'
import AuctionTokens from './AuctionTokens'

class HeaderDashboard extends Component {
  render () {
    return (
      <div className="container__row container__dashboard-header-components">
        <div className="container__header-top-border"></div>
        <div className="chart__main-inner-container">
          <div className="container__mtn-auction-inner">
            <div className="container__counter">
              <div className="AuctionCounter">
                <span className="label__title">Auction Time Remaining </span>
                <div className="AuctionCounter--inner">
                  <AuctionCounter />
                </div>
              </div>
            </div>
            <AuctionTokens />
          </div>
        </div>
      </div>
    )
  }
}

export default HeaderDashboard
