import { connect } from 'react-redux'
import React, { Component } from 'react'
import smartRounder from 'smart-round'

import CoinCapRate from '../providers/CoinCapRate'
import MetValue from './MetValue'

const smartRound = smartRounder(3, 0, 10)

class GeneralStats extends Component {
  render () {
    const {
      auction: {
        auctionSupply,
        isAuctionActive,
        isDailyAuction,
        remainingPercentage,
        tokenSupply
      },
      onBuyMetronomeClick,
      updateEthUsdRate
    } = this.props

    return (
      <React.Fragment>
        <CoinCapRate onData={updateEthUsdRate}/>
        <div className="GeneralStats container__general-stats">
          <div className="clearInner">
            <div className="left">
              <div className="container__inner">
                <div className="label__general-stats">Market Supply</div>
                <div className="numeral__general-stats"><MetValue>{tokenSupply}</MetValue></div>
              </div>
            </div>
            <div className="left">
              <div className="container__inner">
                <div className="label__general-stats">Percentage Sold</div>
                <div className="numeral__general-stats">{smartRound(100 - remainingPercentage)}%</div>
              </div>
            </div>
            <div className="left">
              <div className="container__inner">
                <div className="label__general-stats">{isDailyAuction ? 'Daily' : 'Initial'} Auction Amount</div>
                <div className="numeral__general-stats"><MetValue>{auctionSupply}</MetValue></div>
              </div>
            </div>
          </div>
          <div className="button__visit-auction-dashboard">
            <button onClick={onBuyMetronomeClick} disabled={!isAuctionActive}>
              Buy Metronome
            </button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  auction: state.auction.status,
  rates: state.rates
})

const mapDispatchToProps = dispatch => ({
  onBuyMetronomeClick: () => dispatch({
    type: 'SHOW_BUY_PANEL',
    payload: true
  }),
  updateEthUsdRate: value => dispatch({
    type: 'UPDATE_RATE',
    payload: { type: 'ETH_USD', value }
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(GeneralStats)
