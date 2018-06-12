import { connect } from 'react-redux'
import React from 'react'
import BigNumber from 'bignumber.js'

import MetValue from './MetValue'

function AuctionMetAvailableSm (props) {
  const {
    currentAuction,
    isAuctionActive,
    nextAuctionStartPrice,
    tokensRemaining
  } = props

  // We don't have a "stateless" way to know how much tokens were available at
  // the beginnig of the daily auctions because of the eventual carryover of the
  // previous one. Therefore, let's assume all auctions are depleted and new
  // ones start with 2880 tokens.
  const auctionSupply = new BigNumber(currentAuction === 0 ? 8000000 : 2880)
    .times(1e18)
  const remainingPercentage = new BigNumber(tokensRemaining)
    .div(auctionSupply)
    .times(100)
    .toNumber()

  const divStyle = {
    height: `${Math.min(remainingPercentage, 100)}%`
  }

  return (
    <div className="AuctionMetAvailableSm">
      {isAuctionActive &&
        <div className="auction__met-remaining-sm">
          <div className="auction__met-remaining-sm--fill" style={divStyle}>
          </div>
        </div>}
      <span className="auction__counter-sm">
        <MetValue>
          {isAuctionActive
            ? tokensRemaining
            : nextAuctionStartPrice}
        </MetValue>
      </span>
      <span className="auction__counter-sm-remaining">
        {isAuctionActive
          ? 'Available'
          : 'Next Starting Price'}
      </span>
    </div>
  )
}

function mapStateToProps (state) {
  return state.auction.status
}

export default connect(mapStateToProps)(AuctionMetAvailableSm)
