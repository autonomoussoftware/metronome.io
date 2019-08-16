import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

import DownloadOptions from './DownloadOptions'
import ConverterWidget from './ConverterWidget'
import AuctionWidget from './AuctionWidget'
import MarketWidget from './MarketWidget'
import METLoader from '../common/METLoader'

const HomePage = function({ isLoading }) {
  return (
    <div>
      <DownloadOptions />

      {isLoading ? (
        <METLoader height="312px" style={{ marginBottom: '115px' }} />
      ) : (
        <div className="buy-options">
          <div className="row">
            <div className="col-lg-4 br">
              <AuctionWidget />
            </div>
            <div className="col-lg-4 br">
              <ConverterWidget />
            </div>
            <div className="col-lg-4">
              <MarketWidget />
            </div>
          </div>
        </div>
      )}
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
    typeof state.rates.MET !== 'number' ||
    typeof state.rates[state.config.chains[state.chain.active].symbol] !==
      'number'
})

export default connect(mapStateToProps)(HomePage)
