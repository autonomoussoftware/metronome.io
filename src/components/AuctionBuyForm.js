import { connect } from 'react-redux'
import BigNumber from 'bignumber.js'
import detectProvider from 'web3-detect-provider'
import pRetry from 'p-retry'
import React, { Component } from 'react'

import arrowIcon from '../img/arrow-forward-24-px.svg'
import closeIcon from '../img/close.svg'
import EthValue from './EthValue'
import FiatValue from './FiatValue'
import MetValue from './MetValue'
import ValueInput from './ValueInput'

const GET_TX_RETRIES = 5
const GET_TX_TIMEOUT = 250

const web3Provider = detectProvider('web wallet')

function throwIfNull (obj) {
  if (!obj) {
    throw new Error('Object should not be null')
  }
  return obj
}

class AuctionBuyForm extends Component {
  constructor () {
    super()

    this.sendTransaction = this.sendTransaction.bind(this)
  }

  sendTransaction () {
    const {
      config,
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
      to: config.auctionsAddress,
      value: web3.utils.toWei(eth.replace(',', '.'))
    }

    showWaiting()

    try {
      web3.eth.sendTransaction(txObject)
        .on('transactionHash', function (hash) {
          showWaiting(hash)
        })
        .on('receipt', function (receipt) {
          if (!receipt.status) {
            showError('Purchase reverted - Try again', new Error('Transaction status is falsy'))
            return
          }
          if (!receipt.logs.length) {
            showError('Purchase failed - Try again', new Error('Transaction logs missing'))
            return
          }

          const hash = receipt.transactionHash
          pRetry(
            () => web3.eth.getTransaction(hash).then(throwIfNull),
            { minTimeout: GET_TX_TIMEOUT, retries: GET_TX_RETRIES }
          )
            .catch(() => ({ from: userAccount, hash }))
            .then(function (tx) {
              storeTxData(tx)
              showReceipt(receipt)
              clearForm()
            })
            .catch(function (err) {
              showError(`Something went wrong - Check your wallet or explorer for transaction ${hash}`, err)
            })
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
      errorData,
      eth,
      hideBuyPanel,
      met,
      rates,
      updateEth,
      updateMet,
      userAccount,
      warn
    } = this.props

    const fiatValue = new BigNumber(eth).times(rates.ETH_USD).toString()

    const allowBuy = !(new BigNumber(eth).eq(0)) && userAccount && !warn

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
                {errorData && errorData.err && errorData.err.message &&
                  <div className="buy-meta-mask__current-price meta-mask__error">
                    <span title={errorData.err.message}>{errorData.hint}</span>
                  </div>}
                {warn &&
                  <div className="buy-meta-mask__current-price meta-mask__error">
                    <span>{warn}</span>
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
  config: state.config,
  currentPrice: state.auction.status.currentPrice,
  errorData: state.buyPanel.errorData,
  rates: state.rates,
  userAccount: state.wallet.accounts[0],
  warn: state.buyPanel.warn
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
