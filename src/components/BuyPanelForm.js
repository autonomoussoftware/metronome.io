import detectProvider from 'web3-detect-provider'
import { connect } from 'react-redux'
import BigNumber from 'bignumber.js'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import pRetry from 'p-retry'
import React from 'react'

import { throwIfNull } from '../utils'
import ValueInput from './ValueInput'
import FiatValue from './FiatValue'
import EthValue from './EthValue'
import MetValue from './MetValue'
import { Btn } from './Btn'
import Sp from './Spacing'

const Form = styled.form`
  padding: 40px 20px;
`

const PriceContainer = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`

const PriceLabel = styled.div`
  font-size: 16px;
`

const PriceValue = styled.div`
  font-size: 20px;
`

const Message = styled.div`
  margin: 25px 0;
  font-size: 13px;
`

const Separator = styled.div`
  border-bottom: 1px solid #202020;
  margin: 15px 0;
`

const ErrorBox = styled.div`
  background-color: rgba(212, 96, 69, 0.1);
  border: solid 1px #d46045;
  border-radius: 2px;
  margin-bottom: 20px;
  padding: 8px;
  text-align: center;
  color: #d46045;
  font-size: 13px;
`

const Estimate = styled.div`
  text-align: right;
  margin-top: 15px;
  font-size: 13px;
  color: white;
`

const web3Provider = detectProvider('web wallet')

const GET_TX_RETRIES = 5
const GET_TX_TIMEOUT = 250

class BuyPanelForm extends React.Component {
  static propTypes = {
    currentPrice: PropTypes.string.isRequired,
    userAccount: PropTypes.string.isRequired,
    showReceipt: PropTypes.func.isRequired,
    showWaiting: PropTypes.func.isRequired,
    storeTxData: PropTypes.func.isRequired,
    clearForm: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired,
    errorData: PropTypes.shape({
      hint: PropTypes.string,
      err: PropTypes.shape({
        message: PropTypes.string.isRequired
      })
    }),
    updateEth: PropTypes.func.isRequired,
    updateMet: PropTypes.func.isRequired,
    config: PropTypes.shape({
      auctionsAddress: PropTypes.string.isRequired
    }).isRequired,
    rates: PropTypes.shape({
      ETH_USD: PropTypes.number.isRequired
    }).isRequired,
    web3: PropTypes.shape({
      utils: PropTypes.shape({
        toWei: PropTypes.func.isRequired
      }).isRequired,
      eth: PropTypes.shape({
        sendTransaction: PropTypes.func.isRequired,
        getTransaction: PropTypes.func.isRequired
      }).isRequired
    }).isRequired,
    warn: PropTypes.string,
    eth: PropTypes.string.isRequired,
    met: PropTypes.string.isRequired
  }

  // eslint-disable-next-line
  sendTransaction = e => {
    const {
      showReceipt,
      showWaiting,
      storeTxData,
      userAccount,
      clearForm,
      showError,
      config,
      web3,
      eth
    } = this.props

    e.preventDefault()

    const txObject = {
      value: web3.utils.toWei(eth.replace(',', '.')),
      from: userAccount,
      to: config.auctionsAddress
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

  // eslint-disable-next-line complexity
  render() {
    const {
      currentPrice,
      userAccount,
      errorData,
      updateEth,
      updateMet,
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
      <Form id="buyForm" onSubmit={this.sendTransaction}>
        {errorData &&
          errorData.err &&
          errorData.err.message && (
            <ErrorBox title={errorData.err.message}>{errorData.hint}</ErrorBox>
          )}
        {warn && <ErrorBox>{warn}</ErrorBox>}

        <PriceContainer>
          <PriceLabel>Current Auction Price</PriceLabel>
          <PriceValue>
            <EthValue>{currentPrice}</EthValue>
          </PriceValue>
        </PriceContainer>

        <Separator />

        <ValueInput
          placeholder="0.00"
          autoFocus
          onChange={withRate(updateMet)}
          suffix="MET"
          value={formatValue(met)}
          label="Amount (MET)"
          type="number"
          id="metAmount"
        />

        <Sp mt={2}>
          <ValueInput
            placeholder="0.00"
            onChange={withRate(updateEth)}
            suffix="ETH"
            value={formatValue(eth)}
            label="Cost (ETH)"
            type="number"
            id="ethAmount"
          />
        </Sp>

        <Separator />

        <Estimate>
          Buying <MetValue unit="met">{met}</MetValue> @{' '}
          <EthValue>{currentPrice}</EthValue> ={' '}
          <FiatValue suffix="USD">{fiatValue}</FiatValue>
        </Estimate>

        <Separator />

        <Message>
          By choosing &quot;Review Purchase&quot; you are agreeing to our
          disclaimer and terms of service.
        </Message>

        <Btn disabled={!allowBuy} submit block form="buyForm">
          Review Purchase
        </Btn>

        <Message>
          You will be see a review of this purchase in your {web3Provider}.
        </Message>
      </Form>
    )
  }
}

const mapStateToProps = state => ({
  ...state.buyForm,
  currentPrice: state.auction.status.currentPrice,
  userAccount: state.wallet.accounts[0],
  errorData: state.buyPanel.errorData,
  config: state.config,
  rates: state.rates,
  warn: state.buyPanel.warn
})

const mapDispatchToProps = dispatch => ({
  clearForm: () =>
    dispatch({
      type: 'CLEAR_BUY_FORM'
    }),
  showError: (hint, err) =>
    dispatch({
      type: 'SHOW_BUY_ERROR',
      payload: { hint, err }
    }),
  showReceipt: payload =>
    dispatch({
      type: 'SHOW_BUY_RECEIPT',
      payload
    }),
  showWaiting: payload =>
    dispatch({
      type: 'SHOW_BUY_WAITING',
      payload
    }),
  storeTxData: payload =>
    dispatch({
      type: 'UPDATE_ONGOING_TX',
      payload
    }),
  updateEth: payload =>
    dispatch({
      type: 'UPDATE_BUY_ETH',
      payload
    }),
  updateMet: payload =>
    dispatch({
      type: 'UPDATE_BUY_MET',
      payload
    })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyPanelForm)
