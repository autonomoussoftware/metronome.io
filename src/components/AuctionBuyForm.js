import { connect } from 'react-redux'
import React, { Component } from 'react'
import BigNumber from 'bignumber.js'

import CoinCapRate from './CoinCapRate'
import EthValue from './EthValue'
import FiatValue from './FiatValue'
import MetValue from './MetValue'

class AuctionBuyForm extends Component {
  constructor () {
    super()

    this.sendTransaction = this.sendTransaction.bind(this)
  }

  sendTransaction () {
    const {
      auctionsAddress,
      eth,
      userAccount,
      web3
    } = this.props

    const txObject = {
      from: userAccount,
      to: auctionsAddress,
      value: web3.utils.toWei(eth, 'ether')
    }

    web3.eth.sendTransaction(txObject)
      .on('transactionHash', function (hash) {
        // TODO switch to "awaiting confirmation"
      })
      .on('receipt', function (recepit) {
        // TODO swith to "recepit" & clear form
      })
      .on('error', function (e) {
        // TODO switch to "error"
      })

    // TODO switch to "awaiting submition" panel
  }

  render () {
    const {
      currentPrice,
      eth,
      met,
      rates,
      updateEth,
      updateEthUsdRate,
      updateMet,
      userAccount
    } = this.props

    const fiatValue = new BigNumber(eth).times(rates.ETH_USD).toString()

    const allowBuy = !(new BigNumber(eth).eq(0)) && userAccount

    function withRate (eventHandler) {
      return function (ev) {
        eventHandler({
          value: ev.target.value || 0,
          rate: currentPrice
        })
      }
    }

    function orEmpty (value) {
      return (new BigNumber(value).eq(0))
        ? ''
        : value
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
                <input type="number" placeholder="0" value={orEmpty(met)} onChange={withRate(updateMet)}/>
                <span className="label_overlay">MET</span>
              </div>
              <div className="buy-meta-mask__form-group">
                <label>Cost (ETH)</label>
                <input type="number" placeholder="0" value={orEmpty(eth)} onChange={withRate(updateEth)}/>
                <span className="label_overlay">ETH</span>
              </div>
            </form>
          </section>
          <section className="buy-meta-mask__form-totals">
            <span>Buying <MetValue unit="ether">{met}</MetValue> @ <EthValue>{currentPrice}</EthValue> = <FiatValue suffix="USD">{fiatValue}</FiatValue></span>
          </section>
          <section className="buy-meta-mask__review-order">
            <span> By choosing "Review Purchase" you are agreeing to our disclaimer and terms of service</span>
            <a
              className={`btn ${allowBuy ? '' : '--disabled'}`}
              onClick={this.sendTransaction}>
              Review Purchase
            </a>
            <span className="buy-meta-mask__review-disclaimer"> You will be see a review of this purchase in your web wallet</span>
          </section>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  ...state.buyForm,
  auctionsAddress: state.config.auctionsAddress,
  currentPrice: state.auction.status.currentPrice,
  rates: state.rates,
  userAccount: state.user.accounts[0]
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
