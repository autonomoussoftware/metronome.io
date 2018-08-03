import detectProvider from 'web3-detect-provider'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

import BuyPanelOptions from './BuyPanelOptions'
import BuyPanelWaiting from './BuyPanelWaiting'
import BuyPanelReceipt from './BuyPanelReceipt'
import BuyPanelForm from './BuyPanelForm'
import CoinCapRate from '../providers/CoinCapRate'
import withWeb3 from '../hocs/withWeb3'
import Panel from './Panel'

const BuyPanelFormWithWeb3 = withWeb3(BuyPanelForm)

const web3Provider = detectProvider('web wallet')

class BuyPanel extends React.Component {
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

  // eslint-disable-next-line complexity
  render() {
    const {
      updateEthUsdRate,
      backToOptions,
      userAccount,
      currentStep,
      hidePanel,
      isOpen
    } = this.props

    const steps = {
      options: {
        title: 'Buy Metronome',
        element: <BuyPanelOptions />
      },
      form: {
        title: userAccount
          ? `Buy with account ${userAccount.substr(0, 6)}*`
          : `Buy with ${web3Provider}`,
        element: <BuyPanelFormWithWeb3 />,
        onBackClick: backToOptions
      },
      waiting: {
        title: 'Waiting for your purchase',
        element: <BuyPanelWaiting />
      },
      receipt: {
        title: 'Receipt',
        element: <BuyPanelReceipt />
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
  currentStep: state.buyPanel.showStep,
  userAccount: state.wallet.accounts[0],
  isOpen: state.buyPanel.show
})

const mapDispatchToProps = dispatch => ({
  backToOptions: () =>
    dispatch({
      type: 'SHOW_BUY_OPTIONS'
    }),
  hidePanel: () =>
    dispatch({
      type: 'SHOW_BUY_PANEL',
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
)(BuyPanel)
