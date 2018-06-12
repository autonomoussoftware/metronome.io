import { connect } from 'react-redux'
import React, { Component } from 'react'

import AuctionBuyForm from './AuctionBuyForm'
import AuctionBuyOptions from './AuctionBuyOptions'
import AuctionPanelWait from './AuctionPanelWait'
import AuctionReceipt from './AuctionReceipt'
import CoinCapRate from '../providers/CoinCapRate'
import UserInfo from '../providers/UserInfo'
import withWeb3 from '../hocs/withWeb3'

const AuctionBuyFormWithWeb3 = withWeb3(AuctionBuyForm)
const UserInfoWithWeb3 = withWeb3(UserInfo)

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
      updateAccounts,
      updateEthUsdRate
    } = this.props

    return (
      <div className={showPanel ? 'AuctionPanel --slideOut' : 'AuctionPanel'}>
        <div className="Shade" onClick={hideBuyPanel}></div>
        <div className="Panel">
          <UserInfoWithWeb3 onAccounts={updateAccounts} />
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
  updateAccounts: accounts => dispatch({
    type: 'UPDATE_USER_ACCOUNTS',
    payload: accounts
  }),
  updateEthUsdRate: value => dispatch({
    type: 'UPDATE_RATE',
    payload: { type: 'ETH_USD', value }
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(AuctionPanel)
