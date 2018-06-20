import { connect } from 'react-redux'
import React, { Component } from 'react'

import GeneralStats from './GeneralStats'
import HeaderDashboard from './HeaderDashboard'
// import Markets from './Markets'
// import MtnAuction from './MtnAuction'
// import MtnExchanger from './MtnExchanger'
import MetPriceAreaBar from './MetPriceAreaBar'
import METLoader from './METLoader'

class MainDashboard extends Component {
  render () {
    const { auction } = this.props
    return (
      <div className={this.props.showScreenDarken ? 'MainDashboard container__main --screenDarken' : 'MainDashboard container__main'}>
        {!auction.auctionSupply
          ? <div class="loader"><METLoader/></div>
          : <div>
            <GeneralStats />
            <div className="container__primary">
              <div className="container__primary--inner">
                <HeaderDashboard />
                <MetPriceAreaBar />
                {/* <div className="container__row container__stats">
                  <div className="container__header-top-border"></div>
                  <div className="container__mtn-auction-inner">
                    <span className="label__title">Stats</span>
                    <MtnAuction />
                    <MtnExchanger />
                    <Markets />
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auction: state.auction.status
})

export default connect(mapStateToProps)(MainDashboard)
