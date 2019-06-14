import React, { Component } from 'react'
import MetronomeContracts from 'metronome-contracts'
import detectProvider from 'web3-detect-provider'
import { connect } from 'react-redux'
import BigNumber from 'bignumber.js'
import PropTypes from 'prop-types'
import debounce from 'lodash.debounce'
import pRetry from 'p-retry'
import styled from 'styled-components'
import utils from 'web3-utils'

import MinReturnCheckbox from './MinReturnCheckbox'
import DollarValue from '../common/DollarValue'
import TextInput from '../common/TextInput'
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

const Estimate = styled.div`
  font-size: 16px;
  line-height: 1.8;
  letter-spacing: 0.3px;
  color: ${p => (p.status === 'failure' ? '#d46045' : '#626262')};
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

class ConvertForm extends Component {
  static propTypes = {
    updateEstimateSuccess: PropTypes.func.isRequired,
    updateEstimateFailure: PropTypes.func.isRequired,
    updateEstimateStart: PropTypes.func.isRequired,
    onUseMinimumToggle: PropTypes.func.isRequired,
    estimateStatus: PropTypes.oneOf(['init', 'pending', 'success', 'failure'])
      .isRequired,
    estimateError: PropTypes.string,
    gasOverestimation: PropTypes.number.isRequired,
    converterAddress: PropTypes.string.isRequired,
    currentPrice: PropTypes.string.isRequired,
    showReceipt: PropTypes.func.isRequired,
    showWaiting: PropTypes.func.isRequired,
    storeTxData: PropTypes.func.isRequired,
    useMinimum: PropTypes.bool.isRequired,
    showError: PropTypes.func.isRequired,
    clearForm: PropTypes.func.isRequired,
    updateEth: PropTypes.func.isRequired,
    errorData: PropTypes.shape({
      hint: PropTypes.string,
      err: PropTypes.shape({
        message: PropTypes.string.isRequired
      })
    }),
    estimate: PropTypes.string,
    chainId: PropTypes.string.isRequired,
    balance: PropTypes.string,
    address: PropTypes.string,
    symbol: PropTypes.string.isRequired,
    web3: PropTypes.shape({
      eth: PropTypes.shape({
        getTransaction: PropTypes.func.isRequired,
        Contract: PropTypes.func.isRequired
      }).isRequired
    }),
    eth: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
    const abi = MetronomeContracts[props.chainId].AutonomousConverter.abi
    this.contract = new props.web3.eth.Contract(abi, props.converterAddress)
  }

  sendTransaction = e => {
    const {
      gasOverestimation,
      converterAddress,
      showReceipt,
      showWaiting,
      storeTxData,
      useMinimum,
      clearForm,
      showError,
      estimate,
      address,
      web3,
      eth
    } = this.props

    e.preventDefault()

    const minReturn = useMinimum && typeof estimate === 'string' ? estimate : 1

    const txObject = {
      value: utils.toWei(eth.replace(',', '.')),
      data: this.contract.methods.convertEthToMet(minReturn).encodeABI(),
      from: address,
      to: converterAddress
    }

    showWaiting()

    try {
      window.gtag('event', 'Convert ETH to MET initiated', {
        event_category: 'Convert'
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
                window.gtag('event', 'Convert ETH to MET failed', {
                  event_category: 'Convert'
                })
                showError(
                  'Conversion reverted - Try again',
                  new Error('Transaction status is falsy')
                )
                return
              }
              if (!receipt.logs.length) {
                window.gtag('event', 'Convert ETH to MET failed', {
                  event_category: 'Convert'
                })
                showError(
                  'Conversion failed - Try again',
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
                  window.gtag('event', 'Convert ETH to MET succeeded', {
                    event_category: 'Convert'
                  })
                  storeTxData(tx)
                  showReceipt(receipt)
                  clearForm()
                })
                .catch(function(err) {
                  window.gtag('event', 'Convert ETH to MET failed', {
                    event_category: 'Convert'
                  })
                  showError(
                    `Something went wrong - Check your wallet or explorer for transaction ${hash}`,
                    err
                  )
                })
            })
            .on('error', function(err) {
              window.gtag('event', 'Convert ETH to MET failed', {
                event_category: 'Convert'
              })
              showError('Transaction error - Try again', err)
            })
        )
    } catch (err) {
      window.gtag('event', 'Convert ETH to MET failed', {
        event_category: 'Convert'
      })
      showError('Transaction could not be sent - Try again', err)
    }
  }

  getEstimate = debounce(
    // eslint-disable-next-line
    ethValue => {
      const {
        updateEstimateSuccess,
        updateEstimateFailure,
        updateEstimateStart,
        web3
      } = this.props

      updateEstimateStart()

      let weiValue

      try {
        weiValue = web3.utils.toWei(ethValue.replace(',', '.'))
      } catch (e) {
        updateEstimateFailure({ message: 'Invalid value' })
      }

      if (!weiValue) return

      this.contract.methods
        .getMetForEthResult(weiValue)
        .call()
        .then(updateEstimateSuccess)
        .catch(updateEstimateFailure)
    },
    500,
    { leading: true, trailing: true }
  )

  componentWillUpdate({ currentPrice, eth }) {
    // Recalculate estimate if amount or price changed
    if (
      eth &&
      new BigNumber(eth).gt(0) &&
      (this.props.currentPrice !== currentPrice || this.props.eth !== eth)
    ) {
      this.getEstimate(eth)
    }
  }

  // eslint-disable-next-line complexity
  render() {
    const {
      estimateStatus,
      estimateError,
      currentPrice,
      useMinimum,
      updateEth,
      errorData,
      estimate,
      balance,
      address,
      symbol,
      eth
    } = this.props

    const allowConversion =
      new BigNumber(eth).gt(0) &&
      address &&
      (!useMinimum || estimate) &&
      new BigNumber(eth).lte(utils.fromWei(balance))

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
            onChange={e => updateEth(e.target.value)}
            suffix={symbol}
            value={formatValue(eth)}
            type="number"
            id="coinAmount"
          />

          <EstimateContainer>
            {estimateStatus === 'init' && (
              <Estimate status={estimateStatus}>
                Enter a valid amount to get a conversion estimate.
              </Estimate>
            )}
            {estimateStatus === 'pending' && (
              <Estimate status={estimateStatus}>
                Getting conversion estimate...
              </Estimate>
            )}
            {estimateStatus === 'success' && (
              <React.Fragment>
                <EstimateLabel>You will receive:</EstimateLabel>
                <EstimateValue>
                  <EstimateMet>
                    <MetValue unit="met">{estimate}</MetValue>
                  </EstimateMet>
                </EstimateValue>
              </React.Fragment>
            )}
            {estimateStatus === 'failure' && (
              <Estimate status={estimateStatus}>{estimateError}</Estimate>
            )}
          </EstimateContainer>

          <MinReturnCheckbox
            useMinimum={this.props.useMinimum}
            onToggle={this.props.onUseMinimumToggle}
            label="Get expected MET amount or cancel"
          />

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
            <SubmitBtn disabled={!allowConversion} type="submit">
              {web3Provider === 'none'
                ? 'REVIEW CONVERSION'
                : `REVIEW IN ${web3Provider.toUpperCase()}`}
            </SubmitBtn>
          </div>
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  ...state.convertForm,
  gasOverestimation: state.config.chains[state.chain.active].gasOverestimation,
  converterAddress: state.config.chains[state.chain.active].converterAddress,
  currentPrice: state.converter.status.currentPrice,
  errorData: state.convertPanel.errorData,
  address: state.wallet.address,
  balance: state.wallet.balance,
  chainId: state.chain.active,
  symbol: state.config.chains[state.chain.active].symbol
})

const mapDispatchToProps = dispatch => ({
  showError: (hint, err) =>
    dispatch({ type: 'SHOW_CONVERT_ERROR', payload: { hint, err } }),
  showReceipt: payload => dispatch({ type: 'SHOW_CONVERT_RECEIPT', payload }),
  showWaiting: payload => dispatch({ type: 'SHOW_CONVERT_WAITING', payload }),
  storeTxData: payload => dispatch({ type: 'UPDATE_ONGOING_TX', payload }),
  updateEth: payload => dispatch({ type: 'UPDATE_CONVERT_ETH', payload }),
  clearForm: () => dispatch({ type: 'CLEAR_CONVERT_FORM' }),
  updateEstimateStart: payload =>
    dispatch({ type: 'UPDATE_CONVERT_ESTIMATE_START', payload }),
  updateEstimateSuccess: payload =>
    dispatch({ type: 'UPDATE_CONVERT_ESTIMATE_SUCCESS', payload }),
  updateEstimateFailure: payload =>
    dispatch({ type: 'UPDATE_CONVERT_ESTIMATE_FAILURE', payload }),
  onUseMinimumToggle: () => dispatch({ type: 'USE_MINIMUM_TOGGLE' })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withWeb3(ConvertForm))
