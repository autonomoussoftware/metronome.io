import { connect } from 'react-redux'
import React from 'react'

import ConverterWidget from '../ConverterWidget'
import AuctionWidget from '../AuctionWidget'
import METLoader from '../METLoader'

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

const mapStateToProps = state => ({
  isLoading: state.auction.loading || state.converter.loading
})

export default connect(mapStateToProps)(HomePage)
