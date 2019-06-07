import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

import METLoader from '../common/METLoader'

const AuctionsPage = function({ isLoading }) {
  return isLoading ? <METLoader height="200px" /> : null
}

AuctionsPage.propTypes = {
  isLoading: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  isLoading: state.auction.loading
})

export default connect(mapStateToProps)(AuctionsPage)
