import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

import EthValue from '../common/EthValue'
import MetValue from '../common/MetValue'

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

AuctionMetAvailableSm.propTypes = {
  nextAuctionStartPrice: PropTypes.string.isRequired,
  tokensRemaining: PropTypes.string.isRequired,
  isAuctionActive: PropTypes.bool.isRequired
}

const mapStateToProps = state => state.auction.status

export default connect(mapStateToProps)(AuctionMetAvailableSm)
