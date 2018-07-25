import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

import EthValue from './EthValue'
import MetValue from './MetValue'

function AuctionMetAvailableSm(props) {
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
      {isAuctionActive && (
        <div className="auction__met-remaining-sm">
          <div className="auction__met-remaining-sm--fill" style={divStyle} />
        </div>
      )}
      <span className="auction__counter-sm">
        {isAuctionActive ? (
          <MetValue>{tokensRemaining}</MetValue>
        ) : (
          <EthValue>{nextAuctionStartPrice}</EthValue>
        )}
      </span>
      <span className="auction__counter-sm-remaining">
        {isAuctionActive ? 'Available' : 'Next Starting Price'}
      </span>
    </div>
  )
}

AuctionMetAvailableSm.propTypes = {
  nextAuctionStartPrice: PropTypes.string.isRequired,
  remainingPercentage: PropTypes.number.isRequired,
  isAuctionActive: PropTypes.bool.isRequired,
  tokensRemaining: PropTypes.string.isRequired
}

const mapStateToProps = state => state.auction.status

export default connect(mapStateToProps)(AuctionMetAvailableSm)
