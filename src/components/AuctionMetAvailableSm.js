import { connect } from 'react-redux'
import React from 'react'
import BigNumber from 'bignumber.js'

import MetValue from './MetValue'

function AuctionMetAvailableSm (props) {
  const { currentAuction, lastPurchasePrice, tokensRemaining } = props

  const metSupply = currentAuction === 0 ? 8000000 : 2880
  const auctionSupply = new BigNumber(metSupply).times(1e18)
  const remainingPercentage = new BigNumber(tokensRemaining)
    .div(auctionSupply)
    .times(100)
    .toNumber()
  const isAuctionInProgress = remainingPercentage > 0

  const divStyle = {
    height: `${Math.min(remainingPercentage, 100)}%`
  }

  return (
    <div className="AuctionMetAvailableSm">
      {isAuctionInProgress &&
        <div className="auction__met-remaining-sm">
          <div className="auction__met-remaining-sm--fill" style={divStyle}>
          </div>
        </div>}
      <span className="auction__counter-sm">
        <MetValue>
          {isAuctionInProgress
            ? tokensRemaining
            : new BigNumber(lastPurchasePrice).times(2).toString()}
        </MetValue>
      </span>
      <span className="auction__counter-sm-remaining">
        {isAuctionInProgress
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
