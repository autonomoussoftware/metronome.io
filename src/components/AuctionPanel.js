import { connect } from 'react-redux'
import React, { Component } from 'react'

import AuctionBuyForm from './AuctionBuyForm'
import AuctionBuyOptions from './AuctionBuyOptions'
import CoinCapRate from '../providers/CoinCapRate'
import UserInfo from '../providers/UserInfo'
import withWeb3 from '../hocs/withWeb3'

const AuctionBuyFormWithWeb3 = withWeb3(AuctionBuyForm)
const UserInfoWithWeb3 = withWeb3(UserInfo)

class AuctionPanel extends Component {
  render () {
    const {
      backToBuyOptions,
      showBuyForm,
      hideBuyPanel,
      showBuyPanelEdit,
      showPanelBuyMet,
      showPanelMetaMask,
      updateAccounts,
      updateEthUsdRate
    } = this.props

    return (
      <div className={showBuyPanelEdit ? 'AuctionPanel --slideOut' : 'AuctionPanel'}>
        <UserInfoWithWeb3 onAccounts={updateAccounts} />
        <CoinCapRate onData={updateEthUsdRate}/>
        {showPanelBuyMet &&
          <AuctionBuyOptions
            showBuyForm={showBuyForm}
            hideBuyPanel={hideBuyPanel}/>}
        {showPanelMetaMask &&
          <AuctionBuyFormWithWeb3
            backToBuyOptions={backToBuyOptions}
            hideBuyPanel={hideBuyPanel} />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  showBuyPanelEdit: state.buyPanel.show,
  showPanelBuyMet: state.buyPanel.showStep === 'options',
  showPanelMetaMask: state.buyPanel.showStep === 'form'
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
