import { connect } from 'react-redux'
import React from 'react'

import EthValue from './EthValue'
import MetValue from './MetValue'

function AuctionMetAvailableSm(props) {
  const { nextAuctionStartPrice, isAuctionActive, tokensRemaining } = props

  return (
    <div>
      {isAuctionActive ? (
        <MetValue>{tokensRemaining}</MetValue>
      ) : (
        <EthValue>{nextAuctionStartPrice}</EthValue>
      )}
    </div>
  )
}

const mapStateToProps = state => state.auction.status

export default connect(mapStateToProps)(AuctionMetAvailableSm)
