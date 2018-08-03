import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ConverterStatCard from './ConverterStatCard'
import AuctionStatCard from './AuctionStatCard'
import HeaderDashboard from './HeaderDashboard'
import MetPriceAreaBar from './MetPriceAreaBar'
import GeneralStats from './GeneralStats'
import METLoader from './METLoader'

class MainDashboard extends Component {
  static propTypes = {
    showScreenDarken: PropTypes.bool,
    converter: PropTypes.shape({
      loading: PropTypes.bool.isRequired
    }).isRequired,
    auction: PropTypes.shape({
      loading: PropTypes.bool.isRequired
    }).isRequired
  }

  render() {
    const { auction, converter } = this.props

    return (
      <div
        className={
          this.props.showScreenDarken
            ? 'MainDashboard container__main --screenDarken'
            : 'MainDashboard container__main'
        }
      >
        {auction.loading || converter.loading ? (
          <div className="loader">
            <METLoader />
          </div>
        ) : (
          <div>
            <GeneralStats />
            <div className="container__primary">
              <div className="container__primary--inner">
                <HeaderDashboard />
                <MetPriceAreaBar />
                <div className="container__row container__stats mt-3">
                  <div className="container__header-top-border" />
                  <div className="container__mtn-auction-inner">
                    <span className="label__title">Stats</span>
                    <div className="container-fluid">
                      <div className="row my-4">
                        <div className="col-lg-4 col-md-6">
                          <AuctionStatCard />
                        </div>
                        <div className="col-lg-4 col-md-6 mt-4 mt-md-0">
                          <ConverterStatCard />
                        </div>
                        {/*
                        <div className="col-lg-4 col-md-6 mt-4 mt-lg-0">
                          Other data
                        </div>
                      */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  converter: state.converter,
  auction: state.auction
})

export default connect(mapStateToProps)(MainDashboard)
