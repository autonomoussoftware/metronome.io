import { connect } from 'react-redux'
import React, { Component } from 'react'

import AuctionBuyForm from './AuctionBuyForm'
import AuctionBuyOptions from './AuctionBuyOptions'
import AuctionPanelWait from './AuctionPanelWait'
import AuctionReceipt from './AuctionReceipt'
import CoinCapRate from '../providers/CoinCapRate'
import WalletInfo from '../providers/WalletInfo'
import withWeb3 from '../hocs/withWeb3'

const AuctionBuyFormWithWeb3 = withWeb3(AuctionBuyForm)
const WalletInfoWithWeb3 = withWeb3(WalletInfo)

class AuctionPanel extends Component {
  // eslint-disable-next-line complexity
  render () {
    const {
      backToBuyOptions,
      hideBuyPanel,
      showBuy,
      showBuyForm,
      showOptions,
      showPanel,
      showReceipt,
      showWaiting,
      updateWalletInfo,
      updateEthUsdRate
    } = this.props

    return (
      <div className={showPanel ? 'AuctionPanel --slideOut' : 'AuctionPanel'}>
        <div className="Shade" onClick={hideBuyPanel}></div>
        <div className="Panel">
          <WalletInfoWithWeb3 onWalletInfo={updateWalletInfo} />
          <CoinCapRate onData={updateEthUsdRate}/>
          {showOptions &&
            <AuctionBuyOptions
              hideBuyPanel={hideBuyPanel}
              showBuyForm={showBuyForm} />}
          {showBuy &&
            <AuctionBuyFormWithWeb3
              backToBuyOptions={backToBuyOptions}
              hideBuyPanel={hideBuyPanel} />}
          {showWaiting &&
            <AuctionPanelWait
              hideBuyPanel={hideBuyPanel} />}
          {showReceipt &&
            <AuctionReceipt
              showBuyForm={showBuyForm}
              hideBuyPanel={hideBuyPanel} />}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  showPanel: state.buyPanel.show,
  showOptions: state.buyPanel.showStep === 'options',
  showBuy: state.buyPanel.showStep === 'form',
  showWaiting: state.buyPanel.showStep === 'waiting',
  showReceipt: state.buyPanel.showStep === 'receipt',
  showError: state.buyPanel.showStep === 'error'
})

const mapDispatchToProps = dispatch => ({
  backToBuyOptions: () => dispatch({
    type: 'SHOW_BUY_OPTIONS'
  }),
  showBuyForm: () => dispatch({
    type: 'SHOW_BUY_FORM'
  }),
  hideBuyPanel: () => dispatch({
    type: 'SHOW_BUY_PANEL',
    payload: false
  }),
  updateWalletInfo: payload => dispatch({
    type: 'UPDATE_WALLET_INFO',
    payload
  }),
  updateEthUsdRate: value => dispatch({
    type: 'UPDATE_RATE',
    payload: { type: 'ETH_USD', value }
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(AuctionPanel)
