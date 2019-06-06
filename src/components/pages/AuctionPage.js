import { connect } from 'react-redux'
import React from 'react'

import AuctionWidget from '../AuctionWidget'
import METLoader from '../METLoader'

const AuctionsPage = function({ isLoading }) {
  return isLoading ? <METLoader height="200px" /> : <AuctionWidget />
}

const mapStateToProps = state => ({
  isLoading: state.auction.loading
})

export default connect(mapStateToProps)(AuctionsPage)
