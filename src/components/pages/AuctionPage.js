import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

import AuctionSummary from '../AuctionSummary'
import METLoader from '../METLoader'

const AuctionsPage = function({ isLoading }) {
  return isLoading ? <METLoader height="200px" /> : <AuctionSummary />
}

AuctionsPage.propTypes = {
  isLoading: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  isLoading: state.auction.loading
})

export default connect(mapStateToProps)(AuctionsPage)
