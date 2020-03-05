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

import withProviderPermission from '../../hocs/withProviderPermission'
import MinReturnCheckbox from './MinReturnCheckbox'
import ConvertToggle from './ConvertToggle'
import ChainWarning from '../common/ChainWarning'
import DollarValue from '../common/DollarValue'
import WalletInfo from '../../providers/WalletInfo'
import TextInput from '../common/TextInput'
import withWeb3 from '../../hocs/withWeb3'
import EthValue from '../common/EthValue'
import Portal from '../common/Portal'

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

class ConvertMetForm extends Component {
  static propTypes = {
    updateEstimateSuccess: PropTypes.func.isRequired,
    updateEstimateFailure: PropTypes.func.isRequired,
    updateEstimateStart: PropTypes.func.isRequired,
    onUseMinimumToggle: PropTypes.func.isRequired,
    PermissionMessage: PropTypes.func.isRequired,
    permissionStatus: PropTypes.oneOf(['not-asked', 'granted', 'denied'])
      .isRequired,
    estimateStatus: PropTypes.oneOf(['init', 'pending', 'success', 'failure'])
      .isRequired,
    estimateError: PropTypes.string,
    gasOverestimation: PropTypes.number.isRequired,
    converterAddress: PropTypes.string.isRequired,
    metTokenAddress: PropTypes.string.isRequired,
    currentPrice: PropTypes.string.isRequired,
    showReceipt: PropTypes.func.isRequired,
    showWaiting: PropTypes.func.isRequired,
    storeTxData: PropTypes.func.isRequired,
    useMinimum: PropTypes.bool.isRequired,
    showError: PropTypes.func.isRequired,
    clearForm: PropTypes.func.isRequired,
    updateMet: PropTypes.func.isRequired,
    errorData: PropTypes.shape({
      hint: PropTypes.string,
      err: PropTypes.shape({
        message: PropTypes.string.isRequired
      })
    }),
    metBalance: PropTypes.string,
    onToggle: PropTypes.func.isRequired,
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
    met: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
    const converterAbi =
      MetronomeContracts[props.chainId].AutonomousConverter.abi
    this.converterContract = props.web3
      ? new props.web3.eth.Contract(converterAbi, props.converterAddress)
      : null

    const tokenAbi = MetronomeContracts[props.chainId].METToken.abi
    this.tokenContract = props.web3
      ? new props.web3.eth.Contract(tokenAbi, props.metTokenAddress)
      : null
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
      met
    } = this.props

    e.preventDefault()

    if (!this.converterContract || !this.tokenContract) return

    const minReturn = useMinimum && typeof estimate === 'string' ? estimate : 1

    const weiAmount = utils.toWei(met.replace(',', '.'))

    try {
      window.gtag('event', 'Convert MET to ETH initiated', {
        event_category: 'Convert'
      })

      Promise.all([
        this.tokenContract.methods.allowance(address, converterAddress).call(),
        web3.eth.getGasPrice()
      ]).then(([allowance, gasPrice]) => {
        // Prepare the array to hold all the transactions to send
        const txs = []

        // If existing but insufficient allowance, reset it first
        if (
          utils.toBN(allowance).gtn(0) &&
          utils.toBN(allowance).lt(utils.toBN(weiAmount))
        ) {
          txs.push({
            tx: this.tokenContract.methods.approve(converterAddress, 0),
            prompt: `Approval Cancellation required. Confirm in ${web3Provider}`,
            waiting: 'Waiting for Approval Cancellation to be mined',
            showReceipt: false
          })
        }

        // If insufficient or no allowance, set it
        if (utils.toBN(allowance).lt(utils.toBN(weiAmount))) {
          txs.push({
            tx: this.tokenContract.methods.approve(converterAddress, weiAmount),
            prompt: `Confirm this Approval in ${web3Provider}`,
            waiting: 'Waiting for Approval to be mined',
            showReceipt: false
          })
        }

        // Finally, enqueue conversion
        txs.push({
          tx: this.converterContract.methods.convertMetToEth(
            weiAmount,
            minReturn
          ),
          prompt: `Finish this Conversion in ${web3Provider}`,
          waiting: 'Waiting for Conversion to be mined',
          showReceipt: true
        })

        const promiEvents = txs.map((item, i) => () => {
          showWaiting({ message: item.prompt })
          return web3.eth.getTransactionCount(address, 'pending').then(nonce =>
            item.tx.estimateGas({ from: address }).then(gas =>
              item.tx
                .send({
                  from: address,
                  nonce,
                  gasPrice,
                  gas: Math.ceil(gas * gasOverestimation)
                })
                .on('transactionHash', function(hash) {
                  showWaiting({ hash, message: item.waiting })
                })
                .on('receipt', function(receipt) {
                  if (!receipt.status) {
                    window.gtag('event', 'Convert MET to ETH failed', {
                      event_category: 'Convert'
                    })
                    showError(
                      'Conversion reverted - Try again',
                      new Error('Transaction status is falsy')
                    )
                    return
                  }

                  const hash = receipt.transactionHash
                  return pRetry(
                    () => web3.eth.getTransaction(hash).then(throwIfNull),
                    {
                      minTimeout: GET_TX_TIMEOUT,
                      retries: GET_TX_RETRIES
                    }
                  )
                    .catch(() => ({ from: address, hash }))
                    .then(function(tx) {
                      window.gtag('event', 'Convert MET to ETH succeeded', {
                        event_category: 'Convert'
                      })
                      storeTxData(tx)
                      if (item.showReceipt) showReceipt(receipt)
                      clearForm()
                    })
                    .catch(function(err) {
                      window.gtag('event', 'Convert MET to ETH failed', {
                        event_category: 'Convert'
                      })
                      showError(
                        `Something went wrong - Check your wallet or explorer for transaction ${hash}`,
                        err
                      )
                    })
                })
                .on('error', function(err) {
                  window.gtag('event', 'Convert MET to ETH failed', {
                    event_category: 'Convert'
                  })
                  showError(`Something went wrong: ${err.message}`, err)
                })
            )
          )
        })

        // Send in series to allow better gas estimation and interop with
        // MetaMask that seems unable to handle parallel transactions
        return promiEvents
          .reduce((p1, p2) => p1.then(() => p2()), Promise.resolve())
          .catch(function(err) {
            showError(`Something went wrong: ${err.message}`, err)
          })
      })
    } catch (err) {
      window.gtag('event', 'Convert MET to ETH failed', {
        event_category: 'Convert'
      })
      showError('Transaction could not be sent - Try again', err)
    }
  }

  getEstimate = debounce(
    // eslint-disable-next-line
    metValue => {
      const {
        updateEstimateSuccess,
        updateEstimateFailure,
        updateEstimateStart,
        web3
      } = this.props

      if (!this.converterContract) return

      updateEstimateStart()

      let weiValue

      try {
        weiValue = web3.utils.toWei(metValue.replace(',', '.'))
      } catch (e) {
        updateEstimateFailure({ message: 'Invalid value' })
      }

      if (!weiValue) return

      this.converterContract.methods
        .getEthForMetResult(weiValue)
        .call()
        .then(updateEstimateSuccess)
        .catch(updateEstimateFailure)
    },
    500,
    { leading: true, trailing: true }
  )

  componentWillUpdate({ currentPrice, met }) {
    // Recalculate estimate if amount or price changed
    if (
      met &&
      new BigNumber(met).gt(0) &&
      (this.props.currentPrice !== currentPrice || this.props.met !== met)
    ) {
      this.getEstimate(met)
    }
  }

  // eslint-disable-next-line complexity
  render() {
    const {
      PermissionMessage,
      permissionStatus,
      estimateStatus,
      estimateError,
      currentPrice,
      useMinimum,
      metBalance,
      updateMet,
      errorData,
      onToggle,
      estimate,
      address,
      balance,
      symbol,
      met
    } = this.props

    const allowConversion =
      new BigNumber(balance).gt(0) &&
      new BigNumber(met).gt(0) &&
      address &&
      (!useMinimum || estimate) &&
      new BigNumber(met).lte(utils.fromWei(metBalance))

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
          <ConvertToggle onToggle={onToggle} convertFrom="met" />
          <TextInput
            label="Amount"
            placeholder="0.00"
            autoFocus
            disabled={!currentPrice || !address}
            onChange={e => updateMet(e.target.value)}
            suffix="MET"
            value={formatValue(met)}
            type="number"
            id="metAmount"
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
                    <EthValue>{estimate}</EthValue>
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
            label={`Get expected ${symbol} amount or cancel`}
          />

          {errorData &&
            errorData.hint &&
            errorData.err &&
            errorData.err.message && (
              <ErrorMessage title={errorData.err.message}>
                {errorData.hint}
              </ErrorMessage>
            )}

          <PermissionMessage web3Provider={web3Provider} />

          <div
            data-rh={
              permissionStatus === 'denied'
                ? `${web3Provider} permissions required`
                : !address
                ? 'You need to login to your wallet'
                : !new BigNumber(met).gt(0)
                ? 'Enter a valid amount'
                : new BigNumber(met).gt(utils.fromWei(metBalance))
                ? 'Insufficient funds'
                : !new BigNumber(balance).gt(0)
                ? 'Insufficient funds to pay for gas cost'
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
        <Portal selector="#marquee">
          <ChainWarning />
        </Portal>
        <WalletInfo />
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  ...state.convertForm,
  gasOverestimation: state.config.chains[state.chain.active].gasOverestimation,
  converterAddress: state.config.chains[state.chain.active].converterAddress,
  metTokenAddress: state.config.chains[state.chain.active].metTokenAddress,
  currentPrice: state.converter.status.currentPrice,
  metBalance: state.wallet.metBalance,
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
  updateMet: payload => dispatch({ type: 'UPDATE_CONVERT_MET', payload }),
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
)(withWeb3(withProviderPermission(ConvertMetForm)))
