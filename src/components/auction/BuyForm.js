import React, { Component } from 'react'
import detectProvider from 'web3-detect-provider'
import { connect } from 'react-redux'
import BigNumber from 'bignumber.js'
import PropTypes from 'prop-types'
import pRetry from 'p-retry'

import ValueInput from './ValueInput'
import arrowIcon from '../../img/arrow-forward-24-px.svg'
import closeIcon from '../../img/close.svg'
import FiatValue from '../common/FiatValue'
import EthValue from '../common/EthValue'
import MetValue from '../common/MetValue'

const GET_TX_RETRIES = 5
const GET_TX_TIMEOUT = 250

const web3Provider = detectProvider('web wallet')

function throwIfNull(obj) {
  if (!obj) {
    throw new Error('Object should not be null')
  }
  return obj
}

class AuctionBuyForm extends Component {
  static propTypes = {
    auctionsAddress: PropTypes.string.isRequired,
    userAccount: PropTypes.string.isRequired,
    showReceipt: PropTypes.func.isRequired,
    showWaiting: PropTypes.func.isRequired,
    storeTxData: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired,
    clearForm: PropTypes.func.isRequired,
    backToBuyOptions: PropTypes.func.isRequired,
    hideBuyPanel: PropTypes.func.isRequired,
    currentPrice: PropTypes.string.isRequired,
    updateEth: PropTypes.func.isRequired,
    updateMet: PropTypes.func.isRequired,
    errorData: PropTypes.shape({
      hint: PropTypes.string.isRequired,
      err: PropTypes.shape({
        message: PropTypes.string.isRequired
      }).isRequired
    }),
    rates: PropTypes.shape({
      ETH_USD: PropTypes.number.isRequired
    }).isRequired,
    warn: PropTypes.string,
    web3: PropTypes.shape({
      utils: PropTypes.shape({
        toWei: PropTypes.func.isRequired
      }).isRequired,
      eth: PropTypes.shape({
        getTransaction: PropTypes.func.isRequired,
        setTransaction: PropTypes.func.isRequired
      }).isRequired
    }).isRequired,
    eth: PropTypes.string.isRequired,
    met: PropTypes.string.isRequired
  }

  sendTransaction = () => {
    const {
      auctionsAddress,
      showReceipt,
      showWaiting,
      storeTxData,
      userAccount,
      clearForm,
      showError,
      web3,
      eth
    } = this.props

    const txObject = {
      value: web3.utils.toWei(eth.replace(',', '.')),
      from: userAccount,
      to: auctionsAddress
    }

    showWaiting()

    try {
      window.gtag('event', 'Buy MET in auction initiated', {
        event_category: 'Buy'
      })
      web3.eth
        .sendTransaction(txObject)
        .on('transactionHash', function(hash) {
          showWaiting(hash)
        })
        .on('receipt', function(receipt) {
          if (!receipt.status) {
            window.gtag('event', 'Buy MET in auction failed', {
              event_category: 'Buy'
            })
            showError(
              'Purchase reverted - Try again',
              new Error('Transaction status is falsy')
            )
            return
          }
          if (!receipt.logs.length) {
            window.gtag('event', 'Buy MET in auction failed', {
              event_category: 'Buy'
            })
            showError(
              'Purchase failed - Try again',
              new Error('Transaction logs missing')
            )
            return
          }

          const hash = receipt.transactionHash
          pRetry(() => web3.eth.getTransaction(hash).then(throwIfNull), {
            minTimeout: GET_TX_TIMEOUT,
            retries: GET_TX_RETRIES
          })
            .catch(() => ({ from: userAccount, hash }))
            .then(function(tx) {
              window.gtag('event', 'Buy MET in auction succeeded', {
                event_category: 'Buy'
              })
              storeTxData(tx)
              showReceipt(receipt)
              clearForm()
            })
            .catch(function(err) {
              window.gtag('event', 'Buy MET in auction failed', {
                event_category: 'Buy'
              })
              showError(
                `Something went wrong - Check your wallet or explorer for transaction ${hash}`,
                err
              )
            })
        })
        .on('error', function(err) {
          window.gtag('event', 'Buy MET in auction failed', {
            event_category: 'Buy'
          })
          showError('Transaction error - Try again', err)
        })
    } catch (err) {
      window.gtag('event', 'Buy MET in auction failed', {
        event_category: 'Buy'
      })
      showError('Transaction could not be sent - Try again', err)
    }
  }

  render() {
    const {
      backToBuyOptions,
      hideBuyPanel,
      currentPrice,
      userAccount,
      updateEth,
      updateMet,
      errorData,
      rates,
      warn,
      eth,
      met
    } = this.props

    const fiatValue = new BigNumber(eth).times(rates.ETH_USD).toString()

    const allowBuy = !new BigNumber(eth).eq(0) && userAccount && !warn

    function withRate(eventHandler) {
      return function(ev) {
        eventHandler({
          value: ev.target.value || '0',
          rate: currentPrice
        })
      }
    }

    function formatValue(value) {
      const bigValue = new BigNumber(value)
      return bigValue.toFixed()
    }
    return (
      <React.Fragment>
        <div className="auction-panel__header header__meta-mask --showMetaMask">
          <div className="auction-panel__header--inner">
            <a onClick={backToBuyOptions}>
              <img
                alt=""
                className="auction-panel__back-arrow"
                src={arrowIcon}
              />
            </a>
            <h2>
              {userAccount
                ? `Buy with account ${userAccount.substr(0, 6)}*`
                : `Buy with ${web3Provider}`}
            </h2>
            <a onClick={hideBuyPanel} className="auction-panel__close">
              <img alt="" src={closeIcon} />
            </a>
          </div>
        </div>
        <div className="auction-panel__body">
          <div className="auction-panel__body--inner">
            <div className="panel__buy-meta-mask --showMetaMask">
              <section className="buy-meta-mask__section">
                {errorData && errorData.err && errorData.err.message && (
                  <div className="buy-meta-mask__current-price meta-mask__error">
                    <span title={errorData.err.message}>{errorData.hint}</span>
                  </div>
                )}
                {warn && (
                  <div className="buy-meta-mask__current-price meta-mask__error">
                    <span>{warn}</span>
                  </div>
                )}
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
                    <ValueInput
                      type="number"
                      placeholder="0.00"
                      value={formatValue(met)}
                      onChange={withRate(updateMet)}
                    />
                    <span className="label_overlay">MET</span>
                  </div>
                  <div className="buy-meta-mask__form-group">
                    <label>Cost (ETH)</label>
                    <ValueInput
                      type="number"
                      placeholder="0.00"
                      value={formatValue(eth)}
                      onChange={withRate(updateEth)}
                    />
                    <span className="label_overlay">ETH</span>
                  </div>
                </form>
              </section>
              <section className="buy-meta-mask__form-totals">
                <span>
                  Buying <MetValue unit="met">{met}</MetValue> @{' '}
                  <EthValue>{currentPrice}</EthValue> ={' '}
                  <FiatValue suffix="USD">{fiatValue}</FiatValue>
                </span>
              </section>
              <section className="buy-meta-mask__review-order">
                <span>
                  {' '}
                  By choosing &quot;Review Purchase&quot; you are agreeing to
                  our disclaimer and terms of service
                </span>
                <button
                  className={`btn ${allowBuy ? '' : '--disabled'}`}
                  disabled={!allowBuy}
                  onClick={this.sendTransaction}
                >
                  Review Purchase
                </button>
                <span className="buy-meta-mask__review-disclaimer">
                  {' '}
                  You will be see a review of this purchase in your{' '}
                  {web3Provider}
                </span>
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
  userAccount: state.wallet.accounts[0],
  errorData: state.buyPanel.errorData,
  rates: state.rates,
  warn: state.buyPanel.warn
})

const mapDispatchToProps = dispatch => ({
  showError: (hint, err) =>
    dispatch({ type: 'SHOW_BUY_ERROR', payload: { hint, err } }),
  showReceipt: payload => dispatch({ type: 'SHOW_BUY_RECEIPT', payload }),
  showWaiting: payload => dispatch({ type: 'SHOW_BUY_WAITING', payload }),
  storeTxData: payload => dispatch({ type: 'UPDATE_ONGOING_TX', payload }),
  updateEth: payload => dispatch({ type: 'UPDATE_BUY_ETH', payload }),
  updateMet: payload => dispatch({ type: 'UPDATE_BUY_MET', payload }),
  clearForm: () => dispatch({ type: 'CLEAR_BUY_FORM' })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuctionBuyForm)
