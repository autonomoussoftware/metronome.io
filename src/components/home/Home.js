import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

import ConverterWidget from './ConverterWidget'
import QuickBuyButton from './QuickBuyButton'
import AuctionWidget from './AuctionWidget'
import METLoader from '../common/METLoader'

const HomePage = function({ isLoading }) {
  return isLoading ? (
    <METLoader height="200px" />
  ) : (
    <div>
      <AuctionWidget />
      <ConverterWidget />
      <QuickBuyButton />
    </div>
  )
}

HomePage.propTypes = {
  isLoading: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  isLoading:
    state.auction.loading ||
    state.converter.loading ||
    !state.auction.status.currentPrice ||
    !state.converter.status.currentPrice ||
    typeof state.rates[state.config.chains[state.chain.active].symbol] !==
      'number'
})

export default connect(mapStateToProps)(HomePage)
