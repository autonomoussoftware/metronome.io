import { connect } from 'react-redux'
import BigNumber from 'bignumber.js'
import detectProvider from 'web3-detect-provider'
import React, { Component } from 'react'

import arrowIcon from '../img/arrow-forward-24-px.svg'
import closeIcon from '../img/close.svg'
import EthValue from './EthValue'
import FiatValue from './FiatValue'
import MetValue from './MetValue'
import ValueInput from './ValueInput'

const web3Provider = detectProvider('web wallet')

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
      showError,
      showReceipt,
      showWaiting,
      storeTxData,
      userAccount,
      web3
    } = this.props

    const txObject = {
      from: userAccount,
      to: auctionsAddress,
      value: web3.utils.toWei(eth.replace(',', '.'))
    }

    showWaiting()

    try {
      web3.eth.sendTransaction(txObject)
        .on('transactionHash', function (hash) {
          showWaiting(hash)
          web3.eth.getTransaction(hash)
            .then(storeTxData)
            .catch(function (err) {
              showError('Transaction details could not be retrieved - Try again', err)
            })
        })
        .on('receipt', function (receipt) {
          if (!receipt.status) {
            showError('Transaction reverted - Try again', new Error('Transaction status is falsy'))
            return
          }
          if (!receipt.logs.length) {
            showError('Transaction failed - Try again', new Error('Transaction logs missing'))
            return
          }
          showReceipt(receipt)
          clearForm()
        })
        .on('error', function (err) {
          showError('Transaction error - Try again', err)
        })
    } catch (err) {
      showError('Transaction could not be sent - Try again', err)
    }
  }

  // eslint-disable-next-line complexity
  render () {
    const {
      backToBuyOptions,
      currentPrice,
      error,
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
              : `Buy with ${web3Provider}`}</h2>
            <a onClick={hideBuyPanel} className="auction-panel__close"><img alt="" src={closeIcon} /></a>
          </div>
        </div>
        <div className="auction-panel__body">
          <div className="auction-panel__body--inner">
            <div className="panel__buy-meta-mask --showMetaMask">
              <section className="buy-meta-mask__section">
                {error && error.err.message &&
                  <div className="buy-meta-mask__current-price meta-mask__error">
                    <span title={error.err.message}>{error.hint}</span>
                  </div>}
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
                    <ValueInput type="number" placeholder="0.00" value={formatValue(met)} onChange={withRate(updateMet)}/>
                    <span className="label_overlay">MET</span>
                  </div>
                  <div className="buy-meta-mask__form-group">
                    <label>Cost (ETH)</label>
                    <ValueInput type="number" placeholder="0.00" value={formatValue(eth)} onChange={withRate(updateEth)}/>
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
                <span className="buy-meta-mask__review-disclaimer"> You will be see a review of this purchase in your {web3Provider}</span>
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
  error: state.buyPanel.error,
  rates: state.rates,
  userAccount: state.user.accounts[0]
})

const mapDispatchToProps = dispatch => ({
  clearForm: () => dispatch({
    type: 'CLEAR_BUY_FORM'
  }),
  showError: (hint, err) => dispatch({
    type: 'SHOW_BUY_ERROR',
    payload: { hint, err }
  }),
  showReceipt: payload => dispatch({
    type: 'SHOW_BUY_RECEIPT',
    payload
  }),
  showWaiting: payload => dispatch({
    type: 'SHOW_BUY_WAITING',
    payload
  }),
  storeTxData: payload => dispatch({
    type: 'UPDATE_ONGOING_TX',
    payload
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
