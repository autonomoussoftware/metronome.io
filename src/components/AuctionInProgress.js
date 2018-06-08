import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import React from 'react'

import AuctionCounterSm from './AuctionCounterSm'
import AuctionMetAvailableSm from './AuctionMetAvailableSm'
import EthValue from './EthValue'
import metIcon from '../img/light.svg'

function AuctionInProgress (props) {
  const {
    currentAuction,
    currentPrice,
    nextAuctionStartTime,
    tokensRemaining
  } = props

  return (
    <div className="AuctionInProgress" style={{ height: 420 }}>
      <div>
        <div className="overview__met-container" style={{ bottom: 310 }}>
          <div className="overview__price-container">
            <span className="overview__current-auction-price">
              Current Auction Price
            </span>
            <span className="overview__eth-price">
              <EthValue>{currentPrice}</EthValue>
            </span>
          </div>
          <div className="overview__met-container--inner">
            <div className="overview__met-header">
              <div className="overview__met-header--inner">
                <div className="overview__met-icon">
                  <img alt='m' src={metIcon} />
                </div>
                <span className="overview__met-container-title">
                  Metronome (MET)
                </span>
              </div>
            </div>
            <div className="overview__time-left-container">
              <div className="overview__time-left-remaining">
                <div className="overview__time-left-remaining--inner">
                  <AuctionCounterSm
                    currentAuction={currentAuction}
                    nextAuctionStartTime={nextAuctionStartTime}
                  />
                  <span className="auction__counter-sm-remaining">
                    Remaining
                  </span>
                </div>
              </div>
              <div className="overview__time-left-available">
                <div className="overview__time-left-available--inner">
                  <AuctionMetAvailableSm
                    currentAuction={currentAuction}
                    tokensRemaining={tokensRemaining}
                  />
                  <span className="auction__counter-sm-remaining">
                    Available
                  </span>
                </div>
              </div>
            </div>
            <div className="overview__buy-met">
              <div className="overview__buy-met--inner">
                <a className="btn" style={{ borderColor: '#fff', color: '#7e61f8' }}>Buy Metronome</a>
              </div>
            </div>
            <div className="overview__visit-dashboard">
              <Link to="/dashboard">Visit Dashboard</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function mapStateToProps (state) {
  return state.auction.status
}

export default connect(mapStateToProps)(AuctionInProgress)
