import detectProvider from 'web3-detect-provider'
import { debounce } from 'lodash'
import { connect } from 'react-redux'
import BigNumber from 'bignumber.js'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import pRetry from 'p-retry'
import React from 'react'
import abi from 'metronome-contracts/src/abis/AutonomousConverter'

import MinReturnCheckbox from './MinReturnCheckbox'
import { throwIfNull } from '../utils'
import TextInput from './TextInput'
import EthValue from './EthValue'
import MetValue from './MetValue'
import { Btn } from './Btn'

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
  margin-top: 15px;
  font-size: 13px;
  color: ${p =>
    p.status === 'failure'
      ? '#d46045'
      : p.status === 'success'
        ? 'white'
        : '#c2c4c6'};
`

const web3Provider = detectProvider('web wallet')

const GET_TX_RETRIES = 5
const GET_TX_TIMEOUT = 250

class ConvertPanelForm extends React.Component {
  static propTypes = {
    updateEstimateSuccess: PropTypes.func.isRequired,
    updateEstimateFailure: PropTypes.func.isRequired,
    updateEstimateStart: PropTypes.func.isRequired,
    onUseMinimumToggle: PropTypes.func.isRequired,
    estimateStatus: PropTypes.oneOf(['init', 'pending', 'success', 'failure'])
      .isRequired,
    estimateError: PropTypes.string,
    currentPrice: PropTypes.string,
    userAccount: PropTypes.string,
    showReceipt: PropTypes.func.isRequired,
    showWaiting: PropTypes.func.isRequired,
    storeTxData: PropTypes.func.isRequired,
    useMinimum: PropTypes.bool.isRequired,
    clearForm: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired,
    updateEth: PropTypes.func.isRequired,
    errorData: PropTypes.shape({
      err: PropTypes.shape({
        message: PropTypes.string.isRequired
      })
    }),
    estimate: PropTypes.string,
    config: PropTypes.shape({
      converterAddress: PropTypes.string.isRequired
    }).isRequired,
    warn: PropTypes.string,
    web3: PropTypes.shape({
      utils: PropTypes.shape({
        toWei: PropTypes.func.isRequired
      }).isRequired,
      eth: PropTypes.shape({
        sendTransaction: PropTypes.func.isRequired,
        getTransaction: PropTypes.func.isRequired,
        Contract: PropTypes.func.isRequired
      }).isRequired
    }).isRequired,
    eth: PropTypes.string
  }

  contract = new this.props.web3.eth.Contract(
    abi,
    this.props.config.converterAddress
  )

  // eslint-disable-next-line
  sendTransaction = e => {
    const {
      showReceipt,
      showWaiting,
      storeTxData,
      userAccount,
      useMinimum,
      clearForm,
      showError,
      estimate,
      config,
      web3,
      eth
    } = this.props

    e.preventDefault()

    const minReturn = useMinimum && typeof estimate === 'string' ? estimate : 1

    const txObject = {
      value: web3.utils.toWei(eth.replace(',', '.')),
      data: this.contract.methods.convertEthToMet(minReturn).encodeABI(),
      from: userAccount,
      to: config.converterAddress
    }

    showWaiting()

    try {
      window.gtag('event', 'Convert MET initiated', {
        event_category: 'Convert'
      })
      web3.eth
        .sendTransaction(txObject)
        .on('transactionHash', function(hash) {
          showWaiting(hash)
        })
        .on('receipt', function(receipt) {
          if (!receipt.status) {
            window.gtag('event', 'Convert MET failed', {
              event_category: 'Convert'
            })
            showError(
              'Conversion reverted - Try again',
              new Error('Transaction status is falsy')
            )
            return
          }
          if (!receipt.logs.length) {
            window.gtag('event', 'Convert MET failed', {
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
            .catch(() => ({ from: userAccount, hash }))
            .then(function(tx) {
              window.gtag('event', 'Convert MET succeeded', {
                event_category: 'Convert'
              })
              storeTxData(tx)
              showReceipt(receipt)
              clearForm()
            })
            .catch(function(err) {
              window.gtag('event', 'Convert MET failed', {
                event_category: 'Convert'
              })
              showError(
                `Something went wrong - Check your wallet or explorer for transaction ${hash}`,
                err
              )
            })
        })
        .on('error', function(err) {
          window.gtag('event', 'Convert MET failed', {
            event_category: 'Convert'
          })
          showError('Transaction error - Try again', err)
        })
    } catch (err) {
      window.gtag('event', 'Convert MET failed', {
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

  onAmountChange = ev => this.props.updateEth(ev.target.value)

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
      userAccount,
      useMinimum,
      errorData,
      estimate,
      warn,
      eth
    } = this.props

    const allowConvert =
      eth &&
      (!useMinimum || estimate) &&
      new BigNumber(eth).gt(0) &&
      userAccount &&
      !warn

    return (
      <Form id="convertForm" onSubmit={this.sendTransaction}>
        {errorData &&
          errorData.err &&
          errorData.err.message && (
            <ErrorBox title={errorData.err.message}>{errorData.hint}</ErrorBox>
          )}

        {warn && <ErrorBox>{warn}</ErrorBox>}

        <PriceContainer>
          <PriceLabel>Current Converter Price</PriceLabel>
          <PriceValue>
            <EthValue>{currentPrice}</EthValue>
          </PriceValue>
        </PriceContainer>

        <Separator />

        <TextInput
          placeholder="0.00"
          autoFocus
          onChange={this.onAmountChange}
          suffix="ETH"
          label="Amount (ETH)"
          value={eth}
          type="number"
          id="ethAmount"
        />

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
          <Estimate status={estimateStatus}>
            You would get approximately <MetValue>{estimate}</MetValue>.
          </Estimate>
        )}
        {estimateStatus === 'failure' && (
          <Estimate status={estimateStatus}>{estimateError}</Estimate>
        )}

        <MinReturnCheckbox
          useMinimum={this.props.useMinimum}
          onToggle={this.props.onUseMinimumToggle}
          label="Get expected MET amount or cancel"
        />

        <Separator />

        <Message>
          By choosing &quot;Review Conversion&quot; you are agreeing to our
          disclaimer and terms of service.
        </Message>

        <Btn disabled={!allowConvert} submit block form="convertForm">
          Review Conversion
        </Btn>

        <Message>
          You will be see a review of this conversion in your {web3Provider}.
        </Message>
      </Form>
    )
  }
}

const mapStateToProps = state => ({
  ...state.convertForm,
  currentPrice: state.converter.status.currentPrice,
  userAccount: state.wallet.accounts[0],
  errorData: state.convertPanel.errorData,
  config: state.config,
  rates: state.rates,
  warn: state.convertPanel.warn
})

const mapDispatchToProps = dispatch => ({
  clearForm: () =>
    dispatch({
      type: 'CLEAR_CONVERT_FORM'
    }),
  showError: (hint, err) =>
    dispatch({
      type: 'SHOW_CONVERT_ERROR',
      payload: { hint, err }
    }),
  showReceipt: payload =>
    dispatch({
      type: 'SHOW_CONVERT_RECEIPT',
      payload
    }),
  showWaiting: payload =>
    dispatch({
      type: 'SHOW_CONVERT_WAITING',
      payload
    }),
  storeTxData: payload =>
    dispatch({
      type: 'UPDATE_ONGOING_TX',
      payload
    }),
  updateEth: payload =>
    dispatch({
      type: 'UPDATE_CONVERT_ETH',
      payload
    }),
  updateEstimateStart: payload =>
    dispatch({
      type: 'UPDATE_CONVERT_ESTIMATE_START',
      payload
    }),
  updateEstimateSuccess: payload =>
    dispatch({
      type: 'UPDATE_CONVERT_ESTIMATE_SUCCESS',
      payload
    }),
  updateEstimateFailure: payload =>
    dispatch({
      type: 'UPDATE_CONVERT_ESTIMATE_FAILURE',
      payload
    }),
  onUseMinimumToggle: () => dispatch({ type: 'USE_MINIMUM_TOGGLE' })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConvertPanelForm)
