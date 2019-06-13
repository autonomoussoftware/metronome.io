import React, { Component } from 'react'

import detectProvider from 'web3-detect-provider'
import { connect } from 'react-redux'
import BigNumber from 'bignumber.js'
import PropTypes from 'prop-types'
import pRetry from 'p-retry'
import styled from 'styled-components'
import utils from 'web3-utils'

import DollarValue from '../common/DollarValue'
import TextInput from '../common/TextInput'
import FiatValue from '../common/FiatValue'
import withWeb3 from '../../hocs/withWeb3'
import EthValue from '../common/EthValue'
import MetValue from '../common/MetValue'

const Container = styled.div`
  border-radius: 4px;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.16), 0 2px 4px 0 rgba(0, 0, 0, 0.08);
  background-color: rgb(255, 255, 255);
`

const ErrorMessage = styled.div`
  background: #ff00001f;
  font-size: 13px;
  color: #bc1818;
  padding: 8px;
  line-height: 1.5;
  margin-top: 24px;
  border-radius: 2px;
`

const Header = styled.div`
  border-bottom: 2px solid #d1d1d1;
  padding: 24px 24px 16px 24px;
`

const PriceLabelContainer = styled.div`
  display: flex;
  align-items: baseline;
`

const PriceLabel = styled.div`
  font-size: 16px;
  line-height: 1.8;
  letter-spacing: 0.3px;
  color: rgb(98, 98, 98);
  margin-right: 8px;
`

const EthPrice = styled.div`
  font-family: Roboto Mono;
  font-size: 32px;
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: -0.8px;
  color: rgb(126, 97, 248);
`

const UsdPrice = styled.div`
  font-size: 14px;
  line-height: 2.06;
  color: rgb(98, 98, 98);
`

const Form = styled.form`
  padding: 32px 24px 24px 24px;
`

const SubmitBtn = styled.button`
  font-size: 14px;
  font-weight: 500;
  line-height: 2.06;
  letter-spacing: 0.3px;
  text-align: center;
  color: rgb(255, 255, 255);
  background-color: rgb(126, 97, 248);
  display: block;
  width: 100%;
  border: none;
  padding: 10px 28px;
  margin: 0;
  cursor: pointer;
  margin-top: 24px;

  &[disabled] {
    background-color: rgb(209, 209, 209);
    color: rgb(124, 124, 124);
    cursor: not-allowed;
    pointer-events: none;
  }

  &:not([disabled]):focus,
  &:not([disabled]):active,
  &:not([disabled]):hover {
    opacity: 0.9;
  }
`

const EstimateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 8px 0;
  border-top: 1px solid #d1d1d1;
  border-bottom: 1px solid #d1d1d1;
  margin-top: 24px;
`

const EstimateLabel = styled.div`
  flex-grow: 1;
  font-size: 16px;
  line-height: 1.8;
  letter-spacing: 0.3px;
  color: rgb(126, 97, 248);
  min-width: 80px;
`

const EstimateValue = styled.div``

const EstimateMet = styled.div`
  font-family: Roboto Mono;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  color: rgb(126, 97, 248);
  text-align: right;
  white-space: nowrap;
`

const EstimateUsd = styled.div`
  font-size: 11px;
  line-height: 1.5;
  font-weight: 500;
  text-align: right;
  color: rgb(98, 98, 98);
`

const GET_TX_RETRIES = 5
const GET_TX_TIMEOUT = 250

const web3Provider = detectProvider('web wallet')

function throwIfNull(obj) {
  if (!obj) {
    throw new Error('Object should not be null')
  }
  return obj
}

class BuyForm extends Component {
  static propTypes = {
    gasOverestimation: PropTypes.number.isRequired,
    auctionsAddress: PropTypes.string.isRequired,
    currentPrice: PropTypes.string.isRequired,
    showReceipt: PropTypes.func.isRequired,
    showWaiting: PropTypes.func.isRequired,
    storeTxData: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired,
    clearForm: PropTypes.func.isRequired,
    updateEth: PropTypes.func.isRequired,
    errorData: PropTypes.shape({
      hint: PropTypes.string,
      err: PropTypes.shape({
        message: PropTypes.string.isRequired
      })
    }),
    balance: PropTypes.string,
    address: PropTypes.string,
    symbol: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired,
    web3: PropTypes.shape({
      eth: PropTypes.shape({
        getTransaction: PropTypes.func.isRequired
      }).isRequired
    }),
    eth: PropTypes.string.isRequired,
    met: PropTypes.string.isRequired
  }

  sendTransaction = e => {
    const {
      gasOverestimation,
      auctionsAddress,
      showReceipt,
      showWaiting,
      storeTxData,
      clearForm,
      showError,
      address,
      web3,
      eth
    } = this.props

    e.preventDefault()

    const txObject = {
      value: utils.toWei(eth.replace(',', '.')),
      from: address,
      to: auctionsAddress
    }

    showWaiting()

    try {
      window.gtag('event', 'Buy MET in auction initiated', {
        event_category: 'Buy'
      })
      web3.eth
        .estimateGas(txObject)
        .then(gas =>
          web3.eth.getGasPrice().then(gasPrice => ({
            gasPrice,
            gas: Math.round(gas * gasOverestimation)
          }))
        )
        .then(gasData =>
          web3.eth
            .sendTransaction({ ...txObject, ...gasData })
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
                .catch(() => ({ from: address, hash }))
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
        )
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
      updateEth,
      errorData,
      balance,
      address,
      symbol,
      rate,
      eth,
      met
    } = this.props

    const fiatValue = new BigNumber(eth).times(rate).toString()

    const allowBuy =
      new BigNumber(eth).gt(0) &&
      address &&
      new BigNumber(eth).lte(utils.fromWei(balance))

    function withRate(eventHandler) {
      return function(ev) {
        if (currentPrice) {
          eventHandler({
            value: ev.target.value || '0',
            rate: currentPrice
          })
        }
      }
    }

    function formatValue(value) {
      const bigValue = new BigNumber(value)
      return bigValue.toFixed()
    }

    return (
      <Container>
        <Header>
          <PriceLabelContainer>
            <PriceLabel>Price per MET</PriceLabel>
            <UsdPrice>
              (<DollarValue>{currentPrice}</DollarValue>)
            </UsdPrice>
          </PriceLabelContainer>

          <EthPrice>
            <EthValue>{currentPrice}</EthValue>
          </EthPrice>
        </Header>

        <Form onSubmit={this.sendTransaction}>
          <TextInput
            label="Amount"
            placeholder="0.00"
            autoFocus
            disabled={!currentPrice}
            onChange={withRate(updateEth)}
            suffix={symbol}
            value={formatValue(eth)}
            type="number"
            id="coinAmount"
          />

          <EstimateContainer>
            <EstimateLabel>You will receive:</EstimateLabel>
            <EstimateValue>
              <EstimateMet>
                <MetValue unit="met">{met}</MetValue>
              </EstimateMet>
              <EstimateUsd>
                <FiatValue suffix="USD">{fiatValue}</FiatValue>
              </EstimateUsd>
            </EstimateValue>
          </EstimateContainer>

          {errorData &&
            errorData.hint &&
            errorData.err &&
            errorData.err.message && (
              <ErrorMessage title={errorData.err.message}>
                {errorData.hint}
              </ErrorMessage>
            )}

          <div
            data-rh={
              !address
                ? 'You need to login to your wallet'
                : !new BigNumber(eth).gt(0)
                ? 'Enter a valid amount'
                : new BigNumber(eth).gt(utils.fromWei(balance))
                ? 'Insufficient funds'
                : undefined
            }
          >
            <SubmitBtn disabled={!allowBuy} type="submit">
              {web3Provider === 'none'
                ? 'REVIEW PURCHASE'
                : `REVIEW IN ${web3Provider.toUpperCase()}`}
            </SubmitBtn>
          </div>
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  ...state.buyForm,
  gasOverestimation: state.config.chains[state.chain.active].gasOverestimation,
  auctionsAddress: state.config.chains[state.chain.active].auctionAddress,
  currentPrice: state.auction.status.currentPrice,
  errorData: state.buyPanel.errorData,
  address: state.wallet.address,
  balance: state.wallet.balance,
  symbol: state.config.chains[state.chain.active].symbol,
  rate: state.rates[state.config.chains[state.chain.active].symbol]
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
)(withWeb3(BuyForm))
