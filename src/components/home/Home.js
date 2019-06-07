import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

import ConverterWidget from './ConverterWidget'
import AuctionWidget from './AuctionWidget'
import METLoader from '../common/METLoader'

const HomePage = function({ isLoading }) {
  return isLoading ? (
    <METLoader height="200px" />
  ) : (
    <div>
      <AuctionWidget />
      <ConverterWidget />
    </div>
  )
}

HomePage.propTypes = {
  isLoading: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  isLoading: state.auction.loading || state.converter.loading
})

export default connect(mapStateToProps)(HomePage)
