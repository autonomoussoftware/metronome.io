import React, { Component } from 'react'
import AuctionCounter from './AuctionCounter'
import AuctionTokens from './AuctionTokens'
import { connect } from 'react-redux'

class HeaderDashboard extends Component {
  render () {
    return (
      <div className="container__row container__dashboard-header-components">
        <div className="container__header-top-border"></div>
        <div className="chart__main-inner-container">
          <div className="container__mtn-auction-inner">
            <div className="container__counter">
              <div className="AuctionCounter">
                <span className="label__title">
                  {this.props.isAuctionActive
                    ? 'Auction Time Remaining'
                    : 'Next Auction Starts In'
                  }
                </span>
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

const mapStateToProps = state => ({
  isAuctionActive: state.auction.status.isAuctionActive
})

export default connect(mapStateToProps)(HeaderDashboard)
