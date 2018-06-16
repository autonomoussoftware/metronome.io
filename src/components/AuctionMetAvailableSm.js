import { connect } from 'react-redux'
import React from 'react'

import MetValue from './MetValue'

function AuctionMetAvailableSm (props) {
  const {
    isAuctionActive,
    nextAuctionStartPrice,
    tokensRemaining,
    remainingPercentage
  } = props

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

const mapStateToProps = state => state.auction.status

export default connect(mapStateToProps)(AuctionMetAvailableSm)
