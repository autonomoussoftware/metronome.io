import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

import DownloadOptions from './DownloadOptions'
import ConverterWidget from './ConverterWidget'
import AuctionWidget from './AuctionWidget'
import METLoader from '../common/METLoader'

const HomePage = function({ isLoading }) {
  return (
    <div>
      <DownloadOptions />

      {isLoading ? (
        <METLoader height="200px" />
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
              <div className="option option-market">
                <h4>MARKET PRICE</h4>
                <div className="prices">
                  <div className="row">
                    <div className="col-12 col-sm-5 col-lg-12 col-xl-5">
                      <label>Price per MET:</label>
                    </div>
                    <div className="col-12 col-sm-7 col-lg-12 col-xl-7">
                      <div className="price met-price">$0.9158 USD</div>
                      <div className="price eth-price">0.003914 ETH</div>
                    </div>
                  </div>
                </div>
                <div className="buy-info">
                  <div className="row">
                    <div className="col-12 col-sm-7 col-lg-12 col-xl-7">
                      <label>Circulating Supply:</label>
                    </div>
                    <div className="col-12 col-sm-5 col-lg-12 col-xl-5">
                      <span>9,397,557 MET</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-sm-7 col-lg-12 col-xl-7">
                      <label>Total Supply:</label>
                    </div>
                    <div className="col-12 col-sm-5 col-lg-12 col-xl-5">
                      <span>11,159,681 MET</span>
                    </div>
                  </div>
                </div>
                <div className="buy-links">
                  <a
                    className="btn btn-buy"
                    href="https://coinmarketcap.com/currencies/metronome/#markets"
                  >
                    TRADE MET &raquo;
                  </a>
                  <a
                    className="btn btn-info"
                    href="https://coinmarketcap.com/currencies/metronome/#markets"
                  >
                    INFO +
                  </a>
                </div>
              </div>
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
    typeof state.rates[state.config.chains[state.chain.active].symbol] !==
      'number'
})

export default connect(mapStateToProps)(HomePage)
