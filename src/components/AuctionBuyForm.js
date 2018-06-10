import { connect } from 'react-redux'
import React, { Component } from 'react'
import BigNumber from 'bignumber.js'

import CoinCapRate from './CoinCapRate'
import EthValue from './EthValue'
import FiatValue from './FiatValue'
import MetValue from './MetValue'

class AuctionBuyForm extends Component {
  render () {
    const {
      currentPrice,
      eth,
      met,
      rates,
      updateEth,
      updateEthUsdRate,
      updateMet
    } = this.props

    const fiatValue = new BigNumber(eth || 0).times(rates.ETH_USD).toString()

    const allowBuy = !(new BigNumber(eth || 0).eq(0))

    function withRate (eventHandler) {
      return function (ev) {
        eventHandler({
          value: ev.target.value,
          rate: currentPrice
        })
      }
    }

    return (
      <React.Fragment>
        <CoinCapRate onData={updateEthUsdRate}/>
        <div className={this.props.showPanelMetaMask ? 'panel__buy-meta-mask --showMetaMask' : 'panel__buy-meta-mask'}>
          <section className="buy-meta-mask__section">
            <div className="buy-meta-mask__current-price">
              <span>Current Auction Price</span>
            </div>
            <div className="buy-meta-mask__current-price-numeral">
              <EthValue>{currentPrice}</EthValue>
            </div>
          </section>
          <section className="buy-meta-mask__section">
            <form>
              <div className="buy-meta-mask__form-group">
                <label>Amount (MET)</label>
                {/* <label className="right">MAX</label> */}
                <input type="number" placeholder="0" value={met} onChange={withRate(updateMet)}/>
                <span className="label_overlay">MET</span>
              </div>
              <div className="buy-meta-mask__form-group">
                <label>Cost (ETH)</label>
                <input type="number" placeholder="0" value={eth} onChange={withRate(updateEth)}/>
                <span className="label_overlay">ETH</span>
              </div>
            </form>
          </section>
          <section className="buy-meta-mask__form-totals">
            <span>Buying <MetValue unit="ether">{met}</MetValue> @ <EthValue>{currentPrice}</EthValue> = <FiatValue suffix="USD">{fiatValue}</FiatValue></span>
          </section>
          <section className="buy-meta-mask__review-order">
            <span> By choosing "Review Purchase" you are agreeing to our disclaimer and terms of service</span>
            <a className={`btn ${allowBuy ? '' : '--disabled'}`}>Review Purchase</a>
            <span className="buy-meta-mask__review-disclaimer"> You will be see a review of this purchase in your web wallet</span>
          </section>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  ...state.buyForm,
  currentPrice: state.auction.status.currentPrice,
  rates: state.rates
})

const mapDispatchToProps = dispatch => ({
  updateEth: payload => dispatch({
    type: 'UPDATE_BUY_ETH',
    payload
  }),
  updateEthUsdRate: value => dispatch({
    type: 'UPDATE_RATE',
    payload: { type: 'ETH_USD', value }
  }),
  updateMet: payload => dispatch({
    type: 'UPDATE_BUY_MET',
    payload
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(AuctionBuyForm)
