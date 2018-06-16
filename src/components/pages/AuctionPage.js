import { connect } from 'react-redux'
import React from 'react'

import AuctionSummary from '../AuctionSummary'
import METLoader from '../METLoader'

const AuctionsPage = function ({ loadingAuctionStatus }) {
  return (
    loadingAuctionStatus
      ? <METLoader height="100px" />
      : <AuctionSummary />
  )
}

const mapStateToProps = state => state.auction.status

export default connect(mapStateToProps)(AuctionsPage)
