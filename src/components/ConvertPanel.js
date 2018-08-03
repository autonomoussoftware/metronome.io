import detectProvider from 'web3-detect-provider'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

import ConvertPanelOptions from './ConvertPanelOptions'
import ConvertPanelWaiting from './ConvertPanelWaiting'
import ConvertPanelReceipt from './ConvertPanelReceipt'
import ConvertPanelForm from './ConvertPanelForm'
import CoinCapRate from '../providers/CoinCapRate'
import withWeb3 from '../hocs/withWeb3'
import Panel from './Panel'

const ConvertPanelFormWithWeb3 = withWeb3(ConvertPanelForm)

const web3Provider = detectProvider('web wallet')

class ConvertPanel extends React.Component {
  static propTypes = {
    updateEthUsdRate: PropTypes.func.isRequired,
    backToOptions: PropTypes.func.isRequired,
    userAccount: PropTypes.string,
    currentStep: PropTypes.oneOf([
      'options',
      'waiting',
      'receipt',
      'error',
      'form'
    ]).isRequired,
    hidePanel: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired
  }

  render() {
    const {
      updateEthUsdRate,
      backToOptions,
      currentStep,
      userAccount,
      hidePanel,
      isOpen
    } = this.props

    const steps = {
      options: {
        title: 'Convert ETH to MET',
        element: <ConvertPanelOptions />
      },
      form: {
        title: userAccount
          ? `Convert with account ${userAccount.substr(0, 6)}*`
          : `Convert with ${web3Provider}`,
        element: <ConvertPanelFormWithWeb3 />,
        onBackClick: backToOptions
      },
      waiting: {
        title: 'Waiting for your conversion',
        element: <ConvertPanelWaiting />
      },
      receipt: {
        title: 'Receipt',
        element: <ConvertPanelReceipt />
      }
    }

    return (
      <Panel
        onRequestClose={hidePanel}
        onBackClick={steps[currentStep].onBackClick}
        isOpen={isOpen}
        title={steps[currentStep].title}
      >
        <CoinCapRate onData={updateEthUsdRate} />
        {steps[currentStep].element}
      </Panel>
    )
  }
}

const mapStateToProps = state => ({
  currentStep: state.convertPanel.showStep,
  userAccount: state.wallet.accounts[0],
  isOpen: state.convertPanel.show
})

const mapDispatchToProps = dispatch => ({
  backToOptions: () =>
    dispatch({
      type: 'SHOW_CONVERT_OPTIONS'
    }),
  hidePanel: () =>
    dispatch({
      type: 'SHOW_CONVERT_PANEL',
      payload: false
    }),
  updateEthUsdRate: value =>
    dispatch({
      type: 'UPDATE_RATE',
      payload: { type: 'ETH_USD', value }
    })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConvertPanel)
