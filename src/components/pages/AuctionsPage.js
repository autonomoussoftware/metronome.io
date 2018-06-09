import { connect } from 'react-redux'
import React from 'react'

import AuctionSummary from '../AuctionSummary'

const AuctionsPage = ({ loadingAuctionStatus }) => (
  loadingAuctionStatus
    ? <div>{/* Loading... */}</div>
    : <AuctionSummary />
)

const mapStateToProps = state => state.auction.status

export default connect(mapStateToProps)(AuctionsPage)
