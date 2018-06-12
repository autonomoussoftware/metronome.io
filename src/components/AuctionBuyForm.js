import { connect } from 'react-redux'
import React, { Component } from 'react'
import BigNumber from 'bignumber.js'

import arrowIcon from '../img/arrow-forward-24-px.svg'
import closeIcon from '../img/close.svg'
import EthValue from './EthValue'
import FiatValue from './FiatValue'
import MetValue from './MetValue'
import ValueInput from './ValueInput'

class AuctionBuyForm extends Component {
  constructor () {
    super()

    this.sendTransaction = this.sendTransaction.bind(this)
  }

  sendTransaction () {
    const {
      auctionsAddress,
      clearForm,
      eth,
      showWaiting,
      userAccount,
      web3
    } = this.props

    const txObject = {
      from: userAccount,
      to: auctionsAddress,
      value: web3.utils.toWei(eth)
    }

    showWaiting()

    try {
      web3.eth.sendTransaction(txObject)
        .on('transactionHash', function (hash) {
          showWaiting(hash)
        })
        .on('receipt', function (recepit) {
          // TODO swith to "recepit" & clear form
          console.log('recepit', recepit)

          clearForm()
        })
        .on('error', function (err) {
          // TODO switch to "error"
          console.log('tx error', err.message)
        })
    } catch (err) {
      // TODO switch to "error"
      console.log('send error', err.message)
    }

    // TODO switch to "awaiting user" panel
    console.log('awaiting user')
  }

  render () {
    const {
      backToBuyOptions,
      currentPrice,
      eth,
      hideBuyPanel,
      met,
      rates,
      updateEth,
      updateMet,
      userAccount
    } = this.props

    const fiatValue = new BigNumber(eth).times(rates.ETH_USD).toString()

    const allowBuy = !(new BigNumber(eth).eq(0)) && userAccount

    function withRate (eventHandler) {
      return function (ev) {
        eventHandler({
          value: ev.target.value || '0',
          rate: currentPrice
        })
      }
    }

    function formatValue (value) {
      const bigValue = new BigNumber(value)
      return bigValue.toFixed()
    }

    return (
      <React.Fragment>
        <div className="auction-panel__header header__meta-mask --showMetaMask">
          <div className="auction-panel__header--inner">
            <a onClick={backToBuyOptions}><img alt="" className="auction-panel__back-arrow" src={arrowIcon} /></a>
            <h2>{userAccount
              ? `Buy with account ${userAccount.substr(0, 6)}*`
              : 'Buy with web wallet'}</h2>
            <a onClick={hideBuyPanel} className="auction-panel__close"><img alt="" src={closeIcon} /></a>
          </div>
        </div>
        <div className="auction-panel__body">
          <div className="auction-panel__body--inner">
            <div className="panel__buy-meta-mask --showMetaMask">
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
                    <ValueInput type="number" placeholder="0" value={formatValue(met)} onChange={withRate(updateMet)}/>
                    <span className="label_overlay">MET</span>
                  </div>
                  <div className="buy-meta-mask__form-group">
                    <label>Cost (ETH)</label>
                    <ValueInput type="number" placeholder="0" value={formatValue(eth)} onChange={withRate(updateEth)}/>
                    <span className="label_overlay">ETH</span>
                  </div>
                </form>
              </section>
              <section className="buy-meta-mask__form-totals">
                <span>Buying <MetValue unit="met">{met}</MetValue> @ <EthValue>{currentPrice}</EthValue> = <FiatValue suffix="USD">{fiatValue}</FiatValue></span>
              </section>
              <section className="buy-meta-mask__review-order">
                <span> By choosing "Review Purchase" you are agreeing to our disclaimer and terms of service</span>
                <button
                  className={`btn ${allowBuy ? '' : '--disabled'}`}
                  disabled={!allowBuy}
                  onClick={this.sendTransaction}>
                  Review Purchase
                </button>
                <span className="buy-meta-mask__review-disclaimer"> You will be see a review of this purchase in your web wallet</span>
              </section>
            </div>
          </div>
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
  clearForm: () => dispatch({
    type: 'CLEAR_BUY_FORM'
  }),
  showWaiting: hash => dispatch({
    type: 'SHOW_BUY_WAITING',
    payload: hash
  }),
  updateEth: payload => dispatch({
    type: 'UPDATE_BUY_ETH',
    payload
  }),
  updateMet: payload => dispatch({
    type: 'UPDATE_BUY_MET',
    payload
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(AuctionBuyForm)
